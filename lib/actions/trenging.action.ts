"use server";

import Trending from "@/database/trending.model";
import { connectToDatabase } from "../mongoose";
import { startSession } from "mongoose";
import { revalidatePath } from "next/cache";

interface createTrendingShowsParams {
  showData: {
    searchTerm: string;
    show_id: string;
    title: string;
    count: number;
    poster_url: string;
    category: "movie" | "tv";
  };
  path: string;
}

export async function createTrendingShows(params: createTrendingShowsParams) {
  const session = await startSession();
  session.startTransaction(); // Start the transaction

  try {
    await connectToDatabase();

    const { showData, path } = params;

    // Step 1: Create the trending show
    const trending = await Trending.create([{ ...showData }], { session });

    if (!trending || trending.length === 0) {
      throw new Error("Trending not created");
    }

    // Step 2: Update the count
    const updatedTrending = await Trending.findByIdAndUpdate(
      trending[0]._id,
      { $inc: { count: 1 } },
      { new: true, session }
    );

    if (!updatedTrending) {
      throw new Error("Failed to update trending count");
    }

    await session.commitTransaction(); // Commit the transaction
    session.endSession();

    revalidatePath(path);
    return updatedTrending._id.toString();
  } catch (error) {
    await session.abortTransaction(); // Rollback on error
    session.endSession();
    console.error(error);
    throw error;
  }
}

export async function getTrending({
  searchTerm,
  category,
}: {
  searchTerm: string;
  category: "movie" | "tv";
}) {
  try {
    connectToDatabase();

    const trending = await Trending.findOne({ searchTerm, category });

    console.log("tptptptp", trending);
    if (!trending) return null;

    return trending._id.toString();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function incrementCount({
  show_id,
  path,
}: {
  show_id: string;
  path: string;
}) {
  try {
    connectToDatabase();

    const trending = await Trending.findByIdAndUpdate(
      show_id,
      { $inc: { count: 1 } },
      { new: true }
    );

    console.log(2, trending);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTrending({
  category,
}: {
  category: "movie" | "tv";
}) {
  try {
    connectToDatabase();

    const trending = await Trending.find({ category }).sort({ count: -1 });

    return trending;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function getTrending(showData:any) {
// 	try {
// 		connectToDatabase();

// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// }
