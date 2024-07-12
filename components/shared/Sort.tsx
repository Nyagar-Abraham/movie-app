'use client';

import { formUrlQuery, removeUrlQuery } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect, useState } from 'react';

interface Props {
	sorts: string[];
}

const Sort = ({ sorts }: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const [active, setActive] = useState(searchParams.get('sort') || '');

	useEffect(() => {
		if (active) {
			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: 'sort',
				value: active,
			});

			router.push(newUrl, { scroll: false });
		} else {
			const newUrl = removeUrlQuery({
				params: searchParams.toString(),
				keysToRemove: ['sort'],
			});

			router.push(newUrl, { scroll: false });
		}
	}, [pathname, active]);

	return (
		<div className="flex gap-3 items-center px-8 ">
			{sorts.map((item) => (
				<button
					onClick={() => {
						if (active !== item) {
							setActive(item);
						} else {
							setActive('');
						}
					}}
					key={item}
					className={`text-sm  bg-dark90-light10 text-light90-dark10 px-3 py-1 rounded-md hover:bg-light-blue ${active === item && 'bg-gradient-to-br from-red to-red/70'} `}
				>
					{item}
				</button>
			))}
		</div>
	);
};

export default Sort;
