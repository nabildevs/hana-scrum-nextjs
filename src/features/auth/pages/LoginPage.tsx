import { PageContainer } from '@/components/layouts/PageContainer';
import { SectionContainer } from '@/components/layouts/SectionContainer';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { registerFormSchema, type RegisterFormSchema } from '../forms/register';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { RegisterFormInner } from '../components/RegisterFormInner';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';
import type { AuthError } from '@supabase/supabase-js';
import { SupabaseAuthErrorCodes } from '@/lib/supabase/supabaseAuthErrorCodes';
import { useRouter } from 'next/router';

const LoginPage = () => {
	const form = useForm<RegisterFormSchema>({
		resolver: zodResolver(registerFormSchema),
	});

	const router = useRouter();

	const handleLoginSubmit = async (values: RegisterFormSchema) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: values.email,
				password: values.password,
			});

			if (error) throw error;

			toast.success('You are now logged in');
			await router.replace('/');
		} catch (error) {
			// Supabase auth error
			switch ((error as AuthError).code) {
				case SupabaseAuthErrorCodes.invalid_credentials:
					form.setError('email', {
						message: 'Credentials is not correct',
					});
					form.setError('password', {
						message: 'Credentials is not correct',
					});

					break;

				case SupabaseAuthErrorCodes.email_not_confirmed:
					form.setError('email', {
						message: 'Email not verified',
					});

					break;

				default:
					toast.error(
						'Something wrong happen, please try again later',
					);
			}
		}
	};

	return (
		<PageContainer
			withFooter={false}
			withHeader={false}
			title="Login"
			className="justify-center"
		>
			<SectionContainer
				minFullscreen
				className="items-center justify-center"
			>
				<Card className="w-full max-w-md">
					{/* Logo */}
					<CardHeader className="flex flex-col items-center text-center leading-tight">
						<h1 className="text-primary text-3xl font-bold">
							Welcome Back
						</h1>
						<p className="text-muted-foreground">
							Log in to your account now
						</p>
					</CardHeader>
					<CardContent className="mt-4">
						<Form {...form}>
							<RegisterFormInner
								buttonText="Log In"
								// isLoading={registerUserIsPending}
								onRegisterSubmit={handleLoginSubmit}
							/>
						</Form>
					</CardContent>
					<CardFooter className="flex flex-col">
						<div className="flex w-full items-center justify-between gap-x-4">
							<div className="h-[2px] w-full border-t-2" />
							<p className="text-muted-foreground flex-1 text-nowrap">
								or
							</p>
							<div className="h-[2px] w-full border-t-2" />
						</div>

						<Button
							variant="secondary"
							size="lg"
							className="mt-4.5 w-full"
						>
							<FcGoogle />
							Log In With Google
						</Button>

						<p className="text-muted-foreground mt-4">
							Do not have an account?{' '}
							<Link
								className="font-bold text-blue-600 hover:text-blue-500 hover:underline"
								href="/register"
							>
								Register
							</Link>
						</p>
					</CardFooter>
				</Card>
			</SectionContainer>
		</PageContainer>
	);
};

export default LoginPage;
