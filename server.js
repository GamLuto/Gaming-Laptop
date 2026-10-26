// Fichier généré par build-single.js : ne pas modifier à la main.
global.__PUB = {"/app.js":"(function () {\n  'use strict';\n  const TABS = [['neuf', 'Neuf'], ['occasion', 'Occasion'], ['reconditionne', 'Reconditionné'], ['bonsplans', '🔥 Bons plans']];\n  const BRANDS = ['Lenovo', 'ASUS', 'MSI', 'Acer', 'HP', 'Gigabyte', 'Dell', 'Alienware', 'Razer'];\n  const DEFAULT_CRIT = { budget: 1800, minGpuScore: 66, minVram: 0, minRam: 16, minSsd: 512, minCpuTier: 0, minRefresh: 0, screen: '', resolution: '', panel: '', onlyReliable: false, brands: [] };\n  const LEVEL_TXT = { great: 'Très bien', good: 'Bien', ok: 'Correct', warn: 'Limite', bad: 'Difficile' };\n\n  let crit = load();\n  let state = { category: 'neuf', sort: 'recommended', q: '', page: 1, loading: false, done: false, token: 0, meta: null, gpuOptions: [] };\n  const $ = (id) => document.getElementById(id);\n\n  function load() {\n    try { const s = JSON.parse(localStorage.getItem('crit') || 'null'); if (s && typeof s === 'object') return Object.assign({}, DEFAULT_CRIT, s); } catch (e) { /* ignore */ }\n    return Object.assign({}, DEFAULT_CRIT);\n  }\n  function save() { try { localStorage.setItem('crit', JSON.stringify(crit)); } catch (e) { /* ignore */ } }\n\n  function h(tag, attrs, ...kids) {\n    const el = document.createElement(tag);\n    for (const k in (attrs || {})) {\n      const v = attrs[k];\n      if (v === false || v == null) continue;\n      if (k === 'class') el.className = v;\n      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);\n      else el.setAttribute(k, v === true ? '' : v);\n    }\n    for (const c of kids.flat()) if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(String(c)));\n    return el;\n  }\n  const svgNS = 'http://www.w3.org/2000/svg';\n  function s(tag, attrs, text) {\n    const el = document.createElementNS(svgNS, tag);\n    for (const k in attrs) el.setAttribute(k, attrs[k]);\n    if (text != null) el.textContent = text;\n    return el;\n  }\n  const euro = (n) => Math.round(n).toLocaleString('fr-FR') + ' €';\n  const safeUrl = (u) => /^https:\\/\\//i.test(u || '') ? u : '#';\n\n  function params(extra) {\n    const p = new URLSearchParams();\n    p.set('maxPrice', crit.budget); p.set('minGpuScore', crit.minGpuScore); p.set('minVram', crit.minVram);\n    p.set('minRam', crit.minRam); p.set('minSsd', crit.minSsd); p.set('minCpuTier', crit.minCpuTier); p.set('minRefresh', crit.minRefresh);\n    if (crit.screen) p.set('screen', crit.screen);\n    if (crit.resolution) p.set('resolution', crit.resolution);\n    if (crit.panel) p.set('panel', crit.panel);\n    if (crit.onlyReliable) p.set('onlyReliable', '1');\n    if (crit.brands.length) p.set('brands', crit.brands.join(','));\n    for (const k in extra) p.set(k, extra[k]);\n    return p;\n  }\n\n  // ---------- Illustration SVG (dessin original, pas une photo) ----------\n  function accent(title) {\n    const t = title.toLowerCase();\n    if (/rog|zephyrus|strix|tuf|asus/.test(t)) return '#e5383b';\n    if (/legion|loq|lenovo/.test(t)) return '#3b82f6';\n    if (/msi|raider|vector|katana|cyborg|titan|stealth/.test(t)) return '#ef4444';\n    if (/predator|nitro|acer/.test(t)) return '#22c3d6';\n    if (/omen|victus|hp/.test(t)) return '#a855f7';\n    if (/alienware|dell/.test(t)) return '#14b8a6';\n    if (/aorus|gigabyte|aero/.test(t)) return '#f59e0b';\n    if (/razer/.test(t)) return '#22c55e';\n    return '#6c8cff';\n  }\n  function illustration(l) {\n    const c = accent(l.title);\n    const svg = s('svg', { viewBox: '0 0 320 190', role: 'img', 'aria-label': 'Illustration ' + l.title });\n    svg.append(s('rect', { x: 60, y: 14, width: 200, height: 118, rx: 8, fill: '#0b0d18', stroke: '#3a4066', 'stroke-width': 3 }));\n    svg.append(s('rect', { x: 68, y: 22, width: 184, height: 102, rx: 4, fill: c, opacity: 0.22 }));\n    svg.append(s('path', { d: 'M68 124 L120 60 L160 100 L190 70 L252 124 Z', fill: c, opacity: 0.45 }));\n    svg.append(s('text', { x: 160, y: 56, 'text-anchor': 'middle', fill: '#fff', 'font-size': 20, 'font-weight': 800, 'font-family': 'sans-serif' }, l.specs.gpu || 'GPU'));\n    svg.append(s('text', { x: 160, y: 80, 'text-anchor': 'middle', fill: '#ffffffcc', 'font-size': 12, 'font-family': 'sans-serif' }, l.brand || ''));\n    svg.append(s('path', { d: 'M30 140 H290 L276 164 Q274 168 268 168 H52 Q46 168 44 164 Z', fill: '#2a2f4d', stroke: '#3a4066', 'stroke-width': 2 }));\n    svg.append(s('rect', { x: 132, y: 146, width: 56, height: 8, rx: 4, fill: '#161a30' }));\n    svg.append(s('rect', { x: 40, y: 140, width: 240, height: 3, fill: c }));\n    return svg;\n  }\n\n  // ---------- Cartes ----------\n  function gamesTable(games, note) {\n    const t = h('table', { class: 'games' });\n    for (const g of games) {\n      t.append(h('tr', null,\n        h('td', null, h('span', { class: 'dot ' + g.level }), g.name),\n        h('td', null, g.text, g.note ? h('div', { class: 'note' }, g.note) : null)));\n    }\n    return h('div', null, t, h('div', { class: 'note' }, note));\n  }\n  function card(l, ideal, disclaimer) {\n    const a = h('div', { class: 'art' }, illustration(l), h('span', { class: 'badge' }, 'Illustration'));\n    if (l.price <= ideal && !l.isDeal) a.append(h('span', { class: 'badge ideal' }, '👍 Bon prix'));\n    if (l.isDeal) a.append(h('span', { class: 'badge ideal' }, '🔥 Bon plan'));\n    const links = h('div', { class: 'links' },\n      h('a', { class: 'alt', href: safeUrl(l.photoUrl), target: '_blank', rel: 'noopener noreferrer' }, '📷 Voir des photos'));\n    for (const k of l.links || []) links.append(h('a', { href: safeUrl(k.url), target: '_blank', rel: 'noopener noreferrer' }, k.label));\n    return h('article', { class: 'card' }, a, h('div', { class: 'body' },\n      h('p', { class: 'title' }, l.title),\n      h('div', { class: 'price' }, (l.approx ? '≈ ' : '') + euro(l.price), ' ', h('small', null, l.source || '')),\n      h('div', { class: 'note' }, l.priceNote || ''),\n      h('div', { class: 'scores' },\n        h('span', { class: 'pill' }, 'Perf ' + l.scores.perf), h('span', { class: 'pill' }, 'Fiabilité ' + l.scores.reliability),\n        h('span', { class: 'pill' }, 'Global ' + l.scores.global), l.vram ? h('span', { class: 'pill' }, l.vram + ' Go VRAM') : null),\n      h('p', { class: 'sum' }, l.summary),\n      h('ul', { class: 'pros' }, l.pros.map((x) => h('li', null, x))),\n      h('ul', { class: 'cons' }, l.cons.map((x) => h('li', null, x))),\n      l.games && l.games.length ? h('details', null, h('summary', null, 'Ce que ça donne en jeu (estimation)'), gamesTable(l.games, disclaimer)) : null,\n      links));\n  }\n\n  // ---------- Liste + défilement infini ----------\n  const DISCLAIMER = 'Estimations qualitatives (ultra, ~60 images/s), pas des mesures. Les résultats réels varient selon les réglages, le DLSS et le modèle exact.';\n  async function fetchJson(url, opts) {\n    const r = await fetch(url, opts);\n    const data = await r.json().catch(() => ({}));\n    if (!r.ok && !data.error && !data.message) data.error = 'Erreur ' + r.status;\n    return data;\n  }\n  async function loadPage(reset) {\n    if (state.loading || (state.done && !reset)) return;\n    if (reset) { state.page = 1; state.done = false; state.token++; $('list').replaceChildren(); $('flash').replaceChildren(); }\n    state.loading = true;\n    const tk = state.token;\n    $('status').textContent = 'Chargement…';\n    try {\n      const data = await fetchJson('/api/search?' + params({ category: state.category, sort: state.sort, q: state.q, page: state.page, limit: 10 }));\n      if (tk !== state.token) return;\n      if (data.error) throw new Error(data.error);\n      state.meta = data.meta; state.gpuOptions = data.gpuOptions || [];\n      renderInfo();\n      if (state.page === 1 && data.flash) renderFlash(data.flash, data.total);\n      for (const l of data.items) $('list').append(card(l, data.ideal, DISCLAIMER));\n      if (state.page * data.limit >= data.total) state.done = true; else state.page++;\n      $('status').textContent = data.total === 0\n        ? (state.category === 'bonsplans' ? 'Aucune offre vérifiée pour le moment. Utilise les liens ci-dessus pour voir les ventes en cours.' : 'Aucun modèle ne correspond. Assouplis tes critères dans ⚙️ Paramètres.')\n        : state.done ? data.total + ' modèle(s) — fin de la liste' : '';\n    } catch (e) {\n      $('status').textContent = 'Erreur de chargement. Réessaie dans un instant.';\n    } finally { if (tk === state.token) state.loading = false; }\n  }\n  function renderFlash(links, total) {\n    const box = h('div', { class: 'flash' },\n      h('b', null, 'Ventes privées et offres flash'),\n      h('p', { class: 'note' }, 'Ces sites changent chaque jour. Je ne peux pas lire leurs offres en direct (Veepee et Showroomprivé demandent un compte) : ouvre-les et cherche « informatique » ou « gaming ». ' + (total ? '' : 'Aucune offre vérifiée n’est enregistrée dans le catalogue.')));\n    for (const k of links) box.append(h('a', { href: safeUrl(k.url), target: '_blank', rel: 'noopener noreferrer' }, h('b', null, k.label), h('span', null, k.note || '')));\n    $('flash').append(box);\n  }\n  function renderInfo() {\n    const m = state.meta; const el = $('info'); el.replaceChildren();\n    if (!m) return;\n    el.append(h('span', null, 'Catalogue du ' + m.updatedAt + ' · prix indicatifs, vérifie en boutique.'));\n    if (m.refreshable) el.append(h('button', { class: 'btn', type: 'button', onclick: doRefresh }, '🔄 Rafraîchir'));\n    if (m.lastError) el.append(h('span', null, '⚠️ ' + m.lastError));\n  }\n  async function doRefresh(ev) {\n    const b = ev.currentTarget; b.disabled = true; b.textContent = 'Mise à jour…';\n    const r = await fetchJson('/api/refresh', { method: 'POST' }).catch(() => ({ error: 'Réseau indisponible' }));\n    if (r.meta) state.meta = r.meta;\n    renderInfo(); loadPage(true);\n    if (!r.ok) $('status').textContent = r.message || r.error || 'Mise à jour impossible pour le moment.';\n  }\n\n  // ---------- Paramètres ----------\n  let draft = null; let anTimer = null;\n  function sel(id, label, options, value, onChange) {\n    const s2 = h('select', { id }, options.map(([v, t]) => h('option', { value: String(v) }, t)));\n    s2.value = String(value);\n    s2.addEventListener('change', () => onChange(s2.value));\n    return h('div', { class: 'field' }, h('label', { for: id }, label), s2);\n  }\n  async function openSettings() {\n    draft = Object.assign({}, crit, { brands: crit.brands.slice() });\n    $('overlay').hidden = false; document.body.style.overflow = 'hidden';\n    renderSettings(true);\n  }\n  function closeSettings() { $('overlay').hidden = true; document.body.style.overflow = ''; }\n  async function renderSettings(refreshAdvice) {\n    const body = $('sheetBody'); const keep = body.scrollTop;\n    const gpuOpts = (state.gpuOptions.length ? state.gpuOptions : [{ score: 66, label: 'RTX 5060 ou mieux' }]).map((o) => [o.score, o.label]);\n    const budgetInput = h('input', { type: 'number', inputmode: 'numeric', min: 500, max: 6000, step: 50, value: draft.budget, id: 'budget' });\n    const range = h('input', { type: 'range', min: 500, max: 6000, step: 50, value: draft.budget, 'aria-label': 'Budget' });\n    const setBudget = (v) => { draft.budget = Math.max(300, Math.min(8000, Number(v) || 1800)); budgetInput.value = draft.budget; range.value = draft.budget; };\n    range.addEventListener('input', () => { setBudget(range.value); });\n    range.addEventListener('change', () => renderSettings(true));\n    budgetInput.addEventListener('change', () => { setBudget(budgetInput.value); renderSettings(true); });\n    const adviceBox = h('div', { id: 'advice' });\n    const brandBox = h('div', { class: 'checks' }, BRANDS.map((b) => {\n      const cb = h('input', { type: 'checkbox', checked: draft.brands.includes(b.toLowerCase()) });\n      cb.addEventListener('change', () => {\n        draft.brands = draft.brands.filter((x) => x !== b.toLowerCase());\n        if (cb.checked) draft.brands.push(b.toLowerCase());\n        scheduleAnalysis();\n      });\n      return h('label', null, cb, ' ' + b);\n    }));\n    const rel = h('input', { type: 'checkbox', checked: draft.onlyReliable });\n    rel.addEventListener('change', () => { draft.onlyReliable = rel.checked; scheduleAnalysis(); });\n    const set = (k, num) => (v) => { draft[k] = num ? Number(v) : v; scheduleAnalysis(); };\n\n    body.replaceChildren(\n      h('h3', null, '1. Mon budget'),\n      h('div', { class: 'field' }, h('label', { for: 'budget' }, 'Budget maximum (€)'), budgetInput, range),\n      adviceBox,\n      h('h3', null, '2. Ma configuration en détail'),\n      sel('gpu', 'Carte graphique', gpuOpts, draft.minGpuScore, set('minGpuScore', true)),\n      h('div', { class: 'grid2' },\n        sel('vram', 'Mémoire vidéo (VRAM)', [[0, 'Peu importe'], [8, '8 Go ou +'], [12, '12 Go ou +'], [16, '16 Go ou +']], draft.minVram, set('minVram', true)),\n        sel('ram', 'RAM', [[16, '16 Go'], [24, '24 Go'], [32, '32 Go'], [64, '64 Go']], draft.minRam, set('minRam', true)),\n        sel('ssd', 'Stockage SSD', [[512, '512 Go'], [1000, '1 To'], [2000, '2 To']], draft.minSsd, set('minSsd', true)),\n        sel('cpu', 'Processeur', [[0, 'Peu importe'], [1, 'i5 / Ryzen 5 +'], [2, 'i7 / Ryzen 7 +'], [3, 'i9 / Ryzen 9']], draft.minCpuTier, set('minCpuTier', true)),\n        sel('hz', 'Fréquence écran', [[0, 'Peu importe'], [144, '144 Hz +'], [165, '165 Hz +'], [240, '240 Hz +']], draft.minRefresh, set('minRefresh', true)),\n        sel('scr', 'Taille écran', [['', 'Peu importe'], ['compact', '15,6\" ou moins'], ['16', '16\"'], ['large', '17\" et plus']], draft.screen, set('screen')),\n        sel('res', 'Définition', [['', 'Peu importe'], ['qhd', 'QHD / 4K']], draft.resolution, set('resolution')),\n        sel('pan', 'Dalle', [['', 'Peu importe'], ['premium', 'OLED / Mini-LED']], draft.panel, set('panel'))),\n      h('div', { class: 'field' }, h('label', null, rel, ' Seulement les gammes réputées fiables (refroidissement, durabilité)')),\n      h('div', { class: 'field' }, h('label', null, 'Marques (aucune cochée = toutes)'), brandBox),\n      h('h3', null, '3. Ce que ça donne'),\n      h('div', { id: 'analysis' }, 'Analyse…'));\n    body.scrollTop = keep;\n    if (refreshAdvice) loadAdvice(); else adviceBox.append();\n    scheduleAnalysis(0);\n  }\n  async function loadAdvice() {\n    const box = $('advice'); if (!box) return;\n    const a = await fetchJson('/api/advise?budget=' + draft.budget).catch(() => null);\n    if (!a || !$('advice')) return;\n    box.replaceChildren(h('p', { class: 'note' }, 'Configurations réalistes pour ' + euro(a.budget) + ' (touche-en une pour la remplir) :'));\n    for (const p of a.presets) {\n      box.append(h('button', { class: 'preset' + (p.recommended ? ' rec' : ''), type: 'button', onclick: () => applyPreset(p) },\n        h('b', null, p.label + (p.recommended ? ' ⭐ conseillée' : '') + ' — ' + p.gpu),\n        h('span', { class: 'note' }, 'Environ ' + euro(p.priceRange[0]) + ' à ' + euro(p.priceRange[1]) + ' (neuf) · ' + p.life)));\n    }\n    for (const w of a.warnings) box.append(h('div', { class: 'warn-box' }, w));\n    if (a.tip) box.append(h('p', { class: 'note' }, '💡 ' + a.tip));\n  }\n  function applyPreset(p) {\n    const c = p.criteria;\n    draft = Object.assign({}, draft, c, { onlyReliable: !!c.onlyReliable, brands: draft.brands });\n    renderSettings(false);\n  }\n  function scheduleAnalysis(delay) {\n    clearTimeout(anTimer);\n    anTimer = setTimeout(runAnalysis, delay == null ? 350 : delay);\n  }\n  async function runAnalysis() {\n    const box = $('analysis'); if (!box || !draft) return;\n    const p = new URLSearchParams({ budget: draft.budget, minGpuScore: draft.minGpuScore, minVram: draft.minVram, minRam: draft.minRam, minSsd: draft.minSsd, minCpuTier: draft.minCpuTier, minRefresh: draft.minRefresh, screen: draft.screen, resolution: draft.resolution, panel: draft.panel });\n    if (draft.onlyReliable) p.set('onlyReliable', '1');\n    if (draft.brands.length) p.set('brands', draft.brands.join(','));\n    const a = await fetchJson('/api/analyze?' + p).catch(() => null);\n    const cur = $('analysis'); if (!a || !a.criteria || !cur) return;\n    cur.replaceChildren(\n      h('div', { class: 'scores' }, a.summary.map((x) => h('span', { class: 'pill' }, x))),\n      h('div', { class: 'verdict ' + a.verdict.level }, a.verdict.text),\n      a.price.extras.length ? h('p', { class: 'note' }, 'Suppléments pris en compte : ' + a.price.extras.join(', ') + '.') : null,\n      h('p', null, '⏳ Durée de vie estimée : ', a.lifespan),\n      h('p', { class: 'note' }, 'Modèles du catalogue qui correspondent : ' + a.matches.neuf + ' neufs, ' + a.matches.reconditionne + ' reconditionnés, ' + a.matches.occasion + ' occasions.'),\n      h('h3', null, 'Points positifs'), h('ul', { class: 'pros' }, a.pros.map((x) => h('li', null, x))),\n      h('h3', null, 'Points négatifs'), h('ul', { class: 'cons' }, a.cons.map((x) => h('li', null, x))),\n      h('h3', null, 'Gros jeux en ' + a.resolution), gamesTable(a.games, a.disclaimer));\n  }\n  function applySettings() { crit = Object.assign({}, draft); save(); closeSettings(); loadPage(true); }\n  function resetSettings() { draft = Object.assign({}, DEFAULT_CRIT, { brands: [] }); renderSettings(true); }\n\n  // ---------- Démarrage ----------\n  TABS.forEach(([id, label]) => {\n    $('tabs').append(h('button', { class: 'tab', type: 'button', role: 'tab', 'data-id': id, 'aria-selected': String(id === state.category),\n      onclick: (e) => {\n        state.category = id;\n        document.querySelectorAll('.tab').forEach((t) => t.setAttribute('aria-selected', String(t === e.currentTarget)));\n        loadPage(true);\n      } }, label));\n  });\n  $('sort').addEventListener('change', (e) => { state.sort = e.target.value; loadPage(true); });\n  let qT; $('q').addEventListener('input', (e) => { clearTimeout(qT); qT = setTimeout(() => { state.q = e.target.value.trim(); loadPage(true); }, 300); });\n  $('btnSettings').addEventListener('click', openSettings);\n  $('btnClose').addEventListener('click', closeSettings);\n  $('btnApply').addEventListener('click', applySettings);\n  $('btnReset').addEventListener('click', resetSettings);\n  $('overlay').addEventListener('click', (e) => { if (e.target === $('overlay')) closeSettings(); });\n  if ('IntersectionObserver' in window) new IntersectionObserver((en) => { if (en[0].isIntersecting) loadPage(false); }, { rootMargin: '400px' }).observe($('sentinel'));\n  loadPage(true);\n})();\n","/index.html":"<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<meta name=\"theme-color\" content=\"#0f1220\">\n<title>Trouve ton PC portable gaming</title>\n<link rel=\"stylesheet\" href=\"/style.css\">\n</head>\n<body>\n<header class=\"top\">\n  <div class=\"row\">\n    <h1>🎮 PC portable gaming</h1>\n    <button id=\"btnSettings\" class=\"btn primary\" type=\"button\">⚙️ Paramètres</button>\n  </div>\n  <nav id=\"tabs\" class=\"tabs\" role=\"tablist\"></nav>\n  <div class=\"row\">\n    <input id=\"q\" type=\"search\" placeholder=\"Rechercher un modèle (ex. Legion, ROG…)\" aria-label=\"Recherche\">\n    <select id=\"sort\" aria-label=\"Tri\">\n      <option value=\"recommended\">Recommandés</option>\n      <option value=\"price_asc\">Prix croissant</option>\n      <option value=\"price_desc\">Prix décroissant</option>\n      <option value=\"perf\">Performance</option>\n      <option value=\"reliability\">Fiabilité</option>\n      <option value=\"value\">Rapport qualité/prix</option>\n    </select>\n  </div>\n  <div id=\"info\" class=\"info\"></div>\n</header>\n\n<main>\n  <div id=\"flash\"></div>\n  <div id=\"list\"></div>\n  <div id=\"status\" class=\"status\"></div>\n  <div id=\"sentinel\"></div>\n</main>\n\n<div id=\"overlay\" class=\"overlay\" hidden>\n  <div class=\"sheet\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Paramètres\">\n    <div class=\"sheet-head\"><h2>⚙️ Paramètres</h2><button id=\"btnClose\" class=\"btn\" type=\"button\">Fermer</button></div>\n    <div class=\"sheet-body\" id=\"sheetBody\"></div>\n    <div class=\"sheet-actions\">\n      <button id=\"btnReset\" class=\"btn\" type=\"button\">Réinitialiser</button>\n      <button id=\"btnApply\" class=\"btn primary\" type=\"button\">Appliquer</button>\n    </div>\n  </div>\n</div>\n<script src=\"/app.js\"></script>\n</body>\n</html>\n","/style.css":":root{--bg:#0f1220;--card:#181c30;--card2:#20253d;--text:#e9ecf8;--muted:#9aa2c4;--accent:#6c8cff;--good:#2ecc8f;--ok:#f0b429;--bad:#ef5b6b;--line:#2b3150}\n*{box-sizing:border-box}\nbody{margin:0;background:var(--bg);color:var(--text);font:16px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}\n.top{position:sticky;top:0;z-index:5;background:var(--bg);padding:10px 12px 6px;border-bottom:1px solid var(--line)}\n.row{display:flex;gap:8px;align-items:center;justify-content:space-between;margin-bottom:8px}\nh1{font-size:1.1rem;margin:0}\nh2{font-size:1.15rem;margin:0}\nh3{font-size:1rem;margin:14px 0 6px}\n.tabs{display:flex;gap:6px;overflow-x:auto;margin-bottom:8px}\n.tab{flex:1 0 auto;padding:8px 12px;border-radius:999px;border:1px solid var(--line);background:var(--card);color:var(--text);font-size:.9rem;cursor:pointer}\n.tab[aria-selected=true]{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:600}\ninput,select{background:var(--card);color:var(--text);border:1px solid var(--line);border-radius:10px;padding:9px 10px;font-size:1rem;min-width:0}\ninput[type=search]{flex:1}\n.btn{background:var(--card2);color:var(--text);border:1px solid var(--line);border-radius:10px;padding:9px 12px;font-size:.95rem;cursor:pointer}\n.btn.primary{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:600}\n.btn[disabled]{opacity:.5}\n.info{font-size:.78rem;color:var(--muted);display:flex;gap:8px;align-items:center;flex-wrap:wrap}\nmain{padding:12px;max-width:760px;margin:0 auto}\n.card{background:var(--card);border:1px solid var(--line);border-radius:14px;margin-bottom:14px;overflow:hidden}\n.card .body{padding:12px}\n.art{background:linear-gradient(135deg,var(--card2),var(--card));position:relative}\n.art svg{display:block;width:100%;height:auto;max-height:190px}\n.badge{position:absolute;top:8px;left:8px;font-size:.7rem;background:#0008;color:var(--muted);padding:2px 8px;border-radius:999px}\n.badge.ideal{left:auto;right:8px;background:var(--good);color:#04251a;font-weight:700}\n.title{font-weight:650;font-size:1rem;margin:0 0 4px}\n.price{font-size:1.4rem;font-weight:800}\n.price small{font-size:.75rem;color:var(--muted);font-weight:400}\n.sum{color:var(--muted);font-size:.9rem;margin:6px 0}\n.scores{display:flex;gap:6px;margin:8px 0;flex-wrap:wrap}\n.pill{font-size:.78rem;border:1px solid var(--line);border-radius:999px;padding:2px 9px;background:var(--card2)}\nul.pros,ul.cons{margin:6px 0;padding-left:0;list-style:none;font-size:.9rem}\nul.pros li::before{content:\"✅ \"}\nul.cons li::before{content:\"⚠️ \"}\n.links{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}\n.links a{font-size:.85rem;color:#fff;background:var(--accent);text-decoration:none;padding:7px 11px;border-radius:9px}\n.links a.alt{background:var(--card2);border:1px solid var(--line);color:var(--text)}\ndetails{margin-top:10px;border-top:1px solid var(--line);padding-top:8px}\nsummary{cursor:pointer;font-weight:600;font-size:.92rem}\ntable.games{width:100%;border-collapse:collapse;font-size:.85rem;margin-top:6px}\n.games td{padding:5px 4px;border-bottom:1px solid var(--line);vertical-align:top}\n.dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px}\n.great,.good{background:var(--good)}.ok{background:var(--ok)}.warn,.bad{background:var(--bad)}\n.note{color:var(--muted);font-size:.78rem}\n.status{text-align:center;color:var(--muted);padding:16px}\n.flash{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px;margin-bottom:14px}\n.flash a{display:block;color:var(--text);text-decoration:none;border:1px solid var(--line);border-radius:10px;padding:9px 11px;margin-top:8px;background:var(--card2)}\n.flash a b{display:block;color:var(--accent)}\n.flash a span{font-size:.82rem;color:var(--muted)}\n.overlay{position:fixed;inset:0;background:#000a;z-index:20;display:flex;align-items:flex-end;justify-content:center}\n.overlay[hidden]{display:none}\n.sheet{background:var(--bg);width:100%;max-width:760px;max-height:94vh;border-radius:18px 18px 0 0;display:flex;flex-direction:column;border:1px solid var(--line)}\n.sheet-head{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid var(--line)}\n.sheet-body{overflow-y:auto;padding:12px 14px;flex:1}\n.sheet-actions{display:flex;gap:8px;padding:10px 14px;border-top:1px solid var(--line);position:sticky;bottom:0;background:var(--bg)}\n.sheet-actions .btn{flex:1}\n.field{display:flex;flex-direction:column;gap:4px;margin-bottom:10px}\n.field label{font-size:.85rem;color:var(--muted)}\n.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.preset{border:1px solid var(--line);background:var(--card);border-radius:12px;padding:10px;margin-bottom:8px;cursor:pointer;width:100%;text-align:left;color:var(--text);font:inherit}\n.preset.rec{border-color:var(--good)}\n.preset b{display:block}\n.warn-box{background:#ef5b6b22;border:1px solid var(--bad);border-radius:10px;padding:8px 10px;font-size:.88rem;margin:8px 0}\n.verdict{border-radius:10px;padding:9px 11px;font-weight:600;margin:8px 0}\n.verdict.good{background:#2ecc8f22;border:1px solid var(--good)}\n.verdict.ok{background:#f0b42922;border:1px solid var(--ok)}\n.verdict.bad{background:#ef5b6b22;border:1px solid var(--bad)}\n.checks{display:flex;flex-wrap:wrap;gap:6px}\n.checks label{border:1px solid var(--line);border-radius:999px;padding:5px 10px;font-size:.85rem;background:var(--card)}\ninput[type=range]{width:100%}\n"};
const __MODS = {};
const __cache = {};
function __resolve(from, name) {
  const p = require('path').posix;
  const base = p.normalize(p.join(p.dirname(from), name));
  for (const c of [base, base + '.js', base + '/index.js']) if (__MODS[c]) return c;
  throw new Error('Module introuvable : ' + name);
}
function __load(key) {
  if (__cache[key]) return __cache[key].exports;
  const m = { exports: {} };
  __cache[key] = m;
  const req = (n) => (n.startsWith('.') ? __load(__resolve(key, n)) : require(n));
  __MODS[key](req, m, m.exports, __dirname);
  return m.exports;
}
__MODS["/src/config.js"] = function (require, module, exports, __dirname) {
// =====================================================================
// RÉGLAGES MODIFIABLES - c'est ici que tu ajustes les "opinions" de l'appli
// =====================================================================

// Critères par défaut (budget, RAM, SSD, niveau de carte graphique minimum)
const DEFAULTS = {
  maxPrice: 1800,        // budget max
  idealRatio: 0.83,      // "zone idéale" = 83 % du budget (1800 € -> environ 1500 €)
  minRam: 16,
  minSsd: 512,
  minGpuScore: 66        // 66 = niveau RTX 5060 / RTX 4070 portable
};

// Score de performance GPU portable (0-100) + VRAM en Go.
// Estimations basées sur les performances relatives en jeu des GPU portables.
const GPU_TABLE = {
  'RTX 5090':    { score: 100, vram: 24 },
  'RTX 5080':    { score: 92,  vram: 16 },
  'RTX 4090':    { score: 90,  vram: 16 },
  'RTX 5070 Ti': { score: 84,  vram: 12 },
  'RTX 4080':    { score: 82,  vram: 12 },
  'RTX 5070':    { score: 76,  vram: 8 },
  'RTX 4070':    { score: 68,  vram: 8 },
  'RTX 5060':    { score: 68,  vram: 8 },
  'RTX 3080 Ti': { score: 68,  vram: 16 },
  'RTX 3080':    { score: 62,  vram: 8 },
  'RTX 4060':    { score: 58,  vram: 8 },
  'RTX 3070 Ti': { score: 58,  vram: 8 },
  'RTX 3070':    { score: 54,  vram: 8 },
  'RTX 5050':    { score: 55,  vram: 8 },
  'RTX 4050':    { score: 45,  vram: 6 },
  'RTX 3060':    { score: 45,  vram: 6 }
};

// Niveaux de carte graphique proposés dans les paramètres (valeur = score minimum)
const GPU_OPTIONS = [
  { score: 0,   label: 'Peu importe' },
  { score: 45,  label: 'RTX 4050 / 3060 ou mieux' },
  { score: 55,  label: 'RTX 5050 / 4060 ou mieux' },
  { score: 66,  label: 'RTX 5060 / 4070 ou mieux' },
  { score: 76,  label: 'RTX 5070 ou mieux' },
  { score: 82,  label: 'RTX 5070 Ti / 4080 ou mieux' },
  { score: 90,  label: 'RTX 5080 / 4090 ou mieux' },
  { score: 100, label: 'RTX 5090 uniquement' }
];
const gpuLabel = (score) => (GPU_OPTIONS.filter((o) => o.score <= score).pop() || GPU_OPTIONS[0]).label;

// Fiabilité matérielle estimée par gamme : refroidissement, qualité de
// fabrication, SAV, réputation générale (0-100). Opinion éditoriale : modifie-la !
const SERIES_RELIABILITY = [
  { re: /legion\s*(pro|7|9)/i,            score: 90, label: 'Lenovo Legion haut de gamme' },
  { re: /legion/i,                        score: 86, label: 'Lenovo Legion' },
  { re: /rog\s*(strix|scar|zephyrus)/i,   score: 85, label: 'ASUS ROG' },
  { re: /\btuf\b/i,                       score: 80, label: 'ASUS TUF' },
  { re: /predator/i,                      score: 80, label: 'Acer Predator' },
  { re: /(msi\s*)?(raider|titan|vector|crosshair)/i, score: 78, label: 'MSI haut de gamme' },
  { re: /razer/i,                         score: 78, label: 'Razer Blade' },
  { re: /alienware/i,                     score: 74, label: 'Alienware' },
  { re: /omen/i,                          score: 74, label: 'HP Omen' },
  { re: /aorus/i,                         score: 70, label: 'Gigabyte Aorus' },
  { re: /(katana|cyborg|thin|stealth|pulse)/i, score: 68, label: 'MSI milieu de gamme' },
  { re: /nitro/i,                         score: 68, label: 'Acer Nitro' },
  { re: /\bloq\b/i,                       score: 68, label: 'Lenovo LOQ' },
  { re: /victus/i,                        score: 62, label: 'HP Victus' },
  { re: /gaming\s*v\s*16|gaming\s*v16/i,  score: 62, label: 'ASUS Gaming V' },
  { re: /gigabyte/i,                      score: 62, label: 'Gigabyte Gaming' },
  { re: /\bg15\b|\bg16\b|dell\s*g/i,      score: 58, label: 'Dell G' }
];

const UNKNOWN_RELIABILITY = 55;

module.exports = { DEFAULTS, GPU_TABLE, GPU_OPTIONS, gpuLabel, SERIES_RELIABILITY, UNKNOWN_RELIABILITY };

};
__MODS["/src/parser.js"] = function (require, module, exports, __dirname) {
// Extrait les caractéristiques techniques depuis le titre / la description d'une annonce.

function parseSpecs(title = '', desc = '') {
  const t = `${title} ${desc}`.replace(/\s+/g, ' ');
  const specs = {};

  // ---- GPU ----
  const g = t.match(/RTX\s?(50|40|30)\s?(90|80|70|60|50)\s?(Ti)?/i);
  if (g) specs.gpu = `RTX ${g[1]}${g[2]}${g[3] ? ' Ti' : ''}`;

  // ---- CPU ----
  const c = t.match(/(Core\s?Ultra\s?[579]\s?\d{3}\w*|i[579][-\s]?\d{4,5}\w*|Ryzen\s?(?:AI\s?)?[579]\s?(?:HX\s?)?\d{3,4}\w*)/i);
  if (c) specs.cpu = c[1].replace(/\s+/g, ' ').trim();

  // ---- RAM ----
  const ram =
    t.match(/(\d{1,2})\s?(?:Go|GB)\s?(?:de\s)?(?:RAM|DDR\d|LPDDR\d\w*|mémoire)/i) ||
    t.match(/(?:RAM|DDR\d|mémoire)\s?:?\s?(\d{1,2})\s?(?:Go|GB)/i);
  if (ram) specs.ram = parseInt(ram[1], 10);

  // ---- SSD (en Go) ----
  let s =
    t.match(/(\d+(?:[.,]\d+)?)\s?(To|TB)\s?(?:de\s)?(?:SSD|NVMe|M\.2)/i) ||
    t.match(/(?:SSD|NVMe)\s?:?\s?(\d+(?:[.,]\d+)?)\s?(To|TB)/i);
  if (s) specs.ssd = Math.round(parseFloat(s[1].replace(',', '.')) * 1000);
  else {
    s =
      t.match(/(\d{3,4})\s?(?:Go|GB)\s?(?:de\s)?(?:SSD|NVMe|M\.2)/i) ||
      t.match(/(?:SSD|NVMe)\s?:?\s?(\d{3,4})\s?(?:Go|GB)/i);
    if (s) specs.ssd = parseInt(s[1], 10);
  }

  // ---- Écran : taille, fréquence, définition, type de dalle ----
  const sz = t.match(/(\d{2}(?:[.,]\d)?)\s?(?:"|”|''|pouces|po\b|-inch|inch)/i);
  if (sz) {
    const v = parseFloat(sz[1].replace(',', '.'));
    if (v >= 13 && v <= 18.5) specs.screenSize = v;
  }
  const hz = t.match(/(\d{2,3})\s?Hz/i);
  if (hz) specs.refresh = parseInt(hz[1], 10);

  if (/\b4K\b|UHD|3840/i.test(t)) specs.resolution = 'UHD';
  else if (/QHD|WQHD|WQXGA|2[,.]5K|2[,.]8K|2560|2880/i.test(t)) specs.resolution = 'QHD';
  else if (/\bFHD\b|WUXGA|Full\s?HD|1920/i.test(t)) specs.resolution = 'FHD';

  if (/Mini[-\s]?LED/i.test(t)) specs.panel = 'Mini-LED';
  else if (/OLED/i.test(t)) specs.panel = 'OLED';
  else if (/\bIPS\b/i.test(t)) specs.panel = 'IPS';

  return specs;
}

module.exports = { parseSpecs };

};
__MODS["/src/scoring.js"] = function (require, module, exports, __dirname) {
// Transforme une annonce brute en annonce "enrichie" : specs, scores, résumé, avantages / inconvénients.
const { GPU_TABLE, SERIES_RELIABILITY, UNKNOWN_RELIABILITY } = require('./config');
const { parseSpecs } = require('./parser');

const clamp = (n, a = 0, b = 100) => Math.max(a, Math.min(b, n));

// Niveau de processeur : 3 = i9 / Ryzen 9 / Core Ultra 9, 2 = i7 / 7 / Ultra 7, 1 = i5 / 5 / Ultra 5
function cpuTier(cpu = '') {
  if (/ultra\s?9|i9|ryzen\s?(ai\s?)?9/i.test(cpu)) return 3;
  if (/ultra\s?7|i7|ryzen\s?(ai\s?)?7/i.test(cpu)) return 2;
  if (/ultra\s?5|i5|ryzen\s?(ai\s?)?5/i.test(cpu)) return 1;
  return 0;
}
const cpuScore = (cpu) => [50, 62, 78, 90][cpuTier(cpu)];
const ramScore = (r) => (!r ? 40 : r >= 32 ? 100 : r >= 24 ? 78 : r >= 16 ? 60 : 30);
const ssdScore = (s) => (!s ? 40 : s >= 2000 ? 100 : s >= 1000 ? 88 : s >= 512 ? 62 : 35);

function brandOf(title) {
  const m = title.match(/\b(Lenovo|ASUS|MSI|Acer|HP|Dell|Alienware|Gigabyte|Razer|Medion|Schenker)\b/i);
  if (!m) return null;
  return m[1].toUpperCase() === m[1] && m[1].length <= 3 ? m[1] : m[1][0].toUpperCase() + m[1].slice(1);
}

function reliabilityOf(title) {
  for (const s of SERIES_RELIABILITY) if (s.re.test(title)) return { score: s.score, label: s.label };
  return { score: UNKNOWN_RELIABILITY, label: 'Gamme non référencée' };
}

function sellerTrust(l) {
  const w = Math.min(l.warrantyMonths || 0, 24);
  if (l.category === 'neuf' || l.category === 'bonsplans') return clamp(88 + w / 6);
  if (l.category === 'reconditionne') return clamp(68 + w * 0.9);
  let base = l.sellerType === 'pro' ? 62 : 42; // occasion
  if (typeof l.sellerRating === 'number') base += (l.sellerRating - 95) * 1.5;
  return clamp(base + w * 1.2);
}

function horizon(gpuScore, ram) {
  if (gpuScore >= 76 && ram >= 32) return 'Très solide pour 2030 et au-delà';
  if (gpuScore >= 76) return 'Solide pour 4 à 5 ans (RAM à passer à 32 Go)';
  if (gpuScore >= 66 && ram >= 32) return 'Solide pour 4 à 5 ans';
  if (gpuScore >= 66 && ram >= 16) return 'Bon pour 3 à 4 ans (RAM à passer à 32 Go)';
  if (gpuScore >= 55) return 'Correct 2 à 3 ans, ultra limité ensuite';
  return 'Plutôt limité pour les jeux à venir en ultra';
}

function enrich(raw) {
  const parsed = parseSpecs(raw.title, raw.description || '');
  const specs = { ...parsed, ...(raw.specs || {}) };
  specs.cpuTier = cpuTier(specs.cpu);
  const gpuInfo = specs.gpu ? GPU_TABLE[specs.gpu] : null;
  const rel = reliabilityOf(raw.title);

  const gpuS = gpuInfo ? gpuInfo.score : 0;
  const vram = gpuInfo ? gpuInfo.vram : null;
  const perf = clamp(0.6 * gpuS + 0.15 * cpuScore(specs.cpu) + 0.15 * ramScore(specs.ram) + 0.1 * ssdScore(specs.ssd));
  const trust = sellerTrust(raw);
  const score = Math.round(0.5 * perf + 0.3 * rel.score + 0.2 * trust);

  const pros = [];
  const cons = [];

  if (gpuInfo) {
    if (gpuS >= 76) pros.push(`GPU ${specs.gpu} : ultra en 1440p confortable, marge pour les futurs jeux`);
    else if (gpuS >= 66) pros.push(`GPU ${specs.gpu} : quasi tout en ultra en 1080p/1440p (DLSS conseillé sur les jeux les plus lourds)`);
    else if (gpuS >= 55) cons.push(`GPU ${specs.gpu} : très bien en 1080p élevé, mais l'ultra sera difficile d'ici 2-3 ans`);
    else cons.push(`GPU ${specs.gpu} : entrée de gamme, plutôt détails moyens à élevés`);
    if (vram && vram <= 8 && gpuS >= 66) cons.push('8 Go de VRAM : limite possible en ultra + ray tracing d\'ici 3-5 ans');
    if (vram && vram >= 12) pros.push(`${vram} Go de VRAM : très bonne protection pour l'avenir`);
  } else {
    cons.push('GPU non identifié : à vérifier avant achat');
  }
  if (specs.ram >= 32) pros.push(`${specs.ram} Go de RAM : confortable pour longtemps`);
  else if (specs.ram >= 16) cons.push('16 Go de RAM : suffisant aujourd\'hui, prévoir une extension à 32 Go');
  else if (specs.ram) cons.push(`${specs.ram} Go de RAM : trop juste`);
  if (specs.ssd >= 1000) pros.push(`SSD ${specs.ssd >= 2000 ? specs.ssd / 1000 + ' To' : '1 To'} : de la place pour une grosse ludothèque`);
  else if (specs.ssd >= 512) cons.push('SSD 512 Go : se remplit vite avec les gros jeux');
  if (specs.panel === 'OLED' || specs.panel === 'Mini-LED') pros.push(`Écran ${specs.panel} : image superbe (contraste, couleurs)`);
  if (specs.resolution === 'QHD' || specs.resolution === 'UHD') pros.push('Écran haute définition (QHD+ ou plus), mais plus gourmand pour la carte graphique');
  if (specs.refresh >= 165) pros.push(`Écran ${specs.refresh} Hz fluide`);
  else if (specs.refresh && specs.refresh <= 120) cons.push(`Écran ${specs.refresh} Hz seulement`);
  if (rel.score >= 80) pros.push(`${rel.label} : refroidissement et fabrication réputés, performances stables dans le temps`);
  else if (rel.score <= 62) cons.push(`${rel.label} : refroidissement/finitions plus modestes, risque de baisse de perfs avec le temps`);
  if (raw.warrantyMonths >= 12) pros.push(`Garantie ${raw.warrantyMonths} mois`);
  if (raw.category === 'occasion' && !(raw.warrantyMonths > 0)) cons.push('Pas de garantie affichée : demande la facture, teste la machine');
  if (raw.category === 'occasion' && raw.sellerType !== 'pro') cons.push('Vendeur particulier : privilégie le paiement/remise protégés');
  if (raw.category === 'occasion' || raw.category === 'reconditionne') cons.push('Usure possible : batterie et pâte thermique à vérifier');
  if (raw.category === 'bonsplans') cons.push('Offre limitée dans le temps : vérifie qu\'elle est toujours valable et le prix final');

  const screenBits = [
    specs.screenSize && `écran ${String(specs.screenSize).replace('.', ',')}"`,
    specs.resolution === 'QHD' ? 'QHD+' : specs.resolution,
    specs.panel, specs.refresh && `${specs.refresh} Hz`
  ].filter(Boolean).join(' ');
  const bits = [
    specs.cpu, specs.gpu, specs.ram && `${specs.ram} Go RAM`,
    specs.ssd && (specs.ssd >= 1000 ? `${specs.ssd / 1000} To SSD` : `${specs.ssd} Go SSD`),
    screenBits
  ].filter(Boolean);
  const summary = `${bits.join(' · ')}. ${horizon(gpuS, specs.ram || 0)}.`;

  return {
    ...raw,
    brand: brandOf(raw.title),
    specs,
    vram,
    scores: { gpu: gpuS, perf: Math.round(perf), reliability: rel.score, trust: Math.round(trust), global: score },
    reliabilityLabel: rel.label,
    summary,
    pros: pros.slice(0, 5),
    cons: cons.slice(0, 4)
  };
}

module.exports = { enrich, cpuTier };

};
__MODS["/src/games.js"] = function (require, module, exports, __dirname) {
// Estimation de ce que donne une carte graphique sur de gros jeux connus.
//
// ATTENTION : ce ne sont PAS des mesures. C'est une estimation prudente et qualitative, calculée à partir
// du score de performance de la carte (src/config.js) et d'un "niveau d'exigence" par jeu, estimé d'après
// la réputation de chaque jeu. Le résultat réel dépend de la puissance (TGP) du portable, du processeur,
// des mises à jour du jeu et du réglage choisi (DLSS, génération d'images...).
//
// "need" = score de carte graphique à peu près nécessaire pour de l'ULTRA en 1080p, environ 60 images/s,
// sans ray tracing lourd, en autorisant le DLSS qualité. Modifie ces valeurs si tu as de meilleures sources.

const GAMES = [
  { id: 'cs2',      name: 'Counter-Strike 2',                       need: 30, cpu: true,  hint: 'dépend surtout du processeur' },
  { id: 'elden',    name: 'Elden Ring',                             need: 40, hint: 'plafonné à 60 images/s par le jeu' },
  { id: 'fortnite', name: 'Fortnite (Épique)',                      need: 45 },
  { id: 'bg3',      name: 'Baldur\'s Gate 3',                       need: 50, cpu: true,  hint: 'l\'acte 3 est gourmand en processeur' },
  { id: 'warzone',  name: 'Call of Duty : Warzone',                 need: 52 },
  { id: 'bf6',      name: 'Battlefield 6',                          need: 58, cpu: true },
  { id: 'hogwarts', name: 'Hogwarts Legacy',                        need: 62, vram: true },
  { id: 'cp77',     name: 'Cyberpunk 2077 (Ultra, sans ray tracing)', need: 62 },
  { id: 'doom',     name: 'Doom : The Dark Ages',                   need: 64, vram: true },
  { id: 'indy',     name: 'Indiana Jones et le Cercle ancien',      need: 66, vram: true },
  { id: 'aw2',      name: 'Alan Wake 2',                            need: 70, vram: true },
  { id: 'mhw',      name: 'Monster Hunter Wilds',                   need: 76, hint: 'jeu réputé très gourmand' },
  { id: 'bmw',      name: 'Black Myth : Wukong',                    need: 76 },
  { id: 'cp77pt',   name: 'Cyberpunk 2077 (path tracing)',          need: 95, pt: true }
];

const RES_FACTOR = { FHD: 1, QHD: 1.5, UHD: 2.6 };
const RES_LABEL = { FHD: '1080p', QHD: '1440p', UHD: '4K' };

function verdict(r, g) {
  if (g.pt) {
    if (r >= 1) return { level: 'ok', text: 'Possible avec DLSS + génération d\'images' };
    if (r >= 0.8) return { level: 'warn', text: 'Très limité, path tracing déconseillé' };
    return { level: 'bad', text: 'Non recommandé (ray tracing léger seulement)' };
  }
  if (r >= 1.5) return { level: 'great', text: 'Ultra très fluide (90+ images/s)' };
  if (r >= 1.15) return { level: 'good', text: 'Ultra fluide (60+ images/s)' };
  if (r >= 0.95) return { level: 'ok', text: 'Ultra jouable avec DLSS (~60 images/s)' };
  if (r >= 0.75) return { level: 'warn', text: 'Élevé conseillé, ultra avec DLSS / génération d\'images' };
  if (r >= 0.55) return { level: 'bad', text: 'Réglages moyens à élevés avec DLSS' };
  return { level: 'bad', text: 'Réglages bas à moyens' };
}

// gpuScore : score de la carte ; vram : Go ; resolution : 'FHD' | 'QHD' | 'UHD'
function rate(gpuScore, { vram = null, resolution = 'FHD', cpuTier = null } = {}) {
  const res = RES_FACTOR[resolution] ? resolution : 'FHD';
  return GAMES.map((g) => {
    const r = gpuScore / (g.need * RES_FACTOR[res]);
    const v = verdict(r, g);
    const notes = [];
    if (g.hint) notes.push(g.hint);
    if (g.vram && vram && vram <= 8 && (res !== 'FHD' || gpuScore >= 66)) notes.push(`${vram} Go de VRAM : baisse la qualité des textures`);
    if (g.vram && vram && vram < 8) notes.push(`${vram} Go de VRAM : textures moyennes`);
    if (g.cpu && cpuTier !== null && cpuTier <= 1) notes.push('processeur d\'entrée de gamme : peut limiter');
    return { id: g.id, name: g.name, level: v.level, text: v.text, note: notes.join(' · '), resolution: RES_LABEL[res] };
  });
}

const DISCLAIMER = 'Estimations prudentes calculées d\'après le niveau de la carte graphique, pas des mesures. Le résultat réel dépend du portable (puissance de la carte, refroidissement), du processeur et des mises à jour des jeux.';

module.exports = { GAMES, rate, DISCLAIMER, RES_LABEL };

};
__MODS["/src/advisor.js"] = function (require, module, exports, __dirname) {
// Conseiller de configuration : à partir d'un budget, propose 1 à 3 configurations réalistes.
//
// Les fourchettes de prix par niveau de carte graphique viennent des PRIX RELEVÉS dans les guides d'achat
// du 24/10/2026 (voir src/sources/catalog-data.js). Elles évoluent : à mettre à jour de temps en temps.

const TIERS = [
  { id: 'entree',    name: 'RTX 4050 / 5050',     rep: 'RTX 5050',    minScore: 45, lo: 680,  hi: 1050,
    life: '2 à 3 ans en détails élevés ; l\'ultra sera vite limité' },
  { id: 'milieu',    name: 'RTX 5060',            rep: 'RTX 5060',    minScore: 66, lo: 850,  hi: 1500,
    life: '3 à 4 ans en ultra avec DLSS, puis réglages élevés' },
  { id: 'haut',      name: 'RTX 5070',            rep: 'RTX 5070',    minScore: 76, lo: 1440, hi: 1900,
    life: '4 à 5 ans en ultra avec DLSS' },
  { id: 'tres_haut', name: 'RTX 5070 Ti / 4080',  rep: 'RTX 5070 Ti', minScore: 82, lo: 1790, hi: 2700,
    life: '5 ans et plus en ultra' },
  { id: 'premium',   name: 'RTX 5080 / 4090',     rep: 'RTX 5080',    minScore: 90, lo: 3000, hi: 3500,
    life: '5 ans et plus, en 1440p ultra sans souci' },
  { id: 'extreme',   name: 'RTX 5090',            rep: 'RTX 5090',    minScore: 100, lo: 3500, hi: 4000,
    life: 'Le plus longtemps possible, 4K envisageable' }
];

const tierForScore = (score) => {
  let t = TIERS[0];
  for (const x of TIERS) if (score >= x.minScore) t = x;
  return t;
};

function criteriaFor(tier, role, budget) {
  const big = TIERS.indexOf(tier) >= 3;
  return {
    budget,
    minGpuScore: tier.minScore,
    minVram: 0,
    minRam: TIERS.indexOf(tier) >= 4 ? 32 : 16,
    minSsd: tier.id === 'entree' ? 512 : 1000,
    minCpuTier: role === 'eco' ? 0 : big ? 2 : 1,
    minRefresh: role === 'eco' ? 144 : role === 'balanced' ? 165 : (TIERS.indexOf(tier) >= 3 ? 240 : 165),
    resolution: TIERS.indexOf(tier) >= 4 ? 'qhd' : '',
    panel: '', screen: '', onlyReliable: false
  };
}

const ROLE_LABEL = { eco: 'Économique', balanced: 'Équilibrée', max: 'Performance maximale' };

function advise(budget) {
  const B = Math.max(300, Math.min(8000, Math.round(Number(budget) || 1800)));
  const idxFor = (limit) => {
    let best = -1;
    TIERS.forEach((t, i) => { if (t.lo <= limit) best = i; });
    return best;
  };
  const warnings = [];
  const maxIdx = idxFor(B);
  if (maxIdx < 0) {
    return {
      budget: B, presets: [],
      warnings: [`Avec ${B} €, aucun portable gaming récent neuf ne correspond (les moins chers en RTX 4050 démarrent vers 680 €). L'occasion ou le reconditionné peuvent offrir plus pour ce prix.`],
      tip: 'Augmente le budget ou regarde les onglets Occasion et Reconditionné.'
    };
  }
  const balIdx = Math.max(0, Math.min(maxIdx, idxFor(B * 0.88)));
  const ecoIdx = Math.max(0, balIdx - 1);
  const plan = [['eco', ecoIdx], ['balanced', balIdx], ['max', maxIdx]];
  const seen = new Set();
  const presets = [];
  for (const [role, i] of plan) {
    const t = TIERS[i];
    if (seen.has(t.id)) continue;
    seen.add(t.id);
    presets.push({
      id: `${role}-${t.id}`,
      role,
      label: ROLE_LABEL[role],
      recommended: false,
      tierId: t.id,
      gpu: t.name,
      priceRange: [t.lo, Math.min(t.hi, Math.max(B, t.lo + 100))],
      life: t.life,
      criteria: criteriaFor(t, role, B)
    });
  }
  // Si deux niveaux seulement, on garde les libellés les plus parlants : le plus bas = Économique, le plus haut = Max
  if (presets.length === 1) presets[0].label = 'Meilleur choix pour ce budget';
  const rec = presets.find((p) => p.tierId === TIERS[balIdx].id) || presets[presets.length - 1];
  rec.recommended = true;

  if (TIERS[maxIdx].minScore < 66) warnings.push('À ce budget, tu auras une carte RTX 4050/5050 : très bien pour jouer en détails élevés, mais pas pour « tout en ultra » pendant 3 à 5 ans.');
  if (B >= 5000) warnings.push('Au-delà d\'environ 4 000 €, les gains deviennent marginaux : une RTX 5090 est déjà le haut de gamme.');
  return {
    budget: B, presets, warnings,
    tip: 'En occasion ou reconditionné, le même budget donne souvent un cran de carte graphique en plus (ex. RTX 4070/4080 portable), mais avec une garantie plus courte.'
  };
}

module.exports = { advise, TIERS, tierForScore };

};
__MODS["/src/analyzer.js"] = function (require, module, exports, __dirname) {
// Analyse d'une configuration choisie dans les Paramètres : fourchette de prix réaliste, points positifs,
// points négatifs, durée de vie estimée et comportement sur de gros jeux connus.
// Tout est ESTIMÉ à partir de règles simples (voir les commentaires) : ce sont des repères, pas des mesures.
const { GPU_TABLE, GPU_OPTIONS, DEFAULTS } = require('./config');
const { tierForScore, TIERS } = require('./advisor');
const { rate, DISCLAIMER } = require('./games');

const REP_GPU = { 0: 'RTX 4050', 45: 'RTX 4050', 55: 'RTX 5050', 66: 'RTX 5060', 76: 'RTX 5070', 82: 'RTX 5070 Ti', 90: 'RTX 5080', 100: 'RTX 5090' };

const pick = (v, allowed, d) => (allowed.includes(v) ? v : d);
const num = (v, d, lo, hi) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : d;
};

// Nettoie des critères reçus (de l'URL) et leur donne des valeurs par défaut.
function cleanCriteria(q = {}) {
  return {
    budget: num(q.budget ?? q.maxPrice, DEFAULTS.maxPrice, 300, 8000),
    minGpuScore: pick(Number(q.minGpuScore), GPU_OPTIONS.map((o) => o.score), DEFAULTS.minGpuScore),
    minVram: pick(Number(q.minVram), [0, 8, 12, 16], 0),
    minRam: pick(Number(q.minRam), [16, 24, 32, 64], DEFAULTS.minRam),
    minSsd: pick(Number(q.minSsd), [512, 1000, 2000], DEFAULTS.minSsd),
    minCpuTier: pick(Number(q.minCpuTier), [0, 1, 2, 3], 0),
    minRefresh: pick(Number(q.minRefresh), [0, 144, 165, 240], 0),
    screen: pick(String(q.screen || ''), ['', 'compact', '16', 'large'], ''),
    resolution: pick(String(q.resolution || ''), ['', 'qhd'], ''),
    panel: pick(String(q.panel || ''), ['', 'premium'], ''),
    onlyReliable: q.onlyReliable === '1' || q.onlyReliable === true
  };
}

const CPU_NAME = ['peu importe', 'Core i5 / Ryzen 5 / Ultra 5 ou mieux', 'Core i7 / Ryzen 7 / Ultra 7 ou mieux', 'Core i9 / Ryzen 9 / Ultra 9'];
const fmtSsd = (g) => (g >= 1000 ? `${g / 1000} To` : `${g} Go`);

function analyze(input) {
  const c = cleanCriteria(input);
  const gpuKey = REP_GPU[c.minGpuScore] || 'RTX 4050';
  const gpu = GPU_TABLE[gpuKey];
  const tier = tierForScore(c.minGpuScore || 45);
  const tierIdx = TIERS.indexOf(tier);
  const res = c.resolution === 'qhd' ? 'QHD' : 'FHD';
  const cpuT = c.minCpuTier || 1;

  // ---- Prix estimé : fourchette du niveau de carte + suppléments (estimations) ----
  let lo = tier.lo, hi = tier.hi;
  const extras = [];
  const add = (a, b, why) => { lo += a; hi += b; extras.push(why); };
  if (c.minRam >= 32 && tierIdx <= 2) add(0, 120, 'RAM 32 Go');
  if (c.minRam >= 64) add(100, 250, 'RAM 64 Go');
  if (c.minSsd >= 2000 && tierIdx <= 3) add(80, 200, 'SSD 2 To');
  if (c.resolution === 'qhd' && tierIdx <= 1) add(60, 200, 'écran QHD+');
  if (c.panel === 'premium') add(100, 300, 'écran OLED / Mini-LED');
  if (c.minCpuTier === 3) add(100, 250, 'processeur haut de gamme');
  if (c.minRefresh >= 240 && tierIdx <= 1) add(0, 100, 'écran 240 Hz');
  const fits = lo <= c.budget;
  const comfy = lo <= c.budget * DEFAULTS.idealRatio;
  const verdict = !fits
    ? { level: 'bad', text: `Cette configuration dépasse probablement ton budget : environ ${lo} à ${hi} € pour du neuf.` }
    : comfy
      ? { level: 'good', text: `Réaliste dans ton budget, avec de la marge (environ ${lo} à ${hi} € pour du neuf).` }
      : { level: 'ok', text: `Réaliste mais juste (environ ${lo} à ${hi} € pour du neuf) : cherche les promotions.` };

  // ---- Points positifs / négatifs ----
  const pros = [], cons = [];
  if (c.minGpuScore >= 90) pros.push(`${gpuKey} : le haut du panier, 1440p ultra sans souci et marge pour plusieurs années.`);
  else if (c.minGpuScore >= 82) pros.push(`${gpuKey} : très haut niveau, ultra en 1440p et ray tracing correct avec DLSS.`);
  else if (c.minGpuScore >= 76) pros.push(`${gpuKey} : excellent pour de l'ultra en 1080p/1440p, bonne marge pour 4 à 5 ans.`);
  else if (c.minGpuScore >= 66) pros.push(`${gpuKey} : quasi tout en ultra en 1080p, DLSS conseillé sur les jeux les plus lourds.`);
  else if (c.minGpuScore >= 45) cons.push(`${gpuKey} : correct pour des détails élevés, mais l'ultra sera difficile sur les gros jeux récents et à venir.`);
  else cons.push('Aucune limite sur la carte graphique : le site pourra proposer des modèles trop faibles pour du gaming « tout ultra ».');
  if (gpu && gpu.vram <= 8 && c.minGpuScore >= 66) cons.push(`${gpu.vram} Go de VRAM : limite possible en ultra + ray tracing et en 1440p d'ici 3 à 5 ans (textures à baisser).`);
  if (gpu && gpu.vram >= 12) pros.push(`${gpu.vram} Go de VRAM : à l'aise avec les textures lourdes des jeux à venir.`);
  if (c.minVram >= 12) pros.push(`VRAM ${c.minVram} Go minimum : protège mieux dans le temps (réduit toutefois le choix).`);

  if (c.minRam >= 32) pros.push(`${c.minRam} Go de RAM : confortable pour longtemps et pour jouer en gardant d'autres applications ouvertes.`);
  else { cons.push(`${c.minRam} Go de RAM : suffisant aujourd'hui ; prévoir de passer à 32 Go (souvent facile à ajouter) pour tenir 4 à 5 ans.`); }
  if (c.minSsd >= 2000) pros.push('SSD 2 To : place pour une très grosse ludothèque (les jeux font souvent 100 Go et plus).');
  else if (c.minSsd >= 1000) pros.push('SSD 1 To : confortable pour une dizaine de gros jeux.');
  else cons.push('SSD 512 Go : se remplit vite (quelques gros jeux suffisent), prévoir une 2e barrette SSD.');

  if (c.minCpuTier === 3) { pros.push('Processeur haut de gamme : marge pour les jeux gourmands en CPU et le streaming.'); cons.push('Processeur haut de gamme : plus de chaleur et de bruit, gain faible sur la plupart des jeux (la carte graphique compte plus).'); }
  else if (c.minCpuTier === 2) pros.push('Processeur de niveau i7 / Ryzen 7 : très bon équilibre pour le jeu.');
  else if (c.minCpuTier === 1) cons.push('Processeur de niveau i5 / Ryzen 5 : suffit pour la plupart des jeux, peut limiter la carte sur les jeux gourmands en CPU.');
  else cons.push('Aucune exigence de processeur : certains modèles pourront brider la carte graphique.');

  if (c.minRefresh >= 240) pros.push('Écran 240 Hz : très fluide dans les jeux compétitifs (la carte doit suivre).');
  else if (c.minRefresh >= 165) pros.push(`Écran ${c.minRefresh} Hz : fluidité très agréable.`);
  else if (c.minRefresh === 144) pros.push('Écran 144 Hz : bon standard pour le jeu.');
  else cons.push('Pas d\'exigence sur la fréquence d\'écran : tu peux tomber sur un écran 60 Hz, moins fluide.');

  if (c.resolution === 'qhd') {
    pros.push('Écran QHD+ : image plus nette qu\'en Full HD.');
    cons.push('QHD+ : environ 1,5 fois plus exigeant pour la carte graphique ; DLSS souvent nécessaire sur les gros jeux' + (c.minGpuScore <= 68 ? ' (surtout avec une RTX 5060).' : '.'));
  } else pros.push('Full HD : la résolution la plus économe, idéale pour garder les performances dans le temps.');
  if (c.panel === 'premium') { pros.push('Écran OLED / Mini-LED : contraste et couleurs superbes.'); cons.push('OLED / Mini-LED : plus cher ; l\'OLED peut marquer à la longue avec des images fixes.'); }
  if (c.screen === 'compact') { pros.push('Écran ≤ 15,6" : plus compact et plus léger.'); cons.push('Petit châssis : refroidissement souvent plus juste, ce qui peut baisser les performances sur la durée.'); }
  if (c.screen === 'large') { pros.push('Grand écran (17" et plus) : meilleur refroidissement et plus de confort.'); cons.push('17" et plus : encombrant et lourd (souvent 2,5 à 3,5 kg avec le chargeur en plus).'); }
  if (c.onlyReliable) pros.push('Gammes réputées fiables seulement (Legion, ROG, Predator, TUF...) : refroidissement et fabrication qui tiennent mieux dans le temps.');
  else cons.push('Gammes non filtrées : certaines entrées de gamme (Victus, Nitro, LOQ) chauffent plus et durent moins bien.');

  if (fits && comfy) pros.push('Il reste de la marge dans le budget : possibilité de monter un cran ou de garder de l\'argent pour une extension de RAM.');
  if (!fits) cons.push(`Budget insuffisant pour cette combinaison (minimum estimé ${lo} €) : baisse un critère (${extras.length ? extras[extras.length - 1] : 'carte graphique'}) ou augmente le budget.`);

  // ---- Jeux ----
  const games = rate(gpu ? gpu.score : 45, { vram: gpu ? gpu.vram : null, resolution: res, cpuTier: cpuT });

  return {
    criteria: c,
    summary: [gpuKey + (c.minGpuScore > 0 ? ' (ou mieux)' : ''), `${c.minRam} Go RAM`, `${fmtSsd(c.minSsd)} SSD`, c.minCpuTier ? CPU_NAME[c.minCpuTier] : null,
      c.minRefresh ? `${c.minRefresh} Hz` : null, c.resolution === 'qhd' ? 'QHD+' : 'Full HD'].filter(Boolean),
    verdict, price: { lo, hi, fits, extras },
    lifespan: tier.life,
    pros, cons, games, resolution: res === 'QHD' ? '1440p' : '1080p', disclaimer: DISCLAIMER
  };
}

module.exports = { analyze, cleanCriteria };

};
__MODS["/src/sources/catalog-data.js"] = function (require, module, exports, __dirname) {
// =====================================================================
// CATALOGUE D'ORIGINE : une ligne par modèle. C'EST ICI QUE TU PEUX AJOUTER / CORRIGER DES MODÈLES.
//
// Chaque ligne : N(titre, prix, min, max, relevé?, source)
//   - titre   : doit contenir la carte (RTX ...), la RAM ("16 Go DDR5"), le SSD ("1 To SSD"), l'écran
//               (Hz, FHD / QHD+ / OLED / Mini-LED, "16 pouces") : l'appli lit ces infos dans le titre.
//   - prix    : prix typique en euros ; min / max : fourchette
//   - relevé  : true = prix réellement lu dans une source datée ; false = ESTIMATION
//
// Origine des prix :
//   NEUF "relevé"  : guides d'achat config-gamer.fr (24/10/2026) et jeuxvideo.com / JVTECH (06/09 et 21/10/2026).
//                    Les prix varient selon la boutique et la version exacte du modèle.
//   OCCASION / RECONDITIONNÉ : ESTIMATIONS de ma part (valeur de revente typique de modèles connus, à vérifier).
//                    Je n'ai pas pu lire d'annonces réelles : ces sites interdisent la lecture automatique.
// =====================================================================

const DATE = '24/10/2026';

function searchOf(t) {
  const cut = t.search(/\b(Core|Ryzen|i[3579]-)/i);
  const head = (cut > 0 ? t.slice(0, cut) : t.split(' ').slice(0, 4).join(' ')).trim();
  const g = (t.match(/RTX\s?\d{4}\s?(Ti)?/i) || [''])[0];
  return `${head} ${g}`.trim();
}
const N = (title, price, min, max, observed, source, note = '') =>
  ({ title, search: searchOf(title), price, min, max, observed, source, date: DATE, note });

const CG = 'config-gamer.fr';
const JV = 'jeuxvideo.com';

const neuf = [
  // ---- Entrée / milieu de gamme (jusqu'à ~1500 €) ----
  N('Lenovo LOQ Gen 9 15ARP9 Ryzen 5 8645HS RTX 4050 16 Go DDR5 512 Go SSD 144 Hz FHD 15,6 pouces', 684, 650, 760, true, CG),
  N('ASUS Gaming V16 V3607VM Ryzen 7 8745HS RTX 5060 16 Go DDR5 512 Go SSD 144 Hz FHD 16 pouces', 849, 800, 950, true, CG),
  N('ASUS TUF Gaming F16 2025 Core Ultra 5 245H RTX 5050 16 Go DDR5 1 To SSD 165 Hz FHD 16 pouces', 999, 950, 1100, true, CG),
  N('Acer Nitro V 15 ANV15-52 Core Ultra 5 245H RTX 5050 16 Go DDR5 512 Go SSD 144 Hz FHD 15,6 pouces', 999, 950, 1100, true, CG),
  N('Lenovo LOQ 15IRX10 Core Ultra 7 255H RTX 5060 16 Go DDR5 1 To SSD 144 Hz FHD 15,6 pouces', 1199, 1150, 1300, true, CG),
  N('Gigabyte Gaming A16 Ryzen AI 9 365 RTX 5060 16 Go DDR5 1 To SSD 165 Hz FHD 16 pouces', 1199, 1150, 1300, true, CG),
  N('Acer Nitro V 15 ANV15-52 Core Ultra 5 245H RTX 5060 32 Go DDR5 1 To SSD 144 Hz FHD 15,6 pouces', 1299, 1250, 1400, true, CG),
  N('MSI Cyborg 15 B2RWFKG Core Ultra 5 215H RTX 5060 16 Go DDR5 1 To SSD 144 Hz FHD 15,6 pouces', 1350, 1300, 1400, false, CG, 'Prix non affiché dans le guide, fourchette citée dans le texte'),
  N('Lenovo Legion 5 15IRX10 OLED Core Ultra 7 255H RTX 5060 16 Go DDR5 1 To SSD 240 Hz QHD+ OLED 15,6 pouces', 1394, 1350, 1500, true, CG),
  N('Lenovo Legion 5 15IRX10 Core Ultra 7 255HX RTX 5070 16 Go DDR5 1 To SSD 165 Hz FHD 15,6 pouces', 1441, 1400, 1550, true, CG),
  N('HP HyperX OMEN 15 Ryzen AI 9 365 RTX 5060 24 Go DDR5 1 To SSD 240 Hz QHD+ 15,3 pouces', 1499, 1450, 1600, true, CG),
  N('MSI Katana 15 HX Core i7-14650HX RTX 5070 16 Go DDR5 1 To SSD 144 Hz FHD 15,6 pouces', 1499, 1450, 1600, true, CG),
  N('Lenovo LOQ 15IRX10 Core Ultra 7 255H RTX 5070 16 Go DDR5 1 To SSD 144 Hz FHD 15,6 pouces', 1499, 1450, 1600, true, CG),
  // ---- Haut de gamme accessible (1500-2000 €) ----
  N('MSI Katana 15 HX Core i9-14900HX RTX 5070 32 Go DDR5 1 To SSD 144 Hz FHD 15,6 pouces', 1599, 1550, 1700, true, CG),
  N('HP Omen 16-ap0034nf Ryzen AI 7 350 RTX 5070 16 Go RAM 512 Go SSD 240 Hz QHD+ IPS 16 pouces', 1671, 1400, 2456, true, JV, 'Prix très variable : 1 671 € chez Darty, 2 456 € chez Cdiscount (guide du 21/10/2026). Vendu sans Windows.'),
  N('Acer Nitro V 17 AI ANV17-41 Ryzen AI 9 HX 370 RTX 5070 16 Go DDR5 1 To SSD 144 Hz FHD 17,3 pouces', 1699, 1650, 1800, true, CG),
  N('ASUS ROG Strix G16 G615LR Ryzen AI 9 HX 370 RTX 5070 Ti 16 Go DDR5 1 To SSD 165 Hz QHD+ 16 pouces', 1789, 1750, 1900, true, CG),
  N('Lenovo LOQ 15IRX10 83JE0007FR Core i7-13650HX RTX 5070 32 Go DDR5 1 To SSD 165 Hz WQHD 15,6 pouces', 1914, 1900, 2030, true, JV, '1 913,60 € chez Darty, 2 025,90 € chez Cdiscount (guide du 21/10/2026). Vendu sans Windows.'),
  N('MSI Vector 16 HX AI Core Ultra 9 285HX RTX 5070 Ti 32 Go DDR5 1 To SSD 240 Hz QHD+ Mini-LED 16 pouces', 1949, 1900, 2100, true, CG),
  N('MSI Crosshair 17 HX AI Core Ultra 9 285HX RTX 5070 Ti 32 Go DDR5 2 To SSD 240 Hz QHD+ 17,3 pouces', 1999, 1950, 2100, true, CG),
  // ---- Promotions passées : repères de prix (offres terminées) ----
  N('ASUS TUF Gaming A16 TUF608UP-RV116 Ryzen 7 260 RTX 5070 16 Go RAM 512 Go SSD 165 Hz WUXGA 16 pouces', 1550, 1400, 1700, false, 'Cdiscount', 'Promotion de mai 2026 (terminée) : 1 399,99 € au lieu de 1 699,99 €. Repère de prix seulement.'),
  N('Lenovo LOQ 15IRX10 83JE003MFR Core i7-13650HX RTX 5070 32 Go RAM 1 To SSD 144 Hz FHD 15,6 pouces', 1650, 1500, 1800, false, 'Cdiscount', 'Promotion de mai 2026 (terminée) : 1 499,99 € au lieu de 1 799,99 €. Repère de prix seulement.'),
  N('Gigabyte Gaming A16 CWHI3FR894SH Core i7-13620H RTX 5070 16 Go RAM 1 To SSD 165 Hz FHD 16 pouces', 1450, 1400, 1500, false, 'Cdiscount', 'Promotion de mai 2026 (terminée) : 1 399,99 € au lieu de 1 499 €. Repère de prix seulement.'),
  // ---- Au-dessus de 2000 € ----
  N('Acer Nitro V 17 Ryzen 7 260 RTX 5070 32 Go RAM 1 To SSD 144 Hz FHD 17,3 pouces', 2262, 2262, 2606, true, JV, '2 261,98 € chez Cdiscount, jusqu\'à 2 606 € ailleurs (guide du 21/10/2026).'),
  N('MSI Vector 16 HX AI Core Ultra 7 255HX RTX 5070 Ti 32 Go DDR5 1 To SSD 240 Hz QHD+ 16 pouces', 2700, 2700, 2700, true, JV, '2 699,99 € chez Fnac et Darty (guide du 21/10/2026).'),
  N('ASUS ROG Strix SCAR 16 Core Ultra 9 285HX RTX 5070 Ti 32 Go DDR5 1 To SSD 240 Hz QHD+ Mini-LED 16 pouces', 2969, 2900, 3100, true, CG),
  N('HP OMEN Max 16 Core Ultra 9 275HX RTX 5080 32 Go DDR5 1 To SSD 240 Hz QHD+ OLED 16 pouces', 2999, 2950, 3100, true, CG),
  N('HP OMEN Max 16-ah0000sf Core Ultra 9 275HX RTX 5080 32 Go RAM 1 To SSD 240 Hz QHD+ OLED 16 pouces', 3499, 3499, 3499, true, JV, '3 499 € chez Amazon (guide du 06/09/2026).'),
  N('ASUS ROG Strix G18 G835LX Core Ultra 9 285HX RTX 5090 32 Go DDR5 2 To SSD 240 Hz QHD+ Mini-LED 18 pouces', 3500, 3500, 3600, true, CG),
  N('Razer Blade 16 2025 Ryzen AI 9 HX 370 RTX 5090 32 Go DDR5 2 To SSD 240 Hz QHD+ OLED 16 pouces', 3956, 3900, 4000, true, CG),
  N('MSI Vector 16 HX AI Core Ultra 9 275HX RTX 5080 32 Go DDR5 1 To SSD 240 Hz QHD+ 16 pouces', 4555, 4500, 4600, true, JV, '4 555 € chez RDC, Darty et Fnac (guide du 06/09/2026).'),
  N('Dell Alienware 18 Area-51 Core Ultra 9 275HX RTX 5080 32 Go RAM 1 To SSD 240 Hz QHD+ 18 pouces', 4749, 4749, 4749, true, JV, '4 749 € chez Amazon (guide du 06/09/2026).'),
  N('ASUS ROG Strix Scar 18 2025 Core Ultra 9 275HX RTX 5090 64 Go DDR5 2 To SSD 240 Hz QHD+ Mini-LED 18 pouces', 4966, 4966, 5607, true, JV, '4 966 € chez Amazon, 5 607 € chez Darty (guide du 06/09/2026).'),
  N('ASUS ROG Zephyrus G16 2025 Core Ultra 9 285H RTX 5090 64 Go RAM 2 To SSD 240 Hz QHD+ OLED 16 pouces', 5600, 5600, 5600, true, JV, '5 599,99 € chez Amazon (guide du 06/09/2026).')
];

const E = (title, price, min, max, note = '') =>
  ({ title, search: searchOf(title), price, min, max, observed: false, source: 'Estimation', date: DATE, note });

const reconditionne = [
  E('Lenovo Legion 5 Pro 16IRX8 Core i7-13700HX RTX 4060 16 Go DDR5 1 To SSD 165 Hz QHD+ 16 pouces', 950, 850, 1100),
  E('MSI Katana 15 B13VFK Core i7-13620H RTX 4060 16 Go DDR5 1 To SSD 144 Hz FHD 15,6 pouces', 850, 750, 950),
  E('Lenovo LOQ 15IRX9 Core i5-13450HX RTX 4060 16 Go DDR5 512 Go SSD 144 Hz FHD 15,6 pouces', 800, 700, 900),
  E('ASUS TUF Gaming F15 FX507ZI4 Core i7-12700H RTX 4070 16 Go DDR5 1 To SSD 144 Hz FHD 15,6 pouces', 950, 850, 1050),
  E('ASUS TUF Gaming A15 FA507UI Ryzen 9 8945H RTX 4070 16 Go DDR5 1 To SSD 144 Hz FHD 15,6 pouces', 1075, 950, 1200),
  E('Acer Predator Helios Neo 16 Core i7-14700HX RTX 4070 16 Go DDR5 1 To SSD 165 Hz WUXGA 16 pouces', 1150, 1000, 1300),
  E('ASUS ROG Strix G17 G713PI Ryzen 9 7945HX RTX 4070 16 Go DDR5 1 To SSD 240 Hz QHD 17,3 pouces', 1150, 1000, 1300),
  E('HP Omen 16-wf1 Core i7-14700HX RTX 4070 32 Go DDR5 1 To SSD 240 Hz QHD 16 pouces', 1250, 1100, 1400),
  E('ASUS ROG Strix G16 G614JIR Core i9-14900HX RTX 4070 16 Go DDR5 1 To SSD 240 Hz QHD+ 16 pouces', 1300, 1150, 1450),
  E('Lenovo Legion Pro 5 16IRX9 Core i7-14700HX RTX 4070 32 Go DDR5 1 To SSD 240 Hz QHD+ 16 pouces', 1350, 1200, 1550),
  E('Alienware m16 R2 Core Ultra 9 185H RTX 4070 32 Go DDR5 1 To SSD 240 Hz QHD+ 16 pouces', 1450, 1300, 1600),
  E('ASUS ROG Zephyrus G14 2024 Ryzen 9 8945HS RTX 4070 32 Go LPDDR5X 1 To SSD 120 Hz OLED 14 pouces', 1500, 1300, 1700),
  E('ASUS ROG Strix Scar 16 G634JZ Core i9-13980HX RTX 4080 32 Go DDR5 1 To SSD 240 Hz QHD+ 16 pouces', 1650, 1450, 1850),
  E('MSI Raider GE78 HX Core i9-13980HX RTX 4080 32 Go DDR5 2 To SSD 240 Hz QHD+ 17,3 pouces', 1850, 1650, 2050),
  E('Acer Predator Helios 18 Core i9-14900HX RTX 4080 32 Go DDR5 1 To SSD 250 Hz QHD+ 18 pouces', 1900, 1700, 2150),
  E('Razer Blade 16 2024 Core i9-14900HX RTX 4080 32 Go DDR5 1 To SSD 240 Hz QHD+ OLED 16 pouces', 2200, 1950, 2450),
  E('Lenovo Legion 9i 16IRX9 Core i9-14900HX RTX 4090 32 Go DDR5 2 To SSD 240 Hz QHD+ Mini-LED 16 pouces', 2400, 2100, 2700),
  E('Alienware m18 R2 Core i9-14900HX RTX 4090 32 Go DDR5 2 To SSD 165 Hz QHD+ 18 pouces', 2500, 2200, 2800)
];

const occasion = [
  E('Acer Nitro 5 AN515-58 Core i5-12500H RTX 3060 16 Go DDR5 512 Go SSD 144 Hz FHD 15,6 pouces', 620, 550, 700),
  E('HP Victus 16-r0 Core i7-13700H RTX 4060 16 Go DDR5 1 To SSD 144 Hz FHD 16,1 pouces', 800, 700, 900),
  E('HP Omen 16 Ryzen 7 7840HS RTX 4060 16 Go DDR5 1 To SSD 165 Hz FHD 16,1 pouces', 849, 750, 950),
  E('Lenovo Legion 5 Pro 16IRX8 Core i7-13700HX RTX 4060 16 Go DDR5 1 To SSD 165 Hz QHD+ 16 pouces', 950, 850, 1050),
  E('ASUS TUF Gaming A17 FA707XI Ryzen 9 7940HS RTX 4070 16 Go DDR5 1 To SSD 144 Hz FHD 17,3 pouces', 1000, 900, 1100),
  E('Razer Blade 15 2022 Core i7-12800H RTX 3070 Ti 16 Go DDR5 1 To SSD 240 Hz QHD 15,6 pouces', 1000, 850, 1150),
  E('Acer Predator Helios 16 PH16-71 Core i7-13700HX RTX 4070 16 Go DDR5 1 To SSD 165 Hz QHD+ 16 pouces', 1050, 900, 1200),
  E('Lenovo Legion Pro 5 16IRX8 Core i7-13700HX RTX 4070 32 Go DDR5 1 To SSD 165 Hz QHD+ 16 pouces', 1100, 950, 1250),
  E('ASUS ROG Strix G16 G614JI Core i9-13980HX RTX 4070 16 Go DDR5 1 To SSD 240 Hz QHD+ 16 pouces', 1100, 950, 1250),
  E('Lenovo Legion 7 16IAX7 Core i9-12900HX RTX 3080 Ti 32 Go DDR5 1 To SSD 165 Hz QHD+ 16 pouces', 1250, 1100, 1400),
  E('MSI GE76 Raider Core i9-12900HX RTX 3080 Ti 32 Go DDR5 2 To SSD 360 Hz FHD 17,3 pouces', 1300, 1100, 1500),
  E('MSI Vector GP68 HX Core i9-13950HX RTX 4080 32 Go DDR5 1 To SSD 240 Hz QHD+ 16 pouces', 1450, 1250, 1650),
  E('Alienware m16 R1 Core i9-13900HX RTX 4080 32 Go DDR5 1 To SSD 240 Hz QHD+ 16 pouces', 1500, 1300, 1700),
  E('ASUS ROG Strix Scar 17 G733PZ Ryzen 9 7945HX RTX 4080 32 Go DDR5 1 To SSD 240 Hz QHD 17,3 pouces', 1500, 1300, 1700),
  E('ASUS ROG Strix Scar 18 G834JY Core i9-13980HX RTX 4090 32 Go DDR5 2 To SSD 240 Hz QHD+ 18 pouces', 2300, 2000, 2600)
];

module.exports = { neuf, reconditionne, occasion, bonsplans: [], DATE };

};
__MODS["/src/sources/catalog.js"] = function (require, module, exports, __dirname) {
// Catalogue : nettoyage/validation des données, construction des fiches, liens vers les boutiques,
// et mise à jour GRATUITE depuis un fichier catalog.json publié (variable CATALOG_URL, facultatif).
//
// L'appli ne "cherche" rien toute seule sur internet : elle ne lit que ce catalogue. Aucun scraping,
// aucune clé, aucun paiement. Les liens sont toujours fabriqués ici, jamais repris tels quels de l'extérieur.
const data = require('./catalog-data');
const { parseSpecs } = require('../parser');
const { GPU_TABLE } = require('../config');

// ---------- Boutiques (liens de RECHERCHE du modèle, pas d'annonce précise) ----------
const SHOPS = {
  amazon:     { label: 'Amazon',       url: (q) => `https://www.amazon.fr/s?k=${q}` },
  amazonRe:   { label: 'Amazon (reconditionné)', url: (q) => `https://www.amazon.fr/s?k=${q}+reconditionn%C3%A9` },
  backmarket: { label: 'Back Market',  url: (q) => `https://www.backmarket.fr/fr-fr/search?q=${q}` },
  boulanger:  { label: 'Boulanger',    url: (q) => `https://www.boulanger.com/resultats?tr=${q}` },
  ldlc:       { label: 'LDLC',         url: (q) => `https://www.ldlc.com/recherche/${q}/` },
  materiel:   { label: 'Materiel.net', url: (q) => `https://www.materiel.net/recherche/${q}/` },
  cdiscount:  { label: 'Cdiscount',    url: (q) => `https://www.cdiscount.com/search/10/${q}.html` },
  fnac:       { label: 'Fnac',         url: (q) => `https://www.fnac.com/SearchResult/ResultList.aspx?Search=${q}` },
  leboncoin:  { label: 'Leboncoin',    url: (q) => `https://www.leboncoin.fr/recherche?text=${q}` },
  ebay:       { label: 'eBay',         url: (q) => `https://www.ebay.fr/sch/i.html?_nkw=${q}` },
  vinted:     { label: 'Vinted',       url: (q) => `https://www.vinted.fr/catalog?search_text=${q}` }
};
const SHOPS_BY_CATEGORY = {
  neuf: ['amazon', 'boulanger', 'ldlc', 'materiel', 'cdiscount', 'fnac'],
  reconditionne: ['backmarket', 'amazonRe', 'boulanger', 'ebay'],
  occasion: ['leboncoin', 'ebay', 'vinted']
};

// Pages de ventes flash / ventes privées (liens vers l'accueil ou la recherche du site : leur contenu n'est
// pas lisible par l'appli, et Veepee / Showroomprivé sont réservés aux membres).
const FLASH_LINKS = [
  { label: 'Veepee', url: 'https://www.veepee.fr/', note: 'Ventes privées (compte gratuit requis). Cherche « informatique » ou « gaming » dans les ventes en cours.' },
  { label: 'Showroomprivé', url: 'https://www.showroomprive.com/', note: 'Ventes privées (compte gratuit requis). Regarde les univers « high-tech » / « informatique ».' },
  { label: 'Dealabs : PC portables gamer', url: 'https://www.dealabs.com/search?q=pc%20portable%20gamer', note: 'Bons plans partagés par la communauté, avec la date et la température du deal.' },
  { label: 'Amazon : offres flash', url: 'https://www.amazon.fr/deals', note: 'Offres du moment, à filtrer sur « Informatique ».' },
  { label: 'Cdiscount', url: 'https://www.cdiscount.com/', note: 'Ventes flash en page d\'accueil.' },
  { label: 'Boulanger', url: 'https://www.boulanger.com/', note: 'Bons plans et offres du moment.' },
  { label: 'LDLC', url: 'https://www.ldlc.com/', note: 'Promotions et outlet.' },
  { label: 'Rue du Commerce', url: 'https://www.rueducommerce.fr/', note: 'Ventes flash informatique.' },
  { label: 'Back Market', url: 'https://www.backmarket.fr/', note: 'Reconditionné : promotions régulières.' }
];

// Sites autorisés pour les liens d'offres du fichier catalog.json (onglet Bons plans)
const DEAL_HOSTS = ['dealabs.com', 'cdiscount.com', 'amazon.fr', 'boulanger.com', 'ldlc.com', 'materiel.net', 'fnac.com',
  'darty.com', 'rueducommerce.fr', 'backmarket.fr', 'cybertek.fr', 'grosbill.com', 'topachat.com', 'pixmania.com',
  'ubaldi.com', 'veepee.fr', 'showroomprive.com', 'ebay.fr', 'micromania.fr', 'leclerc'];

const CATEGORIES = ['neuf', 'reconditionne', 'occasion', 'bonsplans'];
const LIMIT = { neuf: 60, reconditionne: 40, occasion: 40, bonsplans: 20 };
const MIN_FOR_REPLACE = { neuf: 5, reconditionne: 4, occasion: 4, bonsplans: 0 };

const clean = (s, n = 160) => String(s ?? '').replace(/[\u0000-\u001f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n);

function safeDealUrl(u) {
  try {
    const url = new URL(String(u));
    if (url.protocol !== 'https:' || url.username || url.password || (url.port && url.port !== '443')) return null;
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    if (!DEAL_HOSTS.some((d) => host === d || host.endsWith('.' + d) || (d === 'leclerc' && /(^|\.)e\.leclerc$/.test(host)))) return null;
    url.hash = '';
    return url.href.length <= 400 ? url.href : null;
  } catch { return null; }
}

// Valide UNE entrée du catalogue. Renvoie null si elle est inutilisable.
function cleanEntry(cat, e) {
  if (!e || typeof e !== 'object') return null;
  const title = clean(e.title);
  const specs = parseSpecs(title);
  if (title.length < 12 || !specs.gpu || !GPU_TABLE[specs.gpu] || !specs.ram || !specs.ssd) return null;
  const price = Math.round(Number(e.price));
  if (!Number.isFinite(price) || price < 300 || price > 8000) return null;
  let min = Math.round(Number(e.min)), max = Math.round(Number(e.max));
  if (!Number.isFinite(min) || min < 200 || min > price) min = Math.round(price * 0.9);
  if (!Number.isFinite(max) || max > 9000 || max < price) max = Math.round(price * 1.1);
  const date = /^\d{2}\/\d{2}\/\d{4}$/.test(String(e.date || '')) ? e.date : '';
  const out = {
    title, search: clean(e.search, 90) || title.slice(0, 60), price, min, max,
    observed: e.observed === true, source: clean(e.source, 40), date, note: clean(e.note, 200)
  };
  if (cat === 'bonsplans') {
    const url = safeDealUrl(e.url);
    if (!url) return null;
    out.url = url;
    out.merchant = clean(e.merchant, 40) || new URL(url).hostname.replace(/^www\./, '');
  }
  return out;
}

// Valide un catalogue complet { neuf, reconditionne, occasion, bonsplans, updatedAt }
function cleanRaw(raw) {
  const out = { neuf: [], reconditionne: [], occasion: [], bonsplans: [], total: 0 };
  if (raw && typeof raw.updatedAt === 'string') out.updatedAt = raw.updatedAt.replace(/[^0-9a-zA-Z/. -]/g, '').slice(0, 20);
  const seen = new Set();
  for (const cat of CATEGORIES) {
    const list = raw && Array.isArray(raw[cat]) ? raw[cat] : [];
    for (const e of list.slice(0, LIMIT[cat])) {
      const c = cleanEntry(cat, e);
      const key = c && `${cat}|${c.title.toLowerCase()}`;
      if (!c || seen.has(key)) continue;
      seen.add(key);
      out[cat].push(c);
    }
  }
  out.total = CATEGORIES.reduce((n, c) => n + out[c].length, 0);
  out.updatedAt = clean(raw && raw.updatedAt, 30);
  return out;
}

const BUILTIN = cleanRaw(data);
BUILTIN.updatedAt = data.DATE;

// ---------- Construction des fiches ----------
const photoUrl = (q) => `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(q + ' ordinateur portable')}`;
const links = (cat, search) => {
  const q = encodeURIComponent(search);
  return SHOPS_BY_CATEGORY[cat].map((k) => ({ label: SHOPS[k].label, url: SHOPS[k].url(q) }));
};

function build(c) {
  const out = [];
  for (const cat of CATEGORIES) {
    c[cat].forEach((e, i) => {
      const range = `${e.min}–${e.max} €`;
      const l = {
        id: `${cat}-${i}`, category: cat, title: e.title, price: e.price, approx: true,
        photoUrl: photoUrl(e.search), image: null, sellerType: 'pro'
      };
      if (cat === 'neuf') {
        l.source = e.observed ? 'Prix relevé' : 'Estimation';
        l.priceNote = e.observed
          ? `Prix relevé le ${e.date || 'à une date inconnue'}${e.source ? ' (' + e.source + ')' : ''}, variable selon la boutique`
          : `Estimation ${range}${e.source ? ' (' + e.source + ')' : ''} : à vérifier`;
        l.warrantyMonths = 24; l.links = links(cat, e.search);
      } else if (cat === 'reconditionne') {
        l.source = 'Estimation'; l.priceNote = `Estimation ${range} : à vérifier sur les sites`;
        l.warrantyMonths = 12; l.condition = 'Reconditionné (garantie vendeur)'; l.links = links(cat, e.search);
      } else if (cat === 'occasion') {
        l.source = 'Estimation'; l.priceNote = `Estimation ${range} : cote typique entre particuliers`;
        l.warrantyMonths = 0; l.sellerType = 'particulier'; l.condition = 'Occasion'; l.links = links(cat, e.search);
      } else {
        l.source = e.merchant; l.isDeal = true;
        l.priceNote = `Offre vue le ${e.date || 'récemment'} chez ${e.merchant} : vérifie qu'elle est toujours valable`;
        l.warrantyMonths = 24; l.links = [{ label: `Voir l'offre (${e.merchant})`, url: e.url }];
      }
      if (e.note) l.note = e.note;
      out.push(l);
    });
  }
  return out;
}

// ---------- Catalogue courant (d'origine, ou mis à jour depuis CATALOG_URL) ----------
let state = { raw: BUILTIN, version: 1, source: 'builtin', updatedAt: data.DATE };
let lastFetch = 0, lastAttempt = 0, firstDone = false, inflight = null, lastError = '';

function readUrl() {
  const u = process.env.CATALOG_URL;
  if (!u) return null;
  try {
    const url = new URL(u);
    const local = ['localhost', '127.0.0.1'].includes(url.hostname);
    if (url.protocol !== 'https:' && !(local && url.protocol === 'http:')) return null;
    return url.href;
  } catch { return null; }
}

async function fetchRemote(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`le serveur du catalogue a répondu HTTP ${res.status}`);
    const text = await res.text();
    if (text.length > 600000) throw new Error('catalogue trop volumineux');
    return JSON.parse(text);
  } finally { clearTimeout(timer); }
}

// Met à jour depuis CATALOG_URL. Renvoie { ok, ... }. Sans CATALOG_URL : { ok:false, error:'non configuré' }.
async function refresh({ force = false } = {}) {
  const url = readUrl();
  if (!url) return { ok: false, notConfigured: true, error: 'Aucune adresse de catalogue configurée (variable CATALOG_URL).' };
  if (!force && inflight) return inflight;
  if (Date.now() - lastAttempt < 20000) return { ok: false, error: 'Mise à jour déjà demandée à l\'instant : réessaie dans quelques secondes.', tooSoon: true };
  lastAttempt = Date.now();
  inflight = (async () => {
    try {
      const remote = cleanRaw(await fetchRemote(url));
      if (remote.total === 0) throw new Error('le fichier ne contient aucun modèle exploitable');
      const merged = { updatedAt: remote.updatedAt || new Date().toLocaleDateString('fr-FR'), total: 0 };
      for (const cat of CATEGORIES) merged[cat] = remote[cat].length >= MIN_FOR_REPLACE[cat] ? remote[cat] : BUILTIN[cat];
      merged.total = CATEGORIES.reduce((n, c) => n + merged[c].length, 0);
      state = { raw: merged, version: state.version + 1, source: 'remote', updatedAt: merged.updatedAt };
      lastFetch = Date.now(); lastError = '';
      return { ok: true, updatedAt: merged.updatedAt, counts: Object.fromEntries(CATEGORIES.map((c) => [c, merged[c].length])) };
    } catch (e) {
      lastError = e.name === 'AbortError' ? 'délai dépassé' : e.message;
      return { ok: false, error: `Impossible de lire le catalogue en ligne : ${lastError}. La sélection actuelle est conservée.` };
    } finally { firstDone = true; inflight = null; }
  })();
  return inflight;
}

// Appelé à chaque recherche : première lecture (attente max 3 s) puis relecture toutes les 6 h, sans bloquer.
async function ensureFresh() {
  if (!readUrl()) return;
  if (!firstDone) {
    const p = refresh({ force: true });
    await Promise.race([p, new Promise((r) => setTimeout(r, 3000))]);
  } else if (Date.now() - lastFetch > 6 * 3600 * 1000 && !inflight) {
    refresh().catch(() => {});
  }
}

const current = () => state;
const meta = () => ({ source: state.source, updatedAt: state.updatedAt, refreshable: Boolean(readUrl()), lastError });

module.exports = { name: 'catalog', cleanRaw, build, current, refresh, ensureFresh, meta, FLASH_LINKS, BUILTIN, builtinDate: data.DATE };

};
__MODS["/src/search.js"] = function (require, module, exports, __dirname) {
// Filtrage, tri et pagination des fiches du catalogue.
const catalog = require('./sources/catalog');
const { enrich } = require('./scoring');
const { DEFAULTS } = require('./config');
const { rate } = require('./games');

let cacheVersion = -1;
let cacheList = [];

// Fiches enrichies du catalogue courant (recalculées seulement si le catalogue a changé)
function listings() {
  const s = catalog.current();
  if (s.version !== cacheVersion) {
    cacheList = catalog.build(s.raw).filter((l) => Number.isFinite(l.price) && l.price > 0).map(enrich);
    cacheVersion = s.version;
  }
  return cacheList;
}

const num = (v, d) => (v === undefined || v === '' || Number.isNaN(Number(v)) ? d : Number(v));
const resKey = (r) => (r === 'QHD' || r === 'UHD' ? r : 'FHD');

function screenOk(size, pref) {
  if (!pref || !size) return true;
  if (pref === 'compact') return size <= 15.7;
  if (pref === '16') return size >= 15.8 && size <= 16.5;
  return size >= 16.9; // large
}

function search(all, q = {}) {
  const category = q.category || 'neuf';
  const maxPrice = num(q.maxPrice, DEFAULTS.maxPrice);
  const minPrice = num(q.minPrice, 0);
  const minRam = num(q.minRam, DEFAULTS.minRam);
  const minSsd = num(q.minSsd, DEFAULTS.minSsd);
  const minGpu = num(q.minGpuScore, DEFAULTS.minGpuScore);
  const minVram = num(q.minVram, 0);
  const minCpuTier = num(q.minCpuTier, 0);
  const minRefresh = num(q.minRefresh, 0);
  const minReliability = q.onlyReliable === '1' ? 75 : 0;
  const brands = (q.brands || '').split(',').filter(Boolean).map((b) => b.toLowerCase());
  const text = (q.q || '').toLowerCase().trim();

  const out = all.filter((l) => {
    if (l.category !== category) return false;
    if (l.price > maxPrice || l.price < minPrice) return false;
    if (l.scores.gpu < minGpu) return false;
    if (minVram && (l.vram || 0) < minVram) return false;
    if ((l.specs.ram || 0) < minRam) return false;
    if ((l.specs.ssd || 0) < minSsd) return false;
    if ((l.specs.cpuTier || 0) < minCpuTier) return false;
    if ((l.specs.refresh || 0) < minRefresh) return false;
    if (!screenOk(l.specs.screenSize, q.screen)) return false;
    if (q.resolution === 'qhd' && !['QHD', 'UHD'].includes(l.specs.resolution)) return false;
    if (q.panel === 'premium' && !['OLED', 'Mini-LED'].includes(l.specs.panel)) return false;
    if (l.scores.reliability < minReliability) return false;
    if (brands.length && !brands.includes((l.brand || '').toLowerCase())) return false;
    if (text && !l.title.toLowerCase().includes(text)) return false;
    return true;
  });

  const ideal = maxPrice * DEFAULTS.idealRatio;
  const value = (l) => l.scores.global / l.price;
  const recommended = (l) => l.scores.global + (l.price <= ideal ? 6 : 0);
  const sorters = {
    recommended: (a, b) => recommended(b) - recommended(a),
    price_asc: (a, b) => a.price - b.price,
    price_desc: (a, b) => b.price - a.price,
    perf: (a, b) => b.scores.perf - a.scores.perf,
    reliability: (a, b) => b.scores.reliability - a.scores.reliability,
    value: (a, b) => value(b) - value(a)
  };
  out.sort(sorters[q.sort] || sorters.recommended);

  const limit = Math.min(num(q.limit, 12), 50);
  const page = Math.max(num(q.page, 1), 1);
  const items = out.slice((page - 1) * limit, page * limit).map((l) => ({
    ...l,
    games: rate(l.scores.gpu, { vram: l.vram, resolution: resKey(l.specs.resolution), cpuTier: l.specs.cpuTier })
  }));
  return { total: out.length, page, limit, items, ideal: Math.round(ideal) };
}

module.exports = { listings, search };

};
// Serveur web : sert l'interface (dossier public/) et une petite API.
// Aucune clé, aucun compte, aucun paiement. Variable facultative : CATALOG_URL (mise à jour gratuite, voir README).
const http = require('http');
const fs = require('fs');
const path = require('path');

