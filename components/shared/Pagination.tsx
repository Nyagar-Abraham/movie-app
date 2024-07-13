'use client';

import { formUrlQuery } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

interface Props {
	page: number;
	isNext: boolean;
	pages: number;
}

const Pagination = ({ page, isNext, pages }: Props) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	const curPage = page || 1;

	const handlePage = (action: string) => {
		if (action === 'next') {
			const nextPage = curPage + 1;

			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: 'page',
				value: nextPage?.toString(),
			});

			router.push(newUrl, { scroll: false });
		} else {
			const nextPage = curPage - 1;
			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: 'page',
				value: nextPage?.toString(),
			});

			router.push(newUrl, { scroll: false });
		}
	};

	if (page === 1 && !isNext) return null;

	return (
		<div className="mt-16 flex gap-4 items-center justify-center">
			<button
				disabled={curPage === 1}
				className={`dark:text-rose-100 text-slate-800 h-[36px] w-[36px] rounded-lg bg-gradient-to-br from-slate-300 to-slate-100 dark:from-rose-800 dark:to-slate-700  flex-center hover:text-red   flex-center hover:bg-pure-white ${page === 1 && 'cursor-not-allowed'}`}
				onClick={() => handlePage('prev')}
			>
				<FaAnglesLeft />
			</button>

			<p className="bg-gradient-to-br  from-slate-300 to-slate-100 dark:from-rose-800 dark:to-slate-700  flex-center   px-6 py-2 rounded-lg dark:text-pure-white text-slate-800 flex gap-1 ">
				page
				<span className="font-semibold">{page}</span>
				of
				<span className="font-semibold">{pages}</span>
			</p>

			<button
				disabled={!isNext}
				className={`dark:text-rose-100 text-slate-800  h-[36px] w-[36px] rounded-lg bg-gradient-to-br  from-slate-300 to-slate-100 dark:from-rose-800 dark:to-slate-700  flex-center hover:text-red hover:bg-pure-white ${!isNext && 'cursor-not-allowed'}`}
				onClick={() => handlePage('next')}
			>
				<FaAnglesRight />
			</button>
		</div>
	);
};

export default Pagination;
