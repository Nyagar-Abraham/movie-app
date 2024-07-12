import Search from '@/components/shared/Input';
import Pagination from '@/components/shared/Pagination';
import Sort from '@/components/shared/Sort';
import UserCard from '@/components/user/UserCard';
import { sortArray, usersortArray } from '@/constants';
import { getAllUsers } from '@/lib/actions/user.actions';

const page = async ({ params, searchParams }: any) => {
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

			<h1 className="h-primary mt-8 ">Community</h1>

			<div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-y-6 md:gap-x-5 lg:grid-cols-4 ">
				{users?.length > 0 &&
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
					))}
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
