import { BaseImageURL } from "@/constants/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface ProductionCompaniesProps {
  procuctionCompanies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  className?: string;
}

const ProductionCompanies = ({
  procuctionCompanies,
  className,
}: ProductionCompaniesProps) => {
  return (
    <div
      className={cn(
        "flex   items-center w-full hide-scrollbar overflow-scroll ",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {procuctionCompanies.map((company) => (
          <div className="relative size-8 " key={company.id}>
            <Image
              src={`${BaseImageURL.backdropBaseUrl}${company.logo_path}`}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionCompanies;
