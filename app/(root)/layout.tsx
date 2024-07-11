import Navbar from '@/components/shared/Navbar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="px-4 md:pl-10 pt-2 pb-10 bg-dark100-light0 min-h-screen  text-light100-dark0 md:flex transition-all duration-300 scrollbar-hidden overflow-y-auto">
			<Navbar />
			<section className="sc flex-1 md:px-6">{children}</section>
		</main>
	);
};

export default Layout;
