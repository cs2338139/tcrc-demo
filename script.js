document.addEventListener('DOMContentLoaded', function () {
  const loadingContainer = document.getElementById('loading-container');

  const contentContainer = document.getElementById('content-container');
  const btnContainer = document.getElementById('btn-container');
  const resultImage = document.getElementById('result-img');
  const snakeBtnGroup = document.getElementById('snake-btn-group');
  const qBtnGroup = document.getElementById('q-btn-group');
  const sunBtnGroup = document.getElementById('sun-btn-group');
  const snakeCircleContainer = document.getElementById('snake-circle-container');

  const timersContainer = document.getElementById('timers-container');
  const timer1 = document.getElementById('timer-1');
  const timer2 = document.getElementById('timer-2');
  const timer3 = document.getElementById('timer-3');
  const timer4 = document.getElementById('timer-4');

  const BUTTON_STATES = {
    snake: { isAnimating: false },
    q: { isAnimating: false },
    sun: { isAnimating: false },
  };

  const TIMER_STATES = {
    timer1: 'empty',
    timer2: 'empty',
    timer3: 'empty',
    timer4: 'empty',
  };

  // 載入動畫
  function loadingAnimation() {
    const totalLoadingImages = 8;
    const loadingImages = [];
    for (let i = 1; i <= totalLoadingImages; i++) {
      const img = document.createElement('img');
      img.src = `assets/loading/loading${i}.png`;
      img.alt = `Loading ${i}`;
      img.classList.add('loading-image');
      loadingContainer.appendChild(img);
      loadingImages.push(img);
    }

    let currentLoadingIndex = 0;
    let previousLoadingImage = null;

    function showNextLoadingImage() {
      if (currentLoadingIndex < totalLoadingImages) {
        const currentImage = loadingImages[currentLoadingIndex];
        currentImage.classList.add('active');

        setTimeout(() => {
          if (previousLoadingImage) {
            previousLoadingImage.classList.remove('active');
          }
          previousLoadingImage = currentImage;
        }, 100);

        currentLoadingIndex++;
        setTimeout(showNextLoadingImage, 200);
      } else {
        setTimeout(() => {
          loadingContainer.style.display = 'none';
          contentContainer.style.display = 'block';
        }, 200);
      }
    }

    setTimeout(showNextLoadingImage, 500);
  }

  function playAudio(fileName) {
    const audio = new Audio(`assets/audio/${fileName}.mp3`);
    audio.play();
  }

  async function handleButtonClick(buttonType) {
    function updateTimerState() {
      if (TIMER_STATES.timer1 === 'empty') {
        TIMER_STATES.timer1 = buttonType;
      } else if (TIMER_STATES.timer2 === 'empty') {
        TIMER_STATES.timer2 = buttonType;
      } else if (TIMER_STATES.timer3 === 'empty') {
        TIMER_STATES.timer3 = buttonType;
      } else if (TIMER_STATES.timer4 === 'empty') {
        TIMER_STATES.timer4 = buttonType;
      }
    }

    function updateTimerImage() {
      timer1.src = `assets/timer/${TIMER_STATES.timer1}.webp`;
      timer2.src = `assets/timer/${TIMER_STATES.timer2}.webp`;
      timer3.src = `assets/timer/${TIMER_STATES.timer3}.webp`;
      timer4.src = `assets/timer/${TIMER_STATES.timer4}.webp`;
    }

    async function lockBtnContainer() {
      await new Promise((resolve) => {
        btnContainer.style.pointerEvents = 'none';
        resolve();
      });
    }

    async function timersContainerShining() {
      timersContainer.style.opacity = 0;
      await new Promise((resolve) => setTimeout(resolve, 500));
      timersContainer.style.opacity = 1;
      await new Promise((resolve) => setTimeout(resolve, 500));
      timersContainer.style.opacity = 0;
      await new Promise((resolve) => setTimeout(resolve, 500));
      timersContainer.style.opacity = 1;
    }

    async function allContainerOpacity() {
      await new Promise((resolve) => {
        btnContainer.style.opacity = 0;
        timersContainer.style.opacity = 0;
        btnContainer.style.pointerEvents = 'none';
        resolve();
      });
    }

    const checkResult = () => {
      return new Promise((resolve) => {
        const { timer1, timer2, timer3, timer4 } = TIMER_STATES;
        const allTimers = [timer1, timer2, timer3, timer4];

        const getRandomResult = () => {
          // 隨機結果生成器，使用常數提高可讀性
          const RANDOM_THRESHOLDS = {
            RESULT_4: 0.99,
            RESULT_3: 0.96,
            RESULT_2: 0.5,
          };
          const randomValue = Math.random();
          if (randomValue >= RANDOM_THRESHOLDS.RESULT_4) return 'result-4';
          if (randomValue >= RANDOM_THRESHOLDS.RESULT_3) return 'result-3';
          if (randomValue >= RANDOM_THRESHOLDS.RESULT_2) return 'result-2';
          return 'result-1';
        };

        // 計算特定類型在所有計時器中的數量
        const getTimerTypeCount = (timerType) => {
          return allTimers.filter((timer) => timer === timerType).length;
        };

        // 計算特定類型在指定範圍內的數量
        const getTimerTypeCountInRange = (timerRange, timerType) => {
          return timerRange.filter((timer) => timer === timerType).length;
        };

        // 定義特殊組合規則
        const specialCombinations = [
          {
            // 前兩個位置有2個以上snake，後兩個位置有1個以上sun
            condition: () => getTimerTypeCountInRange([timer1, timer2], 'snake') >= 2 && getTimerTypeCountInRange([timer3, timer4], 'sun') >= 1,
            result: 'result-3',
          },
          {
            // 前三個位置有2個以上snake，第四個位置有1個以上sun
            condition: () => getTimerTypeCountInRange([timer1, timer2, timer3], 'snake') >= 2 && getTimerTypeCountInRange([timer4], 'sun') >= 1,
            result: 'result-3',
          },
          {
            // 第一個位置有sun，第二三個位置有2個q，第四個位置有snake
            condition: () => getTimerTypeCountInRange([timer1], 'sun') >= 1 && getTimerTypeCountInRange([timer2, timer3], 'q') >= 2 && getTimerTypeCountInRange([timer4], 'snake') >= 1,
            result: 'result-4',
          },
        ];

        // 檢查特殊組合
        for (const combination of specialCombinations) {
          if (combination.condition()) {
            resolve(combination.result);
            return;
          }
        }

        // 檢查基本數量規則
        const snakeCount = getTimerTypeCount('snake');
        const sunCount = getTimerTypeCount('sun');
        const qCount = getTimerTypeCount('q');

        if (snakeCount >= 3) {
          resolve('result-1');
          return;
        }

        if (sunCount >= 3) {
          resolve('result-2');
          return;
        }

        if (qCount >= 3) {
          resolve(getRandomResult());
          return;
        }

        // 預設返回隨機結果
        resolve(getRandomResult());
      });
    };

    function setResult(result) {
      switch (result) {
        case 'result-1': {
          resultImage.src = 'assets/result/cucumber19.webp';
          playAudio('result-normal');
          break;
        }
        case 'result-2': {
          resultImage.src = 'assets/result/pepper19.webp';
          playAudio('result-normal');
          break;
        }
        case 'result-3': {
          resultImage.src = 'assets/result/together19.webp';
          playAudio('result-special');
          break;
        }
        case 'result-4': {
          resultImage.src = 'assets/result/together+shot.webp';
          playAudio('result-special');
          break;
        }
      }

      resultImage.style.opacity = 1;
      snakeCircleContainer.style.opacity = 0;
    }

    const isGameOver = () => TIMER_STATES.timer4 === 'empty';

    updateTimerState();
    updateTimerImage();

    if (isGameOver()) return;

    await lockBtnContainer();
    await timersContainerShining();
    await allContainerOpacity();

    const framesPerSecond = 12;
    const interval = 1000 / framesPerSecond;
    let currentImageIndex = 0;
    let previousImageIndex = null;

    const animate = async () => {
      const snakeCircleImages = Array.from(snakeCircleContainer.children);
      if (currentImageIndex < snakeCircleImages.length) {
        const currentImage = snakeCircleImages[currentImageIndex];

        currentImage.classList.add('active');
        if (previousImageIndex) {
          previousImageIndex.classList.remove('active');
        }
        previousImageIndex = currentImage;
        currentImageIndex++;

        await new Promise((resolve) => setTimeout(resolve, interval));
        await animate();
      }
    };

    await animate();

    const result = await checkResult();

    setResult(result);
  }

  function playButtonAnimation(buttonType, buttonGroup) {
    if (BUTTON_STATES[buttonType].isAnimating) return;
    const imageList = Array.from(buttonGroup.children);

    BUTTON_STATES[buttonType].isAnimating = true;
    buttonGroup.style.pointerEvents = 'none'; // 鎖定按鈕

    const framesPerSecond = 12;
    const interval = 300 / framesPerSecond;
    let currentImageIndex = 0;
    let previousImageIndex = null;

    playAudio('button');
    const animate = () => {
      if (currentImageIndex < imageList.length) {
        const currentImage = imageList[currentImageIndex];

        currentImage.classList.add('active');
        if (previousImageIndex) {
          previousImageIndex.classList.remove('active');
        }
        previousImageIndex = currentImage;
        currentImageIndex++;
        setTimeout(animate, interval);
      } else {
        // 動畫結束，重置狀態
        imageList.forEach((image) => {
          image.classList.remove('active');
        });
        imageList[0].classList.add('active');
        BUTTON_STATES[buttonType].isAnimating = false;
        buttonGroup.style.pointerEvents = 'auto'; // 解鎖按鈕

        handleButtonClick(buttonType);
      }
    };

    animate();
  }

  snakeBtnGroup.addEventListener('click', () => playButtonAnimation('snake', snakeBtnGroup));
  qBtnGroup.addEventListener('click', () => playButtonAnimation('q', qBtnGroup));
  sunBtnGroup.addEventListener('click', () => playButtonAnimation('sun', sunBtnGroup));

  // loadingAnimation();
});
