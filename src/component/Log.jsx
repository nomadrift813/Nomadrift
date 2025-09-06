import { useNavigate } from "react-router-dom";
import "../sass/scss/log.scss";

const Log = ({ onSuccess, onSwitch }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 驗證 / API
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
                <div className="log-f-row">
                  <label htmlFor="m-l-account">帳號</label>
                  <input type="text" id="m-l-account" title="帳號欄位" autoComplete="username" required autoFocus />
                </div>

                <div className="log-f-row">
                  <label htmlFor="password1">密碼</label>
                  <input type="password" id="password1" title="密碼欄位" required autoComplete="current-password" />
                </div>
              </div>

              <button type="submit">登入</button>
            </article>
          </form>

          <div className="log-buttom-box">
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
