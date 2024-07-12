// import Interaction from '@/database/interactions.model';
// import { connectToDatabase } from '../mongoose';
// import { getUserInteractionParams } from '../shared.types';
// import { FilterQuery } from 'mongoose';

// export async function getUserInterActions(params: getUserInteractionParams) {
// 	try {
//     connectToDatabase();

//     const { page, pageSize, userId, searchQuery, sortBy } = params

//     // const skipAmount = (page - 1) * pageSize;

//     let query: FilterQuery<typeof Interaction> = {}
//     if (searchQuery) {
//        console.log('');
//     }

//     let sortOptions = {}

//     if (sortBy) {
//       switch (sortBy) {
//         case 'old':
//           break;
//         default:
//           break;
//       }
//     }

//     const interactions = await Interaction.find({ user: userId });

//     return {interactions}
// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// }
