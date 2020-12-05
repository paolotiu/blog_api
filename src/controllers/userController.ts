import { RequestHandler, Request } from 'express';

import { User } from '../models/Models';
import { userSchema } from './validation';
import * as jwt from 'jsonwebtoken';

//passport
import passport from 'passport';

export const postLogin: RequestHandler = (req, res, next) => {
    const { password } = req.body;
    const username = (req.body.username as string).toLowerCase();
    const result = userSchema.validate({
        username: username,
        password: password,
        email: 'dummyemail@email.com',
    });
    // If validtion didn't pass
    if (result.error) {
        return res.status(401).json(result.error.details[0].message);
    }
    User.findOne({ username: username }).exec((err, user) => {
        if (err) return res.status(400).json(err);

        if (!user) {
            return res
                .status(403)
                .json({ error: 'Invalid username or password' });
        } else if (user.password === password) {
            const token = jwt.sign(
                { username: user.username, email: user.email },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: '120s',
                }
            );

            return res.status(200).json({ message: 'Auth Passed', token });
        } else {
            return res
                .status(403)
                .json({ error: 'Invalid username or password' });
        }
    });
};

export const postSignUp: RequestHandler = (req, res, next) => {
    const { password, email } = req.body;
    const username = (req.body.username as string).toLowerCase();

    // Check Joi validation
    const result = userSchema.validate({
        username: username,
        password: password,
        email: email,
    });
    // If validtion didn't pass
    if (result.error) {
        return res.status(401).json(result.error.details[0].message);
    }

    User.findOne({
        $or: [{ email: email }, { username: username }],
    }).exec((err, user) => {
        if (err) return res.status(400).json(err);
        if (user) {
            // User with same params exists
            if (user.email === email) {
                return res.status(409).json({
                    error: 'User with the same email already exists',
                });
            } else if (user.username === password) {
                return res.status(409).json({
                    error: 'User with the same username already exists',
                });
            }
        } else {
            // No existing user with conflicting params
            // Save user to db
            const user = new User({
                username,
                password,
                email,
            });

            user.save((err, user) => {
                if (err) return res.status(400).json(err);

                return res.json(user);
            });
        }
    });
};
