import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Games from './pages/Games';

function App() {
  return (
    <>
      <nav>
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
      <Container>
        <Routes>
          <Route path="games" element={<Games />} />
          <Route path="users" element={<div>Users...</div>} />
          <Route path="/" element={<Navigate to="/games" replace />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Container>
      <div>Footer</div>
    </>
  );
}

export default App;
