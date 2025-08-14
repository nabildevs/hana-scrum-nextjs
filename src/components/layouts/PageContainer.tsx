import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Header } from './Header';
import Head from 'next/head';

type PageContainerProps = {
	withHeader?: boolean;
	withFooter?: boolean;
	title?: string;
};

const appName = 'hanascrum';

export const PageContainer = forwardRef<
	HTMLElement,
	React.HTMLAttributes<HTMLElement> & PageContainerProps
>(
	(
		{
			className,
			children,
			withHeader = true,
			withFooter = true,
			title,
			...props
		},
		ref,
	) => {
		const pageTitle = title ? `${title} - ${appName}` : appName;

		return (
			<div className="bg-secondary flex min-h-screen flex-col">
				<Head>
					<title>{pageTitle}</title>
					<link rel="icon" href="/favicon.ico" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1"
					/>
				</Head>

				{withHeader && <Header />}

				<main
					ref={ref}
					className={cn('flex flex-1 flex-col', className)}
					{...props}
				>
					{children}
				</main>

				{withFooter && (
					<footer className="text-muted-foreground flex min-h-16 items-center justify-center border-t p-4 text-sm">
						© 2024 Fanattic. All rights reserved
					</footer>
				)}
			</div>
		);
	},
);

PageContainer.displayName = 'PageContainer';
