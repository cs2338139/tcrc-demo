const state = {
  language: 'zh',
  answers: [],
};

const TAGLINE = {
  zh: '純屬娛樂！不許追究！',
  en: 'Just for fun! No take-backs!',
};

const REDEEM_LINE = {
  zh: '請記得找服務人員兌換塔可！',
  en: 'Remember to ask the crew for your taco redemption!',
};

const LOADING_LABELS = {
  intro: { zh: 'Loading', en: 'Loading' },
  blend: { zh: '調味中', en: 'Blending flavors' },
};

const SECTION_TITLES = {
  pairing: { zh: '搭配提醒', en: 'Pairing Reminders' },
  tips: { zh: '溫馨提醒', en: 'Warm Reminder' },
};

const INTRO_COPY = {
  kicker: { zh: '風味測驗', en: 'Flavor Quiz' },
  title: {
    zh: '我把最後的風味藏起來了，去完成這場測驗吧！',
    en: 'The final flavor is hidden—complete this quiz to uncover it!',
  },
  subtitle: {
    zh: '三個直覺題，找出最對味的你。',
    en: 'Three instinctive questions to reveal the flavor that fits you.',
  },
  button: { zh: '開始', en: 'Start' },
};

const QUESTIONS = [
  {
    id: 'q1',
    title: {
      zh: '你最容易被哪種香氣吸引？',
      en: 'Which scent draws you in first?',
    },
    options: [
      {
        type: 'cucumber',
        emoji: '🥒',
        label: {
          zh: '洗完曬乾的棉被香、果香、青草',
          en: 'Sun-dried linens, bright fruit, morning greens',
        },
      },
      {
        type: 'pepper',
        emoji: '🌶️',
        label: {
          zh: '辛香料、龍涎香、皮革或木質調',
          en: 'Spices, ambergris, leather, or smoky woods',
        },
      },
    ],
  },
  {
    id: 'q2',
    title: {
      zh: '你在一個陌生地方醒來，眼前的風景是？',
      en: 'You wake somewhere unfamiliar—what’s the view?',
    },
    options: [
      {
        type: 'cucumber',
        emoji: '🥒',
        label: {
          zh: '一片綠意花園，空氣有露水味',
          en: 'A lush garden with dew in the air',
        },
      },
      {
        type: 'pepper',
        emoji: '🌶️',
        label: {
          zh: '看不見盡頭的濃霧森林，地上是濕濕的土壤',
          en: 'An endless misty forest and damp soil underfoot',
        },
      },
    ],
  },
  {
    id: 'q3',
    title: {
      zh: '約會看電影，你通常會選？',
      en: 'On a movie date, you usually pick?',
    },
    options: [
      {
        type: 'cucumber',
        emoji: '🥒',
        label: {
          zh: '清新、文藝、愛情、輕鬆、戲劇',
          en: 'Fresh, artsy, romantic, feel-good dramas',
        },
      },
      {
        type: 'pepper',
        emoji: '🌶️',
        label: {
          zh: '爽片，驚悚、刺激、動作強片',
          en: 'Thrillers, adrenaline rush, big action blockbusters',
        },
      },
    ],
  },
];

