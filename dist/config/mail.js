"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// interface to enforce these are the only options allowed
var _default = {
  driver: process.env.MAIL_DRIVER,
  defaults: {
    from: {
      email: 'contact@gabrielrocha.dev',
      name: 'Gabriel Rocha'
    }
  }
};
exports.default = _default;