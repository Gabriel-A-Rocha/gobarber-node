import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    //arredondamento do horário
    const appointmentDate = startOfHour(date);
    //verificar se já existe agendamento no horário desejado
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    //retorno de erro caso horário esteja ocupado
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }
    //criar o agendamento
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    //retornar o agendamento cadastrado
    return appointment;
  }
}

export default CreateAppointmentService;
