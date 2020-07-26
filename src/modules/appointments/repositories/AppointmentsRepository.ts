import { EntityRepository, Repository } from "typeorm";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  //função de busca customizada
  public async findByDate(date: Date): Promise<Appointment | null> {
    //o 'await' garante que a operação irá finalizar antes de prosseguir com o código
    const findAppointment = await this.findOne({
      where: { date: date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
