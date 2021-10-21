"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var gallerySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: [64, 'Album name max characters length is 64']
  },
  images: [{
    src: String,
    name: String,
    alt: String
  }],
  thumbs: [{
    src: String,
    name: String,
    alt: String
  }],
  published: {
    Boolean: Boolean,
    "default": false
  },
  defaultImg: {
    name: String,
    src: String,
    alt: String
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Gallery', gallerySchema);

exports["default"] = _default;