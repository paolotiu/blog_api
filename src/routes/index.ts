import { Router } from 'express';
import { blogController } from '../controllers';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', (req, res, next) => {
    res.json('U');
});

router.get('/blogs', blogController.blogs_get);
router.post('/blogs', blogController.blog_post);
router.get('/blogs/:id', blogController.specific_blog_get);
router.delete('/blogs/:id', blogController.blog_delete);
// Export the base-router
export default router;
