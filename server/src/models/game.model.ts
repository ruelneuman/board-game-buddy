import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { GameDocument, GameResponse } from '../types';

const gameSchema = new mongoose.Schema(
  {
    boardGameAtlasId: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-zA-Z0-9]){10}$/, 'Invalid boardGameAtlasId'],
    },
    reviews: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Review',
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

gameSchema.plugin(mongooseAggregatePaginate);

export default mongoose.model<
  GameDocument,
  mongoose.AggregatePaginateModel<GameResponse>
>('Game', gameSchema);
