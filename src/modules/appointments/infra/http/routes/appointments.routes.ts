import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

//criação de um objeto 'router', que tratará das rotas de agendamento
const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

//utilizar o middleware de autenticação para todas as rotas
appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
}); */

//registrar novo agendamento
appointmentsRouter.post('/', async (request, response) => {
  //provider: barbeiro, date: data e hora do agendamento desejado
  const { provider_id, date } = request.body;
  //transformar a data de 'string' para 'Date'
  const parsedDate = parseISO(date);
  //instanciar o serviço de criação de agendamento
  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );
  //delegar a tarefa ao serviço
  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });
  //retornar o agendamento feito
  return response.json(appointment);
});

export default appointmentsRouter;
