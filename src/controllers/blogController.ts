import { commentSchema } from './validation';
import { IUser } from './../models/User';
import { Blog, Message } from '../models/Models';
import { RequestHandler } from 'express';

//passport
import passport from 'passport';

export const getAllBlogs: RequestHandler = (req, res) => {
    Blog.find({})
        .populate('author', 'username email')
        .exec((err, docs) => {
            if (err) res.status(400).json({ error: err.message });
            res.json(docs);
        });
};

export const postBlog: RequestHandler[] = [
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { title, text } = req.body;

        // Check if user exist / Sanity check
        if (!req.user) {
            return res.status(403).json({ error: "User doesn't exists" });
        }
        const blog = new Blog({
            title,
            text,
            timestamp: new Date(),
            author: (req.user as IUser)._id,
        });

        blog.save((err, doc) => {
            if (err) return res.status(400).json({ error: err.message });

            doc.populate(
                {
                    path: 'author',
                    select: 'username email',
                },
                (err, doc) => {
                    if (err)
                        return res.status(400).json({ error: err.message });
                    return res.json(doc);
                }
            );
        });
    },
];

export const updateBlog: RequestHandler[] = [
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.params;
        const { title, text } = req.body;

        // Check if user exist / Sanity check
        if (!req.user) {
            return res.status(403).json({ error: "User doesn't exists" });
        }

        Blog.findOneAndUpdate({ _id: id }, { text: text, title }).exec(
            (err, blog) => {
                if (err) return res.status(400).json({ error: err.message });
                if (!blog) {
                    return res.status(404).json({ error: 'Blog not found' });
                }

                if (blog.author !== (req.user as IUser)._id) {
                    return res.status(403).json({ error: 'Not Authorized' });
                }
                res.json(blog);
            }
        );
    },
];

export const getOwnBlogs: RequestHandler[] = [
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Blog.find({ author: (req.user as IUser)._id }).exec((err, blogs) => {
            if (err) return res.status(400).json({ error: err.message });

            return res.json(blogs);
        });
    },
];
export const deleteBlog: RequestHandler[] = [
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // Check if user exist / Sanity check
        if (!req.user) {
            return res.status(403).json({ error: "User doesn't exists" });
        }
        const { id } = req.params;

        //Check if author and user lines up
        Blog.findById(id).exec((err, blog) => {
            if (err) return res.status(400).json({ error: err.message });
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            if (
                blog.author.toString() !== (req.user as IUser)._id?.toString()
            ) {
                return res.status(403).json({ error: 'Not Authorized' });
            }
        });

        //Remove Blog
        Blog.findByIdAndRemove(id).exec((err, blog) => {
            if (err) return res.status(400).json({ error: err.message });
            if (!blog) {
                return res.status(404).json({ error: 'Blog not found' });
            } else {
                {
                    return res.json({ message: 'Success', blog });
                }
            }
        });
    },
];

export const getBlogById: RequestHandler = (req, res) => {
    const { id } = req.params;
    Blog.findById(id)
        .populate({
            path: 'comments',
            options: {
                sort: { timestamp: -1 },
            },
        })
        .populate('author', 'username email')
        .exec((err, blog) => {
            if (err) return res.status(400).json({ error: err.message });
            if (blog) {
                return res.json(blog);
            } else {
                return res.status(404).json('{error: Blog not found}');
            }
        });
};

export const commentOnBlog: RequestHandler = (req, res) => {
    const { author, text } = req.body;
    const blogId = req.params.id;
    const result = commentSchema.validate({
        author: author,
        text: text,
    });

    if (result.error) {
        return res.status(401).json(result.error.details[0].message);
    }

    const comment = new Message({
        author,
        text,
        timestamp: new Date(),
    });

    comment.save((err, doc) => {
        if (err) return res.status(400).json({ error: err.message });
        Blog.findByIdAndUpdate(blogId, {
            $push: { comments: doc._id },
        }).exec((err) => {
            if (err) return res.status(400).json({ error: err.message });
            return res.json(doc);
        });
    });
};
