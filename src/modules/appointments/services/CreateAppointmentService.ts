import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppError from "../../../shared/errors/AppError";

import Appointment from "../infra/typeorm/entities/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    //obter a referência do repositório de agendamentos
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    //arredondamento do horário
    const appointmentDate = startOfHour(date);
    //verificar se já existe agendamento no horário desejado
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );
    //retorno de erro caso horário esteja ocupado
    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked.");
    }
    //criar o agendamento
    const appointment = appointmentsRepository.create({
      provider_id: provider_id,
      date: appointmentDate,
    });
    //armazenar no banco de dados
    await appointmentsRepository.save(appointment);
    //retornar o agendamento cadastrado
    return appointment;
  }
}

export default CreateAppointmentService;
