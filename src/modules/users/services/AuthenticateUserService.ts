import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import { response } from 'express';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // retrieve user from database
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // generate JSON Web Token for authenticated user
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    // return user info and token
    return { user, token };
  }
}

export default AuthenticateUserService;
