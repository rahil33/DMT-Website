// js/letters.js
// Magnetic + jiggle/bounce/spin letter animations for hero title

const lines = [
  { id: 'ww1', text: 'WE MAP',  outline: false, gold: false },
  { id: 'ww2', text: 'YOUR',    outline: true,  gold: false },
  { id: 'ww3', text: 'MARKET',  outline: false, gold: true  },
];

const anims = ['jiggle', 'bounce', 'spin'];

lines.forEach(line => {
  const wrap = document.getElementById(line.id);
  let i = 0;

  for (const ch of line.text) {
    // spaces
    if (ch === ' ') {
      const sp = document.createElement('span');
      sp.style.cssText = 'display:inline-block;width:.3em';
      sp.innerHTML = '&nbsp;';
      wrap.appendChild(sp);
      continue;
    }

    const span = document.createElement('span');
    span.className = 'mag-letter' +
      (line.outline ? ' outline' : '') +
      (line.gold    ? ' gold'    : '');
    span.textContent = ch;
    span.dataset.i   = i++;
    span.style.opacity = '0';

    // stagger reveal on load
    const delay = (lines.indexOf(line) * 4 + i) * 0.05 + 0.2;
    setTimeout(() => {
      span.style.transition = 'opacity .5s ease, transform .5s ease';
      span.style.opacity    = '1';
    }, delay * 1000);

    // magnetic pull on hover
    span.addEventListener('mousemove', e => {
      const r  = span.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      span.style.transform   = `translate(${dx}px,${dy}px) scale(1.12)`;
      span.style.color       = line.outline ? 'transparent' : line.gold ? '#e8c87a' : '#c9a85c';
      span.style.textShadow  = line.outline ? '' : '0 0 40px rgba(201,168,92,.5)';
    });

    // jiggle/bounce/spin on mouse leave
    span.addEventListener('mouseleave', () => {
      const anim = anims[Math.floor(Math.random() * anims.length)];
      span.style.animation  = `${anim} .7s cubic-bezier(.36,.07,.19,.97) forwards`;
      span.style.color      = '';
      span.style.textShadow = '';
      setTimeout(() => {
        span.style.animation  = '';
        span.style.transform  = '';
      }, 700);
    });

    wrap.appendChild(span);
  }
});
