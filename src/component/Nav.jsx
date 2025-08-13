import { Link } from "react-router-dom"
import '../sass/scss/_nav.scss'

const Nav = () => {
  return (
    <div className="navbar">
        <ul>
            <li><Link to="/">logo</Link></li>
            <li><Link to="/location">熱門地點</Link></li>
            <li><Link to="/group">揪團活動</Link></li>
            <li><Link to="/diary">漂日記</Link></li>
        </ul>
    </div>
  )
}

export default Nav