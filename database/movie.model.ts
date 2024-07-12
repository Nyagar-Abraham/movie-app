import { Document, Schema, model, models } from 'mongoose';

export interface IShow extends Document {
	title: string;
	thumbnail: {
		trending: {
			small?: string;
			large?: string;
		};
		regular: {
			small?: string;
			medium?: string;
			large?: string;
		};
	};
	year: Date;
	category: string;
	rating: string;
	isBookmarked: boolean;
	isTrending: boolean;
	description?: string;
	upvotes?: Schema.Types.ObjectId[];
	downvotes?: Schema.Types.ObjectId[];
	userratings?: {
		user: Schema.Types.ObjectId;
		rating: number;
	}[];
	views?: Schema.Types.ObjectId[];
}

const thumbnailSchema = new Schema(
	{
		trending: {
			small: { type: String },
			large: { type: String },
		},
		regular: {
			small: { type: String },
			medium: { type: String },
			large: { type: String },
		},
	},
	{ _id: false }
);

const showSchema = new Schema<IShow>({
	title: { type: String, required: true },
	thumbnail: { type: thumbnailSchema, required: true },
	year: { type: Date, required: true, default: Date.now },
	category: { type: String, required: true },
	rating: { type: String, required: true },
	isBookmarked: { type: Boolean, required: true },
	isTrending: { type: Boolean, required: true },
	description: { type: String },
	upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	userratings: [
		{
			user: { type: Schema.Types.ObjectId, ref: 'User' },
			rating: { type: Number },
		},
	],
	views: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// Create text indexes on title and description for efficient text search
showSchema.index({ title: 'text', description: 'text' });

const Show = models?.Show || model<IShow>('Show', showSchema);

export default Show;
