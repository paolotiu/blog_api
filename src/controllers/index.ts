import * as blogs from './blogController';
import * as user from './userController';
//passport
import passport from 'passport';
import jwtStrategy from './jwtStrategy';
passport.use(jwtStrategy);
const blogController = {
    ...blogs,
};

const userController = {
    ...user,
};
export { blogController, userController };
