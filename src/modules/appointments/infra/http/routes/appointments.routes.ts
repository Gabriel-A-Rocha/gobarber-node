import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// use authentication middleware for all appointment routes
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
