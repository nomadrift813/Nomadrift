import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Nav from "./component/Nav";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Location from "./pages/Location";
import Group from "./pages/Group";
import Group2 from "./pages/Group2";
import Group3 from "./pages/Group3";
import GroupCard from "./component/GroupCard";
import Diary from "./pages/Diary";
import Diary2 from "./pages/Diary2";
import Member from "./pages/Member-data";
import MemberCity from "./pages/Member-city";
import MemberDiary from "./pages/Member-diary";
import MemberSave from "./pages/Member-save";
import MemberGroup from "./pages/Member-group";
import Location2 from "./pages/Location-2";
import Location3 from "./pages/Location-3";
import Location2Auckland from "./pages/Location-2-Auckland";
import Location2Bangkok from "./pages/Location-2-Bangkok";
import Location2Lisboa from "./pages/Location-2-Lisboa";
import Location2Bali from "./pages/Location-2-Bali";
import Location2MexicoCity from "./pages/Location-2-MexicoCity";
import Location2Berlin from "./pages/Location-2-Berlin";
import Location2Newyork from "./pages/Location-2-Newyork";
import Location3Thailand from "./pages/Location-3-Thailand";


import Log from "./component/Log";
import Sign from "./component/Sign";
import Modal from "./component/Modal";

import { initFavDelegator, hydrateFavIcons } from "./js/favStore.js"; // ⭐ 新增

// ⭐ ScrollToTop
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

const MyApp = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ⭐ 為了每次換頁同步收藏圖示

  // ⭐ 全站登入狀態（從 localStorage 載入）
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem("nd_auth");
    return raw ? JSON.parse(raw) : { isAuthed: false, user: null };
  });

  // 彈窗控制
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState(null); // 'login' | 'register'
  const openAuth = (type) => { setAuthType(type); setAuthOpen(true); };
  const closeAuth = () => { setAuthOpen(false); setAuthType(null); };
  const switchAuthTo = (type) => setAuthType(type);

  // ⭐ 任一處成功登入/註冊時呼叫（優先導回登入前頁）
  const handleAuth = (user) => {
    const next = { isAuthed: true, user };
    setAuth(next);
    localStorage.setItem("nd_auth", JSON.stringify(next));
    closeAuth();

    const back = sessionStorage.getItem("nd_login_back");
    if (back) {
      sessionStorage.removeItem("nd_login_back");
      navigate(back, { replace: true });
    } else {
      navigate("/member");
    }
  };

  // ⭐ 登出
  const handleLogout = () => {
    setAuth({ isAuthed: false, user: null });
    localStorage.removeItem("nd_auth");
    navigate("/");
    // 登出後也同步一次收藏圖示
    setTimeout(hydrateFavIcons, 0);
  };

  // ⭐ 啟動全域收藏委派（一次就好）
  useEffect(() => {
    const stop = initFavDelegator({
      getAuth: () => auth,
      navigate,
      onNeedLogin: () => openAuth("login"),
    });
    return stop;
  }, [auth, navigate]);

  // ⭐ 每次路由變化，同步圖示狀態（避免 SPA 換頁時沒更新）
  useEffect(() => {
    hydrateFavIcons();
  }, [location.pathname, location.search, location.hash]);

  // 讓任何頁面可以叫出登入或註冊彈窗（並記住回跳）
useEffect(() => {
  window.__ndOpenLogin = (from) => {
    if (from) sessionStorage.setItem("nd_login_back", from);
    openAuth("login");
  };
  window.__ndOpenRegister = (from) => {
    if (from) sessionStorage.setItem("nd_login_back", from);
    openAuth("register");
  };
  return () => {
    delete window.__ndOpenLogin;
    delete window.__ndOpenRegister;
  };
}, []);

  return (
    <div className="wrap">
      {/* ⭐ Nav 依登入狀態切換 */}
      <Nav
        authed={auth.isAuthed}
        user={auth.user}
        onOpenAuth={openAuth}
        onGoMember={() => navigate("/member")}
      />

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<Location />} />
        <Route path="/group" element={<Group />} />
        <Route path="/group2" element={<Group2 />} />
        <Route path="/group3" element={<Group3 />} />
        <Route path="/GroupCardStyle" element={<GroupCard />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/diary2" element={<Diary2 />} />
        <Route path="/location2" element={<Location2 />} />
        <Route path="/location3" element={<Location3 />} />
        <Route path="/location2Auckland" element={<Location2Auckland />}/>
        <Route path="/location2Bangkok" element={<Location2Bangkok />}/>
        <Route path="/location2Lisboa" element={<Location2Lisboa />}/>
        <Route path="/location2Bali" element={<Location2Bali />}/>
        <Route path="/location2MexicoCity" element={<Location2MexicoCity />}/>
        <Route path="/location2Berlin" element={<Location2Berlin />}/>
        <Route path="/location2Newyork" element={<Location2Newyork />}/>
        <Route path="/location3Thailand" element={<Location3Thailand />}/>

        {/* ⭐ 傳登出與使用者資料給會員中心 */}
        <Route path="/member" element={<Member user={auth.user} onLogout={handleLogout} />} />
        <Route path="/memberCity" element={<MemberCity />} />
        <Route path="/memberdiary" element={<MemberDiary />} />
        <Route path="/membersave" element={<MemberSave />} />
        <Route path="/membergroup" element={<MemberGroup />} />

        {/* 可直接網址開啟的頁面 */}
        <Route path="/log" element={<Log onAuth={handleAuth} onSwitch={() => switchAuthTo("register")} />} />
        <Route path="/sign" element={<Sign onAuth={handleAuth} onSwitch={() => switchAuthTo("login")} />} />
      </Routes>

      {/* 全站皆可呼叫的彈窗 */}
      <Modal open={authOpen} onClose={closeAuth}>
        {authType === "login" && (
          <Log onAuth={handleAuth} onSwitch={() => switchAuthTo("register")} />
        )}
        {authType === "register" && (
          <Sign onAuth={handleAuth} onSwitch={() => switchAuthTo("login")} />
        )}
      </Modal>

      <Footer
        authed={auth.isAuthed}
        onOpenAuth={openAuth}
        onGoMember={() => navigate("/member")}
      />
    </div>
  );
};

export default MyApp;