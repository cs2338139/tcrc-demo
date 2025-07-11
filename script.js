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
    const snakeCircleContainer = document.getElementById('snake-circle-container');

    const timersContainer = document.getElementById('timers-container');
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
            await new Promise(resolve => {
                btnContainer.style.pointerEvents = 'none';
                resolve();
            });
        }

        async function timersContainerShining() {
            timersContainer.style.opacity = 0;
            await new Promise(resolve => setTimeout(resolve, 500));
            timersContainer.style.opacity = 1;
            await new Promise(resolve => setTimeout(resolve, 500));
            timersContainer.style.opacity = 0;
            await new Promise(resolve => setTimeout(resolve, 500));
            timersContainer.style.opacity = 1;
        }

        async function allContainerOpacity() {
            await new Promise(resolve => {
                btnContainer.style.opacity = 0;
                timersContainer.style.opacity = 0;
                resolve();
            });
        }

        updateTimerState();
        updateTimerImage();

        if (TIMER_STATES.timer4 === 'empty')  return;

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

                await new Promise(resolve => setTimeout(resolve, interval));
                await animate();
            }
        };

        await animate();


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

});