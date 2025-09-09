import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../sass/scss/nav.scss";
import L from "../images/logo.svg";
import logoS from "../images/logoS.svg";

const Nav = ({ onOpenAuth, authed, user, onGoMember }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 820);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <header id="topbar">
      <div className="logo">
        <Link to="/"><img src={isMobile ? logoS : L} alt="Nomadrift" /></Link>
      </div>

      <ul className="navmenu">
        <li><Link to="/location">熱門地點</Link></li>
        <li><Link to="/group">揪團活動</Link></li>
        <li><Link to="/diary">漂日記</Link></li>
      </ul>

      <ul className="navlogs">
        {authed ? (
          <li className="navmember">
            <button type="button" onClick={onGoMember}>
              會員中心{user?.username ? `（${user.username}）` : ""}
            </button>
          </li>
        ) : (
          <>
            <li className="navlog">
              <button type="button" onClick={() => onOpenAuth?.("login")}>登入</button>
            </li>
            <li className="navsign">
              <button type="button" onClick={() => onOpenAuth?.("register")}>註冊</button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Nav;
