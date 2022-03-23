import { ErrorRequestHandler } from 'express';
import createHttpError from 'http-errors';
import { ZodError } from 'zod';
import logger from '../utils/logger';

interface ErrorResponse {
  message: string;
  status: number;
  details: ErrorDetails[];
}

interface ErrorDetails {
  field: string;
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

    const { fieldErrors } = err.flatten();

    const details: ErrorDetails[] = Object.keys(fieldErrors).map((key) => ({
      field: key,
      messages: fieldErrors[key],
    }));

    errorResponse.details = details;

    return res.status(400).json(errorResponse);
  }

  return res.status(500).json(errorResponse);
};
