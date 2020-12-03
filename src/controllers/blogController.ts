import { Blog } from '../models/Models';
import { RequestHandler } from 'express';
import {} from 'mongoose';

const blogs_get: RequestHandler = (req, res, next) => {
    Blog.find({}).exec((err, docs) => {
        res.json(docs);
    });
};

const blog_post: RequestHandler = (req, res) => {
    console.log('heu');
    const { title, text } = req.body;
    const blog = new Blog({
        title,
        text,
        timestamp: new Date(),
    });

    blog.save((err, doc) => {
        if (err) return res.sendStatus(500).json({ err: 'Error in saving' });
        res.json(doc);
    });
};

export { blogs_get, blog_post };
