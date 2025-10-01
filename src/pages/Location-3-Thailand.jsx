import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Card from '../component/CardSelect';
import '../sass/scss/location-3-Thailand.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


// 卡片陣列
const cardsData = [
  {
    id: 1,
    country: "清邁",
    img: "./img-Location/ChiangMai.jpg",
    wifi: "345Mbps",
    stars: [1, 1, 1, 1, 1],
    price: "7500 /月",
    text: "北部文化古都，寺廟林立，充滿蘭納王朝氛圍。著名的水燈節（Yi Peng）與週末夜市吸引世界遊客。周邊有大象營、山地部落與自然健行。",
    category: "北部",
  },
  {
    id: 2,
    country: "大城",
    img: "./img-Location/NakhonPathom.jpg",
    wifi: "232Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "8000 /月",
    text: "昔日王朝首都，保存大量古寺與斷垣殘壁，被列為世界文化遺產。遊客常租單車或船遊古城。距離曼谷僅 1 小時車程，適合一日遊。",
    category: "中部",
  },
  {
    id: 3,
    country: "佛統",
    img: "./img-Location/Ayutthaya.jpg",
    wifi: "267Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "12000 /月",
    text: "世界最高佛塔「帕通佛塔」所在地，是泰國佛教的重要中心。城鎮氛圍樸實，市場與當地美食豐富。",
    category: "中部",
  },
  {
    id: 4,
    country: "芭達雅",
    img: "./img-Location/Pattaya.jpg",
    wifi: "377Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "9000 /月",
    text: "國際知名的海灘城市，白天有海上活動，夜晚以繁華夜生活聞名。也有適合家庭的主題公園與水上樂園。",
    category: "中部",
  },
  {
    id: 5,
    country: "曼谷",
    img: "./img-Location/bangkok.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "10000 /月",
    text: "泰國首都與最大城市，擁有皇宮、鄭王廟、四面佛等地標。白天可逛恰圖恰週末市集、暹羅商圈，夜晚有考山路與夜市文化。是交通、經濟、文化的核心。",
    category: "中部",
  },
  {
    id: 6,
    country: "清萊",
    img: "./img-Location/ChiangRai.jpg",
    wifi: "272Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "9000 /月",
    text: "靠近寮國、緬甸邊境，以藝術性地標「白廟」與「黑屋」著稱。金三角地區是昔日鴉片貿易的歷史見證。",
    category: "北部",
  },
  {
    id: 7,
    country: "彭世洛",
    img: "./img-Location/Phitsanulok.jpg",
    wifi: "211Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "10000 /月",
    text: "北部交通樞紐，連接素可泰與清邁。擁有泰國最美佛像之一「帕佛斯銅佛像」。",
    category: "北部",
  },
  {
    id: 8,
    country: "素可泰",
    img: "./img-Location/Sukhothai.jpg",
    wifi: "267Mbps",
    stars: [1, 1, 2, 2, 2],
    price: "13000 / 月",
    text: "泰國第一個王朝的古都，素可泰歷史公園保存完整的佛塔與佛像。被認為是「泰文字」發源地。",
    category: "北部",
  },
  {
    id: 9,
    country: "拜縣",
    img: "./img-Location/Pai.jpg",
    wifi: "252Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "10000 /月",
    text: "山谷小鎮，氛圍悠閒，是背包客的天堂。溫泉、峽谷與山景環繞，咖啡廳與小酒吧林立。",
    category: "北部",
  },
  {
    id: 10,
    country: "呵叻",
    img: "./img-Location/NakhonRatchasima.jpg",
    wifi: "278Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "14000 / 月",
    text: "東北大門，交通樞紐。附近有考艾國家公園，適合自然健行與葡萄園之旅。",
    category: "東北部",
  },
  {
    id: 11,
    country: "孔敬",
    img: "./img-Location/Khon-Kaen-11.jpg",
    wifi: "311Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "10000 /月",
    text: "東北的經濟與教育中心，有大型購物中心與大學城。市區有九層佛塔與湖泊。",
    category: "東北部",
  },
  {
    id: 12,
    country: "烏汶",
    img: "./img-Location/Ubon-Ratchathani-12.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 2, 2, 2],
    price: "10000 / 月",
    text: "湄公河沿岸城市，以「燭節」遊行聞名。靠近寮國邊境，有壯麗的懸崖與瀑布。",
    category: "東北部",
  },
  {
    id: 13,
    country: "烏隆",
    img: "./img-Location/Udon-Thani-13.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 2, 2, 2],
    price: "10000 /月",
    text: "以「紅蓮花湖」著名，冬季時數千朵紅蓮花盛開。也是連結寮國的邊境城市。",
    category: "東北部",
  },
  {
    id: 14,
    country: "武里南",
    img: "./img-Location/Buriram-14.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "13000 / 月",
    text: "泰國足球聖地，擁有武里南聯足球隊與大型球場。附近的「帕儂藍高棉廟」是壯觀的古蹟。",
    category: "東北部",
  },
  {
    id: 15,
    country: "普吉",
    img: "./img-Location/Phuket-15.jpg",
    wifi: "252Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "12000 /月",
    text: "泰國最大的島嶼，也是國際觀光熱點。巴東海灘夜生活熱鬧，還有普吉老城的中葡建築。是潛水、浮潛與跳島旅行的出發地。",
    category: "南部",
  },
  {
    id: 16,
    country: "甲米",
    img: "./img-Location/Krabi-16.jpg",
    wifi: "352Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "12000 / 月",
    text: "以石灰岩峭壁與海上小島聞名。萊利海灘是攀岩聖地，皮皮島是世界級海島度假區。",
    category: "南部",
  },
  {
    id: 17,
    country: "蘇梅島",
    img: "./img-Location/Koh-Samui-17.jpg",
    wifi: "352Mbps",
    stars: [1, 2, 2, 2, 2],
    price: "15000 /月",
    text: "高端度假島嶼，椰林海灘、五星度假村與SPA集中地。夜晚的查汶海灘熱鬧非凡。",
    category: "南部",
  },
  {
    id: 18,
    country: "宋卡",
    img: "./img-Location/Songkhla-18.jpg",
    wifi: "222Mbps",
    stars: [1, 1, 2, 2, 2],
    price: "15000 /月",
    text: "南部海港城市，擁有湖海交錯的地理特色。沙美拉海灘上有著名的「美人魚雕像」。",
    category: "南部",
  },
  {
    id: 19,
    country: "合艾 ",
    img: "./img-Location/Hat-Yai-19.jpg",
    wifi: "211Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "16000 /月",
    text: "南部最大城市，與馬來西亞接壤。是購物、美食與夜生活中心，深受馬來西亞遊客喜愛。",
    category: "南部",
  },
  {
    id: 20,
    country: "攀牙 ",
    img: "./img-Location/Phang-Nga-20.jpg",
    wifi: "211Mbps",
    stars: [1, 1, 2, 2, 2],
    price: "15000 / 月",
    text: "以「攀牙灣」小島群著名，石灰岩峭壁矗立於碧綠海面。詹姆士龜島因 007 電影而成名。",
    category: "南部",
  }
];


