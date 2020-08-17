import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // receive bearer token information
  const authHeader = request.headers.authorization;
  // deny authentication if authorization header is empty
  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }
  // split header to to pick only the token info (format: "Bearer token")
  const [type, token] = authHeader.split(' ');

  try {
    // retrieve token's secret and expiry date
    const { secret, expiresIn } = authConfig.jwt;

    if (!secret) {
      throw new AppError('User could not be authenticated', 401);
    }
    // check token's validity
    const decoded = verify(token, secret);

    // force response type as ITokenPalyload
    const { sub } = decoded as ITokenPayload;
    // attach user id to the request (@types/express.d.ts)
    request.user = {
      id: sub,
    };
    // green light for the user to proceed
    //console.log(`\nUser ID ${sub} is authenticated.`);

    return next();
  } catch {
    // handle unexpected errors
    throw new AppError('Invalid JWT token.', 401);
  }
}
