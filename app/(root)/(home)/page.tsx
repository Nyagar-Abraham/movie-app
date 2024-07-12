import { createShow, getAllShow } from '@/lib/actions/show.action';
import Search from '@/components/shared/Input';
import { getTrendingShow } from '@/lib/actions/show.action';

import fs from 'fs';
import path from 'path';
import Trending from '@/components/Trending';
import ShowCard from '@/components/shared/ShowCard';
import Pagination from '../../../components/shared/Pagination';
import Sort from '@/components/shared/Sort';
import { sortArray } from '@/constants';
import Slider from '@/components/home/Slider';
import { getRandomPastDate } from '@/lib/utils';
import Heading from '@/components/home/heading';

export default async function Home({ params, searchParams }: any) {
	// Define the path to the JSON file
	const filePath = path.join(process.cwd(), 'public', 'data.json');

	// Read the JSON file
	const jsonData = fs.readFileSync(filePath, 'utf-8');

	// Parse the JSON data
	// const data = JSON.parse(jsonData);

	// let titles: any = [];

	// const newData = data.map((d: any) => {
	// 	if (!titles.includes(d.title)) {
	// 		titles.push(d.title);
	// 		d.views = [];
	// 		d.year = getRandomPastDate();

	// 		return d;
	// 	}
	// });

	// for (const showData of newData) {
	// 	await createShow(showData);
	// 	console.log('done');
	// }

	const [trendingShows, result] = await Promise.all([
		getTrendingShow(),
		getAllShow({
			page: searchParams?.page ? searchParams?.page : 1,
			pageSize: 12,
			searchQuery: searchParams?.filter || '',
			sortBy: searchParams?.sort || '',
		}),
	]);

	const { shows: recommendedShows, isNext, pages } = result;

	return (
		<>
			<div className="mt-8 flex items-center flex-wrap gap-x-3 gap-y-5">
				<Search placeholder="Search for movies and TV shows" />
				<Sort sorts={sortArray} />
			</div>
			<Heading />
			<div className=" mt-3 overflow-x-auto whitespace-no-wrap  scrollbar-hidden">
				<Slider>
					{trendingShows?.length > 0 &&
						trendingShows.map((show: any) => (
							<Trending
								key={show._id}
								_id={JSON.stringify(show._id)}
								title={show.title}
								thumbnail={show.thumbnail.trending.small}
								rating={show.rating}
								category={show.category}
								isBookmarked={show.isBookmarked}
								year={show.year}
							/>
						))}
				</Slider>
			</div>
			<h1 className="h-primary mt-8 ">Recommended for you</h1>
			<div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-y-6 md:gap-x-5 lg:grid-cols-4 ">
				{recommendedShows.length > 0 &&
					recommendedShows.map((show: any) => (
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
