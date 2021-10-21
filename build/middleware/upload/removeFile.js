"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeFile;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function removeFile(filePath) {
  _fs["default"].unlinkSync(filePath);
}