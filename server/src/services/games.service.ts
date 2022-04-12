import Game from '../models/game.model';
import bgaClient from '../utils/boardGameAtlasClient';
import { GameDocument, GameInput } from '../types';
import {
  GamesQuery,
  boardGameAtlasSearchSchema,
  gamesSortEnum,
  orderEnum,
} from '../validationSchemas';
import { assertNever, getPaginationData } from '../utils/helpers';

export const createGame = async (newGame: GameInput) => Game.create(newGame);

export const findGameByBoardGameAtlasId = async (
  boardGameAtlasId: GameDocument['boardGameAtlasId']
) => Game.findOne({ boardGameAtlasId });

const transormToBgaQuery = ({ sort, limit, offset, order }: GamesQuery) => {
  switch (sort) {
    case gamesSortEnum.enum.name:
      return {
        limit,
        skip: offset,
        order_by: order === orderEnum.enum.asc ? 'name' : 'name_reverse',
        ascending: 'true',
      };
    case gamesSortEnum.enum.year:
      return {
        limit,
        skip: offset,
        order_by: 'year_published',
        ascending: order === orderEnum.enum.asc ? 'true' : 'false',
      };
    default:
      return assertNever(sort);
  }
};

export const getPaginatedGamesWithBgaData = async (query: GamesQuery) => {
  const bgaQuery = transormToBgaQuery(query);

  const response = await bgaClient.getGamesByQueryParams(bgaQuery);

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

  return {
    games: combinedGames,
    ...getPaginationData(parsedGameData.count, query.offset, query.limit),
  };
};
