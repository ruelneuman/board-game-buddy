import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { MONGODB_URI } from './config';
import router from './routes';
import { errorHandler } from './middleware';
import logger from './utils/logger';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDb');
  })
  .catch((error) => {
    let message = '';
    if (error instanceof Error) {
      message = error.message;
    }
    logger.error(`error connecting to MongoDB: ${message}`);
  });

const app = express();

app.use(express.json());

const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat));

app.use(router);

app.use(errorHandler);

export default app;
