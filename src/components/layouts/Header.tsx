import Link from 'next/link';

export const Header = () => {
	return (
		<header className="border-border bg-background flex h-14 items-center justify-between border-b px-4 md:h-16 md:px-8">
			<Link
				href="/"
				className="text-primary text-xl font-bold md:text-2xl"
			>
				Scrum
			</Link>
		</header>
	);
};
