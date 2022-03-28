import { Router } from 'express';
import controller from '../controllers/reviews.controller';
import { expressJwtAuth } from '../middleware/auth';

const router = Router();

router.get('/', controller.getReviews);
router.post('/', expressJwtAuth, controller.createReview);

router.get('/:reviewId', controller.getReview);
router.put('/:reviewId', expressJwtAuth, controller.updateReview);
router.delete('/:reviewId', expressJwtAuth, controller.deleteReview);

router.post('/:reviewId/likes', expressJwtAuth, controller.likeReview);

router.delete(
  '/:reviewId/likes/:userId',
  expressJwtAuth,
  controller.unlikeReview
);

export default router;
