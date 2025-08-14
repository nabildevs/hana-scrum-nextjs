import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type SectionContainerProps = {
	padded?: boolean;
	minFullscreen?: boolean;
};

export const SectionContainer = forwardRef<
	HTMLElement,
	React.HTMLAttributes<HTMLElement> & SectionContainerProps
>(({ className, children, padded, minFullscreen, ...props }, ref) => {
	return (
		<section
			ref={ref}
			className={cn(
				'container flex flex-col',
				minFullscreen && 'min-h-[calc(100vh-144px)]',
				padded && 'px-6',
				className,
			)}
			{...props}
		>
			{children}
		</section>
	);
});

SectionContainer.displayName = 'SectionContainer';
