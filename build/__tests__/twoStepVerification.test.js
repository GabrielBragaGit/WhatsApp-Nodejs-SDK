"use strict";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const nock_1 = __importDefault(require("nock"));
const WhatsApp_1 = __importDefault(require("../WhatsApp"));
const twoStepVerification_1 = __importDefault(require("../api/twoStepVerification"));
describe('WhatsApp Two-Step Verification API', () => {
  const sdkConfig = global.sdkConfig;
  process.env.WA_BASE_URL = sdkConfig.WA_BASE_URL;
  process.env.M4D_APP_ID = sdkConfig.M4D_APP_ID;
  process.env.M4D_APP_SECRET = sdkConfig.M4D_APP_SECRET;
  process.env.WA_PHONE_NUMBER_ID = sdkConfig.WA_PHONE_NUMBER_ID.toString();
  process.env.WA_BUSINESS_ACCOUNT_ID = sdkConfig.WA_BUSINESS_ACCOUNT_ID;
  process.env.CLOUD_API_ACCESS_TOKEN = sdkConfig.CLOUD_API_ACCESS_TOKEN;
  process.env.CLOUD_API_VERSION = sdkConfig.CLOUD_API_VERSION;
  process.env.WEBHOOK_ENDPOINT = sdkConfig.WEBHOOK_ENDPOINT;
  process.env.WEBHOOK_VERIFICATION_TOKEN = sdkConfig.WEBHOOK_VERIFICATION_TOKEN;
  process.env.LISTENER_PORT = sdkConfig.LISTENER_PORT.toString();
  process.env.DEBUG = sdkConfig.DEBUG.toString();
  process.env.REQUEST_TIMEOUT = sdkConfig.REQUEST_TIMEOUT.toString();
  const wa = new WhatsApp_1.default();
  const basePath = `/${sdkConfig.CLOUD_API_VERSION}/${sdkConfig.WA_PHONE_NUMBER_ID}`;
  const defaultTwoStepVerificationResponseObjectBody = {
    success: true
  };
  let scope;
  afterEach(() => {
    nock_1.default.cleanAll();
    nock_1.default.restore();
    nock_1.default.activate();
  });
  it('Is two-step verificaiton class instance', () => {
    expect(wa.twoStepVerification).toBeInstanceOf(twoStepVerification_1.default);
  });
  it('Set the two-step verification pin to 123456', async () => {
    scope = (0, nock_1.default)(`https://${sdkConfig.WA_BASE_URL}`).post(`${basePath}/`).delay(200).delayBody(200).delayConnection(200).reply(200, defaultTwoStepVerificationResponseObjectBody);
    const newPin = 123456;
    const response = await wa.twoStepVerification.setPin(newPin);
    expect(await response.responseBodyToJSON()).toStrictEqual(defaultTwoStepVerificationResponseObjectBody);
    scope.isDone();
  });
});