import { Router } from 'express';

const router = Router();

router.get('/');
router.post('/');

router.get('/:userId');

router.get('/:userId/collections');

router.get('/:userId/collections/:collectionType');

router.get('/current');
router.delete('/current');

router.get('/current/collections/:collectionType');
router.put('/current/collections/:collectionType');

export default router;
