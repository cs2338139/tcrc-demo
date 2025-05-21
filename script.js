document.addEventListener('DOMContentLoaded', function() {
    const loadingContainer = document.getElementById('loading-container');
    const content = document.getElementById('content');
    const boxContainer = document.getElementById('box-container');
    const animatedBox = document.getElementById('animated-box');
    const redTaco = document.getElementById('red-taco');
    const greenTaco = document.getElementById('green-taco');
    const brownPotion = document.getElementById('brown-potion');
    const rewardContainer = document.getElementById('reward-container');

    // 隱藏所有獎勵圖片
    redTaco.classList.add('hidden');
    greenTaco.classList.add('hidden');
    brownPotion.classList.add('hidden');

    // 定義載入動畫圖片數量
    const totalLoadingImages = 8;

    // 創建並預載所有載入動畫圖片
    const loadingImages = [];
    for (let i = 1; i <= totalLoadingImages; i++) {
        const img = document.createElement('img');
        img.src = `assets/loading/loading${i}.png`;
        img.alt = `Loading ${i}`;
        img.classList.add('loading-image');
        loadingContainer.appendChild(img);
        loadingImages.push(img);
    }

    // 盒子圖片序列
    const boxImages = [
        'assets/box/box1.png',
        'assets/box/box2.png',
        'assets/box/box3.png',
        'assets/box/box4.png',
        'assets/box/box5.png',
        'assets/box/box6.png',
        'assets/box/box7.png',
        'assets/box/box8.png'
    ];

    // 顯示載入動畫
    let currentLoadingIndex = 0;
    let previousLoadingImage = null;

    function showNextLoadingImage() {
        if (currentLoadingIndex < totalLoadingImages) {
            // 顯示當前載入圖片
            const currentImage = loadingImages[currentLoadingIndex];
            currentImage.classList.add('active');

            // 在轉換完成後移除前一個圖片的active類別
            setTimeout(() => {
                if (previousLoadingImage) {
                    previousLoadingImage.classList.remove('active');
                }
                previousLoadingImage = currentImage;
            }, 300);

            currentLoadingIndex++;
            setTimeout(showNextLoadingImage, 500);
        } else {
            // 載入動畫完成
            setTimeout(() => {
                loadingContainer.style.display = 'none';
                content.style.display = 'block';

                // 開始盒子輪播動畫
                startBoxAnimation();
            }, 200);
        }
    }

    // 盒子自動輪播動畫
    let currentBoxIndex = 0;
    let boxAnimationInterval;

    function startBoxAnimation() {
        boxAnimationInterval = setInterval(() => {
            currentBoxIndex = (currentBoxIndex + 1) % boxImages.length;
            animatedBox.src = boxImages[currentBoxIndex];
        }, 200);
    }

    // 盒子點擊事件
    boxContainer.addEventListener('click', function() {
        // 停止盒子輪播動畫
        clearInterval(boxAnimationInterval);


        // 隱藏盒子
        boxContainer.classList.add('hidden');


        // 根據機率顯示獎勵
        showRandomReward();
    });

    // 根據機率顯示獎勵
    function showRandomReward() {
        // 生成一個0到100的隨機數
        const randomChance = Math.random() * 100;

        // 清除任何存在的雙獎勵元素
        const existingDualReward = document.querySelector('.dual-reward');
        if (existingDualReward) {
            existingDualReward.remove();
        }

        // 重設所有獎勵為隱藏狀態
        redTaco.classList.add('hidden');
        redTaco.classList.remove('visible');
        greenTaco.classList.add('hidden');
        greenTaco.classList.remove('visible');
        brownPotion.classList.add('hidden');
        brownPotion.classList.remove('visible');

        // 移除它們可能存在的任何父元素關係
        if (redTaco.parentElement !== rewardContainer) {
            rewardContainer.appendChild(redTaco);
        }
        if (greenTaco.parentElement !== rewardContainer) {
            rewardContainer.appendChild(greenTaco);
        }

        // 根據機率決定獎勵
        if (randomChance < 40) {
            // 40%機率 - 紅色塔可
            redTaco.classList.remove('hidden');
            redTaco.classList.add('visible');
        } else if (randomChance < 80) {
            // 40%機率 - 綠色塔可
            greenTaco.classList.remove('hidden');
            greenTaco.classList.add('visible');
        } else if (randomChance < 98) {
            // 18%機率 - 紅色和綠色塔可並排
            const dualRewardDiv = document.createElement('div');
            dualRewardDiv.className = 'dual-reward';

            // 將塔可添加到雙獎勵容器
            dualRewardDiv.appendChild(redTaco);
            dualRewardDiv.appendChild(greenTaco);

            rewardContainer.appendChild(dualRewardDiv);

            // 移除隱藏類別並添加可見類別
            redTaco.classList.remove('hidden');
            redTaco.classList.add('visible');
            greenTaco.classList.remove('hidden');
            greenTaco.classList.add('visible');

            // 顯示雙獎勵容器
            setTimeout(() => {
                dualRewardDiv.style.opacity = 1;
            }, 10);
        } else {
            // 2%機率 - 棕色藥水
            brownPotion.classList.remove('hidden');
            brownPotion.classList.add('visible');
        }

        // 5秒後重置遊戲
        // setTimeout(resetGame, 5000);
    }

    // 重置遊戲狀態
    function resetGame() {
        // 隱藏所有獎勵
        redTaco.classList.add('hidden');
        redTaco.classList.remove('visible');
        greenTaco.classList.add('hidden');
        greenTaco.classList.remove('visible');
        brownPotion.classList.add('hidden');
        brownPotion.classList.remove('visible');

        // 清除任何存在的雙獎勵元素
        const existingDualReward = document.querySelector('.dual-reward');
        if (existingDualReward) {
            existingDualReward.style.opacity = 0;

            // 在淡出動畫完成後移除雙獎勵元素
            setTimeout(() => {
                existingDualReward.remove();

                // 將塔可放回原來的父元素
                if (redTaco.parentElement !== rewardContainer) {
                    rewardContainer.appendChild(redTaco);
                }
                if (greenTaco.parentElement !== rewardContainer) {
                    rewardContainer.appendChild(greenTaco);
                }
            }, 300);
        }

        // 顯示盒子並重新開始輪播
        animatedBox.classList.remove('hidden');
        startBoxAnimation();
    }

    // 開始載入動畫
    setTimeout(showNextLoadingImage, 500);
});