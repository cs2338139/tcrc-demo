// 遊戲常量配置
const GAME_CONFIG = {
  LOADING: {
    TOTAL_IMAGES: 8,
    DISPLAY_DURATION: 200,
    FADE_DELAY: 100,
    INITIAL_DELAY: 500,
    FINAL_DELAY: 200,
  },
  ANIMATION: {
    FRAMES_PER_SECOND: 12,
    BUTTON_FRAMES: 16,
    SNAKE_CIRCLE_FRAMES: 19,
    BUTTON_DURATION: 200,
    SNAKE_CIRCLE_DURATION: 750,
  },
  BUTTON: {
    SNAKE: 'snake',
    Q: 'q',
    SUN: 'sun',
  },
  BUTTON_IMAGES: {
    SNAKE: 'Snake',
    Q: 'Q',
    SUN: 'Sun',
  },
  AUDIO: {
    BUTTON: 'button',
    RESULT_NORMAL: 'result-normal',
    RESULT_SPECIAL: 'result-special',
  },
  RESULT: {
    TYPES: {
      RESULT_1: 'result-1',
      RESULT_2: 'result-2',
      RESULT_3: 'result-3',
      RESULT_4: 'result-4',
    },
    IMAGES: {
      'result-1': 'assets/result/cucumber19.webp',
      'result-2': 'assets/result/pepper19.webp',
      'result-3': 'assets/result/together19.webp',
      'result-4': 'assets/result/together+shot.webp',
    },
  },
  RANDOM_THRESHOLDS: {
    RESULT_4: 0.99,
    RESULT_3: 0.96,
    RESULT_2: 0.5,
  },
};

// 遊戲狀態管理
class GameState {
  constructor() {
    this.buttonStates = {
      [GAME_CONFIG.BUTTON.SNAKE]: { isAnimating: false },
      [GAME_CONFIG.BUTTON.Q]: { isAnimating: false },
      [GAME_CONFIG.BUTTON.SUN]: { isAnimating: false },
    };

    this.timerStates = {
      timer1: 'empty',
      timer2: 'empty',
      timer3: 'empty',
      timer4: 'empty',
    };
  }

  updateTimerState(buttonType) {
    const timers = ['timer1', 'timer2', 'timer3', 'timer4'];
    for (const timer of timers) {
      if (this.timerStates[timer] === 'empty') {
        this.timerStates[timer] = buttonType;
        break;
      }
    }
  }

  isGameOver() {
    return this.timerStates.timer4 !== 'empty';
  }

  resetGame() {
    this.timerStates = {
      timer1: 'empty',
      timer2: 'empty',
      timer3: 'empty',
      timer4: 'empty',
    };
  }
}

// 動畫管理器 - 統一管理所有序列圖片的生成和播放
class AnimationManager {
  // 統一的序列圖片生成函式
  static generateSequenceImages(container, config) {
    const images = [];
    container.innerHTML = ''; // 清空現有內容

    for (let i = 1; i <= config.count; i++) {
      const img = document.createElement('img');
      img.src = `${config.basePath}${config.prefix}${i}.${config.extension}`;
      img.alt = config.alt || `${config.prefix} ${i}`;
      img.classList.add(config.className);

      // 第一張圖片設為 active
      if (i === 1) {
        img.classList.add('active');
      }

      container.appendChild(img);
      images.push(img);
    }

    return images;
  }

  // 統一的序列動畫播放函式
  static async playSequenceAnimation(images, config) {
    return new Promise((resolve) => {
      let currentIndex = 0;
      let previousImage = null;

      const animate = () => {
        if (currentIndex < images.length) {
          const currentImage = images[currentIndex];
          currentImage.classList.add('active');

          if (previousImage) {
            previousImage.classList.remove('active');
          }
          previousImage = currentImage;
          currentIndex++;

          setTimeout(animate, config.interval);
        } else {
          // 動畫完成後的回調
          if (config.onComplete) {
            config.onComplete();
          }
          resolve();
        }
      };

      // 支援初始延遲
      const startDelay = config.initialDelay || 0;
      setTimeout(animate, startDelay);
    });
  }

