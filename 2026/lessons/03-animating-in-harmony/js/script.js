(() => {
  const STORAGE_KEY = 'lesson3-fun-with-dots-progress-v1';
  const checks = [...document.querySelectorAll('.step-complete')];
  const progressText = document.getElementById('progressText');
  const progressBar = document.getElementById('progressBar');
  const reset = document.getElementById('resetProgress');

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      checks.forEach((box, index) => { box.checked = Boolean(saved[index]); });
    } catch (_) {}
    updateProgress(false);
  }

  function updateProgress(save = true) {
    const values = checks.map(box => box.checked);
    document.querySelectorAll('.step-card').forEach((card, index) => {
      card.classList.toggle('is-complete', values[index]);
    });
    const done = values.filter(Boolean).length;
    progressText.textContent = `${done} of ${checks.length} steps complete`;
    progressBar.style.width = `${(done / checks.length) * 100}%`;
    if (save) localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  }

  checks.forEach(box => box.addEventListener('change', () => updateProgress(true)));
  reset?.addEventListener('click', () => {
    checks.forEach(box => { box.checked = false; });
    updateProgress(true);
  });
  loadProgress();

  const choices = [...document.querySelectorAll('.confirm-choice')];
  const feedback = document.getElementById('confirmFeedback');
  choices.forEach(button => {
    button.addEventListener('click', () => {
      choices.forEach(b => b.classList.remove('selected'));
      button.classList.add('selected');
      const submitted = button.dataset.answer === 'true';
      feedback.className = `confirm-feedback ${submitted ? 'success' : 'warning'}`;
      feedback.textContent = submitted
        ? 'Good! You can continue.'
        : 'You will need to submit your work to your teacher before you continue.';
    });
  });
})();
