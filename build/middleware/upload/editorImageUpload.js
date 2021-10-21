"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _sharp = _interopRequireDefault(require("sharp"));

var _validate = require("../validate");

var _makeDirectory = _interopRequireDefault(require("./makeDirectory"));

var _nanoid = _interopRequireDefault(require("nanoid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var BASE_DIR = 'upload/';
var DOMAIN = process.env.NODE_ENV === 'development' ? process.env.APP_LOCAL_URL : process.env.APP_PRODUCTION_URL;
/**
 * File upload
 * ps Generate file name
 * File paths are stored according date and time
 */

var uploadEditorImages = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    var galID, file, fileName, target, filePath, fileUrl, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(0, _validate.isObjectEmpty)(ctx.request.files)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next());

          case 2:
            galID = (0, _nanoid["default"])(10);
            file = ctx.request.files.file;
            fileName = file.name.replace(/\s/g, '').split('.').slice(0, -1).join('.');
            target = BASE_DIR + galID;
            filePath = _path["default"].join(BASE_DIR, galID, fileName + '.webp'); //Stitching file names

            fileUrl = DOMAIN + galID + '/' + fileName + '.webp';
            (0, _makeDirectory["default"])(target);
            _context.prev = 9;
            _context.next = 12;
            return (0, _sharp["default"])(ctx.request.files.file.path).resize(800).webp({
              quality: 80
            }).toFile(filePath);

          case 12:
            result = _context.sent;

            if (result) {
              ctx.request.files.file = {
                galID: galID,
                src: fileUrl,
                name: fileName,
                size: file.size
              };
            }

            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](9);
            ctx["throw"](422, _context.t0);

          case 19:
            return _context.abrupt("return", next());

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 16]]);
  }));

  return function uploadEditorImages(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = uploadEditorImages;
exports["default"] = _default;