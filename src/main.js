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

const captionText = document.getElementById('image-caption');

// 各ギャラリーの画像を定義（ここは動的でもOK）
const galleries = {
   gallery1: [
      { src: '/src/images/curry/IMG_1366.jpg', caption: '月島 年輪のスープカレー' },
      { src: '/src/images/curry/IMG_2290.jpg', caption: '仙川 KICK BACK CARE 中居屋十兵衛カレー' },
      { src: '/src/images/curry/IMG_2922.jpg', caption: '下北沢 ポニピリカ スープカレー' },
      { src: '/src/images/curry/IMG_3127.jpg', caption: '下北沢 カルパシのカレー' },
      { src: '/src/images/curry/IMG_5213.jpg', caption: '上北沢 ハチドリのスープカレー' },
      { src: '/src/images/curry/IMG_6600.jpg', caption: '下北沢 カレーの惑星' },
      { src: '/src/images/curry/IMG_9861.jpg', caption: '上北沢 ハチドリのスープカレー' },
   ],
   gallery2: [
      { src: '/src/images/coffee/IMG_2680.jpg', caption: 'ラテアートのお魚がかわいい@伊勢' },
      { src: '/src/images/coffee/IMG_3161.jpg', caption: 'エチオピア イルガチェフェ@ラテグラフィック' },
      { src: '/src/images/coffee/IMG_3297.jpg', caption: 'ランチデザートアップルパイにコーヒー＠二子玉川' },
      { src: '/src/images/coffee/IMG_4658.jpg', caption: '数量限定のアイスコーヒー@ラテグラフィック' },
      { src: '/src/images/coffee/rowbeans.jpg', caption: 'エリトリアのお土産の生豆を自分で焙煎しました' },
   ],
   gallery3: [
      { src: '/src/images/homemade/IMG_3765.jpg', caption: '手作りのチキンカレー' },
      { src: '/src/images/homemade/IMG_3759.jpg', caption: '近くのカフェの自社農園で育てたイタリアントマトを買ってきました' },
      { src: '/src/images/homemade/IMG_3760.jpg', caption: '生のイタリアントマトでカレーを作るのは初めてです' },
      { src: '/src/images/homemade/IMG_3761.jpg', caption: 'カレールーは使わずに、スパイスで作ります' },
      { src: '/src/images/homemade/IMG_3762.jpg', caption: '一食分だけチキンを入れて少し煮込みます' },
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
   const item = currentGallery[index];
   modalImg.src = item.src;
   captionText.textContent = item.caption;  // ← 説明文をセット
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

