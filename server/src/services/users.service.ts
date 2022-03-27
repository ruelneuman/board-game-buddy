import { isValidObjectId } from 'mongoose';
import User, { UserInput } from '../models/user.model';

export const createUser = async (newUser: UserInput) => {
  const user = await User.create(newUser);

  return { ...user.toJSON(), password: undefined };
};

export const findUserById = async (id: string) => {
  if (!isValidObjectId(id)) return null;
  return User.findById(id).exec();
};

export const findPaginatedUsers = async ({
  limit,
  offset,
  sort,
  order,
}: {
  limit: number;
  offset: number;
  sort: string;
  order: string;
}) => {
  const options = {
    limit,
    offset,
    sort: {
      [sort]: order,
    },
    collation: {
      locale: 'en',
    },
  };

  const users = await User.paginate({}, options);

  return users;
};
