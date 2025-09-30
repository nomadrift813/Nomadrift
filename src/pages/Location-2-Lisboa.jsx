// src/pages/Location2.jsx
import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom';
import '../sass/scss/location-2.scss';

const Location2 = () => {
  // ===== 共用收藏按鈕（和 Location.jsx 一樣做法） =====
  const FavBtn = ({ active, onClick, payload }) => (
    <figure
      className="select js-fav"
      onClick={onClick}
      title="收藏 / 取消收藏"
      aria-label="收藏"
      // ✅ 一次帶整張卡片資訊
      data-fav={JSON.stringify({
        type: 'city',
        id: payload?.id,
        item: {
          id: payload?.id,
          country: payload?.country,
          img: payload?.img,
          text: payload?.text,
          wifi: payload?.wifi,
          stars: payload?.stars,
          price: payload?.price,
        },
      })}
      style={{ cursor: "pointer" }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="30" fill="white" />
        <path
          d="M18 21.667C18 18.5372 20.5746 16 23.7506 16H36.2494C39.4254 16 42 18.5372 42 21.667V39.215C42 42.368 38.312 44.1337 35.7968 42.185L31.1847 38.6117C30.4895 38.073 29.5105 38.073 28.8153 38.6117L24.2032 42.185C21.688 44.1337 18 42.368 18 39.215V21.667Z"
          stroke="#1F1F1F"
          strokeWidth="1.5"
          fill={active ? "#201811" : "none"}
          data-bm
        />
      </svg>
    </figure>
  );

  // ===== 卡片左右滑動 =====
  const cardsRef = useRef(null);
  const scrollLeft = () => { if (cardsRef.current) cardsRef.current.scrollLeft -= 300; };
  const scrollRight = () => { if (cardsRef.current) cardsRef.current.scrollLeft += 300; };

  // ===== 主區塊收藏 =====
  const [active, setActive] = useState(false);

  // ===== 圖片來源陣列（城市相簿） =====
  const images = [
    "./img-Location/lisboa-1.jpg",
    "./img-Location/lisboa-2.jpg",
    "./img-Location/lisboa-5.jpg",
    "./img-Location/lisboa-4.jpg",
  ];
  const [mainImage, setMainImage] = useState(images[0]);
  const [thumbnailImages, setThumbnailImages] = useState(images.slice(1));
  const handleThumbnailClick = (clickedImage) => {
    const newThumbnails = thumbnailImages.map(img => img === clickedImage ? mainImage : img);
    setThumbnailImages(newThumbnails);
    setMainImage(clickedImage);
  };

  // ===== 卡片收藏共用狀態（示範用）=====
  const [active2, setActive2] = useState(false);
  const handleToggle = () => setActive2(!active2);

  // 共用欄位
  const WIFI = '242Mbps';

  return (
    <main>
      {/* 標題-探索地點 */}
      <section id='disDes'>
        <header>
          <p className='l-t-1'>Discover<span> De</span>stination</p>
          <p className='l-t-2'>探索地點</p>
        </header>
        <p className='theCity'>歐洲-葡萄牙-里斯本</p>
      </section>

      {/* 內容-探索地點 */}
      <section id='allInfo'>
        {/* 地點照片 */}
        <figure className='allPic'>
          <img className='picXl' src={mainImage} alt="" />
          <div className='detPic'>
            {thumbnailImages.map((image, index) => (
              <img key={index} src={image} alt={`Thumbnail ${index + 2}`} onClick={() => handleThumbnailClick(image)} />
            ))}
          </div>
        </figure>

        <div className='allContent'>
          {/* 地點內容 */}
          <div className='locContent'>
            <div className='locTitle'>
              <h2>里斯本</h2>
              {/* ✅ 和 Location.jsx 一樣的收藏按鈕，帶完整 payload */}
              <FavBtn
                active={active}
                onClick={() => setActive(!active)}
                payload={{
                  id: 'lisboa',
                  country: '里斯本',
                  img: images[0],
                  text:
                    '里斯本（Lisbon）作為歐洲的數位遊牧熱點，完美結合了古典的魅力與現代的自由工作文化。這座城市的生活步調相較於歐洲其他主要首都，顯得更為悠閒、從容，城市規模適中，且擁有完善的公共交通網絡。穿梭於阿爾法瑪（Alfama）古老的石板小巷，耳邊迴盪著憂傷的法朵（Fado）歌聲，滿是傳統的瓷磚建築與隱藏版的家庭餐廳，而阿爾坎塔拉（Alcântara）或卡伊斯杜索德雷（Cais do Sodré），則盡是充滿設計感的Co-working Space與新創科技公司的餐飲熱點。這種新舊交織的獨特氛圍，深深吸引著追求工作與生活平衡的數位遊牧者。擁有歐洲最宜人的氣候，從春季到秋季（3月到10月），陽光充足且氣溫舒適，非常適合長時間保持高效率的工作狀態。',
                  wifi: WIFI,
                  stars: [1, 1, 1, 1, 2],
                  price: 'NT $15000 /月',
                }}
              />
            </div>

            <div className='wifiStr'>
              <ul><img src="./img-Location/Wifi.svg" alt="" /><p>{WIFI}</p></ul>
              <figure className='stars'>
                <img src="./img-Location/Star1.svg" alt="" />
                <img src="./img-Location/Star1.svg" alt="" />
                <img src="./img-Location/Star1.svg" alt="" />
                <img src="./img-Location/Star1.svg" alt="" />
                <img src="./img-Location/Star2.svg" alt="" />
              </figure>
              <span>NT $15000 /月</span>
            </div>

            <p>
              里斯本（Lisbon）作為歐洲的數位遊牧熱點，完美結合了古典的魅力與現代的自由工作文化。這座城市的生活步調相較於歐洲其他主要首都，顯得更為悠閒、從容，城市規模適中，且擁有完善的公共交通網絡。穿梭於阿爾法瑪（Alfama）古老的石板小巷，耳邊迴盪著憂傷的法朵（Fado）歌聲，滿是傳統的瓷磚建築與隱藏版的家庭餐廳，而阿爾坎塔拉（Alcântara）或卡伊斯杜索德雷（Cais do Sodré），則盡是充滿設計感的Co-working Space與新創科技公司的餐飲熱點。這種新舊交織的獨特氛圍，深深吸引著追求工作與生活平衡的數位遊牧者。擁有歐洲最宜人的氣候，從春季到秋季（3月到10月），陽光充足且氣溫舒適，非常適合長時間保持高效率的工作狀態。
            </p>
          </div>

          {/* 評分 */}
          <div className='locScore'>
            <ul>
              <li><p>整體</p><img src="./img-Location/level-5.svg" alt="" /></li>
              <li><p>安全性</p><img src="./img-Location/level-3.svg" alt="" /></li>
              <li><p>網路順暢</p><img src="./img-Location/level-4.svg" alt="" /></li>
              <li><p>消費水平</p><img src="./img-Location/level-3.svg" alt="" /></li>
              <li><p>氣候舒適</p><img src="./img-Location/level-4.svg" alt="" /></li>
            </ul>
            <ul>
              <li><p>友善度</p><img src="./img-Location/level-4.svg" alt="" /></li>
              <li><p>語言溝通</p><img src="./img-Location/level-3.svg" alt="" /></li>
              <li><p>交通便利</p><img src="./img-Location/level-2.svg" alt="" /></li>
              <li><p>食物品質</p><img src="./img-Location/level-4.svg" alt="" /></li>
              <li><p>醫療品質</p><img src="./img-Location/level-3.svg" alt="" /></li>
            </ul>
          </div>

          <div className='color-block'></div>
        </div>
      </section>

      {/* 探索更多城市 */}
      <section id='moreDes'>
        <header>
          <p className='l-t-1'>Discover M<span>ore</span> Destination</p>
          <p className='l-t-2'>探索更多地點</p>
        </header>

        <div className='moreCards'>
          <button className='left' onClick={scrollLeft}>
            <img src="./img-Location/left.svg" alt="" />
          </button>

          <article className='cards' ref={cardsRef}>
            {/* 1 義大利 */}
            <section className='country'>
              <div className='p1-sel'>
                <Link to="/location2"><figure className='loc-p1'><img src="./img-Location/Italy.jpg" alt="" /></figure></Link>
                <FavBtn
                  active={active2}
                  onClick={handleToggle}
                  payload={{
                    id: 'italy',
                    country: '義大利',
                    img: './img-Location/Italy.jpg',
                    text: '以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。擁有羅馬、威尼斯、佛羅倫斯等歷史名城，文化魅力獨特。',
                    wifi: WIFI,
                    stars: [1, 1, 1, 2, 2],
                    price: '15000 /月',
                  }}
                />
              </div>
              <Link to="/location2">
                <article className='loc-info'>
                  <h2>義大利</h2>
                  <p className='loc-text'>以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。擁有羅馬、威尼斯、佛羅倫斯等歷史名城，文化魅力獨特。</p>
                  <div className='wi-st'>
                    <ul><img src="./img-Location/Wifi.svg" alt="" /><p>{WIFI}</p></ul>
                    <figure className='stars'>
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                    </figure>
                  </div>
                  <span>15000 /月</span>
                </article>
                <div className='color-block'></div>
              </Link>
            </section>

            {/* 2 加拿大 */}
            <section className='country'>
              <div className='p1-sel'>
                <Link to="/location2"><figure className='loc-p1'><img src="./img-Location/Canada.jpg" alt="" /></figure></Link>
                <FavBtn
                  active={active2}
                  onClick={handleToggle}
                  payload={{
                    id: 'canada',
                    country: '加拿大',
                    img: './img-Location/Canada.jpg',
                    text: '氣候宜人、自然風光壯麗，是融合多元文化的城市，擁有海灘、山脈與都市生活的完美平衡。',
                    wifi: WIFI,
                    stars: [1, 1, 1, 1, 2],
                    price: '15000 /月',
                  }}
                />
              </div>
              <Link to="/location2">
                <article className='loc-info'>
                  <h2>加拿大</h2>
                  <p className='loc-text'>氣候宜人、自然風光壯麗，是融合多元文化的城市，擁有海灘、山脈與都市生活的完美平衡。</p>
                  <div className='wi-st'>
                    <ul><img src="./img-Location/Wifi.svg" alt="" /><p>{WIFI}</p></ul>
                    <figure className='stars'>
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                    </figure>
                  </div>
                  <span>15000 /月</span>
                </article>
                <div className='color-block'></div>
              </Link>
            </section>

            {/* 3 尼泊爾 */}
            <section className='country'>
              <div className='p1-sel'>
                <Link to="/location2"><figure className='loc-p1'><img src="./img-Location/Nepal.jpg" alt="" /></figure></Link>
                <FavBtn
                  active={active2}
                  onClick={handleToggle}
                  payload={{
                    id: 'nepal',
                    country: '尼泊爾',
                    img: './img-Location/Nepal.jpg',
                    text: '位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索文化的門戶。',
                    wifi: WIFI,
                    stars: [1, 1, 1, 1, 2],
                    price: '15000 /月',
                  }}
                />
              </div>
              <Link to="/location2">
                <article className='loc-info'>
                  <h2>尼泊爾</h2>
                  <p className='loc-text'>位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。</p>
                  <div className='wi-st'>
                    <ul><img src="./img-Location/Wifi.svg" alt="" /><p>{WIFI}</p></ul>
                    <figure className='stars'>
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                    </figure>
                  </div>
                  <span>15000 /月</span>
                </article>
                <div className='color-block'></div>
              </Link>
            </section>

            {/* 4 西班牙 */}
            <section className='country'>
              <div className='p1-sel'>
                <Link to="/location2"><figure className='loc-p1'><img src="./img-Location/Spain.jpg" alt="" /></figure></Link>
                <FavBtn
                  active={active2}
                  onClick={handleToggle}
                  payload={{
                    id: 'spain',
                    country: '西班牙',
                    img: './img-Location/Spain.jpg',
                    text: '擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名，是充滿熱情與陽光的國度。',
                    wifi: WIFI,
                    stars: [1, 1, 1, 2, 2],
                    price: '15000 /月',
                  }}
                />
              </div>
              <Link to="/location2">
                <article className='loc-info'>
                  <h2>西班牙</h2>
                  <p className='loc-text'>擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名，是充滿熱情與陽光的國度。</p>
                  <div className='wi-st'>
                    <ul><img src="./img-Location/Wifi.svg" alt="" /><p>{WIFI}</p></ul>
                    <figure className='stars'>
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                    </figure>
                  </div>
                  <span>15000 /月</span>
                </article>
                <div className='color-block'></div>
              </Link>
            </section>

            {/* 5 阿根廷 */}
            <section className='country'>
              <div className='p1-sel'>
                <Link to="/location2"><figure className='loc-p1'><img src="./img-Location/Argentina.jpg" alt="" /></figure></Link>
                <FavBtn
                  active={active2}
                  onClick={handleToggle}
                  payload={{
                    id: 'argentina',
                    country: '阿根廷',
                    img: './img-Location/Argentina.jpg',
                    text: '以熱情和對探戈、足球的熱愛而著稱，文化、經濟與政治都極具影響力。',
                    wifi: WIFI,
                    stars: [1, 1, 1, 1, 2],
                    price: '15000 /月',
                  }}
                />
              </div>
              <Link to="/location2">
                <article className='loc-info'>
                  <h2>阿根廷</h2>
                  <p className='loc-text'>以熱情和對探戈、足球的熱愛而著稱，擁有悠久的歐洲移民歷史，並在文化、經濟和政治上是拉丁美洲的重要國家。</p>
                  <div className='wi-st'>
                    <ul><img src="./img-Location/Wifi.svg" alt="" /><p>{WIFI}</p></ul>
                    <figure className='stars'>
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                    </figure>
                  </div>
                  <span>15000 /月</span>
                </article>
                <div className='color-block'></div>
              </Link>
            </section>

            {/* 6 摩洛哥 */}
            <section className='country'>
              <div className='p1-sel'>
                <Link to="/location2"><figure className='loc-p1'><img src="./img-Location/Morocco.jpg" alt="" /></figure></Link>
                <FavBtn
                  active={active2}
                  onClick={handleToggle}
                  payload={{
                    id: 'morocco',
                    country: '摩洛哥',
                    img: './img-Location/Morocco.jpg',
                    text: '地中海、大西洋、撒哈拉與阿特拉斯山脈交織，享有「北非花園」美名。',
                    wifi: WIFI,
                    stars: [1, 1, 1, 1, 2],
                    price: '15000 /月',
                  }}
                />
              </div>
              <Link to="/location2">
                <article className='loc-info'>
                  <h2>摩洛哥</h2>
                  <p className='loc-text'>擁有獨特多樣的地貌，包括地中海沿岸、大西洋、撒哈拉沙漠和綿延的阿特拉斯山脈，使其成為受歡迎的旅遊目的地，特別是以「北非花園」的稱號著稱。</p>
                  <div className='wi-st'>
                    <ul><img src="./img-Location/Wifi.svg" alt="" /><p>{WIFI}</p></ul>
                    <figure className='stars'>
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                    </figure>
                  </div>
                  <span>15000 /月</span>
                </article>
                <div className='color-block'></div>
              </Link>
            </section>

            {/* 7 以色列 */}
            <section className='country'>
              <div className='p1-sel'>
                <Link to="/location2"><figure className='loc-p1'><img src="./img-Location/Israel.jpg" alt="" /></figure></Link>
                <FavBtn
                  active={active2}
                  onClick={handleToggle}
                  payload={{
                    id: 'israel',
                    country: '以色列',
                    img: './img-Location/Israel.jpg',
                    text: '融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。',
                    wifi: WIFI,
                    stars: [1, 2, 2, 2, 2],
                    price: '15000 /月',
                  }}
                />
              </div>
              <Link to="/location2">
                <article className='loc-info'>
                  <h2>以色列</h2>
                  <p className='loc-text'>融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。</p>
                  <div className='wi-st'>
                    <ul><img src="./img-Location/Wifi.svg" alt="" /><p>{WIFI}</p></ul>
                    <figure className='stars'>
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                    </figure>
                  </div>
                  <span>15000 /月</span>
                </article>
                <div className='color-block'></div>
              </Link>
            </section>

            {/* 8 荷蘭 */}
            <section className='country'>
              <div className='p1-sel'>
                <Link to="/location2"><figure className='loc-p1'><img src="./img-Location/Netherlands.jpg" alt="" /></figure></Link>
                <FavBtn
                  active={active2}
                  onClick={handleToggle}
                  payload={{
                    id: 'netherlands',
                    country: '荷蘭',
                    img: './img-Location/Netherlands.jpg',
                    text: '以風車、鬱金香、運河和自行車文化著稱；阿姆斯特丹充滿藝術氣息。',
                    wifi: WIFI,
                    stars: [1, 1, 1, 2, 2],
                    price: '15000 /月',
                  }}
                />
              </div>
              <Link to="/location2">
                <article className='loc-info'>
                  <h2>荷蘭</h2>
                  <p className='loc-text'>以風車、鬱金香、運河和自行車文化著稱。首都阿姆斯特丹充滿藝術氣息，是自由、多元且環保的現代化國家。</p>
                  <div className='wi-st'>
                    <ul><img src="./img-Location/Wifi.svg" alt="" /><p>{WIFI}</p></ul>
                    <figure className='stars'>
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                    </figure>
                  </div>
                  <span>15000 /月</span>
                </article>
                <div className='color-block'></div>
              </Link>
            </section>

            {/* 9 美國 */}
            <section className='country'>
              <div className='p1-sel'>
                <Link to="/location2"><figure className='loc-p1'><img src="./img-Location/US.jpg" alt="" /></figure></Link>
                <FavBtn
                  active={active2}
                  onClick={handleToggle}
                  payload={{
                    id: 'usa',
                    country: '美國',
                    img: './img-Location/US.jpg',
                    text: '多元文化與全球金融藝術重鎮，節奏快速，活力十足。',
                    wifi: WIFI,
                    stars: [1, 1, 1, 2, 2],
                    price: '15000 /月',
                  }}
                />
              </div>
              <Link to="/location2">
                <article className='loc-info'>
                  <h2>美國</h2>
                  <p className='loc-text'>擁融合多元文化，擁有自由女神、中央公園、時代廣場等地標，是全球金融、藝術與時尚重鎮，節奏快速，活力十足。</p>
                  <div className='wi-st'>
                    <ul><img src="./img-Location/Wifi.svg" alt="" /><p>{WIFI}</p></ul>
                    <figure className='stars'>
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                    </figure>
                  </div>
                  <span>15000 /月</span>
                </article>
                <div className='color-block'></div>
              </Link>
            </section>

            {/* 10 哥倫比亞 */}
            <section className='country'>
              <div className='p1-sel'>
                <Link to="/location2"><figure className='loc-p1'><img src="./img-Location/Colombia.jpg" alt="" /></figure></Link>
                <FavBtn
                  active={active2}
                  onClick={handleToggle}
                  payload={{
                    id: 'colombia',
                    country: '哥倫比亞',
                    img: './img-Location/Colombia.jpg',
                    text: '以多元文化著稱，擁有豐富的咖啡、寶石和製造業，也是拉丁美洲重要的文化和經濟中心之一。',
                    wifi: WIFI,
                    stars: [1, 1, 2, 2, 2],
                    price: '15000 /月',
                  }}
                />
              </div>
              <Link to="/location2">
                <article className='loc-info'>
                  <h2>哥倫比亞</h2>
                  <p className='loc-text'>以多元文化著稱，擁有豐富的咖啡、寶石和製造業，也是拉丁美洲重要的文化和經濟中心之一。</p>
                  <div className='wi-st'>
                    <ul><img src="./img-Location/Wifi.svg" alt="" /><p>{WIFI}</p></ul>
                    <figure className='stars'>
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star1.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                      <img src="./img-Location/Star2.svg" alt="" />
                    </figure>
                  </div>
                  <span>15000 /月</span>
                </article>
                <div className='color-block'></div>
              </Link>
            </section>
          </article>

          <button className='right' onClick={scrollRight}>
            <img src="./img-Location/right.svg" alt="" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Location2;
