import { Link } from 'react-router-dom'
import '../sass/scss/location-3.scss'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Location3 = () => {
  return (
    <main>
      <>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <h1 className='titleAsia'>亞洲</h1>
          <SwiperSlide>
            <img src="../../../public/img-Location/bannerAsia.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../../public/img-Location/bJapan.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../../public/img-Location/bTurkey.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../../public/img-Location/bUAE.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../../public/img-Location/bUzbekistan.jpg" alt="" />
          </SwiperSlide>
        </Swiper>
      </>


      {/* <section id='locBanner3'>
        <p className="titleAsia">亞洲</p>
      </section> */}

      <div className='locDrop3'>
        <ul>
          <Link to="/location3">
            <li>亞洲</li>
          </Link>
          <img src="./img-Location/smScroll.svg" alt="" />
        </ul>
        <ul>
          <Link to="/location3">
            <li>歐洲</li>
          </Link>
          <img src="./img-Location/smScroll.svg" alt="" />
        </ul>
        <ul>
          <Link to="/location3">
            <li>北美洲</li>
          </Link>
          <img src="./img-Location/smScroll.svg" alt="" />
        </ul>
        <ul>
          <Link to="/location3">
            <li>中南美洲</li>
          </Link>
          <img src="./img-Location/smScroll.svg" alt="" />
        </ul>
        <ul>
          <Link to="/location3">
            <li>非洲</li>
          </Link>
          <img src="./img-Location/smScroll.svg" alt="" />
        </ul>
        <ul>
          <Link to="/location3">
            <li>大洋洲</li>
          </Link>
          <img src="./img-Location/smScroll.svg" alt="" />
        </ul>
      </div>

      <article id='mCards'>
        {/* 卡片1 */}
        <Link to="/location2">
          <section section className='country' >
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

        {/* 卡片2 */}
        <Link to="/location2">
          <section section className='country' >
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
          </section >
        </Link>

        {/* 卡片3 */}
        <Link to="/location2">
          <section section className='country' >
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

        {/* 卡片4 */}
        <Link to="/location2">
          <section section className='country' >
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

        {/* 卡片5 */}
        <Link to="/location2">
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

        {/* 卡片6 */}
        <Link to="/location2">
          <section section className='country' >
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

        {/* 卡片7 */}
        <Link to="/location2">
          <section section className='country' >
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

        {/* 卡片8 */}
        <Link to="/location2">
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

        {/* 卡片9 */}
        <Link to="/location2">
          <section section className='country' >
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

        {/* 卡片10 */}
        <Link to="/location2">
          <section section className='country' >
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

        {/* 卡片11 */}
        <Link to="/location2">
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

        {/* 卡片12 */}
        <Link to="/location2">
          <section section className='country' >
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

      </article >

      <div className='expMore'>
        <button className="btn-expMore"><a href='#'></a>探索更多</button>
      </div>

    </main>
  )
}

export default Location3 