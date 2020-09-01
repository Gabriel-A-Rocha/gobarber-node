"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _cors = _interopRequireDefault(require("cors"));

var _celebrate = require("celebrate");

var _rateLimiter = _interopRequireDefault(require("./middlewares/rateLimiter"));

var _index = _interopRequireDefault(require("./routes/index"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

require("../typeorm");

require("../../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// establish connection with postgres
// map all the dependency injections
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json()); // serve avatar files

app.use('/files', _express.default.static(_upload.default.uploadsFolder)); // rate limiter must be after the static files use

app.use(_rateLimiter.default);
app.use(_index.default);
app.use((0, _celebrate.errors)());
app.use((err, request, response, next) => {
  // output for known errors
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.log(err); // output for unexpected errors

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
app.listen(3333, () => {
  console.log('GoBarber server running on port 3333. ✅');
});