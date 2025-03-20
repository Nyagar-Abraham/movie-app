"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Movie, MovieDetails, Tv } from "@/utils/interfaces";
import { BaseImageURL } from "@/constants/images";
import { cn } from "@/lib/utils";
import { usePopularMoviesContext } from "@/context/PopularMoviesContext";

interface ImageProps {
  popularShows?: (Movie | Tv)[];
  image: "poster" | "backdrop";
  className?: string;
  show?: MovieDetails;
}

const ImageComponent = ({
  popularShows,
  show,
  image,
  className,
}: ImageProps) => {
  const { index, incrementIndex, resetIndex } = usePopularMoviesContext();

  useEffect(() => {
    if (!popularShows) return;
    const isCount = localStorage.getItem("count");
    if (!isCount) localStorage.setItem("count", JSON.stringify(0));
    console.log({ isCount });

    const intervalId = setInterval(() => {
      const storedCount = localStorage.getItem("count");
      console.log({ storedCount });
      if (storedCount) {
        const newCount = JSON.parse(storedCount) + 1;
        console.log(newCount);
        if (newCount < popularShows?.length) {
          incrementIndex(newCount);
          localStorage.setItem("count", JSON.stringify(newCount));
        } else {
          resetIndex();
          localStorage.setItem("count", JSON.stringify(-1));
        }
      }
    }, 20000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  let BgIMages;

  if (popularShows) {
    BgIMages = {
      poster_path: `${BaseImageURL.posterBaseUrl}${popularShows[index].poster_path}`,
      backdrop_path: `${BaseImageURL.posterBaseUrl}${popularShows[index].backdrop_path}`,
    };
  } else {
    BgIMages = {
      poster_path: `${BaseImageURL.posterBaseUrl}${show?.poster_path}`,
      backdrop_path: `${BaseImageURL.posterBaseUrl}${show?.backdrop_path}`,
    };
  }

  let renderedImage;

  if (image === "poster") {
    renderedImage = BgIMages.poster_path;
  } else {
    renderedImage = BgIMages.backdrop_path;
  }

  const dispalyImage = renderedImage ?? BaseImageURL.fallback;
  return (
    renderedImage && (
      <Image
        fill
        src={dispalyImage}
        alt="Home Background image"
        className={cn("object-cover object-center z-0 ", className)}
        quality={90}
      />
    )
  );
};

export default ImageComponent;
