import React from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Game() {
  const { gameId } = useParams();

  const game = {
    _id: '6269180ecffa9cd79dad6c85',
    boardGameAtlasId: 'pPZnlKC4G3',
    reviews: [
      '62691b15b171cc071f2b0c59',
      '62691bb4b171cc071f2b0c7e',
      '62691c29b171cc071f2b0ca2',
      '62691cacb171cc071f2b0cc7',
    ],
    createdAt: '2022-04-27T10:16:46.846Z',
    updatedAt: '2022-04-27T10:36:28.420Z',
    __v: 4,
    averageRating: 8.75,
    name: 'Inis: The Board Game',
    descriptionPreview:
      "In Inis, you play the role of a Celtic chieftain who has just arrived in a new land. You must construct sanctuaries for spiritual enlightenment, erect citadels to protect peaceful clans, and indulge your wanderlust by exploring the surrounding territories. As clans migrate throughout the land and come to coexist, their differences can lead to clashes, which are often resolved peacefully—but not always. \r\n Demonstrate your leadership by rallying clans loyal to your cause, and then the Great Council will have no choice but bestow the crown on you. \r\n The game's mechanics combine card drafting and area control to produce a system rich in strategic options and interpersonal interactions. The tiles give every game a unique, gradually unfolding geography. The art brings Ireland's ancient epics and audacious heroes to life. \r\n There are three different types of cards in  Inis : \r\n \r\n Action Cards - These are drafted each round and provide the base actions to deploy troops, move troops, attack, and play new regions. \r\n Advantage Cards - These are acquired as a result of controlling certain regions. Each region has its own Advantage Card you receive as a result of having the most troops in it. \r\n Epic Tales Cards - These unique and powerful cards evoke the Celtic gods and heroes to inspire the clans to accomplish legendary feats.",
    price: '55.99',
    priceCa: '70.99',
    priceUk: '43.73',
    priceAu: '87.95',
    yearPublished: 2016,
    minPlayers: 2,
    maxPlayers: 4,
    minPlaytime: 60,
    maxPlaytime: 90,
    minAge: 14,
    mechanics: [
      {
        id: 'UAV3t3FxVI',
      },
      {
        id: '05zCZoLvQJ',
      },
      {
        id: 'bgGxE0pI2B',
      },
      {
        id: 'wV5peB05xs',
      },
      {
        id: 'WPytek5P8l',
      },
      {
        id: 'r6yIFvyXDD',
      },
      {
        id: 'U3zhCQH7Et',
      },
      {
        id: '8PN2HE86wg',
      },
      {
        id: 'zzsE4jtI1b',
      },
    ],
    categories: [
      {
        id: 'a8NM5cugJX',
      },
      {
        id: 'eX8uuNlQkQ',
      },
      {
        id: 'MHkqIVxwtx',
      },
    ],
    primaryPublisher: {
      id: 'Nz4vpToxr1',
      name: 'Matagot',
    },
    primaryDesigner: {
      id: 'mjsDgundmS',
      name: 'Christian Martinez',
    },
    artists: ['Dimitri Bielak', 'Jim Fitzpatrick'],
    names: [],
    players: '2-4',
    playtime: '60-90',
    images: {
      thumb:
        'https://d2k4q26owzy373.cloudfront.net/40x40/games/uploaded/1608452604536',
      small:
        'https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1608452604536',
      medium:
        'https://d2k4q26owzy373.cloudfront.net/350x350/games/uploaded/1608452604536',
      large:
        'https://d2k4q26owzy373.cloudfront.net/700x700/games/uploaded/1608452604536',
      original:
        'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1608452604536',
    },
  };

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
