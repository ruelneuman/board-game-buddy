/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import controller from '../controllers/auth.controller';

const router = Router();

router.post('/login', controller.logInUser);

export default router;
