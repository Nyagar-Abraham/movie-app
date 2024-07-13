import Search from '@/components/shared/Input';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import Sort from '@/components/shared/Sort';
import UserCard from '@/components/user/UserCard';
import { usersortArray } from '@/constants';
import { getAllUsers, getUserByClerkId } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Community',
};

const page = async ({ params, searchParams }: any) => {
	const { userId } = auth();

	if (!userId) return null;

	const user = (await getUserByClerkId({ clerkId: userId! })) || {};
	const { users, isNext, pages } = await getAllUsers({
		page: searchParams?.page ? searchParams?.page : 1,
		pageSize: 12,
		searchQuery: searchParams?.filter || '',
		sortBy: searchParams?.sort || '',
	});

	return (
		<>
			<div className="mt-8 flex items-center flex-wrap gap-x-3 gap-y-5">
				<Search placeholder="Search for movies and TV shows" />
				<Sort sorts={usersortArray} />
			</div>
			<div className="mt-8 flex justify-between items-center">
				<h1 className="h-primary">Community</h1>
				<Link
					className="py-1 text-sm bg-dark90-light10 px-3 rounded-md "
					href={`/profile/${user._id}`}
				>
					update Profile
				</Link>
			</div>

			<div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-y-6 md:gap-x-5 lg:grid-cols-4 ">
				{users?.length > 0 ? (
					users.map((user) => (
						<UserCard
							key={user._id}
							_id={JSON.stringify(user._id)}
							name={user.name}
							username={user.username}
							location={user?.location}
							likedShows={user.likedshows?.length || 0}
							picture={user.picture}
							email={user.email}
						/>
					))
				) : (
					<NoResult search={'Community'} />
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
