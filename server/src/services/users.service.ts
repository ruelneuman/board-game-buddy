import { isValidObjectId, Types } from 'mongoose';
import createHttpError from 'http-errors';
import User from '../models/user.model';
import { UserInput, UserDocument, CollectionDocument } from '../types';

export const createUser = async (newUser: UserInput) => {
  const user = await User.create(newUser);

  return { ...user.toJSON(), password: undefined };
};

export const deleteUserById = async (id: string) => {
  if (!isValidObjectId(id)) return null;
  return User.findByIdAndDelete(id).exec();
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

export const findCollections = async (userId: string) => {
  if (!isValidObjectId(userId)) return null;
  return User.findById(userId).select('collections').exec();
};

export const updateUsername = async (
  userId: string,
  username: string
): Promise<Pick<UserDocument, 'username'>> => {
  const user = await findUserById(userId);

  if (!user) throw createHttpError(404, `User with id '${userId}' not found`);

  user.username = username;
  const updatedUser = await user.save();

  return { username: updatedUser.username };
};

export const updateEmail = async (
  userId: string,
  email: string
): Promise<Pick<UserDocument, 'email'>> => {
  const user = await findUserById(userId);

  if (!user) throw createHttpError(404, `User with id '${userId}' not found`);

  user.email = email;
  const updatedUser = await user.save();

  return { email: updatedUser.email };
};

export const updatePassword = async (
  userId: string,
  password: string
): Promise<void> => {
  const user = await findUserById(userId);

  if (!user) throw createHttpError(404, `User with id '${userId}' not found`);

  user.password = password;
  await user.save();
};

export const updateBio = async (
  userId: string,
  bio: string
): Promise<Pick<UserDocument, 'bio'>> => {
  const user = await findUserById(userId);

  if (!user) throw createHttpError(404, `User with id '${userId}' not found`);

  user.bio = bio;
  const updatedUser = await user.save();

  return { bio: updatedUser.bio };
};

export const addGameToCollection = async (
  userId: string,
  collectionId: string,
  gameId: string
): Promise<Pick<CollectionDocument, 'games'>> => {
  const user = await findUserById(userId);

  if (!user) throw createHttpError(404, `User with id '${userId}' not found`);

  const collection = user.collections.id(collectionId);

  if (!collection)
    throw createHttpError(
      404,
      `Collection with id '${collectionId}' not found`
    );

  const isDuplicate = collection.games.find(
    // eslint-disable-next-line no-underscore-dangle
    (game) => game._id.toString() === gameId
  );

  if (isDuplicate) throw createHttpError(400, 'Game already in collection');

  collection.games.push(new Types.ObjectId(gameId));

  await user.save();

  return { games: collection.games };
};

export const removeGameFromCollection = async (
  userId: string,
  collectionId: string,
  gameId: string
): Promise<void> => {
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      'collections._id': collectionId,
    },
    { $pull: { 'collections.$.games': gameId } }
  );

  if (!user)
    throw createHttpError(
      404,
      `User with id ${userId} containing collection with id ${collectionId} not found`
    );
};
