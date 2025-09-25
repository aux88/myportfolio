//現在地を示す数字の枠
const current = document.querySelector('.num-of-thumbnails .num');
const total = document.querySelector('.num-of-thumbnails .total-num');

//モーダル外枠取得
const modal = document.querySelector('.slides-overlay');
//閉じるボタン取得
const closeBtn = document.getElementById('close-02')
//前へボタン取得
const prevBtn = document.getElementById('prev');
//次へボタン取得
const nextBtn = document.getElementById('next');

//サムネイルを取得
const thumbnails = document.querySelectorAll('.thumbnail');
const modalImg = document.getElementById('modal-image');

// 各ギャラリーの画像を定義（ここは動的でもOK）
const galleries = {
   gallery1: [
      '/src/images/curry/IMG_1366.jpg',
      '/src/images/curry/IMG_2290.jpg',
      '/src/images/curry/IMG_2922.jpg',
      '/src/images/curry/IMG_3127.jpg',
      '/src/images/curry/IMG_5213.jpg',
      '/src/images/curry/IMG_6600.jpg',
      '/src/images/curry/IMG_9861.jpg',
   ],
   gallery2: [
      '/src/images/coffee/IMG_2680.jpg',
      '/src/images/coffee/IMG_3161.jpg',
      '/src/images/coffee/IMG_3297.jpg',
      '/src/images/coffee/IMG_4658.jpg',
      '/src/images/coffee/rowbeans.jpg',
   ],
   gallery3: [
      '/src/images/homemade/IMG_3765.jpg',
      '/src/images/homemade/IMG_3759.jpg',
      '/src/images/homemade/IMG_3760.jpg',
      '/src/images/homemade/IMG_3761.jpg',
      '/src/images/homemade/IMG_3762.jpg',
   ]
};

let currentGallery = [];
let currentIndex = 0;

// サムネイルクリックイベント（ギャラリー切り替え）
thumbnails.forEach(thumbnail => {
   thumbnail.addEventListener('click', () => {
      console.log('click event');
      const galleryKey = thumbnail.dataset.gallery;
      currentGallery = galleries[galleryKey];
      currentIndex = 0;
      openModal();
   });
});

// モーダル表示関数
function openModal() {
   if (!currentGallery || currentGallery.length === 0) return;
   modal.classList.add('active');
   document.body.classList.add('modal-opened');
   total.textContent = currentGallery.length;

   showImage(currentIndex);
}

// モーダルを閉じる
closeBtn.addEventListener('click', () => {
   modal.classList.remove('active');
   document.body.classList.remove('modal-opened');
   modalImg.src = '';
});

// 画像表示
function showImage(index) {
   modalImg.src = currentGallery[index];
   current.textContent = index + 1;

   // ボタン活性制御
   prevBtn.disabled = (index === 0);
   nextBtn.disabled = (index === currentGallery.length - 1);
}

// 前へ
prevBtn.addEventListener('click', () => {
   if (currentIndex > 0) {
      currentIndex--;
      showImage(currentIndex);
   }
});

// 次へ
nextBtn.addEventListener('click', () => {
   if (currentIndex < currentGallery.length - 1) {
      currentIndex++;
      showImage(currentIndex);
   }
});

