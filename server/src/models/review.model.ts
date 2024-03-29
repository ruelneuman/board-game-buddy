import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ReviewDocument } from '../types';

const reviewSchema = new mongoose.Schema(
  {
    game: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Game',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
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

reviewSchema.plugin(mongoosePaginate);

export default mongoose.model<
  ReviewDocument,
  mongoose.PaginateModel<ReviewDocument>
>('Review', reviewSchema);