const RESULTS = {
  cucumber: {
    a: {
      emoji: '🥒',
      title: { zh: '單純善良的瓜', en: 'Pure-Hearted Cucumber' },
      body: {
        zh: '你是個偏感受型的人。對你來說，安全感來自於「被理解」與「純淨的存在感」。你習慣觀察，願意用柔軟對待世界。你不是軟弱，只是你相信——柔和是一種力量。',
        en: 'You lead with feeling. Security is born from being understood and sensing genuine presence. You observe first, and offer softness to the world—not out of weakness, but because you believe gentleness is its own power.',
      },
      callout: { zh: '柔和頻率', en: 'Gentle Frequency' },
      stats: [
        { label: { zh: '柔軟度', en: 'Softness' }, value: 92 },
        { label: { zh: '共感力', en: 'Empathy' }, value: 88 },
        { label: { zh: '冒險指數', en: 'Adventure Index' }, value: 35 },
      ],
      keywords: {
        zh: '關鍵字：柔軟 / 感受 / 共鳴',
        en: 'Keywords: Soft / Sensory / Resonant',
      },
      pairing: {
        zh: '芒果莎莎醬 x 青醬塔可，先喝再吃',
        en: 'Mango salsa x pesto taco, sip first then bite.',
      },
      tips: {
        zh: ['請告知服務人員結果畫面，如重新測驗，結果只能擇一。'],
        en: ['Show this result to the staff; if you retake the quiz, only one outcome can be redeemed.'],
      },
    },
    b: {
      emoji: '🥒',
      title: { zh: '理性聰明的瓜', en: 'Clear-Minded Cucumber' },
      body: {
        zh: '你習慣自己走在霧中，帶著一點神秘、一點距離感。你不常主動吐露心事，但其實情緒很深。你不害怕孤獨，反而在混沌中找到了自己的秩序。',
        en: "You navigate the fog on your own terms, carrying mystery and measured distance. You seldom open up first, yet your emotions run deep. Solitude doesn't scare you—you build your own order inside the haze.",
      },
      callout: { zh: '霧中羅盤', en: 'Compass in the Fog' },
      stats: [
        { label: { zh: '洞察力', en: 'Perception' }, value: 85 },
        { label: { zh: '神秘指數', en: 'Mystique' }, value: 72 },
        { label: { zh: '溫度', en: 'Warmth' }, value: 60 },
      ],
      keywords: {
        zh: '關鍵字：洞察 / 神秘 / 節奏',
        en: 'Keywords: Insight / Mystery / Rhythm',
      },
      pairing: {
        zh: '芒果莎莎醬 x 青醬塔可，先喝再吃',
        en: 'Mango salsa x pesto taco, sip first then bite.',
      },
      tips: {
        zh: ['請告知服務人員結果畫面，如重新測驗，結果只能擇一。'],
        en: ['Show this result to the staff; if you retake the quiz, only one outcome can be redeemed.'],
      },
    },
  },
  pepper: {
    a: {
      emoji: '🌶️',
      title: { zh: '熱烈追求的椒', en: 'Passion-Chaser Pepper' },
      body: {
        zh: '你是活在五感裡的人，喜歡一切濃烈、真實的感覺。香氣、影像、情緒，通通要到位才行。你排斥無聊，追求刺激與情緒釋放，就算會燙傷也不願活得平淡。',
        en: 'You live through every sense, craving what is bold and real. Scents, visuals, emotions—they all need to hit full force. You reject boredom and chase release, even if the spark might burn.',
      },
      callout: { zh: '熱度指數', en: 'Heat Index' },
      stats: [
        { label: { zh: '濃烈值', en: 'Intensity' }, value: 95 },
        { label: { zh: '探索慾', en: 'Curiosity' }, value: 78 },
        { label: { zh: '耐心度', en: 'Patience' }, value: 20 },
      ],
      keywords: {
        zh: '關鍵字：濃烈 / 追求 / 直覺',
        en: 'Keywords: Fierce / Seeking / Instinctive',
      },
      pairing: {
        zh: '芒果莎莎醬 × 紅醬塔可，先吃再喝',
        en: 'Mango salsa × roja taco, bite first then sip.',
      },
      tips: {
        zh: ['請告知服務人員結果畫面，如重新測驗，結果只能擇一。'],
        en: ['Show this result to the staff; if you retake the quiz, only one outcome can be redeemed.'],
      },
    },
    b: {
      emoji: '🌶️',
      title: { zh: '起起落落的椒', en: 'Plot-Twist Pepper' },
      body: {
        zh: '你的生活像一場戲，有情節、有伏筆、有情緒高潮。你討厭平淡，討厭模糊，你要的是那種「能被寫進劇本的故事」。你的感性很強，也可能過度反應，但也因此你總是讓人難以忘記。',
        en: 'Life unfolds like a screenplay for you—foreshadowing, twists, and emotional peaks. You loathe the bland or blurry; you want moments worthy of a script. Your feelings run high, sometimes too high, and that’s exactly why no one forgets you.',
      },
      callout: { zh: '戲劇張力', en: 'Dramatic Pulse' },
      stats: [
        { label: { zh: '情緒波幅', en: 'Emotional Waves' }, value: 92 },
        { label: { zh: '故事感', en: 'Story Arc' }, value: 88 },
        { label: { zh: '穩定度', en: 'Stability' }, value: 28 },
      ],
      keywords: {
        zh: '關鍵字：情緒 / 故事 / 反差',
        en: 'Keywords: Emotional / Narrative / Contrast',
      },
      pairing: {
        zh: '芒果莎莎醬 × 紅醬塔可，先吃再喝',
        en: 'Mango salsa × roja taco, bite first then sip.',
      },
      tips: {
        zh: ['請告知服務人員結果畫面，如重新測驗，結果只能擇一。'],
        en: ['Show this result to the staff; if you retake the quiz, only one outcome can be redeemed.'],
      },
    },
  },
};

const screenContainer = document.getElementById('screen-container');

function setLanguage(lang) {
  state.language = lang;
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
}

function renderLoading(kind) {
  const labelEntry = LOADING_LABELS[kind] ?? LOADING_LABELS.intro;
  const label = kind === 'intro' ? `${LOADING_LABELS.intro.en} · 載入中` : labelEntry[state.language] ?? labelEntry.zh;
  screenContainer.innerHTML = `
    <div class="loading-block">
      <div class="loading-spinner"></div>
      <div class="loading-label">${label}</div>
    </div>
  `;
}

