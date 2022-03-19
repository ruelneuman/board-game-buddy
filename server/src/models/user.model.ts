import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  bio: string;
  gameLists: mongoose.Schema.Types.ObjectId[];
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
