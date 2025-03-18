"use server";

type TARGET_PROPS = {
  movies: "movies";
  nowPlayingMovies: "nowPlayingMovies";
  popularMovies: "popularMovies";
  movieDetails: "movieDetails";
  latestMovies: "latestMovies";
  searchMovie: "searchMovie";
  tv: "tv";
  tvDetails: "tvDetails";
  popularTv: "popularTv";
  latestTv: "latestTv";
  topRatedTv: "topRatedTv";
  searchTv: "searchTv";
};

type TARGET_ENDPOINTS_TYPE = {
  movies: string;
  nowPlayingMovies: string;
  popularMovies: string;
  movieDetails: string;
  latestMovies: string;
  searchMovie: string;
  tv: string;
  tvDetails: string;
  popularTv: string;
  latestTv: string;
  topRatedTv: string;
  searchTv: string;
};

const TARGET_ENDPOINTS: TARGET_ENDPOINTS_TYPE = {
  movies: "/discover/movie",
  nowPlayingMovies: "/movie/now_playing",
  popularMovies: "/movie/popular",
  movieDetails: "/movie/",
  latestMovies: "/movie/latest",
  searchMovie: "/search/movie",
  tv: "/discover/tv",
  tvDetails: "/tv/",
  popularTv: "/tv/popular",
  latestTv: "/tv/latest",
  topRatedTv: "/tv/top_rated",
  searchTv: "/search/tv",
};

import axios from "axios";

const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
};

interface GetShowProps {
  query?: string;
  target:
    | TARGET_PROPS["movies"]
    | TARGET_PROPS["nowPlayingMovies"]
    | TARGET_PROPS["popularMovies"]
    | TARGET_PROPS["movieDetails"]
    | TARGET_PROPS["latestMovies"]
    | TARGET_PROPS["tv"]
    | TARGET_PROPS["tvDetails"]
    | TARGET_PROPS["popularTv"]
    | TARGET_PROPS["latestTv"]
    | TARGET_PROPS["topRatedTv"]
    | TARGET_PROPS["searchMovie"]
    | TARGET_PROPS["searchTv"];
  show_id?: string;
  page?: number;
}

export async function getShows({ query, target, show_id, page }: GetShowProps) {
  let endPoint = `${TMDB_CONFIG.BASE_URL}${TARGET_ENDPOINTS[target]}`;

  if (target === "movieDetails") endPoint = `${endPoint}${show_id}`;
  if (target === "tvDetails") endPoint = `${endPoint}${show_id}`;

  endPoint = `${endPoint}?language=en-US`;

  if (target === "movieDetails" || target === "tvDetails")
    endPoint = `${endPoint}&append_to_response=videos,credits`;

  if (query) {
    endPoint = `${endPoint}&query=${encodeURIComponent(query)}`;
  }

  if (!query && (target === "movieDetails" || target === "tvDetails")) {
    endPoint = `${endPoint}&include_adult=true&sort_by=popularity.desc`;
  }

  if (page && page > 1) endPoint = `${endPoint}&page=${page}`;

  try {
    const { data } = await axios.get(endPoint, {
      headers: TMDB_CONFIG.headers,
    });

    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
}

// const url =
//   "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
