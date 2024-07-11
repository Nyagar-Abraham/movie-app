import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { createUserParams, deleteUserParams, updateUserParams } from '../shared.types';
import { revalidatePath } from 'next/cache';

export async function createUser(user: createUserParams) {
	try {
		connectToDatabase();

		const newUser = await User.create(user);

		return newUser;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function updateUser(params: updateUserParams) {
	try {
		connectToDatabase();

		const { clerkId, updateData, path } = params;

		await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function deleteUser(params: deleteUserParams) {
	try {
		connectToDatabase();

		const { clerkId } = params;

		const user = await User.findOneAndDelete({ clerkId });

		if (!user) {
			return console.log('user not found');
		}

		//TODO:interactions
	} catch (error) {
		console.log(error);
		throw error;
	}
}
