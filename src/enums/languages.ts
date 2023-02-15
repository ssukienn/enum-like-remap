import * as http from 'http';
import {
  EnumLikeType,
  getEnumLikeTypeGuard,
  getIterable,
  getKeyIdentityEnumLike,
  getKeys,
  getReversedEnumLike,
  getValues,
  KeyEnumLikeType,
  remapEnumLike
} from '../helpers.js';

export const LANGUAGE_CODE = {
  AF: { position: 0, isoCode: 'af', value: 'Afrikaans', meta: 'Afrikaans' },
  AM: { position: 1, isoCode: 'am', value: 'Amharic', meta: 'አማርኛ' },
  AR: { position: 2, isoCode: 'ar', value: 'Arabic', meta: 'عربى' },
  AZ: {
    position: 3,
    isoCode: 'az',
    value: 'Azeerbaijani',
    meta: 'Cənubi Afrika'
  },
  BE: { position: 4, isoCode: 'be', value: 'Belarusian', meta: 'беларускі' },
  BG: { position: 5, isoCode: 'bg', value: 'Bulgarian', meta: 'български' },
  BN: { position: 6, isoCode: 'bn', value: 'Bengali', meta: 'বাঙালি' },
  BS: { position: 7, isoCode: 'bs', value: 'Bosnian', meta: 'Bosanski' },
  CA: { position: 8, isoCode: 'ca', value: 'Catalan', meta: 'Català' },
  CEB: { position: 9, isoCode: 'ceb', value: 'Cebuano', meta: 'Cebuano' },
  CO: { position: 10, isoCode: 'co', value: 'Corsican', meta: 'Corsu' },
  CS: { position: 11, isoCode: 'cs', value: 'Czech', meta: 'čeština' },
  CY: { position: 12, isoCode: 'cy', value: 'Welsh', meta: 'Cymraeg' },
  DA: { position: 13, isoCode: 'da', value: 'Danish', meta: 'dansk' },
  DE: { position: 14, isoCode: 'de', value: 'German', meta: 'Deutsch' },
  EL: { position: 15, isoCode: 'el', value: 'Greek', meta: 'Ελληνικά' },
  EN: { position: 16, isoCode: 'en', value: 'English', meta: 'English' },
  EO: { position: 17, isoCode: 'eo', value: 'Esperanto', meta: 'Esperanto' },
  ES: { position: 18, isoCode: 'es', value: 'Spanish', meta: 'Español' },
  ET: { position: 19, isoCode: 'et', value: 'Estonian', meta: 'Eesti keel' },
  EU: { position: 20, isoCode: 'eu', value: 'Basque', meta: 'Euskal' },
  FA: { position: 21, isoCode: 'fa', value: 'Persian', meta: 'فارس' },
  FI: { position: 22, isoCode: 'fi', value: 'Finnish', meta: 'Suomalainen' },
  FR: { position: 23, isoCode: 'fr', value: 'French', meta: 'français' },
  FY: { position: 24, isoCode: 'fy', value: 'Frisian', meta: 'Frysk' },
  GA: { position: 25, isoCode: 'ga', value: 'Irish', meta: 'Gaeilge' },
  GD: {
    position: 26,
    isoCode: 'gd',
    value: 'Scots Gaelic',
    meta: 'Gàidhlig na h-Alba'
  },
  GL: { position: 27, isoCode: 'gl', value: 'Galician', meta: 'Galego' },
  GU: { position: 28, isoCode: 'gu', value: 'Gujarati', meta: 'ગુજરાતી' },
  HA: { position: 29, isoCode: 'ha', value: 'Hausa', meta: 'Hausa' },
  HAw: {
    position: 30,
    isoCode: 'ha',
    value: 'Hawaiian',
    meta: 'ʻŌlelo Hawaiʻi'
  },
  HI: { position: 31, isoCode: 'hi', value: 'Hindi', meta: 'हिंदी' },
  HMn: { position: 32, isoCode: 'hm', value: 'Hmong', meta: 'Hmoob' },
  HR: { position: 33, isoCode: 'hr', value: 'Croatian', meta: 'hrvatski' },
  HT: {
    position: 34,
    isoCode: 'ht',
    value: 'Haitian Creole',
    meta: 'Kreyòl Ayisyen'
  },
  HU: { position: 35, isoCode: 'hu', value: 'Hungarian', meta: 'Magyar' },
  HY: { position: 36, isoCode: 'hy', value: 'Armenian', meta: 'Հայերեն' },
  ID: {
    position: 37,
    isoCode: 'id',
    value: 'Indonesian',
    meta: 'bahasa Indonesia'
  },
  IG: { position: 38, isoCode: 'ig', value: 'Igbo', meta: 'Igbo' },
  IS: { position: 39, isoCode: 'is', value: 'Icelandic', meta: 'Íslensku' },
  IT: { position: 40, isoCode: 'it', value: 'Italian', meta: 'italiano' },
  IW: { position: 41, isoCode: 'iw', value: 'Hebrew', meta: 'עִברִית' },
  JA: { position: 42, isoCode: 'ja', value: 'Japanese', meta: '日本語' },
  JW: { position: 43, isoCode: 'jw', value: 'Javanese', meta: 'Wong Jawa' },
  KA: { position: 44, isoCode: 'ka', value: 'Georgian', meta: 'ქართული' },
  KK: { position: 45, isoCode: 'kk', value: 'Kazakh', meta: 'Қазақша' },
  KM: { position: 46, isoCode: 'km', value: 'Khmer', meta: 'ភាសាខ្មែរ' },
  KN: { position: 47, isoCode: 'kn', value: 'Kannada', meta: 'ಕನ್ನಡ' },
  KO: { position: 48, isoCode: 'ko', value: 'Korean', meta: '한국어' },
  KU: { position: 49, isoCode: 'ku', value: 'Kurdish', meta: 'Kurdî' },
  KY: { position: 50, isoCode: 'ky', value: 'Kyrgyz', meta: 'Кыргызча' },
  LA: { position: 51, isoCode: 'la', value: 'Latin', meta: 'Latine' },
  LB: {
    position: 52,
    isoCode: 'lb',
    value: 'Luxembourgish',
    meta: 'lëtzebuergesch'
  },
  LO: { position: 53, isoCode: 'lo', value: 'Lao', meta: 'ລາວ' },
  LT: { position: 54, isoCode: 'lt', value: 'Lithuanian', meta: 'Lietuviškai' },
  LV: { position: 55, isoCode: 'lv', value: 'Latvian', meta: 'Latviešu' },
  MG: { position: 56, isoCode: 'mg', value: 'Malagasy', meta: 'Malagasy' },
  MI: { position: 57, isoCode: 'mi', value: 'Maori', meta: 'Maori' },
  MK: { position: 58, isoCode: 'mk', value: 'Macedonian', meta: 'Македонски' },
  ML: { position: 59, isoCode: 'ml', value: 'Malayalam', meta: 'മലയാളം' },
  MN: { position: 60, isoCode: 'mn', value: 'Mongolian', meta: 'Монгол хэл' },
  MR: { position: 61, isoCode: 'mr', value: 'Marathi', meta: 'मराठी' },
  MS: { position: 62, isoCode: 'ms', value: 'Malay', meta: 'Melayu' },
  MT: { position: 63, isoCode: 'mt', value: 'Maltese', meta: 'Malti' },
  MY: {
    position: 64,
    isoCode: 'my',
    value: 'Myanmar (Burmese)',
    meta: 'မြန်မာ (ဗမာ)'
  },
  NE: { position: 65, isoCode: 'ne', value: 'Nepali', meta: 'नेपाली' },
  NL: { position: 66, isoCode: 'nl', value: 'Dutch', meta: 'Nederlands' },
  NO: { position: 67, isoCode: 'no', value: 'Norwegian', meta: 'norsk' },
  NY: {
    position: 68,
    isoCode: 'ny',
    value: 'Nyanja (Chichewa)',
    meta: 'Nyanja (Chichewa)'
  },
  PA: { position: 69, isoCode: 'pa', value: 'Punjabi', meta: 'ਪੰਜਾਬੀ' },
  PL: { position: 70, isoCode: 'pl', value: 'Polish', meta: 'polski' },
  PS: { position: 71, isoCode: 'ps', value: 'Pashto', meta: 'پښتو' },
  PT: { position: 72, isoCode: 'pt', value: 'Portuguese', meta: 'Português' },
  RO: { position: 73, isoCode: 'ro', value: 'Romanian', meta: 'Română' },
  RU: { position: 74, isoCode: 'ru', value: 'Russian', meta: 'русский' },
  SD: { position: 75, isoCode: 'sd', value: 'Sindhi', meta: 'سنڌي' },
  SI: {
    position: 76,
    isoCode: 'si',
    value: 'Sinhala (Sinhalese)',
    meta: 'සිංහල (සිංහල)'
  },
  SK: { position: 77, isoCode: 'sk', value: 'Slovak', meta: 'slovenský' },
  SL: { position: 78, isoCode: 'sl', value: 'Slovenian', meta: 'Slovenščina' },
  SM: { position: 79, isoCode: 'sm', value: 'Samoan', meta: 'Samoa' },
  SN: { position: 80, isoCode: 'sn', value: 'Shona', meta: 'Shona' },
  SO: { position: 81, isoCode: 'so', value: 'Somali', meta: 'Somali' },
  SQ: { position: 82, isoCode: 'sq', value: 'Albanian', meta: 'shqiptar' },
  SR: { position: 83, isoCode: 'sr', value: 'Serbian', meta: 'Српски' },
  ST: { position: 84, isoCode: 'st', value: 'Sesotho', meta: 'Sesotho' },
  SU: { position: 85, isoCode: 'su', value: 'Sundanese', meta: 'Sunda' },
  SV: { position: 86, isoCode: 'sv', value: 'Swedish', meta: 'svenska' },
  SW: { position: 87, isoCode: 'sw', value: 'Swahili', meta: 'Kiswahili' },
  TA: { position: 88, isoCode: 'ta', value: 'Tamil', meta: 'தமிழ்' },
  TE: { position: 89, isoCode: 'te', value: 'Telugu', meta: 'తెలుగు' },
  TG: { position: 90, isoCode: 'tg', value: 'Tajik', meta: 'Тоҷикӣ' },
  TH: { position: 91, isoCode: 'th', value: 'Thai', meta: 'ไทย' },
  TL: {
    position: 92,
    isoCode: 'tl',
    value: 'Tagalog (Filipino)',
    meta: 'Tagalog (Filipino)'
  },
  TR: { position: 93, isoCode: 'tr', value: 'Turkish', meta: 'Türk' },
  UK: { position: 94, isoCode: 'uk', value: 'Ukrainian', meta: 'Українська' },
  UR: { position: 95, isoCode: 'ur', value: 'Urdu', meta: 'اردو' },
  UZ: { position: 96, isoCode: 'uz', value: 'Uzbek', meta: 'O&apos;zbek' },
  VI: { position: 97, isoCode: 'vi', value: 'Vietnamese', meta: 'Tiếng Việt' },
  XH: { position: 98, isoCode: 'xh', value: 'Xhosa', meta: 'IsiXhosa' },
  YI: { position: 99, isoCode: 'yi', value: 'Yiddish', meta: 'ייִדיש' },
  YO: { position: 100, isoCode: 'yo', value: 'Yoruba', meta: 'Yorùbá' },
  ZH_CN: {
    position: 101,
    isoCode: 'zh-CN',
    value: 'Chinese (Simplified)',
    meta: '中文'
  },
  ZH_TW: {
    position: 102,
    isoCode: 'zh-TW',
    value: 'Chinese (Traditional)',
    meta: '中文'
  },
  ZU: { position: 103, isoCode: 'zu', value: 'Zulu', meta: 'Zulu' }
} as const satisfies Record<
  string,
  { position: number; isoCode: string; value: string; meta: string }
