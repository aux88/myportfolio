//現在地を示す数字の枠
const current = document.querySelector('.num-of-photo .num');
const total = document.querySelector('.num-of-photo .total-num');

//モーダル外枠取得
const modal = document.querySelector('.slides-overlay');
//閉じるボタン取得
const closeBtn = document.getElementById('modal-close')
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

//microCMSからデータ取得
const { createClient } = microcms;

const client = createClient({
   serviceDomain: 'h9ph84pvw0',
   apiKey: 'zNGZVzRQuDi9pRprX8NYm1GbPX8FwHUqz3Kv',
})

// サムネイルにする画像を取得
thumbnails.forEach(thumbnail => {
   const query = thumbnail.dataset.gallery;
   client.get({
      endpoint: 'gallery',
      queries: { filters: `galleryId[equals]${query}` }
   }).then((res) => {
      thumbnail.src = res.contents[0].image.url;
   });
});

// サムネイルクリックイベント
// ギャラリーIDが一致した画像を表示
thumbnails.forEach(thumbnail => {
   thumbnail.addEventListener('click', () => {
      const query = thumbnail.dataset.gallery;
      client.get({
         endpoint: 'gallery',
         queries: { filters: `galleryId[equals]${query}` }
      }).then((res) => {
         currentGallery = res.contents;
         console.log(currentGallery);
         currentIndex = 0;
         openModal();
      });
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
   modalImg.src = item.image.url;
   captionText.textContent = item.comment;
   current.textContent = index + 1;

   // ボタン活性制御
   prevBtn.disabled = (index === 0);
   nextBtn.disabled = (index === currentGallery.length - 1);

   //前後ボタンの活性／非活性
   if (currentIndex === currentGallery.length - 1) {
      if (nextBtn.classList.contains('active')) {
         nextBtn.classList.remove('active');
      }
   } else {
      if (nextBtn.classList.contains('active') === false) {
         nextBtn.classList.add('active');
      }
   }
   if (currentIndex === 0) {
      if (prevBtn.classList.contains('active')) {
         prevBtn.classList.remove('active');
      }
   } else {
      if (prevBtn.classList.contains('active') === false) {
         prevBtn.classList.add('active');
      }
   }
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


const NOTE_API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnote.com%2Fyossie215110%2Frss';
const listElement = document.getElementById('note-article-list');

// 記事を取得して表示する関数
function fetchNoteArticles() {
   // 記事リストをクリア
   listElement.innerHTML = '';

   fetch(NOTE_API_URL)
      .then(response => {
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         return response.json();
      })
      .then(data => {
         if (data.status !== 'ok' || !data.items) {
            throw new Error('RSS2JSONで記事の取得に失敗しました。');
         }

         // 取得した記事データ（items）をループ処理
         data.items.forEach(item => {
            // 日付を「YYYY.MM.DD」形式に整形
            // item.pubDate は国際標準の時刻形式 (例: "2024-01-01 00:00:00")
            const dateObj = new Date(item.pubDate);
            const formattedDate = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;

            // 新しいリストアイテムを作成
            const listItem = document.createElement('li');
            listItem.className = 'note-article-item';

            // HTMLコンテンツを作成
            listItem.innerHTML = `
                    <time class="article-date">${formattedDate}</time>
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="article-title">
                        ${item.title}
                    </a>
                `;

            // リストに追加
            listElement.appendChild(listItem);
         });
      })
      .catch(error => {
         console.error('note記事の読み込み中にエラーが発生しました:', error);
         listElement.innerHTML = '<li>記事の読み込みに失敗しました。</li>';
      });
}

// ページロード時に実行
fetchNoteArticles();