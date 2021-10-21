"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slugify = _interopRequireDefault(require("slugify"));

var _Tag = _interopRequireDefault(require("../models/Tag"));

var _Blog = _interopRequireDefault(require("../models/Blog"));

var _mongoErrors = _interopRequireDefault(require("../middleware/mongoErrors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TagController = /*#__PURE__*/function () {
  function TagController() {
    _classCallCheck(this, TagController);
  }

  _createClass(TagController, [{
    key: "createTag",
    value: function () {
      var _createTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var name, tag, error;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = ctx.request.body.name;
                tag = new _Tag["default"]({
                  name: name,
                  slug: (0, _slugify["default"])(name).toLowerCase()
                });
                error = tag.validateSync();

                if (error) {
                  ctx["throw"](422, (0, _mongoErrors["default"])(error));
                }

                _context.prev = 4;
                _context.next = 7;
                return tag.save();

              case 7:
                return _context.abrupt("return", ctx.body = _context.sent);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                ctx["throw"](422, (0, _mongoErrors["default"])(_context.t0));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 10]]);
      }));

      function createTag(_x) {
        return _createTag.apply(this, arguments);
      }

      return createTag;
    }()
  }, {
    key: "getTags",
    value: function () {
      var _getTags = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _Tag["default"].find({});

              case 3:
                return _context2.abrupt("return", ctx.body = _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                ctx["throw"](422, _context2.t0);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      function getTags(_x2) {
        return _getTags.apply(this, arguments);
      }

      return getTags;
    }()
  }, {
    key: "getTag",
    value: function () {
      var _getTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
        var slug, tag, blogs;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                slug = ctx.params.slug.toLowerCase();
                _context3.next = 4;
                return _Tag["default"].findOne({
                  slug: slug
                });

              case 4:
                tag = _context3.sent;
                _context3.next = 7;
                return _Blog["default"].find({
                  tags: tag
                }).populate('categories', '_id name slug username').populate('tags', '_id name slug username').populate('postedBy', '_id name username').select('_id title slug excerpt categories tags postedBy avatar createdAt visited');

              case 7:
                blogs = _context3.sent;
                return _context3.abrupt("return", ctx.body = {
                  blogs: blogs,
                  tag: tag
                });

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                ctx["throw"](422, _context3.t0);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));

      function getTag(_x3) {
        return _getTag.apply(this, arguments);
      }

      return getTag;
    }()
  }, {
    key: "deleteTag",
    value: function () {
      var _deleteTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
        var slug, delTag;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                slug = ctx.params.slug;
                _context4.next = 4;
                return _Tag["default"].deleteOne({
                  slug: slug
                });

              case 4:
                delTag = _context4.sent;

                if (delTag) {
                  ctx.body = {
                    status: 200,
                    message: 'Tag was deleted successfully'
                  };
                }

                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                ctx["throw"](422, _context4.t0);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 8]]);
      }));

      function deleteTag(_x4) {
        return _deleteTag.apply(this, arguments);
      }

      return deleteTag;
    }()
  }]);

  return TagController;
}();

var _default = TagController;
exports["default"] = _default;