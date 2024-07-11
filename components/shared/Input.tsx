'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';

interface Props {
	placeholder: string;
}

const Search = ({ placeholder }: Props) => {
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
