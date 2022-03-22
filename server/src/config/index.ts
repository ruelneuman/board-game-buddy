import 'dotenv/config';

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (value === undefined || value.length === 0) {
    throw new Error(`missing required environment variable ${key}`);
  }
  return value;
};

export const PORT = getEnv('PORT');
export const MONGODB_URI = getEnv('MONGODB_URI');
export const SECRET = getEnv('SECRET');
export const JWT_ISSUER = getEnv('JWT_ISSUER');
export const JWT_AUDIENCE = getEnv('JWT_AUDIENCE');
