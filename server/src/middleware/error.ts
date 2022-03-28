import { ErrorRequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { UnauthorizedError } from 'express-jwt';
import logger from '../utils/logger';

interface ErrorResponse {
  message: string;
  status: number;
  details: ValidationErrorDetails[];
}

interface ValidationErrorDetails {
  path: string | null;
  messages: string[];
}

export const errorLogger: ErrorRequestHandler = (err, _req, _res, next) => {
  logger.error(err);

  return next(err);
};

export const errorResponder: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const errorResponse: ErrorResponse = {
    status: 500,
    message: 'Internal Server Error',
    details: [],
  };

  if (createHttpError.isHttpError(err)) {
    errorResponse.status = err.status;
    errorResponse.message = err.message;
    return res.status(err.status).json(errorResponse);
  }

  if (err instanceof ZodError) {
    errorResponse.status = 400;
    errorResponse.message = 'Validation failed';

    const { formErrors, fieldErrors } = err.flatten();

    const details: ValidationErrorDetails[] = Object.keys(fieldErrors).map(
      (key) => ({
        path: key,
        messages: fieldErrors[key],
      })
    );

    if (formErrors.length > 0) {
      details.push({
        path: null,
        messages: formErrors,
      });
    }

    errorResponse.details = details;

    return res.status(errorResponse.status).json(errorResponse);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    errorResponse.status = 400;
    errorResponse.message = 'Validation failed';
    return res.status(errorResponse.status).json(errorResponse);
  }

  if (err instanceof UnauthorizedError) {
    errorResponse.status = err.status;
    errorResponse.message = err.message;
    return res.status(errorResponse.status).json(errorResponse);
  }

  return res.status(errorResponse.status).json(errorResponse);
};
