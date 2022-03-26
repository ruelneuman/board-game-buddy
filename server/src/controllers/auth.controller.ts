import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { authenticationSchema } from '../validationSchemas';
import { logIn } from '../services/auth.service';

const logInUser = async (req: Request, res: Response) => {
  const userCredentials = authenticationSchema.parse(req.body);

  const userWithJwt = await logIn(userCredentials);

  if (!userWithJwt) throw createHttpError(401, 'Invalid login details');

  res.status(200).json(userWithJwt);
};

export default {
  logInUser,
};
