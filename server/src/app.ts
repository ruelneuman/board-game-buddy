import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import router from './routes';

const app = express();

app.use(express.json());

const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat));

app.use(router);

export default app;
