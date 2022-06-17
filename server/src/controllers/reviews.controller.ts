import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import {
  newReviewWithoutUserIdSchema,
  reviewIdSchema,
  reviewsPaginationQuerySchema,
  userIdSchema,
} from '../validationSchemas';
import {
  createReview,
  findReviewById,
  findPaginatedReviews,
  likeReview,
  unlikeReview,
  deleteReviewById,
  updateReview,
} from '../services/reviews.service';

const getReviews = async (req: Request, res: Response) => {
  const query = reviewsPaginationQuerySchema.parse(req.query);

  const reviews = await findPaginatedReviews(query);

  res.status(200).json(reviews);
};

const getReview = async (req: Request, res: Response) => {
  const id = reviewIdSchema.parse(req.params.reviewId);

  const review = await findReviewById(id);

  if (!review) throw createHttpError(404, `Review with id '${id}' not found`);

  res.status(200).json(review);
};

const postReview = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const newReview = newReviewWithoutUserIdSchema.parse(req.body);

  const review = await createReview({
    ...newReview,
    game: newReview.gameId,
    user: req.user.id,
  });

  res.status(200).json(review);
};

const putReview = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const newReview = newReviewWithoutUserIdSchema.parse(req.body);
  const reviewId = reviewIdSchema.parse(req.params.reviewId);

  const reviewToUpdate = await findReviewById(reviewId);

  if (!reviewToUpdate)
    throw createHttpError(404, `Review with id ${reviewId} not found`);

  // eslint-disable-next-line no-underscore-dangle
  if (req.user.id !== reviewToUpdate.user._id.toString())
    throw createHttpError(
      401,
      'User id does not match user id on existing review'
    );

  if (newReview.gameId !== reviewToUpdate.game.toString())
    throw createHttpError(400, `New game id must match existing game id`);

  const updatedReview = await updateReview(reviewId, {
    ...newReview,
    game: newReview.gameId,
    user: req.user.id,
  });

  res.status(200).json(updatedReview);
};

const deleteReview = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const reviewId = reviewIdSchema.parse(req.params.reviewId);

  const review = await findReviewById(reviewId);

  if (!review)
    throw createHttpError(404, `Review with id '${reviewId}' not found`);

  // eslint-disable-next-line no-underscore-dangle
  if (req.user.id !== review.user._id.toString())
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
