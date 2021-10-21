"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _makeDirectory = _interopRequireDefault(require("./makeDirectory"));

var _sharp = _interopRequireDefault(require("sharp"));

var _validate = require("../validate");

var _Gallery = _interopRequireDefault(require("../../models/Gallery"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var BASE_DIR = 'upload/';
var DOMAIN = process.env.NODE_ENV === 'development' ? process.env.DEV_PATH : process.env.PRODUCTION_PATH;

var saveGalleryName = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var name, exist;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = ctx.request.body.name;
            _context.prev = 1;
            _context.next = 4;
            return _Gallery["default"].exists({
              name: name || 'default'
            });

          case 4:
            exist = _context.sent;

            if (exist) {
              ctx["throw"](422, 'Gallery name already exist');
            }

            _context.next = 8;
            return new _Gallery["default"]({
              name: name
            }).save();

          case 8:
            return _context.abrupt("return", _context.sent);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            ctx["throw"](422, _context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11]]);
  }));

  return function saveGalleryName(_x) {
    return _ref.apply(this, arguments);
  };
}();

var addGallery = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
    var body, res, count, arr, galleryID, target, fileName, filePath, fileUrl, imgObject;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;

            if (!(0, _validate.isObjectEmpty)(ctx.request.files)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", next());

          case 3:
            _context2.next = 5;
            return saveGalleryName(ctx);

          case 5:
            res = _context2.sent;
            count = body.imageCount;
            arr = ctx.request.files.file;
            galleryID = res._id;
            target = BASE_DIR + galleryID;

            if (!res) {
              _context2.next = 26;
              break;
            }

            (0, _makeDirectory["default"])(target);
            ctx.request.body.images = [];
            ctx.request.body.galleryID = galleryID;

            if (!(count === '1')) {
              _context2.next = 24;
              break;
            }

            fileName = (0, _utils.generateID)(8) + '-' + arr.name.replace(/\s/g, '').split('.').slice(0, -1).join('.'); //set default image new name and new extension

            if (body.defaultImg === arr.name) {
              ctx.request.body.defaultImg = {
                name: fileName + '.jpg',
                src: DOMAIN + galleryID + '/' + fileName + '.jpg',
                alt: fileName
              };
            }

            filePath = BASE_DIR + galleryID + '/' + fileName + '.jpg'; //Stitching file names

            fileUrl = DOMAIN + galleryID + '/' + fileName + '.jpg';
            imgObject = {
              name: fileName + '.jpg',
              src: fileUrl,
              alt: fileName
            };
            ctx.request.body.images.push(imgObject);
            _context2.next = 23;
            return (0, _sharp["default"])(arr.path).resize(900).toFormat('jpg').jpeg({
              quality: 80
            }).toFile(filePath);

          case 23:
            return _context2.abrupt("return", next());

          case 24:
            ctx.request.files.file.forEach(function (file) {
              var fileName = (0, _utils.generateID)(8) + '-' + file.name.replace(/\s/g, '').split('.').slice(0, -1).join('.'); //set default image new name and new extension

              if (ctx.request.body.defaultImg === file.name) {
                ctx.request.body.defaultImg = {
                  name: fileName + '.jpg',
                  src: DOMAIN + galleryID + '/' + fileName + '.jpg',
                  alt: fileName
                };
              }

              var filePath = BASE_DIR + galleryID + '/' + fileName + '.jpg'; //Stitching file names

              var fileUrl = DOMAIN + galleryID + '/' + fileName + '.jpg';
              var imgObject = {
                name: fileName + '.jpg',
                src: fileUrl,
                alt: fileName
              };
              ctx.request.body.images.push(imgObject);
              (0, _sharp["default"])(file.path).resize(900).toFormat('jpg').jpeg({
                quality: 80
              }).toFile(filePath);
            });
            return _context2.abrupt("return", next());

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addGallery(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = addGallery;
exports["default"] = _default;