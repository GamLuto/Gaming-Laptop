// Serveur web : sert l'interface (dossier public/) et l'API /api/search.
// Aucune clé, aucun compte, aucun secret : rien à configurer.
const http = require('http');
const fs = require('fs');
const path = require('path');

const { loadAll, search } = require('./src/search');
const { DEFAULTS } = require('./src/config');
const catalog = require('./src/sources/catalog');

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.ico': 'image/x-icon'
};

function json(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(data));
}

function sendStatic(res, rel) {
  const type = TYPES[path.extname(rel)] || 'application/octet-stream';
  if (global.__PUB) { // version "un seul fichier" : les pages sont intégrées au code
    const body = global.__PUB[rel];
    if (body === undefined) { res.writeHead(404); return res.end('Introuvable'); }
    res.writeHead(200, { 'Content-Type': type });
    return res.end(body);
  }
  const full = path.normalize(path.join(PUBLIC, rel));
  if (!full.startsWith(PUBLIC)) { res.writeHead(403); return res.end('Interdit'); }
  fs.readFile(full, (err, buf) => {
    if (err) { res.writeHead(404); return res.end('Introuvable'); }
    res.writeHead(200, { 'Content-Type': type });
    res.end(buf);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api/search') {
    try {
      const data = await loadAll();
      const result = search(data.listings, Object.fromEntries(url.searchParams));
      return json(res, 200, { ...result, defaults: DEFAULTS, priceDate: catalog.builtinDate });
    } catch (e) {
      return json(res, 500, { error: e.message });
    }
  }

  sendStatic(res, url.pathname === '/' ? '/index.html' : url.pathname);
});

server.listen(PORT, () => {
  console.log(`\n  Appli prête → http://localhost:${PORT}\n`);
});
