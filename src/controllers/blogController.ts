import { Blog } from '../models/Models';
import { RequestHandler } from 'express';

import {} from 'mongoose';

const getAllBlogs: RequestHandler = (req, res, next) => {
    Blog.find({}).exec((err, docs) => {
        if (err) res.status(400).json(err);
        res.json(docs);
    });
};

const postBlog: RequestHandler = (req, res) => {
    const { title, text } = req.body;

    const blog = new Blog({
        title,
        text,
        timestamp: new Date(),
    });

    blog.save((err, doc) => {
        if (err) return res.status(400).json(err);
        return res.json(doc);
    });
};

const deleteBlog: RequestHandler = (req, res, next) => {
    const { id } = req.params;
    Blog.findByIdAndRemove(id).exec((err, blog) => {
        if (err) return res.status(400).json(err);

        return res.json('Success');
    });
};

const getBlogById: RequestHandler = (req, res, next) => {
    const { id } = req.params;
    Blog.findById(id).exec((err, blog) => {
        if (err) return res.status(400).json(err);
        if (blog) {
            return res.json(blog);
        } else {
            return res.status(404).json('{error: Blog not found}');
        }
    });
};

export { getAllBlogs, postBlog, getBlogById, deleteBlog };
