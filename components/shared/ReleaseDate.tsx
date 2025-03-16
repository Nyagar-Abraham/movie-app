import { DotIcon } from "lucide-react";
import React from "react";

interface DisplayShowPropsProps {
  releaseDate: string;
}

const ReleaseDate = ({ releaseDate }: DisplayShowPropsProps) => {
  return (
    <div className="flex items-center space-x-[0.4rem] text-sm text-dark-300">
      <DotIcon className="size-[6px] text-dark-200" />
      <span>{releaseDate?.split("-")[0]}</span>
    </div>
  );
};

export default ReleaseDate;
