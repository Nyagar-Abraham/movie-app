import HomePageDescription from "@/components/home/HomePageDescription";
import ImageComponent from "@/components/home/ImageComponent";
import SelectCategory from "@/components/home/SelectCategory";
import Heading from "@/components/home/heading";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import ShowCard from "@/components/shared/ShowCard";
import { Carousel } from "@/components/shows/CaroselBanner";

import { getShows } from "@/utils/api";
import { Movie, Tv } from "@/utils/interfaces";

// export const metadata: Metadata = {
//   title: "All Shows",
// };

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

  if (!popularShows || !nowPlayingOrTopRatedShow) return null;

  return (
    <>
      <section className="h-svh relative border-t border-transparent">
        <ImageComponent popularShows={popularShows} image="backdrop" />
        <div className="absolute inset-x-0 top-0 h-[5rem] bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[25rem] bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <MaxWidthWrapper
          className="relative h-full  z-30   p-6 flex flex-col justify-between

          "
        >
          <SelectCategory className="mt-[5rem]" />
          <div className=" grid md:grid-cols-2 gap-8 ">
            <HomePageDescription popularShows={popularShows} />
            <div className="relative">
              <ImageComponent
                popularShows={popularShows}
                image="poster"
                className="rounded-md opacity-[0.6]
      "
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      {/* section 2 */}
      <section className="min-h-svh py-10 border border-transparent">
        <MaxWidthWrapper className="   ">
          <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
            <div>
              <Heading className="mt-10 uppercase">
                {isTv
                  ? `Popular Tv Shows ${new Date().getFullYear()}`
                  : "Now Playing"}
              </Heading>
              <Carousel className="mt-4">
                {nowPlayingOrTopRatedShow.map((show: Movie & Tv) => (
                  <ShowCard
                    key={show.id}
                    show={show}
                    className="flex-full w-[20rem] min-h-[45rem]"
                  />
                ))}
              </Carousel>
            </div>
            <div>
              <Heading className="mt-10 uppercase">
                {isTv
                  ? "Top Rated tv Series"
                  : `Popular movies in ${new Date().getFullYear()}`}
              </Heading>
              <Carousel className="mt-4">
                {popularShows.map((show: Movie & Tv) => (
                  <ShowCard
                    key={show.id}
                    show={show}
                    className="flex-full min-w-[20rem] min-h-[45rem] "
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
