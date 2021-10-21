"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Category = _interopRequireDefault(require("../models/Category"));

var _Blog = _interopRequireDefault(require("../models/Blog"));

var _slugify = _interopRequireDefault(require("slugify"));

var _mongoErrors = _interopRequireDefault(require("../middleware/mongoErrors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CategoryController = /*#__PURE__*/function () {
  function CategoryController() {
    _classCallCheck(this, CategoryController);
  }

  _createClass(CategoryController, [{
    key: "createCategory",
    value: function () {
      var _createCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var name, category, error;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = ctx.request.body.name;
                category = new _Category["default"]({
                  name: name,
                  slug: (0, _slugify["default"])(name).toLowerCase()
                });
                error = category.validateSync();

                if (error) {
                  ctx["throw"](422, (0, _mongoErrors["default"])(error));
                }

                _context.prev = 4;
                _context.next = 7;
                return category.save();

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

      function createCategory(_x) {
        return _createCategory.apply(this, arguments);
      }

      return createCategory;
    }()
  }, {
    key: "getCategories",
    value: function () {
      var _getCategories = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _Category["default"].find({});

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

      function getCategories(_x2) {
        return _getCategories.apply(this, arguments);
      }

      return getCategories;
    }()
  }, {
    key: "getCategory",
    value: function () {
      var _getCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
        var slug, category, blogs;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                slug = ctx.params.slug.toLowerCase();
                _context3.prev = 1;
                _context3.next = 4;
                return _Category["default"].findOne({
                  slug: slug
                });

              case 4:
                category = _context3.sent;
                _context3.next = 7;
                return _Blog["default"].find({
                  categories: category
                }).populate('categories', '_id name username slug').populate('tags', '_id name username slug').populate('postedBy', '_id name username').select('_id title slug excerpt visited categories tags postedBy avatar createdAt');

              case 7:
                blogs = _context3.sent;
                return _context3.abrupt("return", ctx.body = {
                  blogs: blogs,
                  category: category
                });

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](1);
                ctx["throw"](422, _context3.t0);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 11]]);
      }));

      function getCategory(_x3) {
        return _getCategory.apply(this, arguments);
      }

      return getCategory;
    }()
  }, {
    key: "deleteCategory",
    value: function () {
      var _deleteCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _Category["default"].deleteOne({
                  slug: ctx.params.slug
                });

              case 3:
                return _context4.abrupt("return", ctx.body = {
                  status: 200,
                  message: 'Category was deleted successfully'
                });

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                ctx["throw"](422, _context4.t0);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 6]]);
      }));

      function deleteCategory(_x4) {
        return _deleteCategory.apply(this, arguments);
      }

      return deleteCategory;
    }()
  }]);

  return CategoryController;
}();

var _default = CategoryController;
exports["default"] = _default;