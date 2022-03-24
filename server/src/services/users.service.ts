import User, { UserInput } from '../models/user.model';

export const createUser = async (newUser: UserInput) => {
  const user = await User.create<UserInput>(newUser);

  const UserWithoutPassword = { ...user.toJSON(), password: undefined };

  return UserWithoutPassword;
};

export const findPaginatedUsers = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  const options = {
    limit,
    offset,
    sort: {
      username: 1,
    },
    collation: {
      locale: 'en',
    },
  };

  const users = await User.paginate({}, options);

  return users;
};
