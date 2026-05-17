// SERA landing — minimal choreography
// (1) Reveal the extracted final frame of glacier video 3 once it is decoded.
// (2) Hide the scroll hint once the user scrolls.
// (3) Pre-warm a hidden preload for catalog.html so the CTA hand-off is instant.

(function () {
  'use strict';

  const base = document.getElementById('cinemaBase');
  const hint = document.getElementById('scrollHint');
  const cta  = document.getElementById('enterCatalog');
  const catalogUrl = cta ? cta.href : new URL('sera_club_catalog.html', document.baseURI).href;

  // ---- Reveal the static glacier frame ---------------------------------
  function revealFrame() {
    if (!base) return;
    if (base.complete) {
      base.classList.add('is-ready');
    } else {
      base.addEventListener('load', () => base.classList.add('is-ready'), { once: true });
      base.addEventListener('error', () => base.classList.add('is-ready'), { once: true });
    }
  }
  revealFrame();

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
    l.href = catalogUrl;
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

  // ---- Keep the frame visible across tab visibility changes ------------
  document.addEventListener('visibilitychange', () => {
    if (!base) return;
    if (!document.hidden && !base.classList.contains('is-ready')) revealFrame();
  });

})();
