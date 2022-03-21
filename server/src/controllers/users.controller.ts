import { Request, Response } from 'express';
import User from '../models/user.model';
import { newUserSchema } from '../validationSchemas';

const getUsers = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const getUser = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const createUser = async (req: Request, res: Response) => {
  const newUser = newUserSchema.parse(req.body);

  const userByEmail = await User.findOne({ email: newUser.email });

  if (userByEmail) {
    return res.status(400).json('email is already taken');
  }

  const userByUsername = await User.findOne({ username: newUser.username });

  if (userByUsername) {
    return res.status(400).json('username is already taken');
  }

  const user = await User.create(newUser);

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
  createUser,
  getUserCollections,
  getUserCollection,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  getCurrentUserGameList,
  updateCurrentUserGameList,
};
