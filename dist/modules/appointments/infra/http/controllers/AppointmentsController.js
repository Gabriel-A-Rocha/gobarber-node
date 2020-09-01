"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentService = _interopRequireDefault(require("../../../services/CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async create(request, response) {
    const {
      provider_id,
      date
    } = request.body; // retrieve user id from the custom field created to register logged users

    const user_id = request.user.id; // format date from 'string' do 'Date'
    //const parsedDate = parseISO(date);

    const createAppointment = _tsyringe.container.resolve(_CreateAppointmentService.default);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date
    });
    return response.json(appointment);
  }

}

var _default = AppointmentsController;
exports.default = _default;