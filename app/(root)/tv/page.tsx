import Heading from "@/components/home/heading";
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
import { MongoShow, Movie, TrendingShow, Tv } from "@/utils/interfaces";
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
          <Heading showRule className="uppercase mt-10 text-2xl tracking-wide">
            Top Searched tv shows
          </Heading>
          <Slider className="mt-4">
            {trending.map((show: TrendingShow & MongoShow, index: number) => (
              <ShowCard
                key={show._id}
                dbShow={show}
                className="min-w-[20rem]"
                index={index + 1}
              />
            ))}
          </Slider>{" "}
        </>
      )}
      <Heading showRule className="uppercase mt-8 text-2xl tracking-wide">
        Tv shows
      </Heading>
      <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-y-6 md:gap-x-5 lg:grid-cols-4 ">
        {series.length > 0 ? (
          series.map((show: Tv & Movie) => (
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
