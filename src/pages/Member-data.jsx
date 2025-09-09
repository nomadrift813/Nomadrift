import '../sass/css/member-data.min.css'
import { Link } from "react-router-dom"

const Member = ({ user, onLogout }) => {
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

          {/* 左圖 + 右表單（維持你原本的結構，以配合既有 CSS） */}
          <article>
            {/* 左側相片區 */}
            <div className='m-p-b'>
              <figure><img src="./img-member/memberdata-1.jpg" alt="" /></figure>
              <div>
                <button>編輯照片</button>
                <button onClick={onLogout}>登出</button>
              </div>
            </div>

            {/* 右側表單 */}
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
                  defaultValue={user?.username || ""}
                />
              </div>

              <div className="form-row">
                <label htmlFor="m-birthdate">生日 :</label>
                <input
                  type="date"
                  name="birthdate"
                  id="m-birthdate"
                  title="生日欄位"
                />
              </div>

              <div className="form-row">
                <label>性別 :</label>
                <div className='m-sex-box'>
                  <div className='m-sex-choice1'>
                    <input type="radio" name="sex" id="m-sex-1" value="生理男" />
                    <label htmlFor="m-sex-1">生理男</label>
                  </div>
                  <div className='m-sex-choice1'>
                    <input type="radio" name="sex" id="m-sex-2" value="生理女" />
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
                />
              </div>

              <div className="form-row">
                <label htmlFor="m-email">信箱 :</label>
                <input
                  type="email"
                  name="email"
                  id="m-email"
                  title="信箱欄位"
                  defaultValue={user?.email || ""}
                />
              </div>

              <div className="form-row">
                <label htmlFor="m-city">國籍 :</label>
                <input
                  type="text"
                  name="m-city"
                  id="m-city"
                  title="國籍欄位"
                />
              </div>
            </form>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Member
