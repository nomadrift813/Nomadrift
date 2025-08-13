import { Link } from "react-router-dom"
import '../sass/scss/nav.scss'
import L from '../images/logo.png'

const Nav = () => {
  return (
    // 頁首區
    <header id="topbar">
      <div class="logo">
        <Link to="/"><img src={L} alt="" /></Link>
      </div>

      <ul class="navmenu">
        <li><Link to="/location">熱門地點</Link></li>
        <li><Link to="/group">揪團活動</Link></li>
        <li><Link to="/diary">漂日記</Link></li>
      </ul>

      <ul class="navlogs">
        <li class="navlog"><Link>登入</Link></li>
        <li class="navsign"><Link>註冊</Link></li>
      </ul>
    </header>
  )
}

export default Nav