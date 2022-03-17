import express from 'express';
import games from './games.router';
import reviews from './reviews.router';
import users from './users.router';
import auth from './auth.router';

const router = express.Router();

router.use('/api/games', games);
router.use('/api/reviews', reviews);
router.use('/api/users', users);
router.use('/api/auth', auth);

export default router;
