import 'dotenv/config';

export const { PORT = 3001, SECRET, MONGODB_URI = '' } = process.env;
