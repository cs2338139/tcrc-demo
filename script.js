document.addEventListener('DOMContentLoaded', function() {
    const loadingContainer = document.getElementById('loading-container');

    const contentContainer = document.getElementById('content-container');
    const btnContainer = document.getElementById('btn-container');
    const pepper = document.getElementById('pepper');
    const cum = document.getElementById('cum');
    const brownPotion = document.getElementById('brown-potion');
    const snakeBtnGroup = document.getElementById('snake-btn-group');
    const qBtnGroup = document.getElementById('q-btn-group');
    const sunBtnGroup = document.getElementById('sun-btn-group');

    const timer1 = document.getElementById('timer-1');
    const timer2 = document.getElementById('timer-2');
    const timer3 = document.getElementById('timer-3');
    const timer4 = document.getElementById('timer-4');

    const BUTTON_STATES = {
        snake: { isAnimating: false },
        q: { isAnimating: false },
        sun: { isAnimating: false }
    };

    const TIMER_STATES = {
        timer1: 'empty',
        timer2: 'empty',
        timer3: 'empty',
        timer4: 'empty'
    };

    // 載入動畫
    function loadingAnimation(){
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

    function handleButtonClick(buttonType) {
        function updateTimerImage() {
            timer1.src = `assets/timer/${TIMER_STATES.timer1}.webp`;
            timer2.src = `assets/timer/${TIMER_STATES.timer2}.webp`;
            timer3.src = `assets/timer/${TIMER_STATES.timer3}.webp`;
            timer4.src = `assets/timer/${TIMER_STATES.timer4}.webp`;
        }

        if (TIMER_STATES.timer1 === 'empty') {
            TIMER_STATES.timer1 = buttonType;
        } else if (TIMER_STATES.timer2 === 'empty') {
            TIMER_STATES.timer2 = buttonType;
        } else if (TIMER_STATES.timer3 === 'empty') {
            TIMER_STATES.timer3 = buttonType;
        } else if (TIMER_STATES.timer4 === 'empty') {
            TIMER_STATES.timer4 = buttonType;
        }

        updateTimerImage();
    }

    function playButtonAnimation(buttonType, buttonGroup) {
        console.log(buttonType, buttonGroup);
        if (BUTTON_STATES[buttonType].isAnimating) return;
        const imageList = Array.from(buttonGroup.children);

        BUTTON_STATES[buttonType].isAnimating = true;
        buttonGroup.style.pointerEvents = 'none'; // 鎖定按鈕

        const framesPerSecond = 12;
        const interval = 300 / framesPerSecond;
        let currentImageIndex = 0;
        let previousImageIndex = null;

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
                imageList.forEach(image => {
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


    // ------------------------------------------------------------
    // 隱藏所有獎勵圖片
    // pepper.classList.add('hidden');
    // cum.classList.add('hidden');
    // brownPotion.classList.add('hidden');

    // 定義獎勵顯示配置
    // const REWARDS_CONFIG = {
    //     snake: {
    //         maxClicks: 4,
    //         reward: () => showReward(['cum'])
    //     },
    //     q: {
    //         maxClicks: 4,
    //         reward: () => {
    //             const random = Math.random();
    //             if (random < 0.45) {
    //                 showReward(['pepper']);
    //             } else if (random < 0.9) {
    //                 showReward(['cum']);
    //             } else if (random < 0.97) {
    //                 showReward(['pepper', 'cum'], { position: 'relative' });
    //             } else {
    //                 showReward(
    //                     ['pepper', 'cum', 'brown-potion'],
    //                     {
    //                         pepper: { position: 'relative', transform: 'translateY(50px)' },
    //                         cum: { position: 'relative', transform: 'translateY(50px)' },
    //                         'brown-potion': { position: 'relative', transform: 'translateY(-50px)' }
    //                     }
    //                 );
    //             }
    //         }
    //     },
    //     sun: {
    //         maxClicks: 4,
    //         reward: () => showReward(['pepper'])
    //     }
    // };

    // // 點擊計數器
    // const clickCounts = {
    //     snake: 0,
    //     q: 0,
    //     sun: 0
    // };

    // // 檢查特殊組合
    // function checkSpecialCombinations() {
    //     // 規則1: 太陽、蛇、問號各按2次 = 紅+綠
    //     if (clickCounts.sun === 2 && clickCounts.snake === 2 ) {
    //         showReward(['pepper', 'cum'], { position: 'relative' });
    //         // 重置計數器
    //         resetClickCounts();
    //         return true;
    //     }

    //     // 規則2: 問號、太陽、蛇各按4次 = 紅+綠+shot
    //     if (clickCounts.sun === 3 && clickCounts.snake === 3 && clickCounts.q === 3) {
    //         showReward(
    //             ['pepper', 'cum', 'brown-potion'],
    //             {
    //                 pepper: { position: 'relative', transform: 'translateY(50px)' },
    //                 cum: { position: 'relative', transform: 'translateY(50px)' },
    //                 'brown-potion': { position: 'relative', transform: 'translateY(-50px)' }
    //             }
    //         );
    //         // 重置計數器
    //         resetClickCounts();
    //         return true;
    //     }

    //     return false;
    // }

    // // 重置所有計數器
    // function resetClickCounts() {
    //     Object.keys(clickCounts).forEach(key => {
    //         clickCounts[key] = 0;
    //     });
    // }

    // // 通用顯示獎勵函數
    // function showReward(items, styles = {}) {
    //     items.forEach(item => {
    //         const element = document.getElementById(item);
    //         element.classList.remove('hidden');

    //         // 如果有特定樣式，則應用樣式
    //         if (styles[item]) {
    //             Object.assign(element.style, styles[item]);
    //         } else if (typeof styles === 'object' && !Array.isArray(styles)) {
    //             Object.assign(element.style, styles);
    //         }
    //     });
    //     btnContainer.classList.add('hidden');
    // }

    // // 通用按鈕點擊處理函數
    // function handleButtonClick(buttonType) {
    //     clickCounts[buttonType]++;

    //     // 先檢查特殊組合
    //     if (checkSpecialCombinations()) {
    //         return;
    //     }

    //     // 如果沒有觸發特殊組合，檢查單個按鈕的最大點擊次數
    //     if (clickCounts[buttonType] >= REWARDS_CONFIG[buttonType].maxClicks) {
    //         clickCounts[buttonType] = 0;
    //         REWARDS_CONFIG[buttonType].reward();
    //     }
    // }

    console.log(snakeBtnGroup);
});