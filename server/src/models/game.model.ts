import mongoose from 'mongoose';
import { GameDocument } from '../types';

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

export default mongoose.model<GameDocument>('Game', gameSchema);
