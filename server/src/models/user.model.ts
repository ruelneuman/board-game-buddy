import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { UserDocument, collectionCategories } from '../types';

const collectionsDefault = () =>
  collectionCategories.map((category) => ({
    collectionName: category,
    games: [],
  }));

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
      select: false,
      minlength: 8,
      maxLength: 40,
    },
    bio: {
      type: String,
      default: '',
      trim: true,
      maxlength: 500,
    },
    collections: {
      type: [
        {
          collectionName: {
            type: String,
            required: true,
            enum: collectionCategories,
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
      default: collectionsDefault(),
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

userSchema.plugin(mongoosePaginate);

export default mongoose.model<
  UserDocument,
  mongoose.PaginateModel<UserDocument>
>('User', userSchema);
