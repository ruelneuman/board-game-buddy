import mongoose from 'mongoose';

interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  bio: string;
  gameLists: mongoose.Schema.Types.ObjectId[];
  reviews: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: '',
      trim: true,
    },
    gameLists: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'GameList',
        },
      ],
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

export default mongoose.model<UserDocument>('User', userSchema);
