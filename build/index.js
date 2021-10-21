'use strict'; // @ts-check

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _cors = _interopRequireDefault(require("@koa/cors"));

var _logs = require("./logs/logs");

var _koaUseragent = _interopRequireDefault(require("koa-useragent"));

var _koaRatelimit = _interopRequireDefault(require("koa-ratelimit"));

var _ioredis = _interopRequireDefault(require("ioredis"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _koaHelmet = _interopRequireDefault(require("koa-helmet"));

var _koaJsonError = _interopRequireDefault(require("koa-json-error"));

var _user = _interopRequireDefault(require("./routes/user"));

var _support = _interopRequireDefault(require("./routes/support"));

var _category = _interopRequireDefault(require("./routes/category"));

var _tag = _interopRequireDefault(require("./routes/tag"));

var _blog = _interopRequireDefault(require("./routes/blog"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _instagram = _interopRequireDefault(require("./routes/instagram"));

var _booking = _interopRequireDefault(require("./routes/booking"));

var _galleries = _interopRequireDefault(require("./routes/galleries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var development = process.env.NODE_ENV === 'development';
var allowSites = development ? process.env.DEV_HOST : process.env.PRODUCTION_HOST;
var mongoDB = development ? process.env.DB_LOCAL : process.env.DB_URI;
/**
 * Connection to mongo db
 * @param {object} options
 * @param {string} options.url - database url
 * @param {object} options
 * @param {Boolean} options.true - useCreateIndex true
 * @return {Promise<string>} Console log database connection
 */

_mongoose["default"].connect(mongoDB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(function () {
  return console.log('DB: ', mongoDB);
})["catch"](function (err) {
  return console.log(err);
}); //Initialize app


var app = new _koa["default"]();

require('koa-qs')(app, 'extended');

app.use((0, _koaHelmet["default"])()); // Here's the rate limiter
// app.use(
//     ratelimit({
//         db: new redis(),
//         duration: 60000,
//         errorMessage:
//             "Hmm, you seem to be doing that a bit too much - wouldn't you say?",
//         id: ctx => ctx.ip,
//         headers: {
//             remaining: 'Rate-Limit-Remaining',
//             reset: 'Rate-Limit-Reset',
//             total: 'Rate-Limit-Total',
//         },
//         max: 100,
//     })
// )
// Log successful interactions

app.use( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _logs.logger.info(ctx.method + ' ' + ctx.url + ' RESPONSE: ' + ctx.response.status);

            _context.next = 8;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Apply error json handling and log

var errorOptions = {
  postFormat: function postFormat(e, obj) {
    // log errors
    _logs.logger.info(obj);

    if (process.env.NODE_ENV !== 'production') {
      return obj;
    }

    delete obj.stack;
    delete obj.name;
    return obj;
  }
};
app.use((0, _koaJsonError["default"])(errorOptions)); // return response time in X-Response-Time header

app.use( /*#__PURE__*/function () {
  var _responseTime = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
    var t1, t2;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            t1 = Date.now();
            _context2.next = 3;
            return next();

          case 3:
            t2 = Date.now();
            ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms');

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  function responseTime(_x3, _x4) {
    return _responseTime.apply(this, arguments);
  }

  return responseTime;
}()); //For cors with options

app.use((0, _cors["default"])({
  origins: [allowSites]
})); // For useragent(browser) detection

app.use(_koaUseragent["default"]);
app.use( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, next) {
    var res;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res = require('util').inspect(ctx.userAgent.source);
            console.log(res);
            _context3.next = 4;
            return next();

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
app.use((0, _koaBody["default"])({
  formLimit: '1mb',
  multipart: true,
  // Allow multiple files to be uploaded
  formidable: {
    maxFileSize: 200 * 1024 * 1024,
    //200mg size limit
    keepExtensions: true,
    //  Extensions to save images
    onFileBegin: function onFileBegin(name, file) {
      var fileName = file.name;
      var picReg = /\.(png|jpeg?g|svg|webp|jpg)$/i;

      if (!picReg.test(fileName)) {
        new Error('File not supported');
      }
    },
    onEnd: function onEnd(name, file) {
      console.log('name? ', name);
      console.log('size.size ? ', file.size);
    }
  },
  onError: function onError(err) {
    if (err) {
      throw err;
    }

    new Error('Oops! something went wrong. Try again.');
  }
})); // Static Middleware

app.use((0, _koaStatic["default"])('./upload')); // Routes & Router allow methods

app.use(_user["default"].routes());
app.use(_user["default"].allowedMethods());
app.use(_support["default"].routes());
app.use(_support["default"].allowedMethods());
app.use(_category["default"].routes());
app.use(_category["default"].allowedMethods());
app.use(_tag["default"].routes());
app.use(_tag["default"].allowedMethods());
app.use(_blog["default"].routes());
app.use(_blog["default"].allowedMethods());
app.use(_auth["default"].routes());
app.use(_auth["default"].allowedMethods());
app.use(_instagram["default"].routes());
app.use(_instagram["default"].allowedMethods());
app.use(_booking["default"].routes());
app.use(_booking["default"].allowedMethods());
app.use(_galleries["default"].routes());
app.use(_galleries["default"].allowedMethods());
var _default = app;
exports["default"] = _default;