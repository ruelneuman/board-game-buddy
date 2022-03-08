import { Router } from 'express';

const router = Router();

router.get('/');
router.post('/');

router.get('/:reviewId');
router.put('/:reviewId');
router.delete('/:reviewId');

router.post('/:reviewId/likes');

router.delete('/:reviewId/likes/:userId');

export default router;
