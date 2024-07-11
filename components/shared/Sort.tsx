import { sorts } from '@/constants';
import React from 'react';

const Sort = () => {
	return (
		<div className="flex gap-3 items-center px-8 ">
			{sorts.map((item) => (
				<button
					key={item}
					className={`text-sm  bg-dark90-light10 text-light90-dark10 px-3 py-1 rounded-md hover:bg-light-blue ${item === 'popular' && 'bg-gradient-to-br from-red to-red/70'} `}
				>
					{item}
				</button>
			))}
		</div>
	);
};

export default Sort;
