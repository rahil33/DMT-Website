// js/animations/canvas.js
// Hero canvas (particles + blobs) and Quote section canvas (waves)

// ── HERO CANVAS ────────────────────────────────────────
const hc = document.getElementById('heroCanvas');
const hx = hc.getContext('2d');
let hw, hh, ht = 0;

function resizeHero() {
  hw = hc.width  = hc.offsetWidth;
  hh = hc.height = hc.offsetHeight;
}
resizeHero();
window.addEventListener('resize', resizeHero);

// Floating particles
const pts = Array.from({ length: 60 }, () => ({
  x:  Math.random(),
  y:  Math.random(),
  vx: (Math.random() - .5) * .0003,
  vy: (Math.random() - .5) * .0003,
  r:  Math.random() * .003 + .001,
  a:  Math.random() * .5   + .1,
}));

function drawHero() {
  ht += .004;
  hx.clearRect(0, 0, hw, hh);
  hx.fillStyle = '#060606';
  hx.fillRect(0, 0, hw, hh);

  // animated gradient blobs
  [
    [.25 + Math.sin(ht) * .1,       .3  + Math.cos(ht * .7) * .1,  .45, 'rgba(201,168,92,.07)'],
    [.72 + Math.cos(ht * .8) * .08, .62 + Math.sin(ht * .6) * .08, .28, 'rgba(201,168,92,.04)'],
    [.5  + Math.sin(ht * 1.1) * .12, .82 + Math.cos(ht) * .06,     .38, 'rgba(120,80,30,.05)'],
  ].forEach(([bx, by, br, col]) => {
    const gx = bx * hw, gy = by * hh, gr = br * Math.max(hw, hh);
    const g  = hx.createRadialGradient(gx, gy, 0, gx, gy, gr);
    g.addColorSpot(0, col); g.addColorSpot(1, 'transparent');
    hx.fillStyle = g; hx.fillRect(0, 0, hw, hh);
  });

  // subtle grid
  hx.strokeStyle = 'rgba(201,168,92,.025)'; hx.lineWidth = 1;
  for (let x = 0; x < hw; x += 64) { hx.beginPath(); hx.moveTo(x, 0); hx.lineTo(x, hh); hx.stroke(); }
  for (let y = 0; y < hh; y += 64) { hx.beginPath(); hx.moveTo(0, y); hx.lineTo(hw, y); hx.stroke(); }

  // particles
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
    if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
    hx.beginPath();
    hx.arc(p.x * hw, p.y * hh, p.r * Math.min(hw, hh), 0, Math.PI * 2);
    hx.fillStyle = `rgba(201,168,92,${p.a * .6})`;
    hx.fill();
  });

  // connect close particles
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = (pts[i].x - pts[j].x) * hw;
      const dy = (pts[i].y - pts[j].y) * hh;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 120) {
        hx.strokeStyle = `rgba(201,168,92,${(1 - d / 120) * .06})`;
        hx.lineWidth = .5;
        hx.beginPath();
        hx.moveTo(pts[i].x * hw, pts[i].y * hh);
        hx.lineTo(pts[j].x * hw, pts[j].y * hh);
        hx.stroke();
      }
    }
  }

  requestAnimationFrame(drawHero);
}
drawHero();

// ── QUOTE CANVAS ────────────────────────────────────────
const qc = document.getElementById('quoteCanvas');
const qx = qc.getContext('2d');
let qw, qh, qt = 0;

function resizeQuote() {
  qw = qc.width  = qc.offsetWidth;
  qh = qc.height = qc.offsetHeight;
}
resizeQuote();
window.addEventListener('resize', resizeQuote);

function drawQuote() {
  qt += .006;
  qx.clearRect(0, 0, qw, qh);
  qx.fillStyle = '#040404';
  qx.fillRect(0, 0, qw, qh);

  for (let i = 0; i < 7; i++) {
    const phase = qt + i * 1.1;
    const cx = qw * (.1 + i * .14 + Math.sin(phase) * .07);
    const cy = qh * (.3 + Math.cos(phase * .7) * .3);
    const r  = qw * (.12 + Math.sin(phase * .5) * .04);
    const a  = .06 + Math.sin(phase) * .02;
    const g  = qx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorSpot(0,  `rgba(201,168,92,${a})`);
    g.addColorSpot(.5, `rgba(100,60,10,${a * .3})`);
    g.addColorSpot(1,  'transparent');
    qx.fillStyle = g; qx.fillRect(0, 0, qw, qh);
  }

  for (let w = 0; w < 8; w++) {
    qx.beginPath();
    qx.strokeStyle = `rgba(201,168,92,${.02 + w * .008})`;
    qx.lineWidth = 1;
    const scrolled = window.scrollY;
    for (let i = 0; i <= qw; i += 3) {
      const y = qh * .5 + Math.sin((i / qw) * Math.PI * 5 + qt + w * .6 + scrolled * .001) * (18 + w * 9);
      i === 0 ? qx.moveTo(i, y) : qx.lineTo(i, y);
    }
    qx.stroke();
  }

  requestAnimationFrame(drawQuote);
}
drawQuote();