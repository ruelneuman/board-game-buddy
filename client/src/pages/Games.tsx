import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import { useGetGamesQuery } from '../services/api';
import { Game } from '../types';

type GameCardProps = {
  game: Game;
};

function GameCard({ game }: GameCardProps) {
  const { averageRating, name, yearPublished, players, playtime, images } =
    game;

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <CardContent sx={{ width: '100%' }}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {name || 'Untitled'}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                color="text.secondary"
              >
                {yearPublished || '-'}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="rating">
              {averageRating !== null ? averageRating.toFixed(1) : '-'}
            </Avatar>
          </Stack>
        </CardContent>
        <CardMedia
          component="img"
          image={
            images.small ||
            'https://s3-us-west-1.amazonaws.com/5cc.images/150x150/games/empty%20box.jpg'
          }
          alt={name || 'Untitled'}
          sx={{ maxHeight: 150, width: 'auto', margin: 'auto' }}
        />
        <CardContent>
          <Stack direction="row" alignItems="center" gap={1}>
            <GroupsIcon />
            <Typography variant="body1">{players || '-'}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <AccessTimeIcon />
            <Typography variant="body1">{playtime || '-'}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function Games() {
  const {
    data: paginatedGames,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGamesQuery();

  let content;

  if (isLoading) content = <div>LOADING...</div>;
  if (isSuccess) {
    content = paginatedGames.games.map((game) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        // eslint-disable-next-line no-underscore-dangle
        key={game._id}
      >
        <GameCard game={game} />
      </Grid>
    ));
  }
  if (isError && 'data' in error) {
    content = (
      <div>
        {error.status} {JSON.stringify(error.data)}
      </div>
    );
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid item xs={12}>
        <TextField
          id="search-games"
          label="Search Games"
          type="text"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {content}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination count={10} color="primary" size="large" />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Games;
