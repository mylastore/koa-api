"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _InstagramToken = _interopRequireDefault(require("../models/InstagramToken"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _querystring = _interopRequireDefault(require("querystring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API_URL = 'https://graph.instagram.com/me/media?fields=';
var API_FIELDS = 'caption,media_url,media_type,permalink,timestamp,username';
var authURl = 'https://api.instagram.com/oauth/authorize?';
var accessTokenURl = 'https://api.instagram.com/oauth/access_token';
var redirectUri = 'http://localhost:4002/processAuthorization';
var appID = process.env.MY_LA_STORE_INSTAGRAM_APP_ID;
var redirectURI = process.env.MY_LA_STORE_INSTAGRAM_APP_REDIRECT_URI;
var appSecret = process.env.MY_LA_STORE_INSTAGRAM_APP_SECRET;
var instagramGraphApiUrl = 'https://graph.instagram.com/';
var queryUrl = 'me/media?fields=id,username,timestamp,caption,media_url,media_type,permalink&access_token={userToken}';

var InstagramController = /*#__PURE__*/function () {
  function InstagramController() {
    _classCallCheck(this, InstagramController);
  }

  _createClass(InstagramController, [{
    key: "authorizeUser",
    value: function () {
      var _authorizeUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var params, redirectURl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = {
                  client_id: appID,
                  redirect_uri: redirectURI,
                  scope: 'user_profile,user_media',
                  response_type: 'code'
                };
                redirectURl = authURl + _querystring["default"].stringify(params);
                ctx.body = {
                  status: 200,
                  url: redirectURl
                };

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function authorizeUser(_x) {
        return _authorizeUser.apply(this, arguments);
      }

      return authorizeUser;
    }()
  }, {
    key: "getUserAccessToken",
    value: function () {
      var _getUserAccessToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
        var code, response, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                code = ctx.request.body.code; // const graphURL = "https://graph.instagram.com/refresh_access_token?"
                // const params = {
                //     grant_type: "ig_refresh_token",
                //     access_token: code
                // }
                // const apiUrl = graphURL + JSON.stringify(params)
                //
                //
                // console.log(apiUrl)

                _context2.next = 3;
                return (0, _nodeFetch["default"])("https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=".concat(code), {
                  method: 'get',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

              case 3:
                response = _context2.sent;
                _context2.next = 6;
                return response.json();

              case 6:
                data = _context2.sent;
                ctx.body = data;

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getUserAccessToken(_x2) {
        return _getUserAccessToken.apply(this, arguments);
      }

      return getUserAccessToken;
    }()
  }]);

  return InstagramController;
}();

var _default = InstagramController;
exports["default"] = _default;

exports.deleteToken = function (req, res) {
  _InstagramToken["default"].findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      return console.log(err);
    } else {
      req.flash('success', {
        msg: 'Token deleted'
      });
      return res.redirect('/admin/instagram');
    }
  });
};

exports.auth = function (req, res) {
  ig.use({
    client_id: process.env.IG_CLIENT_ID,
    client_secret: process.env.IG_CLIENT_SECRET
  }); //the redirect uri we set when registering our application

  res.redirect(ig.get_authorization_url(redirectUri, {
    scope: ['basic', 'likes']
  }));
};

exports.processAuthorization = function (req, res) {
  //retrieves the code that was passed along as a query to the '/handleAuth' route and uses this code to construct an access token
  ig.authorize_user(req.query.code, redirectUri, function (err, result) {
    if (err) res.send(err);
    var token = new _InstagramToken["default"]({
      token: result.access_token
    });
    token.save(function (err, next, result) {
      if (err) {
        console.log(err.message);
        req.flash('error', {
          msg: err.message
        });
        return res.redirect('/admin/instagram/index');
      } else {
        req.flash('success', {
          msg: 'Success'
        });
        res.redirect('/admin/instagram');
      }
    });
  });
};

exports.getGallery = function (req, res) {
  _InstagramToken["default"].find().exec(function (err, data) {
    if (data.length > 0) {
      var accessToken = data;
      ig.use({
        access_token: accessToken
      });
      ig.user_media_recent(accessToken.split('.')[0], function (err, result, pagination, remaining, limit) {
        if (err) {
          res.json(err);
        } else {
          res.render('instagram/index', {
            robots: 'noindex, nofollow',
            title: 'Gallery',
            instagram: result
          });
        }
      });
    } else {
      console.log('ERROR!');
      res.render('instagram/index', {
        robots: 'noindex, nofollow',
        title: 'Gallery',
        empty: 'Working on galleries...'
      });
    }
  });
};

exports.getCarousel = function (req, res) {
  var link = req.query.link + '?__a=1';
  (0, _nodeFetch["default"])(link).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data) {
      res.render('instagram/carousel', {
        robots: 'noindex, nofollow',
        title: 'Gallery Carousel',
        data: data.graphql.shortcode_media.edge_sidecar_to_children.edges
      });
    }
  })["catch"](function (err) {
    throw err;
  });
};