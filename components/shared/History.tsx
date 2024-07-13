import { timeAgo } from '@/lib/utils';
import Image from 'next/image';

interface Props {
	action: string;
	show: string;
	createdAt: Date;
	picture: string;
}

const History = ({ action, show, createdAt, picture }: Props) => {
	const parsedShow = JSON.parse(show);

	return (
		<div className="rounded-lg flex gap-4 items-center justify-center bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-rose-950 dark:to-slate-900 dark:text-slate-100 text-slate-600 shadow-md p-2">
			<div className="flex-center">
				<Image
					src={picture}
					width={50}
					height={50}
					alt="profile"
					className="rounded-full"
				/>
			</div>

			<div className="flex flex-1 flex-col gap-2 ">
				<h2 className="font-semibold dark:text-rose-300 text-slate-700 text-sm">
					You{' '}
					<span>
						{action === 'upvote' && 'upvoted'}{' '}
						{action === 'downvote' && 'downvoted'}{' '}
						{action === 'view' && 'viewed'} {parsedShow.title}{' '}
					</span>
				</h2>

				<p className="line-clamp-2 text-[11px] font-light">
					{parsedShow.description}
				</p>
				<div className="flex items-center justify-between">
					<p className="text-rose-300 text-xs font-light">
						{timeAgo(createdAt)}
					</p>
					<button
						className={`text-xs text-slate-100 py-1 px-3 rounded-lg ${action === 'upvote' && 'bg-green-500'}  ${action === 'downvote' && 'bg-red'}  ${action === 'view' && 'bg-rose-950'}`}
					>
						{action}
					</button>
				</div>
			</div>
		</div>
	);
};

export default History;
