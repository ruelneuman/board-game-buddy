import { ErrorRequestHandler, RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import expressJwt from 'express-jwt';
import logger from '../utils/logger';
import { ErrorResponse, ValidationErrorDetails } from '../types';

const httpErrorToResponse = (
  error: createHttpError.HttpError
): ErrorResponse => ({
  status: error.status,
  message: error.message,
  details: [],
});

const expressJwtErrorToResponse = (
  error: expressJwt.UnauthorizedError
): ErrorResponse => ({
  status: error.status,
  message: error.message,
  details: [],
});

const mongooseValidationErrorToResponse = (
  error: mongoose.Error.ValidationError
): ErrorResponse => ({
  status: 400,
  message: error.message,
  details: [],
});

const zodErrorToResponse = (error: ZodError): ErrorResponse => {
  const { formErrors, fieldErrors } = error.flatten();

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

  return {
    status: 400,
    message: 'Validation failed',
    details,
  };
};

export const unknownEndpoint: RequestHandler = (_req, _res, next) =>
  next(createHttpError(404, 'Unknown endpoint'));

export const errorLogger: ErrorRequestHandler = (err, _req, _res, next) => {
  logger.error(err);

  return next(err);
};

export const errorResponder: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let errorResponse: ErrorResponse;

  if (createHttpError.isHttpError(err)) {
    errorResponse = httpErrorToResponse(err);
  } else if (err instanceof ZodError) {
    errorResponse = zodErrorToResponse(err);
  } else if (err instanceof mongoose.Error.ValidationError) {
    errorResponse = mongooseValidationErrorToResponse(err);
  } else if (err instanceof expressJwt.UnauthorizedError) {
    errorResponse = expressJwtErrorToResponse(err);
  } else {
    errorResponse = {
      status: 500,
      message: 'Internal Server Error',
      details: [],
    };
  }

  res.status(errorResponse.status).json(errorResponse);
};