const Location3 = () => {
  // 1. 新增狀態來追蹤選定的區域 (預設為 '全部' 或 null)
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 顯示更多卡的計數 (只在篩選後的結果上應用)
  const [visibleCount, setVisibleCount] = useState(12);

  // 處理點擊區域篩選的函數
  const handleCategoryClick = (category) => {
    // 設置新的選定區域，同時將顯示計數重置為初始值
    setSelectedCategory(category);
    setVisibleCount(12); // 重置為預設的顯示數量
  };

  const handleShowMore = () => setVisibleCount(prev => prev + 8);

  // 2. 根據 selectedCategory 篩選卡片數據
  const filteredCards = selectedCategory
    ? cardsData.filter(card => card.category === selectedCategory)
    : cardsData; // 如果沒有選擇區域 (null)，則顯示全部


  return (
    <main>
      {/* ✅ 標題在 Swiper 外面，避免 Swiper 把後面內容蓋掉 */}
      {/* <h1 className='titleAsia'>亞洲</h1> */}

      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img src="./img-Location/Thai-1.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="./img-Location/Thai-2.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="./img-Location/Thai-3.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="./img-Location/Thai-4.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="./img-Location/bangkok-3.jpg" alt="" /></SwiperSlide>
      </Swiper>

      <h2 className='title'>泰國<br /><span className="thai">—— 亞洲 ——</span></h2>

      <div className='locDrop3'>
        {/* 新增一個「全部」按鈕來取消篩選 */}
        <ul
          onClick={() => handleCategoryClick(null)}
          className={selectedCategory === null ? 'active-filter' : ''} // 可選：添加 active 樣式
        >
          <li className='category-item'>全部</li>
        </ul>

        {/* 遍歷所有可能的區域，確保每個區域都有按鈕 */}
        {['北部', '中部', '東北部', '南部'].map((category) => (
          <ul
            key={category}
            onClick={() => handleCategoryClick(category)}
            // 加上 active-filter class 讓使用者知道當前選了哪個區域
            className={selectedCategory === category ? 'active-filter' : ''}
          >
            <li className='category-item'>{category}</li>
          </ul>
        ))}
      </div>

      <article id="mCards">
        {/* 4. 渲染篩選後的卡片數據 (filteredCards) */}
        {filteredCards.slice(0, visibleCount).map((card) => (
          <Card key={card.id} cardData={card} />
        ))}

        {/* 如果篩選後結果為空，顯示提示 */}
        {filteredCards.length === 0 && (
          <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
            找不到符合條件的旅遊地點。
          </p>
        )}
      </article>

      {/* ✅「探索更多」邏輯不變 */}
      {/* 5. 「探索更多」按鈕現在基於篩選後的數據總數來判斷是否顯示 */}
      {visibleCount < filteredCards.length && (
        <div className="expMore">
          <button className="btn-expMore" onClick={handleShowMore}>
            探索更多
          </button>
        </div>
      )}
    </main>
  );
};

export default Location3;