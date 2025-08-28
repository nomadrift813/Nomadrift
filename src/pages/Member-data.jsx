import '../sass/scss/member-data.scss'
import { Link } from "react-router-dom"

const Member = () => {
  return (
    <main>
      <section id="member-information">
        <header>
           <p>個人資料</p>
           <span></span>
        </header>
        <div className='m-all-box'>
         <ul>
            <li><a href="#">會員資料</a></li>
            <li><a href="#">收藏國家</a></li>
            <li><a href="#">我的文章</a></li>
            <li><a href="#">收藏文章</a></li>
            <li><a href="#">活動紀錄</a></li>
          </ul>
          <article>
            <div className='m-p-b'>
            {/* <figure><img src="./img-member/memberdata-1.jpg" alt="" /></figure> */}
            <div >
              <button>編輯照片</button>
              <button>登出</button>
            </div>
            </div>
            <form name="memberform" id="memberform" method="post" accept-charset="UTF-8">
              <div class="form-row">
                <label for="username">會員名稱:</label>
                <input type="text" name="username" id="username" title="姓名欄位" placeholder="請輸入姓名" required autofocus></input>
              </div>
              <div class="form-row">
                <label for="birthdate">生日:</label>
                <input type="date" name="birthdate" id="birthdate" title="生日欄位"></input>
              </div>
              <div class="form-row">
                <label for="sex">性別</label>
                <input type="radio" name="member" id="member-1" value="金卡會員"></input>
                <label for="member-1">生理男</label>
                <input type="radio" name="member" id="member-2" value="銀卡會員"></input>
                <label for="member-2">生理女</label>
              </div>
              <div class="form-row">
                <label for="tel">電話:</label>
                <input type="tel" name="tel" id="tel" title="連絡電話欄位" maxlength="10" placeholder="例如:0912345678"></input>
              </div>
              <div class="form-row">
                <label for="tel">信箱:</label>
                <input type="tel" name="tel" id="tel" title="連絡電話欄位" maxlength="10" placeholder="例如:0912345678"></input>
              </div>
              <div class="form-row">
                <label for="username">國籍:</label>
                <input type="text" name="username" id="username" title="姓名欄位" placeholder="請輸入姓名" required></input>
              </div>
            </form>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Member