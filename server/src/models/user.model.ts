import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { GameListCategory } from '../types';

const gameListDefault = () =>
  Object.values(GameListCategory).map((category) => ({
    listName: category,
    games: [],
  }));

interface GameListDocument extends mongoose.Document {
  listName: GameListCategory;
  games: mongoose.Schema.Types.ObjectId[];
}

interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  bio: string;
  gameLists: GameListDocument;
  reviews: mongoose.Schema.Types.ObjectId[];
  createdAt: mongoose.Schema.Types.Date;
  updatedAt: mongoose.Schema.Types.Date;
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
      minlength: 8,
      maxLength: 40,
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
          listName: {
            type: String,
            required: true,
            enum: Object.values(GameListCategory),
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
      ],
      default: gameListDefault(),
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

userSchema.pre(
  'save',
  async function hashPassword(
    this: UserDocument,
    next: mongoose.CallbackWithoutResultAndOptionalError
  ) {
    if (!this.isModified('password')) return next();

    const saltRounds = 10;
    const hash = await bcrypt.hash(this.password, saltRounds);

    this.password = hash;

    return next();
  }
);

userSchema.methods.comparePassword = async function comparePassword(
  candidatePassword: string
): Promise<boolean> {
  try {
    const user = this as UserDocument;
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (err) {
    return false;
  }
};

export default mongoose.model<UserDocument>('User', userSchema);
