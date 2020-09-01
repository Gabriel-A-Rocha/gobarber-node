"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//import IParseMailTemplateDTO from '../dtos/IParseMailtemplateDTO';
class FakeMailTemplateProvider {
  async parse() {
    return 'Fake mail template';
  }

}

var _default = FakeMailTemplateProvider;
exports.default = _default;