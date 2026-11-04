import { gunzipSync } from 'node:zlib';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const names = ['chunk1a.txt', 'chunk1b.txt', 'chunk2.txt', 'chunk3.txt', 'chunk4.txt'];
const packed = names
  .map((name) => readFileSync(new URL(`./${name}`, import.meta.url), 'utf8'))
  .join('')
  .replace(/\s+/g, '');

let source = gunzipSync(Buffer.from(packed, 'base64')).toString('utf8');
source = source.replace(
  'export default async function main(req,res){',
  'async function main(req,res){'
);
source += '\nmodule.exports = main;\n';

const m = { exports: {} };
new Function('require', 'module', 'exports', source)(require, m, m.exports);
export default m.exports;
