/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { expressJwtAuth } from '../middleware/auth';
import controller from '../controllers/users.controller';

const router = Router();

router.get('/', controller.getUsers);
router.post('/', controller.postUser);

router.get('/current', expressJwtAuth, controller.getCurrentUser);
router.delete('/current', expressJwtAuth, controller.deleteCurrentUser);

router.put('/current/username', expressJwtAuth, controller.putUsername);

router.put('/current/email', expressJwtAuth, controller.putEmail);

router.put('/current/password', expressJwtAuth, controller.putPassword);

router.put('/current/bio', expressJwtAuth, controller.putBio);

router.get(
  '/current/collections',
  expressJwtAuth,
  controller.getCurrentUserCollections
);

router.post(
  '/current/collections/:collectionId/games',
  expressJwtAuth,
  controller.postGameToCollection
);

router.delete(
  '/current/collections/:collectionId/games/:gameId',
  expressJwtAuth,
  controller.deleteGameFromCollection
);

router.get('/:userId', controller.getUser);

router.get('/:userId/collections', controller.getUserCollections);

export default router;
