"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = new _mongoose["default"].Schema({
  title: String,
  album: String,
  artist: String,
  duration: Number,
  cover: {
    url: String,
    alt: String
  },
  guid: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});
schema.plugin(_mongooseUniqueValidator["default"], {
  message: '{PATH} already exist.'
});

var _default = _mongoose["default"].model('Track', schema);

exports["default"] = _default;