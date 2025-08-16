import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/router';
import { useEffect, type PropsWithChildren } from 'react';

export const AuthRoute = (props: PropsWithChildren) => {
	const router = useRouter();

	useEffect(() => {
		void (async function () {
			const { data } = await supabase.auth.getUser();

			if (!data.user) {
				await router.replace('/login');
			}
		})();
	}, []);

	return props.children;
};
