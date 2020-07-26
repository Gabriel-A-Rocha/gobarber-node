import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";
import { response } from "express";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    //instanciar um repositório padrão
    const usersRepository = getRepository(User);
    //resgatar o usuário do banco de dados
    const user = await usersRepository.findOne({
      where: { email },
    });
    //caso o email esteja cadastrado no banco
    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }
    //verificar se a senha é válida
    const passwordMatched = await compare(password, user.password);
    //caso a senha esteja incorreta
    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    //USUÁRIO AUTENTICADO - gerar o token
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    //retornar os dados do usuário autenticado
    return { user, token };
  }
}

export default AuthenticateUserService;
