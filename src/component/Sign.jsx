import { useNavigate } from "react-router-dom";
import "../sass/scss/sign.scss";

const Sign = ({ onSuccess, onSwitch }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 註冊流程
    onSuccess?.();
    navigate("/member");
  };

  return (
    <main>
      <section id="sign">
        <div className="auth-inner">
          <h1>註冊</h1>

          <form id="signform" method="post" onSubmit={handleSubmit}>
            <div className="sign-f-row">
              <label htmlFor="m-username">會員名稱</label>
              <input type="text" id="m-username" title="姓名欄位" placeholder="暱稱" autoFocus />
            </div>

            <div className="sign-f-row">
              <label htmlFor="m-email">Email</label>
              <input type="email" id="m-email" title="信箱欄位" placeholder="123@gmail.com" />
            </div>

            <div className="sign-f-row">
              <label htmlFor="s-password">密碼</label>
              <input type="password" id="s-password" title="密碼欄位" placeholder="8個字元" autoComplete="new-password" required />
            </div>

            <div className="sign-f-row">
              <label htmlFor="m-birthdate">出生日期</label>
              <input type="date" id="m-birthdate" title="生日欄位" />
            </div>

            <div className="sign-f-row">
              <label htmlFor="tel">連絡電話</label>
              <input type="tel" id="tel" title="連絡電話欄位" placeholder="0912345678" maxLength={10} />
            </div>

            <div className="sign-f-row">
              <label htmlFor="m-city">國籍</label>
              <input type="text" id="m-city" title="國籍欄位" placeholder="台灣" />
            </div>

            <button type="submit">立刻加入</button>
          </form>

          <p>你是會員？{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); onSwitch?.(); }}>
              登入
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Sign;
