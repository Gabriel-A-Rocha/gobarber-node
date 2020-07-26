import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

//criação de um objeto 'router', que tratará das rotas de cadastro de usuário
const usersRouter = Router();
//criar uma instância do multer
const upload = multer(uploadConfig);

//cadastrar novo usuário
usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;
  //instanciar o serviço de criação de usuário (barbeiro)
  const CreateUser = new CreateUserService();
  //enviar as informações do usuário (barbeiro) ao serviço de criação
  const user = await CreateUser.execute({
    name,
    email,
    password,
  });
  //remover a informação de password, para não exibí-la
  delete user.password;
  //retornar o usuário (barbeiro) criado
  return response.json(user);
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    //delegar para o serviço de atualização do avatar
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    //retirar a informação de password do retorno
    delete user.password;
    //retornar usuário atualizado
    return response.json(user);
  }
);

export default usersRouter;
