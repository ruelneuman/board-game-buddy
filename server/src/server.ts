import { PORT } from './config';
import express from 'express';
import app from './app';

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}}`);
});
