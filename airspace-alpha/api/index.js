import { gunzipSync } from 'node:zlib';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { put } from '@vercel/blob';

const require = createRequire(import.meta.url);
const names = ['chunk1a.txt', 'chunk1b1.txt', 'chunk1b2.txt', 'chunk2.txt', 'chunk3a.txt', 'chunk3b.txt', 'chunk4.txt'];
const packed = names
  .map((name) => readFileSync(new URL(`./${name}`, import.meta.url), 'utf8'))
  .join('')
  .replace(/\s+/g, '');

let source = gunzipSync(Buffer.from(packed, 'base64')).toString('utf8');
source = source
  .replace("const { put } = require('@vercel/blob');", 'const put = __put;')
  .replace(
    'export default async function main(req,res){',
    'async function main(req,res){'
  );
source += '\nmodule.exports = { main, ASSETS };\n';

const m = { exports: {} };
new Function('require', 'module', 'exports', '__put', source)(require, m, m.exports, put);

const originalLeadCatch = [
  "  } catch (error) {",
  "    status.className='form-status error'; status.textContent = `${error.message} Please try again.`;",
  "  } finally { submit.disabled=false; submit.textContent='REQUEST ACCESS'; }"
].join('\n');

const fallbackLeadCatch = [
  "  } catch (error) {",
  "    const subject = encodeURIComponent(`Airspace Alpha ${payload.plan === 'desk' ? 'Alpha Desk' : 'Pro'} access — ${payload.company || payload.name}`);",
  "    const body = encodeURIComponent(`Name: ${payload.name}\\nEmail: ${payload.email}\\nCompany: ${payload.company || ''}\\nUse case: ${payload.useCase || ''}\\nPlan: ${payload.plan}\\n\\nSent from AirspaceAlpha.com`);",
  "    const mail = `mailto:lc@federal.ai?subject=${subject}&body=${body}`;",
  "    status.className='form-status error';",
  "    status.innerHTML = `Secure lead storage is temporarily unavailable. <a href=\"${mail}\">Email LloydPilot directly</a>.`;",
  "  } finally { submit.disabled=false; submit.textContent='REQUEST ACCESS'; }"
].join('\n');

const appJsRaw = gunzipSync(Buffer.from(m.exports.ASSETS['/app.js'], 'base64')).toString('utf8');
const appJs = appJsRaw.replace(originalLeadCatch, fallbackLeadCatch);

export default async function handler(req, res) {
  const raw = String(req.query?.path ?? '').replace(/^\/+|\/+$/g, '');
  const path = raw ? '/' + raw : '/';
  if (path === '/app.js') {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    return res.status(200).send(appJs);
  }
  return m.exports.main(req, res);
}
