"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newAppointment = newAppointment;
exports.accountActivationEmail = accountActivationEmail;
exports.sendForgotPassword = sendForgotPassword;
exports.sendNewUserEmail = sendNewUserEmail;
exports.sendSupportEmail = sendSupportEmail;
exports.sendAuthorEmail = sendAuthorEmail;
exports.gravatar = gravatar;
exports.parseJsonToObject = parseJsonToObject;
exports.generateID = generateID;

var _crypto = _interopRequireDefault(require("crypto"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_mail["default"].setApiKey(process.env.SENDGRID_API_KEY); //sendgrid templates


var bookingTemplate = process.env.SENDGRID_BOOKING;
var supportTemplate = process.env.SENDGRID_SUPPORT; //sendgrid

var appEmail = process.env.APP_EMAIL;
var appSecondEmail = process.env.APP_SECOND_EMAIL;
var appThirdEmail = process.env.APP_THIRD_EMAIL;
var appUrl = process.env.REQUEST_HOST;
var appName = process.env.APP_NAME;

function newAppointment(_x) {
  return _newAppointment.apply(this, arguments);
}

function _newAppointment() {
  _newAppointment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var payload;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = {
              from: appEmail,
              to: [appEmail, appSecondEmail, appThirdEmail],
              subject: "Booking Request @ ".concat(appName),
              template_id: bookingTemplate,
              dynamic_template_data: {
                name: data.name,
                email: data.email,
                address: data.address,
                phone: data.phone,
                additionalInfo: data.additionalInfo,
                bookingDay: data.bookingDay,
                time: data.time
              }
            };
            _context.next = 3;
            return _mail["default"].send(payload);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _newAppointment.apply(this, arguments);
}

function accountActivationEmail(_x2, _x3) {
  return _accountActivationEmail.apply(this, arguments);
}

function _accountActivationEmail() {
  _accountActivationEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email, token) {
    var link, payload;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            link = "".concat(appUrl, "/user/activation/").concat(token);
            payload = {
              to: email,
              from: appEmail,
              subject: 'Account Activation',
              html: "\n            <strong>Welcome to  ".concat(appName, ".<br/><br/> Please click on the button below to activate your account. If you did not request this, please ignore this email.<br/><br/></strong>\n            <a href=\"").concat(link, "\">ACCOUNT ACTIVATION LINK</a>\n          ")
            };
            _context2.next = 4;
            return _mail["default"].send(payload);

          case 4:
            return _context2.abrupt("return", _context2.sent);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _accountActivationEmail.apply(this, arguments);
}

function sendForgotPassword(_x4, _x5) {
  return _sendForgotPassword.apply(this, arguments);
}

function _sendForgotPassword() {
  _sendForgotPassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(email, token) {
    var link, payload;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            link = "".concat(appUrl, "/user/reset/").concat(token);
            payload = {
              to: email,
              from: appEmail,
              // Change to your verified sender
              subject: 'Password reset link',
              html: "\n            <strong>You are receiving this email because you (or someone else) have requested the reset of the password for your account @".concat(appName, ".<br/><br/> Please click on the button below to complete the process. If you did not request this, please ignore this email and your password will remain unchanged.<br/><br/></strong>\n            <a href=\"").concat(link, "\">PASSWORD RESET LINK</a>\n          ")
            };
            _context3.next = 4;
            return _mail["default"].send(payload);

          case 4:
            return _context3.abrupt("return", _context3.sent);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _sendForgotPassword.apply(this, arguments);
}

function sendNewUserEmail(_x6, _x7) {
  return _sendNewUserEmail.apply(this, arguments);
}

function _sendNewUserEmail() {
  _sendNewUserEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(name, email) {
    var msg;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            msg = {
              to: appEmail,
              from: appEmail,
              // Change to your verified sender
              subject: "New user created @".concat(appName),
              html: "\n            <strong>New user was created @".concat(appName, "<br/></strong><br/>\n            <p>").concat(name, "</p>    \n            <p>").concat(email, "</p>    \n          ")
            };
            _context4.next = 3;
            return _mail["default"].send(msg);

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _sendNewUserEmail.apply(this, arguments);
}

function sendSupportEmail(_x8) {
  return _sendSupportEmail.apply(this, arguments);
}

function _sendSupportEmail() {
  _sendSupportEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(data) {
    var name, email, message, phone, payload;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            name = data.name, email = data.email, message = data.message, phone = data.phone;
            payload = {
              to: [appEmail],
              from: appEmail,
              subject: "Support from ".concat(appName),
              template_id: supportTemplate,
              dynamic_template_data: {
                name: name,
                email: email,
                phone: phone,
                message: message,
                appUrl: appUrl,
                appName: appName
              }
            };
            _context5.next = 4;
            return _mail["default"].send(payload);

          case 4:
            return _context5.abrupt("return", _context5.sent);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _sendSupportEmail.apply(this, arguments);
}

function sendAuthorEmail(_x9) {
  return _sendAuthorEmail.apply(this, arguments);
}

function _sendAuthorEmail() {
  _sendAuthorEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(data) {
    var name, email, message, authorEmail, emailList, payload;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            name = data.name, email = data.email, message = data.message, authorEmail = data.authorEmail;
            emailList = [authorEmail];
            payload = {
              to: emailList,
              from: email,
              subject: "Someone message you from ".concat(appName),
              text: "Message received from:  \n Name: ".concat(name, " \n Email: ").concat(email, " \n Message: ").concat(message),
              template_id: 'd-db32c2ca9cf94a47ac47f403a7778db2',
              dynamic_template_data: {
                name: name,
                email: email,
                message: message,
                appUrl: appUrl,
                appName: appName
              }
            };
            _context6.next = 5;
            return _mail["default"].send(payload);

          case 5:
            return _context6.abrupt("return", _context6.sent);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _sendAuthorEmail.apply(this, arguments);
}

function gravatar(email) {
  var size = 200;
  if (!email) return "https://gravatar.com/avatar/?s=".concat(size, "&d-mp");

  var md5 = _crypto["default"].createHash('md5').update(email).digest('hex');

  return "https://gravatar.com/avatar/".concat(md5, "?S=").concat(size, "&d=mp");
}

function parseJsonToObject(str) {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (error) {
    return {};
  }
}

function generateID(strLength) {
  // Create a string of random alphanumeric characters, of a given length
  strLength = typeof strLength === 'number' && strLength > 0 ? strLength : false;

  if (strLength) {
    // Define all the possible characters that could go into a string
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Start the final string

    var str = '';

    for (var i = 1; i <= strLength; i++) {
      // Get a random characters from the possibleCharacters string
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length)); // Append this character to the string

      str += randomCharacter;
    } // Return the final string


    return str;
  } else {
    return false;
  }
}