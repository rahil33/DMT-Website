// js/cursor.js
// Custom cursor — dot + trailing ring + label

const cur   = document.getElementById('cur');
const ring  = document.getElementById('cur-ring');
const label = document.getElementById('cur-label');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * .1;
  ry += (my - ry) * .1;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  label.style.left = (mx + 28) + 'px';
  label.style.top  = (my - 16) + 'px';
  requestAnimationFrame(animRing);
})();

function cursorEnter(txt = '') {
  cur.classList.add('big');
  ring.style.width  = '70px';
  ring.style.height = '70px';
  ring.style.borderColor = 'rgba(201,168,92,.6)';
  if (txt) { label.textContent = txt; label.style.opacity = '1'; }
}
function cursorLeave() {
  cur.classList.remove('big');
  ring.style.width  = '44px';
  ring.style.height = '44px';
  ring.style.borderColor = 'rgba(201,168,92,.4)';
  label.style.opacity = '0';
}

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursorEnter(''));
  el.addEventListener('mouseleave', cursorLeave);
});
document.querySelectorAll('.wk-card, .wk-card2').forEach(el => {
  el.addEventListener('mouseenter', () => cursorEnter('View'));
  el.addEventListener('mouseleave', cursorLeave);
});

// expose so other modules can call them
window.cursorEnter = cursorEnter;
window.cursorLeave = cursorLeave;
