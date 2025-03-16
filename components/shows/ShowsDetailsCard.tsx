import {
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
import ProductionCompanies from "./ProductionCompanies";
import Actions from "../shared/Actions";
import { useAuth } from "@clerk/nextjs";

interface ShowCardProps {
  show: (MovieDetails | TVDetails)[];
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
  } = show;

  // @ts-ignore
  const hours = Math.round(runtime / 60).toString() + "h";
  // @ts-ignore
  const mins = (runtime % 60).toString() + "min";

  const isTv = category === "tv";

  const showData: ShowData = {
    title: isTv ? name : title,
    show_id: id,
    vote_average,
    vote_count,
    release_date: isTv ? first_air_date : release_date,
    category,
  };

  return (
    <div className="">
      <h2 className="lg:text-[5rem] sm:text-[3rem]  font-bold text-white">
        {title}
      </h2>
      <div className="gap-2 flex-wrap mt-5 flex items-center">
        <RowList
          classNameInner="space-x-[8px]"
          title="Director"
          items={["Abraham Nyagar"]}
        />
        <span>|</span>
        <RowList
          classNameInner="space-x-[8px]"
          title="Cast"
          items={["Abraham Nyagar", "John"]}
        />
      </div>

      <div className="flex items-center gap-4 flex-wrap justify-between mt-2">
        <div className="flex items-center gap-2">
          <p className="uppercase tracking-wide text-white text-sm">tmdb</p>
          <Ratings
            voteAverage={vote_average}
            voteCount={vote_count}
            iconSize={20}
          />
          <DisplayShowProps releaseDate={release_date} />
        </div>
        <Genres genres={genres} />
      </div>

      <div className="my-4 h-[2px] w-full bg-dark-400/50" />

      <p className="text-sm text-dark-300">{overview}</p>

      <div className="flex items-center justify-between gap-6">
        <RowList
          title="Duration"
          items={[hours, mins]}
          className="mt-2"
          classNameInner="!space-x-[3px]"
        />

        <div className="flex gap-2 items-center">
          <Actions
            showId={id}
            showData={showData}
            mongoShow={mongoShow}
            isDetailCard
          />
        </div>
      </div>

      <DetailsButtons />
      <ProductionCompanies
        procuctionCompanies={production_companies}
        className="mt-4"
      />
    </div>
  );
};

export default ShowsDetailsCard;
