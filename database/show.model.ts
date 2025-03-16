import { Document, Schema, model, models } from "mongoose";

export interface IShowTv extends Document {
  title: string;
  show_id: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  category: string;
  saved?: string[];
  favorites?: string[];
  views?: string[];
}

const ShowTvSchema = new Schema<IShowTv>({
  title: { type: String, required: true },
  show_id: { type: String, required: true, unique: true },
  vote_average: { type: Number, required: true },
  vote_count: { type: Number, required: true },
  release_date: { type: String, required: true },
  category: { type: String, required: true },
  saved: { type: [String], default: [] },
  favorites: { type: [String], default: [] },
  views: { type: [String], default: [] },
});

// Explicitly create a unique index
ShowTvSchema.index({ show_id: 1 }, { unique: true });

const ShowTv = models?.ShowTv || model<IShowTv>("ShowTv", ShowTvSchema);

export default ShowTv;
