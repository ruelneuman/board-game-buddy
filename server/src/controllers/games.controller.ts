import { Request, Response } from 'express';
import {
  createGame,
  findGameByBoardGameAtlasId,
} from '../services/games.service';
import {
  boardGameAtlasSearchSchema,
  gamesQuerySchema,
} from '../validationSchemas';
import bgaClient from '../utils/boardGameAtlasClient';
import { getPaginationData } from '../utils/helpers';

const getGames = async (req: Request, res: Response) => {
  const query = gamesQuerySchema.parse(req.query);

  const response = await bgaClient.getGamesByQueryParams(query);

  const parsedGameData = boardGameAtlasSearchSchema.parse(response.data);

  const combinedGames = await Promise.all(
    parsedGameData.games.map(async (game) => {
      let gameFromDb = await findGameByBoardGameAtlasId(game.id);

      if (!gameFromDb) {
        gameFromDb = await createGame({ boardGameAtlasId: game.id });
      }

      const { id: boardGameAtlasId, ...gameWithoutId } = game;

      return { ...gameFromDb.toJSON(), ...gameWithoutId };
    })
  );

  res.status(200).json({
    games: combinedGames,
    ...getPaginationData(parsedGameData.count, query.skip, query.limit),
  });
};

const getGame = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

export default {
  getGames,
  getGame,
};
