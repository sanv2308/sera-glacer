// SERA — Catalog index choreography.
// Two responsibilities:
//   1. Filter sections by category (chip click)
//   2. Reveal cards on scroll-into-view, with a short stagger per section

(function () {
  'use strict';

  // ---- Filter ----------------------------------------------------------
  const filterRoot = document.getElementById('catFilter');
  const sections   = Array.from(document.querySelectorAll('.cat-section'));

  if (filterRoot) {
    filterRoot.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;

      filterRoot.querySelectorAll('button').forEach(b => b.classList.toggle('is-active', b === btn));
      const filter = btn.dataset.filter;
      sections.forEach(s => {
        const match = filter === 'all' || s.dataset.category === filter;
        s.classList.toggle('is-hidden', !match);
      });

      // After filtering, re-trigger reveal for the visible cards (they may be
      // in viewport already but we want the stagger to feel deliberate).
      revealVisible();
    });
  }

  // ---- Reveal on scroll ------------------------------------------------
  const cards = Array.from(document.querySelectorAll('.cat-card'));

  function staggerWithinSection(target) {
    // Find the parent section and index within it; stagger by that index.
    const section = target.closest('.cat-section');
    if (!section) return 0;
    const peers = Array.from(section.querySelectorAll('.cat-card'));
    return peers.indexOf(target);
  }

  let io;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        const i = staggerWithinSection(card);
        card.style.transitionDelay = (i * 80) + 'ms';
        card.classList.add('is-in');
        io.unobserve(card);
      });
    }, {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.08,
    });
    cards.forEach(c => io.observe(c));
  } else {
    cards.forEach(c => c.classList.add('is-in'));
  }

  function revealVisible() {
    // For filtered re-show: any card that's currently visible and not yet
    // 'is-in' should reveal with its section-local stagger.
    cards.forEach(c => {
      if (c.classList.contains('is-in')) return;
      const r = c.getBoundingClientRect();
      const inView = r.top < window.innerHeight && r.bottom > 0;
      if (!inView) return;
      const i = staggerWithinSection(c);
      c.style.transitionDelay = (i * 80) + 'ms';
      c.classList.add('is-in');
      if (io) io.unobserve(c);
    });
  }

})();