function renderLanguageSelection() {
  state.answers = [];
  screenContainer.innerHTML = `
    <header class="screen-header">
      <span class="screen-kicker">Flavor Quiz</span>
      <h1 class="screen-title">選擇語言 · Pick a language</h1>
      <p class="screen-subtitle">選個語言開始旅程。Choose your language to begin.</p>
    </header>
    <div class="language-grid">
      <button class="btn language" data-lang="zh" type="button">中文</button>
      <button class="btn language" data-lang="en" type="button">English</button>
    </div>
    <p class="tagline">${TAGLINE.zh} / ${TAGLINE.en}</p>
  `;

  screenContainer.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => {
      const lang = button.getAttribute('data-lang');
      setLanguage(lang);
      renderIntro();
    });
  });
}

function renderIntro() {
  screenContainer.innerHTML = `
    <header class="screen-header">
      <span class="screen-kicker">${INTRO_COPY.kicker[state.language]}</span>
      <h1 class="screen-title">${INTRO_COPY.title[state.language]}</h1>
      <p class="screen-subtitle">${INTRO_COPY.subtitle[state.language]}</p>
    </header>
    <p class="tagline">${TAGLINE[state.language]}</p>
    <button class="btn cta" type="button">${INTRO_COPY.button[state.language]}</button>
  `;

  screenContainer.querySelector('.btn.cta').addEventListener('click', () => {
    state.answers = [];
    renderQuestion(0);
  });
}

function renderQuestion(index) {
  const question = QUESTIONS[index];
  const optionsHtml = question.options
    .map(
      (option) => `
        <button class="btn option-btn" type="button" data-type="${option.type}">
          <span>${option.label[state.language]}</span>
        </button>
      `
    )
    .join('');

  screenContainer.innerHTML = `
    <header class="screen-header">
      <span class="screen-kicker">${INTRO_COPY.kicker[state.language]}</span>
      <h2 class="screen-title">${question.title[state.language]}</h2>
    </header>
    <div class="option-list">
      ${optionsHtml}
    </div>
    <p class="tagline">${TAGLINE[state.language]}</p>
  `;

  screenContainer.querySelectorAll('.option-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const choice = button.getAttribute('data-type');
      state.answers[index] = choice;
      const isLastQuestion = index === QUESTIONS.length - 1;
      if (isLastQuestion) {
        renderLoading('blend');
        setTimeout(() => renderResult(), 1400);
      } else {
        renderQuestion(index + 1);
      }
    });
  });
}

function renderResult() {
  const cucumberCount = state.answers.filter((value) => value === 'cucumber').length;
  const pepperCount = state.answers.length - cucumberCount;

  const finalType = cucumberCount >= 2 ? 'cucumber' : 'pepper';
  const variant = finalType === 'cucumber' ? (cucumberCount === 3 ? 'a' : 'b') : pepperCount === 3 ? 'a' : 'b';

  const result = RESULTS[finalType][variant];
  const statsHtml = result.stats
    .map(
      (entry) => `
        <li class="stat-item">
          <div class="stat-meta">
            <span>${entry.label[state.language]}</span>
            <span class="stat-value">${entry.value}%</span>
          </div>
          <div class="stat-bar">
            <span class="stat-bar-fill" style="width: ${entry.value}%"></span>
          </div>
        </li>
      `
    )
    .join('');
  const tips = result.tips?.[state.language] ?? [];
  const tipsHtml = tips.map((tip) => `<li>${tip}</li>`).join('');

  screenContainer.innerHTML = `
    <article class="result-layout">
      <header class="result-header">
        <div class="result-title-group">
          <span class="result-kicker">${INTRO_COPY.kicker[state.language]}</span>
          <h2 class="result-title">${result.title[state.language]}</h2>
          <p class="result-highlight">${result.keywords[state.language]}</p>
        </div>
        <div class="result-header-content">
          <div class="result-header-left">
            <div class="result-emoji-bubble">${result.emoji}</div>
          </div>
          <aside class="result-panel">
            <div class="result-callout">${result.callout[state.language]}</div>
            <ul class="result-stats">
              ${statsHtml}
            </ul>
          </aside>
        </div>
      </header>
      <section class="result-body-block">
        <p class="result-body-text">${result.body[state.language]}</p>
      </section>
      <section class="result-section">
        <h3 class="result-section-title">${SECTION_TITLES.pairing[state.language]}</h3>
        <p class="result-section-text">${result.pairing[state.language]}</p>
      </section>
      <section class="result-section">
        <h3 class="result-section-title">${SECTION_TITLES.tips[state.language]}</h3>
        <ul class="result-list">
          ${tipsHtml}
        </ul>
      </section>
    </article>
    <div class="result-actions">
      <p class="tagline result-tagline">${REDEEM_LINE[state.language]}</p>
      <button class="btn restart" type="button">
        ${state.language === 'zh' ? '再玩一次' : 'Play again'}
      </button>
    </div>
  `;

  screenContainer.querySelector('.btn.restart').addEventListener('click', () => {
    renderIntro();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderLoading('intro');
  setTimeout(() => {
    renderLanguageSelection();
  }, 1500);
});
