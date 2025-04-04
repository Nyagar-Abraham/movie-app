import Search from "@/components/shared/Input";

import Pagination from "@/components/shared/Pagination";
import Sort from "@/components/shared/Sort";
import { sortArray } from "@/constants";
import { Metadata } from "next";
import NoResult from "@/components/shared/NoResult";

import { MongoShow, Movie, TrendingShow, Tv } from "@/utils/interfaces";
import { getShows } from "@/utils/api";
import ShowCard from "@/components/shared/ShowCard";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { getAllTrending } from "@/lib/actions/trenging.action";
import Slider from "@/components/home/Slider";
import Heading from "@/components/home/heading";

export const metadata: Metadata = {
  title: "Movies",
};

export default async function Page({ params, searchParams }: any) {
  const [data, trending] = await Promise.all([
    getShows({
      target: "movies",
      page: searchParams?.page ? +searchParams.page : 1,
      sort: searchParams?.sort ? searchParams.sort : null,
    }),
    getAllTrending({ category: "movie" }),
  ]);

  const movies = data?.results;
  const isNext = data?.page < data?.total_pages;
  const pages = data?.total_pages;

  return (
    <MaxWidthWrapper className="mt-[8rem] pb-[6rem]">
      <div className=" flex items-center justify-between flex-wrap gap-x-3 gap-y-5">
        <Search placeholder="Search for movies.." category="movie" />
        <Sort sorts={sortArray} />
      </div>
      {trending?.length > 0 && (
        <>
          <Heading showRule className="uppercase mt-10 text-2xl tracking-wide">
            Top Searched Movies
          </Heading>
          <Slider className="mt-4">
            {trending.map((show: TrendingShow & MongoShow, index: number) => (
              <ShowCard
                key={show._id}
                dbShow={JSON.stringify(show)}
                className="min-w-[20rem]"
                index={index + 1}
              />
            ))}
          </Slider>{" "}
        </>
      )}
      <Heading showRule className="uppercase tracking-wide mt-8 ">
        Movies
      </Heading>

      <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-y-6 md:gap-x-5 lg:grid-cols-4 ">
        {movies?.length > 0 ? (
          movies?.map((show: Movie & Tv) => <ShowCard show={show} />)
        ) : (
          <NoResult message="No Movies found" />
        )}
      </div>

      <Pagination
        page={searchParams?.page ? +searchParams?.page : 1}
        isNext={isNext}
        pages={pages}
      />
    </MaxWidthWrapper>
  );
}
