import Search from '@/components/shared/Input';
import { getBookMarkedShows } from '@/lib/actions/show.action';

import Pagination from '@/components/shared/Pagination';
import ShowCard from '@/components/shared/ShowCard';
import Sort from '@/components/shared/Sort';
import { sortArray } from '@/constants';

export default async function Page({ params, searchParams }: any) {
	const {
		shows: bookmarkedShows,
		isNext,
		pages,
	} = await getBookMarkedShows({
		page: searchParams?.page ? +searchParams?.page : 1,
		pageSize: 12,
		searchQuery: searchParams?.filter || '',
		sortBy: searchParams?.sort || '',
	});

	return (
		<>
			<div className="mt-8 flex items-center flex-wrap gap-x-3 gap-y-5">
				<Search placeholder="Search for movies and TV shows" />
				<Sort sorts={sortArray} />
			</div>

			<h1 className="h-primary mt-8 ">Bookmarked</h1>

			<div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-y-6 md:gap-x-5 lg:grid-cols-4 ">
				{bookmarkedShows.length > 0 &&
					bookmarkedShows.map((show) => (
						<ShowCard
							key={show._id}
							_id={JSON.stringify(show._id)}
							title={show.title}
							thumbnail={show.thumbnail.regular.small}
							rating={show.rating}
							category={show.category}
							isBookmarked={show.isBookmarked}
							year={show.year}
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
}
