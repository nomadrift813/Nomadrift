import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../sass/scss/member-data.scss';
import CalendarInput from '../component/CalendarInput';  // 匯入 CalendarInput 元件

const Member = ({ user, onLogout }) => {
  // photoUrl 儲存顯示的圖片網址
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || './img-member/memberdata-1.jpg');
  // 表單資料狀態管理
  const [formData, setFormData] = useState({
    username: user?.username || "",
    birthdate: "", // 這裡的狀態不需要變動
    sex: "",
    tel: "",
    email: user?.email || "",
    city: ""
  });
  // Modal 狀態，控制提示視窗的顯示與內容
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 元件載入時，從 localStorage 讀取資料
  useEffect(() => {
    try {
      const savedFormData = localStorage.getItem('memberFormData');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
      const savedPhotoUrl = localStorage.getItem('memberPhotoUrl');
      if (savedPhotoUrl) {
        setPhotoUrl(savedPhotoUrl);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
  }, []);

  // 處理所有輸入框的變動
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // 處理檔案上傳
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 處理「儲存」按鈕的點擊事件
  const handleSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('memberFormData', JSON.stringify(formData));
      localStorage.setItem('memberPhotoUrl', photoUrl);
      setModalMessage("資料和照片已成功儲存！");
      setShowModal(true);
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
      setModalMessage("資料儲存失敗，請重試！");
      setShowModal(true);
    }
  };

  // 關閉 Modal 的函式
  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <main>
      <section id="member-information">
        <header>
          <ul>
            <li><Link to="/member">會員資料</Link></li>
            <li><Link to="/memberCity">收藏國家</Link></li>
            <li><Link to="/memberdiary">我的文章</Link></li>
            <li><Link to="/membersave">收藏日記</Link></li>
            <li><Link to="/membergroup">活動紀錄</Link></li>
          </ul>
        </header>
        <div className='m-all-box'>
          <div className='m-d-title'>
            <p>個人資料{user?.username ? `（${user.username}）` : ""}</p>
          </div>
          <article>
            <div className='m-p-b'>
              <figure>
                <img src={photoUrl} alt="會員照片" />
              </figure>
              <div>
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
                <button className="photo" onClick={() => document.getElementById('photo-upload').click()}>
                  編輯照片
                </button>
                <button className="logout" onClick={onLogout}>登出</button>
              </div>
            </div>
            <form
              name="memberform"
              id="memberform"
              method="post"
              acceptCharset="UTF-8"
            >
              <div className="form-row">
                <label htmlFor="m-username">會員名稱 :</label>
                <input
                  type="text"
                  name="username"
                  id="m-username"
                  title="姓名欄位"
                  autoFocus
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="m-email">信箱 :</label>
                <input
                  type="email"
                  name="email"
                  id="m-email"
                  title="信箱欄位"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>性別 :</label>
                <div className='m-sex-box'>
                  <div className='m-sex-choice1'>
                    <input
                      type="radio"
                      name="sex"
                      id="m-sex-1"
                      value="生理男"
                      checked={formData.sex === "生理男"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="m-sex-1">生理男</label>
                  </div>
                  <div className='m-sex-choice1'>
                    <input
                      type="radio"
                      name="sex"
                      id="m-sex-2"
                      value="生理女"
                      checked={formData.sex === "生理女"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="m-sex-2">生理女</label>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="m-tel">電話 :</label>
                <input
                  type="tel"
                  name="tel"
                  id="m-tel"
                  title="連絡電話欄位"
                  maxLength={10}
                  value={formData.tel}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="m-birthdate">生日 :</label>
                {/* 這裡替換為 CalendarInput 元件 */}
                <CalendarInput
                  title="" // 將標題設定為空字串，以隱藏「活動日期」
                  value={formData.birthdate}
                  onChange={(value) => setFormData(prevData => ({ ...prevData, birthdate: value }))}
                  required={false}
                  placeholder="選擇生日"
                />
              </div>

              <div className="form-row">
                <label htmlFor="m-city">國籍 :</label>
                <input
                  type="text"
                  name="city"
                  id="m-city"
                  title="國籍欄位"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="save">
                <button type="button" className="save-btn" onClick={handleSave}>
                  儲存
                </button>
              </div>
            </form>
          </article>
        </div>
      </section>
      {showModal && (
        <div className="custom-modal-backdrop" onClick={closeModal}>
          <div className="custom-modal" onClick={e => e.stopPropagation()}>
            <div className="success-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="30" fill="#F4D000" />
                <path d="M18 30L26 38L42 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="custom-modal-header">
              <h3>儲存成功</h3>
            </div>
            <div className="custom-modal-body">
              <p>{modalMessage}</p>
            </div>
            <button className="modal-ok-button" onClick={closeModal}>確認</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Member;