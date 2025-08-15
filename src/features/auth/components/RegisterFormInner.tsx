import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import type { RegisterFormSchema } from '../forms/register';
import { useState } from 'react';

type RegisterFormInnerProps = {
	onRegisterSubmit: (values: RegisterFormSchema) => void;
	isLoading: boolean;
};

export const RegisterFormInner = (props: RegisterFormInnerProps) => {
	const form = useFormContext<RegisterFormSchema>();

	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<form
			onSubmit={form.handleSubmit(props.onRegisterSubmit)}
			className="flex flex-col gap-y-3"
		>
			<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input {...field} />
						</FormControl>
						<FormDescription />
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="password"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Password</FormLabel>
						<FormControl>
							<Input
								type={showPassword ? 'text' : 'password'}
								{...field}
							/>
						</FormControl>
						<FormDescription />
						<FormMessage />
					</FormItem>
				)}
			/>
			<Label>
				<Checkbox
					checked={showPassword}
					onCheckedChange={(checked) => setShowPassword(!!checked)}
				/>
				Show Password
			</Label>

			<Button
				disabled={props.isLoading}
				size="lg"
				className="mt-2 w-full"
			>
				Create Account
			</Button>
		</form>
	);
};
