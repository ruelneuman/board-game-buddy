import jwt from 'jsonwebtoken';
import { FilterQuery } from 'mongoose';
import User, { UserDocument } from '../models/user.model';
import { SECRET, JWT_ISSUER, JWT_AUDIENCE } from '../config';

// eslint-disable-next-line import/prefer-default-export
export const logIn = async ({
  username,
  email,
  password,
}: {
  username?: UserDocument['username'];
  email?: UserDocument['email'];
  password: UserDocument['password'];
}) => {
  const filter: FilterQuery<UserDocument> = {};

  if (email) filter.email = email;
  else if (username) filter.username = username;
  else return null;

  const user = await User.findOne(filter, '+password').exec();

  if (!user) return null;

  const passwordCorrect = await user.comparePassword(password);

  if (!passwordCorrect) return null;

  const userForToken = {
    // eslint-disable-next-line no-underscore-dangle
    _id: user._id as string,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(userForToken, SECRET, {
    expiresIn: '1h',
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
  });

  return { token, ...userForToken };
};