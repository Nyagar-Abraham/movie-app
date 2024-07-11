'use server';

import Show from '@/database/movie.model';
import { connectToDatabase } from '../mongoose';
import {
	GetAllShowsParams,
	GetBookmarkedShowsParams,
	GetMovieByIdParams,
	GetMoviesParams,
	GetTvShowsParams,
	ShowInterface,
} from '../shared.types';

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

		const { page = 1, pageSize = 12 } = params;

		const skipAmount = (page - 1) * pageSize;

		const shows = await Show.find({}).skip(skipAmount).limit(pageSize);

		const totalShows = await Show.countDocuments({});

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

		const { page = 1, pageSize = 12 } = params;

		const skipAmount = (page - 1) * pageSize;

		const movies = await Show.find({ category: 'Movie' })
			.skip(skipAmount)
			.limit(pageSize);

		const totalMovies = await Show.countDocuments({ category: 'Movie' });

		const isNext = totalMovies > skipAmount + movies.length;

		const pages = Math.ceil(totalMovies / pageSize);

		return { movies, isNext, pages };
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function getTvShows(params:GetTvShowsParams) {
	try {
		connectToDatabase();

		const { page = 1, pageSize = 12 } = params;

		const skipAmount = (page - 1) * pageSize;


		const series = await Show.find({ category: 'TV Series' }).skip(skipAmount).limit(pageSize);

		const totalTvShows = await Show.countDocuments({ category: 'TV Series' });

		const isNext = totalTvShows > skipAmount + series.length;

		const pages = Math.ceil(totalTvShows/ pageSize);

		return {series,isNext,pages};
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function getBookMarkedShows(params: GetBookmarkedShowsParams) {
	try {
		connectToDatabase();

		const { page = 1, pageSize = 12 } = params;

		const skipAmount = (page - 1) * pageSize;

		const shows = await Show.find({ isBookmarked: true })
			.skip(skipAmount)
			.limit(pageSize);

		const totalBookmarkedShows = await Show.countDocuments({
			isBookmarked: true,
		});
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
		console.log({ movieId });

		const movie = await Show.findById(movieId);

		return movie;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
