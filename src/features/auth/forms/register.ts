import { emailSchema, passwordSchema } from '@/schemas/auth';
import { z } from 'zod';

export const registerFormSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
