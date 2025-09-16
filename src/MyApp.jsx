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

import Log from "./component/Log";
import Sign from "./component/Sign";
import Modal from "./component/Modal";

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

  // ⭐ 全站登入狀態（從 localStorage 載入）
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem("nd_auth");
    return raw ? JSON.parse(raw) : { isAuthed: false, user: null };
  });

  // ⭐ 任一處成功登入/註冊時呼叫
  const handleAuth = (user) => {
    const next = { isAuthed: true, user };
    setAuth(next);
    localStorage.setItem("nd_auth", JSON.stringify(next));
    closeAuth();
    navigate("/member");
  };

  // ⭐ 登出
  const handleLogout = () => {
    setAuth({ isAuthed: false, user: null });
    localStorage.removeItem("nd_auth");
    navigate("/");
  };

  // 彈窗控制
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState(null); // 'login' | 'register'
  const openAuth = (type) => { setAuthType(type); setAuthOpen(true); };
  const closeAuth = () => { setAuthOpen(false); setAuthType(null); };
  const switchAuthTo = (type) => setAuthType(type);

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

        {/* ⭐ 傳登出與使用者資料給會員中心 */}
        <Route path="/member" element={<Member user={auth.user} onLogout={handleLogout} />} />
        <Route path="/memberCity" element={<MemberCity />} />
        <Route path="/memberdiary" element={<MemberDiary />} />
        <Route path="/membersave" element={<MemberSave />} />
        <Route path="/membergroup" element={<MemberGroup />} />

        {/* 選擇保留可直接網址開啟的頁面 */}
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
