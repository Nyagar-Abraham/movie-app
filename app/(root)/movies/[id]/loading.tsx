import { Skeleton } from "@/components/ui/skeleton";

const Loading = async ({ params }: any) => {
  return (
    <>
      <div className="mt-8">
        <Skeleton className="w-[60px] h-[20px] rounded-lg" />
      </div>

      <div className="mt-20  mx-auto rounded-lg relative  gap-10 overflow-hidden dark:shadow-lg   shadow-md  ">
        <Skeleton className="w-10/12 h-[50rem]  rounded-lg md:ml-10" />
      </div>
    </>
  );
};

export default Loading;
