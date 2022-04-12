import { Request, Response } from 'express';
import { getPaginatedGamesWithBgaData } from '../services/games.service';
import { gamesQuerySchema } from '../validationSchemas';

const getGames = async (req: Request, res: Response) => {
  const query = gamesQuerySchema.parse(req.query);

  const games = await getPaginatedGamesWithBgaData(query);

  res.status(200).json(games);
};

const getGame = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

export default {
  getGames,
  getGame,
};
