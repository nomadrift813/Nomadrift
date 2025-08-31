import { Link } from "react-router-dom"
import "../sass/scss/log.scss"

const Log = () => {
    return (
        <main>
            <section id="log" >
                <form
                    name="logform"
                    id="logform"
                    method="post"
                    acceptCharset="UTF-8"
                >
                    <h1>會員登入</h1>

                    <article>

                        <div className="log-f-box">
                            <div className="log-f-row">
                                <label htmlFor="m-l-account">帳號</label>
                                <input
                                    type="text"
                                    name="m-l-account"
                                    id="m-l-account"
                                    title="帳號欄位"
                                    autoComplete="username"
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="log-f-row">
                                <label htmlFor="password1">密碼</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password1"
                                    title="密碼欄位"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>

                        </div>

                        <Link to="/member" id="loginNav"><button type="submit">登入</button></Link>

                    </article>

                </form>
                
                <div className="log-buttom-box">
                    <button><img src="./img-log/apple.svg" alt="" />Apple</button>
                    <button><img src="./img-log/google.svg" alt="" />Google</button>
                    <button><img src="./img-log/facebook.svg" alt="" />Facebook</button>
                </div>
                <p>還不是會員? <Link to="/sign">馬上註冊</Link></p>
            </section>
        </main>
    )
}

export default Log