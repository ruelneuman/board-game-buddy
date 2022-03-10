import express from 'express';
import games from './games.router';
import reviews from './reviews.router';
import users from './users.router';

const router = express.Router();

router.use('/api/games', games);
router.use('/api/reviews', reviews);
router.use('/api/users', users);

export default router;
