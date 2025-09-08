import React from 'react'
import '../sass/scss/footer.scss'

const Footer = () => {

  // Scroll Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      {/* waves */}
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      {/* boat */}
      <button className='boat' onClick={scrollToTop}>
        <svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.57715 43.1303L18.8147 54.999L54.0191 57.5966L58.4416 46.8097L8.57715 43.1303Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M46.226 14.1201L46.0662 16.2861L43.8931 45.7363" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M30.7949 44.7698L30.3801 43.8045C28.723 39.8382 28.6114 35.395 30.0672 31.3505C31.523 27.3059 34.4407 23.9532 38.2455 21.9527L45.9468 17.9037" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M19.7232 43.9529L23.2836 44.2156C22.5321 42.4082 21.9413 40.538 21.5182 38.6268C21.0908 36.558 21.0846 34.4243 21.5 32.353C21.9154 30.2817 22.7439 28.3154 23.936 26.5714C25.1281 24.8274 26.6594 23.3414 28.4385 22.2023C30.2175 21.0631 32.2079 20.2941 34.2907 19.9411L45.9468 17.9037" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span className="scroll-text">Scroll Top</span>
      </button>

      {/* <button id="gotop" title="Back to top">
          <svg id="arrow_up" width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.86375 43.7955L19.2115 55.5682L54.4386 57.8375L58.7603 47.0098L8.86375 43.7955Z" stroke="#201811" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M46.2405 14.4351L46.1009 16.6025L44.2025 46.0716" stroke="#201811" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M31.0958 45.2274L30.672 44.2661C28.9781 40.3153 28.825 35.8734 30.2431 31.8155C31.6611 27.7575 34.5474 24.3777 38.3333 22.3418L45.9966 18.2212" stroke="#201811" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20.017 44.5137L23.5797 44.7433C22.8113 42.9429 22.2032 41.0783 21.7623 39.1712C21.3156 37.1064 21.2895 34.9729 21.6856 32.8978C22.0817 30.8228 22.8918 28.8488 24.0676 27.0937C25.2434 25.3387 26.7607 23.8385 28.5291 22.6828C30.2974 21.5271 32.2805 20.7396 34.3599 20.3672L45.9966 18.2212" stroke="#201811" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button> */}

      <nav>
        <ul className="Sitemap">
          <li>
            <a href="#">關於我們</a>
            <ul>
              <li><a href="#">認識漂遊牧</a></li>
              <li><a href="#">加入我們</a></li>
              <li><a href="#">聯絡我們</a></li>
            </ul>
          </li>
          <li>
            <a href="#">會員中心</a>
            <ul>
              <li><a href="#">加入會員</a></li>
              <li><a href="#">登入/註冊</a></li>
              <li><a href="#">我的帳號</a></li>
            </ul>
          </li>
          <li>
            <a href="#">最新消息</a>
            <ul>
              <li><a href="#" className='frame1'>E-mail</a></li>
              <li><a href="#" className='frame2'>Subscribe</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <h4> <span>亞洲第一數位遊牧平台 ｜ © 2025 Nomadrift. All rights reserved.</span></h4>
    </footer>
  )
}

export default Footer