import {
  CastCrew,
  MongoShow,
  Movie,
  MovieDetails,
  ShowData,
  TVDetails,
} from "@/utils/interfaces";
import React from "react";
import RowList from "./RowList";
import Ratings from "../shared/Ratings";
import DisplayShowProps from "../shared/ReleaseDate";
import Genres from "./Genres";
import ButtonComponent from "../shared/Button";
import { PlayIcon } from "lucide-react";
import DetailsButtons from "./DetailsButtons";
import ProductionCompanies from "./Cast";
import Actions from "../shared/Actions";
import { useAuth } from "@clerk/nextjs";
import Cast from "./Cast";
import { BaseImageURL } from "@/constants/images";

interface ShowCardProps {
  show: MovieDetails & TVDetails;
  category: "movie" | "tv";
  mongoShow: MongoShow | null;
}

const ShowsDetailsCard = ({ show, category, mongoShow }: ShowCardProps) => {
  const {
    title,
    vote_average,
    vote_count,
    genres,
    release_date,
    runtime,
    overview,
    production_companies,
    id,
    first_air_date,
    name,
    videos,
    credits,
    seasons,
    homepage,
    poster_path,
  } = show;

  const { cast, crew } = credits;

  const crewNames = crew.map((catser: CastCrew) => catser.name).slice(0, 2);
  const castArray = cast.slice(0, 9);

  const isTv = category === "tv";

  // @ts-ignore
  const hours = Math.round(runtime / 60).toString() + "h";
  // @ts-ignore
  const mins = (runtime % 60).toString() + "min";

  const showData: ShowData = {
    title: isTv ? name : title,
    show_id: id.toString(),
    vote_average,
    vote_count,
    release_date: isTv ? first_air_date : release_date,
    poster_url: `${poster_path ? `${BaseImageURL.posterBaseUrl}${poster_path}` : `${BaseImageURL.fallback}`} `,
    category,
  };

  return (
    <div className="flex flex-col justify-end ">
      <h2 className="lg:text-[3rem] line-clamp-2  sm:text-[2rem]  font-bold text-white">
        {isTv ? name : title}
      </h2>
      {crewNames?.length > 0 && (
        <div className="gap-2 flex-wrap mt-5 flex items-center">
          <RowList
            classNameInner="space-x-[8px]"
            title="Director"
            items={crewNames?.slice(0, 1)}
          />
          <span>|</span>
          <RowList
            classNameInner="space-x-[8px]"
            title="Crew"
            items={crewNames}
          />
        </div>
      )}

      <div className="flex items-center gap-4 flex-wrap justify-between mt-2">
        <div className="flex items-center gap-2">
          <p className="uppercase tracking-wide text-white text-sm">tmdb</p>
          <Ratings
            voteAverage={vote_average}
            voteCount={vote_count}
            iconSize={20}
          />
          <DisplayShowProps
            releaseDate={isTv ? first_air_date : release_date}
          />
        </div>
        <Genres genres={genres} />
      </div>

      <div className="my-4 h-[2px] w-full bg-dark-400/50" />

      <p className="text-sm text-dark-300">{overview}</p>

      <div className="flex items-center justify-between gap-6">
        {!isTv ? (
          <RowList
            title="Duration"
            items={[hours, mins]}
            className="mt-2"
            classNameInner="!space-x-[3px]"
          />
        ) : (
          <RowList
            title="Seasons"
            items={seasons}
            className="mt-2"
            classNameInner="!space-x-[3px]"
          />
        )}

        <div className="flex gap-2 items-center">
          <Actions
            showId={id.toString()}
            showData={showData}
            mongoShow={mongoShow}
            isDetailCard
          />
        </div>
      </div>

      <DetailsButtons homepage={homepage} />
      <Cast casts={castArray} className="mt-5 hidden md:block" />
    </div>
  );
};

export default ShowsDetailsCard;
