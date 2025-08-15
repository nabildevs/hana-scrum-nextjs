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
import { api } from '@/utils/api';
import { toast } from 'sonner';

const RegisterPage = () => {
	const form = useForm<RegisterFormSchema>({
		resolver: zodResolver(registerFormSchema),
	});

	const { mutate: registerUser, isPending: registerUserIsPending } =
		api.auth.register.useMutation({
			onSuccess: () => {
				toast.success('Account created successfully!');
				form.setValue('email', '');
				form.setValue('password', '');
			},
			onError: () => {
				toast.error(
					'Failed to create an account, please try again later',
				);
			},
		});

	const handleRegisterSubmit = (values: RegisterFormSchema) => {
		registerUser(values);
	};

	return (
		<PageContainer
			withFooter={false}
			withHeader={false}
			title="Register"
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
							Create Account
						</h1>
						<p className="text-muted-foreground">
							Start to manage your projects now
						</p>
					</CardHeader>
					<CardContent className="mt-4">
						<Form {...form}>
							<RegisterFormInner
								isLoading={registerUserIsPending}
								onRegisterSubmit={handleRegisterSubmit}
								showPassword
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
							Continue With Google
						</Button>

						<p className="text-muted-foreground mt-4">
							Already have an account?{' '}
							<Link
								className="font-bold text-blue-600 hover:text-blue-500 hover:underline"
								href="/login"
							>
								Log In
							</Link>
						</p>
					</CardFooter>
				</Card>
			</SectionContainer>
		</PageContainer>
	);
};

export default RegisterPage;
