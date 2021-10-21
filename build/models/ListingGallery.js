"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var ListingGallerySchema = new Schema({
  gallery: [{
    type: String
  }],
  listingId: {
    type: Schema.Types.ObjectId,
    ref: 'Listing'
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Gallery', ListingGallerySchema);

exports["default"] = _default;