/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import controller from '../controllers/users.controller';

const router = Router();

router.get('/', controller.getUsers);
router.post('/', controller.createNewUser);

router.get('/current', controller.getCurrentUser);
router.put('/current', controller.updateCurrentUser);
router.delete('/current', controller.deleteCurrentUser);

router.get(
  '/current/collections/:gameListType',
  controller.getCurrentUserGameList
);
router.put(
  '/current/collections/:gameListType',
  controller.updateCurrentUserGameList
);

router.get('/:userId', controller.getUser);

router.get('/:userId/collections', controller.getUserCollections);

router.get('/:userId/collections/:gameListType', controller.getUserCollection);

export default router;
