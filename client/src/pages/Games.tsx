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
import InputAdornment from '@mui/material/InputAdornment';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';

function GameCard() {
  return (
    <Card>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="rating">
              9.6
            </Avatar>
          }
          title="Inis"
          subheader="2016"
          titleTypographyProps={{ variant: 'h5', component: 'div' }}
        />
        <CardMedia
          component="img"
          image="https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1608452604536"
          alt="Inis"
          sx={{ maxHeight: 150, width: 'auto', margin: 'auto' }}
        />
        <CardContent>
          <Stack direction="row" alignItems="center" gap={1}>
            <GroupsIcon />
            <Typography variant="body1">2-4</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <AccessTimeIcon />
            <Typography variant="body1">30-180</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function Games() {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid item xs={12}>
        <TextField
          id="game-search"
          label="Search"
          type="search"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {Array.from(Array(23)).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <GameCard />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination count={10} color="primary" size="large" />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Games;
