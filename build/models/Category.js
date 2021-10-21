"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = new _mongoose["default"].Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    minlength: [2, 'Category must be at least 2 characters.'],
    maxlength: [32, 'Category name max characters length is 32.']
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    index: true
  }
}, {
  timestamps: true
});
schema.plugin(_mongooseUniqueValidator["default"], {
  message: '{PATH} already exist.'
});

var _default = _mongoose["default"].model('Category', schema);

exports["default"] = _default;