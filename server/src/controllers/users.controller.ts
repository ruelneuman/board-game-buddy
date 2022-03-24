import { Request, Response } from 'express';
import { newUserSchema, getUsersQuery } from '../validationSchemas';
import { createUser, findPaginatedUsers } from '../services/users.service';

const getUsers = async (req: Request, res: Response) => {
  const { limit, offset, sort } = getUsersQuery.parse(req.query);

  const users = await findPaginatedUsers({ limit, offset, sort });

  res.status(200).json(users);
};

const getUser = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const addNewUser = async (req: Request, res: Response) => {
  const newUser = await newUserSchema.parseAsync(req.body);

  const user = await createUser(newUser);

  return res.status(200).json(user);
};

const getUserCollections = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const getUserCollection = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const getCurrentUser = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
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
  addNewUser,
  getUserCollections,
  getUserCollection,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  getCurrentUserGameList,
  updateCurrentUserGameList,
};
