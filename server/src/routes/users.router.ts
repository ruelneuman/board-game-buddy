/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { expressJwtAuth } from '../middleware/auth';
import controller from '../controllers/users.controller';

const router = Router();

router.get('/', controller.getUsers);
router.post('/', controller.createNewUser);

router.get('/current', expressJwtAuth, controller.getCurrentUser);
router.put('/current', expressJwtAuth, controller.updateCurrentUser);
router.delete('/current', expressJwtAuth, controller.deleteCurrentUser);

router.get(
  '/current/collections/:gameListType',
  expressJwtAuth,
  controller.getCurrentUserGameList
);
router.put(
  '/current/collections/:gameListType',
  expressJwtAuth,
  controller.updateCurrentUserGameList
);

router.get('/:userId', controller.getUser);

router.get('/:userId/collections', controller.getUserCollections);

router.get('/:userId/collections/:gameListType', controller.getUserCollection);

export default router;
