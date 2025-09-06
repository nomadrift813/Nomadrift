import React from 'react'
import '../sass/scss/footer.scss'

const Footer = () => {
  return (
    <footer>
      {/* waves */}
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        {/* boat */}
        {/* <img className='boat' src="./img-Footer/boat.svg" alt="" /> */}
      </div>

       <button id="gotop" title="Back to top">
          <svg id="arrow_up" width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.86375 43.7955L19.2115 55.5682L54.4386 57.8375L58.7603 47.0098L8.86375 43.7955Z" stroke="#201811" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M46.2405 14.4351L46.1009 16.6025L44.2025 46.0716" stroke="#201811" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M31.0958 45.2274L30.672 44.2661C28.9781 40.3153 28.825 35.8734 30.2431 31.8155C31.6611 27.7575 34.5474 24.3777 38.3333 22.3418L45.9966 18.2212" stroke="#201811" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20.017 44.5137L23.5797 44.7433C22.8113 42.9429 22.2032 41.0783 21.7623 39.1712C21.3156 37.1064 21.2895 34.9729 21.6856 32.8978C22.0817 30.8228 22.8918 28.8488 24.0676 27.0937C25.2434 25.3387 26.7607 23.8385 28.5291 22.6828C30.2974 21.5271 32.2805 20.7396 34.3599 20.3672L45.9966 18.2212" stroke="#201811" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        
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