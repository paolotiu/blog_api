/* eslint-disable no-console */
import mongoose, { Document } from 'mongoose';
import { Blog, Message, User } from './src/models/Models';
import dotenv from 'dotenv';
dotenv.config({
    path: `./env/development.env`,
});

mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // eslint-disable-next-line no-console
    console.log('Connected');
});

const users: Array<string | Document> = [];
const comments: Document[] = [];

function userCreate(username: string, password: string, email: string) {
    const userDetail = { username, password, email };
    const user = new User(userDetail);

    user.save((err) => {
        if (err) {
            console.error(err);
            return err;
        }
        users.push(user);
        console.log('New User: ' + user);
    });
}

function blogCreate(
    title: string,
    text: string,
    timestamp: Date,
    author: string | Document,
    comments: Document[]
) {
    const blogDetail = { title, text, timestamp, author, comments };
    const blog = new Blog(blogDetail);

    blog.save((err) => {
        if (err) {
            console.error(err);
            return err;
        }
        console.log('New Blog: ' + blog);
    });
}

function MessageCreate(
    text: string,
    timestamp: Date,
    author: string | Document
) {
    const messageDetail = { text, timestamp, author };
    const message = new Message(messageDetail);

    message.save((err) => {
        if (err) {
            console.error(err);
            return err;
        }
        comments.push(message);
        console.log('New Message: ' + message);
    });
}

userCreate('someUSer', 'password', 'someemail@email.com');
MessageCreate('This is a message', new Date(), users[0]);
blogCreate('Blog', 'lorem', new Date(), users[0], comments);
