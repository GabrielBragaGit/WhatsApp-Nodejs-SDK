"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./base"));
var _enums = require("../types/enums");
var _logger = _interopRequireDefault(require("../logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LIB_NAME = 'PHONENUMBERS_API';
const LOG_LOCAL = false;
const LOGGER = new _logger.default(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);
class PhoneNumbersAPI extends _base.default {
  constructor() {
    super(...arguments);
    this.commonMethod = _enums.HttpMethodsEnum.Post;
  }
  requestCode(body) {
    const endpoint = 'request_code';
    LOGGER.log(`Requesting phone number verification code for phone number Id ${this.config[_enums.WAConfigEnum.PhoneNumberId]}`);
    return this.client.sendCAPIRequest(this.commonMethod, endpoint, this.config[_enums.WAConfigEnum.RequestTimeout], JSON.stringify(body));
  }
  verifyCode(body) {
    const endpoint = 'verify_code';
    LOGGER.log(`Sending phone number verification code ${body.code} for phone number Id ${this.config[_enums.WAConfigEnum.PhoneNumberId]}`);
    return this.client.sendCAPIRequest(this.commonMethod, endpoint, this.config[_enums.WAConfigEnum.RequestTimeout], JSON.stringify(body));
  }
}
exports.default = PhoneNumbersAPI;
module.exports = exports.default;