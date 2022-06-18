import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import type { Game } from '../../types';

type GameDetailProps = {
  title: string;
  detail: string | number | null;
  defaultDetail: string;
};

function GameDetail({ title, detail, defaultDetail }: GameDetailProps) {
  return (
    <Typography variant="body1">
      <Typography
        variant="body1"
        component="span"
        fontWeight="fontWeightMedium"
      >
        {title}
        {': '}
      </Typography>
      {detail || defaultDetail}
    </Typography>
  );
}

type GameInfoProps = {
  game?: Game;
};

function GameInfo({ game }: GameInfoProps) {
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
            {game ? (
              <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="rating">
                {game.averageRating !== null
                  ? game.averageRating.toFixed(1)
                  : '-'}
              </Avatar>
            ) : (
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
            )}
            <Typography variant="h3" sx={{ flexGrow: 1 }}>
              {game ? game.name : <Skeleton />}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm="auto" sx={{ textAlign: 'center' }}>
          {game ? (
            <img
              src={
                game.images.medium ||
                'https://s3-us-west-1.amazonaws.com/5cc.images/350x350/games/empty%20box.jpg'
              }
              alt={game.name || 'Untitled'}
              style={{ maxWidth: '250px' }}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              sx={{ height: 250, width: 250, margin: 'auto' }}
            />
          )}
        </Grid>
        <Grid item>
          {game ? (
            <GameDetail
              title="Year Published"
              detail={game.yearPublished}
              defaultDetail="unknown"
            />
          ) : (
            <Skeleton variant="text" sx={{ width: 300 }} />
          )}
          {game ? (
            <GameDetail
              title="Players"
              detail={game.players}
              defaultDetail="unknown"
            />
          ) : (
            <Skeleton variant="text" sx={{ width: 300 }} />
          )}
          {game ? (
            <GameDetail
              title="Playtime"
              detail={game.playtime}
              defaultDetail="unknown"
            />
          ) : (
            <Skeleton variant="text" sx={{ width: 300 }} />
          )}
          {game ? (
            <GameDetail
              title="Age"
              detail={game.minAge}
              defaultDetail="unknown"
            />
          ) : (
            <Skeleton variant="text" sx={{ width: 300 }} />
          )}
          {game ? (
            <GameDetail
              title="Publisher"
              detail={game.primaryPublisher.name}
              defaultDetail="unknown"
            />
          ) : (
            <Skeleton variant="text" sx={{ width: 300 }} />
          )}
          {game ? (
            <GameDetail
              title="Designer"
              detail={game.primaryDesigner.name}
              defaultDetail="unknown"
            />
          ) : (
            <Skeleton variant="text" sx={{ width: 300 }} />
          )}
          {game ? (
            <GameDetail
              title="Artists"
              detail={
                game.artists.length !== 0 ? game.artists.join(', ') : null
              }
              defaultDetail="unknown"
            />
          ) : (
            <Skeleton variant="text" sx={{ width: 300 }} />
          )}
        </Grid>
        <Grid item xs={12}>
          {game ? (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {game.descriptionPreview}
            </Typography>
          ) : (
            <>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default GameInfo;
