const COURSE_LESSONS = [{"n": 1, "title": "The World of Animation", "slug": "01-world-of-animation", "ready": true}, {"n": 2, "title": "The Animation Pipeline", "slug": "02-animation-pipeline", "ready": true}, {"n": 3, "title": "Animating in Harmony", "slug": "03-animating-in-harmony", "ready": true}, {"n": 4, "title": "User Interface, Preferences, Set Up and Best Practices", "slug": "04-user-interface-preferences", "ready": true}, {"n": 5, "title": "Drawing Tools", "slug": "05-drawing-tools", "ready": true}, {"n": 6, "title": "The Principles of Animation", "slug": "06-principles-of-animation", "ready": true}, {"n": 7, "title": "Paint Tools & Palettes", "slug": "07-paint-tools-palettes", "ready": true}, {"n": 8, "title": "What is a Peg", "slug": "08-what-is-a-peg", "ready": true}, {"n": 9, "title": "Drawing Substitutions", "slug": "09-drawing-substitutions", "ready": true}, {"n": 10, "title": "Importing Images", "slug": "10-importing-images", "ready": true}, {"n": 11, "title": "Pencils, Brushes and Shapes", "slug": "11-pencils-brushes-shapes", "ready": true}, {"n": 12, "title": "Nodes, Nodes and more Nodes", "slug": "12-nodes", "ready": true}, {"n": 13, "title": "Rigging Dynamic Eyes", "slug": "13-rigging-dynamic-eyes", "ready": true}, {"n": 14, "title": "Lip-Sync", "slug": "14-lip-sync", "ready": true}, {"n": 15, "title": "Importing Adobe Photoshop & Illustrator Files", "slug": "15-importing-photoshop-illustrator", "ready": true}, {"n": 16, "title": "Camera & Creating Multiplanes", "slug": "16-camera-multiplanes", "ready": true}, {"n": 17, "title": "Setting up a Cut Out Character for Rigging", "slug": "17-cut-out-character-rigging", "ready": true}, {"n": 18, "title": "Adding Master Pegs", "slug": "18-adding-master-pegs", "ready": true}, {"n": 19, "title": "Adding Deformers", "slug": "19-adding-deformers", "ready": true}, {"n": 20, "title": "Animating a Character", "slug": "20-animating-a-character", "ready": true}, {"n": 21, "title": "Modifying Colour Palettes", "slug": "21-modifying-colour-palettes", "ready": true}, {"n": 22, "title": "Fly Little Bird", "slug": "22-fly-little-bird", "ready": true}, {"n": 23, "title": "Exporting Templates", "slug": "23-exporting-templates", "ready": true}, {"n": 24, "title": "Set the Stage", "slug": "24-set-the-stage", "ready": true}, {"n": 25, "title": "Harmony Certification", "slug": "25-harmony-certification", "ready": true}];
(function(){
  const root = document.body.dataset.root || '';
  const current = Number(document.body.dataset.lesson || 0);
  const jump = document.querySelector('.lesson-jump');
  const btn = document.querySelector('.lesson-jump > button');
  const menu = document.querySelector('.lesson-jump-menu');
  if(btn && menu){
    COURSE_LESSONS.forEach(l=>{
      const row=document.createElement('a');
      row.innerHTML=`<b class="jump-num">${String(l.n).padStart(2,'0')}</b><span>${l.title}</span>`;
      row.href=`${root}lessons/${l.slug}/index.html`;
      if(l.n===current) row.classList.add('current');
      menu.appendChild(row);
    });
    btn.addEventListener('click',()=>jump.classList.toggle('open'));
    document.addEventListener('click',e=>{if(!jump.contains(e.target)) jump.classList.remove('open')});
  }
  document.querySelectorAll('[data-complete]').forEach(box=>{
    const key=`ash-course-${current}-${box.dataset.complete}`;
    box.checked=localStorage.getItem(key)==='1';
    box.addEventListener('change',()=>localStorage.setItem(key,box.checked?'1':'0'));
  });
  document.querySelectorAll('[data-compare]').forEach(shell=>{
    const range=shell.querySelector('.compare-range');
    if(!range) return;
    const apply=()=>shell.style.setProperty('--split',`${range.value}%`);
    range.addEventListener('input',apply); apply();
  });
  document.querySelectorAll('[data-presentation]').forEach(deck=>{
    const slides=[...deck.querySelectorAll('.presentation-slide')];
    const count=deck.querySelector('[data-count]');
    let i=Math.max(0,slides.findIndex(s=>s.classList.contains('active')));
    const show=()=>{
      slides.forEach((s,j)=>s.classList.toggle('active',j===i));
      if(count) count.textContent=`${i+1} / ${slides.length}`;
      const prev=deck.querySelector('[data-prev]'), next=deck.querySelector('[data-next]');
      if(prev) prev.disabled=i===0;
      if(next) next.disabled=i===slides.length-1;
    };
    deck.querySelector('[data-prev]')?.addEventListener('click',()=>{if(i>0){i--;show();}});
    deck.querySelector('[data-next]')?.addEventListener('click',()=>{if(i<slides.length-1){i++;show();}});
    show();
  });
  document.querySelectorAll('.tf-question').forEach(q=>{
    q.querySelectorAll('button[data-value]').forEach(b=>b.addEventListener('click',()=>{
      const ok=b.dataset.value===q.dataset.answer;
      q.querySelectorAll('button[data-value]').forEach(x=>x.classList.remove('selected','correct','wrong'));
      b.classList.add('selected',ok?'correct':'wrong');
      const fb=q.querySelector('.tf-feedback');
      if(fb) fb.textContent=ok?'Correct.':'Not quite — try the other answer.';
    }));
  });
})();