  // 載入動畫（使用統一函式）
  static async playLoadingAnimation(container, totalImages, config) {
    const images = this.generateSequenceImages(container, {
      count: totalImages,
      basePath: 'assets/loading/',
      prefix: 'loading',
      extension: 'png',
      className: 'loading-image',
      alt: 'Loading',
    });

    // 使用特殊的載入動畫邏輯（保持原有的淡入淡出效果）
    return new Promise((resolve) => {
      let currentIndex = 0;
      let previousImage = null;

      const showNext = () => {
        if (currentIndex < totalImages) {
          const currentImage = images[currentIndex];
          currentImage.classList.add('active');

          setTimeout(() => {
            if (previousImage) {
              previousImage.classList.remove('active');
            }
            previousImage = currentImage;
          }, config.FADE_DELAY);

          currentIndex++;
          setTimeout(showNext, config.DISPLAY_DURATION);
        } else {
          setTimeout(resolve, config.FINAL_DELAY);
        }
      };

      setTimeout(showNext, config.INITIAL_DELAY);
    });
  }

  // 按鈕動畫（使用統一函式）
  static async playButtonAnimation(buttonGroup, buttonType, gameState) {
    if (gameState.buttonStates[buttonType].isAnimating) return;

    const images = Array.from(buttonGroup.children);
    gameState.buttonStates[buttonType].isAnimating = true;
    buttonGroup.style.pointerEvents = 'none';

    const interval = GAME_CONFIG.ANIMATION.BUTTON_DURATION / GAME_CONFIG.ANIMATION.FRAMES_PER_SECOND;

    await this.playSequenceAnimation(images, {
      interval: interval,
      onComplete: () => {
        // 重置按鈕狀態
        images.forEach((img) => img.classList.remove('active'));
        images[0].classList.add('active');
        gameState.buttonStates[buttonType].isAnimating = false;
        buttonGroup.style.pointerEvents = 'auto';
      },
    });
  }

  // Snake Circle 動畫（使用統一函式）
  static async playSnakeCircleAnimation(container) {
    const images = Array.from(container.children);
    const interval = GAME_CONFIG.ANIMATION.SNAKE_CIRCLE_DURATION / GAME_CONFIG.ANIMATION.FRAMES_PER_SECOND;

    return this.playSequenceAnimation(images, {
      interval: interval,
    });
  }
}

// 音效管理器
class AudioManager {
  static play(fileName) {
    const audio = new Audio(`assets/audio/${fileName}.mp3`);
    audio.play();
  }
}

// 結果計算器
class ResultCalculator {
  static calculateResult(timerStates) {
    const { timer1, timer2, timer3, timer4 } = timerStates;
    const allTimers = [timer1, timer2, timer3, timer4];

    // 計算特定類型的數量
    const getTypeCount = (type) => allTimers.filter((t) => t === type).length;

    // 計算特定範圍內的類型數量
    const getTypeCountInRange = (range, type) => range.filter((t) => t === type).length;

    // 特殊組合檢查
    const specialCombinations = [
      {
        condition: () => getTypeCountInRange([timer1, timer2], GAME_CONFIG.BUTTON.SNAKE) >= 2 && getTypeCountInRange([timer3, timer4], GAME_CONFIG.BUTTON.SUN) >= 1,
        result: GAME_CONFIG.RESULT.TYPES.RESULT_3,
      },
      {
        condition: () => getTypeCountInRange([timer1, timer2, timer3], GAME_CONFIG.BUTTON.SNAKE) >= 2 && getTypeCountInRange([timer4], GAME_CONFIG.BUTTON.SUN) >= 1,
        result: GAME_CONFIG.RESULT.TYPES.RESULT_3,
      },
      {
        condition: () => getTypeCountInRange([timer1], GAME_CONFIG.BUTTON.SUN) >= 1 && getTypeCountInRange([timer2, timer3], GAME_CONFIG.BUTTON.Q) >= 2 && getTypeCountInRange([timer4], GAME_CONFIG.BUTTON.SNAKE) >= 1,
        result: GAME_CONFIG.RESULT.TYPES.RESULT_4,
      },
    ];

    // 檢查特殊組合
    for (const combo of specialCombinations) {
      if (combo.condition()) return combo.result;
    }

    // 基本數量規則
    const snakeCount = getTypeCount(GAME_CONFIG.BUTTON.SNAKE);
    const sunCount = getTypeCount(GAME_CONFIG.BUTTON.SUN);
    const qCount = getTypeCount(GAME_CONFIG.BUTTON.Q);

    if (snakeCount >= 3) return GAME_CONFIG.RESULT.TYPES.RESULT_1;
    if (sunCount >= 3) return GAME_CONFIG.RESULT.TYPES.RESULT_2;
    if (qCount >= 3) return this.getRandomResult();

    return this.getRandomResult();
  }

