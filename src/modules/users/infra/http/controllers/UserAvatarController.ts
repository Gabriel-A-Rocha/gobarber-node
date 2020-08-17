import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response) {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      // user id provided by the authentication middleware
      user_id: request.user.id,
      // filename provided by the multer middleware
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}

export default UserAvatarController;
