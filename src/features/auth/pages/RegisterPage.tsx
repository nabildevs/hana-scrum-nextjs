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

const RegisterPage = () => {
	const form = useForm<RegisterFormSchema>({
		resolver: zodResolver(registerFormSchema),
	});

	const handleRegisterSubmit = (values: RegisterFormSchema) => {
		alert('Registered!');
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
					<CardHeader className="flex flex-col items-center text-center">
						<h1 className="text-primary text-2xl font-bold">
							Create an Account
						</h1>
						<p className="text-muted-foreground">
							Start to manage your projects now
						</p>
					</CardHeader>
					<CardContent className="mt-4">
						<Form {...form}>
							<RegisterFormInner
								onRegisterSubmit={handleRegisterSubmit}
							/>
						</Form>
					</CardContent>
					<CardFooter className="flex flex-col gap-4">
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
							className="w-full"
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
