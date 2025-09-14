import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import '../sass/scss/location.scss'


const Location = () => {

  // 捲動指定位置
  const handleScroll = (e, targetId) => {
    e.preventDefault(); // 阻止 a 預設跳轉
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 卡片滑動效果
  const [direction, setDirection] = useState(
    window.innerWidth <= 760 ? "vertical" : "horizontal"
  );
  // 監聽視窗大小，切換方向
  useEffect(() => {
    const handleResize = () => {
      setDirection(window.innerWidth <= 760 ? "vertical" : "horizontal");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <main>
      {/* 熱門地點 banner */}
      <section id="locBanner">
        <div className='locSlogan'>
          <div className='locTitle'>
            <p className='l-t-1'>Start your next journey here</p>
            <p className='l-t-2'>熱門地點</p>
          </div>
          <div className="locScroll">
            <svg className='scrollDown' width="39" height="19" viewBox="0 0 39 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 3.89404L19.5 16.9999L37.5 3.89404" /*stroke="#201811"*/ strokeWidth="3" strokeLinecap="round" />
              <path d="M6.75 1L19.5 10.4654L32.25 1" /*stroke="#201811"*/ strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <p className='locBanner-side-word'>where is the next</p>

        <figure className='bPath'>
          <img src="./img-Location/path.svg" alt="" />
        </figure>

        {/* 熱門地點 */}
        <div className="hotLoc">
          <Link to="/location2">
            <div className='hotCard-1'>
              <ul className='hot-1'>
                <img src="./img-Location/coordinate.svg" alt="" /><li>印尼</li>
              </ul>
              <figure className='h-l-1'>
                <img src="./img-Location/Bali.jpg" alt="" />
              </figure>
            </div>
          </Link>

          <Link to="/location2">
            <div className="hotCard-2">
              <ul className="hot-2">
                <img src="./img-Location/coordinate.svg" alt="" /><li>土耳其</li>
              </ul>
              <figure className='h-l-2'>
                <img src="./img-Location/Turkey.jpg" alt="" />
              </figure>
            </div>
          </Link>

          <Link to="/location2">
            <div className="hotCard-3">
              <ul className="hot-3">
                <img src="./img-Location/coordinate.svg" alt="" /><li>日本</li>
              </ul>
              <figure className='h-l-3'>
                <img src="./img-Location/Japan.jpg" alt="" />
              </figure>
            </div>
          </Link>

          <Link to="/location2">
            <div className="hotCard-4">
              <ul className="hot-4">
                <img src="./img-Location/coordinate.svg" alt="" /><li>泰國</li>
              </ul>
              <figure className='h-l-4'>
                <img src="./img-Location/Thailand.jpg" alt="" />
              </figure>
            </div>
          </Link>

        </div>

      </section>

      {/* 探索所有地點 */}
      <section id='discover'>
        <header>
          <p className='l-t-1'>Discover Ev<span>ery </span>Destination</p>
          <p className='l-t-2'>探索所有地點</p>
        </header>

        {/* 下拉選單 */}
        <div className='locDrop'>
          <ul>
            <a href="#section3" onClick={(e) => handleScroll(e, "#global1")}><li>亞洲</li></a>
            <img src="./img-Location/smScroll.svg" alt="" />
          </ul>
          <ul>
            <a href="#section3" onClick={(e) => handleScroll(e, "#global2")}><li>歐洲</li></a>
            <img src="./img-Location/smScroll.svg" alt="" />
          </ul>
          <ul>
            <a href="#section3" onClick={(e) => handleScroll(e, "#global3")}><li>北美洲</li></a>
            <img src="./img-Location/smScroll.svg" alt="" />
          </ul>
          <ul>
            <a href="#section3" onClick={(e) => handleScroll(e, "#global4")}><li>中南美洲</li></a>
            <img src="./img-Location/smScroll.svg" alt="" />
          </ul>
          <ul>
            <a href="#section3" onClick={(e) => handleScroll(e, "#global5")}><li>非洲</li></a>
            <img src="./img-Location/smScroll.svg" alt="" />
          </ul>
          <ul>
            <a href="#section3" onClick={(e) => handleScroll(e, "#global6")}><li>大洋洲</li></a>
            <img src="./img-Location/smScroll.svg" alt="" />
          </ul>
        </div>
      </section>

      {/* 亞洲區 */}
      <section id='global1'>
        {/* 亞洲 */}
        <Link to="/location3">
          <article className='continent'>
            <figure><img src="./img-Location/Asia.png" alt="" /></figure>
            <h2>亞洲</h2>
          </article>
        </Link>

        {/* 所有卡片 */}
        <article className='conCards'>

          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            direction={direction}
            navigation
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 2 },       // 手機
              640: { slidesPerView: 2, spaceBetween: 2 },     // 平板
              1300: { slidesPerView: 3, spaceBetween: 24 },    // 桌機
            }}
            className="mySwiper"
          >
            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>

                {/* 亞洲卡片1 */}
                <Link to="/location2">
                  <section className='country'>
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Manila.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>菲律賓</h2>
                      <p className='loc-text'>是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section>
                </Link>

              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>

                {/* 亞洲卡片2 */}
                <Link to="/location2" >
                  <section className='country'>
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Nepal.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>尼泊爾</h2>
                      <p className='loc-text'>位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section>
                </Link>

              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>

                {/* 亞洲卡片3 */}
                <Link to="/location2">
                  <section className='country'>
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Israel.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>以色列</h2>
                      <p className='loc-text'>融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section>
                </Link>

              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>

                {/* 亞洲卡片1 */}
                <Link to="/location2">
                  <section className='country'>
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Manila.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>菲律賓</h2>
                      <p className='loc-text'>是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section>
                </Link>

              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>

                {/* 亞洲卡片2 */}
                <Link to="/location2" >
                  <section className='country'>
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Nepal.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>尼泊爾</h2>
                      <p className='loc-text'>位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section>
                </Link>

              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>

                {/* 亞洲卡片3 */}
                <Link to="/location2">
                  <section className='country'>
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Israel.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>以色列</h2>
                      <p className='loc-text'>融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section>
                </Link>

              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>

                {/* 亞洲卡片1 */}
                <Link to="/location2">
                  <section className='country'>
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Manila.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>菲律賓</h2>
                      <p className='loc-text'>是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section>
                </Link>

              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>

                {/* 亞洲卡片2 */}
                <Link to="/location2" >
                  <section className='country'>
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Nepal.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>尼泊爾</h2>
                      <p className='loc-text'>位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section>
                </Link>

              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>

                {/* 亞洲卡片3 */}
                <Link to="/location2">
                  <section className='country'>
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Israel.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>以色列</h2>
                      <p className='loc-text'>融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section>
                </Link>

              </SwiperSlide>
            ))}


          </Swiper>

        </article>

        {/* 更多按鈕 */}
        <Link to="/location3" className='viewMore'>
          View more
        </Link>

      </section >

      {/* 歐洲區 */}
      < section id='global2' >
        {/* 歐洲 */}
        <Link to="/location3" >
          <article className='continent' >
            <figure><img src="./img-Location/Europe.png" alt="" /></figure>
            <h2>歐洲</h2>
          </article >
        </Link >

        {/* 所有卡片 */}
        < article className='conCards' >

          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            direction={direction}
            navigation
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 2 },       // 手機
              640: { slidesPerView: 2, spaceBetween: 2 },     // 平板
              1300: { slidesPerView: 3, spaceBetween: 24 },    // 桌機
            }}
            className="mySwiper"
          >

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 歐洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Spain.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>西班牙</h2>
                      <p className='loc-text'>擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名，是充滿熱情與陽光的國度。ß</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 歐洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Italy.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>義大利</h2>
                      <p className='loc-text'>以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。擁有羅馬、威尼斯、佛羅倫斯等歷史名城，文化魅力獨特。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link>
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 歐洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Netherlands.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>荷蘭</h2>
                      <p className='loc-text'>以風車、鬱金香、運河和自行車文化著稱。首都阿姆斯特丹充滿藝術氣息，是自由、多元且環保的現代化國家。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >

              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 歐洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Spain.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>西班牙</h2>
                      <p className='loc-text'>擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名，是充滿熱情與陽光的國度。ß</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 歐洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Italy.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>義大利</h2>
                      <p className='loc-text'>以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。擁有羅馬、威尼斯、佛羅倫斯等歷史名城，文化魅力獨特。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link>
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 歐洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Netherlands.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>荷蘭</h2>
                      <p className='loc-text'>以風車、鬱金香、運河和自行車文化著稱。首都阿姆斯特丹充滿藝術氣息，是自由、多元且環保的現代化國家。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >

              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 歐洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Spain.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>西班牙</h2>
                      <p className='loc-text'>擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名，是充滿熱情與陽光的國度。ß</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 歐洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Italy.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>義大利</h2>
                      <p className='loc-text'>以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。擁有羅馬、威尼斯、佛羅倫斯等歷史名城，文化魅力獨特。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link>
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 歐洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Netherlands.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>荷蘭</h2>
                      <p className='loc-text'>以風車、鬱金香、運河和自行車文化著稱。首都阿姆斯特丹充滿藝術氣息，是自由、多元且環保的現代化國家。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >

              </SwiperSlide>
            ))}

          </Swiper>

        </article >

        {/* 更多按鈕 */}
        <Link to="/location3" className='viewMore'>
          View more
        </Link>

      </section >

      {/* 北美洲區 */}
      < section id='global3' >
        {/* 北美洲 */}
        <Link to="/location3" >
          <article className='continent' >
            <figure><img src="./img-Location/North America.png" alt="" /></figure>
            <h2>北美洲</h2>
          </article >
        </Link >

        {/* 所有卡片 */}
        < article className='conCards' >
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            direction={direction}
            navigation
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 2 },       // 手機
              640: { slidesPerView: 2, spaceBetween: 2 },     // 平板
              1300: { slidesPerView: 3, spaceBetween: 24 },    // 桌機
            }}
            className="mySwiper"
          >

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 北美洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/US.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>美國</h2>
                      <p className='loc-text'>擁融合多元文化，擁有自由女神、中央公園、時代廣場等地標，是全球金融、藝術與時尚重鎮，節奏快速，活力十足。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 北美洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Canada.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>加拿大</h2>
                      <p className='loc-text'>氣候宜人、自然風光壯麗，是融合多元文化的城市，擁有海灘、山脈與都市生活的完美平衡。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 北美洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Mexico.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>墨西哥</h2>
                      <p className='loc-text'>擁有悠久的阿茲特克文明與西班牙殖民遺跡，文化藝術豐富，街頭充滿色彩與活力，是拉丁美洲的重要經濟與文化中心。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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

                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 北美洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/US.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>美國</h2>
                      <p className='loc-text'>擁融合多元文化，擁有自由女神、中央公園、時代廣場等地標，是全球金融、藝術與時尚重鎮，節奏快速，活力十足。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 北美洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Canada.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>加拿大</h2>
                      <p className='loc-text'>氣候宜人、自然風光壯麗，是融合多元文化的城市，擁有海灘、山脈與都市生活的完美平衡。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 北美洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Mexico.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>墨西哥</h2>
                      <p className='loc-text'>擁有悠久的阿茲特克文明與西班牙殖民遺跡，文化藝術豐富，街頭充滿色彩與活力，是拉丁美洲的重要經濟與文化中心。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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

                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 北美洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/US.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>美國</h2>
                      <p className='loc-text'>擁融合多元文化，擁有自由女神、中央公園、時代廣場等地標，是全球金融、藝術與時尚重鎮，節奏快速，活力十足。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 北美洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Canada.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>加拿大</h2>
                      <p className='loc-text'>氣候宜人、自然風光壯麗，是融合多元文化的城市，擁有海灘、山脈與都市生活的完美平衡。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 北美洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Mexico.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>墨西哥</h2>
                      <p className='loc-text'>擁有悠久的阿茲特克文明與西班牙殖民遺跡，文化藝術豐富，街頭充滿色彩與活力，是拉丁美洲的重要經濟與文化中心。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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

                  </section >
                </Link >
              </SwiperSlide>
            ))}

          </Swiper>

        </article >

        {/* 更多按鈕 */}
        <Link to="/location3" className='viewMore'>
          View more
        </Link>

      </section >

      {/* 中南美洲區 */}
      < section id='global4' >
        {/* 中南美洲 */}
        <Link to="/location3" >
          <article className='continent' >
            <figure><img src="./img-Location/Central America.jpg" alt="" /></figure>
            <h2>中南美洲</h2>
          </article >
        </Link>

        {/* 所有卡片 */}
        < article className='conCards' >

          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            direction={direction}
            navigation
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 2 },       // 手機
              640: { slidesPerView: 2, spaceBetween: 2 },     // 平板
              1300: { slidesPerView: 3, spaceBetween: 24 },    // 桌機
            }}
            className="mySwiper"
          >

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 中南美洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Colombia.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>哥倫比亞</h2>
                      <p className='loc-text'>以多元文化著稱，擁有豐富的咖啡、寶石和製造業，也是拉丁美洲重要的文化和經濟中心之一。 </p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 中南美洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Argentina.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>阿根廷</h2>
                      <p className='loc-text'>以熱情和對探戈、足球的熱愛而著稱，擁有悠久的歐洲移民歷史，並在文化、經濟和政治上是拉丁美洲的重要國家。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 中南美洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Brasil.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>巴西</h2>
                      <p className='loc-text'>擁有全球面積最大的熱帶雨林亞馬遜，是世界重要的農產和礦產出口國，以咖啡、甘蔗、柑橘聞名。 由於曾為葡萄牙殖民地，其官方語言為葡萄牙語，並以其多元文化、足球、嘉年華等聞名，是金磚國家之一。 </p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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

                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 中南美洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Colombia.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>哥倫比亞</h2>
                      <p className='loc-text'>以多元文化著稱，擁有豐富的咖啡、寶石和製造業，也是拉丁美洲重要的文化和經濟中心之一。 </p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 中南美洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Argentina.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>阿根廷</h2>
                      <p className='loc-text'>以熱情和對探戈、足球的熱愛而著稱，擁有悠久的歐洲移民歷史，並在文化、經濟和政治上是拉丁美洲的重要國家。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 中南美洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Brasil.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>巴西</h2>
                      <p className='loc-text'>擁有全球面積最大的熱帶雨林亞馬遜，是世界重要的農產和礦產出口國，以咖啡、甘蔗、柑橘聞名。 由於曾為葡萄牙殖民地，其官方語言為葡萄牙語，並以其多元文化、足球、嘉年華等聞名，是金磚國家之一。 </p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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

                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 中南美洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Colombia.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>哥倫比亞</h2>
                      <p className='loc-text'>以多元文化著稱，擁有豐富的咖啡、寶石和製造業，也是拉丁美洲重要的文化和經濟中心之一。 </p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 中南美洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Argentina.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>阿根廷</h2>
                      <p className='loc-text'>以熱情和對探戈、足球的熱愛而著稱，擁有悠久的歐洲移民歷史，並在文化、經濟和政治上是拉丁美洲的重要國家。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 中南美洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Brasil.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>巴西</h2>
                      <p className='loc-text'>擁有全球面積最大的熱帶雨林亞馬遜，是世界重要的農產和礦產出口國，以咖啡、甘蔗、柑橘聞名。 由於曾為葡萄牙殖民地，其官方語言為葡萄牙語，並以其多元文化、足球、嘉年華等聞名，是金磚國家之一。 </p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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

                  </section >
                </Link >
              </SwiperSlide>
            ))}

          </Swiper>

        </article >

        {/* 更多按鈕 */}
        <Link to="/location3" className='viewMore'>
          View more
        </Link>

      </section >

      {/* 非洲區 */}
      < section id='global5' >
        {/* 非洲 */}
        <Link to="/location3" >
          <article className='continent' >
            <figure><img src="./img-Location/Africa.jpg" alt="" /></figure>
            <h2>非洲</h2>
          </article >
        </Link >

        {/* 所有卡片 */}
        < article className='conCards' >

          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            direction={direction}
            navigation
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 12 },       // 手機
              640: { slidesPerView: 2, spaceBetween: 2 },     // 平板
              1300: { slidesPerView: 3, spaceBetween: 24 },    // 桌機
            }}
            className="mySwiper"
          >

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 非洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Morocco.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>摩洛哥</h2>
                      <p className='loc-text'>擁有獨特多樣的地貌，包括地中海沿岸、大西洋、撒哈拉沙漠和綿延的阿特拉斯山脈，使其成為受歡迎的旅遊目的地，特別是以「北非花園」的稱號著稱。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 非洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Kenya.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>肯亞</h2>
                      <p className='loc-text'>以壯麗的野生動物、豐富的自然景觀（如東非大裂谷）聞名，是狩獵與觀光的熱門目的地。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 非洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/South Africa.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>南非</h2>
                      <p className='loc-text'>世界上唯一擁有三個首都的國家：行政首都普勒托利亞、立法首都開普敦和司法首都布隆泉，是一個擁有豐富礦產、多元種族和文化的「彩虹之國」。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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

                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 非洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Morocco.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>摩洛哥</h2>
                      <p className='loc-text'>擁有獨特多樣的地貌，包括地中海沿岸、大西洋、撒哈拉沙漠和綿延的阿特拉斯山脈，使其成為受歡迎的旅遊目的地，特別是以「北非花園」的稱號著稱。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 非洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Kenya.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>肯亞</h2>
                      <p className='loc-text'>以壯麗的野生動物、豐富的自然景觀（如東非大裂谷）聞名，是狩獵與觀光的熱門目的地。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 非洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/South Africa.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>南非</h2>
                      <p className='loc-text'>世界上唯一擁有三個首都的國家：行政首都普勒托利亞、立法首都開普敦和司法首都布隆泉，是一個擁有豐富礦產、多元種族和文化的「彩虹之國」。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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

                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 非洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Morocco.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>摩洛哥</h2>
                      <p className='loc-text'>擁有獨特多樣的地貌，包括地中海沿岸、大西洋、撒哈拉沙漠和綿延的阿特拉斯山脈，使其成為受歡迎的旅遊目的地，特別是以「北非花園」的稱號著稱。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 非洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Kenya.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>肯亞</h2>
                      <p className='loc-text'>以壯麗的野生動物、豐富的自然景觀（如東非大裂谷）聞名，是狩獵與觀光的熱門目的地。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 非洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/South Africa.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>南非</h2>
                      <p className='loc-text'>世界上唯一擁有三個首都的國家：行政首都普勒托利亞、立法首都開普敦和司法首都布隆泉，是一個擁有豐富礦產、多元種族和文化的「彩虹之國」。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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

                  </section >
                </Link >
              </SwiperSlide>
            ))}


          </Swiper>

        </article >

        {/* 更多按鈕 */}
        <Link to="/location3" className='viewMore'>
          View more
        </Link>

      </section >

      {/* 大洋洲區 */}
      < section id='global6' >

        {/* 大洋洲 */}
        <Link to="/location3" >
          <article className='continent' >
            <figure><img src="./img-Location/Oceania.jpg" alt="" /></figure>
            <h2>大洋洲</h2>
          </article >
        </Link >

        {/* 所有卡片 */}
        < article className='conCards' >
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            direction={direction}
            navigation
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 12 },       // 手機
              640: { slidesPerView: 2, spaceBetween: 2 },     // 平板
              1300: { slidesPerView: 3, spaceBetween: 24 },    // 桌機
            }}
            className="mySwiper"
          >

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 大洋洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Australia.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>澳洲</h2>
                      <p className='loc-text'>擁有豐富的自然資源，如大堡礁和沙漠景觀，並是袋鼠、無尾熊等特有生物的家園。 </p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 大洋洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/New Zealand.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>紐西蘭</h2>
                      <p className='loc-text'>以其多樣的自然景觀、純淨的環境聞名，並有著與眾不同的生態系統，被譽為「活的地理教室」和「地球上最後的淨土」。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 大洋洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Fiji.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>斐濟</h2>
                      <p className='loc-text'>由三百多個大小島嶼組成，以其水清沙幼、珊瑚礁美景及熱帶風光聞名，是世界級的度假勝地。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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

                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 大洋洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Australia.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>澳洲</h2>
                      <p className='loc-text'>擁有豐富的自然資源，如大堡礁和沙漠景觀，並是袋鼠、無尾熊等特有生物的家園。 </p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 大洋洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/New Zealand.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>紐西蘭</h2>
                      <p className='loc-text'>以其多樣的自然景觀、純淨的環境聞名，並有著與眾不同的生態系統，被譽為「活的地理教室」和「地球上最後的淨土」。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 大洋洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Fiji.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>斐濟</h2>
                      <p className='loc-text'>由三百多個大小島嶼組成，以其水清沙幼、珊瑚礁美景及熱帶風光聞名，是世界級的度假勝地。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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

                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 大洋洲卡片1 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Australia.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>澳洲</h2>
                      <p className='loc-text'>擁有豐富的自然資源，如大堡礁和沙漠景觀，並是袋鼠、無尾熊等特有生物的家園。 </p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 大洋洲卡片2 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/New Zealand.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>紐西蘭</h2>
                      <p className='loc-text'>以其多樣的自然景觀、純淨的環境聞名，並有著與眾不同的生態系統，被譽為「活的地理教室」和「地球上最後的淨土」。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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
                  </section >
                </Link >
              </SwiperSlide>
            ))}

            {Array.from({ length: 1 }).map((_, i) => (
              <SwiperSlide key={i}>
                {/* 大洋洲卡片3 */}
                <Link to="/location2" >
                  <section className='country' >
                    <div className='p1-sel'>
                      <figure className='loc-p1'><img src="./img-Location/Fiji.jpg" alt="" /></figure>
                      <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                    </div>
                    <article className='loc-info'>
                      <h2>斐濟</h2>
                      <p className='loc-text'>由三百多個大小島嶼組成，以其水清沙幼、珊瑚礁美景及熱帶風光聞名，是世界級的度假勝地。</p>
                      <div className='wi-st'>
                        <ul>
                          <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                        </ul>
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

                  </section >
                </Link >
              </SwiperSlide>
            ))}

          </Swiper>

        </article >

        {/* 更多按鈕 */}
        <Link to="/location3" className='viewMore'>
          View more
        </Link>

      </section >


      {/* 探索更多 */}
      {/* <div className='expMore'>
        <button className='viewMore' className="btn-expMore"><a href='#'></a>探索更多</button>
      </div> */}

    </main >

  )
}

export default Location