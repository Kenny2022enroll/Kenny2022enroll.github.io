(() => {
  const posts = window.YIYU_POSTS || [];
  const config = window.YIYU_CONFIG;
  const siteName = config.site.name;
  const ACCENTS = ['vermilion', 'moss', 'ochre', 'blue', 'ink', 'rose'];
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const post = posts.find((item) => item.slug === slug) || (!slug ? posts[0] : null);
  const main = document.getElementById('article-main');

  if (!post) {
    main.innerHTML = `
      <section class="article-not-found">
        <div><span class="section-index">404 / NOTE NOT FOUND</span><h1>这一页还没有长出来。</h1><p>文章可能已移动，回到花园继续逛逛吧。</p><a class="button button-dark" href="index.html#articles">返回文章列表</a></div>
      </section>`;
    document.title = `文章未找到｜${siteName}`;
    document.querySelectorAll('.article-share').forEach((button) => { button.hidden = true; });
    return;
  }

  document.title = `${post.title}｜${siteName}`;
  document.querySelector('meta[name="description"]').setAttribute('content', post.excerpt);
  const articleMeta = document.getElementById('article-meta');
  articleMeta.replaceChildren();
  const category = document.createElement('span');
  category.textContent = post.category;
  const readTime = document.createElement('span');
  readTime.textContent = `${post.readTime}阅读`;
  articleMeta.append(category, readTime);
  document.getElementById('article-title').textContent = post.title;
  document.getElementById('article-excerpt').textContent = post.excerpt;
  document.getElementById('article-date').textContent = post.dateLabel;
  document.getElementById('article-issue').textContent = `NO. ${post.issue} / ${post.dateLabel}`;
  document.getElementById('article-glyph').textContent = post.glyph;
  document.getElementById('article-english').textContent = post.english;
  document.getElementById('article-cover').classList.add(`cover-${ACCENTS.includes(post.accent) ? post.accent : 'vermilion'}`);

  const content = document.getElementById('article-content');
  content.innerHTML = post.content;
  const headings = content.querySelectorAll('h2');
  const tocContainers = [
    document.getElementById('article-toc'),
    document.getElementById('article-toc-mobile')
  ].filter(Boolean);

  headings.forEach((heading, index) => {
    heading.id = `section-${index + 1}`;
    tocContainers.forEach((toc) => {
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      toc.appendChild(link);
    });
  });

  const tocLinks = document.querySelectorAll('.article-toc a');
  let currentSection = '';
  function setCurrentSection(id) {
    if (!id || id === currentSection) return;
    currentSection = id;
    tocLinks.forEach((link) => {
      const isCurrent = link.hash === `#${id}`;
      link.classList.toggle('active', isCurrent);
      if (isCurrent) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  const mobileToc = document.getElementById('article-mobile-toc');
  if (mobileToc) {
    mobileToc.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => { mobileToc.open = false; });
    });
  }

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const relatedGrid = document.getElementById('related-grid');
  relatedGrid.replaceChildren();
  related.forEach((item) => {
    const link = document.createElement('a');
    link.className = 'related-card';
    link.href = `article.html?slug=${encodeURIComponent(item.slug)}`;
    const meta = document.createElement('div');
    meta.className = 'post-meta';
    const relatedCategory = document.createElement('span');
    relatedCategory.textContent = item.category;
    const issue = document.createElement('span');
    issue.textContent = `NO. ${item.issue}`;
    meta.append(relatedCategory, issue);
    const title = document.createElement('h3');
    title.textContent = item.title;
    const details = document.createElement('span');
    details.textContent = `${item.dateLabel} · ${item.readTime}`;
    link.append(meta, title, details);
    relatedGrid.appendChild(link);
  });

  document.querySelectorAll('.article-share').forEach((button) => {
    button.addEventListener('click', () => window.Yiyu.sharePage({
      title: post.title,
      text: post.excerpt,
      url: window.location.href
    }));
  });

  const progress = document.getElementById('reading-progress');
  let ticking = false;
  function updateReadingState() {
    const contentTop = content.getBoundingClientRect().top + window.scrollY;
    const readingDistance = Math.max(content.offsetHeight - window.innerHeight, 1);
    const percentage = Math.min(100, Math.max(0, ((window.scrollY - contentTop) / readingDistance) * 100));
    progress.style.width = `${percentage}%`;

    const readingLine = Math.min(window.innerHeight * 0.28, 220);
    let activeHeading = headings[0];
    headings.forEach((heading) => {
      if (heading.getBoundingClientRect().top <= readingLine) activeHeading = heading;
    });
    if (activeHeading) setCurrentSection(activeHeading.id);
    ticking = false;
  }
  function requestReadingUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateReadingState);
  }
  window.addEventListener('scroll', requestReadingUpdate, { passive: true });
  window.addEventListener('resize', requestReadingUpdate);
  updateReadingState();
})();
