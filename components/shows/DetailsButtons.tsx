"use client";

import React from "react";
import ButtonComponent from "../shared/Button";
import { PlayIcon } from "lucide-react";
import Link from "next/link";

interface DetailsButtons {
  homepage: string | null;
}

const DetailsButtons = ({ homepage }: DetailsButtons) => {
  return (
    <div className="mt-5 flex items-center max-md:items-stretch gap-4 flex-wrap">
      {homepage && (
        <Link href={homepage} className="px-4 py-2 bg-secondary-100 rounded-md">
          View homepage
        </Link>
      )}
      <ButtonComponent
        onClick={() => {}}
        icon={<PlayIcon className="size-4 " />}
        variant="secondary"
      >
        Add to Watchlist
      </ButtonComponent>
    </div>
  );
};

export default DetailsButtons;
