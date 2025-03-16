import Slider from "@/components/home/Slider";
import Search from "@/components/shared/Input";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import ShowCard from "@/components/shared/ShowCard";
import Sort from "@/components/shared/Sort";
import { sortArray } from "@/constants";
import { getAllTrending } from "@/lib/actions/trenging.action";
import { getShows } from "@/utils/api";
import { TrendingShows, Tv } from "@/utils/interfaces";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tv Shows",
};

export default async function Page({ params, searchParams }: any) {
  const [data, trending] = await Promise.all([
    getShows({
      target: "tv",
      page: searchParams?.page ? +searchParams?.page : 1,
    }),
    getAllTrending({ category: "tv" }),
  ]);
  const series = data?.results;
  const isNext = data?.page < data?.total_pages;
  const pages = data?.total_pages;

  return (
    <MaxWidthWrapper className="mt-[8rem] pb-[6rem]">
      <div className="mt-8 flex items-center justify-between flex-wrap gap-x-3 gap-y-5">
        <Search placeholder="Search for TV series..." category="tv" />
        <Sort sorts={sortArray} />
      </div>

      {trending?.length > 0 && (
        <>
          <h1 className="h-primary mt-10 ">Top Searched </h1>
          <Slider className="mt-4">
            <div className="overflow-hidden overflow-x-auto flex items-center gap-8 hide-scrollbar ">
              {trending?.map((show: TrendingShows, index: number) => (
                <ShowCard
                  key={show._id}
                  trendingShow={show}
                  className="min-w-[20rem]"
                  index={index + 1}
                />
              ))}
            </div>
          </Slider>
        </>
      )}

      <h1 className="h-primary mt-8 ">TV shows</h1>
      <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-y-6 md:gap-x-5 lg:grid-cols-4 ">
        {series.length > 0 ? (
          series.map((show: Tv) => (
            <ShowCard key={show.id} show={show} category="tv" />
          ))
        ) : (
          <NoResult message="No tv series founr" />
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
