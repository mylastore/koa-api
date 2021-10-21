"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Track = _interopRequireDefault(require("../models/Track"));

var _slugify = _interopRequireDefault(require("slugify"));

var _mongoErrors = _interopRequireDefault(require("../middleware/mongoErrors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TrackController = /*#__PURE__*/function () {
  function TrackController() {
    _classCallCheck(this, TrackController);
  }

  _createClass(TrackController, [{
    key: "addTrack",
    value: function () {
      var _addTrack = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var _ctx$request$body, album, artist, duration, guid, thumb, title, newAlbum, newTitle, thumbObj, durationTime, exist, track, error;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ctx$request$body = ctx.request.body, album = _ctx$request$body.album, artist = _ctx$request$body.artist, duration = _ctx$request$body.duration, guid = _ctx$request$body.guid, thumb = _ctx$request$body.thumb, title = _ctx$request$body.title;
                newAlbum = album.replace(/ *\[[^\]]*]/g, '');
                newTitle = title.replace(/ *\[[^\]]*]/g, ''); //album.replace(/ *\[[^\]]*]/g, '')

                console.log('album? ', newAlbum); //console.log('album' ,album)

                thumbObj = {
                  url: thumb,
                  alt: (0, _slugify["default"])(newTitle).toLowerCase()
                };
                durationTime = parseInt(duration);
                _context.prev = 6;
                _context.next = 9;
                return _Track["default"].exists({
                  guid: guid
                });

              case 9:
                exist = _context.sent;

                if (exist) {
                  ctx["throw"](422, 'Track already exist');
                }

                track = new _Track["default"]({
                  album: newAlbum,
                  artist: artist,
                  duration: durationTime,
                  guid: guid,
                  title: newTitle,
                  cover: thumbObj
                });
                error = track.validateSync();

                if (error) {
                  ctx["throw"](422, (0, _mongoErrors["default"])(error));
                }

                _context.next = 16;
                return track.save();

              case 16:
                return _context.abrupt("return", ctx.body = _context.sent);

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](6);
                ctx["throw"](422, _context.t0);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 19]]);
      }));

      function addTrack(_x) {
        return _addTrack.apply(this, arguments);
      }

      return addTrack;
    }()
  }, {
    key: "getTracks",
    value: function () {
      var _getTracks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _Track["default"].find({}).sort({
                  createdAt: -1
                }).limit(10);

              case 3:
                return _context2.abrupt("return", ctx.body = _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                ctx["throw"](422, _context2.t0);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      function getTracks(_x2) {
        return _getTracks.apply(this, arguments);
      }

      return getTracks;
    }()
  }]);

  return TrackController;
}();

var _default = TrackController;
exports["default"] = _default;