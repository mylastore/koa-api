"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accountActivationEmail = accountActivationEmail;
exports.gravatar = gravatar;
exports.parseJsonToObject = parseJsonToObject;
exports.sendAuthorEmail = sendAuthorEmail;
exports.sendForgotPassword = sendForgotPassword;
exports.sendNewUserEmail = sendNewUserEmail;
exports.sendSupportEmail = sendSupportEmail;
exports.signJWT = signJWT;
exports.verifyJWT = verifyJWT;

var _crypto = _interopRequireDefault(require("crypto"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isDev = process.env.NODE_ENV === 'development'; // crate your private & public keys

var privateKEY = isDev ? _fs["default"].readFileSync(process.env.LOCAL_JWT_KEY_PRIVATE, 'utf8') : _fs["default"].readFileSync(process.env.JWT_KEY_PRIVATE, 'utf8');
var publicKEY = isDev ? _fs["default"].readFileSync(process.env.LOCAL_JWT_KEY_PUBLIC, 'utf8') : _fs["default"].readFileSync(process.env.JWT_KEY_PUBLIC, 'utf8'); // sign jwt

function signJWT(payload, expiresIn) {
  return _jsonwebtoken["default"].sign(payload, privateKEY, {
    algorithm: 'RS256',
    expiresIn: expiresIn
  });
} // verify jwt


function verifyJWT(token) {
  try {
    var decoded = _jsonwebtoken["default"].verify(token, publicKEY);

    return {
      payload: decoded,
      expired: false
    };
  } catch (error) {
    return {
      payload: null,
      expired: error.message.includes('jwt expired')
    };
  }
}

_mail["default"].setApiKey(process.env.SENDGRID_API_KEY);

var requestHost = process.env.NODE_ENV === 'development' ? process.env.DEV_HOST : process.env.PRODUCTION_HOST; //sendgrid templates

var supportTemplate = process.env.SENDGRID_SUPPORT; //sendgrid

var appEmail = process.env.APP_EMAIL;
var appName = process.env.APP_NAME;

function accountActivationEmail(_x, _x2) {
  return _accountActivationEmail.apply(this, arguments);
}

function _accountActivationEmail() {
  _accountActivationEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(email, token) {
    var link, payload;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            link = "".concat(requestHost, "/user/activation/").concat(token);
            payload = {
              to: email,
              from: appEmail,
              subject: 'Account Activation',
              html: "\n            <strong>Welcome to  ".concat(appName, ".<br/><br/> Please click on the button below to activate your account. If you did not request this, please ignore this email.<br/><br/></strong>\n            <a href=\"").concat(link, "\">ACCOUNT ACTIVATION LINK</a>\n          ")
            };
            _context.prev = 2;
            _context.next = 5;
            return _mail["default"].send(payload);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", _context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));
  return _accountActivationEmail.apply(this, arguments);
}

function sendForgotPassword(_x3, _x4) {
  return _sendForgotPassword.apply(this, arguments);
}

function _sendForgotPassword() {
  _sendForgotPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(email, token) {
    var link, payload;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            link = "".concat(requestHost, "/user/reset/").concat(token);
            payload = {
              to: email,
              from: appEmail,
              // Change to your verified sender
              subject: 'Password reset link',
              html: "\n            <strong>You are receiving this email because you (or someone else) have requested the reset of the password for your account @".concat(appName, ".<br/><br/> Please click on the button below to complete the process. If you did not request this, please ignore this email and your password will remain unchanged.<br/><br/></strong>\n            <a href=\"").concat(link, "\">PASSWORD RESET LINK</a>\n          ")
            };
            _context2.prev = 2;
            _context2.next = 5;
            return _mail["default"].send(payload);

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", _context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));
  return _sendForgotPassword.apply(this, arguments);
}

function sendNewUserEmail(_x5, _x6) {
  return _sendNewUserEmail.apply(this, arguments);
}

function _sendNewUserEmail() {
  _sendNewUserEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(name, email) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            msg = {
              to: appEmail,
              from: appEmail,
              // Change to your verified sender
              subject: "New user created @".concat(appName),
              html: "\n            <strong>New user was created @".concat(appName, "<br/></strong><br/>\n            <p>").concat(name, "</p>    \n            <p>").concat(email, "</p>    \n          ")
            };
            _context3.prev = 1;
            _context3.next = 4;
            return _mail["default"].send(msg);

          case 4:
            return _context3.abrupt("return", _context3.sent);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", _context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 7]]);
  }));
  return _sendNewUserEmail.apply(this, arguments);
}

function sendSupportEmail(_x7) {
  return _sendSupportEmail.apply(this, arguments);
}

function _sendSupportEmail() {
  _sendSupportEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
    var name, email, message, phone, payload;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
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
                appUrl: requestHost,
                appName: appName
              }
            };
            _context4.prev = 2;
            _context4.next = 5;
            return _mail["default"].send(payload);

          case 5:
            return _context4.abrupt("return", _context4.sent);

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](2);
            return _context4.abrupt("return", _context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 8]]);
  }));
  return _sendSupportEmail.apply(this, arguments);
}

function sendAuthorEmail(_x8) {
  return _sendAuthorEmail.apply(this, arguments);
}

function _sendAuthorEmail() {
  _sendAuthorEmail = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data) {
    var name, email, message, authorEmail, emailList, payload;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
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
                appUrl: requestHost,
                appName: appName
              }
            };
            _context5.prev = 3;
            _context5.next = 6;
            return _mail["default"].send(payload);

          case 6:
            return _context5.abrupt("return", _context5.sent);

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](3);
            return _context5.abrupt("return", _context5.t0);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 9]]);
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
    return JSON.parse(str);
  } catch (error) {
    return {};
  }
}