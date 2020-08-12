import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

// this Controller gets the provider's availability for every day in the month
// [ { day: 1, available: false }, ..., { day: 31, available: true } ]

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    // provider id is sent in the route: 'providers/:provider_id/month-availability',
    const { provider_id } = request.params;

    const { month, year } = request.body;

    console.log(provider_id, month, year);

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const monthAvailability = await listProviderMonthAvailabilityService.execute(
      {
        provider_id,
        month,
        year,
      },
    );

    return response.json(monthAvailability);
  }
}

export default ProviderMonthAvailabilityController;
