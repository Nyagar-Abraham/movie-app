import { Document, Schema, model, models } from 'mongoose';

export interface IInteraction extends Document {
	action: string;
	user: Schema.Types.ObjectId[];
	show: Schema.Types.ObjectId[];
	createdAt: Date;
}

const InteractionSchema: Schema = new Schema({
	action: { type: String, required: true },
	user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	show: [{ type: Schema.Types.ObjectId, ref: 'Show' }],
	createdAt: { type: Date, default: Date.now },
});

const Interaction =
	models.Interaction || model<IInteraction>('Interaction', InteractionSchema);

export default Interaction;
