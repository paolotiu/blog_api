import { Router } from 'express';
import { blogController } from '../controllers';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', (req, res, next) => {
    res.json('U');
});

router.use('/blogs', blogController.blogs_get);
router.post('/blogs', blogController.blog_post);

// Export the base-router
export default router;
