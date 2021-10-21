"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ObjectId = _mongoose["default"].Schema.ObjectId;
var schema = new _mongoose["default"].Schema({
  title: {
    type: String,
    trim: true,
    minlength: [3, 'Title must be at least 3 characters.'],
    maxlength: [160, 'Title maximum number of characters is 160'],
    required: [true, 'Tile is required']
  },
  visited: {
    type: Number,
    "default": 0
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  featureImage: {
    url: {
      type: String
    },
    thumb: {
      type: String
    },
    avatarID: {
      type: String
    },
    name: {
      type: String
    }
  },
  content: {
    type: String,
    minlength: [200, 'Content minimum number of characters is 200'],
    maxlength: [500000, 'Content maximum number of characters is 500,000'],
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    maxlength: [1000, 'Excerpt max number of characters is 1,000']
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  editorImages: [{
    type: String
  }],
  categories: [{
    type: ObjectId,
    ref: 'Category',
    required: [true, 'Categories is required']
  }],
  tags: [{
    type: ObjectId,
    ref: 'Tag',
    required: [true, 'Tags is required']
  }],
  postedBy: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  published: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
schema.plugin(_mongooseUniqueValidator["default"], {
  message: '{PATH} already exists.'
});
schema.index({
  title: 'text',
  content: 'text'
}, {
  weights: {
    title: 1,
    content: 2
  }
});

var _default = _mongoose["default"].model('Blog', schema);

exports["default"] = _default;