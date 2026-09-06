(() => {
  const links = window.LESSON_LINKS || {};
  const lessonAnchors = [...document.querySelectorAll('[data-lesson-link]')];
  const configuredCount = document.getElementById('configured-count');
  const toast = document.getElementById('link-toast');
  let toastTimer;

  function showToast() {
    if (!toast) return;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => { toast.hidden = true; }, 220);
    }, 2800);
  }

  let configured = 0;
  lessonAnchors.forEach(anchor => {
    const lesson = Number(anchor.dataset.lessonLink);
    const url = typeof links[lesson] === 'string' ? links[lesson].trim() : '';
    const card = anchor.closest('.lesson-card');

    if (url) {
      anchor.href = url;
      anchor.classList.add('configured');
      anchor.textContent = 'Open Lesson →';
      card?.classList.add('has-link');
      configured += 1;
    } else {
      anchor.href = '#';
      anchor.setAttribute('aria-label', `Lesson ${lesson} link not configured yet`);
      anchor.addEventListener('click', event => {
        event.preventDefault();
        showToast();
      });
    }
  });
  if (configuredCount) configuredCount.textContent = configured;

  const search = document.getElementById('lesson-search');
  const cards = [...document.querySelectorAll('.lesson-card')];
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const emptyState = document.getElementById('empty-state');
  let activeFilter = 'all';

  function filterLessons() {
    const term = (search?.value || '').trim().toLowerCase();
    let shown = 0;

    cards.forEach(card => {
      const category = card.dataset.category;
      const text = card.textContent.toLowerCase();
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !term || text.includes(term);
      const visible = matchesFilter && matchesSearch;
      card.hidden = !visible;
      if (visible) shown += 1;
    });

    if (emptyState) emptyState.hidden = shown !== 0;
  }

  search?.addEventListener('input', filterLessons);
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.dataset.filter || 'all';
      filterLessons();
    });
  });
})();
