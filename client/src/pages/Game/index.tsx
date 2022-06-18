import React from 'react';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import GameInfo from './GameInfo';
import NotFound from '../NotFound';
import ReviewCard from '../../components/ReviewCard';
import { useGetGameQuery } from '../../services/api';

import { Review } from '../../types';

const reviewData: Review = {
  _id: '62691d1eb171cc071f2b0ce4',
  game: '6252d48fbd8fd83503221065',
  user: {
    _id: '626917becffa9cd79dad6c1a',
    username: 'JohnDoe',
    email: 'user5@gmail.com',
    bio: '',
    reviews: ['62691d08b171cc071f2b0cdd', '62691d1eb171cc071f2b0ce4'],
    collections: [
      {
        _id: '626917becffa9cd79dad6c1b',
        collectionName: 'wishlist',
        games: ['6269180ecffa9cd79dad6c85'],
      },
      {
        _id: '626917becffa9cd79dad6c1c',
        collectionName: 'own',
        games: [],
      },
      {
        _id: '626917becffa9cd79dad6c1d',
        collectionName: 'previouslyOwned',
        games: [],
      },
      {
        _id: '626917becffa9cd79dad6c1e',
        collectionName: 'wantToPlay',
        games: [],
      },
      {
        _id: '626917becffa9cd79dad6c1f',
        collectionName: 'wantToBuy',
        games: [],
      },
    ],
    createdAt: '2022-04-27T10:15:26.725Z',
    updatedAt: '2022-06-16T08:52:48.063Z',
  },
  rating: 7,
  reviewText:
    'I really liked this game. Think I will add it to my collection soon. I really liked this game. Think I will add it to my collection soon. I really liked this game. Think I will add it to my collection soon. ',
  likes: ['626917becffa9cd79dad6b1a', '626417becf4a9cd79dad6c1a'],
  createdAt: '2022-04-27T10:38:22.304Z',
  updatedAt: '2022-06-18T00:30:22.304Z',
};

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
      <ReviewCard review={reviewData} />
    </Stack>
  );
}

export default Game;
