import { Router } from "express";

import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

//criação de um objeto 'router', que tratará das rotas da sessão do usuário
const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;
  //instanciar o serviço de autenticação
  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  //remover o campo password do retorno
  delete user.password;
  //retornar o usuário autenticado
  return response.json({ user, token });
});

export default sessionsRouter;
