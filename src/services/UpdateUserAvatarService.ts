import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import uploadConfig from "../config/upload";
import User from "../models/User";

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    //utilizar repositório padrão do TypeORM para gerenciar a tabela de usuários
    const usersRepository = getRepository(User);
    //validar as informações do usuário
    const user = await usersRepository.findOne(user_id);
    //caso o usuário não tenha sido encontrado no banco
    if (!user) {
      throw new Error("Only authenticated users can change avatar.");
    }
    //caso o usuário já tenha um avatar
    if (user.avatar) {
      //montar o caminho do arquivo
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      //a função stat só tratá retorno se o arquivo existir
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      //deletar o avatar antigo
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    //atualizar o campo com o nome do novo arquivo
    user.avatar = avatarFilename;
    //salvar (atualizar) a informação no banco
    await usersRepository.save(user);
    //retornar o usuário atualizado
    return user;
  }
}

export default UpdateUserAvatarService;
