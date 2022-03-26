import mongoose from 'mongoose';

export interface GameDocument extends mongoose.Document {
  boardGameAtlasId: string;
  reviews: mongoose.Schema.Types.ObjectId[];
  createdAt: mongoose.Schema.Types.Date;
  updatedAt: mongoose.Schema.Types.Date;
}

const gameSchema = new mongoose.Schema(
  {
    boardGameAtlasId: {
      type: String,
      required: true,
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
