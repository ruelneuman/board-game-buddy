import { Types, isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import { ReviewInput, ReviewDocument } from '../types';
import Review from '../models/review.model';
import { addReviewToUser } from './users.service';
import { addReviewToGame } from './games.service';

export const findReviewById = async (id: string) => {
  if (!isValidObjectId(id)) return null;
  return Review.findById(id).exec();
};

export const createReview = async (newReview: ReviewInput) => {
  const { userId, gameId } = newReview;

  const matchingReview = await Review.findOne({
    gameId,
    userId,
  }).exec();

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

export const likeReview = async (
  reviewId: string,
  userId: string
): Promise<Pick<ReviewDocument, 'likes'>> => {
  const review = await findReviewById(reviewId);

  if (!review)
    throw createHttpError(404, `Review with id ${reviewId} not found`);

  const isDuplicate = review.likes.some((like) => like.toString() === userId);

  if (isDuplicate)
    throw createHttpError(
      400,
      `User has already liked review with id ${reviewId}`
    );

  review.likes.push(new Types.ObjectId(userId));

  const updatedReview = await review.save();

  return { likes: updatedReview.likes };
};

export const unlikeReview = async (
  reviewId: string,
  userId: string
): Promise<Pick<ReviewDocument, 'likes'>> => {
  const review = await findReviewById(reviewId);

  if (!review)
    throw createHttpError(404, `Review with id ${reviewId} not found`);

  const isAlreadyLiked = review.likes.some(
    (like) => like.toString() === userId
  );

  if (!isAlreadyLiked)
    throw createHttpError(
      400,
      `Review with id ${reviewId} has not yet been liked`
    );

  review.likes = review.likes.filter((like) => like.toString() !== userId);

  const updatedReview = await review.save();

  return { likes: updatedReview.likes };
};
