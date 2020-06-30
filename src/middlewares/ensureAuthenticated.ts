import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";

import AppError from "../errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  //validação do token JWT
  const authHeader = request.headers.authorization;
  //caso não haja token na request
  if (!authHeader) {
    throw new AppError("JWT token is missing.", 401);
  }
  //parsear o token (formato: "Bearer token")
  const [type, token] = authHeader.split(" ");

  try {
    //resgatar o segredo e o prazo data de expiração do token
    const { secret, expiresIn } = authConfig.jwt;
    //verificar se o token corresponde ao armazenado no banco
    const decoded = verify(token, secret);
    //forçar a tipagem da variável 'decoded'
    const { sub } = decoded as TokenPayload;
    //anexar a id do usuário na request (@types/express.d.ts)
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token.", 401);
  }
}
