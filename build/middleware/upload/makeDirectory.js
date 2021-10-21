"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeDirectory;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function makeDirectory(targetDir, opts) {
  var isRelativeToScript = opts && opts.isRelativeToScript;
  var sep = _path["default"].sep;
  var initDir = _path["default"].isAbsolute(targetDir) ? sep : '';
  var baseDir = isRelativeToScript ? __dirname : '.';
  return targetDir.split(sep).reduce(function (parentDir, childDir) {
    var curDir = _path["default"].resolve(baseDir, parentDir, childDir);

    try {
      _fs["default"].mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') {
        // curDir already exists!
        return curDir;
      } // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows


      if (err.code === 'ENOENT') {
        // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error("EACCES: permission denied, mkdir '".concat(parentDir, "'"));
      }

      var caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;

      if (!caughtErr || caughtErr && curDir === _path["default"].resolve(targetDir)) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
}