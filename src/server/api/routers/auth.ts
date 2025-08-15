import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { emailSchema, passwordSchema } from '@/schemas/auth';
import { supabaseAdminClient } from '@/lib/supabase/server';
import { generateFromEmail } from 'unique-username-generator';

export const authRouter = createTRPCRouter({
	register: publicProcedure
		.input(
			z.object({
				email: emailSchema.toLowerCase(),
				password: passwordSchema,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { email, password } = input;

			await db.$transaction(async (tx) => {
				let userId = '';

				try {
					// Create user in supabase
					const { data, error } =
						await supabaseAdminClient.auth.admin.createUser({
							email,
							password,
						});

					if (data.user) {
						userId = data.user.id;
					}

					if (error) throw error;

					const newUsername = generateFromEmail(email);

					// Duplicate user to profile table
					await tx.profile.create({
						data: {
							email,
							userId: data.user.id,
							username: newUsername,
						},
					});
				} catch (error) {
					console.log(error);

					// If failed, delete user from supabase
					await supabaseAdminClient.auth.admin.deleteUser(userId);
				}
			});
		}),
});
