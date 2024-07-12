'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useSearchParams } from 'next/navigation';

const Slider = ({ children }: { children: React.ReactNode }) => {
	const [paused, setPaused] = useState(false);
	const slider: any = useRef();
	const searchParams = useSearchParams();
	const filter = searchParams.get('filter');

	// useGSAP(() => {
	// 	const sliderWidth = document.getElementById('slider')?.offsetWidth || 0;

	// 	slider.current = gsap.to('#slider', {
	// 		x: -sliderWidth,
	// 		duration: 30, // Adjust the duration as needed
	// 		repeat: -1,
	// 		yoyo: true,
	// 		repeatDelay: 1,
	// 		ease: 'none', // Linear motion
	// 	});
	// }, []);

	useEffect(() => {
		const sliderWidth = document.getElementById('slider')?.offsetWidth || 0;

		slider.current = gsap.to('#slider', {
			x: -sliderWidth,
			duration: 30, // Adjust the duration as needed
			repeat: -1,
			yoyo: true,
			repeatDelay: 1,
			ease: 'none', // Linear motion
		});
	}, [filter]);

	if (filter) return null;

	return (
		<div
			id="slider"
			className="flex  space-x-4  min-w-full"
			onMouseLeave={() => {
				if (paused) {
					slider.current.play();
					setPaused(false);
				}
			}}
			onClick={() => {
				if (!paused) {
					slider.current.pause();
					setPaused(true);
				} else {
					slider.current.play();
					setPaused(false);
				}
			}}
		>
			{children}
		</div>
	);
};

export default Slider;
