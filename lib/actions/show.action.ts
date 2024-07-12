'use server';

import Show from '@/database/movie.model';
import { connectToDatabase } from '../mongoose';
import {
	GetAllShowsParams,
	GetBookmarkedShowsParams,
	GetMovieByIdParams,
	GetMoviesParams,
	getTvSeriesByIdParams,
	GetTvShowsParams,
	ShowInterface,
	updateViewsParams,
	voteParams,
} from '../shared.types';
import { FilterQuery } from 'mongoose';
import User from '@/database/user.model';
import Interaction from '@/database/interactions.model';
import { revalidatePath } from 'next/cache';
import path from 'path/posix';

export async function createShow(showData: ShowInterface) {
	try {
		connectToDatabase();

		await Show.create(showData);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function getTrendingShow() {
	try {
		connectToDatabase();

		const shows = await Show.find({ isTrending: true });

		return shows;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function getAllShow(params: GetAllShowsParams) {
	try {
		connectToDatabase();

		const { page = 1, pageSize = 12, searchQuery, sortBy } = params;

		let query: FilterQuery<typeof Show> = {};

		if (searchQuery) {
			query = {
				$or: [
					{ title: { $regex: searchQuery, $options: 'i' } },
					{ description: { $regex: searchQuery, $options: 'i' } },
				],
			};
		}

		let sortOptions = { createdAt: -1 };
		if (sortBy) {
			switch (sortBy) {
				case 'popular':
					// @ts-ignore
					sortOptions = { viewsCount: -1, upvotes: -1 };
					break;
				case 'latest':
					sortOptions = { createdAt: -1 };
					break;
				case 'old':
					sortOptions = { createdAt: 1 };
					break;
				default:
					break;
			}
		}

		const skipAmount = (page - 1) * pageSize;

		const shows = await Show.aggregate([
			{ $match: query },
			// @ts-ignore
			{ $addFields: { viewsCount: { $size: '$views' } } },
			// @ts-ignore
			{ $sort: sortOptions },
			{ $skip: skipAmount },
			{ $limit: pageSize },
			{
				$project: {
					viewsCount: 0,
				},
			},
		]);

		const totalShows = await Show.countDocuments(query);

		const isNext = totalShows > skipAmount + shows.length;

		const pages = Math.ceil(totalShows / pageSize);

		return { shows, isNext, pages };
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function getMovies(params: GetMoviesParams) {
	try {
		connectToDatabase();

		const { page = 1, pageSize = 12, searchQuery, sortBy } = params;

		const skipAmount = (page - 1) * pageSize;

		let query: FilterQuery<typeof Show> = { category: 'Movie' };

		if (searchQuery) {
			query = {
				category: 'Movie',
				$or: [
					{ title: { $regex: searchQuery, $options: 'i' } },
					{ description: { $regex: searchQuery, $options: 'i' } },
				],
			};
			// query = {
			// 	category: 'Movie',
			// 	$text: { $search: searchQuery },
			// };
		}

		let sortOptions = { createdAt: -1 };
		if (sortBy) {
			switch (sortBy) {
				case 'popular':
					// @ts-ignore
					sortOptions = { viewsCount: -1, upvotes: -1 };
					break;
				case 'latest':
					sortOptions = { createdAt: -1 };
					break;
				case 'old':
					sortOptions = { createdAt: 1 };
					break;
				default:
					break;
			}
		}

		const movies = await Show.aggregate([
			{ $match: query },
			{
				$addFields: {
					viewsCount: { $size: '$views' },
				},
			},
			{
				// @ts-ignore
				$sort: sortOptions,
			},
			{ $skip: skipAmount },
			{ $limit: pageSize },
			{
				$project: {
					viewsCount: 0, // Exclude the viewsCount field from the result
				},
			},
		]);

		const totalMovies = await Show.countDocuments(query);

		const isNext = totalMovies > skipAmount + movies.length;

		const pages = Math.ceil(totalMovies / pageSize);

		return { movies, isNext, pages };
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function getTvShows(params: GetTvShowsParams) {
	try {
		connectToDatabase();

		const { page = 1, pageSize = 12, searchQuery, sortBy } = params;

		let query: FilterQuery<typeof Show> = {
			category: 'TV Series',
		};

		if (searchQuery) {
			query = {
				category: 'TV Series',
				$or: [
					{ title: { $regex: searchQuery, $options: 'i' } },
					{ description: { $regex: searchQuery, $options: 'i' } },
				],
			};
		}

		let sortOptions = { createdAt: -1 };
		if (sortBy) {
			switch (sortBy) {
				case 'popular':
					// @ts-ignore
					sortOptions = { viewsCount: -1, upvotes: -1 };
					break;
				case 'latest':
					sortOptions = { createdAt: -1 };
					break;
				case 'old':
					sortOptions = { createdAt: 1 };
					break;
				default:
					break;
			}
		}

		const skipAmount = (page - 1) * pageSize;

		const series = await Show.aggregate([
			{ $match: query },
			// @ts-ignore
			{ $addFields: { viewsCount: { $size: '$views' } } },
			// @ts-ignore
			{ $sort: sortOptions },
			{ $skip: skipAmount },
			{ $limit: pageSize },
			{
				$project: {
					viewsCount: 0,
				},
			},
		]);
		const totalTvShows = await Show.countDocuments(query);

		const isNext = totalTvShows > skipAmount + series.length;

		const pages = Math.ceil(totalTvShows / pageSize);

		return { series, isNext, pages };
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function getBookMarkedShows(params: GetBookmarkedShowsParams) {
	try {
		connectToDatabase();

		const { page = 1, pageSize = 12, searchQuery, sortBy } = params;

		const skipAmount = (page - 1) * pageSize;

		let query: FilterQuery<typeof Show> = {};

		if (searchQuery) {
			query = {
				$or: [
					{ title: { $regex: searchQuery, $options: 'i' } },
					{ description: { $regex: searchQuery, $options: 'i' } },
				],
			};
		}

		let sortOptions = { createdAt: -1 };
		if (sortBy) {
			switch (sortBy) {
				case 'popular':
					// @ts-ignore
					sortOptions = { viewsCount: -1, upvotes: -1 };
					break;
				case 'latest':
					sortOptions = { createdAt: -1 };
					break;
				case 'old':
					sortOptions = { createdAt: 1 };
					break;
				default:
					break;
			}
		}

		const shows = await Show.aggregate([
			{ $match: query },
			// @ts-ignore
			{ $addFields: { viewsCount: { $size: '$views' } } },
			// @ts-ignore
			{ $sort: sortOptions },
			{ $skip: skipAmount },
			{ $limit: pageSize },
			{
				$project: {
					viewsCount: 0,
				},
			},
		]);

		const totalBookmarkedShows = await Show.countDocuments(query);
		const isNext = totalBookmarkedShows > skipAmount + shows.length;
		const pages = Math.ceil(totalBookmarkedShows / pageSize);

		return { shows, isNext, pages };
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function getMovieById(params: GetMovieByIdParams) {
	try {
		connectToDatabase();

		const { movieId } = params;

		const movie = await Show.findById(movieId);

		return movie;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function getTvSeriesById(params: getTvSeriesByIdParams) {
	try {
		connectToDatabase();

		const { seriesId } = params;

		const series = await Show.findById(seriesId);

		return series;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function upvoteShow(params: voteParams) {
	try {
		connectToDatabase();
		const { hasDownvoted, hasUpvoted, userId, showId, path } = params;
		//upvote
		let updateQuery = {};

		if (hasUpvoted) {
			updateQuery = { $pull: { upvotes: userId } };
		} else if (hasDownvoted) {
			updateQuery = {
				$pull: { downvotes: userId },
				$push: { upvotes: userId },
			};
		} else {
			updateQuery = { $addToSet: { upvotes: userId } };
		}

		const show = await Show.findByIdAndUpdate(showId, updateQuery, {
			new: true,
		});

		//add to users likedShow
		await User.findByIdAndUpdate(userId, {
			$addToSet: { likedshows: showId },
			$inc: { reputation: 10 },
		});

		//create interaction
		const action = await Interaction.create({
			user: userId,
			show: showId,
			action: 'upvote',
		});

		//add the interation to user
		// await User.findByIdAndUpdate(userId, {
		// 	$addToSet: { interactions: action._id },
		// });
		// @ts-ignore
		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function downvoteShow(params: voteParams) {
	try {
		connectToDatabase();

		const { hasDownvoted, hasUpvoted, userId, showId, path } = params;

		//upvote
		let updateQuery = {};

		if (hasDownvoted) {
			updateQuery = { $pull: { downvotes: userId } };
		} else if (hasUpvoted) {
			updateQuery = {
				$pull: { upvotes: userId },
				$push: { downvotes: userId },
			};
		} else {
			updateQuery = { $addToSet: { downvotes: userId } };
		}

		const show = await Show.findByIdAndUpdate(showId, updateQuery, {
			new: true,
		});

		//add to users likedShow
		await User.findByIdAndUpdate(userId, {
			$pull: { likedshows: showId },
			$inc: { reputation: 5 },
		});

		//create interaction
		const action = await Interaction.create({
			user: userId,
			show: showId,
			action: 'downvote',
		});

		//add the interation to user
		// await User.findByIdAndUpdate(userId, {
		// 	$addToSet: { interactions: action._id },
		// });
		// @ts-ignore
		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function updateViews(params: updateViewsParams) {
	try {
		connectToDatabase();

		const { userId, showId, path } = params;
		//add view
		await Show.findByIdAndUpdate(showId, { $addToSet: { views: userId } });

		//create interaction
		const action = await Interaction.create({
			user: userId,
			show: showId,
			action: 'view',
		});

		//add the interation to user
		// await User.findByIdAndUpdate(userId, {
		// 	$addToSet: { interactions: action._id },
		// });

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
