import Link from 'next/link';

export const Header = () => {
	return (
		<header className="border-border bg-background flex h-12 items-center justify-between border-b px-4 md:h-20 md:px-8">
			<Link
				href="/"
				className="text-primary text-2xl font-bold md:text-3xl"
			>
				Scrum
			</Link>
		</header>
	);
};
