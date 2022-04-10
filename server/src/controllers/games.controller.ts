import { Request, Response } from 'express';
import {
  createGame,
  findGameByBoardGameAtlasId,
} from '../services/games.service';
import {
  boardGameAtlasSearchSchema,
  gamesQuerySchema,
  gamesSortEnum,
  orderEnum,
} from '../validationSchemas';
import bgaClient from '../utils/boardGameAtlasClient';
import { assertNever, getPaginationData } from '../utils/helpers';

const getGames = async (req: Request, res: Response) => {
  const query = gamesQuerySchema.parse(req.query);

  const gamesQueryToBgaClientQuery = (gamesQuery: typeof query) => {
    switch (query.sort) {
      case gamesSortEnum.enum.name:
        return {
          limit: gamesQuery.limit.toString(),
          skip: gamesQuery.offset.toString(),
          order_by:
            gamesQuery.order === orderEnum.enum.asc ? 'name' : 'name_reverse',
          ascending: 'true',
        };
      case gamesSortEnum.enum.year:
        return {
          limit: gamesQuery.limit.toString(),
          skip: gamesQuery.offset.toString(),
          order_by: 'year_published',
          ascending: gamesQuery.order === orderEnum.enum.asc ? 'true' : 'false',
        };
      default:
        return assertNever(query.sort);
    }
  };

  const bgaClientQuery = gamesQueryToBgaClientQuery(query);

  const response = await bgaClient.getGamesByQueryParams(bgaClientQuery);

  const parsedGameData = boardGameAtlasSearchSchema.parse(response.data);

  const combinedGames = await Promise.all(
    parsedGameData.games.map(async (game) => {
      let gameFromDb = await findGameByBoardGameAtlasId(game.id);

      if (!gameFromDb) {
        gameFromDb = await createGame({ boardGameAtlasId: game.id });
      }

      const { id: boardGameAtlasId, ...gameWithoutId } = game;

      return { ...gameWithoutId, ...gameFromDb.toJSON() };
    })
  );

  res.status(200).json({
    games: combinedGames,
    ...getPaginationData(parsedGameData.count, query.offset, query.limit),
  });
};

const getGame = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

export default {
  getGames,
  getGame,
};
