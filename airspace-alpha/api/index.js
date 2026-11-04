import { gunzipSync } from 'node:zlib';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const packed = [1, 2, 3, 4]
  .map((n) => readFileSync(new URL(`./chunk${n}.txt`, import.meta.url), 'utf8'))
  .join('')
  .replace(/\s+/g, '');

const source = gunzipSync(Buffer.from(packed, 'base64')).toString('utf8');
const m = { exports: {} };
new Function('require', 'module', 'exports', source)(require, m, m.exports);
export default m.exports;