  static getRandomResult() {
    const randomValue = Math.random();
    const { RESULT_4, RESULT_3, RESULT_2 } = GAME_CONFIG.RANDOM_THRESHOLDS;

    if (randomValue >= RESULT_4) return GAME_CONFIG.RESULT.TYPES.RESULT_4;
    if (randomValue >= RESULT_3) return GAME_CONFIG.RESULT.TYPES.RESULT_3;
    if (randomValue >= RESULT_2) return GAME_CONFIG.RESULT.TYPES.RESULT_2;
    return GAME_CONFIG.RESULT.TYPES.RESULT_1;
  }
}

// UI 管理器
class UIManager {
  constructor(elements) {
    this.elements = elements;
  }

  updateTimerImages(timerStates) {
    this.elements.timer1.src = `assets/timer/${timerStates.timer1}.webp`;
    this.elements.timer2.src = `assets/timer/${timerStates.timer2}.webp`;
    this.elements.timer3.src = `assets/timer/${timerStates.timer3}.webp`;
    this.elements.timer4.src = `assets/timer/${timerStates.timer4}.webp`;
  }

  async showLoadingScreen() {
    return AnimationManager.playLoadingAnimation(this.elements.loadingContainer, GAME_CONFIG.LOADING.TOTAL_IMAGES, GAME_CONFIG.LOADING);
  }

  hideLoadingScreen() {
    this.elements.loadingContainer.style.display = 'none';
    this.elements.contentContainer.style.display = 'block';
  }

  async lockInterface() {
    this.elements.btnContainer.style.pointerEvents = 'none';
  }

  async flashTimersContainer() {
    const container = this.elements.timersContainer;
    const flashSequence = [
      { opacity: 0, delay: 500 },
      { opacity: 1, delay: 500 },
      { opacity: 0, delay: 500 },
      { opacity: 1, delay: 0 },
    ];

    for (const step of flashSequence) {
      container.style.opacity = step.opacity;
      if (step.delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, step.delay));
      }
    }
  }

  async hideGameElements() {
    this.elements.btnContainer.style.opacity = 0;
    this.elements.timersContainer.style.opacity = 0;
    this.elements.btnContainer.style.pointerEvents = 'none';
  }

  showResult(resultType) {
    const imageSrc = GAME_CONFIG.RESULT.IMAGES[resultType];
    this.elements.resultImage.src = imageSrc;
    this.elements.resultImage.style.opacity = 1;
    this.elements.snakeCircleContainer.style.opacity = 0;

    // 播放對應音效
    const isSpecialResult = resultType === GAME_CONFIG.RESULT.TYPES.RESULT_3 || resultType === GAME_CONFIG.RESULT.TYPES.RESULT_4;
    const audioType = isSpecialResult ? GAME_CONFIG.AUDIO.RESULT_SPECIAL : GAME_CONFIG.AUDIO.RESULT_NORMAL;
    AudioManager.play(audioType);
  }

  initializeSnakeCircleImages() {
    // 使用統一的序列圖片生成函式
    AnimationManager.generateSequenceImages(this.elements.snakeCircleContainer, {
      count: GAME_CONFIG.ANIMATION.SNAKE_CIRCLE_FRAMES,
      basePath: 'assets/snakecircle/',
      prefix: 'snakecircle',
      extension: 'webp',
      className: 'snake-circle-image',
      alt: 'Snake Circle',
    });
  }

  initializeButtonImages() {
    // 使用統一的序列圖片生成函式生成所有按鈕圖片
    this.initializeButtonGroup(this.elements.snakeBtnGroup, GAME_CONFIG.BUTTON_IMAGES.SNAKE);
    this.initializeButtonGroup(this.elements.qBtnGroup, GAME_CONFIG.BUTTON_IMAGES.Q);
    this.initializeButtonGroup(this.elements.sunBtnGroup, GAME_CONFIG.BUTTON_IMAGES.SUN);
  }

  initializeButtonGroup(container, buttonName) {
    // 使用統一的序列圖片生成函式
    AnimationManager.generateSequenceImages(container, {
      count: GAME_CONFIG.ANIMATION.BUTTON_FRAMES,
      basePath: 'assets/btn/',
      prefix: buttonName,
      extension: 'webp',
      className: 'btn-image',
      alt: buttonName,
    });
  }
}

