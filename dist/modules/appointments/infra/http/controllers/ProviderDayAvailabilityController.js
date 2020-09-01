"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this Controller gets the provider's availability for every hour in a day
// [ { hour: 8, available: false }, ..., { hour: 17, available: true } ]
class ProviderDayAvailabilityController {
  async index(request, response) {
    // provider_id is retrieved from the route: '/providers/:provider_id/day-availability'
    const {
      provider_id
    } = request.params;
    const {
      day,
      month,
      year
    } = request.query;

    const listProviderDayAvailabilityService = _tsyringe.container.resolve(_ListProviderDayAvailabilityService.default);

    const dayAvailability = await listProviderDayAvailabilityService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return response.json(dayAvailability);
  }

}

var _default = ProviderDayAvailabilityController;
exports.default = _default;