import { useNavigate } from "react-router-dom";
import { useState } from "react";
import G3InputLabel from "./G3InputLabel";
import "../sass/scss/log.scss";

const Log = ({ onSuccess, onSwitch }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    account: '',
    password: ''
  });

  const handleInputChange = (field) => (value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 驗證 / API
    console.log('Login data:', formData);
    onSuccess?.();           // 關閉彈窗
    navigate("/member");     // 導去會員中心
  };

  return (
    <main>
      <section id="log">
        <div className="auth-inner">
          <form id="logform" method="post" onSubmit={handleSubmit}>
            <h1>會員登入</h1>

            <article>
              <div className="log-f-box">
                <div className="log-input-custom">
                  <G3InputLabel
                    title="帳號"
                    placeholder="請輸入帳號"
                    value={formData.account}
                    onChange={handleInputChange('account')}
                    required={true}
                    name="account"
                    type="text"
                  />
                </div>

                <div className="log-input-custom">
                  <G3InputLabel
                    title="密碼"
                    placeholder="請輸入密碼"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    required={true}
                    name="password"
                    type="password"
                  />
                </div>
              </div>

              <button type="submit">登入</button>
            </article>
          </form>
          <p className="other-login">或使用以下方式登入</p>
          <div className="log-button-box">
            <button type="button"><img src="./img-log/apple.svg" alt="" />Apple</button>
            <button type="button"><img src="./img-log/google.svg" alt="" />Google</button>
            <button type="button"><img src="./img-log/facebook.svg" alt="" />Facebook</button>
          </div>

          <p>還不是會員？{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitch?.(); }}>
              馬上註冊
            </a>
          </p>
        </div>
      </section>

    </main>
  );
};

export default Log;