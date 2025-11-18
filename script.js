/* Bacteria Shape Match Game */
(() => {
  const shapes = [
    {
      key: 'cocci',
      label: 'Cocci',
      info: 'Spherical bacteria. Under brightfield microscopy they appear as smooth, refractile circles; clusters suggest staphylococci, chains suggest streptococci.',
      svg: `<svg class="shape-svg" viewBox="0 0 130 130" aria-labelledby="title" role="img"><title>Cocci cluster</title>
        <defs>
          <radialGradient id="cocciCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f9fdff" />
            <stop offset="70%" stop-color="#b8d6e5" />
            <stop offset="100%" stop-color="#6a8fa3" />
          </radialGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g filter="url(#softGlow)" stroke="#294653" stroke-width="2" fill="url(#cocciCore)">
          <circle cx="55" cy="45" r="18" />
          <circle cx="78" cy="52" r="17" />
          <circle cx="50" cy="70" r="16" />
          <circle cx="78" cy="78" r="18" />
          <circle cx="95" cy="62" r="14" />
          <circle cx="65" cy="28" r="14" />
        </g>
      </svg>`
    },
    {
      key: 'bacilli',
      label: 'Bacilli',
      info: 'Rod-shaped bacteria. Under the scope they appear elongated with rounded ends; alignment suggests chains (e.g., Bacillus) or scattered rods (e.g., E. coli).',
      svg: `<svg class="shape-svg" viewBox="0 0 150 120" aria-labelledby="title" role="img"><title>Bacilli rods</title>
        <defs>
          <linearGradient id="rodGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#ffe7b3" />
            <stop offset="60%" stop-color="#e5b35c" />
            <stop offset="100%" stop-color="#c4862b" />
          </linearGradient>
        </defs>
        <g stroke="#603d11" stroke-width="2" fill="url(#rodGrad)" filter="url(#softGlow)">
          <rect x="18" y="34" width="46" height="20" rx="10" />
          <rect x="32" y="58" width="46" height="20" rx="10" transform="rotate(6 55 68)" />
          <rect x="78" y="40" width="46" height="20" rx="10" transform="rotate(-8 101 50)" />
          <rect x="86" y="66" width="38" height="18" rx="9" />
        </g>
      </svg>`
    },
    {
      key: 'spirilla',
      label: 'Spirilla',
      info: 'Rigid spiral-shaped bacteria with fewer turns than spirochetes; thick helical profile and external flagella.',
      svg: `<svg class="shape-svg" viewBox="0 0 170 120" aria-labelledby="title" role="img"><title>Spirilla helix</title>
        <defs>
          <linearGradient id="spirGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#c4ecf5" />
            <stop offset="100%" stop-color="#6aa9c1" />
          </linearGradient>
        </defs>
        <path d="M10 70c25-60 45 60 70 0s45 60 70 0" stroke="#36687a" stroke-width="12" stroke-linecap="round" fill="none" />
        <path d="M10 70c25-60 45 60 70 0s45 60 70 0" stroke="url(#spirGrad)" stroke-width="8" stroke-linecap="round" fill="none" />
        <g stroke="#36687a" stroke-width="2" fill="#36687a">
          <line x1="30" y1="40" x2="22" y2="25" />
          <line x1="95" y1="42" x2="87" y2="25" />
          <line x1="140" y1="45" x2="150" y2="28" />
        </g>
      </svg>`
    },
    {
      key: 'vibrio',
      label: 'Vibrio',
      info: 'Comma-shaped curved rods; often a single polar flagellum. Appears as a gently curved cell under the microscope.',
      svg: `<svg class="shape-svg" viewBox="0 0 130 120" aria-labelledby="title" role="img"><title>Vibrio curved rod</title>
        <defs>
          <linearGradient id="vibGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#d2f6d9" />
            <stop offset="100%" stop-color="#7bbd83" />
          </linearGradient>
        </defs>
        <path d="M30 75c6-40 55-42 70-18" stroke="#35633b" stroke-width="10" stroke-linecap="round" fill="none" />
        <path d="M30 75c6-40 55-42 70-18" stroke="url(#vibGrad)" stroke-width="6" stroke-linecap="round" fill="none" />
        <path d="M105 57q8 8 10 16" stroke="#35633b" stroke-width="2" fill="none" stroke-linecap="round" />
      </svg>`
    },
    {
      key: 'spirochete',
      label: 'Spirochetes',
      info: 'Thin, flexible, tightly coiled cells with internal axial filaments producing corkscrew motility.',
      svg: `<svg class="shape-svg" viewBox="0 0 180 120" aria-labelledby="title" role="img"><title>Spirochete thin spiral</title>
        <defs>
          <linearGradient id="spiroGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#ffd1d1" />
            <stop offset="100%" stop-color="#d46b6b" />
          </linearGradient>
        </defs>
        <path d="M10 65c18-50 36 50 54 0s36 50 54 0 36 50 54 0" stroke="#812f2f" stroke-width="5" fill="none" stroke-linecap="round" />
        <path d="M10 65c18-50 36 50 54 0s36 50 54 0 36 50 54 0" stroke="url(#spiroGrad)" stroke-width="3" fill="none" stroke-linecap="round" />
      </svg>`
    },
    {
      key: 'filamentous',
      label: 'Filamentous',
      info: 'Branching, thread-like networks resembling fungal hyphae; aerial filaments (e.g., Streptomyces) appear tangled.',
      svg: `<svg class="shape-svg" viewBox="0 0 180 120" aria-labelledby="title" role="img"><title>Filamentous branching network</title>
        <defs>
          <linearGradient id="filGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stop-color="#ffe3f2" />
            <stop offset="100%" stop-color="#e291b7" />
          </linearGradient>
        </defs>
        <path d="M15 105C30 40 48 42 65 105s33-60 50-5 35-55 50-10" stroke="#8d4c6a" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15 105C30 40 48 42 65 105s33-60 50-5 35-55 50-10" stroke="url(#filGrad)" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M65 105c8-34 12-40 20-60" stroke="#8d4c6a" stroke-width="4" stroke-linecap="round" />
        <path d="M115 100c6-22 10-30 18-46" stroke="#8d4c6a" stroke-width="4" stroke-linecap="round" />
      </svg>`
    },
    {
      key: 'diplococci',
      label: 'Diplococci',
      info: 'Pairs of spherical cocci (e.g., Neisseria, Streptococcus pneumoniae) with a flattened adjacent side (cleft) at the division plane.',
      svg: `<svg class="shape-svg" viewBox="0 0 130 120" aria-labelledby="title" role="img"><title>Diplococci pair</title>
        <defs>
          <radialGradient id="dipGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#eef8ff" />
            <stop offset="70%" stop-color="#9dc5e5" />
            <stop offset="100%" stop-color="#4b6d86" />
          </radialGradient>
        </defs>
        <g filter="url(#softGlow)" fill="url(#dipGrad)" stroke="#27495c" stroke-width="2">
          <path d="M56 60c0 16-10 28-22 28s-22-12-22-28 10-28 22-28 22 12 22 28Z" />
          <path d="M96 60c0 16-10 28-22 28s-22-12-22-28 10-28 22-28 22 12 22 28Z" />
          <rect x="52" y="45" width="8" height="30" rx="4" fill="#27495c" />
        </g>
      </svg>`
    }
  ];

  // DOM references
  const shapeCard = document.getElementById('shapeCard');
  const choicesEl = document.getElementById('choices');
  const scoreEl = document.getElementById('score');
  const streakEl = document.getElementById('streak');
  const livesEl = document.getElementById('lives');
  const levelEl = document.getElementById('level');
  const timerBar = document.getElementById('timerBar');
  const feedbackEl = document.getElementById('feedback');
  const startBtn = document.getElementById('startBtn');
  const restartBtn = document.getElementById('restartBtn');
  const infoBtn = document.getElementById('infoBtn');
  const infoDialog = document.getElementById('infoDialog');
  const shapeInfoDialog = document.getElementById('shapeInfoDialog');
  const shapeInfoTitle = document.getElementById('shapeInfoTitle');
  const shapeInfoText = document.getElementById('shapeInfoText');
  const speciesChallenge = document.getElementById('speciesChallenge');
  const speciesChoicesEl = document.getElementById('speciesChoices');

  // State
  let currentShape = null;
  let score = 0;
  let streak = 0;
  let lives = 3;
  let level = 1;
  let playing = false;
  let timerMs = 0;
  let timerTotal = 0;
  let frameReq = null;
  let usedShapes = new Set();
  let examplesCompleted = new Set(); // track shapes that have had species challenge done
  let inSpeciesChallenge = false;

  const speciesExamples = {
    cocci: [
      'staphylococcus aureus','staphylococcus epidermidis','streptococcus pyogenes','streptococcus pneumoniae','micrococcus luteus','enterococcus faecalis'
    ],
    bacilli: [
      'escherichia coli','bacillus subtilis','bacillus anthracis','pseudomonas aeruginosa','salmonella enterica','listeria monocytogenes'
    ],
    spirilla: [
      'spirillum volutans','aquaspirillum serpens'
    ],
    vibrio: [
      'vibrio cholerae','vibrio vulnificus','vibrio parahaemolyticus'
    ],
    spirochete: [
      'treponema pallidum','borrelia burgdorferi','leptospira interrogans'
    ],
    filamentous: [
      'streptomyces coelicolor','nocardia asteroides','actinomyces israelii'
    ],
    diplococci: [
      'neisseria meningitidis','neisseria gonorrhoeae','streptococcus pneumoniae'
    ]
  };

  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }
  const genusByShape = {
    bacilli: 'Bacillus',
    cocci: 'Coccus',
    spirilla: 'Spirillum',
    vibrio: 'Vibrio',
    spirochete: 'Spirochete',
    filamentous: 'Filamentous',
    diplococci: 'Diplococcus',
  };
  const sciCap = (full) => {
    const [g, s] = full.split(' ');
    if (!s) return g.charAt(0).toUpperCase() + g.slice(1).toLowerCase();
    return g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() + ' ' + s.toLowerCase();
  };
  const speciesPart = (full) => (full.split(' ')[1] || '').toLowerCase();

  function computeTimerForLevel(lvl) {
    const base = 9000; // ms
    const decay = Math.min(lvl - 1, 10) * 450; // shorten gradually
    return Math.max(base - decay, 3000); // floor
  }
  function choicesCountForLevel(lvl) { return Math.min(4 + Math.floor((lvl - 1)/2), 7); }

  function nextShape() {
    if (usedShapes.size === shapes.length) usedShapes.clear();
    const remaining = shapes.filter(s => !usedShapes.has(s.key));
    currentShape = rand(remaining);
    usedShapes.add(currentShape.key);
    renderShape();
    renderChoices();
    startTimer();
  }

  function renderShape() {
    shapeCard.innerHTML = currentShape.svg;
    shapeCard.classList.remove('shape-enter');
    void shapeCard.offsetWidth; // reflow for animation restart
    shapeCard.classList.add('shape-enter');
    shapeCard.setAttribute('data-shape', currentShape.key);
  }

  function renderChoices() {
    const count = choicesCountForLevel(level);
    const pool = shapes.filter(s => s.key !== currentShape.key);
    const distractors = shuffle(pool).slice(0, count - 1);
    const options = shuffle([currentShape, ...distractors]);
    choicesEl.innerHTML = '';
    options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.type = 'button';
      btn.textContent = opt.label;
      btn.setAttribute('data-key', opt.key);
      btn.setAttribute('role', 'listitem');
      btn.addEventListener('click', () => handleChoice(opt.key, btn));
      btn.addEventListener('keydown', (e) => {
        if (['Enter',' '].includes(e.key)) { e.preventDefault(); handleChoice(opt.key, btn); }
      });
      choicesEl.appendChild(btn);
    });
    // Keyboard nav
    const btns = [...choicesEl.querySelectorAll('.choice-btn')];
    btns.forEach((b, idx) => {
      b.addEventListener('keydown', e => {
        if (['ArrowRight','ArrowDown'].includes(e.key)) { e.preventDefault(); btns[(idx+1)%btns.length].focus(); }
        else if (['ArrowLeft','ArrowUp'].includes(e.key)) { e.preventDefault(); btns[(idx-1+btns.length)%btns.length].focus(); }
      });
    });
    btns[0]?.focus();
  }

  function handleChoice(key, btn) {
    if (!playing || timerMs <= 0) return;
    stopTimer();
    const correct = key === currentShape.key;
    lockChoices();
    if (correct) {
      streak++;
      const mult = 1 + Math.floor(streak/3); // reward streaks
      const gained = 100 * mult + Math.floor((timerMs / timerTotal) * 50);
      score += gained;
      feedbackEl.textContent = `Correct! +${gained} (x${mult})`;
      btn.classList.add('correct');
      if (streak % 5 === 0) {
        lives = Math.min(lives + 1, 5);
      }
      // Level up logic
      if (score > level * 500) {
        level++;
      }
      // Trigger species challenge if not yet completed for this shape
      if (!examplesCompleted.has(currentShape.key)) {
        setTimeout(() => openSpeciesChallenge(currentShape), 600);
        return; // wait for species choice before proceeding
      }
    } else {
      btn.classList.add('wrong');
      streak = 0;
      lives--;
      feedbackEl.textContent = `Wrong: ${currentShape.label}`;
    }
    updateHUD();
    if (lives <= 0) {
      gameOver();
    } else {
      setTimeout(nextShape, 1100);
    }
  }

  function lockChoices() {
    choicesEl.querySelectorAll('.choice-btn').forEach(b => b.classList.add('locked'));
  }

  function updateHUD() {
    scoreEl.textContent = score;
    streakEl.textContent = streak;
    livesEl.textContent = lives;
    levelEl.textContent = level;
  }

  function startTimer() {
    timerTotal = computeTimerForLevel(level);
    timerMs = timerTotal;
    timerBar.style.width = '100%';
    cancelAnimationFrame(frameReq);
    frameReq = requestAnimationFrame(tickTimer);
  }
  function stopTimer() { cancelAnimationFrame(frameReq); }

  function tickTimer(ts) {
    if (!playing) return;
    timerMs -= 16.7; // approx 60fps
    const ratio = Math.max(timerMs / timerTotal, 0);
    timerBar.style.width = (ratio * 100) + '%';
    if (timerMs <= 0) {
      timerMs = 0;
      streak = 0;
      lives--;
      updateHUD();
      feedbackEl.textContent = 'Time up!';
      lockChoices();
      if (lives <= 0) gameOver();
      else setTimeout(nextShape, 900);
      return;
    }
    frameReq = requestAnimationFrame(tickTimer);
  }

  function startGame() {
    score = 0; streak = 0; lives = 3; level = 1; playing = true; usedShapes.clear(); examplesCompleted.clear(); inSpeciesChallenge = false;
    startBtn.hidden = true; restartBtn.hidden = true; feedbackEl.textContent='';
    updateHUD();
    nextShape();
  }
  function gameOver() {
    playing = false;
    feedbackEl.textContent = `Game Over! Final Score: ${score}`;
    restartBtn.hidden = false;
  }

  // Info popover for shape
  shapeCard.addEventListener('click', () => {
    if (!currentShape) return;
    shapeInfoTitle.textContent = currentShape.label;
    shapeInfoText.textContent = currentShape.info;
    try { shapeInfoDialog.showModal(); } catch { /* Safari iOS fallback */ shapeInfoDialog.setAttribute('open',''); }
  });

  // Buttons
  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', startGame);
  infoBtn.addEventListener('click', () => {
    try { infoDialog.showModal(); } catch { infoDialog.setAttribute('open',''); }
  });

  // Close dialogs on backdrop click
  [infoDialog, shapeInfoDialog].forEach(dlg => {
    dlg?.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  });
  // species challenge has no dialog; nothing to close

  // Accessibility: allow ESC to close dialogs
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (infoDialog.open) infoDialog.close();
      if (shapeInfoDialog.open) shapeInfoDialog.close();
    }
  });

  // Orientation / Resize handling for mobile
  window.addEventListener('resize', () => {
    // Could adapt timer length slightly for tiny screens
    if (playing) timerTotal = computeTimerForLevel(level); // recalibrate baseline
  });

  // Species challenge rendering
  function openSpeciesChallenge(shape) {
    if (!playing) return;
    inSpeciesChallenge = true;
    speciesChallenge.hidden = false;
    speciesChoicesEl.innerHTML = '';
    const correctList = speciesExamples[shape.key] || [];
    const correctSpecies = rand(correctList);
    // Build distractors from other shape pools
    const otherPools = Object.entries(speciesExamples).filter(([k]) => k !== shape.key).flatMap(([, arr]) => arr);
    const distractors = shuffle(otherPools.filter(s => s !== correctSpecies)).slice(0,3);
    const options = shuffle([correctSpecies, ...distractors]);
    const bracketGenus = genusByShape[shape.key] || shape.label;
    options.forEach(full => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'species-btn';
      const ep = speciesPart(full);
      const display = `(${bracketGenus}) ${ep.charAt(0).toUpperCase() + ep.slice(1)}`;
      btn.textContent = display;
      btn.dataset.full = full; // underlying accurate full name
      btn.dataset.iscorrect = (full === correctSpecies);
      btn.setAttribute('role','listitem');
      btn.addEventListener('click', () => handleSpeciesChoice(btn));
      btn.addEventListener('keydown', e => { if (['Enter',' '].includes(e.key)) { e.preventDefault(); handleSpeciesChoice(btn); }});
      speciesChoicesEl.appendChild(btn);
    });
    speciesChoicesEl.querySelector('.species-btn')?.focus();
  }

  function handleSpeciesChoice(btn) {
    if (!inSpeciesChallenge) return;
    const isCorrect = btn.dataset.iscorrect === 'true';
    lockSpeciesChoices();
    if (isCorrect) {
      const bonus = 150; // fixed bonus for species correct
      score += bonus;
      feedbackEl.textContent = `Species match: ${sciCap(btn.dataset.full)} +${bonus}`;
      examplesCompleted.add(currentShape.key);
      btn.classList.add('correct');
    } else {
      lives--; streak = 0;
      btn.classList.add('wrong');
      feedbackEl.textContent = `Incorrect example (${btn.textContent}).`;
    }
    // Reveal true full names for all options
    speciesChoicesEl.querySelectorAll('.species-btn').forEach(b => {
      b.textContent = sciCap(b.dataset.full);
      if (b.dataset.iscorrect === 'true') b.classList.add('correct');
    });
    updateHUD();
    inSpeciesChallenge = false;
    setTimeout(() => {
      speciesChallenge.hidden = true;
      if (lives <= 0) { gameOver(); return; }
      nextShape();
    }, 900);
  }

  function lockSpeciesChoices() {
    speciesChoicesEl.querySelectorAll('.species-btn').forEach(b => b.classList.add('locked'));
  }

})();
