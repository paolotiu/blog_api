import { Router } from 'express';
import { blogController, userController } from '../controllers';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', (req, res) => {
    res.json('U');
});

router.post('/user/login', userController.postLogin);
router.post('/user/signup', userController.postSignUp);

// Blog routes
router.get('/blogs', blogController.getAllBlogs);
router.post('/blogs', blogController.postBlog);
router.get('/blogs/:id', blogController.getBlogById);
router.delete('/blogs/:id', blogController.deleteBlog);
router.put('/blogs/:id', blogController.updateBlog);
router.post('/blogs/:id/comment', blogController.commentOnBlog);
// Export the base-router
export default router;
