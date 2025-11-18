/* Bacteria Shape Match Game */
(() => {
  const shapes = [
    {
      key: 'cocci',
      label: 'Cocci',
      info: 'Spherical bacteria. May appear singly, in pairs, chains (streptococci), clusters (staphylococci), or other groupings.',
      svg: `<svg class="shape-svg" viewBox="0 0 120 120" aria-labelledby="title" role="img"><title>Cocci shape</title>
        <defs>
          <radialGradient id="cgr" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#c9f8ff" />
            <stop offset="100%" stop-color="#5aa9b8" />
          </radialGradient>
        </defs>
        <g fill="url(#cgr)">
          <circle cx="40" cy="40" r="22" />
          <circle cx="78" cy="44" r="20" />
          <circle cx="60" cy="78" r="24" />
        </g>
      </svg>`
    },
    {
      key: 'bacilli',
      label: 'Bacilli',
      info: 'Rod-shaped bacteria. Can form chains. Shape increases surface area aiding nutrient exchange.',
      svg: `<svg class="shape-svg" viewBox="0 0 120 120" aria-labelledby="title" role="img"><title>Bacilli shape</title>
        <rect x="18" y="30" width="28" height="60" rx="14" fill="#ffc857" />
        <rect x="50" y="30" width="28" height="60" rx="14" fill="#e9724c" />
        <rect x="82" y="30" width="20" height="60" rx="10" fill="#c5283d" />
      </svg>`
    },
    {
      key: 'spirilla',
      label: 'Spirilla',
      info: 'Rigid spiral-shaped bacteria. Motile via flagella; distinct from flexible spirochetes.',
      svg: `<svg class="shape-svg" viewBox="0 0 160 120" aria-labelledby="title" role="img"><title>Spirilla shape</title>
        <path d="M10 60c25-50 50 50 75 0s50 50 75 0" stroke="#8ecae6" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>`
    },
    {
      key: 'vibrio',
      label: 'Vibrio',
      info: 'Comma-shaped curved rods. Notably includes Vibrio cholerae. A single polar flagellum often present.',
      svg: `<svg class="shape-svg" viewBox="0 0 120 120" aria-labelledby="title" role="img"><title>Vibrio shape</title>
        <path d="M25 70c10-38 50-38 65-10" stroke="#90be6d" stroke-width="16" stroke-linecap="round" fill="none" />
      </svg>`
    },
    {
      key: 'spirochete',
      label: 'Spirochetes',
      info: 'Flexible spiral-shaped bacteria with axial filaments allowing corkscrew motion (e.g., Treponema).',
      svg: `<svg class="shape-svg" viewBox="0 0 160 120" aria-labelledby="title" role="img"><title>Spirochete shape</title>
        <path d="M5 60c15-40 30 40 45 0s30 40 45 0 30 40 45 0" stroke="#f28482" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>`
    },
    {
      key: 'filamentous',
      label: 'Filamentous',
      info: 'Long thread-like cells forming branching networks; common in certain soil and aquatic bacteria.',
      svg: `<svg class="shape-svg" viewBox="0 0 160 120" aria-labelledby="title" role="img"><title>Filamentous shape</title>
        <path d="M10 100C30 40 50 40 70 100s40-60 60 0" stroke="#ffafcc" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>`
    },
    {
      key: 'diplococci',
      label: 'Diplococci',
      info: 'Pairs of spherical cocci (e.g., Neisseria). Division occurs in one plane producing characteristic pairs.',
      svg: `<svg class="shape-svg" viewBox="0 0 120 120" aria-labelledby="title" role="img"><title>Diplococci shape</title>
        <circle cx="48" cy="60" r="26" fill="#bde0fe" />
        <circle cx="74" cy="60" r="26" fill="#77b5d9" />
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
