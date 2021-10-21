"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _log4js = _interopRequireDefault(require("log4js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_log4js["default"].configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'logs/main.log',
      maxLogSize: 20480,
      backups: 10
    },
    console: {
      type: 'stdout'
    }
  },
  categories: {
    development: {
      appenders: ['file', 'console'],
      level: 'all'
    },
    production: {
      appenders: ['file'],
      level: 'info'
    },
    "default": {
      appenders: ['file'],
      level: 'info'
    }
  }
});

var logger = process.env.NODE_ENV === 'development' ? _log4js["default"].getLogger('development') : _log4js["default"].getLogger('production');
exports.logger = logger;