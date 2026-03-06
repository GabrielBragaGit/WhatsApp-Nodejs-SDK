"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HttpsClientResponse = void 0;
var _dns = require("dns");
var _https = require("https");
var _util = require("util");
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

const asyncLookup = (0, _util.promisify)(_dns.lookup);
const LIB_NAME = 'HttpsClient';
const LOG_LOCAL = false;
const LOGGER = new _logger.default(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);
class HttpsClient {
  constructor() {
    this.agent = new _https.Agent({
      keepAlive: true
    });
    this.dnsCache = new Map();
    this.dnsCacheTTL = 1800000; // 30 minutos em milissegundos
    // this.dnsCacheTTL = 300000; // 5 minutos em milissegundos
  }
  async cachedDnsLookup(hostname) {
    const now = Date.now();
    const cached = this.dnsCache.get(hostname);
    if (cached && cached.timestamp + this.dnsCacheTTL > now) {
      return cached.ip;
    }
    const {
      address
    } = await asyncLookup(hostname);
    this.dnsCache.set(hostname, {
      ip: address,
      timestamp: now
    });
    return address;
  }
  clearSockets() {
    this.agent.destroy();
    return true;
  }
  async sendRequest(hostname, port, path, method, headers, timeout, requestData, retries = 3) {
    const agent = this.agent;
    const makeRequest = async () => {
      let ip;
      try {
        ip = await this.cachedDnsLookup(hostname);
      } catch (dnsError) {
        LOGGER.log(`DNS lookup failed: ${dnsError.message}`);
        ip = hostname; // Fallback para o hostname original se a resolução DNS falhar
      }
      return new Promise((resolve, reject) => {
        const options = {
          hostname: hostname,
          port: port,
          path: path,
          method: method,
          agent: agent,
          headers: {
            ...headers,
            Host: hostname // Adicione o header 'Host' explicitamente
          },
          servername: hostname // Mantenha o SNI
        };
        // Se temos um IP resolvido, use-o para conectar, mas mantenha o hostname para SNI
        if (ip !== hostname) {
          options.hostname = ip;
          options.headers['Host'] = hostname;
        }
        const req = (0, _https.request)(options);
        LOGGER.log({
          hostname: hostname,
          ip: ip,
          port: port,
          path,
          method,
          agent,
          headers
        });
        req.setTimeout(timeout, () => {
          // TODO: Handle timeout error with error handler CB and custom error code
          req.destroy();
          reject(new Error('Request timeout'));
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
              if ((method === _enums.HttpMethodsEnum.Post || method == _enums.HttpMethodsEnum.Put) && requestData) {
                if (!socket.destroyed && socket.writable) {
                  req.write(requestData);
                }
              }
              req.end();
            });
          } else {
            if ((method === _enums.HttpMethodsEnum.Post || method == _enums.HttpMethodsEnum.Put) && requestData) {
              if (!socket.destroyed && socket.writable) {
                req.write(requestData);
              }
            }
            req.end();
          }
        });
      });
    };
    let lastError = null;
    for (let i = 0; i < retries; i++) {
      try {
        return await makeRequest();
      } catch (error) {
        lastError = error;
        LOGGER.log(`Request failed (attempt ${i + 1}/${retries}): ${error.message}`);
        if (error.statusCode) {
          LOGGER.log(`Status Code: ${error.statusCode}, Body: ${error.body}`);
        }
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000 * Math.pow(2, i))); // Exponential backoff
        }
      }
    }
    return new Promise((resolve, reject) => {
      reject(lastError);
    });
    // throw lastError || new Error('Request failed after retries');
    // Se todas as tentativas falharem, retornamos uma resposta de erro personalizada
    // const erro: HttpsClientResponseClass = {
    // 	statusCode: () => 500,
    // 	headers: () => ({}),
    // 	rawResponse: () => {aborted: true},
    // 	responseBodyToJSON: async () => ({
    // 		error: true,
    // 		message: 'Request failed after all retries',
    // 	}),
    // };
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