window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('[data-scroll]').forEach(el => {
    const speed = parseFloat(el.dataset.scroll || 0.1);
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
});
