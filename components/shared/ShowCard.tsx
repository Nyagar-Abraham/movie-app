"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import Bookmark from "./Actions";
import Play from "./Play";
import { getYearAsString } from "@/lib/utils/utils";
import { MongoShow, Movie, TrendingShow, Tv } from "@/utils/interfaces";
import { icons } from "@/constants/icons";
import { BaseImageURL } from "@/constants/images";
import Ratings from "./Ratings";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { title } from "process";

type ShowCardProps = {
  show?: Movie & Tv;
  className?: string;
  category?: "movie" | "tv";
  dbShow?: string;
  index?: number;
  showRating?: boolean;
};

const ShowCard = ({
  show,
  className,
  category,
  dbShow,
  index,
  showRating,
}: ShowCardProps) => {
  const [open, setOpen] = useState(false);
  const seachparams = useSearchParams();
  const isTv = seachparams.get("category") === "tv" || category === "tv";

  // @ts-ignore
  const parsedDbShow: TrendingShow & MongoShow = dbShow && JSON.parse(dbShow);

  if (dbShow)
    return (
      <Link
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        href={`${!isTv ? `/movies/${parsedDbShow?.show_id}` : `/tv/${parsedDbShow?.show_id}`}`}
        className={cn(
          "relative  rounded-md overflow-hidden  flex-col gap-2 shadow-sm min-h-[24rem]  border border-transparent ",
          className
        )}
      >
        <div className="absolute z-10 text-[5rem] font-bold top-0 left-0  text-accent-100 ">
          {index && index}
        </div>
        <div className="absolute z-20 inset-x-0 bottom-0 h-[8rem] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        <Image
          src={parsedDbShow?.poster_url || `${BaseImageURL.fallback}`}
          alt={`${title} poster`}
          className="object-cover transition-all duration-500 hover:scale-[1.1]"
          fill
          quality={100}
        />
        <Play width={20} height={20} open={open} />

        <div className="rounded-b-md absolute bottom-0 inset-x-0 backdrop-blur-md p-4 z-20 ">
          <h2 className="font-semibold text-2xl mb-3 line-clamp-1">
            {parsedDbShow?.title}
          </h2>

          {showRating && (
            <div className="flex flex-wrap gap-6 paragraph  ">
              <Ratings
                voteAverage={parsedDbShow?.vote_average}
                voteCount={parsedDbShow?.vote_count}
                iconSize={20}
              />

              <p className="flex gap-2 items-center">
                <FaDotCircle className="size-[4px]" />{" "}
                <span>{parsedDbShow?.release_date?.split("-")[0]}</span>
              </p>
            </div>
          )}
        </div>
      </Link>
    );

  return (
    <Link
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      href={`${!isTv ? `/movies/${show?.id}` : `/tv/${show?.id}`}`}
      className={cn(
        "relative min-h-[24rem] rounded-md overflow-hidden  flex-col gap-2 shadow-sm   ",
        className
      )}
    >
      <div className="absolute z-10 inset-x-0 bottom-0 h-[12rem] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      <Image
        src={
          show?.poster_path
            ? `${BaseImageURL.posterBaseUrl}${show?.poster_path}`
            : `${BaseImageURL.fallback}`
        }
        alt={` ${isTv ? show?.name : show?.title} poster`}
        className="object-cover transition-all duration-500 hover:scale-[1.1]"
        fill
        quality={100}
      />
      <Play width={20} height={20} open={open} />

      <div className="rounded-b-md absolute bottom-0 inset-x-0 backdrop-blur-md p-4 z-20 ">
        <h2 className="font-semibold text-2xl mb-3 line-clamp-1">
          {isTv ? show?.name : show?.title}
        </h2>

        <div className="flex flex-wrap gap-6 paragraph  ">
          <Ratings
            voteAverage={show?.vote_average}
            voteCount={show?.vote_count}
            iconSize={20}
          />

          <p className="flex gap-2 items-center">
            <FaDotCircle className="size-[4px]" />{" "}
            <span>
              {isTv
                ? show?.first_air_date?.split("-")[0]
                : show?.release_date?.split("-")[0]}
            </span>{" "}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;
