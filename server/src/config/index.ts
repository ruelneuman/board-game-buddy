import 'dotenv/config';

export const {
  PORT = 3001,
  SECRET,
  MONGODB_URI = '',
  JWT_ISSUER = '',
  JWT_AUDIENCE = '',
} = process.env;
