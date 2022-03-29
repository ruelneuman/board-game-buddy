import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import {
  newUserSchema,
  usersPaginationQuerySchema,
  idParamSchema,
} from '../validationSchemas';
import {
  createUser,
  findPaginatedUsers,
  findUserById,
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
  if (!req.user) throw createHttpError(404, 'User not found');

  const { id } = req.user;

  const user = await findUserById(id);

  if (!user) throw createHttpError(404, `User with id '${id}' not found`);

  res.status(200).json(user);
};

const updateCurrentUser = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const deleteCurrentUser = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
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
  updateCurrentUser,
  deleteCurrentUser,
  getCurrentUserGameList,
  updateCurrentUserGameList,
};
