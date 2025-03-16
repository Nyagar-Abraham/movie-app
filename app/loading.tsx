import { Skeleton } from '@/components/ui/skeleton';

export default async function Loading({ params, searchParams }: any) {
	return (
		<div className="w-screen">
			<div className="mt-8 flex items-center flex-wrap gap-x-3 gap-y-5">
				<Skeleton className="flex-1 h-[36px] rounded-lg" />
				<Skeleton className="flex-1 h-[36px] rounded-lg" />
			</div>
			<h1 className="h-primary mt-8 ">Trending</h1>
			<div className=" mt-3 overflow-x-auto whitespace-no-wrap  scrollbar-hidden">
				<div className="flex gap-4 items-center">
					<Skeleton className="flex-none w-[300px] h-[200px] rounded-lg" />
					<Skeleton className="flex-none w-[300px] h-[200px] rounded-lg" />
					<Skeleton className="flex-none w-[300px] h-[200px] rounded-lg" />
					<Skeleton className="flex-none w-[300px] h-[200px] rounded-lg" />
				</div>
			</div>
			<h1 className="h-primary mt-8 ">Recommended for you</h1>
			<div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-y-6 md:gap-x-5 lg:grid-cols-4 ">
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
				<Skeleton className=" h-[120px] w-full   rounded-lg" />
			</div>
		</div>
	);
}
