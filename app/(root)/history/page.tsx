import History from '@/components/shared/History';
import Search from '@/components/shared/Input';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import Sort from '@/components/shared/Sort';
import { InteractionSortArray } from '@/constants';
import { getUserInterActions } from '@/lib/actions/interactions.action';
import { getUserByClerkId } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'History',
};

const page = async ({ params, searchParams }: any) => {
	const { userId } = auth();
	const user = await getUserByClerkId({ clerkId: userId! });
	const { interactions, isNext, pages } = await getUserInterActions({
		userId: user?._id,
		searchQuery: searchParams?.filter || '',
		sortBy: searchParams?.sort || '',
		page: searchParams?.page ? +searchParams?.page : 1,
		pageSize: 12,
	});

	return (
		<>
			<div className="mt-8 flex items-center flex-wrap gap-x-3 gap-y-5">
				<Search placeholder="Search for movies and TV shows" />
				<Sort sorts={InteractionSortArray} />
			</div>
			<div className="w-full mx-auto  sm:w-9/12 md:w-[760px]">
				<h1 className="h-primary mt-8 ">Your History</h1>
			</div>

			<div className="w-full mx-auto space-y-3 sm:w-9/12 mt-6 md:w-[760px]">
				{interactions?.length > 0 ? (
					interactions.map((interaction) => (
						<History
							key={interaction._id}
							action={interaction.action}
							show={JSON.stringify(interaction.show)}
							createdAt={interaction.createdAt}
							picture={interaction.user.picture}
						/>
					))
				) : (
					<NoResult search={'your history'} />
				)}
			</div>
			<Pagination
				page={searchParams?.page ? +searchParams?.page : 1}
				isNext={isNext}
				pages={pages}
			/>
		</>
	);
};

export default page;
