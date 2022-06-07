import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import { useGetGamesQuery } from '../../services/api';

import GameCard from './GameCard';

function Games() {
  const PAGE_LIMIT = 40;

  const [page, setPage] = useState<number>(1);

  const {
    currentData: paginatedGames,
    isFetching,
    isError,
  } = useGetGamesQuery(page);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ): void => {
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  let content;

  if (isError) {
    content = (
      <Grid item xs={12}>
        <Typography variant="body1">Unable to load games</Typography>
      </Grid>
    );
  } else if (isFetching && !paginatedGames) {
    content = (
      <>
        {Array.from(new Array(24)).map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Skeleton
              variant="rectangular"
              sx={{ height: { xs: 311, sm: 343 } }}
            />
          </Grid>
        ))}
      </>
    );
  } else if (paginatedGames?.count === 0) {
    content = (
      <Grid item xs={12}>
        <Typography variant="body1">No results found</Typography>
      </Grid>
    );
  } else if (paginatedGames) {
    content = (
      <>
        {paginatedGames.games.length !== 0 ? (
          paginatedGames.games.map((game) => (
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
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No results found</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              onChange={handlePageChange}
              page={page}
              count={
                paginatedGames.totalPages < PAGE_LIMIT
                  ? paginatedGames.totalPages
                  : PAGE_LIMIT
              }
              color="primary"
              size="large"
            />
          </Box>
        </Grid>
      </>
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
    </Grid>
  );
}

export default Games;
