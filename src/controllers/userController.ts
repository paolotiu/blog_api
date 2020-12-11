/* eslint-disable @typescript-eslint/no-unsafe-call */
import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/Models';
import { userSchema } from './validation';
import * as jwt from 'jsonwebtoken';

//passport
import passport from 'passport';

export const postLogin: RequestHandler = (req, res) => {
    const { password } = req.body;
    const username = (req.body.username as string).toLowerCase();

    User.findOne({ username: username }).exec((err, user) => {
        if (err) return res.status(400).json({ error: err.message });

        if (!user) {
            return res
                .status(403)
                .json({ error: 'Invalid username or password' });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        } else if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                { username: user.username, email: user.email },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: '3d',
                }
            );

            return res.status(200).json({
                message: 'Auth Passed',
                token,
                user: {
                    username: user.username,
                    email: user.email,
                },
            });
        } else {
            return res
                .status(403)
                .json({ error: 'Invalid username or password' });
        }
    });
};

export const postSignUp: RequestHandler = (req, res) => {
    const { password, email } = req.body;
    const username = (req.body.username as string).toLowerCase();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const hashedPassword = bcrypt.hashSync(password, 10);
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
        if (err) return res.status(400).json({ error: err.message });
        if (user) {
            // User with same params exists
            if (user.email === email) {
                return res.status(409).json({
                    error: 'User with the same email already exists',
                });
            } else if (user.username === username) {
                return res.status(409).json({
                    error: 'User with the same username already exists',
                });
            }
        } else {
            // No existing user with conflicting params
            // Save user to db
            const user = new User({
                username,
                password: hashedPassword,
                email,
            });

            user.save((err) => {
                if (err) return res.status(400).json({ error: err.message });

                return res.json({
                    message: 'Signed Up Succesfully',
                    user: {
                        email: email,
                        username: username,
                    },
                });
            });
        }
    });
};

export const getUser: RequestHandler[] = [
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(403).json({ error: 'Unauthorized' });
            }
            return res.json({ username: user.username, email: user.email });
        })(req, res, next);
    },
];
