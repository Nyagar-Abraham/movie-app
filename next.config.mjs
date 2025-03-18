import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
			},
			{
				protocol: 'http',
				hostname: '*',
			},
		],
	},
};

export default withNextVideo(nextConfig);