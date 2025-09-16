import React from 'react'
import '../sass/scss/footer.scss'

const Footer = ({ authed, onOpenAuth, onGoMember }) => {
  // Scroll Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 統一處理三個會員連結的點擊
  const goOrAuth = (pref) => {
    if (authed) onGoMember?.();
    else onOpenAuth?.(pref); // 'login' | 'register'
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
          <path d="M8.57715 43.1303L18.8147 54.999L54.0191 57.5966L58.4416 46.8097L8.57715 43.1303Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M46.226 14.1201L46.0662 16.2861L43.8931 45.7363" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30.7949 44.7698L30.3801 43.8045C28.723 39.8382 28.6114 35.395 30.0672 31.3505C31.523 27.3059 34.4407 23.9532 38.2455 21.9527L45.9468 17.9037" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19.7232 43.9529L23.2836 44.2156C22.5321 42.4082 21.9413 40.538 21.5182 38.6268C21.0908 36.558 21.0846 34.4243 21.5 32.353C21.9154 30.2817 22.7439 28.3154 23.936 26.5714C25.1281 24.8274 26.6594 23.3414 28.4385 22.2023C30.2175 21.0631 32.2079 20.2941 34.2907 19.9411L45.9468 17.9037" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="scroll-text">Scroll Top</span>
      </button>

      {/* Sitemap 區塊 */}
      <nav>
        <ul className="Sitemap">
          <li>
            <a>關於我們</a>
            <ul>
              <li><a href="#">認識漂遊牧</a></li>
              <li><a href="#">加入我們</a></li>
              <li><a href="#">聯絡我們</a></li>
            </ul>
          </li>

          <li>
            <a>會員中心</a>
            <ul>
              <li>
                <button type="button" className="linklike" onClick={() => goOrAuth('register')}>
                  加入會員
                </button>
              </li>
              <li>
                <button type="button" className="linklike" onClick={() => goOrAuth('login')}>
                  登入/註冊
                </button>
              </li>
              <li>
                <button type="button" className="linklike" onClick={() => goOrAuth('login')}>
                  我的帳號
                </button>
              </li>
            </ul>
          </li>

          <li>
            <a>最新消息</a>
            <ul>
              <li><a href="#" className='frame1'>E-mail</a></li>
              <li><a href="#" className='frame2'>Subscribe</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <h4>
        <span>亞洲第一數位遊牧平台 ｜ © 2025 Nomadrift. All rights reserved.</span>
      </h4>
    </footer>
  );
};

export default Footer;
