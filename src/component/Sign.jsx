import { useNavigate } from "react-router-dom";
import { useState } from "react";
import G3InputLabel from "./G3InputLabel";
import CalendarInput from "./CalendarInput";
import "../sass/scss/sign.scss";

const Sign = ({ onSuccess, onSwitch }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    birthdate: '',
    phone: '',
    nationality: ''
  });

  const handleInputChange = (field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 註冊流程
    console.log('Registration data:', formData);
    onSuccess?.();
    navigate("/member");
  };

  return (
    <main>
      <section id="sign">
        <div className="auth-inner">
          <h1>註冊</h1>

          <form id="signform" method="post" onSubmit={handleSubmit}>
            <div className="sign-input-custom">
              <G3InputLabel
                title="會員名稱"
                placeholder="暱稱"
                value={formData.username}
                onChange={handleInputChange('username')}
                name="username"
                type="text"
              />
            </div>

            <div className="sign-input-custom">
              <G3InputLabel
                title="Email"
                placeholder="123@gmail.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                name="email"
                type="email"
              />
            </div>

            <div className="sign-input-custom">
              <G3InputLabel
                title="密碼"
                placeholder="密碼需至少8個字元"
                value={formData.password}
                onChange={handleInputChange('password')}
                required={true}
                name="password"
                type="password"
                hint=""
              />
            </div>

            <div className="calendar-input-wrapper">
              <CalendarInput
                title="出生日期"
                placeholder="選擇生日"
                value={formData.birthdate}
                onChange={handleInputChange('birthdate')}
              />
            </div>

            <div className="sign-input-custom">
              <G3InputLabel
                title="連絡電話"
                placeholder="0912345678"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                name="phone"
                type="tel"
                maxLength={10}
              />
            </div>

            <div className="sign-input-custom">
              <G3InputLabel
                title="國籍"
                placeholder="台灣"
                value={formData.nationality}
                onChange={handleInputChange('nationality')}
                name="nationality"
                type="text"
              />
            </div>

            <button className="sign-join-btn" type="submit">立刻加入</button>
          </form>

          <div className="sign-text-outline">
            <p>你是會員？{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); onSwitch?.(); }}>
                登入
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Sign;