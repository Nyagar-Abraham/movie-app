"use client";

import { Movie, Tv } from "@/utils/interfaces";
import React from "react";
import Heading from "./heading";
import { usePopularMoviesContext } from "@/context/PopularMoviesContext";
import Ratings from "../shared/Ratings";
import { DotIcon, PlayCircleIcon, PlayIcon } from "lucide-react";
import ButtonsContainer from "../shared/ButtonsContainer";
import { Button } from "../ui/button";
import ButtonComponent from "../shared/Button";
import { useRouter, useSearchParams } from "next/navigation";
import DisplayShowProps from "../shared/ReleaseDate";

interface HomeImageDescriptionProps {
  popularShows: Movie[] & Tv[];
}

const HomePageDescription = ({ popularShows }: HomeImageDescriptionProps) => {
  const router = useRouter();
  const searchparams = useSearchParams();

  const isTv = searchparams.get("category") === "tv";

  const { index } = usePopularMoviesContext();

  const currentShow: Movie & Tv = popularShows[index];

  const {
    title,
    overview,
    release_date,
    vote_average,
    vote_count,
    id,
    first_air_date,
    name,
  } = currentShow;

  function handleClick() {
    const route = isTv ? `/tv/${id}` : `/movies/${id}`;
    router.push(route);
  }

  return (
    <div className="">
      <Heading className="font-bold  text-2xl text-white">
        {isTv ? name : title}
      </Heading>

      <div className="flex mt-6 flex-wrap gap-4 items-center">
        <Ratings
          voteAverage={vote_average}
          voteCount={vote_count}
          iconSize={20}
        />
        <DisplayShowProps releaseDate={isTv ? first_air_date : release_date} />
      </div>
      <p className="text-sm text-dark-200 mt-5 line-clamp-4">{overview}</p>

      <ButtonsContainer className="mt-6">
        <ButtonComponent
          onClick={handleClick}
          icon={<PlayIcon className="size-[20px] text-white " />}
          variant="primary"
        >
          Watch Now
        </ButtonComponent>
        <ButtonComponent onClick={handleClick} variant="secondary">
          Trailer
        </ButtonComponent>
      </ButtonsContainer>
    </div>
  );
};

export default HomePageDescription;
