import { PageContainer } from '@/components/layouts/PageContainer';
import { SectionContainer } from '@/components/layouts/SectionContainer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

const HomePage = () => {
	const router = useRouter();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		toast.success('You logged out successfully');
	};

	return (
		<PageContainer
			withFooter={false}
			withHeader={false}
			className="justify-center"
		>
			<SectionContainer
				minFullscreen
				className="items-center justify-center"
			>
				<h1 className="text-4xl font-bold">
					Hi! Welcome to hanascrum 👋
				</h1>

				<div className="mt-5 flex gap-x-2">
					<Button onClick={() => router.replace('/login')} size="lg">
						Login
					</Button>
					<Button
						onClick={handleLogout}
						variant="destructive"
						size="lg"
					>
						Logout
					</Button>
				</div>
			</SectionContainer>
		</PageContainer>
	);
};

export default HomePage;
