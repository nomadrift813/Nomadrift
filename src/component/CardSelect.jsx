import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../sass/scss/CardSelect.scss'

const Card = ({ cardData }) => {
  // 建立一個狀態來追蹤 SVG 是否被點選
  const [isFilled, setIsFilled] = useState(false);

  // 點選 SVG 時觸發的函式
  const handleSelectClick = (e) => {
    // 阻止點選事件影響到 <Link> 的跳轉
    e.preventDefault();
    // 切換 isFilled 的狀態
    setIsFilled(!isFilled);
  };

  return (
    <Link to="/location2" onClick={(e) => e.stopPropagation()} key={cardData.id}>
      <section className="country">
        <div className="p1-sel">
          <figure className="loc-p1">
            <img src={cardData.img} alt={cardData.country} />
          </figure>
          {/* 將點擊處理函式綁定到 figure 上 */}
          <figure className="select" onClick={handleSelectClick}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="30" fill="white" />
              <path
                d="M18 21.667C18 18.5372 20.5746 16 23.7506 16H36.2494C39.4254 16 42 18.5372 42 21.667V39.215C42 42.368 38.312 44.1337 35.7968 42.185L31.1847 38.6117C30.4895 38.073 29.5105 38.073 28.8153 38.6117L24.2032 42.185C21.688 44.1337 18 42.368 18 39.215V21.667Z"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                // 根據 isFilled 狀態動態改變 fill 屬性
                fill={isFilled ? "#1F1F1F" : "none"}
              />
            </svg>
          </figure>
        </div>
        <article className="loc-info">
          <h2>{cardData.country}</h2>
          <p className="loc-text">{cardData.text}</p>
          <div className="wi-st">
            <ul>
              <img src="./img-Location/Wifi.svg" alt="" />
              <p>{cardData.wifi}</p>
            </ul>
            <figure className="stars">
              {cardData.stars.map((s, idx) => (
                <img
                  key={idx}
                  src={`./img-Location/Star${s}.svg`}
                  alt={`star${s}`}
                />
              ))}
            </figure>
          </div>
          <span>{cardData.price}</span>
        </article>
        <div className="color-block"></div>
      </section>
    </Link>
  );
};

export default Card;