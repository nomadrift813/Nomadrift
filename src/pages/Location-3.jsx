import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Card from '../component/CardSelect';
import '../sass/scss/location-3.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


// 卡片陣列
const cardsData = [
  {
    id: 1,
    country: "菲律賓",
    img: "./img-Location/Manila.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。",
  },
  {
    id: 2,
    country: "尼泊爾",
    img: "./img-Location/Nepal.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "15000 /月",
    text: "位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。",
  },
  {
    id: 3,
    country: "以色列",
    img: "./img-Location/Israel.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。",
  },
  {
    id: 4,
    country: "菲律賓",
    img: "./img-Location/Manila.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。",
  },
  {
    id: 5,
    country: "尼泊爾",
    img: "./img-Location/Nepal.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "15000 /月",
    text: "位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。",
  },
  {
    id: 6,
    country: "以色列",
    img: "./img-Location/Israel.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。",
  },
  {
    id: 7,
    country: "菲律賓",
    img: "./img-Location/Manila.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。",
  },
  {
    id: 8,
    country: "尼泊爾",
    img: "./img-Location/Nepal.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "15000 /月",
    text: "位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。",
  },
  {
    id: 9,
    country: "以色列",
    img: "./img-Location/Israel.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。",
  },
  {
    id: 10,
    country: "菲律賓",
    img: "./img-Location/Manila.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。",
  },
  {
    id: 11,
    country: "尼泊爾",
    img: "./img-Location/Nepal.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "15000 /月",
    text: "位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。",
  },
  {
    id: 12,
    country: "以色列",
    img: "./img-Location/Israel.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。",
  },
  {
    id: 13,
    country: "菲律賓",
    img: "./img-Location/Manila.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。",
  },
  {
    id: 14,
    country: "尼泊爾",
    img: "./img-Location/Nepal.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "15000 /月",
    text: "位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。",
  },
  {
    id: 15,
    country: "以色列",
    img: "./img-Location/Israel.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。",
  },
  {
    id: 16,
    country: "菲律賓",
    img: "./img-Location/Manila.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。",
  },
  {
    id: 17,
    country: "尼泊爾",
    img: "./img-Location/Nepal.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "15000 /月",
    text: "位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。",
  },
  {
    id: 18,
    country: "以色列",
    img: "./img-Location/Israel.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。",
  },
  {
    id: 19,
    country: "菲律賓",
    img: "./img-Location/Manila.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。",
  },
  {
    id: 20,
    country: "尼泊爾",
    img: "./img-Location/Nepal.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "15000 /月",
    text: "位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。",
  },
  {
    id: 21,
    country: "以色列",
    img: "./img-Location/Israel.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。",
  },
  {
    id: 22,
    country: "菲律賓",
    img: "./img-Location/Manila.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。",
  },
  {
    id: 23,
    country: "尼泊爾",
    img: "./img-Location/Nepal.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "15000 /月",
    text: "位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。",
  },
  {
    id: 24,
    country: "以色列",
    img: "./img-Location/Israel.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。",
  },
  {
    id: 25,
    country: "菲律賓",
    img: "./img-Location/Manila.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。",
  },
  {
    id: 26,
    country: "尼泊爾",
    img: "./img-Location/Nepal.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 1, 2],
    price: "15000 /月",
    text: "位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。",
  },
  {
    id: 27,
    country: "以色列",
    img: "./img-Location/Israel.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。",
  },
  {
    id: 28,
    country: "菲律賓",
    img: "./img-Location/Manila.jpg",
    wifi: "242Mbps",
    stars: [1, 1, 1, 2, 2],
    price: "15000 /月",
    text: "是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。",
  },
];


const Location3 = () => {
  const [visibleCount, setVisibleCount] = useState(12);
  const handleShowMore = () => setVisibleCount(prev => prev + 8);

  return (
    <main>
      {/* ✅ 標題在 Swiper 外面，避免 Swiper 把後面內容蓋掉 */}
      <h1 className='titleAsia'>亞洲</h1>

      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img src="./img-Location/bannerAsia.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="./img-Location/bJapan.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="./img-Location/bTurkey.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="./img-Location/bUAE.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="./img-Location/bUzbekistan.jpg" alt="" /></SwiperSlide>
      </Swiper>

      <h2 className='title'>亞洲</h2>

      <div className='locDrop3'>
        <ul><Link to="/location3"><li>亞洲</li></Link></ul>
        <ul><Link to="/location3"><li>歐洲</li></Link></ul>
        <ul><Link to="/location3"><li>北美洲</li></Link></ul>
        <ul><Link to="/location3"><li>中南美洲</li></Link></ul>
        <ul><Link to="/location3"><li>非洲</li></Link></ul>
        <ul><Link to="/location3"><li>大洋洲</li></Link></ul>
      </div>

      <article id="mCards">
        {cardsData.slice(0, visibleCount).map((card) => (
          <Card key={card.id} cardData={card} />
        ))}
      </article>

      {/* ✅「探索更多」邏輯不變 */}
      {visibleCount < cardsData.length && (
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