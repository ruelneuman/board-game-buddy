import { Router } from 'express';
import controller from '../controllers/reviews.controller';
import { expressJwtAuth } from '../middleware/auth';

const router = Router();

router.get('/', controller.getReviews);
router.post('/', expressJwtAuth, controller.postReview);

router.get('/:reviewId', controller.getReview);
router.put('/:reviewId', expressJwtAuth, controller.putReview);
router.delete('/:reviewId', expressJwtAuth, controller.deleteReview);

router.post('/:reviewId/likes', expressJwtAuth, controller.postLike);

router.delete(
  '/:reviewId/likes/:userId',
  expressJwtAuth,
  controller.deleteLike
);

export default router;
