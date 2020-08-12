import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

// this Controller gets the provider's availability for every hour in a day
// [ { hour: 8, available: false }, ..., { hour: 17, available: true } ]

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    // provider_id is retrieved from the route: '/providers/:provider_id/day-availability'
    const { provider_id } = request.params;

    const { day, month, year } = request.body;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const dayAvailability = await listProviderDayAvailabilityService.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(dayAvailability);
  }
}

export default ProviderDayAvailabilityController;
