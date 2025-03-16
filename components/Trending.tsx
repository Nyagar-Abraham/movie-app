"use client";

import Image from "next/image";

import { useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import Play from "./shared/Play";
import Bookmark from "./shared/Actions";
import { getYearAsString } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";

interface Props {
  _id: string;
  title: string;
  thumbnail: string;
  rating: string;
  category: string;
  isBookmarked: boolean;
  year: Date;
}

const Trending = ({
  _id,
  title,
  thumbnail,
  rating,
  category,
  isBookmarked,
  year,
}: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const id = JSON.parse(_id);

  return (
    <div
      onDoubleClick={() =>
        router.push(
          `${category === "Movie" ? `/movie/${id}` : `/tv-series/${id}`}`
        )
      }
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative flex-1 inline-block flex-none rounded-md overflow-hidden "
    >
      <Image
        src={thumbnail.substring(1)}
        alt={`${title} thumbnail`}
        className="object-cover"
        width={400}
        height={200}
      />

      <Bookmark isBookmarked={isBookmarked} />

      <Play width={24} height={24} open={open} />

      <div className="absolute bottom-5 left-2 bg-transparent backdrop-blur-2">
        <div className="flex items-center gap-2">
          <p className="text-l-blue font-light text-slate-100!">
            {getYearAsString(year)}/
          </p>
          <p className="flex items-center gap-1 text-slate-100!">
            <span className="flex items-center  text-l-blue">
              <FaDotCircle className="w-1 h-1" />
            </span>
            <Image
              src={`${category !== "Movie" ? "/assets/icon-category-tv.svg" : "/assets/icon-category-movie.svg"}`}
              alt={"category icon"}
              className="dark:invert  invert-0 "
              width={12}
              height={12}
            />
            <span className="text-l-blue font-light">{category}</span>
          </p>
          <p className="flex gap-1 items-center ">
            <span className="flex-center text-pure-white">
              <FaDotCircle className="w-1 h-1" />
            </span>
            <span className="text-l-blue font-light">{rating}</span>
          </p>
        </div>
        <p className="h-secondary-small text-slate-50">{title}</p>
      </div>
    </div>
  );
};

export default Trending;
