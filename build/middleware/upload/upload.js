"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _makeDirectory = _interopRequireDefault(require("./makeDirectory"));

var _path = _interopRequireDefault(require("path"));

var _sharp = _interopRequireDefault(require("sharp"));

var _validate = require("../validate");

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

var uploadImg = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    var avatarID, file, fileName, target, thumbTarget, filePath, thumbPath, fileURL, thumb, result, avatarResult;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(0, _validate.isObjectEmpty)(ctx.request.files.avatar)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next());

          case 2:
            avatarID = (0, _nanoid["default"])(10);
            file = ctx.request.files.avatar;
            fileName = file.name.replace(/\s/g, '').split('.').slice(0, -1).join('.');
            target = BASE_DIR + avatarID;
            thumbTarget = BASE_DIR + avatarID + '/thumb';
            filePath = _path["default"].join(BASE_DIR, avatarID, fileName + '.webp');
            thumbPath = BASE_DIR + avatarID + '/thumb/' + fileName + '.webp';
            fileURL = DOMAIN + avatarID + '/' + fileName + '.webp';
            thumb = DOMAIN + avatarID + '/thumb/' + fileName + '.webp';
            _context.prev = 11;
            _context.next = 14;
            return (0, _makeDirectory["default"])(target);

          case 14:
            _context.next = 16;
            return (0, _makeDirectory["default"])(thumbTarget);

          case 16:
            _context.next = 18;
            return (0, _sharp["default"])(ctx.request.files.avatar.path).resize(600).webp({
              quality: 80
            }).toFile(filePath);

          case 18:
            result = _context.sent;
            _context.next = 21;
            return (0, _sharp["default"])(ctx.request.files.avatar.path).resize(200).webp({
              quality: 80
            }).toFile(thumbPath);

          case 21:
            avatarResult = _context.sent;

            if (result && avatarResult) {
              ctx.request.files.avatar = {
                avatarID: avatarID,
                url: fileURL,
                thumb: thumb,
                name: fileName
              };
            }

            return _context.abrupt("return", next());

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](11);
            ctx["throw"](422, {
              message: 'Failed to upload file'
            });

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[11, 26]]);
  }));

  return function uploadImg(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = uploadImg;
exports["default"] = _default;