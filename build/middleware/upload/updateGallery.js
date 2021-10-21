"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sharp = _interopRequireDefault(require("sharp"));

var _validate = require("../validate");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var BASE_DIR = 'upload/';
var DOMAIN = process.env.NODE_ENV === 'development' ? process.env.DEV_PATH : process.env.PRODUCTION_PATH;

var updateGallery = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    var body, count, galleryID, arr, fileName, filePath, fileUrl, i, len, _fileName, _filePath, _fileUrl;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = ctx.request.body;

            if (!(0, _validate.isObjectEmpty)(ctx.request.files)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next());

          case 3:
            count = body.count;
            galleryID = body.galleryID;
            arr = ctx.request.files.file;
            ctx.request.body.images = [];

            if (!(count === '1')) {
              _context.next = 15;
              break;
            }

            fileName = (0, _utils.generateID)(8) + '-' + arr.name.replace(/\s/g, '').split('.').slice(0, -1).join('.');
            filePath = BASE_DIR + galleryID + '/' + fileName + '.jpg'; //Stitching file names

            fileUrl = DOMAIN + galleryID + '/' + fileName + '.jpg';
            ctx.request.body.images.push({
              name: fileName + '.jpg',
              src: fileUrl
            });
            _context.next = 14;
            return (0, _sharp["default"])(arr.path).resize(900).toFormat('jpg').jpeg({
              quality: 80
            }).toFile(filePath);

          case 14:
            return _context.abrupt("return", next());

          case 15:
            i = 0, len = arr.length;

          case 16:
            if (!(i < len)) {
              _context.next = 26;
              break;
            }

            _fileName = (0, _utils.generateID)(8) + '-' + arr[i].name.replace(/\s/g, '').split('.').slice(0, -1).join('.');
            _filePath = BASE_DIR + galleryID + '/' + _fileName + '.jpg'; //Stitching file names

            _fileUrl = DOMAIN + galleryID + '/' + _fileName + '.jpg';
            ctx.request.body.images.push({
              name: _fileName + '.jpg',
              src: _fileUrl
            });
            _context.next = 23;
            return (0, _sharp["default"])(arr[i].path).resize(900).toFormat('jpg').jpeg({
              quality: 80
            }).toFile(_filePath);

          case 23:
            i++;
            _context.next = 16;
            break;

          case 26:
            return _context.abrupt("return", next());

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateGallery(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = updateGallery;
exports["default"] = _default;