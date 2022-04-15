import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import {
  newUserSchema,
  usernameSchema,
  emailSchema,
  passwordSchema,
  bioSchema,
  usersPaginationQuerySchema,
  userIdSchema,
  collectionIdSchema,
  gameForCollectionSchema,
} from '../validationSchemas';
import {
  createUser,
  findPaginatedUsers,
  findUserById,
  deleteUserById,
  findCollections,
  addGameToCollection,
} from '../services/users.service';

const getUsers = async (req: Request, res: Response) => {
  const options = usersPaginationQuerySchema.parse(req.query);

  const users = await findPaginatedUsers(options);

  res.status(200).json(users);
};

const getUser = async (req: Request, res: Response) => {
  const id = userIdSchema.parse(req.params.userId);

  const user = await findUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  res.status(200).json(user);
};

const postUser = async (req: Request, res: Response) => {
  const newUser = await newUserSchema.parseAsync(req.body);

  const user = await createUser(newUser);

  res.status(200).json(user);
};

const getUserCollections = async (req: Request, res: Response) => {
  const id = userIdSchema.parse(req.params.userId);

  const collections = await findCollections(id);

  if (!collections)
    throw createHttpError(404, `User with id '${id}' not found`);

  res.status(200).json(collections);
};

const getCurrentUser = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const { id } = req.user;
  const user = await findUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  res.status(200).json(user);
};

const deleteCurrentUser = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const { id } = req.user;
  const user = await deleteUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  res.status(204).end();
};

const putUsername = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const { username } = await usernameSchema.parseAsync(req.body);
  const { id } = req.user;

  const user = await findUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  user.username = username;
  const updatedUser = await user.save();

  res.status(200).json({ username: updatedUser.username });
};

const putEmail = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const { email } = await emailSchema.parseAsync(req.body);
  const { id } = req.user;

  const user = await findUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  user.email = email;
  const updatedUser = await user.save();

  res.status(200).json({ email: updatedUser.email });
};

const putPassword = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const { password } = passwordSchema.parse(req.body);
  const { id } = req.user;

  const user = await findUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  user.password = password;
  await user.save();

  res.status(204).end();
};

const putBio = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const { bio } = bioSchema.parse(req.body);
  const { id } = req.user;

  const user = await findUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  user.bio = bio;
  const updatedUser = await user.save();

  res.status(200).json({ bio: updatedUser.bio });
};

const getCurrentUserCollections = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const { id } = req.user;
  const collections = await findCollections(id);

  if (!collections)
    throw createHttpError(404, `User with id '${id}' not found`);

  res.status(200).json(collections);
};

const postGameToCollection = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const collectionId = collectionIdSchema.parse(req.params.collectionId);
  const { id: gameId } = gameForCollectionSchema.parse(req.body);
  const { id: userId } = req.user;

  const games = await addGameToCollection(userId, collectionId, gameId);

  res.status(200).json(games);
};

const removeGameFromCollection = (_req: Request, res: Response) => {
  res.status(503).json({ error: 'not implemented' });
};

export default {
  getUsers,
  getUser,
  postUser,
  getUserCollections,
  getCurrentUser,
  putUsername,
  putEmail,
  putPassword,
  putBio,
  deleteCurrentUser,
  getCurrentUserCollections,
  postGameToCollection,
  removeGameFromCollection,
};
