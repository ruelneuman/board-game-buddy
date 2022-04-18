import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { newReviewSchema, reviewIdSchema } from '../validationSchemas';
import { createReview, findReviewById } from '../services/reviews.service';

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

  if (req.user.id !== newReview.userId) throw createHttpError(401);

  const review = await createReview(newReview);

  res.status(200).json(review);
};

const putReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const deleteReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const postLike = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const deleteLike = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
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
