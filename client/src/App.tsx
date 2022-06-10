import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Games from './pages/Games';
import Game from './pages/Game';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <nav>
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
      <main>
        <Container>
          <Routes>
            <Route path="games" element={<Games />} />
            <Route path="games/:gameId" element={<Game />} />
            <Route path="users" element={<div>Users...</div>} />
            <Route path="/" element={<Navigate to="/games" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          marginTop: { xs: 2, md: 3 },
          padding: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">
          © {new Date().getFullYear()} Board Game Buddy
        </Typography>
      </Box>
    </>
  );
}

export default App;
