import { Request, Response } from 'express';

const authenticateUser = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

export default {
  authenticateUser,
};
