import User from '@/database/user.model';
import mongoose from 'mongoose';

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
			dbName: 'movie',
		});

		isConnected = true;
		// await User.updateMany(
		// 	{},
		// 	{
		// 		$set: { interactions: [] },
		// 	}
		// );
		// console.log('update field');

		console.log('mongodb connected');
	} catch (error) {
		console.log(error);
		throw error;
	}
};
