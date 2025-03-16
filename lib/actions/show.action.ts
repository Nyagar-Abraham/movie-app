"use server";

import ShowTv from "@/database/show.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";

interface createShowparams {
  showData: {
    title: string;
    show_id: string;
    vote_average: number;
    vote_count: number;
    release_date: string;
    category: string;
    saved?: string[];
    favorites?: string[];
    views?: string[];
  };

  path: string;
}

interface updateMetricsParams {
  _id: string;
  user_id: string;
  field: "saved" | "favorites" | "views";
  action: "add" | "remove";
  path: string;
}

interface getMongoShowsParams {
  category: "movie" | "tv";
  show_id: string;
}

export async function getShow(show_id: string) {
  try {
    connectToDatabase();

    const show = await ShowTv.findOne({ show_id });

    if (!show) {
      return null;
    }

    return show._id.toString();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createShow(params: createShowparams) {
  try {
    connectToDatabase();

    const { showData, path } = params;

    const show = await ShowTv.create({ ...showData });

    if (!show) {
      throw new Error("show not created");
    }
    console.log("pppp", { show });
    revalidatePath(path);
    return show._id.toString();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateShowMetrics(params: updateMetricsParams) {
  try {
    connectToDatabase();

    const { _id, user_id, field, action, path } = params;

    let updateQuery = {};

    if (action === "add") updateQuery = { $addToSet: { [field]: user_id } };
    if (action === "remove") updateQuery = { $pull: { [field]: user_id } };
    console.log("query", updateQuery);
    const show = await ShowTv.findByIdAndUpdate(_id, updateQuery, {
      new: true,
    });

    console.log({ show });

    revalidatePath(path);
    return show._id.toString();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMongoShow({ category, show_id }: getMongoShowsParams) {
  try {
    connectToDatabase();
    const show = await ShowTv.findOne({ category, show_id }).lean();

    if (!show) return {};

    return show;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function createShow(showData:any) {
// 	try {
// 		connectToDatabase();

// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// }
