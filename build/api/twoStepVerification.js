/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import BaseAPI from './base';
import { HttpMethodsEnum, WAConfigEnum } from '../types/enums';
import Logger from '../logger';
const LIB_NAME = 'TWOSTEPVERIFICATION_API';
const LOG_LOCAL = false;
const LOGGER = new Logger(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);
export default class TwoStepVerificationAPI extends BaseAPI {
    constructor() {
        super(...arguments);
        this.commonMethod = HttpMethodsEnum.Post;
        this.commonEndpoint = '';
    }
    setPin(pin) {
        const body = { pin: pin.toString() };
        LOGGER.log(`Setting two-step verification pin for phone number Id ${this.config[WAConfigEnum.PhoneNumberId]}`);
        return this.client.sendCAPIRequest(this.commonMethod, this.commonEndpoint, this.config[WAConfigEnum.RequestTimeout], JSON.stringify(body));
    }
}
