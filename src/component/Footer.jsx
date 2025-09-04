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
          <img className='boat' src="../../../public/img-Footer/boat.svg" alt="" />
        </div>
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