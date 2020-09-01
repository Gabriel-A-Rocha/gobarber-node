"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeStorageProvider {
  constructor() {
    this.storage = [];
  }

  async saveFile(file) {
    this.storage.push(file);
    return file;
  }

  async deleteFile(file) {
    const findIndex = this.storage.findIndex(item => item === file); // delete file from the array

    this.storage.splice(findIndex, 1);
  }

}

var _default = FakeStorageProvider;
exports.default = _default;