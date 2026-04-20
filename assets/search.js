/* MBA301 — Site-wide search. Fetches search.json, opens a modal with live results. */
(function () {
  'use strict';

  // Find base path from meta tag (". " = root pages, ".." = sub-pages)
  var baseMeta = document.querySelector('meta[name="site-base"]');
  var BASE = (baseMeta && baseMeta.content) ? baseMeta.content : '.';

  var INDEX = null;   // loaded lazily on first open
  var LOADED = false;
  var ACTIVE_INDEX = -1;
  var LAST_RESULTS = [];

  // ----- Inject DOM -----
  var btn = document.createElement('button');
  btn.className = 'mba-search-btn';
  btn.setAttribute('aria-label', 'Search the course');
  btn.innerHTML = '<span class="mba-search-btn-ico">⌕</span><span class="mba-search-btn-text">Search</span><span class="mba-search-btn-kbd">⌘K</span>';
  document.body.appendChild(btn);

  var overlay = document.createElement('div');
  overlay.className = 'mba-search-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = [
    '<div class="mba-search-modal" role="document">',
    '  <div class="mba-search-header">',
    '    <span class="mba-search-ico">⌕</span>',
    '    <input type="text" class="mba-search-input" placeholder="Search 9 units · 27 Slibraries · 135 frameworks · 36 sub-pages — try \'effectuation\', \'Sentient\', \'pitch\', \'loop\'…" autocomplete="off" spellcheck="false">',
    '    <kbd class="mba-search-esc">ESC</kbd>',
    '  </div>',
    '  <div class="mba-search-results" role="listbox"></div>',
    '  <div class="mba-search-footer">',
    '    <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>',
    '    <span><kbd>↵</kbd> open</span>',
    '    <span><kbd>esc</kbd> close</span>',
    '    <span class="mba-search-attr">MBA301 · Site Search</span>',
    '  </div>',
    '</div>'
  ].join('\n');
  document.body.appendChild(overlay);

  var input = overlay.querySelector('.mba-search-input');
  var resultsEl = overlay.querySelector('.mba-search-results');

  // ----- Open / close -----
  function open() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    loadIndex().then(function () {
      input.focus();
      if (!input.value) renderEmpty();
      else search(input.value);
    });
  }
  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    ACTIVE_INDEX = -1;
  }

  btn.addEventListener('click', open);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

  document.addEventListener('keydown', function (e) {
    // Cmd/Ctrl + K → open
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault(); open(); return;
    }
    // '/'  → open (when not typing in an input)
    if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault(); open(); return;
    }
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); return; }
    if (e.key === 'ArrowUp')   { e.preventDefault(); moveActive(-1); return; }
    if (e.key === 'Enter')     { e.preventDefault(); activateSelected(); return; }
  });

  input.addEventListener('input', function () {
    search(input.value);
  });

  // ----- Load index -----
  function loadIndex() {
    if (LOADED) return Promise.resolve(INDEX);
    return fetch(BASE + '/search.json').then(function (r) { return r.json(); }).then(function (data) {
      INDEX = flatten(data);
      LOADED = true;
      return INDEX;
    }).catch(function (err) {
      console.error('MBA301 search index failed to load:', err);
      resultsEl.innerHTML = '<div class="mba-search-empty">Could not load search index.</div>';
      return null;
    });
  }

  function flatten(data) {
    var out = [];
    (data.units || []).forEach(function (u) {
      out.push({ type: 'unit', title: u.title, sub: 'Unit ' + u.n, desc: u.tagline, url: u.url, haystack: (u.title + ' ' + u.tagline + ' unit ' + u.n).toLowerCase(), unit: u.n });
    });
    (data.slibraries || []).forEach(function (s) {
      out.push({ type: 'slibrary', title: s.title, sub: 'Unit ' + s.unit + ' · Slibrary ' + s.n, desc: s.tagline || '', url: s.url, haystack: (s.title + ' slibrary ' + s.n + ' ' + (s.tagline || '')).toLowerCase(), unit: s.unit });
    });
    (data.frameworks || []).forEach(function (f) {
      out.push({ type: 'framework', title: f.title, sub: 'Unit ' + f.unit + ' · Slibrary ' + f.slibrary, desc: f.desc, url: f.url, haystack: (f.title + ' ' + f.desc + ' slibrary ' + f.slibrary).toLowerCase(), unit: f.unit });
    });
    (data.activities || []).forEach(function (a) {
      out.push({ type: 'activity', title: a.title, sub: 'Unit ' + a.unit + ' · Activity', desc: a.lede, url: a.url, haystack: (a.title + ' ' + a.lede + ' activity').toLowerCase(), unit: a.unit });
    });
    (data.cases || []).forEach(function (c) {
      out.push({ type: 'case', title: c.title, sub: 'Unit ' + c.unit + ' · Case Study', desc: c.subtitle, url: c.url, haystack: (c.title + ' ' + c.subtitle + ' case study').toLowerCase(), unit: c.unit });
    });
    (data.prereadings || []).forEach(function (p) {
      out.push({ type: 'prereading', title: p.title, sub: 'Unit ' + p.unit + ' · Pre-Reading · ' + p.author, desc: p.key_framework || '', url: p.url, haystack: (p.title + ' ' + p.author + ' ' + (p.key_framework || '') + ' pre-reading reading').toLowerCase(), unit: p.unit });
    });
    (data.reflections || []).forEach(function (r) {
      out.push({ type: 'reflection', title: 'Reflection — Unit ' + r.unit, sub: 'Unit ' + r.unit + ' · Reflection', desc: 'Three questions for independent study', url: r.url, haystack: ('reflection ' + r.unit_title + ' ' + (r.questions || []).join(' ')).toLowerCase(), unit: r.unit });
    });
    return out;
  }

  // ----- Search -----
  function search(q) {
    q = (q || '').trim().toLowerCase();
    if (!q) { renderEmpty(); return; }
    if (!INDEX) return;

    var tokens = q.split(/\s+/).filter(Boolean);
    var scored = [];
    for (var i = 0; i < INDEX.length; i++) {
      var item = INDEX[i];
      var score = scoreItem(item, tokens, q);
      if (score > 0) scored.push({ item: item, score: score });
    }
    scored.sort(function (a, b) { return b.score - a.score; });
    LAST_RESULTS = scored.slice(0, 40).map(function (s) { return s.item; });
    render(LAST_RESULTS, q);
  }

  function scoreItem(item, tokens, fullQuery) {
    var hay = item.haystack;
    var titleLow = item.title.toLowerCase();
    var score = 0;
    // Exact phrase match in title = biggest boost
    if (titleLow.indexOf(fullQuery) !== -1) score += 30;
    // Phrase match anywhere
    if (hay.indexOf(fullQuery) !== -1) score += 15;
    // Per-token matches
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (!t) continue;
      if (titleLow.indexOf(t) !== -1) score += 10;
      else if (hay.indexOf(t) !== -1) score += 3;
      else return 0; // require every token to match somewhere
    }
    // Type weighting — frameworks and units are most useful to navigate to
    if (item.type === 'framework') score += 1;
    if (item.type === 'unit') score += 2;
    return score;
  }

  // ----- Render -----
  function renderEmpty() {
    resultsEl.innerHTML = '<div class="mba-search-empty">Type to search across all 47 pages.</div>';
    ACTIVE_INDEX = -1;
  }

  function render(results, q) {
    if (!results.length) {
      resultsEl.innerHTML = '<div class="mba-search-empty">No matches for “' + escapeHtml(q) + '”.</div>';
      ACTIVE_INDEX = -1;
      return;
    }
    // Group by type
    var groups = { unit: [], slibrary: [], framework: [], activity: [], case: [], prereading: [], reflection: [] };
    results.forEach(function (r) { if (groups[r.type]) groups[r.type].push(r); });

    var groupMeta = [
      ['unit', 'Units'],
      ['slibrary', 'Slibraries'],
      ['framework', 'Frameworks'],
      ['activity', 'Activities'],
      ['case', 'Case Studies'],
      ['prereading', 'Pre-Readings'],
      ['reflection', 'Reflections']
    ];
    var typeAbbr = { unit:'U', slibrary:'SL', framework:'FW', activity:'AC', case:'CS', prereading:'PR', reflection:'RF' };

    var html = '';
    var flatIdx = 0;
    groupMeta.forEach(function (g) {
      var type = g[0], label = g[1], items = groups[type];
      if (!items.length) return;
      html += '<div class="mba-search-group"><div class="mba-search-group-label">' + label + ' <span class="mba-search-group-count">' + items.length + '</span></div>';
      items.forEach(function (r) {
        var toneClass = r.unit ? 'mba-tone-u' + r.unit : '';
        html += '<a class="mba-search-item ' + toneClass + '" data-idx="' + flatIdx + '" href="' + BASE + '/' + r.url + '">';
        html += '<span class="mba-search-type">' + typeAbbr[r.type] + '</span>';
        html += '<div class="mba-search-item-body">';
        html += '<div class="mba-search-item-title">' + highlight(r.title, q) + '</div>';
        html += '<div class="mba-search-item-sub">' + r.sub;
        if (r.desc) html += ' · <span class="mba-search-item-desc">' + highlight(truncate(r.desc, 90), q) + '</span>';
        html += '</div>';
        html += '</div>';
        html += '<span class="mba-search-arrow">→</span>';
        html += '</a>';
        flatIdx++;
      });
      html += '</div>';
    });
    resultsEl.innerHTML = html;
    // Build flat list for keyboard nav
    LAST_RESULTS = []; // rebuild flat order same as groups
    groupMeta.forEach(function (g) { LAST_RESULTS = LAST_RESULTS.concat(groups[g[0]]); });
    ACTIVE_INDEX = 0;
    setActive(0);
  }

  function setActive(i) {
    var items = resultsEl.querySelectorAll('.mba-search-item');
    items.forEach(function (el, idx) {
      if (idx === i) el.classList.add('is-active');
      else el.classList.remove('is-active');
    });
    if (items[i]) items[i].scrollIntoView({ block: 'nearest' });
    ACTIVE_INDEX = i;
  }

  function moveActive(delta) {
    var items = resultsEl.querySelectorAll('.mba-search-item');
    if (!items.length) return;
    var next = ACTIVE_INDEX + delta;
    if (next < 0) next = items.length - 1;
    if (next >= items.length) next = 0;
    setActive(next);
  }

  function activateSelected() {
    var items = resultsEl.querySelectorAll('.mba-search-item');
    if (items[ACTIVE_INDEX]) items[ACTIVE_INDEX].click();
  }

  // ----- Helpers -----
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (m) {
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m];
    });
  }
  function truncate(s, n) {
    if (s.length <= n) return s;
    return s.slice(0, n) + '…';
  }
  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    var esc = escapeHtml(text);
    // Highlight each token
    var tokens = q.split(/\s+/).filter(Boolean);
    tokens.forEach(function (t) {
      var re = new RegExp('(' + escapeRegex(t) + ')', 'ig');
      esc = esc.replace(re, '<mark>$1</mark>');
    });
    return esc;
  }
  function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

})();
