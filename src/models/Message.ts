import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
    timestamp: Date,
    text: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Message', MessageSchema);
