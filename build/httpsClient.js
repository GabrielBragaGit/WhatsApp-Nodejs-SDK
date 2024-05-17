"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HttpsClientResponse = void 0;
var _https = require("https");
var _logger = _interopRequireDefault(require("./logger"));
var _enums = require("./types/enums");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LIB_NAME = 'HttpsClient';
const LOG_LOCAL = false;
const LOGGER = new _logger.default(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);
class HttpsClient {
  constructor() {
    this.agent = new _https.Agent({
      keepAlive: true
    });
  }
  clearSockets() {
    this.agent.destroy();
    return true;
  }
  async sendRequest(hostname, port, path, method, headers, timeout, requestData) {
    const agent = this.agent;
    return new Promise((resolve, reject) => {
      const req = (0, _https.request)({
        hostname: hostname,
        port: port,
        path: path,
        method: method,
        agent: agent,
        headers: headers
      });
      LOGGER.log({
        hostname: hostname,
        port: port,
        path,
        method,
        agent,
        headers
      });
      req.setTimeout(timeout, () => {
        // TODO: Handle timeout error with error handler CB and custom error code
        req.destroy();
      });
      req.on('response', resp => {
        resolve(new HttpsClientResponse(resp));
      });
      req.on('error', error => {
        reject(error);
      });
      req.once('socket', socket => {
        if (socket.connecting) {
          socket.once('secureConnect', () => {
            LOGGER.log(requestData);
            if (method === _enums.HttpMethodsEnum.Post || method == _enums.HttpMethodsEnum.Put) req.write(requestData);
            req.end();
          });
        } else {
          if (method === _enums.HttpMethodsEnum.Post || method == _enums.HttpMethodsEnum.Put) req.write(requestData);
          req.end();
        }
      });
    });
  }
}
exports.default = HttpsClient;
class HttpsClientResponse {
  constructor(resp) {
    this.resp = resp;
    this.respStatusCode = resp.statusCode || 400;
    this.respHeaders = resp.headers || {};
  }
  statusCode() {
    return this.respStatusCode;
  }
  headers() {
    return this.respHeaders;
  }
  rawResponse() {
    return this.resp;
  }
  async responseBodyToJSON() {
    return new Promise((resolve, reject) => {
      let response = '';
      this.resp.setEncoding('utf8');
      this.resp.on('data', chunk => {
        response += chunk.toString();
      });
      this.resp.once('end', () => {
        try {
          resolve(JSON.parse(response));
        } catch (err) {
          reject(err);
        }
      });
    });
  }
}
exports.HttpsClientResponse = HttpsClientResponse;