"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importConfig = exports.generateXHub256Sig = void 0;
var crypto = _interopRequireWildcard(require("crypto"));
var _logger = _interopRequireDefault(require("./logger"));
var _enums = require("./types/enums");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LIB_NAME = 'UTILS';
const LOG_LOCAL = false;
const LOGGER = new _logger.default(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);
const DEFAULT_BASE_URL = 'graph.facebook.com';
const DEFAULT_LISTENER_PORT = 3000;
const DEFAULT_MAX_RETRIES_AFTER_WAIT = 30;
const DEFAULT_REQUEST_TIMEOUT = 20000;
const emptyConfigChecker = senderNumberId => {
  if ((process.env.WA_PHONE_NUMBER_ID === undefined || process.env.WA_PHONE_NUMBER_ID === '') && senderNumberId == undefined) {
    LOGGER.log(`Environmental variable: WA_PHONE_NUMBER_ID and/or sender phone number id arguement is undefined.`);
    throw new Error('Missing WhatsApp sender phone number Id.');
  }
  for (const value of Object.values(_enums.WARequiredConfigEnum)) {
    LOGGER.log(value + ' ---- ' + process.env[`${value}`]);
    if (process.env[`${value}`] === undefined || process.env[`${value}`] === '') {
      LOGGER.log(`Environmental variable: ${value} is undefined`);
      throw new Error('Invalid configuration.');
    }
  }
};
const importConfig = (senderNumberId, configToImport) => {
  emptyConfigChecker(senderNumberId);
  if (configToImport === undefined) {
    configToImport = {};
  }
  const config = {
    [_enums.WAConfigEnum.BaseURL]: process.env.WA_BASE_URL || DEFAULT_BASE_URL,
    [_enums.WAConfigEnum.AppId]: configToImport[_enums.WAConfigEnum.AppId] || process.env.M4D_APP_ID || '',
    [_enums.WAConfigEnum.AppSecret]: process.env.M4D_APP_SECRET || '',
    [_enums.WAConfigEnum.PhoneNumberId]: senderNumberId || parseInt(process.env.WA_PHONE_NUMBER_ID || ''),
    [_enums.WAConfigEnum.BusinessAcctId]: configToImport[_enums.WAConfigEnum.BusinessAcctId] || process.env.WA_BUSINESS_ACCOUNT_ID || '',
    [_enums.WAConfigEnum.APIVersion]: configToImport[_enums.WAConfigEnum.APIVersion] || process.env.CLOUD_API_VERSION || '',
    [_enums.WAConfigEnum.AccessToken]: configToImport[_enums.WAConfigEnum.AccessToken] || process.env.CLOUD_API_ACCESS_TOKEN || '',
    [_enums.WAConfigEnum.WebhookEndpoint]: process.env.WEBHOOK_ENDPOINT || '',
    [_enums.WAConfigEnum.WebhookVerificationToken]: process.env.WEBHOOK_VERIFICATION_TOKEN || '',
    [_enums.WAConfigEnum.ListenerPort]: parseInt(process.env.LISTENER_PORT || '') || DEFAULT_LISTENER_PORT,
    [_enums.WAConfigEnum.MaxRetriesAfterWait]: parseInt(process.env.MAX_RETRIES_AFTER_WAIT || '') || DEFAULT_MAX_RETRIES_AFTER_WAIT,
    [_enums.WAConfigEnum.RequestTimeout]: parseInt(process.env.REQUEST_TIMEOUT || '') || DEFAULT_REQUEST_TIMEOUT,
    [_enums.WAConfigEnum.Debug]: process.env.DEBUG === 'true'
  };
  LOGGER.log(`Configuration loaded for App Id ${config[_enums.WAConfigEnum.AppId]}`);
  return config;
};
exports.importConfig = importConfig;
const generateXHub256Sig = (body, appSecret) => {
  return crypto.createHmac('sha256', appSecret).update(body, 'utf-8').digest('hex');
};
exports.generateXHub256Sig = generateXHub256Sig;