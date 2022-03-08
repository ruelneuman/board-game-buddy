import express from 'express';
import games from './games';
import reviews from './reviews';
import users from './users';

const router = express.Router();

router.use('/api/games', games);
router.use('/api/reviews', reviews);
router.use('/api/users', users);

export default router;
