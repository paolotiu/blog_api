import { Router } from 'express';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', (req, res, next) => {
    res.json('U');
});

// Export the base-router
export default router;
