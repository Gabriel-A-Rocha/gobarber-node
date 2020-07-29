import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    //instantiate fake repository
    const fakeUsersRepository = new FakeUsersRepository();
    // instantiate required services
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);
    const createUser = new CreateUserService(fakeUsersRepository);

    // create user
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    // authenticate user
    const response = await authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    // validate response
    expect(response).toHaveProperty('token');
  });
});
