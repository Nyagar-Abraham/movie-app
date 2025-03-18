import { Skeleton } from '@/components/ui/skeleton';

const page = async ({ params }: any) => {
	return (
		<div className="max-w-[600px] mx-auto">
			<Skeleton className="w-full h-full rounded-full" />
		</div>
	);
};

export default page;
