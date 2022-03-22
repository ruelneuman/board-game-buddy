import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { z } from 'zod';
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

export interface UserInput {
  username: string;
  email: string;
  password: string;
  bio: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  gameLists: GameListDocument;
  reviews: mongoose.Schema.Types.ObjectId[];
  createdAt: mongoose.Schema.Types.Date;
  updatedAt: mongoose.Schema.Types.Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      match: [
        /^[a-zA-Z0-9]+$/,
        'Username must contain only alphanumeric characters',
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => {
          const schema = z.string().email();
          return schema.safeParse(email).success;
        },
        message: 'Invalid email address',
      },
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
