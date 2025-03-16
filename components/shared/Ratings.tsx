import { icons } from "@/constants/icons";
import Image from "next/image";
import React from "react";

interface Ratingsprops {
  voteAverage: number;
  voteCount: number;
  className?: string;
  iconSize: number;
}

const Ratings = ({
  voteAverage,
  voteCount,
  className,
  iconSize,
}: Ratingsprops) => {
  return (
    <div className="space-x-[0.25rem] flex items-center ">
      <Image
        src={icons.star}
        alt="star icon"
        width={iconSize}
        height={iconSize}
      />
      <span className="text-base text-dark-300 font-semibold">
        {voteAverage?.toFixed(1)}
      </span>
      <span className="text-sm text-dark-100 ">|</span>
      <span className="text-sm text-dark-200">{voteCount}</span>
    </div>
  );
};

export default Ratings;
