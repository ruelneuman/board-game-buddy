import Game from '../models/game.model';
import bgaClient from '../utils/boardGameAtlasClient';
import { GameDocument, GameInput } from '../types';
import { GamesQuery, boardGameAtlasSearchSchema } from '../validationSchemas';
import { getPaginationData } from '../utils/helpers';

export const createGame = async (newGame: GameInput) => {
  const game = await Game.create(newGame);

  return game;
};

export const findGameByBoardGameAtlasId = async (
  boardGameAtlasId: GameDocument['boardGameAtlasId']
) => Game.findOne({ boardGameAtlasId });

export const getPaginatedGamesWithBgaData = async (query: GamesQuery) => {
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
  return {
    games: combinedGames,
    ...getPaginationData(parsedGameData.count, query.skip, query.limit),
  };
};
