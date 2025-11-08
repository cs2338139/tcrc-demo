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
  recommendedCocktails: { zh: '推薦調酒', en: 'Recommended Cocktails' },
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
      image: 'assets/result/kindcucumber.png',
      title: { zh: '單純善良的瓜', en: 'Pure-Hearted Cucumber' },
      body: {
        zh: '你的善良必須有點鋒芒 \n\n你懂得照顧別人情緒，卻常常忘了自己也值得被照顧。生活亂七八糟，但你還是選擇相信世界。請記得學習好好善待自己。',
        en: 'Your kindness must have a hint of edge. \n\nYou care for others’ feelings but often forget to care for yourself. Life is messy, but you still choose to believe in the world. Please remember to learn how to treat yourself well.',
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
      recommendedCocktails: {
        zh: ['1. 黑次李琴費士   Sloegin fizz', '2. 蜜蜂膝蓋Bee’s knees', '3. 老廣場 Vieux carre'],
        en: ['1. Sloe Gin Fizz', '2. Bee’s Knees', '3. Vieux Carre'],
      },
    },
    b: {
      emoji: '🥒',
      image: 'assets/result/Smartcucumber.png',
      title: { zh: '理性聰明的瓜', en: 'Clear-Minded Cucumber' },
      body: {
        zh: '決定你是誰的不是你的內心，而是你的行為。 \n\n你不輕易說話，卻什麼都看在心裡。 \n你冷靜、理性，善於用距離保護自己，也用觀察掌握全局。就跟蝙蝠俠一樣。',
        en: 'What defines you isn’t your heart—it’s your actions. \n\nYou rarely speak, yet you keep every detail in mind. \nYou remain calm and rational, using distance to protect yourself and observation to grasp the whole picture—like Batman.',
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
      recommendedCocktails: {
        zh: ['1. 嗨波 high ball', '2. 飛行 Avation', '3. 馬丁尼 Martini'],
        en: ['1. Highball', '2. Aviation', '3. Martini'],
      },
    },
  },
  pepper: {
    a: {
      emoji: '🌶️',
      image: 'assets/result/livepepper.png',
      title: { zh: '熱烈追求的椒', en: 'Passion-Chaser Pepper' },
      body: {
        zh: '這世界能給你的只是一場遊戲，你要贏，就得出界。 \n\n你渴望所有感官都被點燃。香氣、畫面、音樂、情緒，通通都要來真的。 \n別人覺得太多，你卻覺得剛好；你不要平淡，你只想活得像主角。',
        en: 'This world gives you only a game—to win, you must break the rules. \n\nYou crave every sense to be ignited. Scents, visuals, music, emotions—they all need to be real. \nOthers think too much, but you think just right; you don’t want boring, you just want to live like a star.',
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
      recommendedCocktails: {
        zh: ['1. 查理·卓別林 Charlie Chaplin', '2. 血腥瑪麗 Bloody Mary', '3. 煙燻蘿希塔 Mezcal Rosita'],
        en: ['1. Charlie Chaplin', '2. Bloody Mary', '3. Mezcal Rosita'],
      },
    },
    b: {
      emoji: '🌶️',
      image: 'assets/result/upsetpepper.png',
      title: { zh: '起起落落的椒', en: 'Plot-Twist Pepper' },
      body: {
        zh: '人生就像一盒巧克力，你永遠不知道會拿到什麼。 \n\n你的人生總帶點高潮起伏，像在演電影。 \n你渴望深刻的感受，也甘願承擔情緒的重量。 \n平凡對你來說太無趣，有層次的活法才是你的追求。',
        en: 'Life unfolds like a box of chocolates—you never know what you’ll get. \n\nYour life always has ups and downs, like a movie. \nYou crave deep feelings and are willing to bear the weight of emotions. \nOrdinary feels dull to you; layered living is what you pursue.',
      },
      callout: { zh: '戲劇張力', en: 'Dramatic Tension' },
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
      recommendedCocktails: {
        zh: ['1. 迪亞布羅 El Diablo', '2. 咖啡馬丁尼 Expresso Martini', '3. 內格羅尼 Negroni'],
        en: ['1. El Diablo', '2. Espresso Martini', '3. Negroni'],
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
  const recommendedCocktails = result.recommendedCocktails?.[state.language] ?? [];
  const recommendedCocktailsHtml = recommendedCocktails.map((tip) => `<li>${tip}</li>`).join('');

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
            <div class="result-emoji-bubble">
              <img class="result-emoji-image" src="${result.image}" alt="${result.title[state.language]}">
            </div>
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
        <h3 class="result-section-title">${SECTION_TITLES.recommendedCocktails[state.language]}</h3>
        <ul class="result-list">
          ${recommendedCocktailsHtml}
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
