'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaDotCircle } from 'react-icons/fa';
import Bookmark from './Bookmark';
import Play from './Play';
import { getYearAsString } from '@/lib/utils/utils';

interface Props {
	_id: string;
	title: string;
	thumbnail: string;
	rating: string;
	category: string;
	isBookmarked: boolean;
	year: Date;
}

const Trending = ({
	_id,
	title,
	thumbnail,
	rating,
	category,
	isBookmarked,
	year,
}: Props) => {
	const [open, setOpen] = useState(false);

	const id = JSON.parse(_id);

	return (
		<Link
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
			href={`${category === 'Movie' ? `/movie/${id}` : `/tv-series/${_id}`}`}
			className="relative flex-1 inline-block flex-none rounded-md overflow-hidden flex flex-col gap-2 shadow-sm"
		>
			<div className="overflow-hidden relative">
				<Image
					src={thumbnail?.substring(1)}
					alt={`${title} thumbnail`}
					className="object-cover transition-all duration-500 hover:scale-[1.1]"
					width={470}
					height={230}
				/>
				<Play width={20} height={20} open={open} />
			</div>
			<Bookmark isBookmarked={isBookmarked} />

			<div className="  bg-transparent">
				<div className="flex items-center gap-3">
					<p className="paragraph font-light">{getYearAsString(year)}</p>
					<p className="flex items-center gap-1 ">
						<span className="flex items-center  text-l-blue">
							<FaDotCircle className="w-1 h-1" />
						</span>
						<Image
							src={`${category !== 'Movie' ? '/assets/icon-category-tv.svg' : '/assets/icon-category-movie.svg'}`}
							alt={'category icon'}
							className=" dark:invert-0 "
							width={12}
							height={12}
						/>
						<span className="paragraph font-light">{category}</span>
					</p>
					<p className="flex gap-1 items-center">
						<span className="flex-center text-pure-white">
							<FaDotCircle className="w-1 h-1" />
						</span>
						<span className="paragraph font-light">{rating}</span>
					</p>
				</div>
				<p className="h-secondary-small">{title}</p>
			</div>
		</Link>
	);
};

export default Trending;
