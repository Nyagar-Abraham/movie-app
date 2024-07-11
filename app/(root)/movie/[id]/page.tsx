import { getMovieById } from '@/lib/actions/show.action';
import Image from 'next/image';

const page = async ({ params }: any) => {
	const movie = await getMovieById({ movieId: params.id });

	const {
		thumbnail: {
			regular: { large },
		},
	} = movie;
	return (
		<div className="relative">
			<Image
				src={large.substring(1)}
				alt="large thumbnail "
				fill
				// placeholder="blur"
				className="object-cover  "
			/>
		</div>
	);
};

export default page;
