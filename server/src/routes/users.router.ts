import { Router } from 'express';
import controller from '../controllers/users.controller';

const router = Router();

router.get('/', controller.getUsers);
router.post('/', controller.createUser);

router.get('/:userId', controller.getUser);

router.get('/:userId/collections', controller.getUserCollections);

router.get('/:userId/collections/:gameListType', controller.getUserCollection);

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

export default router;
