"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../middleware/utils");

var _validate = require("../middleware/validate");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SupportController = /*#__PURE__*/function () {
  function SupportController() {
    _classCallCheck(this, SupportController);
  }

  _createClass(SupportController, [{
    key: "contactAuthor",
    value: function () {
      var _contactAuthor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var _ctx$request$body, email, authorEmail, name, message, emailValid, authorEmailValid, nameRequired, messageRequired;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ctx$request$body = ctx.request.body, email = _ctx$request$body.email, authorEmail = _ctx$request$body.authorEmail, name = _ctx$request$body.name, message = _ctx$request$body.message;
                _context.prev = 1;
                emailValid = (0, _validate.validateEmail)(email);
                authorEmailValid = (0, _validate.validateEmail)(authorEmail);

                if (!emailValid || !authorEmailValid) {
                  ctx["throw"](422, 'Invalid email format');
                }

                nameRequired = (0, _validate.validateRequired)(name);
                messageRequired = (0, _validate.validateRequired)(message);

                if (!nameRequired || !messageRequired) {
                  ctx["throw"](422, 'Missing required data');
                }

                _context.next = 10;
                return (0, _utils.sendAuthorEmail)(ctx.request.body);

              case 10:
                ctx.body = _context.sent;
                _context.next = 17;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](1);

                if (_context.t0.code === 401) {
                  ctx["throw"]('Oops! something is not right. We are having issues sending your inquiry');
                }

                ctx["throw"](_context.t0.code || 422, _context.t0);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 13]]);
      }));

      function contactAuthor(_x) {
        return _contactAuthor.apply(this, arguments);
      }

      return contactAuthor;
    }()
  }, {
    key: "sendSupportEmail",
    value: function () {
      var _sendSupportEmail2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
        var _ctx$request$body2, name, email, message;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ctx$request$body2 = ctx.request.body, name = _ctx$request$body2.name, email = _ctx$request$body2.email, message = _ctx$request$body2.message;
                _context2.prev = 1;

                if (!name && !email && !message) {
                  ctx["throw"](422, 'Oops!, incomplete data');
                }

                _context2.next = 5;
                return (0, _utils.sendSupportEmail)(ctx.request.body);

              case 5:
                return _context2.abrupt("return", ctx.body = _context2.sent);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);

                if (_context2.t0.code === 401) {
                  ctx["throw"]('Oops! something is not right. We are having issues sending your inquiry');
                }

                ctx["throw"](_context2.t0.code || 422, _context2.t0);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function sendSupportEmail(_x2) {
        return _sendSupportEmail2.apply(this, arguments);
      }

      return sendSupportEmail;
    }()
  }]);

  return SupportController;
}();

var _default = SupportController;
exports["default"] = _default;