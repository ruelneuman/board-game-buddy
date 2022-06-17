import { Types, isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import { ReviewInput, ReviewDocument } from '../types';
import Review from '../models/review.model';
import { addReviewToUser, removeReviewFromUser } from './users.service';
import { addReviewToGame, removeReviewFromGame } from './games.service';
import { ReviewsPaginationQuery } from '../validationSchemas';

export const findPaginatedReviews = async ({
  limit,
  offset,
  sort,
  order,
  gameId,
  userId,
  rating,
}: ReviewsPaginationQuery) => {
  const options = {
    limit,
    offset,
    sort: {
      [sort]: order,
    },
    collation: {
      locale: 'en',
    },
    customLabels: {
      totalDocs: 'count',
      docs: 'reviews',
    },
    populate: 'user',
  };

  const query: Record<string, string | number> = {};

  if (gameId) query.gameId = gameId;
  if (userId) query.userId = userId;
  if (rating) query.rating = rating;

  return Review.paginate(query, options);
};

export const findReviewById = async (id: string) => {
  if (!isValidObjectId(id)) return null;
  return Review.findById(id).populate('user').exec();
};

export const createReview = async (newReview: ReviewInput) => {
  const { user, game } = newReview;

  const matchingReview = await Review.findOne({
    game,
    user,
  }).exec();

  if (matchingReview)
    throw createHttpError(
      409,
      `Review already exists with userId ${user} and gameId ${game}`
    );

  const review = await Review.create(newReview);

  await addReviewToUser(
    user,
    // eslint-disable-next-line no-underscore-dangle
    (review._id as Types.ObjectId).toString()
  );
  await addReviewToGame(
    game,
    // eslint-disable-next-line no-underscore-dangle
    (review._id as Types.ObjectId).toString()
  );

  return review;
};

export const updateReview = async (
  reviewId: string,
  newReview: ReviewInput
) => {
  const updatedReview = await Review.findOneAndUpdate(
    { _id: reviewId },
    newReview,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedReview)
    throw createHttpError(404, `Review with id ${reviewId} not found`);

  return updatedReview;
};

export const deleteReviewById = async (reviewId: string) => {
  if (!isValidObjectId(reviewId)) return null;
  const review = await Review.findByIdAndDelete(reviewId).exec();

  if (!review) return null;

  await removeReviewFromGame(review.game.toString(), reviewId);

  await removeReviewFromUser(review.user.toString(), reviewId);

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
