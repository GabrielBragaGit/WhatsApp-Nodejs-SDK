"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _messages = _interopRequireDefault(require("./api/messages"));
var _phoneNumbers = _interopRequireDefault(require("./api/phoneNumbers"));
var _twoStepVerification = _interopRequireDefault(require("./api/twoStepVerification"));
var _webhooks = _interopRequireDefault(require("./api/webhooks"));
var _logger = _interopRequireDefault(require("./logger"));
var _requester = _interopRequireDefault(require("./requester"));
var SDKEnums = _interopRequireWildcard(require("./types/enums"));
var _utils = require("./utils");
var _version = require("./version");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
// if (
// 	process.env.NODE_ENV !== 'production' ||
// 	process.env.TS_NODE_DEV === 'true'
// ) {
// 	import('dotenv').then((dotenv) => dotenv.config());
// }

const LIB_NAME = 'WHATSAPP';
const LOG_LOCAL = false;
const LOGGER = new _logger.default(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);
const headerPrefix = 'WA_SDK';
class WhatsApp {
  constructor(senderNumberId, config) {
    this.sdkVersion = _version.SDKVersion;
    if (config) this.config = (0, _utils.importConfig)(senderNumberId, config);else this.config = (0, _utils.importConfig)(senderNumberId);
    this.requester = new _requester.default(this.config[SDKEnums.WAConfigEnum.BaseURL], this.config[SDKEnums.WAConfigEnum.APIVersion], this.config[SDKEnums.WAConfigEnum.PhoneNumberId], this.config[SDKEnums.WAConfigEnum.AccessToken], this.config[SDKEnums.WAConfigEnum.BusinessAcctId], this.config[SDKEnums.WAConfigEnum.AppId], this.userAgent());
    this.messages = new _messages.default(this.config, this.requester);
    this.phoneNumbers = new _phoneNumbers.default(this.config, this.requester);
    this.twoStepVerification = new _twoStepVerification.default(this.config, this.requester);
    this.webhooks = new _webhooks.default(this.config, this.requester, this.userAgent());
    LOGGER.log('WhatsApp Node.js SDK instantiated!');
  }
  version() {
    return this.sdkVersion;
  }
  userAgent() {
    const userAgentString = `${headerPrefix}/${this.version()} (Node.js ${process.version})`;
    return userAgentString;
  }
  updateTimeout(ms) {
    this.config[SDKEnums.WAConfigEnum.RequestTimeout] = ms;
    LOGGER.log(`Updated request timeout to ${ms}ms`);
    return true;
  }
  updateSenderNumberId(phoneNumberId) {
    this.config[SDKEnums.WAConfigEnum.PhoneNumberId] = phoneNumberId;
    LOGGER.log(`Updated sender phone number id to ${phoneNumberId}`);
    return true;
  }
  updateAccessToken(accessToken) {
    this.config[SDKEnums.WAConfigEnum.AccessToken] = accessToken;
    LOGGER.log(`Updated access token`);
    return true;
  }
}
WhatsApp.Enums = SDKEnums;
var _default = WhatsApp;
exports.default = _default;
module.exports = exports.default;