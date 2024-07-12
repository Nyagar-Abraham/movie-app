import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import {
	createUserParams,
	deleteUserParams,
	GetAllUsersParams,
	updateUserParams,
} from '../shared.types';
import { revalidatePath } from 'next/cache';
import { FilterQuery } from 'mongoose';

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

		console.log(clerkId, updateData, path);

		const user = User.findOneAndUpdate({ clerkId }, updateData, { new: true });

		if (path) revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getUserById(params: { userId: string }) {
	try {
		connectToDatabase();

		const user = User.findById(params.userId);

		return user;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
export async function getUserByClerkId(params: { clerkId: string }) {
	try {
		connectToDatabase();

		const { clerkId } = params;

		const user = User.findOne({ clerkId });

		return user;
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

export async function getAllUsers(params: GetAllUsersParams) {
	try {
		connectToDatabase();

		const { page = 1, pageSize = 12, searchQuery, sortBy } = params;

		const skipAmount = (page - 1) * pageSize;

		let query: FilterQuery<typeof User> = {};
		if (searchQuery) {
			query = {
				$or: [
					{ name: { $regex: searchQuery, $options: 'i' } },
					{ username: { $regex: searchQuery, $options: 'i' } },
				],
			};
		}

		let sortOptions = { joinedAt: -1 };

		if (sortBy) {
			switch (sortBy) {
				case 'most active':
					// @ts-ignore
					sortOptions = { actions: -1 };
					break;
				default:
					break;
			}
		}

		const users = await User.aggregate([
			{ $match: query },
			{ $addFields: { actions: { $size: '$interactions' } } },
			// @ts-ignore
			{ $sort: sortOptions },
			{ $skip: skipAmount },
			{ $limit: pageSize },
			{
				$project: {
					actions: 0,
				},
			},
		]);

		const totalUsers = await User.countDocuments(query);

		const isNext = totalUsers > skipAmount + users.length;

		const pages = Math.ceil(totalUsers / pageSize);

		return { users, isNext, pages };
	} catch (error) {
		console.log(error);
		throw error;
	}
}
