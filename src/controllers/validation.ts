import Joi from 'joi';

export const userSchema = Joi.object({
    username: Joi.string().trim().alphanum().min(3).max(30).required(),
    password: Joi.string()
        .trim()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    email: Joi.string()
        .trim()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .required(),
});

export const blogSchema = Joi.object({
    title: Joi.string(),
});
