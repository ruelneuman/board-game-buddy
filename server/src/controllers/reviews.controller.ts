import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { newReviewSchema } from '../validationSchemas';
import { createReview } from '../services/reviews.service';

const getReviews = (_req: Request, res: Response) => {
  // get reviews by game or by user
  // sorted by rating or most recent or alphabetically
  res.status(501).json({ error: 'Not implemented' });
};

const getReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
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
