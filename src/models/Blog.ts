import mongoose, { Schema, model } from 'mongoose';

export interface IBlog extends mongoose.Document {
    title: string;
    timestamp: Date;
    text: string;
    author: string;
    comments: string[];
}
const BlogSchema = new Schema({
    title: { type: String, required: true, maxlength: 40 },
    timestamp: Date,
    text: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

export default model<IBlog>('Blog', BlogSchema);
