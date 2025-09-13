import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../sass/scss/member-data.scss';

const Member = ({ user, onLogout }) => {
  // photoUrl 儲存顯示的圖片網址，預設為會員的頭像或一個預設圖
  // 注意：這裡的初始值將在 useEffect 中被 localStorage 的值覆蓋
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || './img-member/memberdata-1.jpg');

  // 表單資料狀態管理
  const [formData, setFormData] = useState({
    username: user?.username || "",
    birthdate: "",
    sex: "",
    tel: "",
    email: user?.email || "",
    city: ""
  });

  // --- 修改：使用 useEffect 讀取 localStorage 的資料 (包含照片) ---
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
  }, []); // 空陣列代表此效果只在元件載入時執行一次

  // 處理所有輸入框的變動
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // --- 修改：處理「儲存」按鈕的點擊事件 (包含照片儲存) ---
  const handleSave = (e) => {
    e.preventDefault(); // 防止表單提交導致頁面重整
    try {
      // 儲存表單資料
      localStorage.setItem('memberFormData', JSON.stringify(formData));
      // 儲存照片 URL
      localStorage.setItem('memberPhotoUrl', photoUrl);
      alert('資料和照片已成功儲存！');
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
      alert('資料儲存失敗，請重試！');
    }
  };

  // 處理檔案上傳的函式
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result); // 更新 photoUrl 狀態
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main>
      <section id="member-information">
        <header>
          <ul>
            <li><Link to="/member">會員資料</Link></li>
            <li><Link to="/memberCity">收藏國家</Link></li>
            <li><Link to="/memberdiary">我的文章</Link></li>
            <li><Link to="/membersave">收藏文章</Link></li>
            <li><Link to="/membergroup">活動紀錄</Link></li>
          </ul>
        </header>

        <div className='m-all-box'>
          <div className='m-d-title'>
            <p>個人資料{user?.username ? `（${user.username}）` : ""}</p>
          </div>

          <article>
            {/* 左側相片區 */}
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

            {/* 右側表單 (受控元件) */}
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
                <label htmlFor="m-birthdate">生日 :</label>
                <input
                  type="date"
                  name="birthdate"
                  id="m-birthdate"
                  title="生日欄位"
                  value={formData.birthdate}
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

              {/* 儲存按鈕 */}
              <div className="save">
                <button type="button" className="save-btn" onClick={handleSave}>
                  儲存
                </button>
              </div>
            </form>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Member;
