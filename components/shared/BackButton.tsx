'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
	const router = useRouter();

	return (
		<button
			className="text-rose-50  py-1 px-3 bg-gradient-to-br from-rose-800 to-slate-700 text-red-100 hover:scale-[1.01] transition-all duration-200 font-semibold text-sm rounded-md flex-center gap-1"
			onClick={() => router.back()}
		>
			<FaArrowLeft />
			<span>back</span>
		</button>
	);
};

export default BackButton;
