import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Entertainment hub',
	description: 'this app displays movies and tv-shows',
	icons: {
		icon: '/assets/favicon.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider
			appearance={{
				elements: {
					formButtonPrimary:
						'bg-gradient-to-br from-red to-red/70 text-pure-white  border-none',
					footerActionLink: 'text-red ',
				},
			}}
		>
			<html lang="en">
				<body className={`text-center ${inter.className}`}>
					<ThemeProvider>{children}</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
