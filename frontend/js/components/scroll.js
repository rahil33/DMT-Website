// js/scroll.js
// Nav compact on scroll, reveal animations, stat counters, parallax

// ── NAV COMPACT ───────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 60);
});

// ── REVEAL ON SCROLL ──────────────────────────────────
const revealObs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
  { threshold: .1 }
);
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── COUNTER ANIMATION ─────────────────────────────────
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el  = e.target;
    const tgt = +el.dataset.t;
    const suf = el.dataset.s || '+';
    let n = 0;
    const step = tgt / 55;
    const t = setInterval(() => {
      n = Math.min(n + step, tgt);
      el.textContent = Math.round(n) + suf;
      if (n >= tgt) clearInterval(t);
    }, 28);
    counterObs.unobserve(el);
  });
}, { threshold: .5 });

document.querySelectorAll('[data-t]').forEach(el => counterObs.observe(el));

// ── PARALLAX ─────────────────────────────────────────
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) heroTitle.style.transform = `translateY(${sy * .15}px)`;
});
