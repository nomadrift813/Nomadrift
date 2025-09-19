// src/pages/Location.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import '../sass/scss/location.scss';

const Location = () => {
  // 捲動指定位置
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 卡片滑動方向
  const [direction, setDirection] = useState(
    window.innerWidth <= 760 ? 'vertical' : 'horizontal'
  );
  useEffect(() => {
    const onResize = () =>
      setDirection(window.innerWidth <= 760 ? 'vertical' : 'horizontal');
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ✅ 收藏按鈕（交給全域委派 .js-fav）
  //    ※ 這裡一次打包「完整卡片資料」，收藏頁就能渲染整張卡。
  const FavBtn = ({ payload }) => {
    const { id, country, img, text, wifi, stars, price } = payload;
    return (
      <figure
        className="select js-fav"
        data-fav={JSON.stringify({
          type: 'city',
          id,
          item: { id, country, img, text, wifi, stars, price },
        })}
        title="收藏 / 取消收藏"
        aria-label="收藏"
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="30" fill="white" />
          <path
            d="M18 21.667C18 18.5372 20.5746 16 23.7506 16H36.2494C39.4254 16 42 18.5372 42 21.667V39.215C42 42.368 38.312 44.1337 35.7968 42.185L31.1847 38.6117C30.4895 38.073 29.5105 38.073 28.8153 38.6117L24.2032 42.185C21.688 44.1337 18 42.368 18 39.215V21.667Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            data-bm
          />
        </svg>
      </figure>
    );
  };

  return (
    <main>
      {/* 熱門地點 banner */}
      <section id="locBanner">
        <div className="locSlogan">
          <div className="locTitle">
            <p className="l-t-1">Start your next journey here</p>
            <p className="l-t-2">熱門地點</p>
          </div>
          <div className="locScroll">
            <svg className="scrollDown" width="39" height="19" viewBox="0 0 39 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 3.89404L19.5 16.9999L37.5 3.89404" strokeWidth="3" strokeLinecap="round" />
              <path d="M6.75 1L19.5 10.4654L32.25 1" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <p className="locBanner-side-word">where is the next</p>

        <figure className="bPath">
          <img src="./img-Location/path.svg" alt="" />
        </figure>

        {/* 熱門地點 */}
        <div className="hotLoc">
          <Link to="/location2">
            <div className="hotCard-1">
              <ul className="hot-1"><img src="./img-Location/coordinate.svg" alt="" /><li>印尼</li></ul>
              <figure className="h-l-1"><img src="./img-Location/Bali.jpg" alt="" /></figure>
            </div>
          </Link>
          <Link to="/location2">
            <div className="hotCard-2">
              <ul className="hot-2"><img src="./img-Location/coordinate.svg" alt="" /><li>土耳其</li></ul>
              <figure className="h-l-2"><img src="./img-Location/Turkey.jpg" alt="" /></figure>
            </div>
          </Link>
          <Link to="/location2">
            <div className="hotCard-3">
              <ul className="hot-3"><img src="./img-Location/coordinate.svg" alt="" /><li>日本</li></ul>
              <figure className="h-l-3"><img src="./img-Location/Japan.jpg" alt="" /></figure>
            </div>
          </Link>
          <Link to="/location2">
            <div className="hotCard-4">
              <ul className="hot-4"><img src="./img-Location/coordinate.svg" alt="" /><li>泰國</li></ul>
              <figure className="h-l-4"><img src="./img-Location/Thailand.jpg" alt="" /></figure>
            </div>
          </Link>
        </div>
      </section>

      {/* 探索所有地點 */}
      <section id="discover">
        <header>
          <p className="l-t-1">Discover Ev<span>ery </span>Destination</p>
          <p className="l-t-2">探索所有地點</p>
        </header>
        <div className="locDrop">
          <ul><a href="#section3" onClick={(e) => handleScroll(e, '#global1')}><li>亞洲</li></a></ul>
          <ul><a href="#section3" onClick={(e) => handleScroll(e, '#global2')}><li>歐洲</li></a></ul>
          <ul><a href="#section3" onClick={(e) => handleScroll(e, '#global3')}><li>北美洲</li></a></ul>
          <ul><a href="#section3" onClick={(e) => handleScroll(e, '#global4')}><li>中南美洲</li></a></ul>
          <ul><a href="#section3" onClick={(e) => handleScroll(e, '#global5')}><li>非洲</li></a></ul>
          <ul><a href="#section3" onClick={(e) => handleScroll(e, '#global6')}><li>大洋洲</li></a></ul>
        </div>
      </section>

      {/* ========== 亞洲 ========== */}
      <section id="global1">
        <Link to="/location3">
          <article className="continent">
            <figure><img src="./img-Location/Asia.png" alt="" /></figure>
            <h2>亞洲</h2>
          </article>
        </Link>

        <article className="conCards">
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            direction={direction}
            navigation
            watchOverflow={false}
            breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 2 }, 640: { slidesPerView: 2, spaceBetween: 2 }, 1300: { slidesPerView: 3, spaceBetween: 24 } }}
            className="mySwiper"
          >
            {/* 菲律賓 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Manila.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'manila',
                      country: '菲律賓',
                      img: './img-Location/Manila.jpg',
                      text: '是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。',
                      wifi: '242Mbps',
                      stars: [1, 1, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>菲律賓</h2>
                    <p className="loc-text">是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 尼泊爾 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Nepal.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'nepal',
                      country: '尼泊爾',
                      img: './img-Location/Nepal.jpg',
                      text: '位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>尼泊爾</h2>
                    <p className="loc-text">位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 以色列 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Israel.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'israel',
                      country: '以色列',
                      img: './img-Location/Israel.jpg',
                      text: '融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。',
                      wifi: '242Mbps',
                      stars: [1, 2, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>以色列</h2>
                    <p className="loc-text">融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

             {/* 菲律賓 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Manila.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'manila',
                      country: '菲律賓',
                      img: './img-Location/Manila.jpg',
                      text: '是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。',
                      wifi: '242Mbps',
                      stars: [1, 1, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>菲律賓</h2>
                    <p className="loc-text">是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 尼泊爾 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Nepal.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'nepal',
                      country: '尼泊爾',
                      img: './img-Location/Nepal.jpg',
                      text: '位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>尼泊爾</h2>
                    <p className="loc-text">位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 以色列 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Israel.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'israel',
                      country: '以色列',
                      img: './img-Location/Israel.jpg',
                      text: '融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。',
                      wifi: '242Mbps',
                      stars: [1, 2, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>以色列</h2>
                    <p className="loc-text">融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

             {/* 菲律賓 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Manila.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'manila',
                      country: '菲律賓',
                      img: './img-Location/Manila.jpg',
                      text: '是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。',
                      wifi: '242Mbps',
                      stars: [1, 1, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>菲律賓</h2>
                    <p className="loc-text">是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 尼泊爾 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Nepal.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'nepal',
                      country: '尼泊爾',
                      img: './img-Location/Nepal.jpg',
                      text: '位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>尼泊爾</h2>
                    <p className="loc-text">位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 以色列 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Israel.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'israel',
                      country: '以色列',
                      img: './img-Location/Israel.jpg',
                      text: '融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。',
                      wifi: '242Mbps',
                      stars: [1, 2, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>以色列</h2>
                    <p className="loc-text">融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>
          </Swiper>
        </article>

        <Link to="/location3" className="viewMore">View more</Link>
      </section>

      {/* ========== 歐洲 ========== */}
      <section id="global2">
        <Link to="/location3">
          <article className="continent">
            <figure><img src="./img-Location/Europe.png" alt="" /></figure>
            <h2>歐洲</h2>
          </article>
        </Link>

        <article className="conCards">
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            direction={direction}
            navigation
            watchOverflow={false}
            breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 2 }, 640: { slidesPerView: 2, spaceBetween: 2 }, 1300: { slidesPerView: 3, spaceBetween: 24 } }}
            className="mySwiper"
          >
            {/* 西班牙 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Spain.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'spain',
                      country: '西班牙',
                      img: './img-Location/Spain.jpg',
                      text: '擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>西班牙</h2>
                    <p className="loc-text">擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名，是充滿熱情與陽光的國度。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 義大利 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Italy.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'italy',
                      country: '義大利',
                      img: './img-Location/Italy.jpg',
                      text: '以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>義大利</h2>
                    <p className="loc-text">以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 荷蘭 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Netherlands.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'netherlands',
                      country: '荷蘭',
                      img: './img-Location/Netherlands.jpg',
                      text: '以風車、鬱金香、運河和自行車文化著稱；阿姆斯特丹充滿藝術氣息。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>荷蘭</h2>
                    <p className="loc-text">以風車、鬱金香、運河和自行車文化著稱；阿姆斯特丹充滿藝術氣息。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

              {/* 西班牙 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Spain.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'spain',
                      country: '西班牙',
                      img: './img-Location/Spain.jpg',
                      text: '擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>西班牙</h2>
                    <p className="loc-text">擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名，是充滿熱情與陽光的國度。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 義大利 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Italy.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'italy',
                      country: '義大利',
                      img: './img-Location/Italy.jpg',
                      text: '以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>義大利</h2>
                    <p className="loc-text">以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 荷蘭 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Netherlands.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'netherlands',
                      country: '荷蘭',
                      img: './img-Location/Netherlands.jpg',
                      text: '以風車、鬱金香、運河和自行車文化著稱；阿姆斯特丹充滿藝術氣息。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>荷蘭</h2>
                    <p className="loc-text">以風車、鬱金香、運河和自行車文化著稱；阿姆斯特丹充滿藝術氣息。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>


              {/* 西班牙 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Spain.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'spain',
                      country: '西班牙',
                      img: './img-Location/Spain.jpg',
                      text: '擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>西班牙</h2>
                    <p className="loc-text">擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名，是充滿熱情與陽光的國度。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 義大利 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Italy.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'italy',
                      country: '義大利',
                      img: './img-Location/Italy.jpg',
                      text: '以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>義大利</h2>
                    <p className="loc-text">以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 荷蘭 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Netherlands.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'netherlands',
                      country: '荷蘭',
                      img: './img-Location/Netherlands.jpg',
                      text: '以風車、鬱金香、運河和自行車文化著稱；阿姆斯特丹充滿藝術氣息。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>荷蘭</h2>
                    <p className="loc-text">以風車、鬱金香、運河和自行車文化著稱；阿姆斯特丹充滿藝術氣息。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>
          </Swiper>
        </article>

        <Link to="/location3" className="viewMore">View more</Link>
      </section>

      {/* ========== 北美洲 ========== */}
      <section id="global3">
        <Link to="/location3">
          <article className="continent">
            <figure><img src="./img-Location/North America.png" alt="" /></figure>
            <h2>北美洲</h2>
          </article>
        </Link>

        <article className="conCards">
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            direction={direction}
            navigation
            watchOverflow={false}
            breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 2 }, 640: { slidesPerView: 2, spaceBetween: 2 }, 1300: { slidesPerView: 3, spaceBetween: 24 } }}
            className="mySwiper"
          >
            {/* 美國 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/US.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'usa',
                      country: '美國',
                      img: './img-Location/US.jpg',
                      text: '多元文化與全球金融藝術重鎮，節奏快速，活力十足。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>美國</h2>
                    <p className="loc-text">多元文化與全球金融藝術重鎮，節奏快速，活力十足。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 加拿大 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Canada.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'canada',
                      country: '加拿大',
                      img: './img-Location/Canada.jpg',
                      text: '氣候宜人、自然風光壯麗，都市生活與自然平衡。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>加拿大</h2>
                    <p className="loc-text">氣候宜人、自然風光壯麗，都市生活與自然平衡。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 墨西哥 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Mexico.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'mexico',
                      country: '墨西哥',
                      img: './img-Location/Mexico.jpg',
                      text: '阿茲特克文明與殖民遺跡並存，街頭充滿色彩與活力。',
                      wifi: '242Mbps',
                      stars: [1, 1, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>墨西哥</h2>
                    <p className="loc-text">阿茲特克文明與殖民遺跡並存，街頭充滿色彩與活力。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

              {/* 美國 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/US.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'usa',
                      country: '美國',
                      img: './img-Location/US.jpg',
                      text: '多元文化與全球金融藝術重鎮，節奏快速，活力十足。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>美國</h2>
                    <p className="loc-text">多元文化與全球金融藝術重鎮，節奏快速，活力十足。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 加拿大 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Canada.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'canada',
                      country: '加拿大',
                      img: './img-Location/Canada.jpg',
                      text: '氣候宜人、自然風光壯麗，都市生活與自然平衡。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>加拿大</h2>
                    <p className="loc-text">氣候宜人、自然風光壯麗，都市生活與自然平衡。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 墨西哥 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Mexico.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'mexico',
                      country: '墨西哥',
                      img: './img-Location/Mexico.jpg',
                      text: '阿茲特克文明與殖民遺跡並存，街頭充滿色彩與活力。',
                      wifi: '242Mbps',
                      stars: [1, 1, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>墨西哥</h2>
                    <p className="loc-text">阿茲特克文明與殖民遺跡並存，街頭充滿色彩與活力。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>


              {/* 美國 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/US.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'usa',
                      country: '美國',
                      img: './img-Location/US.jpg',
                      text: '多元文化與全球金融藝術重鎮，節奏快速，活力十足。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>美國</h2>
                    <p className="loc-text">多元文化與全球金融藝術重鎮，節奏快速，活力十足。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 加拿大 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Canada.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'canada',
                      country: '加拿大',
                      img: './img-Location/Canada.jpg',
                      text: '氣候宜人、自然風光壯麗，都市生活與自然平衡。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>加拿大</h2>
                    <p className="loc-text">氣候宜人、自然風光壯麗，都市生活與自然平衡。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 墨西哥 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Mexico.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'mexico',
                      country: '墨西哥',
                      img: './img-Location/Mexico.jpg',
                      text: '阿茲特克文明與殖民遺跡並存，街頭充滿色彩與活力。',
                      wifi: '242Mbps',
                      stars: [1, 1, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>墨西哥</h2>
                    <p className="loc-text">阿茲特克文明與殖民遺跡並存，街頭充滿色彩與活力。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>
          </Swiper>
        </article>

        <Link to="/location3" className="viewMore">View more</Link>
      </section>

      {/* ========== 中南美洲 ========== */}
      <section id="global4">
        <Link to="/location3">
          <article className="continent">
            <figure><img src="./img-Location/Central America.jpg" alt="" /></figure>
            <h2>中南美洲</h2>
          </article>
        </Link>

        <article className="conCards">
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            direction={direction}
            navigation
            watchOverflow={false}
            breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 2 }, 640: { slidesPerView: 2, spaceBetween: 2 }, 1300: { slidesPerView: 3, spaceBetween: 24 } }}
            className="mySwiper"
          >
            {/* 哥倫比亞 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Colombia.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'colombia',
                      country: '哥倫比亞',
                      img: './img-Location/Colombia.jpg',
                      text: '咖啡、寶石與製造業聞名，是重要文化與經濟中心。',
                      wifi: '242Mbps',
                      stars: [1, 1, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>哥倫比亞</h2>
                    <p className="loc-text">咖啡、寶石與製造業聞名，是重要文化與經濟中心。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 阿根廷 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Argentina.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'argentina',
                      country: '阿根廷',
                      img: './img-Location/Argentina.jpg',
                      text: '探戈、足球與歐洲移民文化，影響深遠。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>阿根廷</h2>
                    <p className="loc-text">探戈、足球與歐洲移民文化，影響深遠。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 巴西 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Brasil.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'brazil',
                      country: '巴西',
                      img: './img-Location/Brasil.jpg',
                      text: '亞馬遜雨林、足球與嘉年華聞名，金磚國之一。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>巴西</h2>
                    <p className="loc-text">亞馬遜雨林、足球與嘉年華聞名，金磚國之一。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

              {/* 哥倫比亞 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Colombia.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'colombia',
                      country: '哥倫比亞',
                      img: './img-Location/Colombia.jpg',
                      text: '咖啡、寶石與製造業聞名，是重要文化與經濟中心。',
                      wifi: '242Mbps',
                      stars: [1, 1, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>哥倫比亞</h2>
                    <p className="loc-text">咖啡、寶石與製造業聞名，是重要文化與經濟中心。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 阿根廷 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Argentina.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'argentina',
                      country: '阿根廷',
                      img: './img-Location/Argentina.jpg',
                      text: '探戈、足球與歐洲移民文化，影響深遠。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>阿根廷</h2>
                    <p className="loc-text">探戈、足球與歐洲移民文化，影響深遠。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 巴西 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Brasil.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'brazil',
                      country: '巴西',
                      img: './img-Location/Brasil.jpg',
                      text: '亞馬遜雨林、足球與嘉年華聞名，金磚國之一。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>巴西</h2>
                    <p className="loc-text">亞馬遜雨林、足球與嘉年華聞名，金磚國之一。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

              {/* 哥倫比亞 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Colombia.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'colombia',
                      country: '哥倫比亞',
                      img: './img-Location/Colombia.jpg',
                      text: '咖啡、寶石與製造業聞名，是重要文化與經濟中心。',
                      wifi: '242Mbps',
                      stars: [1, 1, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>哥倫比亞</h2>
                    <p className="loc-text">咖啡、寶石與製造業聞名，是重要文化與經濟中心。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 阿根廷 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Argentina.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'argentina',
                      country: '阿根廷',
                      img: './img-Location/Argentina.jpg',
                      text: '探戈、足球與歐洲移民文化，影響深遠。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>阿根廷</h2>
                    <p className="loc-text">探戈、足球與歐洲移民文化，影響深遠。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 巴西 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Brasil.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'brazil',
                      country: '巴西',
                      img: './img-Location/Brasil.jpg',
                      text: '亞馬遜雨林、足球與嘉年華聞名，金磚國之一。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>巴西</h2>
                    <p className="loc-text">亞馬遜雨林、足球與嘉年華聞名，金磚國之一。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>
          </Swiper>
        </article>

        <Link to="/location3" className="viewMore">View more</Link>
      </section>

      {/* ========== 非洲 ========== */}
      <section id="global5">
        <Link to="/location3">
          <article className="continent">
            <figure><img src="./img-Location/Africa.jpg" alt="" /></figure>
            <h2>非洲</h2>
          </article>
        </Link>

        <article className="conCards">
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            direction={direction}
            navigation
            watchOverflow={false}
            breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 12 }, 640: { slidesPerView: 2, spaceBetween: 2 }, 1300: { slidesPerView: 3, spaceBetween: 24 } }}
            className="mySwiper"
          >
            {/* 摩洛哥 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Morocco.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'morocco',
                      country: '摩洛哥',
                      img: './img-Location/Morocco.jpg',
                      text: '地中海、大西洋、撒哈拉與阿特拉斯山脈交織的北非花園。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>摩洛哥</h2>
                    <p className="loc-text">地中海、大西洋、撒哈拉與阿特拉斯山脈交織的北非花園。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 肯亞 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Kenya.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'kenya',
                      country: '肯亞',
                      img: './img-Location/Kenya.jpg',
                      text: '野生動物與東非大裂谷景觀，狩獵觀光勝地。',
                      wifi: '242Mbps',
                      stars: [1, 2, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>肯亞</h2>
                    <p className="loc-text">野生動物與東非大裂谷景觀，狩獵觀光勝地。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 南非 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/South Africa.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'south-africa',
                      country: '南非',
                      img: './img-Location/South Africa.jpg',
                      text: '彩虹之國，礦產豐富，多元文化與三首都特色。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>南非</h2>
                    <p className="loc-text">彩虹之國，礦產豐富，多元文化與三首都特色。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

                {/* 摩洛哥 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Morocco.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'morocco',
                      country: '摩洛哥',
                      img: './img-Location/Morocco.jpg',
                      text: '地中海、大西洋、撒哈拉與阿特拉斯山脈交織的北非花園。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>摩洛哥</h2>
                    <p className="loc-text">地中海、大西洋、撒哈拉與阿特拉斯山脈交織的北非花園。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 肯亞 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Kenya.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'kenya',
                      country: '肯亞',
                      img: './img-Location/Kenya.jpg',
                      text: '野生動物與東非大裂谷景觀，狩獵觀光勝地。',
                      wifi: '242Mbps',
                      stars: [1, 2, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>肯亞</h2>
                    <p className="loc-text">野生動物與東非大裂谷景觀，狩獵觀光勝地。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 南非 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/South Africa.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'south-africa',
                      country: '南非',
                      img: './img-Location/South Africa.jpg',
                      text: '彩虹之國，礦產豐富，多元文化與三首都特色。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>南非</h2>
                    <p className="loc-text">彩虹之國，礦產豐富，多元文化與三首都特色。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>


                {/* 摩洛哥 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Morocco.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'morocco',
                      country: '摩洛哥',
                      img: './img-Location/Morocco.jpg',
                      text: '地中海、大西洋、撒哈拉與阿特拉斯山脈交織的北非花園。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>摩洛哥</h2>
                    <p className="loc-text">地中海、大西洋、撒哈拉與阿特拉斯山脈交織的北非花園。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 肯亞 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Kenya.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'kenya',
                      country: '肯亞',
                      img: './img-Location/Kenya.jpg',
                      text: '野生動物與東非大裂谷景觀，狩獵觀光勝地。',
                      wifi: '242Mbps',
                      stars: [1, 2, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>肯亞</h2>
                    <p className="loc-text">野生動物與東非大裂谷景觀，狩獵觀光勝地。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 南非 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/South Africa.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'south-africa',
                      country: '南非',
                      img: './img-Location/South Africa.jpg',
                      text: '彩虹之國，礦產豐富，多元文化與三首都特色。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>南非</h2>
                    <p className="loc-text">彩虹之國，礦產豐富，多元文化與三首都特色。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>
          </Swiper>
        </article>

        <Link to="/location3" className="viewMore">View more</Link>
      </section>

      {/* ========== 大洋洲 ========== */}
      <section id="global6">
        <Link to="/location3">
          <article className="continent">
            <figure><img src="./img-Location/Oceania.jpg" alt="" /></figure>
            <h2>大洋洲</h2>
          </article>
        </Link>

        <article className="conCards">
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            direction={direction}
            navigation
            watchOverflow={false}
            breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 12 }, 640: { slidesPerView: 2, spaceBetween: 2 }, 1300: { slidesPerView: 3, spaceBetween: 24 } }}
            className="mySwiper"
          >
            {/* 澳洲 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Australia.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'australia',
                      country: '澳洲',
                      img: './img-Location/Australia.jpg',
                      text: '大堡礁與沙漠景觀，袋鼠、無尾熊的家園。',
                      wifi: '242Mbps',
                      stars: [1, 1, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>澳洲</h2>
                    <p className="loc-text">大堡礁與沙漠景觀，袋鼠、無尾熊的家園。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 紐西蘭 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/New Zealand.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'new-zealand',
                      country: '紐西蘭',
                      img: './img-Location/New Zealand.jpg',
                      text: '多樣自然景觀、純淨環境，被譽為最後淨土。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>紐西蘭</h2>
                    <p className="loc-text">多樣自然景觀、純淨環境，被譽為最後淨土。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 斐濟 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Fiji.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'fiji',
                      country: '斐濟',
                      img: './img-Location/Fiji.jpg',
                      text: '三百多島嶼、珊瑚礁與熱帶風光，度假勝地。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>斐濟</h2>
                    <p className="loc-text">三百多島嶼、珊瑚礁與熱帶風光，度假勝地。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

              {/* 澳洲 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Australia.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'australia',
                      country: '澳洲',
                      img: './img-Location/Australia.jpg',
                      text: '大堡礁與沙漠景觀，袋鼠、無尾熊的家園。',
                      wifi: '242Mbps',
                      stars: [1, 1, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>澳洲</h2>
                    <p className="loc-text">大堡礁與沙漠景觀，袋鼠、無尾熊的家園。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 紐西蘭 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/New Zealand.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'new-zealand',
                      country: '紐西蘭',
                      img: './img-Location/New Zealand.jpg',
                      text: '多樣自然景觀、純淨環境，被譽為最後淨土。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>紐西蘭</h2>
                    <p className="loc-text">多樣自然景觀、純淨環境，被譽為最後淨土。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 斐濟 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Fiji.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'fiji',
                      country: '斐濟',
                      img: './img-Location/Fiji.jpg',
                      text: '三百多島嶼、珊瑚礁與熱帶風光，度假勝地。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>斐濟</h2>
                    <p className="loc-text">三百多島嶼、珊瑚礁與熱帶風光，度假勝地。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>


              {/* 澳洲 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Australia.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'australia',
                      country: '澳洲',
                      img: './img-Location/Australia.jpg',
                      text: '大堡礁與沙漠景觀，袋鼠、無尾熊的家園。',
                      wifi: '242Mbps',
                      stars: [1, 1, 2, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>澳洲</h2>
                    <p className="loc-text">大堡礁與沙漠景觀，袋鼠、無尾熊的家園。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 紐西蘭 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/New Zealand.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'new-zealand',
                      country: '紐西蘭',
                      img: './img-Location/New Zealand.jpg',
                      text: '多樣自然景觀、純淨環境，被譽為最後淨土。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 1, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>紐西蘭</h2>
                    <p className="loc-text">多樣自然景觀、純淨環境，被譽為最後淨土。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>

            {/* 斐濟 */}
            <SwiperSlide>
              <section className="country">
                <div className="p1-sel">
                  <Link to="/location2"><figure className="loc-p1"><img src="./img-Location/Fiji.jpg" alt="" /></figure></Link>
                  <FavBtn
                    payload={{
                      id: 'fiji',
                      country: '斐濟',
                      img: './img-Location/Fiji.jpg',
                      text: '三百多島嶼、珊瑚礁與熱帶風光，度假勝地。',
                      wifi: '242Mbps',
                      stars: [1, 1, 1, 2, 2],
                      price: '15000 /月',
                    }}
                  />
                </div>
                <Link to="/location2">
                  <article className="loc-info">
                    <h2>斐濟</h2>
                    <p className="loc-text">三百多島嶼、珊瑚礁與熱帶風光，度假勝地。</p>
                    <div className="wi-st">
                      <ul><img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p></ul>
                      <figure className="stars">
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star1.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                        <img src="./img-Location/Star2.svg" alt="" />
                      </figure>
                    </div>
                    <span>15000 /月</span>
                  </article>
                  <div className="color-block"></div>
                </Link>
              </section>
            </SwiperSlide>
          </Swiper>
        </article>

        <Link to="/location3" className="viewMore">View more</Link>
      </section>
    </main>
  );
};

export default Location;
