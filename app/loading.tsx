import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading({ params, searchParams }: any) {
  return (
    <div className="w-screen relative h-screen">
      <div className="mfixed inset-x-0 top-0 h-[3.9rem]">
        <Skeleton className="w-full" />
      </div>
      <MaxWidthWrapper>
        <div className="flex justify-between items-center mt-[30rem]">
          <Skeleton className="flex-none w-[500px] h-[300px] rounded-lg" />
          <Skeleton className="flex-none w-[500px] h-[300px] rounded-lg" />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
