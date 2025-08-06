// 简易 Canvas 星空背景
const cvs = document.getElementById('starfield');
const ctx = cvs.getContext('2d');
let w = cvs.width = window.innerWidth;
let h = cvs.height = window.innerHeight;

const stars = Array(200).fill().map(() => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 1.5,
  d: Math.random() * 0.5
}));

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#ffffff';
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += s.d;
    if (s.y > h) s.y = 0;
  });
  requestAnimationFrame(draw);
}
window.addEventListener('resize', () => {
  w = cvs.width = window.innerWidth;
  h = cvs.height = window.innerHeight;
});
draw();
