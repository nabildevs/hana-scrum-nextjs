import z from 'zod';

export const editProfileFormSchema = z.object({
	username: z
		.string()
		.min(5, { message: 'Username must be atleast 5 character(s)' })
		.max(16, { message: 'Username is too long, maximum 16 character(s)' }),
	fullName: z.string(),
	bio: z.string(),
});

export type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;
