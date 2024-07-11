import { Document, Schema, model, models } from 'mongoose';

export interface IUser extends Document {
	name: string;
	username: string;
	clerkId: string;
	picture?: string;
	location?: string;
	likedshows?: Schema.Types.ObjectId[];
	joinedAt: Date;
}

const UserSchema: Schema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	clerkId: { type: String, required: true },
	picture: { type: String },
	location: { type: String },
	likedshows: [{ type: Schema.Types.ObjectId, ref: 'Show' }],
	joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;
