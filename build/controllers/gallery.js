"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Gallery = _interopRequireDefault(require("../models/Gallery"));

var _removeDirectory = _interopRequireDefault(require("../middleware/upload/removeDirectory"));

var _removeFile = _interopRequireDefault(require("../middleware/upload/removeFile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DOMAIN = process.env.NODE_ENV === 'development' ? process.env.DEV_PATH : process.env.PRODUCTION_PATH;

var GalleryController = /*#__PURE__*/function () {
  function GalleryController() {
    _classCallCheck(this, GalleryController);
  }

  _createClass(GalleryController, [{
    key: "saveGallery",
    value: function () {
      var _saveGallery = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        var _ctx$request$body, defaultImg, images, galleryID, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ctx$request$body = ctx.request.body, defaultImg = _ctx$request$body.defaultImg, images = _ctx$request$body.images, galleryID = _ctx$request$body.galleryID;
                _context.prev = 1;
                data = {
                  defaultImg: defaultImg,
                  images: images
                };
                _context.next = 5;
                return _Gallery["default"].findOneAndUpdate({
                  _id: galleryID
                }, data, {
                  "new": true
                });

              case 5:
                return _context.abrupt("return", ctx.body = _context.sent);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                ctx["throw"](422, _context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      function saveGallery(_x, _x2) {
        return _saveGallery.apply(this, arguments);
      }

      return saveGallery;
    }()
  }, {
    key: "updateGallery",
    value: function () {
      var _updateGallery = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
        var _ctx$request$body2, images, galleryID;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ctx$request$body2 = ctx.request.body, images = _ctx$request$body2.images, galleryID = _ctx$request$body2.galleryID;
                _context2.prev = 1;
                _context2.next = 4;
                return _Gallery["default"].findOneAndUpdate({
                  _id: galleryID
                }, {
                  $push: {
                    images: images
                  }
                }, {
                  "new": true
                });

              case 4:
                return _context2.abrupt("return", ctx.body = _context2.sent);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](1);
                ctx["throw"](422, _context2.t0);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 7]]);
      }));

      function updateGallery(_x3) {
        return _updateGallery.apply(this, arguments);
      }

      return updateGallery;
    }()
  }, {
    key: "deleteImage",
    value: function () {
      var _deleteImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
        var _ctx$request$body3, galleryID, name, id, path;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ctx$request$body3 = ctx.request.body, galleryID = _ctx$request$body3.galleryID, name = _ctx$request$body3.name, id = _ctx$request$body3.id;
                path = 'upload/' + galleryID + '/' + name;
                _context3.prev = 2;
                (0, _removeFile["default"])(path);
                _context3.next = 6;
                return _Gallery["default"].findOneAndUpdate({
                  _id: galleryID
                }, {
                  $pull: {
                    images: {
                      _id: id
                    }
                  }
                }, {
                  safe: true,
                  upsert: true,
                  "new": true
                });

              case 6:
                ctx.body = _context3.sent;
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](2);
                ctx["throw"](422, _context3.t0);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 9]]);
      }));

      function deleteImage(_x4) {
        return _deleteImage.apply(this, arguments);
      }

      return deleteImage;
    }()
  }, {
    key: "updateGallerySave",
    value: function () {
      var _updateGallerySave = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
        var _ctx$request$body4, defaultImg, images, name, galleryID, defaultImgObj, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _ctx$request$body4 = ctx.request.body, defaultImg = _ctx$request$body4.defaultImg, images = _ctx$request$body4.images, name = _ctx$request$body4.name, galleryID = _ctx$request$body4.galleryID;
                defaultImgObj = {
                  name: defaultImg,
                  src: DOMAIN + galleryID + '/' + defaultImg,
                  alt: defaultImg
                };
                _context4.prev = 2;
                data = {
                  defaultImg: defaultImgObj,
                  images: images,
                  name: name
                };
                _context4.next = 6;
                return _Gallery["default"].findOneAndUpdate({
                  _id: galleryID
                }, data, {
                  "new": true
                });

              case 6:
                return _context4.abrupt("return", ctx.body = _context4.sent);

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](2);
                ctx["throw"](422, _context4.t0);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 9]]);
      }));

      function updateGallerySave(_x5) {
        return _updateGallerySave.apply(this, arguments);
      }

      return updateGallerySave;
    }()
  }, {
    key: "publishedGallery",
    value: function () {
      var _publishedGallery = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx) {
        var body;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                body = ctx.request.body;
                _context5.prev = 1;
                _context5.next = 4;
                return _Gallery["default"].findOneAndUpdate({
                  _id: body._id
                }, {
                  published: body.published
                }, {
                  "new": true
                });

              case 4:
                ctx.body = {
                  status: 200,
                  message: 'Gallery is now published'
                };
                _context5.next = 10;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](1);
                ctx["throw"](422, _context5.t0);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 7]]);
      }));

      function publishedGallery(_x6) {
        return _publishedGallery.apply(this, arguments);
      }

      return publishedGallery;
    }()
  }, {
    key: "getGalleries",
    value: function () {
      var _getGalleries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx) {
        var perPage, page, galleries, totalItems;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                perPage = 10;
                page = ctx.params.page || 1;
                _context6.prev = 2;
                _context6.next = 5;
                return _Gallery["default"].find().sort({
                  createdAt: -1
                }).skip(perPage * page - perPage).limit(perPage);

              case 5:
                galleries = _context6.sent;
                _context6.next = 8;
                return _Gallery["default"].countDocuments({});

              case 8:
                totalItems = _context6.sent;
                return _context6.abrupt("return", ctx.body = {
                  totalItems: totalItems,
                  perPage: perPage,
                  galleries: galleries
                });

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](2);
                ctx["throw"](422, _context6.t0);

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 12]]);
      }));

      function getGalleries(_x7) {
        return _getGalleries.apply(this, arguments);
      }

      return getGalleries;
    }()
  }, {
    key: "getPublishedGalleries",
    value: function () {
      var _getPublishedGalleries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(ctx) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return _Gallery["default"].find({
                  published: true
                }).sort({
                  createdAt: -1
                });

              case 3:
                ctx.body = _context7.sent;
                _context7.next = 9;
                break;

              case 6:
                _context7.prev = 6;
                _context7.t0 = _context7["catch"](0);
                ctx["throw"](422, _context7.t0);

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 6]]);
      }));

      function getPublishedGalleries(_x8) {
        return _getPublishedGalleries.apply(this, arguments);
      }

      return getPublishedGalleries;
    }()
  }, {
    key: "getGallery",
    value: function () {
      var _getGallery = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(ctx) {
        var id;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                id = ctx.params.id;
                _context8.prev = 1;
                _context8.next = 4;
                return _Gallery["default"].findOne({
                  _id: id
                }).select('images');

              case 4:
                ctx.body = _context8.sent;
                _context8.next = 10;
                break;

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](1);
                ctx["throw"](422, _context8.t0);

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[1, 7]]);
      }));

      function getGallery(_x9) {
        return _getGallery.apply(this, arguments);
      }

      return getGallery;
    }()
  }, {
    key: "getGalleryToUpdate",
    value: function () {
      var _getGalleryToUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(ctx) {
        var id;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                id = ctx.params.id;
                _context9.prev = 1;
                _context9.next = 4;
                return _Gallery["default"].findOne({
                  _id: id
                });

              case 4:
                ctx.body = _context9.sent;
                _context9.next = 10;
                break;

              case 7:
                _context9.prev = 7;
                _context9.t0 = _context9["catch"](1);
                ctx["throw"](422, _context9.t0);

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[1, 7]]);
      }));

      function getGalleryToUpdate(_x10) {
        return _getGalleryToUpdate.apply(this, arguments);
      }

      return getGalleryToUpdate;
    }()
  }, {
    key: "getHomeGallery",
    value: function () {
      var _getHomeGallery = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(ctx) {
        var res;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return _Gallery["default"].findOne({
                  name: 'home'
                });

              case 3:
                res = _context10.sent;
                return _context10.abrupt("return", ctx.body = res);

              case 7:
                _context10.prev = 7;
                _context10.t0 = _context10["catch"](0);
                ctx["throw"](422, _context10.t0);

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 7]]);
      }));

      function getHomeGallery(_x11) {
        return _getHomeGallery.apply(this, arguments);
      }

      return getHomeGallery;
    }()
  }, {
    key: "deleteGallery",
    value: function () {
      var _deleteGallery = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(ctx) {
        var id, res;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                id = ctx.request.body.id;
                _context11.prev = 1;
                _context11.next = 4;
                return _Gallery["default"].deleteOne({
                  _id: id
                });

              case 4:
                res = _context11.sent;

                if (!res) {
                  _context11.next = 9;
                  break;
                }

                _context11.next = 8;
                return (0, _removeDirectory["default"])("upload/".concat(id));

              case 8:
                return _context11.abrupt("return", ctx.body = {
                  status: 200,
                  message: 'Gallery was deleted'
                });

              case 9:
                _context11.next = 14;
                break;

              case 11:
                _context11.prev = 11;
                _context11.t0 = _context11["catch"](1);
                ctx["throw"](422, _context11.t0);

              case 14:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[1, 11]]);
      }));

      function deleteGallery(_x12) {
        return _deleteGallery.apply(this, arguments);
      }

      return deleteGallery;
    }()
  }]);

  return GalleryController;
}();

var _default = GalleryController;
exports["default"] = _default;