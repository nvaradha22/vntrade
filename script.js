// ============================================================
// ECTRADE  ·  script.js  v3.0
// Static Ticker · Expert Chat · Slider · UI utilities
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  buildStaticTicker();
  initStickyHeader();
  initMobileMenu();
  setActiveNav();
  initSlider();
  initContactForm();
  initSmoothScroll();
  initExpertChat();

});

// ─────────────────────────────────────────────────────────────
// STATIC MARKET TICKER
// Always renders — no API dependency, no blank widget risk
// ─────────────────────────────────────────────────────────────
function buildStaticTicker() {
  const container = document.getElementById('tickerItems');
  if (!container) return;

  // Realistic daily closing reference data (indicative only)
  const data = [
    { name: 'Thermal Coal 6300 GAR',  price: '108.50',  unit: 'USD/t',    chg: '+0.80',  up: true  },
    { name: 'Thermal Coal 5500 NAR',  price: '72.30',   unit: 'USD/t',    chg: '+0.45',  up: true  },
    { name: 'Iron Ore 62% Fe',        price: '118.50',  unit: 'USD/t',    chg: '-0.85',  up: false },
    { name: 'Steel Billets (FOB CIS)', price: '490',    unit: 'USD/t',    chg: '+1.50',  up: true  },
    { name: 'HRC (CME)',              price: '540',     unit: 'USD/t',    chg: '-2.00',  up: false },
    { name: 'Copper Cathode (LME)',   price: '9,142',   unit: 'USD/t',    chg: '-38',    up: false },
    { name: 'Urea Gran. FOB Yuzhne',  price: '310',     unit: 'USD/t',    chg: '+2.00',  up: true  },
    { name: 'DAP 18-46-0',           price: '580',     unit: 'USD/t',    chg: '-1.50',  up: false },
    { name: 'Wheat (FOB Black Sea)',  price: '215',     unit: 'USD/t',    chg: '+0.60',  up: true  },
    { name: 'Corn (FOB Ukraine)',     price: '188',     unit: 'USD/t',    chg: '-0.40',  up: false },
  ];

  // Build double-length for seamless loop
  const allItems = [...data, ...data];

  allItems.forEach((d, i) => {
    const el = document.createElement('div');
    el.className = 'ticker-item';
    el.innerHTML =
      `<span class="ti-name">${d.name}</span>` +
      `<span class="ti-price">${d.price}</span>` +
      `<span class="ti-unit">${d.unit}</span>` +
      `<span class="ti-chg ${d.up ? 'ti-up' : 'ti-dn'}">${d.up ? '▲' : '▼'} ${d.chg}</span>`;
    // Add divider between items
    container.appendChild(el);
    if (i < allItems.length - 1) {
      const div = document.createElement('span');
      div.className = 'ti-divider';
      container.appendChild(div);
    }
  });
}

// ─────────────────────────────────────────────────────────────
// STICKY HEADER
// ─────────────────────────────────────────────────────────────
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });
}

// ─────────────────────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('mainNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// ─────────────────────────────────────────────────────────────
// ACTIVE NAV LINK
// ─────────────────────────────────────────────────────────────
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a:not(.nav-cta)').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });
}

// ─────────────────────────────────────────────────────────────
// INSIGHTS SLIDER
// ─────────────────────────────────────────────────────────────
function initSlider() {
  const slider = document.getElementById('insightsSlider');
  if (!slider) return;

  const cards = Array.from(slider.children);
  const total = cards.length;
  const getVis = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  let vis = getVis(), maxIdx = Math.max(0, total - vis), current = 0;
  const dots = document.getElementById('sliderDots');

  function buildDots() {
    if (!dots) return;
    dots.innerHTML = '';
    vis = getVis(); maxIdx = Math.max(0, total - vis);
    for (let i = 0; i <= maxIdx; i++) {
      const d = document.createElement('button');
      d.className = 'slider-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dots.appendChild(d);
    }
  }
  buildDots();

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIdx));
    slider.style.transform = `translateX(-${current * (cards[0].offsetWidth + 24)}px)`;
    dots?.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  document.getElementById('sliderPrev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('sliderNext')?.addEventListener('click', () => goTo(current + 1));
  const auto = setInterval(() => goTo(current >= maxIdx ? 0 : current + 1), 5500);
  window.addEventListener('resize', () => { buildDots(); goTo(0); });
}

