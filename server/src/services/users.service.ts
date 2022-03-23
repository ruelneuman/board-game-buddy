import User, { UserInput } from '../models/user.model';

// eslint-disable-next-line import/prefer-default-export
export const createUser = async (newUser: UserInput) => {
  const user = await User.create<UserInput>(newUser);

  const UserWithoutPassword = { ...user.toJSON(), password: undefined };

  return UserWithoutPassword;
};
