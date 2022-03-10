import { Request, Response } from 'express';

const getGames = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const getGame = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const createGame = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

export default {
  getGames,
  getGame,
  createGame,
};
