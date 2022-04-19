import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import {
  newReviewSchema,
  reviewIdSchema,
  userIdSchema,
} from '../validationSchemas';
import {
  createReview,
  findReviewById,
  likeReview,
  unlikeReview,
  deleteReviewById,
} from '../services/reviews.service';

const getReviews = (_req: Request, res: Response) => {
  // get reviews by game or by user
  // sorted by rating or most recent or alphabetically
  res.status(501).json({ error: 'Not implemented' });
};

const getReview = async (req: Request, res: Response) => {
  const id = reviewIdSchema.parse(req.params.reviewId);

  const review = await findReviewById(id);

  if (!review) throw createHttpError(404, `Review with id '${id}' not found`);

  res.status(200).json(review);
};

const postReview = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const newReview = newReviewSchema.parse(req.body);

  if (req.user.id !== newReview.userId)
    throw createHttpError(401, 'User id does not match user id on review');

  const review = await createReview(newReview);

  res.status(200).json(review);
};

const putReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const deleteReview = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const reviewId = reviewIdSchema.parse(req.params.reviewId);

  const review = await findReviewById(reviewId);

  if (!review)
    throw createHttpError(404, `Review with id '${reviewId}' not found`);

  if (req.user.id !== review.userId.toString())
    throw createHttpError(401, 'User id does not match user id on review');

  await deleteReviewById(reviewId);

  res.status(204).end();
};

const postLike = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const reviewId = reviewIdSchema.parse(req.params.reviewId);

  const response = await likeReview(reviewId, req.user.id);

  res.status(200).json(response);
};

const deleteLike = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const reviewId = reviewIdSchema.parse(req.params.reviewId);
  const userId = userIdSchema.parse(req.params.userId);

  if (req.user.id !== userId)
    throw createHttpError(401, 'User id does not match user id on like');

  const response = await unlikeReview(reviewId, userId);

  res.status(200).json(response);
};

export default {
  getReviews,
  getReview,
  postReview,
  putReview,
  deleteReview,
  postLike,
  deleteLike,
};
