import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Board Game Buddy</h1>
      <nav>
        <NavLink to="/search">Search Games</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>

      <Routes>
        <Route path="search" element={<div>Search Games</div>} />
        <Route path="users" element={<div>Users</div>} />
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
