import { useState } from "react";
import { Route, Routes } from "react-router-dom";

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

const MyApp = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState(null); // 'login' | 'register'

  const openAuth = (type) => { setAuthType(type); setAuthOpen(true); };
  const closeAuth = () => { setAuthOpen(false); setAuthType(null); };
  const switchAuthTo = (type) => setAuthType(type);

  return (
    <div className="wrap">
      <Nav onOpenAuth={openAuth} />

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
        <Route path="/member" element={<Member />} />
        <Route path="/memberCity" element={<MemberCity />} />
        <Route path="/memberdiary" element={<MemberDiary />} />
        <Route path="/membersave" element={<MemberSave />} />
        <Route path="/membergroup" element={<MemberGroup />} />
        {/* 保留直接網址進入（可留可刪） */}
        <Route path="/log" element={<Log />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>

      {/* 全站皆可呼叫的彈窗 */}
      <Modal open={authOpen} onClose={closeAuth}>
        {authType === "login" && <Log onSuccess={closeAuth} onSwitch={() => switchAuthTo("register")} />}
        {authType === "register" && <Sign onSuccess={closeAuth} onSwitch={() => switchAuthTo("login")} />}
      </Modal>

      <Footer />
    </div>
  );
};

export default MyApp;
