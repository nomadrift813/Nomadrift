import "../sass/scss/sign.scss"
import { Link } from "react-router-dom"


const Sign = () => {
    return (
        <main>
            <section id='sign'>

                <h1>註冊</h1>
                <form
                    name="signform"
                    id="signform"
                    method="post"
                    acceptCharset="UTF-8"


                >
                    <div class="sign-f-row">
                        <label for="username">會員名稱</label>
                        <input type="text" name="username" id="m-username" title="姓名欄位" placeholder="暱稱" autofocus></input>
                    </div>
                    <div class="sign-f-row">
                        <label for="tel">Email</label>
                        <input type="email" name="email" id="m-email" title="信箱欄位" placeholder="123@gmail.com" maxlength="10"></input>
                    </div>
                    <div className="sign-f-row">
                        <label htmlFor="password1">密碼</label>
                        <input
                            type="password"
                            name="password"
                            id="password1"
                            title="密碼欄位"
                            placeholder="8個字元"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <div class="sign-f-row">
                        <label for="birthdate">出生日期</label>
                        <input type="date" name="birthdate" id="m-birthdate" title="生日欄位"></input>
                    </div>
                   
                    <div class="sign-f-row">
                        <label for="tel">連絡電話</label>
                        <input type="tel" name="tel" id="tel" title="連絡電話欄位" placeholder="0912345678" maxlength="10" ></input>
                    </div>

                    <div class="sign-f-row">
                        <label for="username">國籍</label>
                        <input type="text" name="m-city" id="m-city" title="國籍欄位" placeholder="台灣"></input>
                    </div>

                      <Link to="/member" id="loginNav"><button type="submit">立刻加入</button></Link>
                </form>

                 <p>你是會員?<Link to="/log">登入</Link></p>
            </section>
        </main>
    )
}

export default Sign