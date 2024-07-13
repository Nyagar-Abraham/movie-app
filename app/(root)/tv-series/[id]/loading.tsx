import { Skeleton } from '@/components/ui/skeleton';

const Loading = async ({ params }: any) => {
	return (
		<>
			<div className="mt-8">
				<Skeleton className="w-[60px] h-[20px] rounded-lg" />
			</div>

			<div className="mt-11 rounded-lg relative grid gap-10 overflow-hidden dark:shadow-lg md:grid-cols-2   shadow-md  ">
				<Skeleton className="w-[400px] sm:w-[600px] md:w-[700px] lg:w-[800px] h-[400px] rounded-lg md:ml-10" />
			</div>
		</>
	);
};

export default Loading;
