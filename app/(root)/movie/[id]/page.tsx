import BackButton from '@/components/shared/BackButton';

import Vote from '@/components/shared/Vote';
import { getMovieById } from '@/lib/actions/show.action';
import { getUserByClerkId } from '@/lib/actions/user.actions';
import { formatDate } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';

export async function generateMetadata({ params }: any) {
	const movie = await getMovieById({ movieId: params.id });
	return { title: `${movie.title} ` };
}

const page = async ({ params }: any) => {
	const { userId } = auth();
	const user = await getUserByClerkId({ clerkId: userId! });
	const movie = await getMovieById({ movieId: params.id });

	const {
		thumbnail: {
			regular: { large },
		},
		title,
		description,
		year,
		upvotes,
		downvotes,
		views,
		userrattings,
		_id,
	} = movie;
	return (
		<>
			<div className="mt-8">
				<BackButton />
			</div>

			<div className="mt-7 rounded-lg relative grid gap-10 overflow-hidden dark:shadow-lg md:grid-cols-2  shadow-md ">
				<Image
					src={large.substring(1)}
					alt={`${title} thumbnail`}
					width={700}
					height={500}
					className={'object cover'}
				/>

				<div className="flex flex-col gap-3 max-md:px-4 md:pt-4 pb-4">
					<h2 className="h-secondary-small text-rose-800 ">{title}</h2>

					<p className="paragraph line-clamp-4">{description}</p>

					{/* <Rating /> */}

					<div className="flex-between md:mt-auto">
						<p className="paragraph-small">
							Released Date:
							<span className="text-rose-600/70 font-bold">
								{formatDate(year)}
							</span>
						</p>
						<div className="flex gap-3 items-center text-rose-50 px-3">
							<Vote
								userId={JSON.stringify(user?._id)}
								showId={JSON.stringify(_id)}
								hasDownvoted={downvotes?.includes(user?._id)}
								hasUpvoted={upvotes?.includes(user?._id)}
								upvotes={upvotes?.length || 0}
								downvotes={downvotes?.length || 0}
								views={views?.length || 0}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
