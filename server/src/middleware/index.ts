import expressJwt from 'express-jwt';
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { SECRET, JWT_AUDIENCE, JWT_ISSUER } from '../config';
import logger from '../utils/logger';

export const checkJwtAuth = expressJwt({
  secret: SECRET,
  audience: JWT_AUDIENCE,
  issuer: JWT_ISSUER,
  algorithms: ['HS256'],
});

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof ZodError) {
    const error = err.flatten();
    logger.error(error);
    res.status(400).json(error);
  }

  next(err);
};
