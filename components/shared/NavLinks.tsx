'use client';

import { Links } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCalendarCheck, FaUser, FaUsers } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';

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
						{link.icon === '' ? (
							link?.label === 'community' ? (
								<FaPeopleGroup
									className={` ${active ? 'text-slate-300' : 'text-[#5A698F]'}`}
								/>
							) : (
								<FaCalendarCheck
									className={` ${active ? 'text-slate-300' : 'text-[#5A698F]'}`}
								/>
							)
						) : (
							<Image
								src={link.icon}
								width={16}
								height={16}
								alt={link.label}
								className={`${active ? '  filter-white' : ''}  `}
							/>
						)}
					</Link>
				);
			})}
		</div>
	);
};

export default NavLinks;
