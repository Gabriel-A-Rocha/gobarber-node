import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

// instantiate implementation modules
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it("should be able to update user's profile", async () => {
    // create user
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    // provide information to be updated
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Lennon',
      email: 'johnlennon@beatles.com',
    });

    expect(updatedUser.name).toBe('John Lennon');
    expect(updatedUser.email).toBe('johnlennon@beatles.com');
  });

  it('should not be able to update a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'John Lennon',
        email: 'johnlennon@beatles.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update email with another user's email", async () => {
    // create user
    await fakeUsersRepository.create({
      name: 'First John Doe',
      email: 'first_john_doe@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Second John Doe',
      email: 'second_john_doe@gmail.com',
      password: '123456',
    });

    // try to update email with another user's email
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Wannabe First John Doe',
        email: 'first_john_doe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    // create user
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    // provide information to be updated
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Lennon',
      email: 'johnlennon@beatles.com',
      old_password: '123456',
      password: 'YokoOno',
    });

    expect(updatedUser.password).toBe('YokoOno');
  });

  it('should not be able to update the password without providing the previous password', async () => {
    // create user
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Lennon',
        email: 'johnlennon@beatles.com',
        password: 'YokoOno',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without providing the correct previous password', async () => {
    // create user
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Lennon',
        email: 'johnlennon@beatles.com',
        old_password: 'WrongPreviousPassword',
        password: 'YokoOno',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
