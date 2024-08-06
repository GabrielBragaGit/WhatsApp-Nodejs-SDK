/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { lookup } from 'dns';
import { IncomingMessage } from 'http';
import { Agent, request } from 'https';
import { promisify } from 'util';
import Logger from './logger';
import { HttpMethodsEnum } from './types/enums';
import {
	HttpsClientClass,
	HttpsClientResponseClass,
	RequestData,
	RequestHeaders,
	ResponseHeaders,
	ResponseJSONBody,
} from './types/httpsClient';

const asyncLookup = promisify(lookup);

const LIB_NAME = 'HttpsClient';
const LOG_LOCAL = false;
const LOGGER = new Logger(LIB_NAME, process.env.DEBUG === 'true' || LOG_LOCAL);

interface DNSCacheEntry {
	ip: string;
	timestamp: number;
}

export default class HttpsClient implements HttpsClientClass {
	agent: Agent;
	private dnsCache: Map<string, DNSCacheEntry>;
	private dnsCacheTTL: number;

	constructor() {
		this.agent = new Agent({ keepAlive: true });
		this.dnsCache = new Map();
		this.dnsCacheTTL = 1800000; // 30 minutos em milissegundos
		// this.dnsCacheTTL = 300000; // 5 minutos em milissegundos
	}

	private async cachedDnsLookup(hostname: string): Promise<string> {
		const now = Date.now();
		const cached = this.dnsCache.get(hostname);
		if (cached && cached.timestamp + this.dnsCacheTTL > now) {
			return cached.ip;
		}

		const { address } = await asyncLookup(hostname);
		this.dnsCache.set(hostname, { ip: address, timestamp: now });
		return address;
	}

	clearSockets(): boolean {
		this.agent.destroy();
		return true;
	}

	async sendRequest(
		hostname: string,
		port: number,
		path: string,
		method: string,
		headers: RequestHeaders,
		timeout: number,
		requestData?: RequestData,
		retries: number = 3,
	): Promise<HttpsClientResponseClass> {
		const agent = this.agent;

		const makeRequest = async (): Promise<HttpsClientResponseClass> => {
			let ip: any;
			try {
				ip = await this.cachedDnsLookup(hostname);
			} catch (dnsError: any) {
				LOGGER.log(`DNS lookup failed: ${dnsError.message}`);
				ip = hostname; // Fallback para o hostname original se a resolução DNS falhar
			}

			return new Promise<HttpsClientResponseClass>((resolve, reject) => {
				const options = {
					hostname: hostname, // Use o hostname original aqui
					port: port,
					path: path,
					method: method,
					agent: agent,
					headers: {
						...headers,
						Host: hostname, // Adicione o header 'Host' explicitamente
					},
					servername: hostname, // Mantenha o SNI
				};

				// Se temos um IP resolvido, use-o para conectar, mas mantenha o hostname para SNI
				if (ip !== hostname) {
					options.hostname = ip;
					options.headers['Host'] = hostname;
				}

				const req = request(options);

				LOGGER.log({
					hostname: hostname,
					ip: ip,
					port: port,
					path,
					method,
					agent,
					headers,
				});

				req.setTimeout(timeout, () => {
					// TODO: Handle timeout error with error handler CB and custom error code
					req.destroy();
					reject(new Error('Request timeout'));
				});

				req.on('response', (resp) => {
					resolve(new HttpsClientResponse(resp));
				});

				req.on('error', (error) => {
					reject(error);
				});

				req.once('socket', (socket) => {
					if (socket.connecting) {
						socket.once('secureConnect', () => {
							LOGGER.log(requestData);
							if (
								method === HttpMethodsEnum.Post ||
								method == HttpMethodsEnum.Put
							)
								req.write(requestData);
							req.end();
						});
					} else {
						if (
							method === HttpMethodsEnum.Post ||
							method == HttpMethodsEnum.Put
						)
							req.write(requestData);
						req.end();
					}
				});
			});
		};

		let lastError: Error | null = null;
		for (let i = 0; i < retries; i++) {
			try {
				return await makeRequest();
			} catch (error: any) {
				lastError = error as Error;
				LOGGER.log(
					`Request failed (attempt ${i + 1}/${retries}): ${error.message}`,
				);
				if (error.statusCode) {
					LOGGER.log(`Status Code: ${error.statusCode}, Body: ${error.body}`);
				}
				if (i < retries - 1) {
					await new Promise((resolve) =>
						setTimeout(resolve, 2000 * Math.pow(2, i)),
					); // Exponential backoff
				}
			}
		}

		return new Promise<HttpsClientResponseClass>((resolve, reject) => {
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

export class HttpsClientResponse implements HttpsClientResponseClass {
	resp: IncomingMessage;
	respStatusCode: number;
	respHeaders: ResponseHeaders;

	constructor(resp: IncomingMessage) {
		this.resp = resp;
		this.respStatusCode = resp.statusCode || 400;
		this.respHeaders = resp.headers || {};
	}

	statusCode(): number {
		return this.respStatusCode;
	}

	headers(): ResponseHeaders {
		return this.respHeaders;
	}

	rawResponse(): IncomingMessage {
		return this.resp;
	}

	async responseBodyToJSON(): Promise<ResponseJSONBody> {
		return new Promise((resolve, reject) => {
			let response = '';

			this.resp.setEncoding('utf8');
			this.resp.on('data', (chunk) => {
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
