# Blog API 

> Blog Client [Repo](https://github.com/paolotiu17/blog_client) 💼

> Blog Client [Live Website](https://blog-pt.netlify.app) 👌

## Description
An API for operating the blog backend 


## API Documentation
* Base URL: `https://blog-api-pt.herokuapp.com`

| Method        | Endpoint       | Usage |  Parameters| 🔒 |
| ------------- |:-------------| :-----|----| ---|
| GET      | /user | Get current user | | ✅ |
| POST      | /user/login      |   Logins in user | username*, email*, password* |
| POST | /user/signup      |    Sign up user | username*, password* |
| GET | /user/blogs |Get users blogs | | ✅|
| GET | /blogs | Get all blogs | |
| POST | /blogs | Post a blog | title*, text* | ✅|
| GET | /blogs/:id | Get a specific blog | |
| DELETE | /blogs/:id | Delete a blog| | ✅|
| PUT | /blogs/:id | Update a blog| | ✅|
| POST | /blogs/:id/comment | Post a comment on a blog| author*, text*|

*required (\*)*



