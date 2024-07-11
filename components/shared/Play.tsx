import Image from 'next/image';

interface Props {
	open: boolean;
	width: number;
	height: number;
}

const Play = ({ open, width, height }: Props) => {
	return (
		<div
			className={`absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 rounded-full bg-slate-200/40  items-center gap-4 px-4 py-2 ${open ? 'flex' : 'hidden'}`}
		>
			<Image
				src="/assets/icon-play.svg"
				alt={`play icon`}
				className="object-cover"
				width={width}
				height={height}
			/>
			<p className="text-pure-white ">Play</p>
		</div>
	);
};

export default Play;
