"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _utils = require("../middleware/utils");

var _mongoErrors = _interopRequireDefault(require("../middleware/mongoErrors"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _validate = require("../middleware/validate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var passwordResetSecrete = process.env.JWT_PASSWORD_SECRET;
var userActivationSecret = process.env.JWT_ACCOUNT_ACTIVATION;
/**
 * User controller - Class
 * @category Api
 */

var UserController = /*#__PURE__*/function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "accountActivation",
    value: // prepare email verification token
    function () {
      var _accountActivation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(ctx) {
        var _ctx$request$body, name, email, password, emailValid, passwordValid, nameValid, user, token;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ctx$request$body = ctx.request.body, name = _ctx$request$body.name, email = _ctx$request$body.email, password = _ctx$request$body.password;
                emailValid = (0, _validate.validateEmail)(email);
                passwordValid = (0, _validate.validatePassword)(password);
                nameValid = (0, _validate.validateRequired)(name);

                if (!emailValid || !passwordValid || !nameValid) {
                  ctx["throw"](422, 'Invalid data received');
                }

                _context.prev = 5;
                _context.next = 8;
                return _User["default"].exists({
                  email: email
                });

              case 8:
                user = _context.sent;

                if (user) {
                  ctx["throw"](422, 'An active account already exist.');
                }

                _context.next = 12;
                return _jsonwebtoken["default"].sign({
                  name: name,
                  email: email,
                  password: password
                }, userActivationSecret, {
                  expiresIn: '60m'
                });

              case 12:
                token = _context.sent;
                ctx.body = {
                  status: 200,
                  message: "An email has been sent to ".concat(email, ". Please validate to activate account.")
                };
                _context.next = 16;
                return (0, _utils.accountActivationEmail)(email, token);

              case 16:
                return _context.abrupt("return", _context.sent);

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](5);
                ctx["throw"](422, _context.t0);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 19]]);
      }));

      function accountActivation(_x) {
        return _accountActivation.apply(this, arguments);
      }

      return accountActivation;
    }() // Complete the registration and notify admin of new user

  }, {
    key: "register",
    value: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(ctx) {
        var token;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                token = ctx.request.body.token;
                _context3.next = 3;
                return _jsonwebtoken["default"].verify(token, userActivationSecret, /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(err, decoded) {
                    var name, email, password, avatar, obj, user, result;
                    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (err) {
                              ctx["throw"](401, {
                                message: 'Link is expired. Please signup again.'
                              });
                            }

                            name = decoded.name, email = decoded.email, password = decoded.password;
                            avatar = (0, _utils.gravatar)(email);
                            obj = {
                              name: name,
                              email: email,
                              password: password,
                              avatar: avatar,
                              emailVerificationToken: undefined,
                              emailVerified: true
                            };
                            user = new _User["default"](obj);
                            _context2.prev = 5;
                            _context2.next = 8;
                            return user.save();

                          case 8:
                            result = _context2.sent;

                            if (!result) {
                              _context2.next = 13;
                              break;
                            }

                            _context2.next = 12;
                            return (0, _utils.sendNewUserEmail)(name, email);

                          case 12:
                            ctx.body = {
                              status: 200,
                              message: 'Account is now active. Please login.'
                            };

                          case 13:
                            _context2.next = 18;
                            break;

                          case 15:
                            _context2.prev = 15;
                            _context2.t0 = _context2["catch"](5);
                            ctx["throw"](422, _context2.t0);

                          case 18:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, null, [[5, 15]]);
                  }));

                  return function (_x3, _x4) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function register(_x2) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(ctx) {
        var _ctx$request$body2, password, email, user, session, res, token, refreshToken, userData;

        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _ctx$request$body2 = ctx.request.body, password = _ctx$request$body2.password, email = _ctx$request$body2.email;
                (0, _validate.validatePassword)(password);
                (0, _validate.validateEmail)(email);

                if (!password || !email) {
                  ctx["throw"](422, 'Invalid data received');
                }

                _context4.prev = 4;
                _context4.next = 7;
                return _User["default"].findOne({
                  email: email
                });

              case 7:
                user = _context4.sent;

                if (!user) {
                  ctx["throw"](404, 'User not found.');
                }

                _context4.next = 11;
                return user.comparePassword(password);

              case 11:
                if (_context4.sent) {
                  _context4.next = 13;
                  break;
                }

                ctx["throw"](422, {
                  message: 'Password is invalid'
                });

              case 13:
                session = {
                  userId: user._id,
                  valid: true,
                  name: user.name,
                  role: user.role
                }; //create or update the userSession

                _context4.next = 16;
                return _User["default"].findOneAndUpdate({
                  email: email
                }, {
                  $set: {
                    userSession: session
                  }
                });

              case 16:
                res = _context4.sent;

                if (!res) {
                  _context4.next = 25;
                  break;
                }

                // create access token and set it in a secure cookie
                token = (0, _utils.signJWT)({
                  userSession: {
                    userId: user._id,
                    name: user.name,
                    role: user.role
                  }
                }, '60s');
                ctx.cookies.set('token', token, {
                  sameSite: 'Lax',
                  maxAge: 900000,
                  // 15 minutes
                  httpOnly: true,
                  secure: true
                });
                refreshToken = (0, _utils.signJWT)({
                  userId: user._id
                }, '1y');
                ctx.cookies.set('refreshToken', refreshToken, {
                  sameSite: 'Lax',
                  maxAge: 3.154e10,
                  // 1 year
                  httpOnly: true,
                  secure: true
                });
                userData = {
                  userId: user._id,
                  role: user.role,
                  name: user.name
                };
                ctx.state.user = userData;
                return _context4.abrupt("return", ctx.body = {
                  user: userData
                });

              case 25:
                _context4.next = 30;
                break;

              case 27:
                _context4.prev = 27;
                _context4.t0 = _context4["catch"](4);
                ctx["throw"](422, _context4.t0);

              case 30:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 27]]);
      }));

      function login(_x5) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "logOut",
    value: function () {
      var _logOut = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(ctx) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _User["default"].findOneAndUpdate({
                  _id: ctx.request.body.id
                }, {
                  $set: {
                    'userSession.valid': false
                  }
                });

              case 3:
                ctx.cookies.set('token', null);
                ctx.cookies.set('refreshToken', null);
                ctx.state.user = null;
                ctx.body = {
                  status: 440,
                  message: 'Session was deleted successfully'
                };
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](0);
                ctx["throw"](422, _context5.t0);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 9]]);
      }));

      function logOut(_x6) {
        return _logOut.apply(this, arguments);
      }

      return logOut;
    }()
  }, {
    key: "forgot",
    value: function () {
      var _forgot = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(ctx) {
        var data, emailValid, exist, token, resetData, user;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                data = ctx.request.body;
                emailValid = (0, _validate.validateEmail)(data.email);

                if (!emailValid || !data.email) {
                  ctx["throw"](422, 'Email format is invalid');
                }

                _context6.next = 5;
                return _User["default"].exists({
                  email: data.email
                });

              case 5:
                exist = _context6.sent;

                // If the email does not exist, we send a generic message. No further action is taken.
                if (!exist) {
                  ctx["throw"](200, {
                    message: 'If an account is found, you will receive an email with reset password instructions.'
                  });
                }

                _context6.prev = 7;
                token = _jsonwebtoken["default"].sign({}, passwordResetSecrete, {
                  expiresIn: '30m'
                });
                resetData = {
                  passwordResetToken: token
                };
                _context6.next = 12;
                return _User["default"].findOneAndUpdate({
                  email: data.email
                }, resetData, {
                  returnOriginal: false
                });

              case 12:
                user = _context6.sent;

                if (!user) {
                  ctx["throw"](422, 'Email not found.');
                }

                _context6.next = 16;
                return (0, _utils.sendForgotPassword)(user.email, token);

              case 16:
                ctx.body = {
                  status: 200,
                  message: "Email sent to ".concat(user.email)
                };
                _context6.next = 23;
                break;

              case 19:
                _context6.prev = 19;
                _context6.t0 = _context6["catch"](7);

                if (_context6.t0.code === 401) {
                  ctx["throw"]('Oops! something is not right. We are having issues sending your inquiry');
                }

                ctx["throw"](_context6.t0.code || 422, _context6.t0);

              case 23:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[7, 19]]);
      }));

      function forgot(_x7) {
        return _forgot.apply(this, arguments);
      }

      return forgot;
    }()
  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(ctx) {
        var _ctx$request$body3, passwordResetToken, password, passwordValid;

        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _ctx$request$body3 = ctx.request.body, passwordResetToken = _ctx$request$body3.passwordResetToken, password = _ctx$request$body3.password;
                passwordValid = (0, _validate.validatePassword)(password);

                if (!passwordValid) {
                  ctx["throw"](422, 'Password minimum length 8, must have 1 capital letter, 1 number and 1 special character.');
                }

                _context8.next = 5;
                return _jsonwebtoken["default"].verify(passwordResetToken, passwordResetSecrete, /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(err) {
                    var user, res;
                    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            if (err) {
                              ctx["throw"](401, 'Expired or invalid link! Please try to resetting your password again');
                            }

                            _context7.prev = 1;
                            _context7.next = 4;
                            return _User["default"].findOne({
                              passwordResetToken: passwordResetToken
                            });

                          case 4:
                            user = _context7.sent;

                            if (!user) {
                              ctx["throw"](422, 'Password reset token is invalid or has expired.');
                            }

                            user.password = password;
                            user.passwordResetToken = undefined;
                            _context7.next = 10;
                            return user.save();

                          case 10:
                            res = _context7.sent;

                            if (res) {
                              ctx.body = {
                                status: 200,
                                message: 'Password was updated successfully.'
                              };
                            }

                            _context7.next = 17;
                            break;

                          case 14:
                            _context7.prev = 14;
                            _context7.t0 = _context7["catch"](1);
                            ctx["throw"](422, _context7.t0);

                          case 17:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7, null, [[1, 14]]);
                  }));

                  return function (_x9) {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function resetPassword(_x8) {
        return _resetPassword.apply(this, arguments);
      }

      return resetPassword;
    }()
  }, {
    key: "updatePassword",
    value: function () {
      var _updatePassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(ctx) {
        var _ctx$request$body4, _id, password, user, res;

        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _ctx$request$body4 = ctx.request.body, _id = _ctx$request$body4._id, password = _ctx$request$body4.password;
                _context9.prev = 1;
                _context9.next = 4;
                return _User["default"].findOne({
                  _id: _id
                });

              case 4:
                user = _context9.sent;

                if (!user) {
                  _context9.next = 12;
                  break;
                }

                user.password = password;
                _context9.next = 9;
                return user.save();

              case 9:
                res = _context9.sent;

                if (!res) {
                  ctx["throw"](422, 'Oops something went wrong, please try again.');
                }

                ctx.body = {
                  status: 200,
                  message: 'Password was updated.'
                };

              case 12:
                _context9.next = 17;
                break;

              case 14:
                _context9.prev = 14;
                _context9.t0 = _context9["catch"](1);
                ctx["throw"](422, (0, _mongoErrors["default"])(_context9.t0));

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[1, 14]]);
      }));

      function updatePassword(_x10) {
        return _updatePassword.apply(this, arguments);
      }

      return updatePassword;
    }()
  }, {
    key: "getProfile",
    value: function () {
      var _getProfile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(ctx) {
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return _User["default"].findOne({
                  _id: ctx.params.id
                }).select('name email about website role location gender avatar createdAt');

              case 3:
                return _context10.abrupt("return", ctx.body = _context10.sent);

              case 6:
                _context10.prev = 6;
                _context10.t0 = _context10["catch"](0);
                ctx["throw"](422, _context10.t0);

              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 6]]);
      }));

      function getProfile(_x11) {
        return _getProfile.apply(this, arguments);
      }

      return getProfile;
    }()
  }, {
    key: "updateAccount",
    value: function () {
      var _updateAccount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(ctx) {
        var data, user;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                data = ctx.request.body;
                _context11.prev = 1;
                _context11.next = 4;
                return _User["default"].findOneAndUpdate({
                  _id: ctx.params.id
                }, data, {
                  "new": true,
                  runValidators: true,
                  context: 'query'
                });

              case 4:
                user = _context11.sent;

                if (!user) {
                  ctx["throw"](404, 'User not found');
                }

                ctx.body = user.toAuthJSON();
                _context11.next = 12;
                break;

              case 9:
                _context11.prev = 9;
                _context11.t0 = _context11["catch"](1);
                ctx["throw"](422, _context11.t0);

              case 12:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[1, 9]]);
      }));

      function updateAccount(_x12) {
        return _updateAccount.apply(this, arguments);
      }

      return updateAccount;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(ctx) {
        var userId, _deleteUser2;

        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                userId = ctx.request.body._id;
                _context12.next = 4;
                return _User["default"].deleteOne({
                  _id: userId
                });

              case 4:
                _deleteUser2 = _context12.sent;

                if (!_deleteUser2) {
                  ctx["throw"](422, 'Oops something went wrong, please try again.');
                }

                ctx.cookies.set('token', null);
                ctx.cookies.set('refreshToken', null);
                ctx.state.user = null;
                ctx.body = {
                  status: 200,
                  message: 'Success!'
                };
                _context12.next = 15;
                break;

              case 12:
                _context12.prev = 12;
                _context12.t0 = _context12["catch"](0);
                ctx["throw"](422, _context12.t0);

              case 15:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[0, 12]]);
      }));

      function deleteUser(_x13) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }() // ADMIN USER CONTROLLER

  }, {
    key: "adminGetUsers",
    value: function () {
      var _adminGetUsers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(ctx) {
        var perPage, page, users, totalItems;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                perPage = 2;
                page = ctx.params.page || 1;
                _context13.prev = 2;
                _context13.next = 5;
                return _User["default"].find({}).select('name gender website location createdAt avatar role').skip(perPage * page - perPage).limit(perPage);

              case 5:
                users = _context13.sent;
                _context13.next = 8;
                return _User["default"].countDocuments({});

              case 8:
                totalItems = _context13.sent;
                return _context13.abrupt("return", ctx.body = {
                  totalItems: totalItems,
                  perPage: perPage,
                  users: users
                });

              case 12:
                _context13.prev = 12;
                _context13.t0 = _context13["catch"](2);
                ctx["throw"](422, _context13.t0);

              case 15:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[2, 12]]);
      }));

      function adminGetUsers(_x14) {
        return _adminGetUsers.apply(this, arguments);
      }

      return adminGetUsers;
    }()
  }, {
    key: "adminGetUser",
    value: function () {
      var _adminGetUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(ctx) {
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                console.log(ctx.params.id);
                _context14.prev = 1;
                _context14.next = 4;
                return _User["default"].findById({
                  _id: ctx.params.id
                }).select({
                  profile: 1,
                  role: 1,
                  avatar: 1,
                  createdAt: 1,
                  about: 1,
                  name: 1
                });

              case 4:
                return _context14.abrupt("return", ctx.body = _context14.sent);

              case 7:
                _context14.prev = 7;
                _context14.t0 = _context14["catch"](1);
                ctx["throw"](_context14.t0);

              case 10:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[1, 7]]);
      }));

      function adminGetUser(_x15) {
        return _adminGetUser.apply(this, arguments);
      }

      return adminGetUser;
    }()
  }, {
    key: "getStats",
    value: function () {
      var _getStats = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(ctx) {
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                _context15.next = 3;
                return _User["default"].countDocuments({});

              case 3:
                return _context15.abrupt("return", ctx.body = _context15.sent);

              case 6:
                _context15.prev = 6;
                _context15.t0 = _context15["catch"](0);
                ctx["throw"](422, _context15.t0);

              case 9:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[0, 6]]);
      }));

      function getStats(_x16) {
        return _getStats.apply(this, arguments);
      }

      return getStats;
    }() // public user

  }, {
    key: "publicProfile",
    value: function () {
      var _publicProfile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(ctx) {
        var user, blogs;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;
                _context16.next = 3;
                return _User["default"].findOne({
                  _id: ctx.params.id
                }).select('_id name email avatar createdAt');

              case 3:
                user = _context16.sent;
                _context16.next = 6;
                return Blog.find({
                  postedBy: user._id
                }).populate('categories', 'name slug').populate('tags', 'name slug').populate('postedBy', 'id name').select('title slug excerpt categories avatar tags postedBy createdAt');

              case 6:
                blogs = _context16.sent;
                return _context16.abrupt("return", ctx.body = {
                  user: user,
                  blogs: blogs
                });

              case 10:
                _context16.prev = 10;
                _context16.t0 = _context16["catch"](0);
                ctx["throw"](422, _context16.t0);

              case 13:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, null, [[0, 10]]);
      }));

      function publicProfile(_x17) {
        return _publicProfile.apply(this, arguments);
      }

      return publicProfile;
    }()
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;