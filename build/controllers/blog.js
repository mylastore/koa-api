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

var _mongoErrors = _interopRequireDefault(require("../middleware/mongoErrors"));

var _utils = require("../middleware/utils");

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

var BlogController = /*#__PURE__*/function () {
  function BlogController() {
    _classCallCheck(this, BlogController);

    this.galID = [];
  } //********* helper functions


  _createClass(BlogController, [{
    key: "getPublishBlogs",
    value: function () {
      var _getPublishBlogs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var body, limit, skip;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                body = ctx.request.body;
                limit = body.limit ? parseInt(body.limit) : 10;
                skip = body.skip ? parseInt(body.skip) : 0;
                _context.prev = 3;
                _context.next = 6;
                return _Blog["default"].find({
                  published: true
                }).populate('categories', '_id name slug').populate('tags', '_id name slug').populate('postedBy', '_id name username').sort({
                  createdAt: -1
                }).skip(skip).limit(limit).select('_id title avatar slug visited excerpt categories tags postedBy createdAt').exec();

              case 6:
                return _context.abrupt("return", _context.sent);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](3);
                return _context.abrupt("return", _context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 9]]);
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
    }()
  }, {
    key: "getAllPublishBlogCount",
    value: function () {
      var _getAllPublishBlogCount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _Blog["default"].countDocuments({
                  published: true
                });

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", _context4.t0);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 6]]);
      }));

      function getAllPublishBlogCount() {
        return _getAllPublishBlogCount.apply(this, arguments);
      }

      return getAllPublishBlogCount;
    }() //**************

  }, {
    key: "blogImages",
    value: function () {
      var _blogImages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx, next) {
        var imgUrl, imgName, imgSize;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                this.galID.push(ctx.request.files.avatar.path.galID);
                imgUrl = ctx.request.files.avatar.path.imgUrl;
                imgName = ctx.request.files.avatar.path.imgName;
                imgSize = ctx.request.files.avatar.path.imgSize;
                return _context5.abrupt("return", ctx.body = {
                  result: [{
                    url: imgUrl,
                    name: imgName,
                    size: imgSize
                  }]
                });

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                ctx["throw"](422, _context5.t0);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function blogImages(_x2, _x3) {
        return _blogImages.apply(this, arguments);
      }

      return blogImages;
    }()
  }, {
    key: "createBlog",
    value: function () {
      var _createBlog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx) {
        var _ctx$request$body, title, content, published, categories, tags, slug, metaDescription, excerpt, imageURl, imgID, blog, error;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ctx$request$body = ctx.request.body, title = _ctx$request$body.title, content = _ctx$request$body.content, published = _ctx$request$body.published, categories = _ctx$request$body.categories, tags = _ctx$request$body.tags;
                imageURl = 'seo-default.webp';

                if (!(0, _validate.isObjectEmpty)(ctx.request.files)) {
                  imageURl = ctx.request.files.avatar.path.avatarUrl;
                  imgID = ctx.request.files.avatar.path.imgID;
                }

                if (categories) {
                  categories = categories.trim().split(/\s*,\s*/);
                }

                if (tags) {
                  tags = tags.trim().split(/\s*,\s*/);
                }

                if (!categories || categories.length === 0) {
                  ctx["throw"](400, 'At least one category is required');
                }

                if (!tags || tags.length === 0) {
                  ctx["throw"](400, 'At least one tag is required');
                }

                if (content) {
                  metaDescription = (0, _stringStripHtml["default"])(content.substring(0, 160)).result;
                  excerpt = (0, _stringStripHtml["default"])(content.substring(0, 200)).result;
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
                  categories: categories,
                  tags: tags,
                  excerpt: excerpt,
                  avatar: imageURl,
                  imgID: imgID,
                  galID: this.galID,
                  postedBy: ctx.state.user._id
                });
                _context6.next = 12;
                return blog.validateSync();

              case 12:
                error = _context6.sent;

                if (error) {
                  ctx["throw"](422, (0, _mongoErrors["default"])(error));
                }

                _context6.prev = 14;
                _context6.next = 17;
                return blog.save();

              case 17:
                ctx.body = _context6.sent;
                this.galID = [];
                _context6.next = 24;
                break;

              case 21:
                _context6.prev = 21;
                _context6.t0 = _context6["catch"](14);
                ctx["throw"](422, (0, _mongoErrors["default"])(_context6.t0));

              case 24:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[14, 21]]);
      }));

      function createBlog(_x4) {
        return _createBlog.apply(this, arguments);
      }

      return createBlog;
    }()
  }, {
    key: "updateBlog",
    value: function () {
      var _updateBlog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(ctx, next) {
        var data, slug, res;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                data = ctx.request.body;
                slug = ctx.params.slug;
                data.published = ctx.request.body.published;

                if (data.title) {
                  data.metaTitle = "".concat(data.title, " | ").concat(process.env.APP_NAME);
                }

                if (data.content) {
                  data.excerpt = (0, _stringStripHtml["default"])(data.content.substring(0, 200)).result;
                  data.metaDescription = (0, _stringStripHtml["default"])(data.content.substring(0, 160)).result;
                }

                if (data.categories) {
                  data.categories = data.categories.trim().split(/\s*,\s*/);
                }

                if (data.tags) {
                  data.tags = data.tags.trim().split(/\s*,\s*/);
                }

                if (!(0, _validate.isObjectEmpty)(ctx.request.files)) {
                  data.avatar = ctx.request.files.avatar.path.avatarUrl;
                  data.imgID = ctx.request.files.avatar.path.imgID;
                } // if new image push to galID array on DB


                if (!this.galID.length) {
                  _context7.next = 11;
                  break;
                }

                _context7.next = 11;
                return _Blog["default"].findOneAndUpdate({
                  slug: slug
                }, {
                  $push: {
                    galID: this.galID
                  }
                });

              case 11:
                _context7.prev = 11;
                _context7.next = 14;
                return _Blog["default"].findOneAndUpdate({
                  slug: slug
                }, data, {
                  "new": true,
                  runValidators: true,
                  context: 'query'
                });

              case 14:
                res = _context7.sent;

                if (res) {
                  ctx.body = res;
                  this.galID = [];
                }

                _context7.next = 21;
                break;

              case 18:
                _context7.prev = 18;
                _context7.t0 = _context7["catch"](11);
                ctx["throw"](422, (0, _mongoErrors["default"])(_context7.t0));

              case 21:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[11, 18]]);
      }));

      function updateBlog(_x5, _x6) {
        return _updateBlog.apply(this, arguments);
      }

      return updateBlog;
    }()
  }, {
    key: "deleteImg",
    value: function () {
      var _deleteImg = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(ctx, next) {
        var blog, update;
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

                if (!blog) {
                  _context8.next = 13;
                  break;
                }

                blog.avatar = 'seo-default.webp';
                _context8.next = 8;
                return blog.save();

              case 8:
                update = _context8.sent;

                if (!update) {
                  _context8.next = 13;
                  break;
                }

                _context8.next = 12;
                return (0, _utils.rmdir)("upload/".concat(blog.imgID));

              case 12:
                ctx.body = {
                  status: 200,
                  message: 'Image was updated.'
                };

              case 13:
                _context8.next = 18;
                break;

              case 15:
                _context8.prev = 15;
                _context8.t0 = _context8["catch"](0);
                ctx["throw"](422, _context8.t0);

              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 15]]);
      }));

      function deleteImg(_x7, _x8) {
        return _deleteImg.apply(this, arguments);
      }

      return deleteImg;
    }()
  }, {
    key: "getAllUserBlogs",
    value: function () {
      var _getAllUserBlogs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(ctx) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _Blog["default"].find({
                  postedBy: ctx.params.id
                }).populate('categories', '_id name slug').populate('tags', '_id name slug').populate('postedBy', '_id name username').select('_id title slug visited tags postedBy published createdAt');

              case 3:
                return _context9.abrupt("return", ctx.body = _context9.sent);

              case 6:
                _context9.prev = 6;
                _context9.t0 = _context9["catch"](0);
                ctx["throw"](422, _context9.t0);

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 6]]);
      }));

      function getAllUserBlogs(_x9) {
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
                _context10.t3 = blogs.length;
                _context10.next = 14;
                return this.getAllPublishBlogCount();

              case 14:
                _context10.t4 = _context10.sent;
                return _context10.abrupt("return", ctx.body = {
                  blogs: _context10.t0,
                  categories: _context10.t1,
                  tags: _context10.t2,
                  size: _context10.t3,
                  total: _context10.t4
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

      function getAllPublishedBlogs(_x10) {
        return _getAllPublishedBlogs.apply(this, arguments);
      }

      return getAllPublishedBlogs;
    }()
  }, {
    key: "getBlog",
    value: function () {
      var _getBlog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(ctx) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return _Blog["default"].findOneAndUpdate({
                  slug: ctx.params.slug
                }, {
                  $inc: {
                    visited: 1
                  }
                }, {
                  "new": true,
                  upsert: true
                }).populate('categories', '_id name slug').populate('tags', '_id name slug').populate('postedBy', '_id name username').select('_id title published avatar content slug imgID visited metaTitle metaDescription categories tags postedBy createdAt');

              case 3:
                return _context11.abrupt("return", ctx.body = _context11.sent);

              case 6:
                _context11.prev = 6;
                _context11.t0 = _context11["catch"](0);
                ctx["throw"](422, _context11.t0);

              case 9:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 6]]);
      }));

      function getBlog(_x11) {
        return _getBlog.apply(this, arguments);
      }

      return getBlog;
    }()
  }, {
    key: "deleteBlog",
    value: function () {
      var _deleteBlog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(ctx, next) {
        var slug, res, _iterator, _step, filename;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                slug = ctx.params.slug;
                _context12.prev = 1;
                _context12.next = 4;
                return _Blog["default"].findOne({
                  slug: slug
                });

              case 4:
                res = _context12.sent;

                if (!(res && res.imgID)) {
                  _context12.next = 11;
                  break;
                }

                _context12.next = 8;
                return (0, _utils.rmdir)("upload/".concat(res.imgID));

              case 8:
                _context12.next = 10;
                return res.remove();

              case 10:
                return _context12.abrupt("return", ctx.body = {
                  status: 200,
                  message: 'Success!'
                });

              case 11:
                if (!(res && res.galID)) {
                  _context12.next = 32;
                  break;
                }

                _iterator = _createForOfIteratorHelper(res.galID);
                _context12.prev = 13;

                _iterator.s();

              case 15:
                if ((_step = _iterator.n()).done) {
                  _context12.next = 21;
                  break;
                }

                filename = _step.value;
                _context12.next = 19;
                return (0, _utils.rmdir)("upload/".concat(filename));

              case 19:
                _context12.next = 15;
                break;

              case 21:
                _context12.next = 26;
                break;

              case 23:
                _context12.prev = 23;
                _context12.t0 = _context12["catch"](13);

                _iterator.e(_context12.t0);

              case 26:
                _context12.prev = 26;

                _iterator.f();

                return _context12.finish(26);

              case 29:
                _context12.next = 31;
                return res.remove();

              case 31:
                return _context12.abrupt("return", ctx.body = {
                  status: 200,
                  message: 'Success!'
                });

              case 32:
                _context12.next = 34;
                return res.remove();

              case 34:
                return _context12.abrupt("return", ctx.body = {
                  status: 200,
                  message: 'Success!'
                });

              case 37:
                _context12.prev = 37;
                _context12.t1 = _context12["catch"](1);
                ctx["throw"](422, _context12.t1);

              case 40:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[1, 37], [13, 23, 26, 29]]);
      }));

      function deleteBlog(_x12, _x13) {
        return _deleteBlog.apply(this, arguments);
      }

      return deleteBlog;
    }()
  }, {
    key: "getRelatedBlogs",
    value: function () {
      var _getRelatedBlogs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(ctx) {
        var _ctx$request$body2, _id, categories;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _ctx$request$body2 = ctx.request.body, _id = _ctx$request$body2._id, categories = _ctx$request$body2.categories;
                _context13.prev = 1;
                _context13.next = 4;
                return _Blog["default"].find({
                  _id: {
                    $ne: _id
                  },
                  categories: {
                    $in: categories
                  }
                }).limit(3).populate('postedBy', '_id name username').select('title slug avatar excerpt postedBy createdAt updatedAt');

              case 4:
                return _context13.abrupt("return", ctx.body = _context13.sent);

              case 7:
                _context13.prev = 7;
                _context13.t0 = _context13["catch"](1);
                ctx["throw"](422, _context13.t0);

              case 10:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[1, 7]]);
      }));

      function getRelatedBlogs(_x14) {
        return _getRelatedBlogs.apply(this, arguments);
      }

      return getRelatedBlogs;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(ctx) {
        var search;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                search = ctx.request.query.q;

                if (!search || search === '') {
                  ctx["throw"](422, 'Search query is empty.');
                }

                _context14.prev = 2;
                _context14.next = 5;
                return _Blog["default"].find({
                  $text: {
                    $search: search
                  }
                }).select('title slug excerpt postedBy');

              case 5:
                return _context14.abrupt("return", ctx.body = _context14.sent);

              case 8:
                _context14.prev = 8;
                _context14.t0 = _context14["catch"](2);
                ctx["throw"](422, _context14.t0);

              case 11:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[2, 8]]);
      }));

      function search(_x15) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }]);

  return BlogController;
}();

var _default = BlogController;
exports["default"] = _default;