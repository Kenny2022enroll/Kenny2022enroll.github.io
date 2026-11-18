(() => {
  const config = window.YIYU_CONFIG;
  const posts = window.YIYU_POSTS || [];
  const root = document.documentElement;
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  async function copyText(text, successMessage = '已复制到剪贴板') {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        textarea.remove();
        if (!copied) throw new Error('copy failed');
      }
      showToast(successMessage);
      return true;
    } catch (_) {
      showToast('复制失败，请手动复制地址');
      return false;
    }
  }

  const ACCENTS = ['vermilion', 'moss', 'ochre', 'blue', 'ink', 'rose'];

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
  }

  function safeAccent(value) {
    return ACCENTS.includes(value) ? value : 'vermilion';
  }

  function isAllowedUrl(value, allowMailto = false) {
    if (typeof value !== 'string' || !value.trim()) return false;
    try {
      const url = new URL(value.trim());
      if (['http:', 'https:'].includes(url.protocol)) return Boolean(url.hostname);
      return allowMailto && url.protocol === 'mailto:' && Boolean(url.pathname);
    } catch (_) {
      return false;
    }
  }

  function homeUrl() {
    const configuredUrl = typeof config.site.url === 'string' ? config.site.url.trim() : '';
    return isAllowedUrl(configuredUrl) ? configuredUrl : new URL('index.html', window.location.href).href;
  }

  async function sharePage({ title = config.site.title, text = config.site.description, url = homeUrl() } = {}) {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    copyText(url, '链接已复制，可以分享给朋友了');
  }

  window.Yiyu = { showToast, copyText, sharePage, homeUrl };

  document.title = config.site.title;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.setAttribute('content', config.site.description);
  document.querySelectorAll('[data-site-name]').forEach((element) => {
    element.textContent = config.site.name;
  });
  document.querySelectorAll('[data-owner-name]').forEach((element) => {
    element.textContent = config.site.owner;
  });
  document.querySelectorAll('[data-owner-initial]').forEach((element) => {
    element.textContent = Array.from(config.site.owner)[0] || '';
  });
  document.querySelectorAll('[data-site-motto]').forEach((element) => {
    element.textContent = config.site.motto || '';
  });
  document.querySelectorAll('#current-year').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('.theme-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      try { localStorage.setItem('yiyu-theme', nextTheme); } catch (_) {}
      showToast(nextTheme === 'dark' ? '已切换到夜间阅读' : '已切换到日间阅读');
    });
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  function closeMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '打开菜单');
    mobileNav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? '打开菜单' : '关闭菜单');
      mobileNav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });
    mobileNav.querySelectorAll('a, button').forEach((element) => element.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  document.querySelectorAll('.copy-site-link').forEach((button) => {
    button.addEventListener('click', () => copyText(homeUrl(), '博客地址已复制，感谢你的分享'));
  });

  // 商业化入口只在配置 enabled=true 且填写 URL 后跳转，否则展示筹备说明。
  const dialog = document.getElementById('commerce-dialog');
  const dialogPrimary = document.getElementById('dialog-primary');
  let dialogPrimaryAction = null;
  const commerceContent = {
    support: {
      symbol: '赏',
      title: '一杯咖啡，一点时间',
      description: '赞赏通道正在认真筹备，日后将以收款码形式开放。你的自愿支持，会让独立写作拥有更多不被打断的时间。',
      note: `现在，把喜欢的文章分享给一个朋友，就是对${config.site.name}最实在的支持。`,
      actionLabel: `分享${config.site.name}`,
      action: () => sharePage()
    },
    membership: {
      symbol: '订',
      title: '把值得读的，慢慢寄给你',
      description: '读者计划将承载不定期电子通讯、创作手记与专题内容。更新频率会克制，每一封都尽量值得打开。',
      note: '计划开放前不会收集邮箱。你可以先收藏博客地址，偶尔回来看看。',
      actionLabel: '复制博客地址',
      action: () => copyText(homeUrl(), '博客地址已复制，欢迎常回来看看')
    },
    business: {
      symbol: '合',
      title: '好合作，从价值观一致开始',
      description: '合作通道正在筹备。未来会开放内容共创、产品设计与独立开发相关项目，并清楚标识每一次商业合作。',
      note: '可先复制一份合作需求模板：项目背景 / 合作形式 / 目标读者 / 预计周期 / 预算范围 / 联系方式。',
      actionLabel: '复制合作需求模板',
      action: () => copyText('合作需求\n项目背景：\n合作形式：\n目标读者：\n预计周期：\n预算范围：\n联系方式：', '合作需求模板已复制')
    }
  };

  function openCommerceDialog(type) {
    if (!dialog) return;
    const content = commerceContent[type];
    document.getElementById('dialog-symbol').textContent = content.symbol;
    document.getElementById('dialog-title').textContent = content.title;
    document.getElementById('dialog-description').textContent = content.description;
    document.getElementById('dialog-note').textContent = content.note;
    dialogPrimary.textContent = content.actionLabel;
    dialogPrimaryAction = content.action;
    dialog.showModal();
  }

  function getCommerceTarget(type) {
    const item = config.monetization[type];
    if (!item || item.enabled !== true || !isAllowedUrl(item.url, type === 'business')) return null;
    return {
      url: item.url.trim(),
      label: typeof item.label === 'string' ? item.label.trim() : ''
    };
  }

  function activateCommerce(target) {
    if (target.url.startsWith('mailto:')) {
      window.location.href = target.url;
    } else {
      window.open(target.url, '_blank', 'noopener,noreferrer');
    }
  }

  document.querySelectorAll('[data-status]').forEach((status) => {
    if (!getCommerceTarget(status.dataset.status)) return;
    status.textContent = '已开放';
    status.classList.add('is-active');
  });

  document.querySelectorAll('[data-commerce]').forEach((button) => {
    const type = button.dataset.commerce;
    const target = getCommerceTarget(type);
    if (!target) {
      button.addEventListener('click', () => openCommerceDialog(type));
      return;
    }
    const label = button.querySelector('span');
    if (label && target.label) label.textContent = target.label;
    button.addEventListener('click', () => activateCommerce(target));
  });

  if (dialog) {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
    dialogPrimary.addEventListener('click', () => {
      const action = dialogPrimaryAction;
      dialog.close();
      if (action) action();
    });
  }

  const grid = document.getElementById('posts-grid');
  if (!grid) return;

  const featured = posts.find((post) => post.featured) || posts[0];
  if (featured) {
    const featureLink = document.getElementById('featured-post');
    featureLink.href = `article.html?slug=${encodeURIComponent(featured.slug)}`;
    featureLink.classList.remove(...ACCENTS.map((accent) => `cover-${accent}`));
    featureLink.classList.add(`cover-${safeAccent(featured.accent)}`);
    document.getElementById('featured-issue').textContent = `NO. ${featured.issue}`;
    document.getElementById('featured-glyph').textContent = featured.glyph;
    document.getElementById('featured-category').textContent = featured.category;
    document.getElementById('featured-read-time').textContent = featured.readTime;
    document.getElementById('featured-title').textContent = featured.title;
    document.getElementById('featured-excerpt').textContent = featured.excerpt;
  }
  document.getElementById('nav-post-count').textContent = String(posts.length).padStart(2, '0');

  let activeCategory = '全部';
  let query = '';
  const searchInput = document.getElementById('post-search');
  const emptyState = document.getElementById('empty-state');
  const filterContainer = document.getElementById('category-filters');

  function renderCategoryFilters() {
    const categories = ['全部', ...new Set(posts.map((post) => post.category).filter(Boolean))];
    filterContainer.replaceChildren();
    categories.forEach((category) => {
      const button = document.createElement('button');
      button.className = `filter-chip${category === activeCategory ? ' active' : ''}`;
      button.type = 'button';
      button.dataset.category = category;
      button.setAttribute('aria-pressed', String(category === activeCategory));
      button.textContent = category;
      filterContainer.appendChild(button);
    });
  }

  function selectCategory(category) {
    activeCategory = category;
    filterContainer.querySelectorAll('.filter-chip').forEach((chip) => {
      const selected = chip.dataset.category === category;
      chip.classList.toggle('active', selected);
      chip.setAttribute('aria-pressed', String(selected));
    });
    renderPosts();
  }

  function postCard(post, index, isFeatured) {
    return `
      <article class="post-card${isFeatured ? ' post-card-featured' : ''}" style="--delay:${Math.min(index, 6) * 55}ms">
        <a href="article.html?slug=${encodeURIComponent(post.slug)}" aria-label="阅读：${escapeHtml(post.title)}">
          <div class="post-visual cover-${safeAccent(post.accent)}" aria-hidden="true">
            <span class="post-number">NO. ${escapeHtml(post.issue)} / ${escapeHtml(post.dateLabel)}</span>
            <span class="post-glyph">${escapeHtml(post.glyph)}</span>
            <span class="post-english">${escapeHtml(post.english)}</span>
          </div>
          <div class="post-card-content">
            <div class="post-meta"><span>${escapeHtml(post.category)} · ${escapeHtml(post.dateLabel)}</span><span>${escapeHtml(post.readTime)}</span></div>
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.excerpt)}</p>
            <span class="card-read-link">阅读全文 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-5-5 5 5-5 5"></path></svg></span>
          </div>
        </a>
      </article>`;
  }

  function renderPosts() {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = posts.filter((post) => {
      const categoryMatches = activeCategory === '全部' || post.category === activeCategory;
      const searchText = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      return categoryMatches && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
    grid.innerHTML = filtered.map((post, index) => {
      const expand = post.featured && activeCategory === '全部' && !normalizedQuery;
      return postCard(post, index, expand);
    }).join('');
    document.getElementById('results-count').textContent = `共 ${filtered.length} 篇`;
    emptyState.hidden = filtered.length > 0;
    grid.hidden = filtered.length === 0;
  }

  filterContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');
    if (button) selectCategory(button.dataset.category);
  });

  searchInput.addEventListener('input', () => {
    query = searchInput.value;
    renderPosts();
  });

  document.querySelectorAll('.search-jump').forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById('articles').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => searchInput.focus(), 450);
    });
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable;
    if (event.key === '/' && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (event.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      query = '';
      searchInput.blur();
      renderPosts();
    }
  });

  document.getElementById('reset-filters').addEventListener('click', () => {
    activeCategory = '全部';
    query = '';
    searchInput.value = '';
    selectCategory('全部');
  });

  renderCategoryFilters();
  renderPosts();
})();
