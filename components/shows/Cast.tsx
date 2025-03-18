import { BaseImageURL } from "@/constants/images";
import { cn } from "@/lib/utils";
import { CastCrew } from "@/utils/interfaces";
import Image from "next/image";
import React from "react";

interface CastProps {
  casts: CastCrew[];
  className?: string;
}

const Cast = ({ casts, className }: CastProps) => {
  return (
    <div className={cn("  w-full ", className)}>
      <h2 className="font-semibold text-2xl"> Actors</h2>
      <div className="flex mt-3 items-center gap-3 overflow-scroll hide-scrollbar  ">
        {casts.map((cast) => (
          <div className="min-w-[6rem]  " key={cast.id}>
            <Image
              src={`${BaseImageURL.backdropBaseUrl}${cast.profile_path}`}
              alt="logo"
              width={50}
              height={50}
              className="object-cover rounded-full mx-auto"
            />
            <p className="text-xs mt-3 line-clamp-1 text-dark-200">
              {cast.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
