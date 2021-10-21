"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Blog = _interopRequireDefault(require("../models/Blog"));

var _utils = require("../middleware/utils");

var _data2 = _interopRequireDefault(require("../middleware/data"));

var _shortid = _interopRequireDefault(require("shortid"));

var _mongoErrors = _interopRequireDefault(require("../middleware/mongoErrors"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _googleAuthLibrary = require("google-auth-library");

var _validate = require("../middleware/validate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var passwordResetSecrete = process.env.JWT_PASSWORD_SECRET;
var userActivationSecret = process.env.JWT_ACCOUNT_ACTIVATION;
var sessionExpiration = process.env.SESSION_EXPIRES;
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
    value: function () {
      var _accountActivation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var _ctx$request$body, name, email, password, emailValid, passwordValid, nameValid, user, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
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
                return _User["default"].findOne({
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
                _context.next = 15;
                return (0, _utils.accountActivationEmail)(email, token);

              case 15:
                return _context.abrupt("return", ctx.body = {
                  status: 200,
                  message: "An email has been sent to ".concat(email, ". Please validate to activate account.")
                });

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](5);
                ctx["throw"](422, _context.t0);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 18]]);
      }));

      function accountActivation(_x) {
        return _accountActivation.apply(this, arguments);
      }

      return accountActivation;
    }()
  }, {
    key: "register",
    value: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
        var token;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                token = ctx.request.body.token;
                _context4.next = 3;
                return _jsonwebtoken["default"].verify(token, userActivationSecret, /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(err, decoded) {
                    var name, email, password, avatar, username, obj, user, result, settingId, notification;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            if (err) {
                              ctx["throw"](401, {
                                message: 'Link is expired. Please signup again.'
                              });
                            }

                            name = decoded.name, email = decoded.email, password = decoded.password;
                            avatar = (0, _utils.gravatar)(email);
                            username = _shortid["default"].generate();
                            obj = {
                              name: name,
                              email: email,
                              password: password,
                              avatar: avatar,
                              username: username,
                              emailVerificationToken: undefined,
                              emailVerified: true
                            };
                            user = new _User["default"](obj);
                            _context3.prev = 6;
                            _context3.next = 9;
                            return user.save();

                          case 9:
                            result = _context3.sent;
                            settingId = process.env.SETTING_ID;
                            notification = process.env.SEND_MAIL;

                            if (!result) {
                              _context3.next = 16;
                              break;
                            }

                            _context3.next = 15;
                            return _data2["default"].read('settings', settingId, /*#__PURE__*/function () {
                              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, checkData) {
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                  while (1) {
                                    switch (_context2.prev = _context2.next) {
                                      case 0:
                                        if (!(!err && checkData && checkData.newUser === true && notification === 'yes')) {
                                          _context2.next = 3;
                                          break;
                                        }

                                        _context2.next = 3;
                                        return (0, _utils.sendNewUserEmail)(name, email);

                                      case 3:
                                      case "end":
                                        return _context2.stop();
                                    }
                                  }
                                }, _callee2);
                              }));

                              return function (_x5, _x6) {
                                return _ref2.apply(this, arguments);
                              };
                            }());

                          case 15:
                            ctx.body = {
                              status: 200,
                              message: 'Account is now active. Please login.'
                            };

                          case 16:
                            _context3.next = 21;
                            break;

                          case 18:
                            _context3.prev = 18;
                            _context3.t0 = _context3["catch"](6);
                            ctx["throw"](422, _context3.t0);

                          case 21:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, null, [[6, 18]]);
                  }));

                  return function (_x3, _x4) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function register(_x2) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx) {
        var _ctx$request$body2, password, email, passwordValid, emailValid, user, authUser;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _ctx$request$body2 = ctx.request.body, password = _ctx$request$body2.password, email = _ctx$request$body2.email;
                passwordValid = (0, _validate.validatePassword)(password);
                emailValid = (0, _validate.validateEmail)(email);

                if (!passwordValid || !emailValid) {
                  ctx["throw"](422, 'Invalid data received');
                }

                _context5.prev = 4;
                _context5.next = 7;
                return _User["default"].findOne({
                  email: email
                });

              case 7:
                user = _context5.sent;

                if (!user) {
                  ctx["throw"](404, 'User not found.');
                }

                _context5.next = 11;
                return user.comparePassword(password);

              case 11:
                if (_context5.sent) {
                  _context5.next = 13;
                  break;
                }

                ctx["throw"](422, {
                  message: 'Password is invalid'
                });

              case 13:
                authUser = user.toAuthJSON();
                ctx.cookies.set('token', authUser.token, {
                  expiresIn: sessionExpiration,
                  sameSite: 'lax',
                  httpOnly: true
                });
                return _context5.abrupt("return", ctx.body = authUser);

              case 18:
                _context5.prev = 18;
                _context5.t0 = _context5["catch"](4);
                ctx["throw"](422, _context5.t0);

              case 21:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[4, 18]]);
      }));

      function login(_x7) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "googleLogin",
    value: function () {
      var _googleLogin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx) {
        var idToken, googleId, client, res, _res$getPayload, email_verified, name, email, at_hash, user, authUser, avatar, username, password, _user, googleUser, googleAuthUser;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                idToken = ctx.request.body.idToken;
                googleId = process.env.GOOGLE_ID;
                client = new _googleAuthLibrary.OAuth2Client(googleId);
                _context6.prev = 3;
                _context6.next = 6;
                return client.verifyIdToken({
                  idToken: idToken,
                  audience: googleId
                });

              case 6:
                res = _context6.sent;

                if (!res) {
                  ctx["throw"](422, 'Google authentication failed. Try again.');
                }

                _res$getPayload = res.getPayload(), email_verified = _res$getPayload.email_verified, name = _res$getPayload.name, email = _res$getPayload.email, at_hash = _res$getPayload.at_hash;

                if (!email_verified) {
                  ctx["throw"](422, 'You have not verify this google email.');
                }

                _context6.next = 12;
                return _User["default"].findOne({
                  email: email
                });

              case 12:
                user = _context6.sent;

                if (!user) {
                  _context6.next = 22;
                  break;
                }

                _context6.next = 16;
                return user.toAuthJSON();

              case 16:
                authUser = _context6.sent;
                _context6.next = 19;
                return ctx.cookies.set('token', authUser.token, {
                  expiresIn: sessionExpiration,
                  sameSite: 'lax',
                  httpOnly: true
                });

              case 19:
                return _context6.abrupt("return", ctx.body = authUser);

              case 22:
                _context6.next = 24;
                return (0, _utils.gravatar)(email);

              case 24:
                avatar = _context6.sent;
                _context6.next = 27;
                return _shortid["default"].generate();

              case 27:
                username = _context6.sent;
                password = at_hash + process.env.GOOGLE_AUTH_PASSWORD_EXT;
                _user = new _User["default"]({
                  name: name,
                  email: email,
                  username: username,
                  password: password,
                  avatar: avatar
                });
                _context6.next = 32;
                return _user.save();

              case 32:
                googleUser = _context6.sent;
                _context6.next = 35;
                return googleUser.toAuthJSON();

              case 35:
                googleAuthUser = _context6.sent;
                ctx.cookies.set('token', googleAuthUser.token, {
                  expiresIn: sessionExpiration,
                  sameSite: 'lax',
                  httpOnly: true
                });
                ctx.body = googleAuthUser;

              case 38:
                _context6.next = 43;
                break;

              case 40:
                _context6.prev = 40;
                _context6.t0 = _context6["catch"](3);
                ctx["throw"](422, _context6.t0);

              case 43:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[3, 40]]);
      }));

      function googleLogin(_x8) {
        return _googleLogin.apply(this, arguments);
      }

      return googleLogin;
    }()
  }, {
    key: "logOut",
    value: function () {
      var _logOut = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(ctx) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                ctx.state.user = null;
                ctx.cookies.set('token', null);
                ctx.body = {
                  status: 200,
                  message: 'Success!'
                };

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function logOut(_x9) {
        return _logOut.apply(this, arguments);
      }

      return logOut;
    }()
  }, {
    key: "forgot",
    value: function () {
      var _forgot = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(ctx) {
        var data, emailValid, token, resetData, user;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                data = ctx.request.body;
                emailValid = (0, _validate.validateEmail)(data.email);

                if (!emailValid || !data.email) {
                  ctx["throw"](422, 'Email format is invalid');
                }

                _context8.prev = 3;
                token = _jsonwebtoken["default"].sign({}, passwordResetSecrete, {
                  expiresIn: '30m'
                });
                resetData = {
                  passwordResetToken: token
                };
                _context8.next = 8;
                return _User["default"].findOneAndUpdate({
                  email: data.email
                }, resetData, {
                  returnOriginal: false
                });

              case 8:
                user = _context8.sent;

                if (!user) {
                  ctx["throw"](422, 'Email not found.');
                }

                _context8.next = 12;
                return (0, _utils.sendForgotPassword)(user.email, token);

              case 12:
                ctx.body = {
                  status: 200,
                  message: "Email sent to ".concat(user.email)
                };
                _context8.next = 19;
                break;

              case 15:
                _context8.prev = 15;
                _context8.t0 = _context8["catch"](3);

                if (_context8.t0.code === 401) {
                  ctx["throw"]('Oops! something is not right. We are having issues sending your inquiry');
                }

                ctx["throw"](_context8.t0.code || 422, _context8.t0);

              case 19:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[3, 15]]);
      }));

      function forgot(_x10) {
        return _forgot.apply(this, arguments);
      }

      return forgot;
    }()
  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(ctx) {
        var _ctx$request$body3, passwordResetToken, password, passwordValid;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _ctx$request$body3 = ctx.request.body, passwordResetToken = _ctx$request$body3.passwordResetToken, password = _ctx$request$body3.password;
                passwordValid = (0, _validate.validatePassword)(password);

                if (!passwordValid) {
                  ctx["throw"](422, 'Password minimum length 8, must have 1 capital letter, 1 number and 1 special character.');
                }

                _context10.next = 5;
                return _jsonwebtoken["default"].verify(passwordResetToken, passwordResetSecrete, /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(err, decoded) {
                    var user, res;
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            if (err) {
                              ctx["throw"](401, 'Expired or invalid link! Please try to resetting your password again');
                            }

                            _context9.prev = 1;
                            _context9.next = 4;
                            return _User["default"].findOne({
                              passwordResetToken: passwordResetToken
                            });

                          case 4:
                            user = _context9.sent;

                            if (!user) {
                              ctx["throw"](422, 'Password reset token is invalid or has expired.');
                            }

                            user.password = password;
                            user.passwordResetToken = undefined;
                            _context9.next = 10;
                            return user.save();

                          case 10:
                            res = _context9.sent;

                            if (res) {
                              ctx.body = {
                                status: 200,
                                message: 'Password was updated successfully.'
                              };
                            }

                            _context9.next = 17;
                            break;

                          case 14:
                            _context9.prev = 14;
                            _context9.t0 = _context9["catch"](1);
                            ctx["throw"](422, _context9.t0);

                          case 17:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9, null, [[1, 14]]);
                  }));

                  return function (_x12, _x13) {
                    return _ref3.apply(this, arguments);
                  };
                }());

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function resetPassword(_x11) {
        return _resetPassword.apply(this, arguments);
      }

      return resetPassword;
    }()
  }, {
    key: "updatePassword",
    value: function () {
      var _updatePassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(ctx) {
        var _ctx$request$body4, _id, password, user, res;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _ctx$request$body4 = ctx.request.body, _id = _ctx$request$body4._id, password = _ctx$request$body4.password;
                _context11.prev = 1;
                _context11.next = 4;
                return _User["default"].findOne({
                  _id: _id
                });

              case 4:
                user = _context11.sent;

                if (!user) {
                  _context11.next = 12;
                  break;
                }

                user.password = password;
                _context11.next = 9;
                return user.save();

              case 9:
                res = _context11.sent;

                if (!res) {
                  ctx["throw"](422, 'Oops something went wrong, please try again.');
                }

                ctx.body = {
                  status: 200,
                  message: 'Password was updated.'
                };

              case 12:
                _context11.next = 17;
                break;

              case 14:
                _context11.prev = 14;
                _context11.t0 = _context11["catch"](1);
                ctx["throw"](422, (0, _mongoErrors["default"])(_context11.t0));

              case 17:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[1, 14]]);
      }));

      function updatePassword(_x14) {
        return _updatePassword.apply(this, arguments);
      }

      return updatePassword;
    }() // if user is authorize sends the user data

  }, {
    key: "account",
    value: function () {
      var _account = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(ctx) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                ctx.body = ctx.state.user;

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function account(_x15) {
        return _account.apply(this, arguments);
      }

      return account;
    }()
  }, {
    key: "getProfile",
    value: function () {
      var _getProfile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(ctx) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                _context13.next = 3;
                return _User["default"].findOne({
                  username: ctx.params.username
                }).select('username name email about website role location gender avatar createdAt');

              case 3:
                return _context13.abrupt("return", ctx.body = _context13.sent);

              case 6:
                _context13.prev = 6;
                _context13.t0 = _context13["catch"](0);
                ctx["throw"](422, _context13.t0);

              case 9:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[0, 6]]);
      }));

      function getProfile(_x16) {
        return _getProfile.apply(this, arguments);
      }

      return getProfile;
    }()
  }, {
    key: "updateUserName",
    value: function () {
      var _updateUserName = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(ctx) {
        var username, exits, user;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                username = ctx.params.username;
                _context14.next = 3;
                return _User["default"].exists({
                  username: username
                });

              case 3:
                exits = _context14.sent;
                if (!exits) ctx["throw"](404, 'User not found');
                _context14.prev = 5;
                _context14.next = 8;
                return _User["default"].findOneAndUpdate({
                  username: username
                }, username, {
                  "new": true,
                  runValidators: true,
                  context: 'query'
                });

              case 8:
                user = _context14.sent;
                ctx.body = user.toAuthJSON();
                _context14.next = 15;
                break;

              case 12:
                _context14.prev = 12;
                _context14.t0 = _context14["catch"](5);
                ctx["throw"](422, _context14.t0);

              case 15:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[5, 12]]);
      }));

      function updateUserName(_x17) {
        return _updateUserName.apply(this, arguments);
      }

      return updateUserName;
    }()
  }, {
    key: "updateAccount",
    value: function () {
      var _updateAccount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(ctx) {
        var body, exist, user;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                body = ctx.request.body;

                if (body.username) {
                  body.username.replace(/\s/g, '');
                }

                _context15.prev = 2;
                _context15.next = 5;
                return _User["default"].exists({
                  username: body.username
                });

              case 5:
                exist = _context15.sent;

                if (exist) {
                  ctx["throw"](422, 'Username already exist, please choose another');
                }

                _context15.next = 9;
                return _User["default"].findOneAndUpdate({
                  username: ctx.params.username
                }, body, {
                  "new": true,
                  runValidators: true,
                  context: 'query'
                });

              case 9:
                user = _context15.sent;

                if (!user) {
                  ctx["throw"](404, 'User not found');
                }

                ctx.body = user.toAuthJSON();
                _context15.next = 17;
                break;

              case 14:
                _context15.prev = 14;
                _context15.t0 = _context15["catch"](2);
                ctx["throw"](422, _context15.t0);

              case 17:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[2, 14]]);
      }));

      function updateAccount(_x18) {
        return _updateAccount.apply(this, arguments);
      }

      return updateAccount;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(ctx) {
        var userId, countBlogs, _deleteUser2;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;
                userId = ctx.request.body._id;
                _context16.next = 4;
                return _Blog["default"].countDocuments({
                  postedBy: userId
                });

              case 4:
                countBlogs = _context16.sent;

                if (!(countBlogs > 0)) {
                  _context16.next = 9;
                  break;
                }

                return _context16.abrupt("return", ctx.body = {
                  status: 422,
                  message: 'Before deleting your account you must delete all yours blogs.'
                });

              case 9:
                _context16.next = 11;
                return _User["default"].deleteOne({
                  _id: userId
                });

              case 11:
                _deleteUser2 = _context16.sent;

                if (!_deleteUser2) {
                  ctx["throw"](422, 'Oops something went wrong, please try again.');
                }

                ctx.state.user = null;
                ctx.cookies.set('token', null);
                ctx.body = {
                  status: 200,
                  message: 'Success!'
                };

              case 16:
                _context16.next = 21;
                break;

              case 18:
                _context16.prev = 18;
                _context16.t0 = _context16["catch"](0);
                ctx["throw"](422, _context16.t0);

              case 21:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, null, [[0, 18]]);
      }));

      function deleteUser(_x19) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }() // ADMIN USER CONTROLLER

  }, {
    key: "adminGetUsers",
    value: function () {
      var _adminGetUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(ctx) {
        var perPage, page, users, totalItems;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                perPage = 2;
                page = ctx.params.page || 1;
                _context17.prev = 2;
                _context17.next = 5;
                return _User["default"].find({}).select('-password').skip(perPage * page - perPage).limit(perPage);

              case 5:
                users = _context17.sent;
                _context17.next = 8;
                return _User["default"].countDocuments({});

              case 8:
                totalItems = _context17.sent;
                return _context17.abrupt("return", ctx.body = {
                  totalItems: totalItems,
                  perPage: perPage,
                  users: users
                });

              case 12:
                _context17.prev = 12;
                _context17.t0 = _context17["catch"](2);
                ctx["throw"](422, _context17.t0);

              case 15:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, null, [[2, 12]]);
      }));

      function adminGetUsers(_x20) {
        return _adminGetUsers.apply(this, arguments);
      }

      return adminGetUsers;
    }()
  }, {
    key: "adminGetUser",
    value: function () {
      var _adminGetUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(ctx) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                _context18.next = 3;
                return _User["default"].findById({
                  _id: ctx.params.id
                }).select({
                  settings: 1,
                  profile: 1,
                  email: 1,
                  role: 1,
                  avatar: 1,
                  createdAt: 1,
                  username: 1,
                  about: 1,
                  name: 1
                });

              case 3:
                return _context18.abrupt("return", ctx.body = _context18.sent);

              case 6:
                _context18.prev = 6;
                _context18.t0 = _context18["catch"](0);
                ctx["throw"](_context18.t0);

              case 9:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, null, [[0, 6]]);
      }));

      function adminGetUser(_x21) {
        return _adminGetUser.apply(this, arguments);
      }

      return adminGetUser;
    }()
  }, {
    key: "getStats",
    value: function () {
      var _getStats = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(ctx) {
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.prev = 0;
                _context19.next = 3;
                return _User["default"].countDocuments({});

              case 3:
                return _context19.abrupt("return", ctx.body = _context19.sent);

              case 6:
                _context19.prev = 6;
                _context19.t0 = _context19["catch"](0);
                ctx["throw"](422, _context19.t0);

              case 9:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, null, [[0, 6]]);
      }));

      function getStats(_x22) {
        return _getStats.apply(this, arguments);
      }

      return getStats;
    }()
  }, {
    key: "getAdminSettings",
    value: function () {
      var _getAdminSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(ctx) {
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.prev = 0;
                _context20.next = 3;
                return _User["default"].findOne({
                  username: ctx.params.username,
                  role: 'admin'
                }).select('settings');

              case 3:
                return _context20.abrupt("return", ctx.body = _context20.sent);

              case 6:
                _context20.prev = 6;
                _context20.t0 = _context20["catch"](0);
                ctx["throw"](422, _context20.t0);

              case 9:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, null, [[0, 6]]);
      }));

      function getAdminSettings(_x23) {
        return _getAdminSettings.apply(this, arguments);
      }

      return getAdminSettings;
    }()
  }, {
    key: "updateSettings",
    value: function () {
      var _updateSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(ctx) {
        var body, obj;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.prev = 0;
                body = ctx.request.body;
                if (!body) ctx["throw"](422, 'Invalid data!');
                obj = {
                  settings: {
                    newUser: body.newUser
                  }
                };
                _context21.next = 6;
                return _User["default"].findByIdAndUpdate({
                  _id: body.userId
                }, obj, {
                  "new": true
                }).select({
                  settings: 1
                });

              case 6:
                ctx.body = _context21.sent;
                _context21.next = 12;
                break;

              case 9:
                _context21.prev = 9;
                _context21.t0 = _context21["catch"](0);
                ctx["throw"](_context21.t0);

              case 12:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, null, [[0, 9]]);
      }));

      function updateSettings(_x24) {
        return _updateSettings.apply(this, arguments);
      }

      return updateSettings;
    }() // public user

  }, {
    key: "publicProfile",
    value: function () {
      var _publicProfile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(ctx) {
        var user, blogs;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.prev = 0;
                _context22.next = 3;
                return _User["default"].findOne({
                  username: ctx.params.username
                }).select('_id username name email avatar crfeatedAt');

              case 3:
                user = _context22.sent;
                _context22.next = 6;
                return _Blog["default"].find({
                  postedBy: user._id
                }).populate('categories', 'name slug').populate('tags', 'name slug').populate('postedBy', 'id name').select('title slug excerpt categories avatar tags postedBy createdAt');

              case 6:
                blogs = _context22.sent;
                return _context22.abrupt("return", ctx.body = {
                  user: user,
                  blogs: blogs
                });

              case 10:
                _context22.prev = 10;
                _context22.t0 = _context22["catch"](0);
                ctx["throw"](422, _context22.t0);

              case 13:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, null, [[0, 10]]);
      }));

      function publicProfile(_x25) {
        return _publicProfile.apply(this, arguments);
      }

      return publicProfile;
    }()
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;