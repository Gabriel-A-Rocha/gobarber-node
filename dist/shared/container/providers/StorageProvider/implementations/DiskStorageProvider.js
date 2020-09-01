"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiskStorageProvider {
  // receives the file path as argument
  async saveFile(file) {
    await _fs.default.promises.rename(_path.default.resolve(_upload.default.tmpFolder, file), _path.default.resolve(_upload.default.uploadsFolder, file));
    return file;
  }

  async deleteFile(file) {
    const filePath = _path.default.resolve(_upload.default.uploadsFolder, file); // return in case file does not exist


    try {
      await _fs.default.promises.stat(filePath);
    } catch {
      return;
    }

    await _fs.default.promises.unlink(filePath);
  }

}

var _default = DiskStorageProvider;
exports.default = _default;