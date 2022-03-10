import { Router } from 'express';
import controller from '../controllers/users.controller';

const router = Router();

router.get('/', controller.getUsers);
router.post('/', controller.createUser);

router.get('/:userId', controller.getUser);

router.get('/:userId/collections', controller.getUserCollections);

router.get(
  '/:userId/collections/:collectionType',
  controller.getUserCollection
);

router.get('/current', controller.getCurrentUser);
router.delete('/current', controller.deleteCurrentUser);

router.get(
  '/current/collections/:collectionType',
  controller.getCurrentUserCollection
);
router.put(
  '/current/collections/:collectionType',
  controller.updateCurrentUserCollection
);

export default router;
