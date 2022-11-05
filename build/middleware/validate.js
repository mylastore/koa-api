"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObjectEmpty = isObjectEmpty;
exports.objectOnlyOne = objectOnlyOne;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validateRequired = validateRequired;

function validateRequired(str) {
  return str !== '';
} // // password must be 8 characters or more, must have a capital letter and 1 special character


function validatePassword(val) {
  return new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,50})$').test(val);
}

function validateEmail(val) {
  return new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?").test(val);
}

function isObjectEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }

  return true;
}

function objectOnlyOne(obj) {
  if (isObjectEmpty(obj)) {
    return;
  }

  return Object.keys(obj).length === 1;
}