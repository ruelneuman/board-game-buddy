import { Request, Response } from 'express';

const getUsers = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const getUser = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const createUser = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
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

const deleteCurrentUser = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const getCurrentUserCollection = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const updateCurrentUserCollection = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

export default {
  getUsers,
  getUser,
  createUser,
  getUserCollections,
  getUserCollection,
  getCurrentUser,
  deleteCurrentUser,
  getCurrentUserCollection,
  updateCurrentUserCollection,
};
