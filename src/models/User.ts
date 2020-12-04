import mongoose, { Schema, model } from 'mongoose';

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    email: string;
}
const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
});

export default model<IUser>('User', UserSchema);
