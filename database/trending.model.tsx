import { Document, Schema, model, models } from "mongoose";

export interface ITrending extends Document {
  searchTerm: string;
  show_id: string;
  user_id: string;
  title: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  count: number;
  poster_url: string;
  category: "movie" | "tv";
  createdAt: Date;
  updatedAt: Date;
}

const TrendingSchema = new Schema<ITrending>(
  {
    searchTerm: { type: String, required: true, unique: true },
    show_id: { type: String, required: true },
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    vote_average: { type: Number, required: true },
    vote_count: { type: Number, required: true },
    release_date: { type: String, required: true },
    count: { type: Number, required: true, default: 0 },
    poster_url: { type: String, required: true },
    category: { type: String, required: true, enum: ["movie", "tv"] },
  },
  { timestamps: true }
);

// Explicitly create a unique index
TrendingSchema.index({ searchTerm: 1 }, { unique: true });

const Trending =
  models?.Trending || model<ITrending>("Trending", TrendingSchema);

export default Trending;
