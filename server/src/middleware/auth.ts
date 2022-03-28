import expressJwt from 'express-jwt';
import { SECRET, JWT_AUDIENCE, JWT_ISSUER } from '../config';

// eslint-disable-next-line import/prefer-default-export
export const expressJwtAuth = expressJwt({
  secret: SECRET,
  audience: JWT_AUDIENCE,
  issuer: JWT_ISSUER,
  algorithms: ['HS256'],
});
