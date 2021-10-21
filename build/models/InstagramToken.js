"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = new _mongoose["default"].Schema({
  token: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
module.exports = _mongoose["default"].model('InstagramToken', schema);