// 生成本地全文索引（hexo-generator-search 或 hexo-algolia 可替换）
fetch('/search.json')
  .then(res => res.json())
  .then(data => {
    const input = document.getElementById('search-input');
    const list  = document.getElementById('search-results');
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) return list.innerHTML = '';
      const res = data.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
      ).slice(0,5);
      list.innerHTML = res.map(p =>
        `<li><a href="${p.url}">${p.title}</a></li>`
      ).join('');
    });
  });
