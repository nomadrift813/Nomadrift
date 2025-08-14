import { Link } from "react-router-dom"
import '../sass/scss/nav.scss'
import L from '../images/logo.svg'

const Nav = () => {
  return (
    // 頁首區
    <header id="topbar">
      <div class="logo">
        <Link to="/"><img src={L} alt="" /></Link>
      </div>

      <ul class="navmenu">
        <li><Link to="/location" className='nav-a'>熱門地點</Link></li>
        <li><Link to="/group" className='nav-a'>揪團活動</Link></li>
        <li><Link to="/diary" className='nav-a'>漂日記</Link></li>
      </ul>

      <ul class="navlogs">
        <li class="navlog"><Link className='nav-a'>登入</Link></li>
        <li class="navsign"><Link className='nav-a'>註冊</Link></li>
      </ul>
    </header>
  )
}

export default Nav