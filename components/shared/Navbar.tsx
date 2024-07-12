import Image from 'next/image';
import NavLinks from './NavLinks';
import Theme from './Theme';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
	return (
		<nav className="px-3 py-2 bg-dark90-light10 flex-between rounded-md md:flex-col md:fixed  md:top-10 md:left-1 md:gap-6 md:min-h-[400px]  md:w-10 md:self-start">
			<Image
				src="/assets/logo.svg"
				width={24}
				height={24}
				alt="logo"
				className="object-contain"
			/>
			<NavLinks />
			<div className="flex gap-4 items-center md:flex-col">
				<div className="flex-center md:flex-col gap-2 ">
					<SignedIn>
						<UserButton />
					</SignedIn>
					<SignedOut>
						<Link href="/sign-in">
							<FaSignInAlt className="text-red/80" />
						</Link>
					</SignedOut>
				</div>
				<Theme />
			</div>
		</nav>
	);
};

export default Navbar;
