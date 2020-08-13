import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list provider appointments for the day', async () => {
    // create two appointments on the same day
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'providerId',
      user_id: 'userId1',
      date: new Date(2020, 8, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'providerId',
      user_id: 'userId2',
      date: new Date(2020, 8, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'providerId',
      day: 20,
      month: 9,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
