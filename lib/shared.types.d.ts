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
	searchQuery?: string;
	sortBy?: string;
}
export interface GetAllUsersParams {
	page?: number;
	pageSize?: number;
	searchQuery?: string;
	sortBy?: string;
}
export interface GetBookmarkedShowsParams {
	page?: number;
	pageSize?: number;
	searchQuery?: string;
	sortBy?: string;
}
export interface GetMoviesParams {
	page?: number;
	pageSize?: number;
	searchQuery?: string;
	sortBy?: string;
}
export interface GetTvShowsParams {
	page?: number;
	pageSize?: number;
	searchQuery?: string;
	sortBy?: string;
}

export interface createUserParams {
	name: string;
	username: string;
	email: string;
	clerkId: string;
	picture: string;
}
export interface updateUserParams {
	clerkId: string;
	updateData: {
		name?: string;
		username?: string;
		email?: string;
		location?: string;
		picture?: string;
	};
	path?: string;
}

export interface deleteUserParams {
	clerkId: string;
}
export interface getTvSeriesByIdParams {
	seriesId: string;
}
export interface voteParams {
	userId: string;
	showId: string;
	hasUpvoted: boolean;
	hasDownvoted: boolean;
	path?: string | undefined;
}

export interface updateViewsParams {
	userId: string;
	showId: string;
	path: string;
}
export interface  getUserInteractionParams{
	userId: string;
	page?: number;
	pageSize?: number;
	searchQuery?: string;
	sortBy?:string
	
}
