"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAuthenticated(request, response, next) {
  // receive bearer token information
  const authHeader = request.headers.authorization; // deny authentication if authorization header is empty

  if (!authHeader) {
    throw new _AppError.default('JWT token is missing.', 401);
  } // split header to to pick only the token info (format: "Bearer token")


  const [type, token] = authHeader.split(' ');

  try {
    // retrieve token's secret and expiry date
    const {
      secret,
      expiresIn
    } = _auth.default.jwt;

    if (!secret) {
      throw new _AppError.default('User could not be authenticated', 401);
    } // check token's validity


    const decoded = (0, _jsonwebtoken.verify)(token, secret); // force response type as ITokenPalyload

    const {
      sub
    } = decoded; // attach user id to the request (@types/express.d.ts)

    request.user = {
      id: sub
    }; // green light for the user to proceed
    //console.log(`\nUser ID ${sub} is authenticated.`);

    return next();
  } catch {
    // handle unexpected errors
    throw new _AppError.default('Invalid JWT token.', 401);
  }
}