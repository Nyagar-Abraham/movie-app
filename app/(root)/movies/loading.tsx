import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading({ params, searchParams }: any) {
  return (
    <>
      <MaxWidthWrapper>
        <div className="mt-8 flex items-center flex-wrap gap-x-3 gap-y-5">
          <Skeleton className="flex-1 h-[36px] rounded-lg" />
          <Skeleton className="flex-1 h-[36px] rounded-lg" />
        </div>

        <h1 className="h-primary mt-8 ">Movies</h1>

        <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-y-6 md:gap-x-5 lg:grid-cols-4 ">
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
          <Skeleton className=" h-[180px] w-full   rounded-lg" />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
