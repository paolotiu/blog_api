import { Blog } from '../models/Models';
import { RequestHandler } from 'express';
import {} from 'mongoose';

const blogs_get: RequestHandler = (req, res, next) => {
    console.log('there');
    Blog.find({}).exec((err, docs) => {
        res.json(docs);
    });
};

const blog_post: RequestHandler = (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    const blog = new Blog({
        title,
        text,
        timestamp: new Date(),
    });

    blog.save((err, doc) => {
        if (err) return res.json(err);
        return res.json(doc);
    });
};

const specific_blog_get: RequestHandler = (req, res, next) => {
    const { id } = req.params;
    Blog.findById(id).exec((err, blog) => {
        if (err) return res.json(err);
        return res.json(blog);
    });
};

export { blogs_get, blog_post, specific_blog_get };
