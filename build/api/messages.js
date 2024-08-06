/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Logger from '../logger';
import { HttpMethodsEnum, MessageTypesEnum, WAConfigEnum, } from '../types/enums';
import BaseAPI from './base';
const LIB_NAME = 'MESSAGES_API';
const LOG_LOCAL = false;
const LOGGER = new Logger(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);
export default class MessagesAPI extends BaseAPI {
    constructor() {
        super(...arguments);
        this.commonMethod = HttpMethodsEnum.Post;
        this.commonEndpoint = 'messages';
    }
    bodyBuilder(type, payload, toNumber, replyMessageId) {
        const body = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: toNumber,
            type: type,
            [type]: payload,
        };
        if (replyMessageId)
            body['context'] = { message_id: replyMessageId };
        return body;
    }
    send(body) {
        return this.client.sendCAPIRequest(this.commonMethod, this.commonEndpoint, this.config[WAConfigEnum.RequestTimeout], body);
    }
    async audio(body, recipient, replyMessageId) {
        return this.send(JSON.stringify(this.bodyBuilder(MessageTypesEnum.Audio, body, recipient.toString(), replyMessageId)));
    }
    async contacts(body, recipient, replyMessageId) {
        return this.send(JSON.stringify(this.bodyBuilder(MessageTypesEnum.Contacts, body, recipient.toString(), replyMessageId)));
    }
    async document(body, recipient, replyMessageId) {
        return this.send(JSON.stringify(this.bodyBuilder(MessageTypesEnum.Document, body, recipient.toString(), replyMessageId)));
    }
    async image(body, recipient, replyMessageId) {
        return this.send(JSON.stringify(this.bodyBuilder(MessageTypesEnum.Image, body, recipient.toString(), replyMessageId)));
    }
    async interactive(body, recipient, replyMessageId) {
        return this.send(JSON.stringify(this.bodyBuilder(MessageTypesEnum.Interactive, body, recipient.toString(), replyMessageId)));
    }
    async location(body, recipient, replyMessageId) {
        return this.send(JSON.stringify(this.bodyBuilder(MessageTypesEnum.Location, body, recipient.toString(), replyMessageId)));
    }
    async sticker(body, recipient, replyMessageId) {
        return this.send(JSON.stringify(this.bodyBuilder(MessageTypesEnum.Sticker, body, recipient.toString(), replyMessageId)));
    }
    async template(body, recipient, replyMessageId) {
        return this.send(JSON.stringify(this.bodyBuilder(MessageTypesEnum.Template, body, recipient.toString(), replyMessageId)));
    }
    async text(body, recipient, replyMessageId) {
        LOGGER.log(body);
        body.preview_url = true;
        return this.send(JSON.stringify(this.bodyBuilder(MessageTypesEnum.Text, body, recipient.toString(), replyMessageId)));
    }
    async video(body, recipient, replyMessageId) {
        return this.send(JSON.stringify(this.bodyBuilder(MessageTypesEnum.Video, body, recipient.toString(), replyMessageId)));
    }
    async status(body) {
        const mp = { messaging_product: 'whatsapp' };
        const bodyToSend = Object.assign(mp, body);
        return this.send(JSON.stringify(bodyToSend));
    }
}
