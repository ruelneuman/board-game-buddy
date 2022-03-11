import mongoose from 'mongoose';
import { GameListCategory } from '../types';

interface GameListDocument extends mongoose.Document {
  listName: GameListCategory;
  userId: mongoose.Schema.Types.ObjectId;
  games: mongoose.Schema.Types.ObjectId[];
}

const gameListSchema = new mongoose.Schema(
  {
    listName: {
      type: String,
      required: true,
      enum: Object.values(GameListCategory),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    games: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Game',
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<GameListDocument>('GameList', gameListSchema);
