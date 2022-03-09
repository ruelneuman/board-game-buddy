import { Router } from 'express';
import controller from '../controllers/games';

const router = Router();

router.get('/', controller.getGames);
router.post('/', controller.createGame);

router.get('/:gameId', controller.getGame);

export default router;
