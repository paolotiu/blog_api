import { Schema, model } from 'mongoose';

const BlogSchema = new Schema({
    title: { type: String, required: true, maxlength: 40 },
    timestamp: Date,
    text: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default model('Blog', BlogSchema);
