import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import User from "../models/User";

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    //instanciar repositório padrão para cadastro de cadastro
    const usersRepository = getRepository(User);

    //primeira regra de negócio: não permitir emails duplicados
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });
    //rejeitar email já existente
    if (checkUserExists) {
      throw new Error("Email address already exists.");
    }
    //criptografar password
    const hashedPassword = await hash(password, 8);

    //criar usuário (barbeiro)
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    //armazenar usuário (barbeiro) no banco
    await usersRepository.save(user);
    //retornar usuário (barbeiro) criado
    return user;
  }
}

export default CreateUserService;