>;

export const LANGUAGE_CODE_KEY = getKeyIdentityEnumLike(LANGUAGE_CODE);
LANGUAGE_CODE_KEY.PL;
export type LANGUAGE_CODE_KEY = KeyEnumLikeType<typeof LANGUAGE_CODE>;

export type LANGUAGE_CODE = EnumLikeType<typeof LANGUAGE_CODE>;

export const languagesIterable = getIterable(LANGUAGE_CODE);
export const languages = getValues(LANGUAGE_CODE);
export const languageKeys = getKeys(LANGUAGE_CODE);
export const languageGuard = getEnumLikeTypeGuard(LANGUAGE_CODE);

export const LANGUAGE_CODE_REVERSED = getReversedEnumLike(LANGUAGE_CODE);

export const prop1ToProp2 = remapEnumLike(LANGUAGE_CODE, 'isoCode', 'meta');
const prop1ToProp2PL: 'polski' = prop1ToProp2.pl;

export const prop2ToProp1 = remapEnumLike(LANGUAGE_CODE, 'meta', 'isoCode');
const prop2ToProp1PL: 'pl' = prop2ToProp1.polski;

export const prop1ToProp1 = remapEnumLike(LANGUAGE_CODE, 'isoCode', 'isoCode');
const prop1ToProp1PL: 'pl' = prop1ToProp1.pl;