const { listings, search } = __load(__resolve('/server.js', './src/search'));
const { DEFAULTS, GPU_OPTIONS } = __load(__resolve('/server.js', './src/config'));
const { advise } = __load(__resolve('/server.js', './src/advisor'));
const { analyze } = __load(__resolve('/server.js', './src/analyzer'));
const catalog = __load(__resolve('/server.js', './src/sources/catalog'));

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.ico': 'image/x-icon'
};
const SECURITY = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
};

function json(res, code, data) {
  res.writeHead(code, { ...SECURITY, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(data));
}

function sendStatic(res, rel) {
  const type = TYPES[path.extname(rel)] || 'application/octet-stream';
  const headers = { ...SECURITY, 'Content-Type': type };
  if (global.__PUB) { // version "un seul fichier" : les pages sont intégrées au code
    const body = global.__PUB[rel];
    if (body === undefined) { res.writeHead(404, SECURITY); return res.end('Introuvable'); }
    res.writeHead(200, headers);
    return res.end(body);
  }
  const full = path.normalize(path.join(PUBLIC, rel));
  if (!full.startsWith(PUBLIC)) { res.writeHead(403, SECURITY); return res.end('Interdit'); }
  fs.readFile(full, (err, buf) => {
    if (err) { res.writeHead(404, SECURITY); return res.end('Introuvable'); }
    res.writeHead(200, headers);
    res.end(buf);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const params = Object.fromEntries(url.searchParams);

  try {
    if (url.pathname === '/api/search') {
      await catalog.ensureFresh();
      const result = search(listings(), params);
      return json(res, 200, {
        ...result, defaults: DEFAULTS, gpuOptions: GPU_OPTIONS, meta: catalog.meta(),
        flash: params.category === 'bonsplans' ? catalog.FLASH_LINKS : undefined
      });
    }
    if (url.pathname === '/api/advise') return json(res, 200, advise(params.budget));
    if (url.pathname === '/api/analyze') {
      await catalog.ensureFresh();
      const a = analyze(params);
      // Combien de modèles du catalogue correspondent à ces critères, par onglet
      const all = listings();
      const q = { ...params, maxPrice: a.criteria.budget };
      a.matches = {};
      for (const cat of ['neuf', 'reconditionne', 'occasion']) a.matches[cat] = search(all, { ...q, category: cat, limit: 1 }).total;
      return json(res, 200, a);
    }
    if (url.pathname === '/api/refresh' && req.method === 'POST') {
      const r = await catalog.refresh();
      return json(res, r.ok ? 200 : (r.notConfigured ? 404 : r.tooSoon ? 429 : 502), { ...r, meta: catalog.meta() });
    }
  } catch (e) {
    return json(res, 500, { error: 'Erreur interne' });
  }

  sendStatic(res, url.pathname === '/' ? '/index.html' : url.pathname);
});

server.listen(PORT, () => {
  console.log(`\n  Appli prête → http://localhost:${PORT}\n`);
});
