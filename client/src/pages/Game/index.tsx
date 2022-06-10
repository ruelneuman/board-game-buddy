import React from 'react';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import GameInfo from './GameInfo';
import NotFound from '../NotFound';
import { useGetGameQuery } from '../../services/api';

function Game() {
  const { gameId } = useParams();

  const { data: game, isError, error } = useGetGameQuery(gameId || '');

  if (isError) {
    if ('data' in error && error.status === 404) {
      return <NotFound />;
    }
    return <Typography variant="body1">Unable to load game</Typography>;
  }

  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      <GameInfo game={game} />
      <Box>Reviews to go here</Box>
    </Stack>
  );
}

export default Game;
