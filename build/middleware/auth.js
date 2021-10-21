"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

var _Blog = _interopRequireDefault(require("../models/Blog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var auth = {};
var role;

function getJwtToken(_x, _x2) {
  return _getJwtToken.apply(this, arguments);
}

function _getJwtToken() {
  _getJwtToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx, next) {
    var parts, scheme, credentials;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(!ctx.header || !ctx.header.authorization)) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return");

          case 2:
            parts = ctx.header.authorization.split(' ');

            if (!(parts.length === 2)) {
              _context4.next = 8;
              break;
            }

            scheme = parts[0];
            credentials = parts[1];

            if (!/^Bearer$/i.test(scheme)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", credentials);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getJwtToken.apply(this, arguments);
}

function validateJWT(_x3, _x4) {
  return _validateJWT.apply(this, arguments);
}

function _validateJWT() {
  _validateJWT = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx, next) {
    var secret, token;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            secret = process.env.JWT_SECRET;
            _context6.next = 3;
            return getJwtToken(ctx);

          case 3:
            token = _context6.sent;
            console.log('secret ', secret);
            console.log('token ', token);
            if (!secret || !token) ctx["throw"](401, {
              message: 'Access to resource not allow'
            }); //jsonwebtoken.verify also checks for expiration

            _context6.next = 9;
            return _jsonwebtoken["default"].verify(token, secret, /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(err, decoded) {
                var user;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!err) {
                          _context5.next = 4;
                          break;
                        }

                        ctx["throw"](440, 'Session has expired.');
                        _context5.next = 10;
                        break;

                      case 4:
                        _context5.next = 6;
                        return _User["default"].findOne({
                          _id: decoded._id
                        });

                      case 6:
                        user = _context5.sent;

                        if (!user) {
                          ctx["throw"](404, 'User not found.');
                        }

                        ctx.state.user = user.toAuthJSON();
                        role = decoded.role;

                      case 10:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x11, _x12) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _validateJWT.apply(this, arguments);
}

auth.isUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return validateJWT(ctx);

          case 2:
            _context.prev = 2;

            if (!role) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", next());

          case 5:
            ctx["throw"](401, {
              message: 'Not sufficient permissions'
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            ctx["throw"](_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

auth.isAdmin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return validateJWT(ctx);

          case 2:
            _context2.prev = 2;

            if (!(role === 'admin')) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", next());

          case 5:
            ctx["throw"](401, {
              message: 'Not sufficient permissions'
            });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            ctx["throw"](401, _context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function (_x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

auth.isBlogAuthor = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, next) {
    var slug, user, postedById, currentUserId, isAuthor;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            slug = ctx.params.slug;
            _context3.next = 3;
            return _Blog["default"].findOne({
              slug: slug
            }).select('postedBy');

          case 3:
            user = _context3.sent;

            if (!user) {
              ctx["throw"](404, 'Only author can perform this operation.');
            }

            postedById = user.postedBy._id.toString();
            currentUserId = ctx.state.user._id.toString();
            isAuthor = postedById === currentUserId;

            if (isAuthor) {
              _context3.next = 12;
              break;
            }

            ctx["throw"](401, 'You are not authorize to perform this action.');
            _context3.next = 13;
            break;

          case 12:
            return _context3.abrupt("return", next());

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = auth;
exports["default"] = _default;