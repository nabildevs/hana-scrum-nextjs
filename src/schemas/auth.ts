import { z } from 'zod';

export const fullNameSchema = z.string({ message: 'Full Name is required' });
export const emailSchema = z
	.string({ message: 'Email is required' })
	.email({ message: 'Email is not valid' });
export const passwordSchema = z
	.string({ message: 'Password is required' })
	.min(8, { message: 'Password has to be atleast 8 character(s)' })
	.regex(/[a-z]/, { message: 'Password must contains low character' })
	.regex(/[A-Z]/, { message: 'Password must contains capital character' })
	.regex(/[0-9]/, { message: 'Password must contains number' });
