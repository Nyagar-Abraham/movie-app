'use client';

import { Links } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = () => {
	const pathname = usePathname();

	return (
		<div className="flex-center  max-sm:gap-4 sm:gap-6 md:flex-col ">
			{Links.map((link) => {
				const active =
					(pathname.includes(link.href) && link.href.length > 1) ||
					pathname === link.href;

				return (
					<Link key={link.label} href={link.href}>
						<Image
							src={link.icon}
							width={16}
							height={16}
							alt={link.label}
							className={`${active ? '  filter-white' : ''}  `}
						/>
					</Link>
				);
			})}
		</div>
	);
};

export default NavLinks;
