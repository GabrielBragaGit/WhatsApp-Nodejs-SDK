/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare const enum HTTP_Methods_Enum {
	Get = 'GET',
	Post = 'POST',
	Put = 'PUT',
	Delete = 'DELETE',
}
export declare const enum Message_Types_Enum {
	Audio = 'audio',
	Contacts = 'contacts',
	Document = 'document',
	Image = 'image',
	Interactive = 'interactive',
	Location = 'location',
	Reaction = 'sticker',
	Sticker = 'sticker',
	Template = 'template',
	Text = 'text',
	Video = 'video',
}
export declare const enum Parameters_Types_Enum {
	Currency = 'currency',
	Date_time = 'date_time',
	Document = 'document',
	Image = 'image',
	Text = 'text',
	Video = 'video',
	Payload = 'payload',
}
export declare const enum Interactive_Types_Enum {
	Button = 'button',
	List = 'list',
	Product = 'product',
	Product_list = 'product_list',
}
export declare const enum Button_Types_Enum {
	Quick_reply = 'quick_reply',
	URL = 'url',
}
export declare const enum Button_Position_Enum {
	First = 0,
	Second = 1,
	Third = 2,
}
export declare const enum Component_Types_Enum {
	Header = 'header',
	Body = 'body',
	Button = 'button',
}
export declare enum WA_Config_Enum {
	Base_URL = 'WA_BASE_URL',
	App_Id = 'M4D_APP_ID',
	App_Secret = 'M4D_APP_SECRET',
	Phone_Number_Id = 'WA_PHONE_NUMBER_ID',
	Business_Acct_Id = 'WA_BUSINESS_ACCOUNT_ID',
	API_Version = 'CLOUD_API_VERSION',
	Access_Token = 'CLOUD_API_ACCESS_TOKEN',
	Webhook_Endpoint = 'WEBHOOK_ENDPOINT',
	Webhook_Verification_Token = 'WEBHOOK_VERIFICATION_TOKEN',
	Listener_Port = 'LISTENER_PORT',
	Max_Retries_After_Wait = 'MAX_RETRIES_AFTER_WAIT',
	Request_Timeout = 'REQUEST_TIMEOUT',
	Debug = 'DEBUG',
}
export declare enum WA_Required_Config_Enum {
	API_Version = 'CLOUD_API_VERSION',
	Access_Token = 'CLOUD_API_ACCESS_TOKEN',
}
export declare const enum Conversation_Types_Enum {
	Business_initiated = 'business_initiated',
	Customer_initiated = 'customer_initiated',
	Referral_conversion = 'referral_conversion',
}
export declare const enum Status_Enum {
	Delivered = 'delivered',
	Read = 'read',
	Sent = 'sent',
}
export declare const enum Video_Media_Types_Enum {
	Mp4 = 'video/mp4',
	Threegp = 'video/3gp',
}
export declare const enum Sticker_Media_Types_Enum {
	Webp = 'image/webp',
}
export declare const enum Image_Media_Types_Enum {
	Jpeg = 'image/jpeg',
	Png = 'image/png',
}
export declare const enum Document_Media_Types_Enum {
	Text = 'text/plain',
	Pdf = 'application/pdf',
	Ppt = 'application/vnd.ms-powerpoint',
	Word = 'application/msword',
	Excel = 'application/vnd.ms-excel',
	Open_Doc = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	Open_Pres = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	Open_Sheet = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}
