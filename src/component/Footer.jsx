import React, { useState } from 'react';
import '../sass/scss/footer.scss';
import { Link } from "react-router-dom";

const Footer = ({ authed, onOpenAuth, onGoMember }) => {
  // 新增狀態來管理成功與失敗彈窗的顯示
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Scroll Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 統一處理三個會員連結的點擊
  const goOrAuth = (pref) => {
    if (authed) onGoMember?.();
    else onOpenAuth?.(pref); // 'login' | 'register'
  };

  // 關閉彈窗的函式
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setModalMessage('');
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setModalMessage('');
  };

  // 處理訂閱的函式
  const handleSubscribe = () => {
    const emailInput = document.querySelector('.frame1');
    const email = emailInput.value;
    
    // 使用正則表達式進行更嚴格的 Email 格式驗證
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && emailRegex.test(email)) {
      // 成功邏輯
      console.log(`Email ${email} has been subscribed.`);
      setModalMessage(`我們會將最新消息發送到您的信箱。`);
      setShowSuccessModal(true);
      emailInput.value = ''; // 清空輸入框
    } else {
      // 失敗邏輯
      setModalMessage('請輸入有效的 Email 地址。');
      setShowErrorModal(true);
    }
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
            <a>網站導覽</a>
            <ul>
              <li><Link to="/location">熱門地點</Link></li>
              <li><Link to="/group">揪團活動</Link></li>
              <li><Link to="/diary">漂日記</Link></li>
            </ul>
          </li>

          <li>
            <a>關於我們</a>
            <ul>
              <li><a>認識漂遊牧</a></li>
              <li><a>加入我們</a></li>
              <li><a>聯絡我們</a></li>
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
              <textarea className='frame1' placeholder="Email"></textarea>
              <button className='frame2' onClick={handleSubscribe} >Subscribe</button>
            </ul>
          </li>
        </ul>
      </nav>

      {/* 成功彈窗 */}
      {showSuccessModal && (
          <div className="custom-modal-backdrop" style={{ zIndex: 2000 }} onClick={closeSuccessModal}>
            <div className="custom-modal" onClick={e => e.stopPropagation()}>
              <div className="success-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="#F4D000" />
                  <path d="M18 30L26 38L42 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="custom-modal-header">
                <h3>訂閱成功</h3>
              </div>
              <div className="custom-modal-body">
                <p>{modalMessage}</p>
              </div>
              <button className="modal-ok-button" onClick={closeSuccessModal}>確認</button>
            </div>
          </div>
      )}
      
      {/* 失敗彈窗 */}
      {showErrorModal && (
        <div className="custom-modal-backdrop" style={{ zIndex: 2000 }} onClick={closeErrorModal}>
          <div className="custom-modal" onClick={e => e.stopPropagation()}>
            <div className="error-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="30" fill="#F40000" />
                <path d="M22 22L38 38M38 22L22 38" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="custom-modal-header">
              <h3>訂閱失敗</h3>
            </div>
            <div className="custom-modal-body">
              <p>{modalMessage}</p>
            </div>
            <button className="modal-ok-button" onClick={closeErrorModal}>確認</button>
          </div>
        </div>
      )}

      <h4>
        <span>亞洲第一數位遊牧平台 ｜ © 2025 Nomadrift. All rights reserved.</span>
      </h4>
      
    </footer>
  );
};

export default Footer;