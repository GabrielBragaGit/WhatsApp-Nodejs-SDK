"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("./base");
var _enums = require("../types/enums");
var _logger = require("../logger");
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LIB_NAME = 'TWOSTEPVERIFICATION_API';
const LOG_LOCAL = false;
const LOGGER = new _logger(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);
class TwoStepVerificationAPI extends _base {
  constructor() {
    super(...arguments);
    this.commonMethod = _enums.HttpMethodsEnum.Post;
    this.commonEndpoint = '';
  }
  setPin(pin) {
    const body = {
      pin: pin.toString()
    };
    LOGGER.log(`Setting two-step verification pin for phone number Id ${this.config[_enums.WAConfigEnum.PhoneNumberId]}`);
    return this.client.sendCAPIRequest(this.commonMethod, this.commonEndpoint, this.config[_enums.WAConfigEnum.RequestTimeout], JSON.stringify(body));
  }
}
exports.default = TwoStepVerificationAPI;
module.exports = exports.default;