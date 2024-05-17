"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpsClient = _interopRequireDefault(require("./httpsClient"));
var _logger = _interopRequireDefault(require("./logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LIB_NAME = 'REQUESTER';
const LOG_LOCAL = false;
const LOGGER = new _logger.default(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);
class Requester {
  constructor(host, apiVersion, phoneNumberId, accessToken, businessAcctId, appId, userAgent) {
    this.protocol = 'https:';
    this.port = 443;
    this.client = new _httpsClient.default();
    this.host = host;
    this.apiVersion = apiVersion;
    this.phoneNumberId = phoneNumberId;
    this.accessToken = accessToken;
    this.businessAcctId = businessAcctId;
    this.appId = appId;
    this.userAgent = userAgent;
  }
  buildHeader(contentType) {
    const headers = {
      'Content-Type': contentType,
      'Authorization': `Bearer ${this.accessToken}`,
      'User-Agent': this.userAgent
    };
    return headers;
  }
  buildCAPIPath(endpoint) {
    if (endpoint.startsWith('media@')) return `/${this.apiVersion}/${endpoint.split('@')[1]}`;else if (endpoint.startsWith('template@')) return `/${this.apiVersion}/${this.appId}/${endpoint.split('@')[1]}`;else if (endpoint.startsWith('flows@')) return `/${this.apiVersion}/${this.appId}/flows`;
    return `/${this.apiVersion}/${this.phoneNumberId}/${endpoint}`;
  }
  async sendCAPIRequest(method, endpoint, timeout, body) {
    const contentType = 'application/json';
    LOGGER.log(`${method} : ${this.protocol.toLowerCase()}//${this.host}:${this.port}/${this.buildCAPIPath(endpoint)}`);
    return await this.client.sendRequest(this.host, this.port, this.buildCAPIPath(endpoint), method, this.buildHeader(contentType), timeout || 20000, method == 'POST' || method == 'PUT' ? body : undefined);
  }
}
exports.default = Requester;
module.exports = exports.default;