export declare const enum Audio_Media_Types_Enum {
	Aac = 'audio/aac',
	Mp4 = 'audio/mp4',
	Mpeg = 'audio/mpeg',
	Amr = 'audio/amr',
	Ogg = 'audio/ogg',
}
export declare const enum Webhook_Types_Enum {
	Audio = 'audio',
	Button = 'button',
	Document = 'document',
	Text = 'text',
	Image = 'image',
	Interactive = 'interactive',
	Order = 'order',
	Sticker = 'sticker',
	System = 'system',
	Unknown = 'unknown',
	Video = 'video',
}
export declare const enum System_Change_Types_Enum {
	Customer_changed_number = 'customer_changed_number',
	Customer_identity_changed = 'customer_identity_changed',
}
export declare const enum Referral_Source_Types_Enum {
	Ad = 'ad',
	Post = 'post',
}
export declare const enum Languages_Enum {
	Afrikaans = 'af',
	Albanian = 'sq',
	Arabic = 'ar',
	Azerbaijani = 'az',
	Bengali = 'bn',
	Bulgarian = 'bg',
	Catalan = 'ca',
	Chinese_CHN = 'zh_CN',
	Chinese_HKG = 'zh_HK',
	Chinese_TAI = 'zh_TW',
	Croatian = 'hr',
	Czech = 'cs',
	Danish = 'da',
	Dutch = 'nl',
	English = 'en',
	English_UK = 'en_GB',
	English_US = 'en_US',
	Estonian = 'et',
	Filipino = 'fil',
	Finnish = 'fi',
	French = 'fr',
	Georgian = 'ka',
	German = 'de',
	Greek = 'el',
	Gujarati = 'gu',
	Hausa = 'ha',
	Hebrew = 'he',
	Hindi = 'hi',
	Hungarian = 'hu',
	Indonesian = 'id',
	Irish = 'ga',
	Italian = 'it',
	Japanese = 'ja',
	Kannada = 'kn',
	Kazakh = 'kk',
	Kinyarwanda = 'rw_RW',
	Korean = 'ko',
	Kyrgyz_Kyrgyzstan = 'ky_KG',
	Lao = 'lo',
	Latvian = 'lv',
	Lithuanian = 'lt',
	Macedonian = 'mk',
	Malay = 'ms',
	Malayalam = 'ml',
	Marathi = 'mr',
	Norwegian = 'nb',
	Persian = 'fa',
	Polish = 'pl',
	Portuguese_BR = 'pt_BR',
	Portuguese_POR = 'pt_PT',
	Punjabi = 'pa',
	Romanian = 'ro',
	Russian = 'ru',
	Serbian = 'sr',
	Slovak = 'sk',
	Slovenian = 'sl',
	Spanish = 'es',
	Spanish_ARG = 'es_AR',
	Spanish_SPA = 'es_ES',
	Spanish_MEX = 'es_MX',
	Swahili = 'sw',
	Swedish = 'sv',
	Tamil = 'ta',
	Telugu = 'te',
	Thai = 'th',
	Turkish = 'tr',
	Ukrainian = 'uk',
	Urdu = 'ur',
	Uzbek = 'uz',
	Vietnamese = 'vi',
	Zulu = 'zu',
}
export declare const enum Currency_Codes_Enum {
	AFN = 'AFN',
	EUR = 'EUR',
	ALL = 'ALL',
	DZD = 'DZD',
	USD = 'USD',
	AOA = 'AOA',
	XCD = 'XCD',
	ARS = 'ARS',
	AMD = 'AMD',
	AWG = 'AWG',
	AUD = 'AUD',
	AZN = 'AZN',
	BSD = 'BSD',
	BHD = 'BHD',
	BDT = 'BDT',
	BBD = 'BBD',
	BYN = 'BYN',
	BZD = 'BZD',
	XOF = 'XOF',
	BMD = 'BMD',
	INR = 'INR',
	BTN = 'BTN',
	BOB = 'BOB',
	BOV = 'BOV',
	BAM = 'BAM',
	BWP = 'BWP',
	NOK = 'NOK',
	BRL = 'BRL',
	BND = 'BND',
	BGN = 'BGN',
	BIF = 'BIF',
	CVE = 'CVE',
	KHR = 'KHR',
	XAF = 'XAF',
	CAD = 'CAD',
	KYD = 'KYD',
	CLP = 'CLP',
	CLF = 'CLF',
	CNY = 'CNY',
	COP = 'COP',
	COU = 'COU',
	KMF = 'KMF',
	CDF = 'CDF',
	NZD = 'NZD',
	CRC = 'CRC',
	HRK = 'HRK',
	CUP = 'CUP',
	CUC = 'CUC',
	ANG = 'ANG',
	CZK = 'CZK',
	DKK = 'DKK',
	DJF = 'DJF',
	DOP = 'DOP',
	EGP = 'EGP',
	SVC = 'SVC',
	ERN = 'ERN',
	SZL = 'SZL',
	ETB = 'ETB',
	FKP = 'FKP',
	FJD = 'FJD',
	XPF = 'XPF',
	GMD = 'GMD',
	GEL = 'GEL',
	GHS = 'GHS',
	GIP = 'GIP',
	GTQ = 'GTQ',
	GBP = 'GBP',
	GNF = 'GNF',
	GYD = 'GYD',
	HTG = 'HTG',
	HNL = 'HNL',
	HKD = 'HKD',
	HUF = 'HUF',
	ISK = 'ISK',
	IDR = 'IDR',
	XDR = 'XDR',
	IRR = 'IRR',
	IQD = 'IQD',
	ILS = 'ILS',
	JMD = 'JMD',
	JPY = 'JPY',
	JOD = 'JOD',
	KZT = 'KZT',
	KES = 'KES',
	KPW = 'KPW',
	KRW = 'KRW',
	KWD = 'KWD',
	KGS = 'KGS',
	LAK = 'LAK',
	LBP = 'LBP',
	LSL = 'LSL',
	ZAR = 'ZAR',
	LRD = 'LRD',
	LYD = 'LYD',
	CHF = 'CHF',
	MOP = 'MOP',
	MKD = 'MKD',
	MGA = 'MGA',
	MWK = 'MWK',
	MYR = 'MYR',
	MVR = 'MVR',
	MRU = 'MRU',
	MUR = 'MUR',
	XUA = 'XUA',
	MXN = 'MXN',
	MXV = 'MXV',
	MDL = 'MDL',
	MNT = 'MNT',
	MAD = 'MAD',
	MZN = 'MZN',
	MMK = 'MMK',
	NAD = 'NAD',
	NPR = 'NPR',
	NIO = 'NIO',
	NGN = 'NGN',
	OMR = 'OMR',
	PKR = 'PKR',
	PAB = 'PAB',
	PGK = 'PGK',
	PYG = 'PYG',
	PEN = 'PEN',
	PHP = 'PHP',
	PLN = 'PLN',
	QAR = 'QAR',
	RON = 'RON',
	RUB = 'RUB',
	RWF = 'RWF',
	SHP = 'SHP',
	WST = 'WST',
	STN = 'STN',
	SAR = 'SAR',
	RSD = 'RSD',
	SCR = 'SCR',
	SLL = 'SLL',
	SGD = 'SGD',
	XSU = 'XSU',
	SBD = 'SBD',
	SOS = 'SOS',
	SSP = 'SSP',
	LKR = 'LKR',
	SDG = 'SDG',
	SRD = 'SRD',
	SEK = 'SEK',
	CHE = 'CHE',
	CHW = 'CHW',
	SYP = 'SYP',
	TWD = 'TWD',
	TJS = 'TJS',
	TZS = 'TZS',
	THB = 'THB',
	TOP = 'TOP',
	TTD = 'TTD',
	TND = 'TND',
	TRY = 'TRY',
	TMT = 'TMT',
	UGX = 'UGX',
	UAH = 'UAH',
	AED = 'AED',
	USN = 'USN',
	UYU = 'UYU',
	UYI = 'UYI',
	UYW = 'UYW',
	UZS = 'UZS',
	VUV = 'VUV',
	VES = 'VES',
	VND = 'VND',
	YER = 'YER',
	ZMW = 'ZMW',
	ZWL = 'ZWL',
	XBA = 'XBA',
	XBB = 'XBB',
	XBC = 'XBC',
	XBD = 'XBD',
	XTS = 'XTS',
	XXX = 'XXX',
	XAU = 'XAU',
	XPD = 'XPD',
	XPT = 'XPT',
	XAG = 'XAG',
	AFA = 'AFA',
	FIM = 'FIM',
	ALK = 'ALK',
	ADP = 'ADP',
	ESP = 'ESP',
	FRF = 'FRF',
	AOK = 'AOK',
	AON = 'AON',
	AOR = 'AOR',
	ARA = 'ARA',
	ARP = 'ARP',
	ARY = 'ARY',
	RUR = 'RUR',
	ATS = 'ATS',
	AYM = 'AYM',
	AZM = 'AZM',
	BYB = 'BYB',
	BYR = 'BYR',
	BEC = 'BEC',
	BEF = 'BEF',
	BEL = 'BEL',
	BOP = 'BOP',
	BAD = 'BAD',
	BRB = 'BRB',
	BRC = 'BRC',
	BRE = 'BRE',
	BRN = 'BRN',
	BRR = 'BRR',
	BGJ = 'BGJ',
	BGK = 'BGK',
	BGL = 'BGL',
	BUK = 'BUK',
	HRD = 'HRD',
	CYP = 'CYP',
	CSJ = 'CSJ',
	CSK = 'CSK',
	ECS = 'ECS',
	ECV = 'ECV',
	GQE = 'GQE',
	EEK = 'EEK',
	XEU = 'XEU',
	GEK = 'GEK',
	DDM = 'DDM',
	DEM = 'DEM',
	GHC = 'GHC',
	GHP = 'GHP',
	GRD = 'GRD',
	GNE = 'GNE',
	GNS = 'GNS',
	GWE = 'GWE',
	GWP = 'GWP',
	ITL = 'ITL',
	ISJ = 'ISJ',
	IEP = 'IEP',
	ILP = 'ILP',
	ILR = 'ILR',
	LAJ = 'LAJ',
	LVL = 'LVL',
	LVR = 'LVR',
	LSM = 'LSM',
	ZAL = 'ZAL',
	LTL = 'LTL',
	LTT = 'LTT',
	LUC = 'LUC',
	LUF = 'LUF',
	LUL = 'LUL',
	MGF = 'MGF',
	MVQ = 'MVQ',
	MLF = 'MLF',
	MTL = 'MTL',
	MTP = 'MTP',
	MRO = 'MRO',
	MXP = 'MXP',
	MZE = 'MZE',
	MZM = 'MZM',
	NLG = 'NLG',
	NIC = 'NIC',
	PEH = 'PEH',
	PEI = 'PEI',
	PES = 'PES',
	PLZ = 'PLZ',
	PTE = 'PTE',
	ROK = 'ROK',
	ROL = 'ROL',
	STD = 'STD',
	CSD = 'CSD',
	SKK = 'SKK',
	SIT = 'SIT',
	RHD = 'RHD',
	ESA = 'ESA',
	ESB = 'ESB',
	SDD = 'SDD',
	SDP = 'SDP',
	SRG = 'SRG',
	CHC = 'CHC',
	TJR = 'TJR',
	TPE = 'TPE',
	TRL = 'TRL',
	TMM = 'TMM',
	UGS = 'UGS',
	UGW = 'UGW',
	UAK = 'UAK',
	SUR = 'SUR',
	USS = 'USS',
	UYN = 'UYN',
	UYP = 'UYP',
	VEB = 'VEB',
	VEF = 'VEF',
	VNC = 'VNC',
	YDD = 'YDD',
	YUD = 'YUD',
	YUM = 'YUM',
	YUN = 'YUN',
	ZRN = 'ZRN',
	ZRZ = 'ZRZ',
	ZMK = 'ZMK',
	ZWC = 'ZWC',
	ZWD = 'ZWD',
	ZWN = 'ZWN',
	ZWR = 'ZWR',
	XFO = 'XFO',
	XRE = 'XRE',
	XFU = 'XFU',
}
