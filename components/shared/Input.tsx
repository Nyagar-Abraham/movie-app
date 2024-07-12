'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formUrlQuery, removeUrlQuery } from '@/lib/utils';

interface Props {
	placeholder: string;
}

const Search = ({ placeholder }: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [search, setSearch] = useState(searchParams.get('filter') || '');

	useEffect(() => {
		const deBounce = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'filter',
					value: search,
				});

				router.push(newUrl, { scroll: false });
			} else {
				const newUrl = removeUrlQuery({
					params: searchParams.toString(),
					keysToRemove: ['filter'],
				});

				router.push(newUrl, { scroll: false });
			}
		}, 300);

		return () => {
			clearTimeout(deBounce);
		};
	}, [search, pathname]);

	return (
		<div className="flex gap-2 items-center  text-light90-dark10  rounded-md flex-1 min-w-fit  ">
			<Image
				src="/assets/icon-search.svg"
				width={30}
				height={30}
				alt="search icon"
				className="invert dark:invert-0"
			/>
			<Input
				// @ts-ignore
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
				type="text"
				placeholder={placeholder}
				className="bg-transparent 
        dark:hover:bg-dark-blue 
        focus:border-b
				focus:border-slate-300 dark:focus:border-light-blue caret-red flex-1    "
			/>
		</div>
	);
};

export default Search;
