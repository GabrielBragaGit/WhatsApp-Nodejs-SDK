"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _logger = require("../logger");
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LIB_NAME = 'BaseAPI';
const LOG_LOCAL = false;
const LOGGER = new _logger(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);
class BaseAPI {
  constructor(config, HttpsClient) {
    this.client = HttpsClient;
    this.config = config;
    LOGGER.log(`Initialized with HTTPSClient`);
  }
}
exports.default = BaseAPI;
module.exports = exports.default;