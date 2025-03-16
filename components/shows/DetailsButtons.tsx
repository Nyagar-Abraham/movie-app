"use client";

import React from "react";
import ButtonComponent from "../shared/Button";
import { PlayIcon } from "lucide-react";

const DetailsButtons = () => {
  return (
    <div className="mt-5 flex items-center gap-4 flex-wrap">
      <ButtonComponent
        onClick={() => {}}
        icon={<PlayIcon className="size-4 " />}
        variant="primary"
        className="!bg-secondary-100"
      >
        Watch now
      </ButtonComponent>
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
