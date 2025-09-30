// src/pages/Group2.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../sass/scss/group2.scss";
import GroupCard from "../component/GroupCard";

// 加入/取消用的 store（和 Group 頁相同）
import { getAuthFromLS } from "../js/favStore";
import { isJoined, addJoined, removeJoined, JOIN_EVENT } from "../js/joinStore";

/** 共用：觀察元素是否進入畫面 50%（頁面其他地方會用到；Carousel 不使用） */
const useInView = (threshold = 0.5) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            setInView(true);
            io.unobserve(entry.target); // 只觸發一次
          }
        });
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
};

/** 任意內容套用淡入（y:-3px → 0）；Carousel 不用這個 */
const FadeInOnScroll = ({ as: Tag = "div", className = "", children, threshold = 0.5 }) => {
  const { ref, inView } = useInView(threshold);
  return (
    <Tag ref={ref} className={`fade-in ${inView ? "show" : ""} ${className}`}>
      {children}
    </Tag>
  );
};

/** 修正版 Carousel：吃 onToggleJoin，並把 joined 狀態丟給 GroupCard */
const CardCarousel = ({ items, onToggleJoin }) => {
  const trackRef = useRef(null);
  const [oneSetWidth, setOneSetWidth] = useState(0); // 一組卡片的總寬（px）
  const [x, setX] = useState(0); // translateX
  const pausedRef = useRef(false); // 滑入暫停
  const speedPxPerFrame = 1.0; // 速度（可調）

  // 產出 3 組一樣的卡片，做無縫循環
  const tripleSets = useMemo(() => [items, items, items], [items]);

  // 重測第一組寬度
  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      const firstSet = trackRef.current.querySelector(".carousel-set");
      if (firstSet) {
        const w = firstSet.scrollWidth;
        setOneSetWidth(w);
      }
    };
    calc();

    const ro = new ResizeObserver(calc);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [items]);

  // 連續位移（hover 暫停）
  useEffect(() => {
    let raf;
    const step = () => {
      if (!pausedRef.current && oneSetWidth > 0) {
        setX((prev) => {
          const next = prev - speedPxPerFrame;
          return Math.abs(next) >= oneSetWidth ? 0 : next;
        });
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [oneSetWidth]);

  return (
    <div className="carousel">
      <h3 className="carousel-title-en">More Fun Together</h3>
      <div className="line" />
      <h2 className="carousel-title">更多揪團</h2>

      <div
        className="carousel-viewport"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div className="carousel-track" ref={trackRef} style={{ transform: `translateX(${x}px)` }}>
          {tripleSets.map((set, gi) => (
            <div className="carousel-set" key={`set-${gi}`}>
              {set.map((card, ci) => {
                const id = card.id ?? card.key ?? String(card.title || "activity");
                const joined = isJoined(id); // 直接讀狀態（Carousel 內也能看到變更）
                return (
                  <div className="carousel-card" key={`card-${gi}-${id}-${ci}`}>
                    <GroupCard
                      id={id}
                      image={card.image}
                      signupCount={card.signupCount}
                      date={card.date}
                      // time={card.time}
                      location={card.location}
                      title={card.title}
                      description={card.description}
                      detailLink={card.detailLink}
                      joined={joined}
                      onToggleJoin={(e) => {
                        e?.preventDefault?.();
                        e?.stopPropagation?.();
                        onToggleJoin(card);
                      }}
                      groupSize={card.groupSize ?? 10}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Group2 = () => {
  const location = useLocation();

  // 這頁的主活動（加上 groupSize）
  const MAIN = {
    id: "night-market",
    image: "./img-Group/night-market.jpg",
    baseSignupCount: 8, // 原始顯示人數
    groupSize: 10, // ✅ 滿團人數
    date: "2025/09/12 (五)",
    time: "18:00",
    location: "台灣/ 台北市　捷運松山站 4 號出口",
    title: "一起逛饒河夜市",
    description:
      "來去饒河夜市走走吧！集合好之後就一起逛，先買個剛出爐的胡椒餅，再來一杯冰冰涼涼的仙草茶，邊吃邊聊超chill～一路上想停哪就停哪，看到什麼想吃就買，沒有SOP、也不用趕行程，就是數位游牧者聚在一起隨興散步，順便認識新朋友。燈火通明、人聲熱鬧，美食香氣一路陪伴，聊工作、聊旅行、聊生活，輕鬆自在到不想回家，快來加入我們，用夜市的熱鬧氛圍開啟一個超好玩的夜晚吧！",
    detailLink: "/group2",
  };

  // 讀取是否已加入
  const [joinedMain, setJoinedMain] = useState(() => isJoined(MAIN.id));
  // 顯示人數（本地同步增減）
  const [currentSignupCount, setCurrentSignupCount] = useState(
    MAIN.baseSignupCount + (joinedMain ? 1 : 0)
  );

  // joinStore 變更時同步本頁狀態（例如在別頁加入/取消）
  useEffect(() => {
    const onChange = () => {
      const j = isJoined(MAIN.id);
      setJoinedMain(j);
      setCurrentSignupCount(MAIN.baseSignupCount + (j ? 1 : 0));
    };
    window.addEventListener(JOIN_EVENT, onChange);
    return () => window.removeEventListener(JOIN_EVENT, onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 加入成功彈窗（版型與 Group.jsx 一樣）
  const [showJoinSuccessModal, setShowJoinSuccessModal] = useState(false);
  const [joinedActivityTitle, setJoinedActivityTitle] = useState("");
  const [joinedActivityCount, setJoinedActivityCount] = useState(0);
  const [joinedActivityFull, setJoinedActivityFull] = useState(0);
  const closeJoinModal = () => setShowJoinSuccessModal(false);

  // 通用：登入檢查＋加入/取消
  const ensureLoginAndToggle = (activity) => {
    const auth = getAuthFromLS();
    const loggedIn = !!(auth && (auth.isAuthed || auth.isLogin || auth.user));
    if (!loggedIn) {
      // 記住回來這一頁
      window.__ndOpenLogin?.(location.pathname);
      return { ok: false };
    }

    const id = activity.id;
    const already = isJoined(id, auth);

    if (already) {
      removeJoined(id, auth);
    } else {
      addJoined(
        {
          id,
          title: activity.title,
          date: activity.date,
          time: activity.time,
          location: activity.location,
          image: activity.image,
          description: activity.description,
          signupCount: activity.signupCount ?? activity.baseSignupCount ?? 0,
          detailLink: activity.detailLink ?? "/group2",
          groupSize: activity.groupSize ?? 10,
        },
        auth
      );
    }
    return { ok: true, joinedNow: !already };
  };

  // 1) 主活動按鈕（報名參加 / 取消報名）
  const handleToggleMain = () => {
    const { ok, joinedNow } = ensureLoginAndToggle(MAIN);
    if (!ok) return;

    if (joinedNow) {
      // 在更新 state 之前先計算要顯示在彈窗的數字
      const nextCount = currentSignupCount + 1;
      setJoinedActivityTitle(MAIN.title);
      setJoinedActivityCount(nextCount);
      setJoinedActivityFull(MAIN.groupSize ?? 10);
      setShowJoinSuccessModal(true);
    }

    setJoinedMain(joinedNow);
    setCurrentSignupCount((n) => n + (joinedNow ? +1 : -1));
  };

  // 2) 輪播卡片按鈕（共用流程；會進 member-group）
  const handleJoinFromCarousel = (card) => {
    const payload = {
      id: card.id ?? card.key ?? String(card.title || "activity"),
      title: card.title,
      date: card.date,
      time: card.time,
      location: card.location,
      image: card.image,
      description: card.description,
      signupCount: card.signupCount ?? 0,
      detailLink: card.detailLink ?? "/group2",
      groupSize: card.groupSize ?? 10,
    };

    const { ok, joinedNow } = ensureLoginAndToggle(payload);
    if (!ok) return;

    if (joinedNow) {
      setJoinedActivityTitle(payload.title);
      setJoinedActivityCount((payload.signupCount ?? 0) + 1);
      setJoinedActivityFull(payload.groupSize ?? 10);
      setShowJoinSuccessModal(true);
    }
  };

  // --- Carousel 的示意資料（預設加上 groupSize: 10） ---
  const groupCardData = [
    {
      id: 1,
      image: "./img-Group/fireworks.jpeg",
      signupCount: 8,
      groupSize: 10,
      date: "2025/09/30 (二)",
      time: "20:00",
      location: "首爾",
      title: "屋頂談心",
      description:
        "心情不好，找不到好地方，好酒友，我們舉辦了一個專門給想一起看夜景，一起喝酒玩遊戲的屋頂聚會，現場提供超款桌遊跟特製調酒，別怕尷尬",
      detailLink: "/group2",
    },
    {
      id: 2,
      image: "./img-Group/surf.jpg",
      signupCount: 9,
      groupSize: 12,
      date: "2025/09/01 (一)",
      time: "7:00",
      location: "黃金海岸",
      title: "來衝個早浪",
      description:
        "一起早起去海邊，踩著第一道陽光下水衝浪，滑幾道舒服的浪，讓身體醒過來，心也跟著放鬆。衝完再找間早餐店，好好開啟這一天，給生活一點鹹鹹的、自由的味道。",
      detailLink: "/group2",
    },
    {
      id: 3,
      image: "./img-Group/tennis.jpg",
      signupCount: 5,
      groupSize: 10,
      date: "2025/10/13 (一)",
      time: "10:00",
      location: "里斯本",
      title: "每周一網球",
      description:
        "手癢想打網球卻找不到球友嗎?\n周一網球社歡迎你的加入！我們有哥等級的給你練練技術，也有初階等級的夥伴跟你一起搭配練習，快來加入!",
      detailLink: "/group2",
    },
    {
      id: 4,
      image: "./img-Group/Paris.jpg",
      signupCount: 8,
      groupSize: 10,
      date: "2025/09/17 (三)",
      time: "8:00",
      location: "巴黎",
      title: "一日艾蜜莉在巴黎",
      description:
        "打卡所有劇中的經典景點，化身艾蜜莉漫遊城市角落，走進每一幕熟悉場景，從咖啡館到花店，劇迷絕對不能錯過的一日朝聖行程，讓你拍好拍滿、浪漫爆棚！",
      detailLink: "/group2",
    },
    {
      id: 5,
      image: "./img-Group/sydney-opera-house-view.jpg",
      signupCount: 10,
      groupSize: 10,
      date: "2025/09/28 (日)",
      time: "17:00",
      location: "雪梨",
      title: "參觀雪梨歌劇院雪梨",
      description:
        "澳洲雪梨必去景點!但你一定還沒有進去參觀過吧!我們正在找10個人一起團體報名，有全中文解說的導遊帶領，不用怕有聽沒有懂，目前報名人數已達5人，一人只要50澳幣，數量有限快來跟我們一起參加吧!結束還可以一起去",
      detailLink: "/group2",
    },
  ];

  // --- 留言區（保留你原本） ---
  const [comments, setComments] = useState([
    {
      name: "Sherry",
      text: "哇～夜市行程聽起來也太讚了吧！可惜那天有事走不開😭",
      photo: "./img-Group/people/Commenter (1).jpg",
    },
    {
      name: "Scoot",
      text: "我超愛逛夜市耶！饒河真的推推！！",
      photo: "./img-Group/people/Commenter (2).jpg",
    },
    {
      name: "Jason",
      text: "團主的揪團超棒！希望下次能跟到！",
      photo: "./img-Group/people/Commenter (3).jpg",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    const text = newComment.trim();
    if (!text) return;
    setComments((prev) => [
      ...prev,
      {
        name: "Andy Chen",
        text,
        photo: "./img-Group/people/People-(11).jpg",
      },
    ]);
    setNewComment("");
  };

  return (
    <main id="E-group2">
      {/* Banner區：不動背景，只讓文字淡入 */}
      <section id="groupBanner2">
        <img src="./img-Group/g-2-BN.jpg" alt="" />
        <div className="groupSlogan2">
          <FadeInOnScroll as="h3">Activity theme</FadeInOnScroll>
          <FadeInOnScroll className="line" />
          <FadeInOnScroll as="h2">一起逛饒河夜市</FadeInOnScroll>
        </div>
      </section>

      {/* 內文資訊 */}
      <section id="groupInfo">
        <div className="activity-main">
          <FadeInOnScroll as="figure" className="info_img">
            <img src={MAIN.image} alt="" />
          </FadeInOnScroll>

          <div className="activity-introduction">
            <FadeInOnScroll as="li">
              <h3>活動類型</h3>
              <p>#找吃飯夥伴 #找踩點夥伴</p>
            </FadeInOnScroll>

            <FadeInOnScroll as="li">
              <h3>活動時間</h3>
              <p>2025/09/12 (五) 18:00 ~ 22:00</p>
            </FadeInOnScroll>

            <FadeInOnScroll as="li">
              <h3>集合地點</h3>
              <p>{MAIN.location}</p>
            </FadeInOnScroll>

            <FadeInOnScroll as="li">
              <h3>報名截止日</h3>
              <p>2025/09/10 (三) 23:59</p>
            </FadeInOnScroll>

            <FadeInOnScroll className="activity-btn">
              <button className={`join ${joinedMain ? "is-cancel" : ""}`} onClick={handleToggleMain}>
                {joinedMain ? "取消報名" : "報名參加"}
                <img src="./img-Group/right-arrow.svg" alt="right-arrow" />
              </button>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* 發起人+報名人數 */}
      <section id="people-info">
        <FadeInOnScroll className="organizer-info">
          <h3>發起人</h3>
          <p>Peggy Chen</p>
          <img className="people-img" src="./img-Group/people/organizer.jpg" alt="" />
        </FadeInOnScroll>

        <FadeInOnScroll className="participants">
          <h3>報名人數</h3>
          <p>{currentSignupCount} 人已報名</p>

          <div className="join-people">
            <img className="people-img" src="./img-Group/people/join-people (1).jpg" alt="" />
            <img className="people-img2" src="./img-Group/people/join-people (2).jpg" alt="" />
            <img className="people-img2" src="./img-Group/people/join-people (3).jpg" alt="" />
            <img className="people-img2" src="./img-Group/people/join-people (4).jpg" alt="" />
            <img className="people-img2" src="./img-Group/people/join-people (5).jpg" alt="" />
            <img className="people-img2" src="./img-Group/people/join-people (6).jpg" alt="" />
          </div>
        </FadeInOnScroll>
      </section>

      {/* 活動說明 */}
      <article id="activity-content">
        <div className="content-title">
          <FadeInOnScroll as="h3">Activity content</FadeInOnScroll>
          <FadeInOnScroll className="line" />
          <FadeInOnScroll as="h2">活動說明</FadeInOnScroll>
          <FadeInOnScroll as="p">{MAIN.description}</FadeInOnScroll>
        </div>
      </article>

      {/* 留言區 */}
      <section id="activity-comments">
        <FadeInOnScroll as="h3">留言區</FadeInOnScroll>

        {comments.map((c, idx) => (
          <FadeInOnScroll className="comment" key={`c-${idx}`}>
            <img className="commenter-photo" src={c.photo} alt="" />
            <div className="comment-content">
              <p className="commenter-name">{c.name}</p>
              <p>{c.text}</p>
            </div>
          </FadeInOnScroll>
        ))}

        <FadeInOnScroll className="comment-user">
          <img className="commenter-photo" src="./img-Group/people/People-(11).jpg" alt="" />
          <div className="comment-content">
            <p className="commenter-name">Andy Chen</p>
            <form className="comment-input-row" onSubmit={handleAddComment}>
              <textarea
                className="input"
                type="text"
                placeholder="我要留言"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                aria-label="新增留言內容"
              />
              <button type="submit" className="btn-add-comment">
                送出
              </button>
            </form>
          </div>
        </FadeInOnScroll>
      </section>

      {/* ✅ 更多揪團（Carousel 無淡入） */}
      <section id="more-activities">
        <CardCarousel items={groupCardData} onToggleJoin={handleJoinFromCarousel} />
      </section>

      {/* 發起揪團 */}
      <section id="createGroup">
        <div className="createGroup-title">
          <FadeInOnScroll as="h2">沒有喜歡的團？</FadeInOnScroll>
          <FadeInOnScroll className="line" />
          <FadeInOnScroll>
            <Link to="/group3" className="btn2-create">
              發起揪團
            </Link>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ✅ 加入成功彈窗（與 Group.jsx 完全一致） */}
      {showJoinSuccessModal && (
        <div className="group-join-modal-overlay" onClick={closeJoinModal}>
          <div className="group-join-success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="group-join-modal-content group-join-fade-in show">
              <div className="group-join-success-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="#F4D000" />
                  <path
                    d="M18 30L26 38L42 22"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2>加入成功</h2>
              <p>你已成功加入「{joinedActivityTitle}」活動！</p>

              {/* 活動資訊補充 */}
              <p className="group-join-extra">
                目前 <strong>{joinedActivityCount}</strong> 人報名 ｜{" "}
                <strong>{joinedActivityFull}</strong> 人滿團
              </p>

              {/* 會員專區 / 活動紀錄連結 */}
              <p className="group-join-links">
                前往 <Link to="/member" className="join-link" onClick={closeJoinModal}>會員專區</Link> 查看{" "}
                <Link to="/membergroup" className="join-link" onClick={closeJoinModal}>活動紀錄</Link>
              </p>

              <button className="group-join-modal-close-btn" onClick={closeJoinModal}>
                確定
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Group2;
