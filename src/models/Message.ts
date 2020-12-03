import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
    blog: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: Date,
    text: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Message', MessageSchema);
