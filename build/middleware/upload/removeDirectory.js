"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeDirectory;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function removeDirectory(_x) {
  return _removeDirectory.apply(this, arguments);
}

function _removeDirectory() {
  _removeDirectory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dirPath) {
    var options,
        _options$removeConten,
        removeContentOnly,
        _options$drillDownSym,
        drillDownSymlinks,
        _require,
        promisify,
        path,
        fs,
        readdirAsync,
        unlinkAsync,
        rmdirAsync,
        lstatAsync,
        files,
        _iterator,
        _step,
        fileName,
        filePath,
        fileStat,
        isSymlink,
        isDir,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            _options$removeConten = options.removeContentOnly, removeContentOnly = _options$removeConten === void 0 ? false : _options$removeConten, _options$drillDownSym = options.drillDownSymlinks, drillDownSymlinks = _options$drillDownSym === void 0 ? false : _options$drillDownSym, _require = require('util'), promisify = _require.promisify, path = require('path'), fs = require('fs'), readdirAsync = promisify(fs.readdir), unlinkAsync = promisify(fs.unlink), rmdirAsync = promisify(fs.rmdir), lstatAsync = promisify(fs.lstat); // fs.lstat can detect symlinks, fs.stat can't

            _context.prev = 2;
            _context.next = 5;
            return readdirAsync(dirPath);

          case 5:
            files = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            throw new Error(_context.t0);

          case 11:
            if (!files.length) {
              _context.next = 41;
              break;
            }

            _iterator = _createForOfIteratorHelper(files);
            _context.prev = 13;

            _iterator.s();

          case 15:
            if ((_step = _iterator.n()).done) {
              _context.next = 33;
              break;
            }

            fileName = _step.value;
            filePath = path.join(dirPath, fileName);
            _context.next = 20;
            return lstatAsync(filePath);

          case 20:
            fileStat = _context.sent;
            isSymlink = fileStat.isSymbolicLink();
            isDir = fileStat.isDirectory();

            if (!(isDir || isSymlink && drillDownSymlinks)) {
              _context.next = 28;
              break;
            }

            _context.next = 26;
            return rmdir(filePath);

          case 26:
            _context.next = 31;
            break;

          case 28:
            if (!(fileName !== '.gitignore')) {
              _context.next = 31;
              break;
            }

            _context.next = 31;
            return unlinkAsync(filePath);

          case 31:
            _context.next = 15;
            break;

          case 33:
            _context.next = 38;
            break;

          case 35:
            _context.prev = 35;
            _context.t1 = _context["catch"](13);

            _iterator.e(_context.t1);

          case 38:
            _context.prev = 38;

            _iterator.f();

            return _context.finish(38);

          case 41:
            if (removeContentOnly) {
              _context.next = 44;
              break;
            }

            _context.next = 44;
            return rmdirAsync(dirPath);

          case 44:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8], [13, 35, 38, 41]]);
  }));
  return _removeDirectory.apply(this, arguments);
}