/* VN Trade — shared script */

// ── NAV ──────────────────────────────────────────────────────
(function () {
  const header = document.querySelector('.site-header');
  const burger = document.querySelector('.nav-burger');
  const links  = document.querySelector('.nav-links');

  // Solid background once scrolled
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('solid', window.scrollY > 40);
  }, { passive: true });

  // Mobile toggle
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
  }

  // Mark active link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── FADE IN ON SCROLL ─────────────────────────────────────────
(function () {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// ── COMMODITY FILTER ──────────────────────────────────────────
(function () {
  const btns = document.querySelectorAll('.filter-btn');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('[data-sector]').forEach(row => {
        row.style.display = (filter === 'all' || row.dataset.sector === filter) ? '' : 'none';
      });
    });
  });
})();

// ── FAQ ACCORDION ─────────────────────────────────────────────
(function () {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ── CONTACT FORM ──────────────────────────────────────────────
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      form.innerHTML = `<div style="text-align:center;padding:3rem 0">
        <p style="font-family:var(--font-display);font-size:1.6rem;color:var(--white);margin-bottom:.75rem">Enquiry received.</p>
        <p style="color:var(--text-soft);font-size:.9rem">We will respond within one business day.</p>
      </div>`;
    }, 900);
  });
})();
