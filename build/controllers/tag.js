"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slugify = _interopRequireDefault(require("slugify"));

var _Tag = _interopRequireDefault(require("../models/Tag"));

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
    key: "deleteTag",
    value: function () {
      var _deleteTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
        var slug, delTag;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                slug = ctx.params.slug;
                _context2.next = 4;
                return _Tag["default"].deleteOne({
                  slug: slug
                });

              case 4:
                delTag = _context2.sent;

                if (delTag) {
                  ctx.body = {
                    status: 200,
                    message: 'Tag was deleted successfully'
                  };
                }

                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                ctx["throw"](422, _context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      function deleteTag(_x2) {
        return _deleteTag.apply(this, arguments);
      }

      return deleteTag;
    }()
  }]);

  return TagController;
}();

var _default = TagController;
exports["default"] = _default;