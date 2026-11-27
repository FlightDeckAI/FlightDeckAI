import { readFileSync } from 'node:fs';

const atlasTypes = new Map([
  ['html', 'text/html; charset=utf-8'], ['js', 'text/javascript; charset=utf-8'],
  ['css', 'text/css; charset=utf-8'], ['webp', 'image/webp'], ['svg', 'image/svg+xml'],
  ['json', 'application/json'], ['png', 'image/png'], ['woff2', 'font/woff2']
]);

export default function handler(req, res) {
  const file = req.query?.asset ?? 'index.html';
  if (typeof file !== 'string') return res.status(404).end();
  const type = atlasTypes.get(file.split('.').at(-1));
  if (!type || !/^[a-z0-9_-]+\.[a-z0-9]+$/i.test(file)) {
    return res.status(404).end();
  }
  let content;
  try {
    content = readFileSync(new URL('../atlas/' + file, import.meta.url));
  } catch (error) {
    if (error.code === 'ENOENT') return res.status(404).end();
    throw error;
  }
  if (file === 'index.html') {
    content = content.toString('utf8').replace(/<head(?:\s[^>]*)?>/i, head => head + '<base href="/atlas/">');
  }
  res.setHeader('Content-Type', type);
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  return res.status(200).send(content);
}
