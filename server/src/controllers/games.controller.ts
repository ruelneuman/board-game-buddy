import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import {
  findGameWithBgaDataById,
  findMechanics,
  findPaginatedGamesWithBgaData,
} from '../services/games.service';
import { gamesQuerySchema, idParamSchema } from '../validationSchemas';

const getGames = async (req: Request, res: Response) => {
  const query = gamesQuerySchema.parse(req.params);

  const games = await findPaginatedGamesWithBgaData(query);

  res.status(200).json(games);
};

const getGame = async (req: Request, res: Response) => {
  const id = idParamSchema.parse(req.params.gameId);

  const game = await findGameWithBgaDataById(id);

  if (!game) throw createHttpError(404, `Game with id '${id}' not found`);

  res.status(200).json(game);
};

const getMechanics = async (_req: Request, res: Response) => {
  const mechanics = await findMechanics();

  res.status(200).json(mechanics);
};

export default {
  getGames,
  getGame,
  getMechanics,
};
