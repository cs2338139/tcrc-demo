這是一個全新的頁面，所以要完全獨立製作，要跟之前的內容與資源切分開來，圖檔部分可以先沿用。
我要以html靜態檔案完成，不使用任何框架與node與npm插件

---

# TCRC Demo — AI Implementation Spec (Static HTML, No Frameworks)

## Metadata
- project_id: "tcrc-demo"
- author_note: "Single static HTML/CSS/JS. No npm, no Node, no frameworks. Images may reuse existing assets."
- version: 1.0.0
- last_updated: 2025-10-10

## Runtime Requirements
- Single-page app (SPA-like) behavior implemented with vanilla JS (no bundlers).
- All screens are logical states shown/hidden via `data-screen` containers.
- No network calls required.
- Language toggle between `zh-TW` and `en-US`.
- Assets: optional images may be reused from existing repo.
- Accessibility: focus trap on modals (if any), `aria-live="polite"` for Loading text, buttons reachable via keyboard.

## Global Strings (i18n)
strings:
  zh-TW:
    banner_disclaimer: "純屬娛樂！不許追究！"
    banner_reward: "請記得找服務人員兌換塔可！"
    start_btn: "開始"
    loading: "Loading"
    choose_language: "選擇語言"
    lang_zh: "中文"
    lang_en: "English"
    intro_line: "我把最後的風味藏起來了，去完成這場測驗吧！"
    q1_title: "你最容易被哪種香氣吸引？"
    q1_a: "洗完曬乾的棉被香、果香、青草（🥒）"
    q1_b: "辛香料、龍涎香、皮革或木質調（🌶️）"
    q2_title: "你在一個陌生地方醒來，眼前的風景是？"
    q2_a: "一片綠意花園，空氣有露水味（🥒）"
    q2_b: "看不見盡頭的濃霧森林，地上是濕濕的土壤（🌶️）"
    q3_title: "約會看電影，你通常會選？"
    q3_a: "清新、文藝、愛情、輕鬆、戲劇（🥒）"
    q3_b: "爽片，驚悚、刺激、動作強片（🌶️）"
    r_1a_title: "單純善良的瓜"
    r_1a_body: "你是個偏感受型的人。對你來說，安全感來自於「被理解」與「純淨的存在感」。你習慣觀察，願意用柔軟對待世界。你不是軟弱，只是你相信——柔和是一種力量。"
    r_1b_title: "理性聰明的瓜"
    r_1b_body: "你習慣自己走在霧中，帶著一點神秘、一點距離感。你不常主動吐露心事，但其實情緒很深。你不害怕孤獨，反而在混沌中找到了自己的秩序。"
    r_2a_title: "熱烈追求的椒"
    r_2a_body: "你是活在五感裡的人，喜歡一切濃烈、真實的感覺。香氣、影像、情緒，通通要到位才行。你排斥無聊，追求刺激與情緒釋放，就算會燙傷也不願活得平淡。"
    r_2b_title: "起起落落的椒"
    r_2b_body: "你的生活像一場戲，有情節、有伏筆、有情緒高潮。你討厭平淡，討厭模糊，你要的是那種「能被寫進劇本的故事」。你的感性很強，也可能過度反應，但也因此你總是讓人難以忘記。"
  en-US:
    banner_disclaimer: "Just for fun—no overthinking!"
    banner_reward: "Remember to redeem your taco with staff!"
    start_btn: "Start"
    loading: "Loading"
    choose_language: "Choose Language"
    lang_zh: "中文"
    lang_en: "English"
    intro_line: "I’ve hidden the final flavor—complete this quiz to reveal it!"
    q1_title: "Which kind of scent attracts you most?"
    q1_a: "Freshly sun-dried linens, fruity notes, green/grass (🥒)"
    q1_b: "Spices, ambergris, leather, or woody notes (🌶️)"
    q2_title: "You wake up somewhere unfamiliar. What do you see?"
    q2_a: "A lush green garden, dew in the air (🥒)"
    q2_b: "An endless foggy forest, damp soil underfoot (🌶️)"
    q3_title: "For a movie date, you usually pick?"
    q3_a: "Fresh, indie, romance, easygoing, drama (🥒)"
    q3_b: "Blockbusters: thriller, intense, action (🌶️)"
    r_1a_title: "Pure & Kind Cucumber"
    r_1a_body: "You’re feeling-oriented. Safety comes from being understood and a sense of pure presence. You observe and treat the world gently—not out of weakness, but because softness is strength."
    r_1b_title: "Rational & Clever Cucumber"
    r_1b_body: "You often walk through the mist—mysterious and a bit distant. You rarely disclose your heart, yet feel deeply. You’re unafraid of solitude; you find order in the chaos."
    r_2a_title: "Passion-Chasing Pepper"
    r_2a_body: "You live through the senses and love everything bold and real. Scents, images, emotions—all must hit. You reject boredom, pursue thrills and release, even if it risks a burn."
    r_2b_title: "Rise-and-Fall Pepper"
    r_2b_body: "Life is a drama with setups and climaxes. You dislike bland and blurry. You want stories worthy of a script. Your sensitivity runs high—sometimes too high—and that’s why you’re unforgettable."

