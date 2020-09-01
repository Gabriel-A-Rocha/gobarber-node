"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderMonthAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this Controller gets the provider's availability for every day in the month
// [ { day: 1, available: false }, ..., { day: 31, available: true } ]
class ProviderMonthAvailabilityController {
  async index(request, response) {
    // provider id is sent in the route: 'providers/:provider_id/month-availability',
    const {
      provider_id
    } = request.params;
    const {
      month,
      year
    } = request.query;
    console.log(provider_id, month, year);

    const listProviderMonthAvailabilityService = _tsyringe.container.resolve(_ListProviderMonthAvailabilityService.default);

    const monthAvailability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year)
    });
    return response.json(monthAvailability);
  }

}

var _default = ProviderMonthAvailabilityController;
exports.default = _default;