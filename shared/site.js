/* Sera shared site script — nav/footer injection, mega-menu, mobile drawer,
   cart drawer (localStorage-backed), client-side search, sticky-on-scroll.
   Loaded by every page except sera_club_catalog.html and mobile/catalog.html. */

(function () {
  'use strict';

  // -----------------------------------------------------------------
  // Resolve asset prefix — pages in landing/ and mobile/ need ../ prefix
  // for nav links pointing to root assets and pages.
  // -----------------------------------------------------------------
  const isSubdir = /\/(landing|mobile)\//.test(window.location.pathname);
  const ROOT = isSubdir ? '../' : '';

  // -----------------------------------------------------------------
  // Product catalog — single source of truth for nav + search + cart.
  // -----------------------------------------------------------------
  const PRODUCTS = {
    compounds: [
      { id: 'retatrutide',     name: 'Retatrutide',           mechanism: 'Metabolic · Weight-Management', image: 'Photoroom_20260513_001352.PNG', price: 'XX.XX', category: 'Metabolic' },
      { id: '5-amino-1mq',     name: '5-Amino-1MQ',           mechanism: 'Metabolic · Weight-Management', image: 'Photoroom_20260513_001459.PNG', price: 'XX.XX', category: 'Metabolic' },
      { id: 'mots-c',          name: 'MOTS-c',                mechanism: 'Metabolic · Cellular',          image: 'Photoroom_20260513_001516.PNG', price: 'XX.XX', category: 'Metabolic' },
      { id: 'bpc-157',         name: 'BPC-157',               mechanism: 'Recovery · Tissue Repair',      image: 'Photoroom_20260513_001538.PNG', price: 'XX.XX', category: 'Recovery' },
      { id: 'tb-500',          name: 'TB-500',                mechanism: 'Recovery · Tissue Repair',      image: 'Photoroom_20260513_001555.PNG', price: 'XX.XX', category: 'Recovery' },
      { id: 'ghk-cu',          name: 'GHK-Cu',                mechanism: 'Recovery · Cellular',           image: 'Photoroom_20260513_001610.PNG', price: 'XX.XX', category: 'Recovery' },
      { id: 'cjc-ipamorelin',  name: 'CJC with Ipamorelin',   mechanism: 'GH · Performance',              image: 'Photoroom_20260513_001629.PNG', price: 'XX.XX', category: 'GH/Performance' },
      { id: 'tesamorelin',     name: 'Tesamorelin',           mechanism: 'GH · Performance',              image: 'Photoroom_20260513_001644.PNG', price: 'XX.XX', category: 'GH/Performance' },
      { id: 'igf',             name: 'IGF',                   mechanism: 'GH · Performance',              image: 'Photoroom_20260513_001702.PNG', price: 'XX.XX', category: 'GH/Performance' },
      { id: 'nad',             name: 'NAD+',                  mechanism: 'Cellular · Longevity',          image: 'Photoroom_20260513_001732.PNG', price: 'XX.XX', category: 'Cellular' }
    ],
    blended: [
      { id: 'klow', name: 'Klow', mechanism: 'Blended Stack', image: 'Photoroom_20260513_001749.PNG', price: 'XX.XX' },
      { id: 'glow', name: 'Glow', mechanism: 'Blended Stack', image: 'Photoroom_20260513_001815.PNG', price: 'XX.XX' }
    ],
    stacks: [
      { id: 'stack-adiposity',       name: 'Adiposity & Metabolic Signaling',          ingredients: ['Retatrutide','5-Amino-1MQ','MOTS-c','Tesamorelin'], vials: ['retatrutide','5-amino-1mq','mots-c','tesamorelin'], price: 'XX.XX' },
      { id: 'stack-gh-secretagogue', name: 'Growth Hormone Secretagogue & Lean Mass',  ingredients: ['Tesamorelin','CJC-1295 no DAC','Ipamorelin'],       vials: ['tesamorelin','cjc-ipamorelin','cjc-ipamorelin'],   price: 'XX.XX' },
      { id: 'stack-recovery',        name: 'Recovery, Performance & Connective Tissue', ingredients: ['CJC-1295 no DAC','Ipamorelin','TB-500','BPC-157'],  vials: ['cjc-ipamorelin','cjc-ipamorelin','tb-500','bpc-157'], price: 'XX.XX' },
      { id: 'stack-tissue-remodel',  name: 'Tissue Remodeling & Cellular Repair',       ingredients: ['BPC-157','TB-500','GHK-Cu'],                       vials: ['bpc-157','tb-500','ghk-cu'],                       price: 'XX.XX' },
      { id: 'stack-mitochondria',    name: 'Mitochondrial Function & Cellular Longevity', ingredients: ['GHK-Cu','MOTS-c','5-Amino-1MQ','NAD+'],          vials: ['ghk-cu','mots-c','5-amino-1mq','nad'],             price: 'XX.XX' },
      { id: 'stack-glucose',         name: 'Glucose Regulation & Metabolic Pathway',    ingredients: ['Retatrutide','MOTS-c','5-Amino-1MQ','BPC-157'],     vials: ['retatrutide','mots-c','5-amino-1mq','bpc-157'],    price: 'XX.XX' }
    ]
  };

  function productImagePath(filename) {
    return ROOT + 'assets/catalog-before-hover/' + filename;
  }

  function findProduct(id) {
    return PRODUCTS.compounds.find(p => p.id === id)
      || PRODUCTS.blended.find(p => p.id === id)
      || PRODUCTS.stacks.find(p => p.id === id);
  }

  // -----------------------------------------------------------------
  // SVG icon strings (reused everywhere)
  // -----------------------------------------------------------------
  const ICONS = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.4 10.7a2 2 0 0 1-2 1.75H8.4a2 2 0 0 1-2-1.75L5 8Z"/><path d="M9 8V6a3 3 0 1 1 6 0v2"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    account: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    hamburger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    caret: '<svg class="site-nav__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    arrow: '<svg class="megamenu__cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13a2 2 0 0 0 2 1.8h6a2 2 0 0 0 2-1.8l1-13"/></svg>'
  };

  // -----------------------------------------------------------------
  // Nav markup builder
  // -----------------------------------------------------------------
  function buildNav() {
    const megaCols = [
      { title: 'Metabolic · Weight-Management', items: [
        ['Retatrutide', 'retatrutide'],
        ['5-Amino-1MQ', '5-amino-1mq'],
        ['MOTS-c', 'mots-c']
      ]},
      { title: 'Recovery · Tissue Repair', items: [
        ['BPC-157', 'bpc-157'],
        ['TB-500', 'tb-500'],
        ['GHK-Cu', 'ghk-cu']
      ]},
      { title: 'GH · Performance', items: [
        ['CJC with Ipamorelin', 'cjc-ipamorelin'],
        ['Tesamorelin', 'tesamorelin'],
        ['IGF', 'igf']
      ]},
      { title: 'Cellular · Longevity', items: [
        ['NAD+', 'nad'],
        ['MOTS-c', 'mots-c'],
        ['GHK-Cu', 'ghk-cu']
      ]},
      { title: 'Blended Stack Products', items: [
        ['Klow', 'klow'],
        ['Glow', 'glow']
      ]},
      { title: 'Research Stacks', items: PRODUCTS.stacks.map(s => [s.name, s.id]) }
    ];

    const megaColsHtml = megaCols.map(col => `
      <div class="megamenu__col">
        <h3>${col.title}</h3>
        <ul>
          ${col.items.map(([label, anchor]) => `<li><a href="${ROOT}shop.html#${anchor}">${label}</a></li>`).join('')}
        </ul>
      </div>
    `).join('');

    const navLinks = [
      { label: 'Home', href: ROOT + 'index.html', key: 'home' },
      { label: 'FAQ', href: ROOT + 'faq.html', key: 'faq' },
      { label: 'COA Library', href: ROOT + 'coa-library.html', key: 'coa' },
      { label: 'Order Tracking', href: ROOT + 'order-tracking.html', key: 'tracking' },
      { label: 'Contact', href: ROOT + 'contact.html', key: 'contact' }
    ];

    const currentPage = document.body.getAttribute('data-page');
    const linksHtml = navLinks.map(l =>
      `<a class="site-nav__link ${l.key === currentPage ? 'is-active' : ''}" href="${l.href}">${l.label}</a>`
    ).join('');

    return `
      <nav class="site-nav" aria-label="Primary">
        <a class="site-nav__brand" href="${ROOT}index.html" aria-label="Sera Labs home">
          <img src="${ROOT}sera-logo.png" alt="Sera Labs" />
        </a>
        <div class="site-nav__center">
          <a class="site-nav__link ${currentPage === 'home' ? 'is-active' : ''}" href="${ROOT}index.html">Home</a>
          <button class="site-nav__shop-trigger" type="button" aria-haspopup="true" aria-expanded="false" data-shop-trigger>
            Shop ${ICONS.caret}
          </button>
          <a class="site-nav__link ${currentPage === 'faq' ? 'is-active' : ''}" href="${ROOT}faq.html">FAQ</a>
          <a class="site-nav__link ${currentPage === 'coa' ? 'is-active' : ''}" href="${ROOT}coa-library.html">COA Library</a>
          <a class="site-nav__link ${currentPage === 'tracking' ? 'is-active' : ''}" href="${ROOT}order-tracking.html">Order Tracking</a>
          <a class="site-nav__link ${currentPage === 'contact' ? 'is-active' : ''}" href="${ROOT}contact.html">Contact</a>
        </div>
        <div class="site-nav__utility">
          <button class="site-nav__icon" type="button" data-open-search aria-label="Open search">${ICONS.search}</button>
          <a class="site-nav__signin" href="${ROOT}account.html">Sign in</a>
          <a class="site-nav__icon" href="${ROOT}account.html" aria-label="Account" data-hide-on-desktop>${ICONS.account}</a>
          <button class="site-nav__icon" type="button" data-open-cart aria-label="Open cart">
            ${ICONS.cart}
            <span class="site-nav__badge" data-cart-badge>0</span>
          </button>
          <button class="site-nav__hamburger" type="button" data-open-drawer aria-label="Open menu">${ICONS.hamburger}</button>
        </div>
        <div class="megamenu" data-megamenu>
          <a class="megamenu__cta" href="${ROOT}sera_club_catalog.html">
            Explore all compounds ${ICONS.arrow}
          </a>
          <div class="megamenu__grid">
            ${megaColsHtml}
          </div>
        </div>
      </nav>
    `;
  }

  function buildMobileDrawer() {
    const drawerShopCols = [
      { title: 'Metabolic · Weight-Management', items: [['Retatrutide', 'retatrutide'], ['5-Amino-1MQ', '5-amino-1mq'], ['MOTS-c', 'mots-c']] },
      { title: 'Recovery · Tissue Repair', items: [['BPC-157', 'bpc-157'], ['TB-500', 'tb-500'], ['GHK-Cu', 'ghk-cu']] },
      { title: 'GH · Performance', items: [['CJC with Ipamorelin', 'cjc-ipamorelin'], ['Tesamorelin', 'tesamorelin'], ['IGF', 'igf']] },
      { title: 'Cellular · Longevity', items: [['NAD+', 'nad'], ['MOTS-c', 'mots-c'], ['GHK-Cu', 'ghk-cu']] },
      { title: 'Blended Stack Products', items: [['Klow', 'klow'], ['Glow', 'glow']] },
      { title: 'Research Stacks', items: PRODUCTS.stacks.map(s => [s.name, s.id]) }
    ];

    const shopColsHtml = drawerShopCols.map(col => `
      <div class="site-drawer__shop-section">
        <h4>${col.title}</h4>
        <ul>
          ${col.items.map(([label, anchor]) => `<li><a href="${ROOT}shop.html#${anchor}">${label}</a></li>`).join('')}
        </ul>
      </div>
    `).join('');

    return `
      <div class="drawer-backdrop" data-drawer-backdrop></div>
      <aside class="site-drawer" data-drawer aria-label="Mobile menu" aria-hidden="true">
        <div class="site-drawer__head">
          <button class="site-drawer__close" type="button" data-close-drawer aria-label="Close menu">${ICONS.close}</button>
        </div>
        <ul class="site-drawer__list">
          <li class="site-drawer__item"><a href="${ROOT}index.html">Home</a></li>
          <li class="site-drawer__item">
            <button class="site-drawer__shop-toggle" type="button" aria-expanded="false" data-drawer-shop-toggle>
              Shop ${ICONS.caret}
            </button>
            <div class="site-drawer__shop-content" data-drawer-shop-content>
              ${shopColsHtml}
            </div>
          </li>
          <li class="site-drawer__item"><a href="${ROOT}faq.html">FAQ</a></li>
          <li class="site-drawer__item"><a href="${ROOT}coa-library.html">COA Library</a></li>
          <li class="site-drawer__item"><a href="${ROOT}order-tracking.html">Order Tracking</a></li>
          <li class="site-drawer__item"><a href="${ROOT}contact.html">Contact</a></li>
          <li class="site-drawer__item"><a href="${ROOT}account.html">Sign in</a></li>
        </ul>
        <div class="site-drawer__divider"></div>
        <a class="site-drawer__explore-cta" href="${ROOT}sera_club_catalog.html">Explore all compounds →</a>
      </aside>
    `;
  }

  function buildFooter() {
    return `
      <footer class="site-footer">
        <div class="site-footer__cols">
          <div class="site-footer__col">
            <h4>Support</h4>
            <ul>
              <li><a href="${ROOT}coa-library.html">COA Library</a></li>
              <li><a href="${ROOT}order-tracking.html">Order Tracking</a></li>
              <li><a href="${ROOT}faq.html">FAQ</a></li>
              <li><a href="${ROOT}contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="site-footer__col">
            <h4>Company</h4>
            <ul>
              <li><a href="${ROOT}terms.html">Terms of Service</a></li>
              <li><a href="${ROOT}refunds-returns.html">Refunds &amp; Returns</a></li>
              <li><a href="${ROOT}privacy.html">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="site-footer__col">
            <h4>Newsletter</h4>
            <p class="site-footer__newsletter-copy">Lab-verified peptide research drops. No noise.</p>
            <form class="site-footer__newsletter-form" data-newsletter>
              <input type="email" placeholder="you@research.org" aria-label="Email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div class="site-footer__bottom">
          <span class="site-footer__copy">© 2026 Sera Labs · Research use only · For laboratory research</span>
          <div class="site-footer__social">
            <a href="https://www.instagram.com/vialcluub?igsh=MW5lN2ppMDlyZjN2NQ==" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>
          </div>
        </div>
      </footer>
    `;
  }

  function buildCartDrawer() {
    return `
      <div class="cart-backdrop" data-cart-backdrop></div>
      <aside class="cart-drawer" data-cart-drawer aria-label="Shopping cart" aria-hidden="true">
        <div class="cart-drawer__head">
          <h2 class="cart-drawer__title">Your cart</h2>
          <button class="cart-drawer__close" type="button" data-close-cart aria-label="Close cart">${ICONS.close}</button>
        </div>
        <div class="cart-drawer__items" data-cart-items></div>
        <div class="cart-drawer__foot">
          <div class="cart-drawer__subtotal">
            <span>Subtotal</span>
            <span class="cart-drawer__subtotal-value" data-cart-subtotal>$0.00</span>
          </div>
          <button class="cart-drawer__checkout" type="button" data-checkout>Checkout</button>
          <a class="cart-drawer__view-link" href="${ROOT}cart.html">View full cart</a>
        </div>
      </aside>
    `;
  }

  function buildSearchModal() {
    return `
      <div class="search-modal" data-search-modal aria-label="Search products" aria-hidden="true">
        <div class="search-modal__head">
          <span class="search-modal__icon">${ICONS.search}</span>
          <input class="search-modal__input" type="search" placeholder="Search compounds, stacks..." data-search-input aria-label="Search compounds and stacks" />
          <button class="search-modal__close" type="button" data-close-search aria-label="Close search">${ICONS.close}</button>
        </div>
        <div class="search-modal__results" data-search-results>
          <p class="search-modal__hint">Type to find a compound or stack.</p>
        </div>
      </div>
    `;
  }

  // -----------------------------------------------------------------
  // Cart state — localStorage
  // -----------------------------------------------------------------
  const CART_KEY = 'sera_cart_v1';

  function readCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function writeCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
    syncCart();
  }

  function addToCart(productId) {
    const product = findProduct(productId);
    if (!product) return;
    const items = readCart();
    const existing = items.find(i => i.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        image: product.image || null,
        type: product.vials ? 'stack' : 'compound'
      });
    }
    writeCart(items);
    openCart();
  }

  function updateQty(productId, delta) {
    const items = readCart();
    const item = items.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      writeCart(items.filter(i => i.id !== productId));
    } else {
      writeCart(items);
    }
  }

  function removeItem(productId) {
    writeCart(readCart().filter(i => i.id !== productId));
  }

  function syncCart() {
    const items = readCart();
    const totalCount = items.reduce((sum, i) => sum + i.qty, 0);

    document.querySelectorAll('[data-cart-badge]').forEach(badge => {
      badge.textContent = totalCount;
      badge.classList.toggle('is-visible', totalCount > 0);
    });

    const itemsEl = document.querySelector('[data-cart-items]');
    const subtotalEl = document.querySelector('[data-cart-subtotal]');
    if (!itemsEl) return;

    if (items.length === 0) {
      itemsEl.innerHTML = '<p class="cart-drawer__empty">Your cart is empty.</p>';
      if (subtotalEl) subtotalEl.textContent = '$0.00';
      return;
    }

    let subtotal = 0;
    itemsEl.innerHTML = items.map(item => {
      const priceNum = parseFloat(item.price);
      const lineTotal = isNaN(priceNum) ? null : priceNum * item.qty;
      if (lineTotal !== null) subtotal += lineTotal;
      const imgHtml = item.image ? `<img src="${productImagePath(item.image)}" alt="" />` : '';
      const priceLabel = isNaN(priceNum) ? `$${item.price}` : `$${priceNum.toFixed(2)}`;
      return `
        <div class="cart-item">
          <div class="cart-item__thumb">${imgHtml}</div>
          <div class="cart-item__body">
            <span class="cart-item__name">${item.name}</span>
            <span class="cart-item__price">${priceLabel}</span>
          </div>
          <div class="cart-item__controls">
            <div class="cart-item__qty">
              <button type="button" data-qty-dec="${item.id}" aria-label="Decrease quantity">−</button>
              <span>${item.qty}</span>
              <button type="button" data-qty-inc="${item.id}" aria-label="Increase quantity">+</button>
            </div>
            <button class="cart-item__remove" type="button" data-remove="${item.id}" aria-label="Remove from cart">${ICONS.trash}</button>
          </div>
        </div>
      `;
    }).join('');

    if (subtotalEl) {
      const hasRealPrices = items.some(i => !isNaN(parseFloat(i.price)));
      subtotalEl.textContent = hasRealPrices ? `$${subtotal.toFixed(2)}` : 'Set after pricing';
    }
  }

  // -----------------------------------------------------------------
  // UI handlers
  // -----------------------------------------------------------------
  function openCart() {
    document.querySelector('[data-cart-drawer]')?.classList.add('is-open');
    document.querySelector('[data-cart-backdrop]')?.classList.add('is-open');
    document.querySelector('[data-cart-drawer]')?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    document.querySelector('[data-cart-drawer]')?.classList.remove('is-open');
    document.querySelector('[data-cart-backdrop]')?.classList.remove('is-open');
    document.querySelector('[data-cart-drawer]')?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openDrawer() {
    document.querySelector('[data-drawer]')?.classList.add('is-open');
    document.querySelector('[data-drawer-backdrop]')?.classList.add('is-open');
    document.querySelector('[data-drawer]')?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    document.querySelector('[data-drawer]')?.classList.remove('is-open');
    document.querySelector('[data-drawer-backdrop]')?.classList.remove('is-open');
    document.querySelector('[data-drawer]')?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openSearch() {
    const modal = document.querySelector('[data-search-modal]');
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.querySelector('[data-search-input]')?.focus(), 80);
  }

  function closeSearch() {
    const modal = document.querySelector('[data-search-modal]');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const input = document.querySelector('[data-search-input]');
    if (input) input.value = '';
    renderSearchResults('');
  }

  function renderSearchResults(query) {
    const resultsEl = document.querySelector('[data-search-results]');
    if (!resultsEl) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      resultsEl.innerHTML = '<p class="search-modal__hint">Type to find a compound or stack.</p>';
      return;
    }
    const all = [
      ...PRODUCTS.compounds.map(p => ({ id: p.id, name: p.name, cat: p.category })),
      ...PRODUCTS.blended.map(p => ({ id: p.id, name: p.name, cat: 'Blended Stack' })),
      ...PRODUCTS.stacks.map(p => ({ id: p.id, name: p.name, cat: 'Research Stack' }))
    ];
    const matches = all.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
    if (matches.length === 0) {
      resultsEl.innerHTML = '<p class="search-modal__hint">No results for "' + query + '".</p>';
      return;
    }
    resultsEl.innerHTML = matches.map(m => `
      <a class="search-modal__result" href="${ROOT}shop.html#${m.id}">
        <span class="search-modal__result-name">${m.name}</span>
        <span class="search-modal__result-cat">${m.cat}</span>
      </a>
    `).join('');
  }

  // -----------------------------------------------------------------
  // Mega-menu open/close (desktop hover + tap)
  // -----------------------------------------------------------------
  function setupMegamenu() {
    const trigger = document.querySelector('[data-shop-trigger]');
    const mega = document.querySelector('[data-megamenu]');
    const nav = document.querySelector('.site-nav');
    if (!trigger || !mega || !nav) return;

    let isOpen = false;
    let hoverTimer;

    function open() {
      clearTimeout(hoverTimer);
      mega.classList.add('is-open');
      trigger.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      isOpen = true;
    }
    function close() {
      mega.classList.remove('is-open');
      trigger.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      isOpen = false;
    }
    function scheduleClose() {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(close, 180);
    }

    trigger.addEventListener('mouseenter', open);
    trigger.addEventListener('click', e => {
      e.preventDefault();
      isOpen ? close() : open();
    });
    mega.addEventListener('mouseenter', open);
    mega.addEventListener('mouseleave', scheduleClose);
    trigger.addEventListener('mouseleave', scheduleClose);

    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !mega.contains(e.target)) close();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) close();
    });
  }

  // -----------------------------------------------------------------
  // Sticky scroll behavior
  // -----------------------------------------------------------------
  function setupSticky() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    function update() {
      nav.classList.toggle('is-scrolled', window.scrollY > 12);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  // -----------------------------------------------------------------
  // Mobile drawer setup
  // -----------------------------------------------------------------
  function setupDrawer() {
    document.querySelector('[data-open-drawer]')?.addEventListener('click', openDrawer);
    document.querySelector('[data-close-drawer]')?.addEventListener('click', closeDrawer);
    document.querySelector('[data-drawer-backdrop]')?.addEventListener('click', closeDrawer);

    const shopToggle = document.querySelector('[data-drawer-shop-toggle]');
    const shopContent = document.querySelector('[data-drawer-shop-content]');
    if (shopToggle && shopContent) {
      shopToggle.addEventListener('click', () => {
        const isExpanded = shopToggle.getAttribute('aria-expanded') === 'true';
        shopToggle.setAttribute('aria-expanded', String(!isExpanded));
        shopContent.classList.toggle('is-open', !isExpanded);
      });
    }
  }

  // -----------------------------------------------------------------
  // Cart drawer setup
  // -----------------------------------------------------------------
  function setupCart() {
    document.querySelector('[data-open-cart]')?.addEventListener('click', openCart);
    document.querySelector('[data-close-cart]')?.addEventListener('click', closeCart);
    document.querySelector('[data-cart-backdrop]')?.addEventListener('click', closeCart);

    document.querySelector('[data-cart-items]')?.addEventListener('click', e => {
      const inc = e.target.closest('[data-qty-inc]');
      const dec = e.target.closest('[data-qty-dec]');
      const rem = e.target.closest('[data-remove]');
      if (inc) updateQty(inc.dataset.qtyInc, 1);
      else if (dec) updateQty(dec.dataset.qtyDec, -1);
      else if (rem) removeItem(rem.dataset.remove);
    });

    document.querySelector('[data-checkout]')?.addEventListener('click', () => {
      alert('Checkout coming soon. Cart is preserved across pages.');
    });

    // Add-to-cart buttons on shop pages
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-add-to-cart]');
      if (btn) addToCart(btn.dataset.addToCart);
    });

    // Cross-tab sync
    window.addEventListener('storage', e => {
      if (e.key === CART_KEY) syncCart();
    });

    syncCart();
  }

  // -----------------------------------------------------------------
  // Search modal setup
  // -----------------------------------------------------------------
  function setupSearch() {
    document.querySelector('[data-open-search]')?.addEventListener('click', openSearch);
    document.querySelector('[data-close-search]')?.addEventListener('click', closeSearch);
    document.querySelector('[data-search-input]')?.addEventListener('input', e => {
      renderSearchResults(e.target.value);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSearch();
    });
  }

  // -----------------------------------------------------------------
  // Newsletter form
  // -----------------------------------------------------------------
  function setupNewsletter() {
    document.querySelector('[data-newsletter]')?.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thanks — we’ll be in touch.');
      e.target.reset();
    });
  }

  // -----------------------------------------------------------------
  // Init — inject markup, then wire handlers
  // -----------------------------------------------------------------
  function init() {
    const navHost = document.getElementById('site-nav');
    const footerHost = document.getElementById('site-footer');
    if (navHost) {
      navHost.outerHTML = buildNav() + buildMobileDrawer() + buildCartDrawer() + buildSearchModal();
    }
    if (footerHost) {
      footerHost.outerHTML = buildFooter();
    }

    setupMegamenu();
    setupSticky();
    setupDrawer();
    setupCart();
    setupSearch();
    setupNewsletter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for shop.html page-script use
  window.SeraSite = {
    addToCart: addToCart,
    products: PRODUCTS,
    productImagePath: productImagePath,
    rootPath: ROOT
  };
})();
