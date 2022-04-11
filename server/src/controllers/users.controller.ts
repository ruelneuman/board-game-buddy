import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import {
  newUserSchema,
  usernameSchema,
  emailSchema,
  passwordSchema,
  bioSchema,
  usersPaginationQuerySchema,
  idParamSchema,
} from '../validationSchemas';
import {
  createUser,
  findPaginatedUsers,
  findUserById,
  deleteUserById,
} from '../services/users.service';

const getUsers = async (req: Request, res: Response) => {
  const options = usersPaginationQuerySchema.parse(req.query);

  const users = await findPaginatedUsers(options);

  res.status(200).json(users);
};

const getUser = async (req: Request, res: Response) => {
  const id = idParamSchema.parse(req.params.userId);

  const user = await findUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  res.status(200).json(user);
};

const createNewUser = async (req: Request, res: Response) => {
  const newUser = await newUserSchema.parseAsync(req.body);

  const user = await createUser(newUser);

  res.status(200).json(user);
};

const getUserCollections = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const getUserCollection = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
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

const updateUsername = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const { username } = await usernameSchema.parseAsync(req.body);
  const { id } = req.user;

  const user = await findUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  user.username = username;
  const updatedUser = await user.save();

  res.status(200).json({ username: updatedUser.username });
};

const updateEmail = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const { email } = await emailSchema.parseAsync(req.body);
  const { id } = req.user;

  const user = await findUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  user.email = email;
  const updatedUser = await user.save();

  res.status(200).json({ email: updatedUser.email });
};

const updatePassword = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const { password } = passwordSchema.parse(req.body);
  const { id } = req.user;

  const user = await findUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  user.password = password;
  await user.save();

  res.status(204).end();
};

const updateBio = async (req: Request, res: Response) => {
  if (!req.user) throw createHttpError(401);

  const { bio } = bioSchema.parse(req.body);
  const { id } = req.user;

  const user = await findUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  user.bio = bio;
  const updatedUser = await user.save();

  res.status(200).json({ bio: updatedUser.bio });
};

const getCurrentUserGameList = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const updateCurrentUserGameList = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

export default {
  getUsers,
  getUser,
  createNewUser,
  getUserCollections,
  getUserCollection,
  getCurrentUser,
  updateUsername,
  updateEmail,
  updatePassword,
  updateBio,
  deleteCurrentUser,
  getCurrentUserGameList,
  updateCurrentUserGameList,
};
