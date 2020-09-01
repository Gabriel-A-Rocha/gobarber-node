"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderAppointmentsService = _interopRequireDefault(require("./ListProviderAppointmentsService"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let listProviderAppointmentsService;
let fakeCacheProvider;
describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviderAppointmentsService = new _ListProviderAppointmentsService.default(fakeAppointmentsRepository, fakeCacheProvider);
  });
  it('should be able to list provider appointments for the day', async () => {
    // create two appointments on the same day
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'providerId',
      user_id: 'userId1',
      date: new Date(2020, 8, 20, 14, 0, 0)
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'providerId',
      user_id: 'userId2',
      date: new Date(2020, 8, 20, 15, 0, 0)
    });
    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'providerId',
      day: 20,
      month: 9,
      year: 2020
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});