import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';

import IUserTokensRepository from '../IUserTokensRepository';
import AppError from '@shared/errors/AppError';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findToken = this.userTokens.find(item => item.token === token);

    return findToken;
  }
}

export default FakeUserTokensRepository;
