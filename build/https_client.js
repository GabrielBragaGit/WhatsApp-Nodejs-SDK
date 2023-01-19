"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPS_Client_Response = void 0;
const https_1 = require("https");
const logger_1 = require("./logger");
const enums_1 = require("./types/enums");
const lib_name = 'HTTPS_CLIENT';
const log_local = false;
const logger = new logger_1.default(lib_name, process.env.DEBUG === 'true' || log_local);
class HTTPS_Client {
    constructor() {
        this._agent = new https_1.Agent({ keepAlive: true });
    }
    clear_sockets() {
        this._agent.destroy();
        return true;
    }
    async send_request(hostname, port, path, method, headers, timeout, requestData) {
        const agent = this._agent;
        return new Promise((resolve, reject) => {
            const req = (0, https_1.request)({
                hostname: hostname,
                port: port,
                path: path,
                method: method,
                agent: agent,
                headers: headers,
            });
            logger.log({
                hostname: hostname,
                port: port,
                path,
                method,
                agent,
                headers,
            });
            req.setTimeout(timeout, () => {
                // TODO: Handle timeout error with error handler CB and custom error code
                req.destroy();
            });
            req.on('response', (resp) => {
                resolve(new HTTPS_Client_Response(resp));
            });
            req.on('error', (error) => {
                reject(error);
            });
            req.once('socket', (socket) => {
                if (socket.connecting) {
                    socket.once('secureConnect', () => {
                        logger.log(requestData);
                        if (method === enums_1.HTTP_Methods_Enum.Post ||
                            method == enums_1.HTTP_Methods_Enum.Put)
                            req.write(requestData);
                        req.end();
                    });
                }
                else {
                    if (method === enums_1.HTTP_Methods_Enum.Post ||
                        method == enums_1.HTTP_Methods_Enum.Put)
                        req.write(requestData);
                    req.end();
                }
            });
        });
    }
}
exports.default = HTTPS_Client;
class HTTPS_Client_Response {
    constructor(resp) {
        this._resp = resp;
        this._status_code = resp.statusCode || 400;
        this._headers = resp.headers || {};
    }
    status_code() {
        return this._status_code;
    }
    headers() {
        return this._headers;
    }
    raw_response() {
        return this._resp;
    }
    async response_body_to_JSON() {
        return new Promise((resolve, reject) => {
            let response = '';
            this._resp.setEncoding('utf8');
            this._resp.on('data', (chunk) => {
                response += chunk.toString();
            });
            this._resp.once('end', () => {
                try {
                    resolve(JSON.parse(response));
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
}
exports.HTTPS_Client_Response = HTTPS_Client_Response;
//# sourceMappingURL=HTTPS_Client.js.map