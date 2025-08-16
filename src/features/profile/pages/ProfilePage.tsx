import { PageContainer } from '@/components/layouts/PageContainer';
import { SectionContainer } from '@/components/layouts/SectionContainer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/utils/api';
import { Save, User } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';
import { EditProfileFormInner } from '../components/EditProfileFormInner';

const ProfilePage = () => {
	const { data: getProfileData } = api.profile.getProfile.useQuery();

	const inputFileRef = useRef<HTMLInputElement>(null);

	const handleOpenExplorer = () => {
		inputFileRef.current?.click();
	};

	return (
		<PageContainer title="Profile">
			<SectionContainer
				padded
				minFullscreen
				className="items-center py-8"
			>
				<h1 className="text-xl font-semibold md:text-3xl">
					Profile Page
				</h1>
				<p className="text-muted-foreground text-sm md:text-base">
					Manage your personal information
				</p>

				<Card className="mt-8 w-full max-w-2xl">
					<CardContent className="flex justify-center gap-10">
						<div className="flex flex-col items-center justify-center gap-4">
							<Avatar className="size-24">
								<AvatarFallback className="text-3xl">
									<User className="h-12 w-12" />
								</AvatarFallback>
								<AvatarImage />
							</Avatar>
							<Button onClick={handleOpenExplorer} size="sm">
								Change Photo
							</Button>
							<input
								className="hidden"
								type="file"
								ref={inputFileRef}
							/>
						</div>
						<div className="grid flex-1 grid-cols-2 gap-4">
							{getProfileData && (
								<EditProfileFormInner
									defaultValues={{
										username: getProfileData?.username,
										fullName: getProfileData?.fullName,
										bio: getProfileData?.bio,
									}}
								/>
							)}
						</div>
					</CardContent>
					<div className="flex justify-end gap-2 px-6">
						<Button variant="secondary">Cancel</Button>
						<Button>
							<Save className="h-4 w-4" /> Save
						</Button>
					</div>
				</Card>
			</SectionContainer>
		</PageContainer>
	);
};

export default ProfilePage;
