import mongoose from 'mongoose';
import app from 'next/app';
import { connected } from 'process';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
	mongoose.set('strictQuery', true);

	if (!process.env.NEXT_PUBLIC_MONGODB_URL) {
		return console.log('MISSING MONGO URL');
	}

	if (isConnected) {
		return;
	}

	try {
		await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL, {
			dbName: 'movie-app',
		});

		isConnected = true;

		console.log('mongodb connected');
	} catch (error) {
		console.log(error);
		throw error;
	}
};
