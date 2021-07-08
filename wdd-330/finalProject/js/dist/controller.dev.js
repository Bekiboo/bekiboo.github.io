"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _model = _interopRequireDefault(require("./model.js"));

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var controller = {
  consoleLog: function consoleLog() {
    console.log(_model["default"].getJSON(_model["default"].url));
  }
};
exports["default"] = controller;