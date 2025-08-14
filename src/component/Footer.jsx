import React from 'react'
import '../sass/scss/footer.scss'

const Footer = () => {
  return (
    <footer>
      <nav>
        <ul class="Sitemap">
          <li>
            <a href="#" className='footer-a'>關於我們</a>
            <ul>
              <li><a href="#" className='footer-a'>認識漂遊牧</a></li>
              <li><a href="#" className='footer-a'>加入我們</a></li>
              <li><a href="#" className='footer-a'>聯絡我們</a></li>
            </ul>
          </li>
          <li>
            <a href="#" className='footer-a'>會員中心</a>
            <ul>
              <li><a href="#" className='footer-a'>加入會員</a></li>
              <li><a href="#" className='footer-a'>登入/註冊</a></li>
              <li><a href="#" className='footer-a'>我的帳號</a></li>
            </ul>
          </li>
          <li>
            <a href="#" className='footer-a'>最新消息</a>
            <ul>
              <li><a href="#" className='footer-a'>E-mail</a></li>
              <li><a href="#" className='footer-a'>Subscribe</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <h4>亞洲第一數位遊牧平台 <span>｜© 2025 Nomadrift. All rights reserved.</span></h4>
    </footer>
  )
}

export default Footer