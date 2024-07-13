'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { useSearchParams } from 'next/navigation';

const Slider = ({ children }: { children: React.ReactNode }) => {
	const [paused, setPaused] = useState(false);
	// const sliderRef = useRef<HTMLDivElement | null>(null);
	const animation: any = useRef();
	const searchParams = useSearchParams();
	const filter = searchParams.get('filter');

	const updateAnimation = () => {
		const div = document.getElementById('slider');

		if (div) {
			// @ts-ignore
			const childrenArray = Array.from(div.children);
			const width = childrenArray.reduce(
				(acc, child) => acc + (child as HTMLElement).offsetWidth,
				0
			);
			const margin = div.getBoundingClientRect().left;
			const screenWidth = window.innerWidth;
			const sliderWidth = width - (screenWidth - margin);

			if (animation.current) {
				animation.current.kill();
			}

			animation.current = gsap.to('#slider', {
				x: -sliderWidth,
				duration: 35,
				repeat: -1,
				yoyo: true,
				repeatDelay: 1,
				ease: 'none',
			});
		}
	};

	useEffect(() => {
		updateAnimation();

		const handleResize = () => {
			updateAnimation();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			if (animation.current) {
				animation.current.kill();
			}
			window.removeEventListener('resize', handleResize);
		};
	}, [filter]);

	if (filter) return null;

	return (
		<div
			id="slider"
			// ref="sliderRef'
			className="flex  space-x-4  min-w-full"
			onMouseLeave={() => {
				if (paused) {
					animation.current.play();
					setPaused(false);
				}
			}}
			onClick={() => {
				if (!paused) {
					animation.current.pause();
					setPaused(true);
				} else {
					animation.current.play();
					setPaused(false);
				}
			}}
		>
			{children}
		</div>
	);
};

export default Slider;
