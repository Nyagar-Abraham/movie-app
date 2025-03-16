import Interaction from "@/database/interactions.model";
import { connectToDatabase } from "../mongoose";
import { getUserInteractionParams } from "../shared.types";
import { FilterQuery } from "mongoose";
import Show from "@/database/show.model";
import User from "@/database/user.model";
import { skip } from "node:test";

export async function getUserInterActions(params: getUserInteractionParams) {
  try {
    connectToDatabase();

    const { page, pageSize = 12, userId, searchQuery, sortBy } = params;
    // @ts-ignore
    const skipAmount = (page - 1) * pageSize;

    let query: FilterQuery<typeof Interaction> = { user: userId };

    if (searchQuery) {
      query = { user: userId, action: { $regex: searchQuery, $options: "i" } };
    }

    let sortOptions = { createdAt: -1 };

    if (sortBy) {
      switch (sortBy) {
        case "oldest":
          sortOptions = { createdAt: 1 };
          break;
        default:
          break;
      }
    }
    // @ts-ignore
    const interactions = await Interaction.find(query)
      .populate({
        path: "show",
        model: Show,
        select: "description title",
      })
      .populate({
        path: "user",
        model: User,
        select: "picture",
      }) // @ts-ignore
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalInteractions = await Interaction.countDocuments(query);
    // @ts-ignore
    const isNext = totalInteractions > skipAmount + pageSize;
    // @ts-ignore
    const pages = Math.ceil(totalInteractions / pageSize);

    return { interactions, isNext, pages };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
