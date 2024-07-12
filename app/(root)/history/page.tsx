import Search from '@/components/shared/Input';
import Sort from '@/components/shared/Sort';
import { InteractionSortArray } from '@/constants';
// import { getUserInterActions } from '@/lib/actions/interactions.action';
// import { getUserByClerkId } from '@/lib/actions/user.actions';
// import { auth } from '@clerk/nextjs/server';
import React from 'react';

const page = async ({ params, searchParams }: any) => {
	// const { userId } = auth();
	// const user = await getUserByClerkId({ clerkId: userId! });
	// const { interactions } = await getUserInterActions({
	// 	userId: user?._id,
	// 	searchQuery: searchParams?.filter || '',
	// 	sortBy: searchParams?.sort,
	// 	page: searchParams?.page ? +searchParams?.page : 0,
	// 	pageSize: 12,
	// });

	// console.log(interactions);
	return (
		<>
			<div className="mt-8 flex items-center flex-wrap gap-x-3 gap-y-5">
				<Search placeholder="Search for movies and TV shows" />
				<Sort sorts={InteractionSortArray} />
			</div>

			<h1 className="h-primary mt-8 ">Your History</h1>

			<div className="w-10/12 sm:w-9/12 md:w-[760px]">
				<div></div>
			</div>
		</>
	);
};

export default page;
