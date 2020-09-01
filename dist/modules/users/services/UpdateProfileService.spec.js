"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// instantiate implementation modules
let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it("should be able to update user's profile", async () => {
    // create user
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    }); // provide information to be updated

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Lennon',
      email: 'johnlennon@beatles.com'
    });
    expect(updatedUser.name).toBe('John Lennon');
    expect(updatedUser.email).toBe('johnlennon@beatles.com');
  });
  it('should not be able to update a non-existing user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-id',
      name: 'John Lennon',
      email: 'johnlennon@beatles.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to update email with another user's email", async () => {
    // create user
    await fakeUsersRepository.create({
      name: 'First John Doe',
      email: 'first_john_doe@gmail.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Second John Doe',
      email: 'second_john_doe@gmail.com',
      password: '123456'
    }); // try to update email with another user's email

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Wannabe First John Doe',
      email: 'first_john_doe@gmail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    // create user
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    }); // provide information to be updated

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Lennon',
      email: 'johnlennon@beatles.com',
      old_password: '123456',
      password: 'YokoOno'
    });
    expect(updatedUser.password).toBe('YokoOno');
  });
  it('should not be able to update the password without providing the previous password', async () => {
    // create user
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Lennon',
      email: 'johnlennon@beatles.com',
      password: 'YokoOno'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password without providing the correct previous password', async () => {
    // create user
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Lennon',
      email: 'johnlennon@beatles.com',
      old_password: 'WrongPreviousPassword',
      password: 'YokoOno'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});