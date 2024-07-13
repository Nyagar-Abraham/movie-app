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
	// title: 'The wild oasis',
	title: {
		template: '%s / Plex-Shows-app',
		default: 'Welcome /  Plex-Shows-app',
	},
	description: 'This app displays movies and tv-shows',
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
		<html lang="en">
			<body className={`bg-dark ${inter.className}`}>
				<ClerkProvider
					appearance={{
						elements: {
							formButtonPrimary:
								'bg-gradient-to-br from-red to-red/70 text-pure-white  border-none',
							footerActionLink: 'text-red ',
							socialButtonsBlockButton:
								'text-slate-50 bg-gray-700 hover:bg-gray-600',
						},
						variables: {
							colorPrimary: '#ff6b6b', // Red color in hex format
							colorTextOnPrimaryBackground: '#ffffff', // White color in hex format
							colorBackground: '#212529', // Dark gray color in hex format
							colorInputBackground: '#495057',
							colorText: '#f1f3f5',
							colorNeutral: '#ced4da',
							colorTextSecondary: '#e9ecef',
						},
					}}
				>
					<ThemeProvider>{children}</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
