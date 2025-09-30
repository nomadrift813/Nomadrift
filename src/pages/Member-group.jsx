import '../sass/scss/member-group.scss';
import GroupCard from '../component/GroupCard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getJoinedList,
  removeJoined,
  JOIN_EVENT
} from '../js/joinStore';

const MemberGroup = () => {
  const [joined, setJoined] = useState([]);

  // 載入 + 監聽變更（從 Group 頁加入/取消也會同步）
  useEffect(() => {
    const refresh = () => setJoined(getJoinedList());
    refresh();
    const onChange = () => refresh();
    window.addEventListener(JOIN_EVENT, onChange);
    return () => window.removeEventListener(JOIN_EVENT, onChange);
  }, []);

  // 取消參加
  const handleCancel = (id) => {
    removeJoined(id);               // 寫回 localStorage（joinStore 會廣播事件）
    setJoined(getJoinedList());     // 當下也更新一次
  };

  return (
    <main>
      <section id="member-group">
        <header>
          <ul>
            <li><Link to="/member">會員資料</Link></li>
            <li><Link to="/memberCity">收藏國家</Link></li>
            <li><Link to="/memberdiary">我的文章</Link></li>
            <li><Link to="/membersave">收藏日記</Link></li>
            <li><Link to="/membergroup">活動紀錄</Link></li>
          </ul>
        </header>

        <div className="m-all-box">
          <div className="m-d-title">
            <p>活動紀錄</p>
          </div>

          {joined.length === 0 ? (
                                  <p className="empty-hint">
                                      尚未加入任何活動去
                                      <Link to="/Group" className="empty-link"> 揪團活動 </Link>逛逛吧！
                                  </p>
                              ) : (
            // ✅ 卡片模式：直接沿用 Group 的 GroupCard + .cards-container
            <div className="cards-container">
              {joined.map((a, i) => (
                <GroupCard
                  key={(a.id || 'joined') + '-' + i}
                  id={a.id}
                  image={a.image}
                  signupCount={a.signupCount}
                  date={a.date}
                  time={a.time}
                  location={a.location}
                  title={a.title}
                  description={a.description}
                   detailLink={a.detailLink || "/group2"}  // 🟢 沒有的話給預設連結
                  joined={true}                  // ✅ 告訴卡片「現在是已加入」
                  onToggleJoin={() => handleCancel(a.id)} // ✅ 變成「取消」
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MemberGroup;
