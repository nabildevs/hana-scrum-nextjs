import { emailSchema, fullNameSchema, passwordSchema } from '@/schemas/auth';
import { z } from 'zod';

export const registerFormSchema = z.object({
	full_name: fullNameSchema,
	email: emailSchema,
	password: passwordSchema,
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
