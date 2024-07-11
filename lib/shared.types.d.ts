export interface GetMovieByIdParams {
	movieId: string;
}

export interface ShowInterface {
	title: string;
	thumbnail: {
		trending: {
			small?: string;
			large?: string;
		};
		regular: {
			small?: string;
			medium?: string;
			large?: string;
		};
	};
	year: Date;
	category: string;
	rating: string;
	isBookmarked: true;
	isTrending: true;
	description: string;
	upvotes: [];
	downvotes: [];
	userratings: [];
}

export interface GetAllShowsParams {
	page?: number;
	pageSize?: number;
}
export interface GetBookmarkedShowsParams {
	page?: number;
	pageSize?: number;
}
export interface GetMoviesParams {
	page?: number;
	pageSize?: number;
}
export interface GetTvShowsParams {
	page?: number;
	pageSize?: number;
}
