import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ReviewDocument } from '../types';

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
        validator: (rating: number) => Number.isInteger(rating),
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

// set default pagination options
mongoosePaginate.paginate.options = {
  limit: 30,
  customLabels: {
    totalDocs: 'count',
    docs: 'reviews',
  },
};

reviewSchema.plugin(mongoosePaginate);

export default mongoose.model<
  ReviewDocument,
  mongoose.PaginateModel<ReviewDocument>
>('Review', reviewSchema);
