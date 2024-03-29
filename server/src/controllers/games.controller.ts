import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import {
  findGameWithBgaDataById,
  findMechanics,
  findCategories,
  findPaginatedGamesWithBgaData,
  findSearchSuggestions,
  findPaginatedTopGamesWithBgaData,
} from '../services/games.service';
import {
  gamesPaginationQuerySchema,
  userIdSchema,
  searchSuggestionQuerySchema,
  basePaginationQuerySchema,
} from '../validationSchemas';

const getGames = async (req: Request, res: Response) => {
  const query = gamesPaginationQuerySchema.parse(req.query);

  const games = await findPaginatedGamesWithBgaData(query);

  res.status(200).json(games);
};

const getTopGames = async (req: Request, res: Response) => {
  const query = basePaginationQuerySchema.parse(req.query);

  const games = await findPaginatedTopGamesWithBgaData(query);

  res.status(200).json(games);
};

const getGame = async (req: Request, res: Response) => {
  const id = userIdSchema.parse(req.params.gameId);

  const game = await findGameWithBgaDataById(id);

  if (!game) throw createHttpError(404, `Game with id '${id}' not found`);

  res.status(200).json(game);
};

const getMechanics = async (_req: Request, res: Response) => {
  const mechanics = await findMechanics();

  res.status(200).json(mechanics);
};

const getCategories = async (_req: Request, res: Response) => {
  const categories = await findCategories();

  res.status(200).json(categories);
};

const getSearchSuggestions = async (req: Request, res: Response) => {
  const { search, type } = searchSuggestionQuerySchema.parse(req.query);

  const suggestions = await findSearchSuggestions(search, type);

  res.status(200).json(suggestions);
};

export default {
  getGames,
  getGame,
  getMechanics,
  getCategories,
  getSearchSuggestions,
  getTopGames,
};
