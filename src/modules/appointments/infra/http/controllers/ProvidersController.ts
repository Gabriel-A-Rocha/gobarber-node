import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    // get user id picked by the authorization middleware
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({ user_id });

    console.log('Retornou do serviço');
    console.log(providers);

    return response.json(providers);
  }
}

export default ProvidersController;
