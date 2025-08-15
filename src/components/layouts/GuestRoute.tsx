import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/router';
import { useEffect, type PropsWithChildren } from 'react';

export const GuestRoute = (props: PropsWithChildren) => {
	const router = useRouter();

	useEffect(() => {
		void (async function () {
			const user = await supabase.auth.getUser();

			if (user) {
				await router.replace('/');
			}
		})();
	}, []);

	return props.children;
};
