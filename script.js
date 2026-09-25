/* Rasmy Freight LLC. Small, dependency-free helpers. */
(function () {
  'use strict';

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
      nav.classList.toggle('open', open);
    }
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) setOpen(false); });
  }

  // Quote form
  var form = document.getElementById('quote-form');
  if (!form) return;
  var msg = document.getElementById('form-msg');
  var loadedAt = Date.now();

  function show(text) {
    if (!msg) return;
    msg.textContent = text;
    msg.classList.add('show');
    msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // No past pickup dates
  var date = document.getElementById('f-date');
  if (date) {
    var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    date.min = d.toISOString().slice(0, 10);
  }

  // On a real host (staging, localhost, production), send people back to this site's thank-you page.
  var next = document.getElementById('next-url');
  if (next && /^https?:$/.test(location.protocol)) {
    try { next.value = new URL('thank-you.html', location.href).href; } catch (e) {}
  }

  form.addEventListener('submit', function (e) {
    if (msg) msg.classList.remove('show');

    // Simple spam checks: honeypot filled, or submitted faster than a person can type.
    var honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value) { e.preventDefault(); return; }
    if (Date.now() - loadedAt < 1500) { e.preventDefault(); show('Please take a moment to check your details, then send again.'); return; }

    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
      return;
    }

    // Opening the file straight from disk: the form service can't receive it, so preview the flow only.
    if (location.protocol === 'file:') {
      e.preventDefault();
      window.location.href = 'thank-you.html';
      return;
    }

    // Add context to the email
    var ctx = document.createElement('input');
    ctx.type = 'hidden'; ctx.name = 'Sent from page'; ctx.value = location.href;
    form.appendChild(ctx);

    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
  });
})();
