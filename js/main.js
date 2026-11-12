/* =========================================================
   PORTFOLIO TOM DORLEANS — JavaScript vanille (aucune dépendance)
   ========================================================= */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---- 1. Menu mobile ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav-menu');
  var label = toggle.querySelector('.nav-toggle-label');

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    label.textContent = 'menu';
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'fermer' : 'menu';
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---- 2. Lien actif selon la section visible ---- */
  var links = document.querySelectorAll('[data-nav]');
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);

  if ('IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---- 3. Filtre des projets ---- */
  var filters = document.querySelectorAll('.filter');
  var projects = document.querySelectorAll('.project');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.dataset.filter;
      filters.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      projects.forEach(function (p) {
        p.classList.toggle('is-hidden', cat !== 'all' && p.dataset.cat !== cat);
      });
    });
  });

  /* ---- 4. Apparition douce des blocs au scroll ---- */
  var revealTargets = document.querySelectorAll('.card, .panel, .stat, .code-block:not(.code-mini):not(.code-in-card), .table-wrap, .veille-question, .company-banner');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach(function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  /* ---- 5. Copier l'adresse e-mail ---- */
  var copyBtn = document.getElementById('copy-mail');
  var feedback = document.getElementById('copy-feedback');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var mail = copyBtn.dataset.mail;
      var done = function () { feedback.textContent = '→ adresse copiée'; };
      var fail = function () { feedback.textContent = '→ copie impossible, sélectionnez l\'adresse'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail).then(done, fail);
      } else { fail(); }
    });
  }

  /* ---- 6. Poids réel de la page (lien avec la veille Green Code) ---- */
  function formatKo(bytes) { return (bytes / 1024).toFixed(0) + ' Ko'; }
  function measureWeight() {
    var out = document.getElementById('page-weight');
    var note = document.getElementById('page-weight-note');
    if (!out || !window.performance || !performance.getEntriesByType) return;
    var total = 0, count = 0;
    var navEntry = performance.getEntriesByType('navigation')[0];
    if (navEntry) { total += navEntry.transferSize || navEntry.encodedBodySize || 0; count++; }
    performance.getEntriesByType('resource').forEach(function (r) {
      total += r.transferSize || r.encodedBodySize || 0; count++;
    });
    if (total > 0) {
      out.textContent = formatKo(total);
      note.textContent = count + ' requêtes · mesuré en direct';
    } else {
      out.textContent = '< 200 Ko';
      note.textContent = 'estimation (mesure bloquée par le navigateur)';
    }
  }
  if (document.readyState === 'complete') { setTimeout(measureWeight, 300); }
  else { window.addEventListener('load', function () { setTimeout(measureWeight, 300); }); }

  /* ---- 7. Année du pied de page ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
