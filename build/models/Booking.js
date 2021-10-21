"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = _mongoose["default"].Schema({
  name: String,
  phoneNumber: String,
  email: String,
  address: String,
  additionalInfo: String,
  bookingDay: {
    type: String
  },
  time: Number,
  type: String,
  //AM or PM,
  nextTime: Number,
  //next hour
  nextType: String //AM or PM of next hour

}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Booking', schema);

exports["default"] = _default;