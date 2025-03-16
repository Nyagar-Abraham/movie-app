import SelectCategory from "@/components/home/SelectCategory";
import Search from "@/components/shared/Input";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import ShowCard from "@/components/shared/ShowCard";
import Sort from "@/components/shared/Sort";
import UserCard from "@/components/user/UserCard";
import { sortArray, usersortArray } from "@/constants";
import { BaseImageURL } from "@/constants/images";
import { getAllUsers, getUserByClerkId } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import { getShows } from "@/utils/api";
import { Movie, TrendingShow, Tv } from "@/utils/interfaces";
import { auth } from "@clerk/nextjs/server";

import Link from "next/link";
import { useEffect } from "react";

export async function generateMetadata({
  params,
  seachparams,
}: {
  params: { id: string };
  seachparams: { category: string };
}) {
  return { title: `Search ${seachparams?.category} ` };
}

export default async function Page({ params, searchParams }: any) {
  const category = searchParams?.category;
  const isTv = category === "tv";
  const query = searchParams?.query || "";

  const target = isTv ? "searchTv" : "searchMovie";

  const [data] = await Promise.all([
    getShows({
      target,
      query,
      page: searchParams?.page ? +searchParams?.page : 1,
    }),
  ]);
  const shows = data?.results;
  const isNext = data?.page < data?.total_pages;
  const pages = data?.total_pages;

  let message;

  if (!searchParams?.query) {
    message = "Please enter a seach query";
  } else {
    message = `No result found for ${query}`;
  }

  const isValid = shows?.length > 0;

  let showData;

  if (query) {
    const firstShow = shows[0];
    showData = {
      searchTerm: query,
      show_id: firstShow?.id,
      title: isTv ? firstShow?.name : firstShow?.title,
      vote_average: firstShow?.vote_average,
      vote_count: firstShow?.vote_count,
      release_date: isTv ? firstShow?.first_air_date : firstShow?.release_date,
      count: 0,
      poster_url: `${BaseImageURL?.posterBaseUrl}${firstShow?.poster_path}`,
      category: isTv ? "tv" : "movie",
    };
  }

  return (
    <MaxWidthWrapper className="mt-[8rem] pb-[6rem]">
      <div className="mt-8 flex items-center flex-wrap justify-between gap-x-3 gap-y-5">
        <Search
          placeholder="Search for TV series..."
          isValid={isValid}
          showData={showData as TrendingShow}
          category={isTv ? "tv" : "movie"}
        />
        <div className="flex items-center gap-3">
          <SelectCategory />
          {/* <Sort sorts={sortArray} /> */}
        </div>
      </div>

      {query && shows?.length > 0 && (
        <h1 className="h-primary mt-8 ">{`${shows.length} results out of ${data?.total_results} for ${query}`}</h1>
      )}

      <div
        className={cn("p-4 mt-3 ", {
          "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-y-6 md:gap-x-5 lg:grid-cols-4":
            shows.length > 0,
          "min-h-[40rem] w-full ": shows.length === 0,
        })}
      >
        {shows.length > 0 ? (
          shows.map((show: Movie | Tv) => (
            <ShowCard key={show.id} show={show} />
          ))
        ) : (
          <NoResult message={message} />
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
