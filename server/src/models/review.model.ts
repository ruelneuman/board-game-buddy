import mongoose from 'mongoose';
import { ReviewDocument, GameRating } from '../types';

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
        message: 'Rating must be an integer',
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
