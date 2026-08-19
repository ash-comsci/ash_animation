(() => {
  const track = document.getElementById('timelineTrack');
  const prev = document.querySelector('.timeline-arrow.prev');
  const next = document.querySelector('.timeline-arrow.next');

  if (track && prev && next) {
    const step = () => Math.min(680, Math.max(300, track.clientWidth * 0.72));
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  }

  const checks = [...document.querySelectorAll('#lessonChecklist input[type="checkbox"]')];
  const taskText = document.getElementById('taskProgressText');
  const taskBar = document.getElementById('taskProgressBar');

  function updateTaskProgress() {
    const done = checks.filter(input => input.checked).length;
    const total = checks.length;
    if (taskText) taskText.textContent = `${done} of ${total} complete`;
    if (taskBar) taskBar.style.width = `${total ? (done / total) * 100 : 0}%`;
  }
  checks.forEach(input => input.addEventListener('change', updateTaskProgress));
  updateTaskProgress();

  const form = document.getElementById('quizForm');
  const result = document.getElementById('quizResult');
  const reset = document.getElementById('resetQuiz');

  const normalized = value => String(value || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  const selectedValues = name => [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value).sort();
  const sameSet = (actual, expected) => actual.length === expected.length && actual.every((value, index) => value === expected[index]);

  if (form && result) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      let score = 0;

      if (form.q1.value === 'a') score++;
      if (normalized(form.q2.value) === '24') score++;
      if (['rotoscope', 'therotoscope'].includes(normalized(form.q3.value))) score++;
      if (normalized(form.q4.value) === 'synchronizedsound') score++;
      if (sameSet(selectedValues('q5'), ['multiplane', 'sound', 'storyboards', 'technicolor'])) score++;
      if (form.q6.value === 'rotoscope') score++;
      if (sameSet(selectedValues('q7'), ['digital', 'paperless', 'traditional'])) score++;

      const total = 7;
      const percent = Math.round((score / total) * 100);
      const passed = percent >= 70;

      result.hidden = false;
      result.className = `quiz-result ${passed ? 'pass' : 'fail'}`;
      result.innerHTML = `<span class="result-score">${score}/${total} — ${percent}%</span>${passed ? 'Passed. You reached the 70% target.' : 'Keep reviewing. A score of 70% or higher is needed to pass.'}`;
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    reset.addEventListener('click', () => {
      form.reset();
      result.hidden = true;
      result.className = 'quiz-result';
      result.textContent = '';
    });
  }
})();
