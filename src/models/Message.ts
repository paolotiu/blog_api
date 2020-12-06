import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
    timestamp: Date;
    text: string;
    author: string;
    _id: string;
}

const MessageSchema = new Schema({
    timestamp: Date,
    text: String,
    author: String,
});

export default model<IMessage>('Message', MessageSchema);
