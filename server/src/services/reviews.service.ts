import { Types } from 'mongoose';
import createHttpError from 'http-errors';
import { ReviewInput } from '../types';
import Review from '../models/review.model';
import { addReviewToUser } from './users.service';
import { addReviewToGame } from './games.service';

// eslint-disable-next-line import/prefer-default-export
export const createReview = async (newReview: ReviewInput) => {
  const { userId, gameId } = newReview;

  const matchingReview = await Review.findOne({
    gameId,
    userId,
  });

  if (matchingReview)
    throw createHttpError(
      409,
      `Review already exists with userId ${userId} and gameId ${gameId}`
    );

  const review = await Review.create(newReview);

  await addReviewToUser(
    userId,
    // eslint-disable-next-line no-underscore-dangle
    (review._id as Types.ObjectId).toString()
  );
  await addReviewToGame(
    gameId,
    // eslint-disable-next-line no-underscore-dangle
    (review._id as Types.ObjectId).toString()
  );

  return review;
};
