import HomePageDescription from "@/components/home/HomePageDescription";
import ImageComponent from "@/components/home/ImageComponent";
import SelectCategory from "@/components/home/SelectCategory";
import Slider from "@/components/home/Slider";
import Heading from "@/components/home/heading";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import ShowCard from "@/components/shared/ShowCard";

import { PopularMoviesProvider } from "@/context/PopularMoviesContext";
import { getShows } from "@/utils/api";
import { Movie, Tv } from "@/utils/interfaces";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Shows",
};

export default async function Home({ params, searchParams }: any) {
  const category = searchParams?.category;

  const isTv = category === "tv";
  let results;

  if (category === "tv") {
    results = await Promise.all([
      getShows({ target: "latestTv" }),
      getShows({ target: "topRatedTv" }),
      getShows({ target: "popularTv" }),
    ]);
  } else {
    results = await Promise.all([
      getShows({ target: "latestMovies" }),
      getShows({ target: "popularMovies" }),
      getShows({ target: "nowPlayingMovies" }),
    ]);
  }

  const [latest, popular, nowPlayingOrTopRated] = results;

  const popularShows = popular.results;
  const nowPlayingOrTopRatedShow = nowPlayingOrTopRated.results;

  console.log({ popularShows });
  console.log({ nowPlayingOrTopRatedShow });

  if (!popularShows || !nowPlayingOrTopRatedShow) return null;

  return (
    <>
      <section className="h-svh relative border-t border-transparent">
        <ImageComponent popularShows={popularShows} image="backdrop" />
        <div className="absolute inset-x-0 top-0 h-[5rem] bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[25rem] bg-gradient-to-t from-black to-transparent pointer-events-none" />
        <SelectCategory className="mt-[5rem]" />
        <MaxWidthWrapper className="relative z-30 p-6  mt-[32rem] grid md:grid-cols-2 gap-8 ">
          <HomePageDescription popularShows={popularShows} />
          <div className="relative">
            <ImageComponent
              popularShows={popularShows}
              image="poster"
              className="rounded-md opacity-[0.6]
      "
            />
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="min-h-svh border border-transparent">
        <MaxWidthWrapper className="   ">
          <Heading className="mt-12">
            {isTv
              ? `Popular Tv Shows ${new Date().getFullYear()}`
              : "Now Playing"}
          </Heading>
          <Slider className="mt-4">
            <div className="overflow-hidden overflow-x-auto flex items-center gap-8 hide-scrollbar ">
              {nowPlayingOrTopRatedShow.map((show: Movie | Tv) => (
                <ShowCard key={show.id} show={show} className="min-w-[20rem]" />
              ))}
            </div>
          </Slider>
          <Heading className="mt-8">
            {isTv
              ? "Top Rated tv Series"
              : `Popular movies in ${new Date().getFullYear()}`}
          </Heading>
          <Slider className="mt-4">
            <div className="overflow-hidden overflow-x-auto flex items-center gap-8 hide-scrollbar ">
              {popularShows.map((show: Movie | Tv) => (
                <ShowCard key={show.id} show={show} className="min-w-[20rem]" />
              ))}
            </div>
          </Slider>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
