'use client';

import {
	downvoteShow,
	updateViews,
	upvoteShow,
} from '@/lib/actions/show.action';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaEye } from 'react-icons/fa';
import { toast } from '../ui/use-toast';

export function Vote({
	showId,
	userId,
	hasUpvoted,
	hasDownvoted,
	upvotes,
	downvotes,
	views,
}: {
	upvotes: number;
	downvotes: number;
	views: number;
	showId: string;
	userId: string;
	hasUpvoted: boolean;
	hasDownvoted: boolean;
}) {
	const pathname = usePathname();
	const [upvote, setUpvote] = useState(false);
	const [downvote, setDownvote] = useState(false);

	const parsedUserId = JSON.parse(userId);
	const parsedShowId = JSON.parse(showId);

	useEffect(() => {
		async function views() {
			await updateViews({
				userId: parsedUserId,
				showId: parsedShowId,
				path: pathname,
			});
		}
		views();
	}, []);

	const handleVote = async (action: string) => {
		if (action === 'upvote') {
			setUpvote((u) => !u);
			await upvoteShow({
				userId: parsedUserId,
				showId: parsedShowId,
				hasDownvoted,
				hasUpvoted,
				path: pathname,
			});

			toast({
				title: `Upvote successfull ${!upvote ? 'added' : 'removed'} `,
				variant: !upvote ? 'success' : 'destructive',
			});
		} else {
			setDownvote((d) => !d);
			await downvoteShow({
				userId: parsedUserId,
				showId: parsedShowId,
				hasDownvoted,
				hasUpvoted,
				path: pathname,
			});

			toast({
				title: `downvote successfull ${!downvote ? 'added' : 'removed'} `,
				variant: !downvote ? 'success' : 'destructive',
				className: 'toast-success',
			});
		}
	};

	return (
		<>
			<Button
				property={upvotes}
				title="upvotes"
				hasUpvoted={hasUpvoted}
				onClick={() => handleVote('upvote')}
			/>
			<Button
				property={downvotes}
				title="downvotes"
				hasDownvoted={hasDownvoted}
				onClick={() => handleVote('downvote')}
			/>
			<Button property={views} title="views" />
		</>
	);
}

function Button({
	property,
	title,
	onClick,
	hasUpvoted,
	hasDownvoted,
}: {
	property: any;
	title: string;
	onClick?: any;
	hasUpvoted?: boolean;
	hasDownvoted?: boolean;
}) {
	return (
		<button
			onClick={onClick}
			className="px-2 py-1 rounded-full flex items-center gap-1 dark:bg-dark-blue bg-slate-200 justify-center text-slate-600 dark:text-l-blue"
		>
			<span className="font-semibold text-xs uppercase tracking-wide flex-center">
				{property}
			</span>
			{title === 'views' && <FaEye className="text-xs " />}
			{title === 'upvotes' && (
				<FaArrowUp
					className={`text-xs  dark:text-l-blue ${hasUpvoted && '!text-green-600'}  `}
				/>
			)}
			{title === 'downvotes' && (
				<FaArrowDown
					className={`text-xs  dark:text-l-blue ${hasDownvoted && '!text-red'}  `}
				/>
			)}

			{/* <span className=" text-xs uppercase tracking-wide flex-center max-md:hidden">
		{title}
	</span> */}
		</button>
	);
}

export default Vote;
