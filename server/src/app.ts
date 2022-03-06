import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());

const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat));

export default app;
