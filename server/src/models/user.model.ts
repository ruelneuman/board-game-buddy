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
      minlength: 3,
      maxlength: 20,
      match: [
        /^[a-zA-Z0-9]+$/,
        'username must contain only alphanumeric characters',
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        'invalid email address',
      ],
    },
    password: {
      type: String,
      required: true,
      match: [/^\$2[ayb]\$.{56}$/, 'invalid password hash'],
    },
    bio: {
      type: String,
      default: '',
      trim: true,
      maxlength: 500,
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
