// SERA landing — minimal choreography
// (1) Sync the two cinema videos (black base + white reveal) so the bottle
//     reveal lines up frame-for-frame as the page loads.
// (2) Cross-fade the reveal mask in shortly after first paint so the bottle
//     "breathes" into being.
// (3) Hide the scroll hint once the user scrolls.
// (4) Pre-warm a hidden preload for catalog.html so the CTA hand-off is instant.

(function () {
  'use strict';

  const base = document.getElementById('cinemaBase');
  const hint = document.getElementById('scrollHint');
  const cta  = document.getElementById('enterCatalog');

  // ---- Play the bottle video --------------------------------------------
  function playBase() {
    if (!base) return;
    base.play().catch(() => {});
  }
  if (base) {
    if (base.readyState >= 3) playBase();
    else base.addEventListener('canplay', playBase, { once: true });
    base.addEventListener('ended', () => {
      base.currentTime = 0;
      playBase();
    });
  }

  // ---- Scroll hint auto-hide -------------------------------------------
  let hidden = false;
  function onScroll() {
    if (!hidden && window.scrollY > 40) {
      hint && hint.classList.add('is-hidden');
      hidden = true;
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Preload the catalog so the CTA hand-off is instant --------------
  // We append a hidden <link rel="prefetch"> only if the browser supports it.
  // Once the user hovers the CTA we promote it to a full prefetch.
  function prefetchCatalog() {
    if (document.querySelector('link[data-prefetch="catalog"]')) return;
    const l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = '../sera_club_catalog.html';
    l.as = 'document';
    l.dataset.prefetch = 'catalog';
    document.head.appendChild(l);
  }
  // Fire on idle so it never competes with the video decode
  if ('requestIdleCallback' in window) {
    requestIdleCallback(prefetchCatalog, { timeout: 2000 });
  } else {
    setTimeout(prefetchCatalog, 1200);
  }
  cta && cta.addEventListener('mouseenter', prefetchCatalog, { once: true });

  // ---- Pause videos when the tab is hidden -----------------------------
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      base && base.pause();
    } else {
      playBase();
    }
  });

})();
