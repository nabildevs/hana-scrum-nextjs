import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { type EditProfileFormSchema } from '../forms/editProfile';

type EditProfileFormInnerProps = {
	defaultValues: {
		username?: string;
		fullName?: string | null;
		bio?: string | null;
	};
};

export const EditProfileFormInner = (props: EditProfileFormInnerProps) => {
	const form = useForm<EditProfileFormSchema>({
		defaultValues: {
			username: props.defaultValues.username ?? '',
			fullName: props.defaultValues.fullName ?? '',
			bio: props.defaultValues.bio ?? '',
		},
	});

	return (
		<Form {...form}>
			<FormField
				control={form.control}
				name="username"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Username</FormLabel>
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
				name="fullName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Full Name</FormLabel>
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
				name="bio"
				render={({ field }) => (
					<FormItem className="col-span-2">
						<FormLabel>Bio</FormLabel>
						<FormControl>
							<Textarea {...field} />
						</FormControl>
						<FormDescription />
						<FormMessage />
					</FormItem>
				)}
			/>
		</Form>
	);
};