// 主遊戲類
class TCRCGame {
  constructor() {
    this.gameState = new GameState();
    this.elements = this.getElements();
    this.ui = new UIManager(this.elements);
    this.initializeGame();
  }

  getElements() {
    return {
      loadingContainer: document.getElementById('loading-container'),
      contentContainer: document.getElementById('content-container'),
      btnContainer: document.getElementById('btn-container'),
      resultImage: document.getElementById('result-img'),
      snakeBtnGroup: document.getElementById('snake-btn-group'),
      qBtnGroup: document.getElementById('q-btn-group'),
      sunBtnGroup: document.getElementById('sun-btn-group'),
      snakeCircleContainer: document.getElementById('snake-circle-container'),
      timersContainer: document.getElementById('timers-container'),
      timer1: document.getElementById('timer-1'),
      timer2: document.getElementById('timer-2'),
      timer3: document.getElementById('timer-3'),
      timer4: document.getElementById('timer-4'),
    };
  }

  async initializeGame() {
    // 初始化 snake circle 圖片
    this.ui.initializeSnakeCircleImages();

    // 初始化按鈕圖片
    this.ui.initializeButtonImages();

    // 設置按鈕事件監聽器
    this.setupEventListeners();

    // 播放載入動畫
    await this.ui.showLoadingScreen();
    this.ui.hideLoadingScreen();
  }

  setupEventListeners() {
    this.elements.snakeBtnGroup.addEventListener('click', () => this.handleButtonPress(GAME_CONFIG.BUTTON.SNAKE));
    this.elements.qBtnGroup.addEventListener('click', () => this.handleButtonPress(GAME_CONFIG.BUTTON.Q));
    this.elements.sunBtnGroup.addEventListener('click', () => this.handleButtonPress(GAME_CONFIG.BUTTON.SUN));
  }

  async handleButtonPress(buttonType) {
    if (this.gameState.isGameOver()) return;

    const buttonGroup = this.elements[`${buttonType}BtnGroup`];

    // 播放按鈕音效
    AudioManager.play(GAME_CONFIG.AUDIO.BUTTON);

    // 播放按鈕動畫
    await AnimationManager.playButtonAnimation(buttonGroup, buttonType, this.gameState);

    // 處理遊戲邏輯
    await this.processGameLogic(buttonType);
  }

  async processGameLogic(buttonType) {
    // 更新遊戲狀態
    this.gameState.updateTimerState(buttonType);
    this.ui.updateTimerImages(this.gameState.timerStates);

    // 檢查遊戲是否結束
    if (!this.gameState.isGameOver()) return;

    // 遊戲結束流程
    await this.ui.lockInterface();
    await this.ui.flashTimersContainer();
    await this.ui.hideGameElements();
    await AnimationManager.playSnakeCircleAnimation(this.elements.snakeCircleContainer);

    // 計算並顯示結果
    const result = ResultCalculator.calculateResult(this.gameState.timerStates);
    this.ui.showResult(result);
  }
}

// 當 DOM 載入完成時啟動遊戲
document.addEventListener('DOMContentLoaded', () => {
  new TCRCGame();
});
