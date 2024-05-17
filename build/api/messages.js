"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _logger = _interopRequireDefault(require("../logger"));
var _enums = require("../types/enums");
var _base = _interopRequireDefault(require("./base"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LIB_NAME = 'MESSAGES_API';
const LOG_LOCAL = false;
const LOGGER = new _logger.default(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);
class MessagesAPI extends _base.default {
  constructor() {
    super(...arguments);
    this.commonMethod = _enums.HttpMethodsEnum.Post;
    this.commonEndpoint = 'messages';
  }
  bodyBuilder(type, payload, toNumber, replyMessageId) {
    const body = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: toNumber,
      type: type,
      [type]: payload
    };
    if (replyMessageId) body['context'] = {
      message_id: replyMessageId
    };
    return body;
  }
  send(body) {
    return this.client.sendCAPIRequest(this.commonMethod, this.commonEndpoint, this.config[_enums.WAConfigEnum.RequestTimeout], body);
  }
  async audio(body, recipient, replyMessageId) {
    return this.send(JSON.stringify(this.bodyBuilder(_enums.MessageTypesEnum.Audio, body, recipient.toString(), replyMessageId)));
  }
  async contacts(body, recipient, replyMessageId) {
    return this.send(JSON.stringify(this.bodyBuilder(_enums.MessageTypesEnum.Contacts, body, recipient.toString(), replyMessageId)));
  }
  async document(body, recipient, replyMessageId) {
    return this.send(JSON.stringify(this.bodyBuilder(_enums.MessageTypesEnum.Document, body, recipient.toString(), replyMessageId)));
  }
  async image(body, recipient, replyMessageId) {
    return this.send(JSON.stringify(this.bodyBuilder(_enums.MessageTypesEnum.Image, body, recipient.toString(), replyMessageId)));
  }
  async interactive(body, recipient, replyMessageId) {
    return this.send(JSON.stringify(this.bodyBuilder(_enums.MessageTypesEnum.Interactive, body, recipient.toString(), replyMessageId)));
  }
  async location(body, recipient, replyMessageId) {
    return this.send(JSON.stringify(this.bodyBuilder(_enums.MessageTypesEnum.Location, body, recipient.toString(), replyMessageId)));
  }
  async sticker(body, recipient, replyMessageId) {
    return this.send(JSON.stringify(this.bodyBuilder(_enums.MessageTypesEnum.Sticker, body, recipient.toString(), replyMessageId)));
  }
  async template(body, recipient, replyMessageId) {
    return this.send(JSON.stringify(this.bodyBuilder(_enums.MessageTypesEnum.Template, body, recipient.toString(), replyMessageId)));
  }
  async text(body, recipient, replyMessageId) {
    LOGGER.log(body);
    body.preview_url = true;
    return this.send(JSON.stringify(this.bodyBuilder(_enums.MessageTypesEnum.Text, body, recipient.toString(), replyMessageId)));
  }
  async video(body, recipient, replyMessageId) {
    return this.send(JSON.stringify(this.bodyBuilder(_enums.MessageTypesEnum.Video, body, recipient.toString(), replyMessageId)));
  }
  async status(body) {
    const mp = {
      messaging_product: 'whatsapp'
    };
    const bodyToSend = Object.assign(mp, body);
    return this.send(JSON.stringify(bodyToSend));
  }
}
exports.default = MessagesAPI;