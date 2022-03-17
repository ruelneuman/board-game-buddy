import mongoose from 'mongoose';
import { GameRating } from '../types';

interface ReviewDocument extends mongoose.Document {
  gameId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  rating: GameRating;
  reviewText: string;
  likes: mongoose.Schema.Types.ObjectId[];
}

const reviewSchema = new mongoose.Schema(
  {
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Game',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: (rating: GameRating) => Number.isInteger(rating),
        message: 'rating must be an integer',
      },
    },
    reviewText: {
      type: String,
      default: '',
      trim: true,
      maxlength: 3000,
    },
    likes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ReviewDocument>('Review', reviewSchema);