import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { Game } from '../../types';

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
                {yearPublished ? `(${yearPublished})` : ''}
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

export default GameCard;
