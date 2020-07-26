import { Router } from "express";

import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";

//routes é o roteador primário, que fará o dispatch para os roteadores secundários (específicos)
const routes = Router();

routes.use("/appointments", appointmentsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

export default routes;
