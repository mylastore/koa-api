"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Blog = _interopRequireDefault(require("../models/Blog"));

var _Category = _interopRequireDefault(require("../models/Category"));

var _Tag = _interopRequireDefault(require("../models/Tag"));

var _slugify = _interopRequireDefault(require("slugify"));

var _stringStripHtml = _interopRequireDefault(require("string-strip-html"));

var _removeDirectory = _interopRequireDefault(require("../middleware/upload/removeDirectory"));

var _validate = require("../middleware/validate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var perPage = 10;
var DOMAIN = process.env.NODE_ENV === 'development' ? process.env.APP_LOCAL_URL : process.env.APP_PRODUCTION_URL;
var defaultAvatar = DOMAIN + process.env.DEFAULT_BLOG_IMG;
var defaultFeatureImage = {
  url: defaultAvatar,
  name: 'Feature',
  thumb: defaultAvatar
};

var BlogController = /*#__PURE__*/function () {
  function BlogController() {
    _classCallCheck(this, BlogController);
  }

  _createClass(BlogController, [{
    key: "getPublishBlogs",
    value: //********* helper functions
    function () {
      var _getPublishBlogs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var page;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                page = ctx.params.page || 1;
                _context.prev = 1;
                _context.next = 4;
                return _Blog["default"].find({
                  published: true
                }).populate('categories', '_id name slug').populate('tags', '_id name slug').populate('postedBy', '_id name username').sort({
                  createdAt: -1
                }).skip(perPage * page - perPage).limit(perPage).select('_id title featureImage slug visited excerpt categories tags postedBy createdAt').exec();

              case 4:
                return _context.abrupt("return", _context.sent);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", _context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 7]]);
      }));

      function getPublishBlogs(_x) {
        return _getPublishBlogs.apply(this, arguments);
      }

      return getPublishBlogs;
    }()
  }, {
    key: "getCategories",
    value: function () {
      var _getCategories = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _Category["default"].find({});

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", _context2.t0);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      function getCategories() {
        return _getCategories.apply(this, arguments);
      }

      return getCategories;
    }()
  }, {
    key: "getTags",
    value: function () {
      var _getTags = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _Tag["default"].find({});

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", _context3.t0);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 6]]);
      }));

      function getTags() {
        return _getTags.apply(this, arguments);
      }

      return getTags;
    }() //**************

  }, {
    key: "blogImage",
    value: function () {
      var _blogImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                return _context4.abrupt("return", ctx.body = {
                  avatarID: ctx.request.files.avatar.avatarID,
                  url: ctx.request.files.avatar.url,
                  thumb: ctx.request.files.avatar.thumb,
                  name: ctx.request.files.avatar.name
                });

              case 4:
                _context4.prev = 4;
                _context4.t0 = _context4["catch"](0);
                ctx["throw"](422, _context4.t0);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 4]]);
      }));

      function blogImage(_x2) {
        return _blogImage.apply(this, arguments);
      }

      return blogImage;
    }()
  }, {
    key: "blogImages",
    value: function () {
      var _blogImages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                return _context5.abrupt("return", ctx.body = {
                  galID: ctx.request.files.file.galID,
                  result: [{
                    url: ctx.request.files.file.src,
                    name: ctx.request.files.file.name,
                    size: ctx.request.files.file.size
                  }]
                });

              case 4:
                _context5.prev = 4;
                _context5.t0 = _context5["catch"](0);
                ctx["throw"](422, _context5.t0);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 4]]);
      }));

      function blogImages(_x3) {
        return _blogImages.apply(this, arguments);
      }

      return blogImages;
    }()
  }, {
    key: "createBlog",
    value: function () {
      var _createBlog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx) {
        var _ctx$request$body, title, content, published, editorImages, selectedCategories, selectedTags, featureImage, slug, metaDescription, excerpt, blog;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ctx$request$body = ctx.request.body, title = _ctx$request$body.title, content = _ctx$request$body.content, published = _ctx$request$body.published, editorImages = _ctx$request$body.editorImages, selectedCategories = _ctx$request$body.selectedCategories, selectedTags = _ctx$request$body.selectedTags, featureImage = _ctx$request$body.featureImage;

                if ((0, _validate.isObjectEmpty)(featureImage) || !featureImage) {
                  featureImage = defaultFeatureImage;
                }

                if (!selectedCategories || selectedCategories.length === 0) {
                  ctx["throw"](400, 'At least one category is required');
                }

                if (!selectedTags || selectedTags.length === 0) {
                  ctx["throw"](400, 'At least one tag is required');
                }

                if (content) {
                  metaDescription = (0, _stringStripHtml["default"])(content.substring(0, 160)).result;
                  excerpt = (0, _stringStripHtml["default"])(content.substring(0, 90)).result;
                }

                if (title) {
                  slug = (0, _slugify["default"])(title).toLowerCase();
                }

                blog = new _Blog["default"]({
                  title: title,
                  published: published,
                  content: content,
                  slug: slug,
                  metaTitle: "".concat(title, " | ").concat(process.env.APP_NAME),
                  metaDescription: metaDescription,
                  categories: selectedCategories,
                  tags: selectedTags,
                  excerpt: excerpt,
                  featureImage: featureImage,
                  editorImages: editorImages,
                  postedBy: ctx.state.user._id
                });
                _context6.prev = 7;
                _context6.next = 10;
                return blog.validateSync();

              case 10:
                this.galID = [];
                _context6.next = 13;
                return blog.save();

              case 13:
                return _context6.abrupt("return", ctx.body = _context6.sent);

              case 16:
                _context6.prev = 16;
                _context6.t0 = _context6["catch"](7);
                ctx["throw"](422, _context6.t0);

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[7, 16]]);
      }));

      function createBlog(_x4) {
        return _createBlog.apply(this, arguments);
      }

      return createBlog;
    }()
  }, {
    key: "updateBlog",
    value: function () {
      var _updateBlog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(ctx) {
        var _ctx$request$body2, published, title, content, featureImage, editorImages, selectedCategories, selectedTags, slug, blog, res;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ctx$request$body2 = ctx.request.body, published = _ctx$request$body2.published, title = _ctx$request$body2.title, content = _ctx$request$body2.content, featureImage = _ctx$request$body2.featureImage, editorImages = _ctx$request$body2.editorImages, selectedCategories = _ctx$request$body2.selectedCategories, selectedTags = _ctx$request$body2.selectedTags;
                slug = ctx.params.slug;
                blog = {};
                blog.categories = selectedCategories;
                blog.tags = selectedTags;
                blog.published = published;

                if (title) {
                  blog.metaTitle = title;
                  blog.slug = (0, _slugify["default"])(title).toLowerCase();
                  blog.title = title;
                }

                if (content) {
                  blog.excerpt = (0, _stringStripHtml["default"])(content.substring(0, 90)).result;
                  blog.metaDescription = (0, _stringStripHtml["default"])(content.substring(0, 160)).result;
                  blog.content = content;
                }

                if (featureImage) {
                  blog.featureImage = featureImage;
                } // if new image push to galID array on DB


                if (!editorImages.length) {
                  _context7.next = 12;
                  break;
                }

                _context7.next = 12;
                return _Blog["default"].findOneAndUpdate({
                  slug: slug
                }, {
                  $push: {
                    editorImages: editorImages
                  }
                });

              case 12:
                _context7.prev = 12;
                _context7.next = 15;
                return _Blog["default"].findOneAndUpdate({
                  slug: slug
                }, blog, {
                  "new": true,
                  runValidators: true,
                  context: 'query'
                });

              case 15:
                res = _context7.sent;

                if (res) {
                  ctx.body = res;
                }

                _context7.next = 22;
                break;

              case 19:
                _context7.prev = 19;
                _context7.t0 = _context7["catch"](12);
                ctx["throw"](422, _context7.t0);

              case 22:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[12, 19]]);
      }));

      function updateBlog(_x5) {
        return _updateBlog.apply(this, arguments);
      }

      return updateBlog;
    }()
  }, {
    key: "deleteImg",
    value: function () {
      var _deleteImg = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(ctx) {
        var blog;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return _Blog["default"].findOne({
                  slug: ctx.params.slug
                });

              case 3:
                blog = _context8.sent;
                _context8.t0 = blog.featureImage.avatarID;

                if (!_context8.t0) {
                  _context8.next = 9;
                  break;
                }

                _context8.next = 8;
                return (0, _removeDirectory["default"])("upload/".concat(blog.featureImage.avatarID));

              case 8:
                _context8.t0 = _context8.sent;

              case 9:
                if (!_context8.t0) {
                  _context8.next = 14;
                  break;
                }

                blog.featureImage = defaultFeatureImage;
                _context8.next = 13;
                return blog.save();

              case 13:
                return _context8.abrupt("return", ctx.body = _context8.sent);

              case 14:
                blog.featureImage = defaultFeatureImage;
                _context8.next = 17;
                return blog.save();

              case 17:
                return _context8.abrupt("return", ctx.body = _context8.sent);

              case 20:
                _context8.prev = 20;
                _context8.t1 = _context8["catch"](0);
                ctx["throw"](422, _context8.t1);

              case 23:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 20]]);
      }));

      function deleteImg(_x6) {
        return _deleteImg.apply(this, arguments);
      }

      return deleteImg;
    }()
  }, {
    key: "getAllUserBlogs",
    value: function () {
      var _getAllUserBlogs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(ctx) {
        var page, userId, blogs;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                page = ctx.params.page || 1;
                userId = ctx.request.body.id;
                _context9.prev = 2;
                _context9.next = 5;
                return _Blog["default"].find({
                  postedBy: userId
                }).populate('categories', '_id name slug').populate('tags', '_id name slug').populate('postedBy', '_id name username').sort({
                  createdAt: -1
                }).skip(perPage * page - perPage).limit(perPage).select('_id title excerpt slug featureImage visited tags postedBy published createdAt');

              case 5:
                blogs = _context9.sent;
                _context9.t0 = blogs;
                _context9.next = 9;
                return _Blog["default"].countDocuments({
                  postedBy: userId
                });

              case 9:
                _context9.t1 = _context9.sent;
                _context9.t2 = perPage;
                return _context9.abrupt("return", ctx.body = {
                  blogs: _context9.t0,
                  totalItems: _context9.t1,
                  perPage: _context9.t2
                });

              case 14:
                _context9.prev = 14;
                _context9.t3 = _context9["catch"](2);
                ctx["throw"](422, _context9.t3);

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[2, 14]]);
      }));

      function getAllUserBlogs(_x7) {
        return _getAllUserBlogs.apply(this, arguments);
      }

      return getAllUserBlogs;
    }()
  }, {
    key: "getAllPublishedBlogs",
    value: function () {
      var _getAllPublishedBlogs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(ctx) {
        var blogs;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return this.getPublishBlogs(ctx);

              case 3:
                blogs = _context10.sent;
                _context10.t0 = blogs;
                _context10.next = 7;
                return this.getCategories();

              case 7:
                _context10.t1 = _context10.sent;
                _context10.next = 10;
                return this.getTags();

              case 10:
                _context10.t2 = _context10.sent;
                _context10.next = 13;
                return _Blog["default"].countDocuments({
                  published: true
                });

              case 13:
                _context10.t3 = _context10.sent;
                _context10.t4 = perPage;
                return _context10.abrupt("return", ctx.body = {
                  blogs: _context10.t0,
                  categories: _context10.t1,
                  tags: _context10.t2,
                  totalItems: _context10.t3,
                  perPage: _context10.t4
                });

              case 18:
                _context10.prev = 18;
                _context10.t5 = _context10["catch"](0);
                ctx["throw"](422, _context10.t5);

              case 21:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 18]]);
      }));

      function getAllPublishedBlogs(_x8) {
        return _getAllPublishedBlogs.apply(this, arguments);
      }

      return getAllPublishedBlogs;
    }()
  }, {
    key: "getPublicBlog",
    value: function () {
      var _getPublicBlog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(ctx) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return _Blog["default"].exists({
                  slug: ctx.params.slug,
                  published: true
                });

              case 3:
                if (!_context11.sent) {
                  _context11.next = 9;
                  break;
                }

                _context11.next = 6;
                return _Blog["default"].findOneAndUpdate({
                  slug: ctx.params.slug,
                  published: true
                }, {
                  $inc: {
                    visited: 1
                  }
                }, {
                  "new": true,
                  upsert: true
                }).populate('categories', '_id name slug').populate('tags', '_id name slug').populate('postedBy', '_id name username').select('_id title published featureImage content slug visited metaTitle metaDescription categories tags postedBy createdAt');

              case 6:
                return _context11.abrupt("return", ctx.body = _context11.sent);

              case 9:
                ctx["throw"](404, {
                  message: 'Blog not found.'
                });

              case 10:
                _context11.next = 15;
                break;

              case 12:
                _context11.prev = 12;
                _context11.t0 = _context11["catch"](0);
                ctx["throw"](422, _context11.t0);

              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 12]]);
      }));

      function getPublicBlog(_x9) {
        return _getPublicBlog.apply(this, arguments);
      }

      return getPublicBlog;
    }()
  }, {
    key: "getBlog",
    value: function () {
      var _getBlog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(ctx) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return _Blog["default"].findOne({
                  slug: ctx.params.slug
                }).populate('categories', '_id name slug').populate('tags', '_id name slug').populate('postedBy', '_id name username').select('_id title published featureImage content slug visited metaTitle metaDescription categories tags postedBy createdAt');

              case 3:
                return _context12.abrupt("return", ctx.body = _context12.sent);

              case 6:
                _context12.prev = 6;
                _context12.t0 = _context12["catch"](0);
                ctx["throw"](422, _context12.t0);

              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[0, 6]]);
      }));

      function getBlog(_x10) {
        return _getBlog.apply(this, arguments);
      }

      return getBlog;
    }()
  }, {
    key: "deleteBlog",
    value: function () {
      var _deleteBlog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(ctx) {
        var slug, res, _iterator, _step, dir;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                slug = ctx.params.slug;
                _context13.prev = 1;
                _context13.next = 4;
                return _Blog["default"].findOne({
                  slug: slug
                });

              case 4:
                res = _context13.sent;

                if (!(res && res.featureImage.avatarID)) {
                  _context13.next = 8;
                  break;
                }

                _context13.next = 8;
                return (0, _removeDirectory["default"])("upload/".concat(res.featureImage.avatarID));

              case 8:
                if (!(res && res.editorImages.length)) {
                  _context13.next = 26;
                  break;
                }

                _iterator = _createForOfIteratorHelper(res.editorImages);
                _context13.prev = 10;

                _iterator.s();

              case 12:
                if ((_step = _iterator.n()).done) {
                  _context13.next = 18;
                  break;
                }

                dir = _step.value;
                _context13.next = 16;
                return (0, _removeDirectory["default"])("upload/".concat(dir));

              case 16:
                _context13.next = 12;
                break;

              case 18:
                _context13.next = 23;
                break;

              case 20:
                _context13.prev = 20;
                _context13.t0 = _context13["catch"](10);

                _iterator.e(_context13.t0);

              case 23:
                _context13.prev = 23;

                _iterator.f();

                return _context13.finish(23);

              case 26:
                _context13.next = 28;
                return res.remove();

              case 28:
                return _context13.abrupt("return", ctx.body = {
                  status: 200,
                  message: 'Success!'
                });

              case 31:
                _context13.prev = 31;
                _context13.t1 = _context13["catch"](1);
                ctx["throw"](422, _context13.t1);

              case 34:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[1, 31], [10, 20, 23, 26]]);
      }));

      function deleteBlog(_x11) {
        return _deleteBlog.apply(this, arguments);
      }

      return deleteBlog;
    }()
  }, {
    key: "getRelatedBlogs",
    value: function () {
      var _getRelatedBlogs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(ctx) {
        var _ctx$request$body3, _id, categories;

        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _ctx$request$body3 = ctx.request.body, _id = _ctx$request$body3._id, categories = _ctx$request$body3.categories;
                _context14.prev = 1;
                _context14.next = 4;
                return _Blog["default"].find({
                  _id: {
                    $ne: _id
                  },
                  categories: {
                    $in: categories
                  }
                }).limit(3).populate('postedBy', '_id name username').select('title slug avatar excerpt postedBy createdAt updatedAt');

              case 4:
                return _context14.abrupt("return", ctx.body = _context14.sent);

              case 7:
                _context14.prev = 7;
                _context14.t0 = _context14["catch"](1);
                ctx["throw"](422, _context14.t0);

              case 10:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[1, 7]]);
      }));

      function getRelatedBlogs(_x12) {
        return _getRelatedBlogs.apply(this, arguments);
      }

      return getRelatedBlogs;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(ctx) {
        var search;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                search = ctx.request.query.q;

                if (!search || search === '') {
                  ctx["throw"](422, 'Search query is empty.');
                }

                _context15.prev = 2;
                _context15.next = 5;
                return _Blog["default"].find({
                  $text: {
                    $search: search
                  }
                }).select('title slug excerpt postedBy');

              case 5:
                return _context15.abrupt("return", ctx.body = _context15.sent);

              case 8:
                _context15.prev = 8;
                _context15.t0 = _context15["catch"](2);
                ctx["throw"](422, _context15.t0);

              case 11:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[2, 8]]);
      }));

      function search(_x13) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "getBlogsByCategory",
    value: function () {
      var _getBlogsByCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(ctx) {
        var cat, page, category, blogs;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                cat = ctx.params.category;
                page = ctx.params.page || 1;
                _context16.prev = 2;
                _context16.next = 5;
                return _Category["default"].findOne({
                  slug: cat
                });

              case 5:
                category = _context16.sent;

                if (!category) {
                  _context16.next = 21;
                  break;
                }

                _context16.next = 9;
                return _Blog["default"].find({
                  categories: category._id,
                  published: true
                }).populate('categories', '_id name username slug').populate('tags', '_id name username slug').populate('postedBy', 'username').sort({
                  createdAt: -1
                }).skip(perPage * page - perPage).limit(perPage).select('_id title slug excerpt visited categories tags postedBy featureImage createdAt');

              case 9:
                blogs = _context16.sent;
                _context16.t0 = blogs;
                _context16.t1 = category;
                _context16.t2 = blogs.length;
                _context16.t3 = perPage;
                _context16.next = 16;
                return this.getCategories();

              case 16:
                _context16.t4 = _context16.sent;
                _context16.next = 19;
                return this.getTags();

              case 19:
                _context16.t5 = _context16.sent;
                return _context16.abrupt("return", ctx.body = {
                  blogs: _context16.t0,
                  category: _context16.t1,
                  totalItems: _context16.t2,
                  perPage: _context16.t3,
                  categories: _context16.t4,
                  tags: _context16.t5
                });

              case 21:
                _context16.next = 26;
                break;

              case 23:
                _context16.prev = 23;
                _context16.t6 = _context16["catch"](2);
                ctx["throw"](422, _context16.t6);

              case 26:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this, [[2, 23]]);
      }));

      function getBlogsByCategory(_x14) {
        return _getBlogsByCategory.apply(this, arguments);
      }

      return getBlogsByCategory;
    }()
  }, {
    key: "getBlogsByTag",
    value: function () {
      var _getBlogsByTag = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(ctx) {
        var tag, page, tags, blogs;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                tag = ctx.params.tag;
                page = ctx.params.page || 1;
                _context17.prev = 2;
                _context17.next = 5;
                return _Tag["default"].findOne({
                  slug: tag
                });

              case 5:
                tags = _context17.sent;

                if (!tags) {
                  _context17.next = 21;
                  break;
                }

                _context17.next = 9;
                return _Blog["default"].find({
                  tags: tags._id,
                  published: true
                }).populate('categories', '_id name username slug').populate('tags', '_id name username slug').populate('postedBy', '_id name username').sort({
                  createdAt: -1
                }).skip(perPage * page - perPage).limit(perPage).select('_id title slug excerpt visited categories tags postedBy featureImage createdAt');

              case 9:
                blogs = _context17.sent;
                _context17.t0 = blogs;
                _context17.t1 = tags;
                _context17.t2 = blogs.length;
                _context17.t3 = perPage;
                _context17.next = 16;
                return this.getCategories();

              case 16:
                _context17.t4 = _context17.sent;
                _context17.next = 19;
                return this.getTags();

              case 19:
                _context17.t5 = _context17.sent;
                return _context17.abrupt("return", ctx.body = {
                  blogs: _context17.t0,
                  tag: _context17.t1,
                  totalItems: _context17.t2,
                  perPage: _context17.t3,
                  categories: _context17.t4,
                  tags: _context17.t5
                });

              case 21:
                _context17.next = 26;
                break;

              case 23:
                _context17.prev = 23;
                _context17.t6 = _context17["catch"](2);
                ctx["throw"](422, _context17.t6);

              case 26:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this, [[2, 23]]);
      }));

      function getBlogsByTag(_x15) {
        return _getBlogsByTag.apply(this, arguments);
      }

      return getBlogsByTag;
    }()
  }, {
    key: "getCategoriesAndTags",
    value: function () {
      var _getCategoriesAndTags = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(ctx) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                _context18.next = 3;
                return this.getCategories();

              case 3:
                _context18.t0 = _context18.sent;
                _context18.next = 6;
                return this.getTags();

              case 6:
                _context18.t1 = _context18.sent;
                return _context18.abrupt("return", ctx.body = {
                  categories: _context18.t0,
                  tags: _context18.t1
                });

              case 10:
                _context18.prev = 10;
                _context18.t2 = _context18["catch"](0);
                ctx["throw"](422, _context18.t2);

              case 13:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[0, 10]]);
      }));

      function getCategoriesAndTags(_x16) {
        return _getCategoriesAndTags.apply(this, arguments);
      }

      return getCategoriesAndTags;
    }()
  }]);

  return BlogController;
}();

var _default = BlogController;
exports["default"] = _default;