// ─────────────────────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Enquiry Sent ✓'; btn.disabled = true;
    btn.style.cssText = 'background:#2ecc71;color:#fff;border-color:#2ecc71';
    setTimeout(() => {
      btn.textContent = orig; btn.disabled = false; btn.style.cssText = '';
      form.reset();
    }, 4000);
  });
}

// ─────────────────────────────────────────────────────────────
// SMOOTH ANCHOR SCROLL
// ─────────────────────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

// ─────────────────────────────────────────────────────────────
// COMMODITY EXPERT CHAT
// Button-menu logic · 3-sector paths · Lead-capture CTA
// ─────────────────────────────────────────────────────────────
function initExpertChat() {
  const panel   = document.getElementById('chatPanel');
  const btn     = document.getElementById('chatBtn');
  const closeB  = document.getElementById('chatCloseBtn');
  const bodyEl  = document.getElementById('chatBody');
  const menuEl  = document.getElementById('chatMenuBtns');
  if (!panel || !btn) return;

  let open = false;
  setTimeout(() => { if (!open) openChat(); }, 4500);
  btn.addEventListener('click', () => open ? closeChat() : openChat());
  closeB?.addEventListener('click', closeChat);

  function openChat()  { panel.classList.add('visible'); open = true; render('main'); }
  function closeChat() { panel.classList.remove('visible'); open = false; }

  // ── MENU TREE ──────────────────────────────────────────────
  const tree = {

    main: {
      msg: 'Welcome to ECTRADE. We are an independent physical commodity broker. Which sector can we help you with today?',
      btns: [
        { label: 'High-Thermal Grade Coal',     go: 'coal'        },
        { label: 'Metals & Mining',              go: 'metals'      },
        { label: 'Fertilizers & Agri Products', go: 'fertilizers' },
      ]
    },

    coal: {
      msg: 'ECTRADE specialises in High-Thermal Grade Coal brokerage — 5,500 to 6,300 kcal/kg GAR — on FOB, CFR and CIF basis. Key origins: Indonesia, South Africa, Colombia, Australia.',
      btns: [
        { label: '→ Specifications & cargo sizes', go: 'coal_spec'  },
        { label: '→ Origins & pricing basis',      go: 'coal_origin'},
        { label: '→ Inquire about a coal trade',   go: 'inquire', cta: true },
        { label: '← Main menu',                    go: 'main'       },
      ]
    },

    coal_spec: {
      msg: 'Standard spec: GAR 5,500–6,300 kcal/kg · TM ≤25% · Ash ≤12% · Sulphur ≤1.0% · HGI ≥45. Cargo sizes: Handysize 25–40K MT · Supramax 45–60K MT · Panamax 65–80K MT.',
      btns: [
        { label: '→ Inquire about a coal trade', go: 'inquire', cta: true },
        { label: '← Back to coal',               go: 'coal' },
      ]
    },

    coal_origin: {
      msg: 'Indonesia (ICI2/ICI3/ICI4 benchmark) · South Africa, Richards Bay (API4) · Colombia (API2 reference) · Australia (API5). Pricing typically index-linked at loading port.',
      btns: [
        { label: '→ Inquire about a coal trade', go: 'inquire', cta: true },
        { label: '← Back to coal',               go: 'coal' },
      ]
    },

    metals: {
      msg: 'We facilitate physical metals transactions across Steel products, Iron Ore and Copper — connecting mills, mining companies and end-users on key global corridors.',
      btns: [
        { label: '→ Steel Products & Iron Ore',   go: 'steel'  },
        { label: '→ Copper',                      go: 'copper' },
        { label: '→ Inquire about a metals trade',go: 'inquire', cta: true },
        { label: '← Main menu',                   go: 'main'   },
      ]
    },

    steel: {
      msg: 'Products: Steel Billets 3SP/5SP, Hot-Rolled Coil (HRC), Wire Rod, Iron Ore lump & fines 62% Fe. Origins: Australia, Brazil (ore) · CIS, Turkey (steel). Pricing: Platts SBB, SGX FEF1! reference.',
      btns: [
        { label: '→ Inquire about a steel trade', go: 'inquire', cta: true },
        { label: '← Back to metals',              go: 'metals' },
      ]
    },

    copper: {
      msg: 'Copper Cathode Grade A (BS EN 1978) and Copper Concentrate. Origins: Chile, Peru, DRC. Basis: CIF, FOB. Lot size typically 500–5,000 MT cathode. Pricing: LME Cash / 3-Month.',
      btns: [
        { label: '→ Inquire about a copper trade', go: 'inquire', cta: true },
        { label: '← Back to metals',               go: 'metals' },
      ]
    },

    fertilizers: {
      msg: 'Primary focus: Urea (granular & prilled), DAP 18-46-0, NPK complexes and MOP. Secondary: Wheat, Corn, Soybeans and Raw Sugar. Origins: Middle East, Russia, Egypt, Morocco (OCP).',
      btns: [
        { label: '→ Urea, DAP & NPK detail',        go: 'urea_detail'  },
        { label: '→ Grains & Sugar',                go: 'agri_detail'  },
        { label: '→ Inquire about a fertilizer trade', go: 'inquire', cta: true },
        { label: '← Main menu',                     go: 'main'         },
      ]
    },

    urea_detail: {
      msg: 'Urea Granular: N ≥46%, Biuret ≤1.0%, bulk / jumbo bags. Urea Prilled: same N content, spherical free-flow. DAP: P₂O₅ ≥46%, N ≥18%. Cargo range: 5,000–50,000 MT FOB/CFR/CIF. Pricing: Argus / ICIS benchmark.',
      btns: [
        { label: '→ Inquire about fertilizers', go: 'inquire', cta: true },
        { label: '← Back',                      go: 'fertilizers' },
      ]
    },

    agri_detail: {
      msg: 'Wheat (FOB Black Sea / LATAM) · Corn/Maize (FOB Ukraine, Brazil) · Soybeans (FOB Brazil, Argentina) · Raw Sugar ICUMSA 45 (Brazil). Basis: FOB, CFR, CIF. Cargo: 5,000–55,000 MT.',
      btns: [
        { label: '→ Inquire about agri products', go: 'inquire', cta: true },
        { label: '← Back',                        go: 'fertilizers' },
      ]
    },

    inquire: {
      msg: 'An ECTRADE broker will respond to your enquiry within one business day. Click below to open the contact form.',
      btns: [
        { label: '→ Open Contact Form', go: 'go_contact', cta: true },
        { label: '← Main menu',         go: 'main' },
      ]
    }

  }; // end tree

  function render(key) {
    const node = tree[key];
    if (!node) return;
    bodyEl.innerHTML = '';
    const msg = document.createElement('div');
    msg.className = 'chat-msg';
    msg.textContent = node.msg;
    bodyEl.appendChild(msg);

    menuEl.innerHTML = '';
    node.btns.forEach(b => {
      const el = document.createElement('button');
      el.className = 'chat-menu-btn' + (b.cta ? ' primary-btn' : '');
      el.textContent = b.label;
      el.addEventListener('click', () => {
        if (b.go === 'go_contact') window.location.href = 'contact.html';
        else render(b.go);
      });
      menuEl.appendChild(el);
    });
  }

} // end initExpertChat
