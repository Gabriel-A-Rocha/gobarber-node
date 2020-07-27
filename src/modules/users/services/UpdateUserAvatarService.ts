import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      // assemble the file path
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // check if the avatar file exists
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      // delete previous avatar
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    // update file name
    user.avatar = avatarFilename;
    // save new avatar to database
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
