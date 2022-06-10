import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import { Game } from '../../types';

type GameInfoProps = {
  game: Game;
};

function GameInfo({ game }: GameInfoProps) {
  const {
    averageRating,
    name,
    images,
    yearPublished,
    players,
    playtime,
    minAge,
    primaryPublisher,
    primaryDesigner,
    artists,
    descriptionPreview,
  } = game;

  return (
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
              {averageRating !== null ? averageRating.toFixed(1) : '-'}
            </Avatar>
            <Typography variant="h3">{name}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm="auto" sx={{ textAlign: 'center' }}>
          <img
            src={
              images.medium ||
              'https://s3-us-west-1.amazonaws.com/5cc.images/350x350/games/empty%20box.jpg'
            }
            alt={name || 'Untitled'}
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
            {yearPublished || '-'}
          </Typography>
          <Typography variant="body1">
            <Typography
              variant="body1"
              component="span"
              fontWeight="fontWeightMedium"
            >
              Players:{' '}
            </Typography>
            {players}
          </Typography>
          <Typography variant="body1">
            <Typography
              variant="body1"
              component="span"
              fontWeight="fontWeightMedium"
            >
              Players:{' '}
            </Typography>
            {playtime}
          </Typography>
          <Typography variant="body1">
            <Typography
              variant="body1"
              component="span"
              fontWeight="fontWeightMedium"
            >
              Age:{' '}
            </Typography>
            {minAge !== null ? minAge : '-'}
          </Typography>
          <Typography variant="body1">
            <Typography
              variant="body1"
              component="span"
              fontWeight="fontWeightMedium"
            >
              Publisher:{' '}
            </Typography>
            {primaryPublisher.name !== null ? primaryPublisher.name : '-'}
          </Typography>
          <Typography variant="body1">
            <Typography
              variant="body1"
              component="span"
              fontWeight="fontWeightMedium"
            >
              Designer:{' '}
            </Typography>
            {primaryDesigner.name !== null ? primaryDesigner.name : '-'}
          </Typography>
          <Typography variant="body1">
            <Typography
              variant="body1"
              component="span"
              fontWeight="fontWeightMedium"
            >
              Artists:{' '}
            </Typography>
            {artists.length !== 0 ? artists.join(', ') : '-'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {descriptionPreview}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default GameInfo;
