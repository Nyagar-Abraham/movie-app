'use client';

import { useState } from 'react';

import { ratingMessage } from '@/constants';
import StarRating from './StarRating';

const Rating = () => {
	const [rating, setRating] = useState();
	return (
		<div className="flex gap-4 items-center">
			<p className="text-sm dark:text-slate-100 text-slate-700">
				Leave a rating
			</p>
			<StarRating
				maxRating={5}
				color="#fc4747"
				onSetMovieRating={setRating}
				messages={ratingMessage}
				size={48}
				defaultRating={0}
				className="test"
			/>
		</div>
	);
};

export default Rating;
