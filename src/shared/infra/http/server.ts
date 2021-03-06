import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import rateLimiter from './middlewares/rateLimiter';

import routes from './routes/index';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

// establish connection with postgres
import '@shared/infra/typeorm/index';

// map all the dependency injections
import '@shared/container/index';

const app = express();

app.use(cors());
app.use(express.json());
// serve avatar files
app.use('/files', express.static(uploadConfig.uploadsFolder));
// rate limiter must be after the static files use
app.use(rateLimiter);

app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // output for known errors
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.log(err);

    // output for unexpected errors
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('GoBarber server running on port 3333. ✅');
});
