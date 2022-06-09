import React from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { useGetGameQuery } from '../../services/api';

function Game() {
  const { gameId } = useParams();

  const { data: game, isLoading, isError } = useGetGameQuery(gameId || '');

  if (isLoading) return <Box>LOADING...</Box>;
  if (isError) return <Box>ERROR...</Box>;
  if (!game) return <Box>No game found</Box>;

  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          p: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="rating">
                {game.averageRating !== null
                  ? game.averageRating.toFixed(1)
                  : '-'}
              </Avatar>
              <Typography variant="h3">{game.name}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm="auto" sx={{ textAlign: 'center' }}>
            <img
              src={
                game.images.medium ||
                'https://s3-us-west-1.amazonaws.com/5cc.images/350x350/games/empty%20box.jpg'
              }
              alt={game.name || 'Untitled'}
              style={{ maxWidth: '250px' }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                fontWeight="fontWeightMedium"
              >
                Year Published:{' '}
              </Typography>
              {game.yearPublished || '-'}
            </Typography>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                fontWeight="fontWeightMedium"
              >
                Players:{' '}
              </Typography>
              {game.players}
            </Typography>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                fontWeight="fontWeightMedium"
              >
                Players:{' '}
              </Typography>
              {game.playtime}
            </Typography>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                fontWeight="fontWeightMedium"
              >
                Age:{' '}
              </Typography>
              {game.minAge !== null ? game.minAge : '-'}
            </Typography>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                fontWeight="fontWeightMedium"
              >
                Publisher:{' '}
              </Typography>
              {game.primaryPublisher.name !== null
                ? game.primaryPublisher.name
                : '-'}
            </Typography>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                fontWeight="fontWeightMedium"
              >
                Designer:{' '}
              </Typography>
              {game.primaryDesigner.name !== null
                ? game.primaryDesigner.name
                : '-'}
            </Typography>
            <Typography variant="body1">
              <Typography
                variant="body1"
                component="span"
                fontWeight="fontWeightMedium"
              >
                Artists:{' '}
              </Typography>
              {game.artists.length !== 0 ? game.artists.join(', ') : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {game.descriptionPreview}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Box>Reviews to go here</Box>
    </Stack>
  );
}

export default Game;
