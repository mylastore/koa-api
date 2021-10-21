"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Booking = _interopRequireDefault(require("../models/Booking"));

var _utils = require("../middleware/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BookingController = /*#__PURE__*/function () {
  function BookingController() {
    _classCallCheck(this, BookingController);
  }

  _createClass(BookingController, [{
    key: "getBookingByDate",
    value: function () {
      var _getBookingByDate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Booking["default"].find({
                  bookingDay: ctx.params.date
                });

              case 3:
                return _context.abrupt("return", ctx.body = _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                ctx["throw"](422, _context.t0);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function getBookingByDate(_x) {
        return _getBookingByDate.apply(this, arguments);
      }

      return getBookingByDate;
    }()
  }, {
    key: "bookingPost",
    value: function () {
      var _bookingPost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
        var body, exist, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                body = ctx.request.body;
                _context2.prev = 1;
                _context2.next = 4;
                return _Booking["default"].findOne({
                  $and: [{
                    bookingDay: body.bookingDay
                  }, {
                    time: body.time
                  }, {
                    type: body.type
                  }]
                }, {
                  runValidators: true
                });

              case 4:
                exist = _context2.sent;

                if (exist) {
                  ctx["throw"](422, 'Date and time is already taken.');
                }

                data = {
                  name: body.name,
                  email: body.email,
                  phone: body.phone,
                  address: body.address,
                  additionalInfo: body.additionalInfo,
                  bookingDay: body.bookingDay,
                  time: "".concat(body.time, " ").concat(body.type, " to ").concat(body.nextTime, " ").concat(body.nextType)
                }; // send email notification

                _context2.next = 9;
                return (0, _utils.newAppointment)(data);

              case 9:
                _context2.next = 11;
                return new _Booking["default"](body).save();

              case 11:
                return _context2.abrupt("return", ctx.body = _context2.sent);

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](1);
                ctx["throw"](422, _context2.t0);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 14]]);
      }));

      function bookingPost(_x2) {
        return _bookingPost.apply(this, arguments);
      }

      return bookingPost;
    }()
  }, {
    key: "getBookings",
    value: function () {
      var _getBookings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
        var date, pageLimit, page, bookings;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                date = ctx.request.body;
                _context3.prev = 1;
                pageLimit = 5;
                page = +ctx.request.params('page') || 1;
                _context3.next = 6;
                return _Booking["default"].find({
                  bookingDay: date
                }).sort({
                  time: -1
                }).skip((page - 1) * pageLimit).limit(pageLimit);

              case 6:
                bookings = _context3.sent;
                ctx.body = {
                  bookings: bookings,
                  page: page,
                  pages: bookings.length,
                  limit: pageLimit
                };
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);
                ctx["throw"](422, _context3.t0);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }));

      function getBookings(_x3) {
        return _getBookings.apply(this, arguments);
      }

      return getBookings;
    }()
  }]);

  return BookingController;
}();

var _default = BookingController;
exports["default"] = _default;