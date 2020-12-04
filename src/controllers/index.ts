import * as blogs from './blogController';
import * as user from './userController';

const blogController = {
    ...blogs,
};

const userController = {
    ...user,
};
export { blogController, userController };