## Screens (State Machine)
# IDs: P1..P8; exact order and routing below.
screens:
  - id: P1
    type: loading
    props:
      text_key: loading
      min_duration_ms: 1200
      aria_live: polite
  - id: P2
    type: language_select
    props:
      title_key: choose_language
      options:
        - code: zh-TW
          label_key: lang_zh
        - code: en-US
          label_key: lang_en
  - id: P3
    type: intro
    props:
      paragraph_key: intro_line
      cta_key: start_btn
      footer_banner_key: banner_disclaimer
  - id: P4
    type: question
    props:
      question_id: q1
      title_key: q1_title
      footer_banner_key: banner_disclaimer
      options:
        - id: A
          label_key: q1_a
          value: A
        - id: B
          label_key: q1_b
          value: B
  - id: P5
    type: question
    props:
      question_id: q2
      title_key: q2_title
      footer_banner_key: banner_disclaimer
      options:
        - id: A
          label_key: q2_a
          value: A
        - id: B
          label_key: q2_b
          value: B
  - id: P6
    type: question
    props:
      question_id: q3
      title_key: q3_title
      footer_banner_key: banner_disclaimer
      options:
        - id: A
          label_key: q3_a
          value: A
        - id: B
          label_key: q3_b
          value: B
  - id: P7
    type: loading
    props:
      text_key: loading
      min_duration_ms: 1000
      aria_live: polite
  - id: P8
    type: result
    props:
      footer_banner_key: banner_reward
      # Actual title/body resolved by logic.result_variant

## Flow / Transitions
# Deterministic routing between screens — no network.
transitions:
  - from: P1
    to: P2
    on: timeout
  - from: P2
    to: P3
    on: language_selected
  - from: P3
    to: P4
    on: click_cta
  - from: P4
    to: P5
    on: answer
  - from: P5
    to: P6
    on: answer
  - from: P6
    to: P7
    on: answer
  - from: P7
    to: P8
    on: timeout

## Quiz Logic
# A/B options map to 🥒 (A) and 🌶️ (B).
# Majority vote determines track: A → cucumber(1), B → pepper(2).
# Variant (a/b) determined by Q3 (movie) choice:
#   - If track=1 (A-majority): q3=A → 1.a, q3=B → 1.b
#   - If track=2 (B-majority): q3=B → 2.a, q3=A → 2.b
logic:
  tallies:
    A_key: "A"
    B_key: "B"
  questions: [q1, q2, q3]
  result_variant:
    compute: |
      const a = answers.filter(v => v === 'A').length;
      const b = answers.length - a;
      const track = (a >= 2) ? '1' : '2';
      const q3 = answerById('q3');
      if (track === '1') {
        return q3 === 'A' ? '1a' : '1b';
      } else {
        return q3 === 'B' ? '2a' : '2b';
      }

