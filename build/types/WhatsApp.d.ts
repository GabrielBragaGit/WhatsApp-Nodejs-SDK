/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { WAConfigType } from './config';
import { semanticVersionString } from './version';
export declare class WhatsAppClass {
    constructor(senderNumberId: number, config?: Partial<WAConfigType>);
    version: () => semanticVersionString;
    updateTimeout(ms: number): boolean;
    updateSenderNumberId(phoneNumberId: number): boolean;
    updateAccessToken(accessToken: string): boolean;
}