export const keyToProp = remapEnumLike(LANGUAGE_CODE, '$$key', 'isoCode');
const keyToPropPL: 'pl' = keyToProp.PL;

export const propToKey = remapEnumLike(LANGUAGE_CODE, 'isoCode', '$$key');
const propToKeyPL: 'PL' = propToKey.pl;

export const keyToKey = remapEnumLike(LANGUAGE_CODE, '$$key', '$$key');
const keyToKeyPL: 'PL' = keyToKey.PL;

export const keyToKeyGuard = getEnumLikeTypeGuard(keyToKey);
export const prop1ToProp2Guard = getEnumLikeTypeGuard(prop1ToProp2);
const maybeKey: unknown = '';

if (keyToKeyGuard(maybeKey)) {
  maybeKey === 'PL';
}
if (prop1ToProp2Guard(maybeKey)) {
  maybeKey === 'polski';
}

type CompoundRecord<T> = Record<
  keyof T,
  Record<keyof T[keyof T], T[keyof T][keyof T[keyof T]]>
>;

const Props = {
  key1: { foo: 'foo1', bar: 'bar1' },
  key2: { foo: 'foo2', bar: 'bar2' }
} as const;
type PropsType = typeof Props;
type Key<T> = 'key' | keyof T[keyof T];
type PropsKey = Key<PropsType>;

type Condition<
  T extends CompoundRecord<any>,
  IKey extends Key<T>,
  OKey extends Key<T>
> = IKey extends 'key'
  ? OKey extends 'key'
    ? { [K in keyof T]: K }
    : {
        [K in keyof T]: T[K][OKey];
      }
  : OKey extends 'key'
  ? {
      [K in keyof T as T[K][IKey]]: K;
    }
  : {
      [K in keyof T as T[K][IKey]]: T[K][OKey];
    };

let _keyToKey: Condition<PropsType, 'key', 'key'> = {
  key1: 'key1',
  key2: 'key2'
};
const _keyToA: Condition<PropsType, 'key', 'foo'> = {
  key1: 'foo1',
  key2: 'foo2'
};
const _AtoKey: Condition<PropsType, 'foo', 'key'> = {
  foo1: 'key1',
  foo2: 'key2'
};
const _AtoB: Condition<PropsType, 'foo', 'bar'> = {
  foo1: 'bar1',
  foo2: 'bar2'
};