## Result Content Map
results:
  "1a":
    title_key: r_1a_title
    body_key: r_1a_body
    emoji: "🥒"
  "1b":
    title_key: r_1b_title
    body_key: r_1b_body
    emoji: "🥒"
  "2a":
    title_key: r_2a_title
    body_key: r_2a_body
    emoji: "🌶️"
  "2b":
    title_key: r_2b_title
    body_key: r_2b_body
    emoji: "🌶️"

## Minimal DOM Contract (for implementer)
# One `index.html` with the following containers (IDs are required):
html_contract:
  containers:
    - id: app
    - id: screen-P1
    - id: screen-P2
    - id: screen-P3
    - id: screen-P4
    - id: screen-P5
    - id: screen-P6
    - id: screen-P7
    - id: screen-P8
  data_attrs:
    - name: data-screen
      values: [P1, P2, P3, P4, P5, P6, P7, P8]
  classes:
    - hidden: "is-hidden"

## Minimal JS Contract (pseudo-code)
js_contract:
  boot: |
    // read preferred lang from localStorage; default zh-TW
    // hydrate screen P1 → P2, etc.
    // maintain answers as array in order [q1, q2, q3]
  lang_var:
    description: |
      Define a single variable `let lang = 'zh-TW';` (default) at boot.
      Store selected language in `localStorage` as `tcrc.lang`.
      When switching languages, update `lang` and re-render all text nodes that reference it.
    example_code: |
      let lang = localStorage.getItem('tcrc.lang') || 'zh-TW';
      const t = (key) => STRINGS[lang][key];
      const STRINGS = {
        'zh-TW': { loading: 'Loading', start_btn: '開始', banner_disclaimer: '純屬娛樂！不許追究！' },
        'en-US': { loading: 'Loading', start_btn: 'Start', banner_disclaimer: 'Just for fun—no overthinking!' },
      };
      function updateTexts() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          el.textContent = t(key);
        });
      }
      function setLanguage(code) {
        lang = code;
        localStorage.setItem('tcrc.lang', code);
        updateTexts();
      }
    note: |
      No i18n plugin or framework required. Each translatable DOM element uses `data-i18n="key"`.
      All text replacements are done via the `updateTexts()` function on render.
  event_api:
    - name: setLanguage(code)
    - name: answer(question_id, value) // value in {'A','B'}
    - name: next()
  storage:
    - key: tcrc.lang
    - key: tcrc.answers

## Styling Notes
style:
  font_family_primary: "'Chiron GoRound TC'"
  font_stack: "'Chiron GoRound TC', system-ui, -apple-system, 'Noto Sans TC', 'PingFang TC', 'Heiti TC', sans-serif"
  font_weights:
    heading: 700
    subheading: 500
    body: 400
    caption: 300
  color_theme:
    primary: "#111"
    accent_cucumber: "#2e7d32"
    accent_pepper: "#c62828"
  motion:
    loading_spinner_css: "prefers-reduced-motion: reduce respectful"
  font_loading_instructions: |
    <!-- Include in <head> of index.html -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Chiron+GoRound+TC:wght@300;400;500;700&display=swap" rel="stylesheet">
  css_tokens: |
    :root{
      --font-family: 'Chiron GoRound TC', system-ui, -apple-system, 'Noto Sans TC', 'PingFang TC', 'Heiti TC', sans-serif;
      --fw-heading: 700;
      --fw-subheading: 500;
      --fw-body: 400;
      --fw-caption: 300;
    }
    body{ font-family: var(--font-family); font-weight: var(--fw-body); }
    .h1, h1{ font-weight: var(--fw-heading); }
    .h2, h2{ font-weight: var(--fw-subheading); }
    .caption{ font-weight: var(--fw-caption); font-size: 0.875rem; opacity: .8; }

## QA Checklist
qa:
  - Language switching updates all visible strings instantly.
  - Keyboard navigation covers all interactive elements.
  - Loading screens respect min durations.
  - Exactly four possible result variants are reachable.
  - Banner texts match spec for each screen