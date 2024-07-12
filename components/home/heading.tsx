'use client';
import { useSearchParams } from 'next/navigation';

const Heading = () => {
	const searchParams = useSearchParams();
	const filter = searchParams.get('filter');
	const sort = searchParams.get('sort');
	if (filter || sort) return null;

	return <h1 className="h-primary mt-8 ">Trending</h1>;
};

export default Heading;
