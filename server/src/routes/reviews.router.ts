import { Router } from 'express';
import controller from '../controllers/reviews.controller';

const router = Router();

router.get('/', controller.getReviews);
router.post('/', controller.createReview);

router.get('/:reviewId', controller.getReview);
router.put('/:reviewId', controller.updateReview);
router.delete('/:reviewId', controller.deleteReview);

router.post('/:reviewId/likes', controller.likeReview);

router.delete('/:reviewId/likes/:userId', controller.unlikeReview);

export default router;
