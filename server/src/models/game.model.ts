import mongoose from 'mongoose';

interface GameDocument extends mongoose.Document {
  boardGameAtlasId: string;
  reviews: mongoose.Schema.Types.ObjectId[];
}

const gameSchema = new mongoose.Schema(
  {
    boardGameAtlasId: {
      type: String,
      required: true,
      validate: {
        validator: (boardGameAtlasId: string) => {
          const re = /^([a-zA-Z0-9]){10}$/;
          return re.test(boardGameAtlasId);
        },
        message: 'invalid boardGameAtlasId',
      },
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
