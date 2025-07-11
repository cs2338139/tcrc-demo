document.addEventListener('DOMContentLoaded', function() {
    const loadingContainer = document.getElementById('loading-container');
    const content = document.getElementById('content');
    const btnContainer = document.getElementById('btn-container');
    const pepper = document.getElementById('pepper');
    const cum = document.getElementById('cum');
    const brownPotion = document.getElementById('brown-potion');
    const snakeBtnGroup = document.getElementById('snake-btn-group');
    const qBtnGroup = document.getElementById('q-btn-group');
    const sunBtnGroup = document.getElementById('sun-btn-group');

    // 隱藏所有獎勵圖片
    pepper.classList.add('hidden');
    cum.classList.add('hidden');
    brownPotion.classList.add('hidden');

    // 載入動畫
    // (function(){
    //     const totalLoadingImages = 8;
    //     const loadingImages = [];
    //     for (let i = 1; i <= totalLoadingImages; i++) {
    //         const img = document.createElement('img');
    //         img.src = `assets/loading/loading${i}.png`;
    //         img.alt = `Loading ${i}`;
    //         img.classList.add('loading-image');
    //         loadingContainer.appendChild(img);
    //         loadingImages.push(img);
    //     }

    //     let currentLoadingIndex = 0;
    //     let previousLoadingImage = null;

    //     function showNextLoadingImage() {
    //         if (currentLoadingIndex < totalLoadingImages) {
    //             const currentImage = loadingImages[currentLoadingIndex];
    //             currentImage.classList.add('active');

    //             setTimeout(() => {
    //                 if (previousLoadingImage) {
    //                     previousLoadingImage.classList.remove('active');
    //                 }
    //                 previousLoadingImage = currentImage;
    //             }, 100);

    //             currentLoadingIndex++;
    //             setTimeout(showNextLoadingImage, 200);
    //         } else {
    //             setTimeout(() => {
    //                 loadingContainer.style.display = 'none';
    //                 content.style.display = 'block';

    //                 startBoxAnimation();
    //             }, 200);
    //         }
    //     }

    //     setTimeout(showNextLoadingImage, 500);
    // })();


    // 定義獎勵顯示配置
    const REWARDS_CONFIG = {
        snake: {
            maxClicks: 4,
            reward: () => showReward(['cum'])
        },
        q: {
            maxClicks: 4,
            reward: () => {
                const random = Math.random();
                if (random < 0.45) {
                    showReward(['pepper']);
                } else if (random < 0.9) {
                    showReward(['cum']);
                } else if (random < 0.97) {
                    showReward(['pepper', 'cum'], { position: 'relative' });
                } else {
                    showReward(
                        ['pepper', 'cum', 'brown-potion'],
                        {
                            pepper: { position: 'relative', transform: 'translateY(50px)' },
                            cum: { position: 'relative', transform: 'translateY(50px)' },
                            'brown-potion': { position: 'relative', transform: 'translateY(-50px)' }
                        }
                    );
                }
            }
        },
        sun: {
            maxClicks: 4,
            reward: () => showReward(['pepper'])
        }
    };

    // 點擊計數器
    const clickCounts = {
        snake: 0,
        q: 0,
        sun: 0
    };

    // 檢查特殊組合
    function checkSpecialCombinations() {
        // 規則1: 太陽、蛇、問號各按2次 = 紅+綠
        if (clickCounts.sun === 2 && clickCounts.snake === 2 ) {
            showReward(['pepper', 'cum'], { position: 'relative' });
            // 重置計數器
            resetClickCounts();
            return true;
        }

        // 規則2: 問號、太陽、蛇各按4次 = 紅+綠+shot
        if (clickCounts.sun === 3 && clickCounts.snake === 3 && clickCounts.q === 3) {
            showReward(
                ['pepper', 'cum', 'brown-potion'],
                {
                    pepper: { position: 'relative', transform: 'translateY(50px)' },
                    cum: { position: 'relative', transform: 'translateY(50px)' },
                    'brown-potion': { position: 'relative', transform: 'translateY(-50px)' }
                }
            );
            // 重置計數器
            resetClickCounts();
            return true;
        }

        return false;
    }

    // 重置所有計數器
    function resetClickCounts() {
        Object.keys(clickCounts).forEach(key => {
            clickCounts[key] = 0;
        });
    }

    // 通用顯示獎勵函數
    function showReward(items, styles = {}) {
        items.forEach(item => {
            const element = document.getElementById(item);
            element.classList.remove('hidden');

            // 如果有特定樣式，則應用樣式
            if (styles[item]) {
                Object.assign(element.style, styles[item]);
            } else if (typeof styles === 'object' && !Array.isArray(styles)) {
                Object.assign(element.style, styles);
            }
        });
        btnContainer.classList.add('hidden');
    }

    // 通用按鈕點擊處理函數
    function handleButtonClick(buttonType) {
        // console.log(buttonType);

        clickCounts[buttonType]++;
        // console.log(clickCounts);

        // 先檢查特殊組合
        if (checkSpecialCombinations()) {
            return;
        }

        // 如果沒有觸發特殊組合，檢查單個按鈕的最大點擊次數
        if (clickCounts[buttonType] >= REWARDS_CONFIG[buttonType].maxClicks) {
            clickCounts[buttonType] = 0;
            REWARDS_CONFIG[buttonType].reward();
        }
    }

    // 按鈕動畫狀態
    const buttonStates = {
        snake: { isAnimating: false },
        q: { isAnimating: false },
        sun: { isAnimating: false }
    };

    // 播放按鈕動畫
    function playButtonAnimation(buttonType, buttonGroup) {
        console.log(buttonType, buttonGroup);
        if (buttonStates[buttonType].isAnimating) return;
        const imageList = Array.from(buttonGroup.children);

        buttonStates[buttonType].isAnimating = true;
        buttonGroup.style.pointerEvents = 'none'; // 鎖定按鈕

        const framesPerSecond = 16;
        const interval = 500 / framesPerSecond;
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
                buttonStates[buttonType].isAnimating = false;
                buttonGroup.style.pointerEvents = 'auto'; // 解鎖按鈕

                // 處理按鈕點擊邏輯
                handleButtonClick(buttonType);
            }
        };

        animate();
    }

    // 修改按鈕點擊事件綁定
    snakeBtnGroup.addEventListener('click', () => playButtonAnimation('snake', snakeBtnGroup));
    qBtnGroup.addEventListener('click', () => playButtonAnimation('q', qBtnGroup));
    sunBtnGroup.addEventListener('click', () => playButtonAnimation('sun', sunBtnGroup));

    console.log(snakeBtnGroup);
});