import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
	_id: string;
	name: string;
	username: string;
	location: string;
	likedShows: number;
	picture: string;
	email: string;
}

const UserCard = ({
	_id,
	name,
	username,
	location,
	likedShows,
	picture,
	email,
}: Props) => {
	const id = JSON.parse(_id);
	return (
		<Link
			href={`/profile/${id}`}
			className="rounded-lg bg-gradient-to-b dark:from-dark dark:to-rose-950 from-slate-200 to-slate-100 shadow-sm px-4 py-4 border-t dark:border-dark-blue  "
		>
			<div className="flex-center">
				<Image
					src={picture}
					height={80}
					width={75}
					alt={`${name} profile photo`}
					className="rounded-full aspect-square "
				/>
			</div>

			<div className="mt-5 flex flex-col gap-1 ">
				<Paragraph field="name" value={name} />
				<Paragraph field="username" value={username} />
				<Paragraph field="email" value={email} />
				<Paragraph field="location" value={location || 'Not disclosed'} />
				<Paragraph field="likedshows" value={likedShows || 0} />
			</div>
		</Link>
	);
};

function Paragraph({ field, value }: any) {
	return (
		<p className="text-xs space-x-1 line-clamp-1">
			<span className="dark:text-rose-300 text-slate-500 font-semibold capitalize">
				{field}:
			</span>
			<span className="dark:text-rose-100 text-slate-600 ">{value}</span>
		</p>
	);
}

export default UserCard;
