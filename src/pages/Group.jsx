// src/pages/Group.jsx
import '../sass/scss/group.scss';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import GroupCard from '../component/GroupCard';

// 登入判斷與報名清單
import { getAuthFromLS } from '../js/favStore';
import {
  isJoined,
  addJoined,
  removeJoined,
  JOIN_EVENT,
} from '../js/joinStore';

/** 共用：觀察元素是否進入畫面 50% */
const useInView = (threshold = 0.5) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  // 設定網頁標題
  useEffect(() => {
    document.title = '揪團活動｜漂遊牧';
  }, []);

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

/** 元件：任意內容套用淡入（y:-3px → 0） */
const FadeInOnScroll = ({ as: Tag = 'div', className = '', children, threshold = 0.5 }) => {
  const { ref, inView } = useInView(threshold);
  return (
    <Tag ref={ref} className={`fade-in ${inView ? 'show' : ''} ${className}`}>
      {children}
    </Tag>
  );
};

const ALLOWED_FILTERS = [
  '全部活動',
  '找吃飯夥伴',
  '找工作夥伴',
  '找踩點夥伴',
  '找合租室友',
  '找Chill伴',
];

const Group = () => {
  // 篩選、顯示數量、彈窗
  const [activeFilter, setActiveFilter] = useState('全部活動');
  const [visibleCount, setVisibleCount] = useState(12); // 初始顯示 12 張
  const [showJoinSuccessModal, setShowJoinSuccessModal] = useState(false); // 加入成功彈窗
  const [joinedActivityTitle, setJoinedActivityTitle] = useState(''); // 彈窗使用:活動標題
  const [joinedActivityCount, setJoinedActivityCount] = useState(0);
  const [joinedActivityFull, setJoinedActivityFull] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  // 讓 URL 成為單一真相：監聽 location.search，自動同步 activeFilter
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const fromURL = sp.get('filter');
    // 空值或非法值 → 回到「全部活動」
    const next = ALLOWED_FILTERS.includes(fromURL || '') ? fromURL : '全部活動';
    setActiveFilter(next);
  }, [location.search]);

  // 為了讓卡片能在 joinStore 改變時自動重渲染(含其它頁/彈窗操作)
  const [joinedVersion, setJoinedVersion] = useState(0);
  useEffect(() => {
    const onJoinedChange = () => setJoinedVersion(v => v + 1);
    window.addEventListener(JOIN_EVENT, onJoinedChange);
    return () => window.removeEventListener(JOIN_EVENT, onJoinedChange);
  }, []);

  // 點按按鈕時：只改 URL 的 filter，activeFilter 交給上面 useEffect 同步
  const handleFilterClick = (tag, e) => {
    e?.preventDefault?.();
    const sp = new URLSearchParams(location.search);
    if (tag === '全部活動') {
      sp.delete('filter');
    } else {
      sp.set('filter', tag);
    }
    navigate({ pathname: location.pathname, search: `?${sp.toString()}` });
  };

  // 關閉彈窗
  const closeJoinModal = () => setShowJoinSuccessModal(false);

  // 總活動卡片component（已加上 groupSize，未特別標示者預設 10）
  const staticActivities = [
    {
      key: "night-market",
      image: "./img-Group/night-market.jpg",
      signupCount: 8,
      groupSize: 10,
      date: "2025/09/12 (五)",
      time: "18:00",
      location: "台灣 / 台北",
      title: "逛饒河夜市",
      description:
        "來去饒河夜市走走吧!集合好之後就一起逛,先買個剛出爐的胡椒餅,再來一杯冰冰涼涼的仙草茶,邊吃邊聊超chill~一路上想停哪就停哪,看到什麼想吃就買,沒有SOP、也不用趕行程,就是數位游牧者聚在一起隨興散步,順便認識新朋友。燈火通明、人聲熱鬧,美食香氣一路陪伴,聊工作、聊旅行、聊生活,輕鬆自在到不想回家,快來加入我們,用夜市的熱鬧氛圍開啟一個超好玩的夜晚吧!",
      detailLink: "/group2",
      tags: ["找吃飯夥伴", "找踩點夥伴"],
    },
    {
      key: "remote-coding",
      date: "2025/10/05 (日)",
      time: "09:00",
      location: "日本 / 東京",
      title: "遠端程式馬拉松",
      description:
        "不管你是前端、後端還是設計師,帶著筆電來參加。我們互相分享專案進度,順便交流技能,遠端工作也能一起衝刺。",
      detailLink: "/group2",
      tags: ["找工作夥伴"],
      groupSize: 10,
    },
    {
      key: "michelin",
      image: "./img-Group/dinner.jpg",
      signupCount: 6,
      groupSize: 10,
      date: "2025/09/20 (六)",
      time: "19:00",
      location: "泰國 / 曼谷",
      title: "一起征服米其林",
      description:
        "這次我們把筆電和咖啡廳先放一邊,換上米其林二星餐桌,享受主廚精心設計的 tasting menu,邊品嚐邊聊游牧工作與旅行故事。用餐後還會一起去昭披耶河畔小酌,看夜景繼續交流,這不是單純吃飯,而是一場奢華的游牧社交體驗。⚡️",
      detailLink: "/group2",
      tags: ["找吃飯夥伴", "找踩點夥伴"],
    },
    {
      key: "movie-night",
      image: "./img-Group/movie-night.jpg",
      signupCount: 6,
      groupSize: 10,
      date: "2025/09/19 (五)",
      time: "20:00",
      location: "台灣 / 台中",
      title: "戶外電影夜",
      description:
        "露天大螢幕、豆袋椅、爆米花,大家隨興坐著看一部好電影。邊看邊聊,享受微風和氛圍,一個舒服的夜晚。",
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "board-game-cafe",
      image: "./img-Group/board-game.jpg",
      signupCount: 5,
      groupSize: 10,
      date: "2025/09/26 (五)",
      time: "15:00",
      location: "台灣 / 高雄",
      title: "桌遊放鬆午後",
      description:
        "不用思考工作,來場輕鬆的桌遊下午茶。玩狼人、UNO、德國心臟病,邊笑邊聊,輕鬆建立新連結。",
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "dating",
      date: "2025/09/22 (一)",
      time: "13:00",
      location: "泰國 / 曼谷",
      title: "死了都要愛-聯誼活動",
      description:
        "活著如果不愛,那不如死了算,人在異國就是要來談場轟轟烈烈的戀愛,目前想約8男8女,想來場美式戀愛的朋友們快來。",
      detailLink: "/group2",
      tags: ["找Chill伴"],
      groupSize: 16,
    },
    {
      key: "surf",
      image: "./img-Group/surf.jpg",
      signupCount: 9,
      groupSize: 12,
      date: "2025/09/01 (一)",
      time: "7:00",
      location: "澳洲 / 黃金海岸",
      title: "來衝個早浪",
      description:
        "一起早起去海邊,踩著第一道陽光下水衝浪,滑幾道舒服的浪,讓身體醒過來,心也跟著放鬆。衝完再找間早餐店,好好開啟這一天,給生活一點鹹鹹的、自由的味道。",
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "beer-pong",
      image: "./img-Group/beer-pong.jpg",
      signupCount: 4,
      groupSize: 10,
      date: "2025/09/25 (四)",
      time: "17:00",
      location: "紐西蘭 / 奧克蘭",
      title: "投杯乒乓 Beer pong",
      description: `想看朋友一口接一口喝啤酒嗎?
快來展現你的精準投球能力吧!
**遊戲規則**:
- 每個回合內,每人有兩次機會投對方的杯子。
- 投進一個杯子,對方就要喝一口。
- 如果兩球進了不同的杯子,對方要拿三杯、喝三口。
- 如果兩球進了同一個杯子,對方要拿四杯、喝四口。`,
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "design-collab",
      image: "./img-Group/design.jpg",
      signupCount: 4,
      groupSize: 10,
      date: "2025/10/20 (一)",
      time: "14:00",
      location: "德國 / 柏林",
      title: "設計協作沙龍",
      description:
        "平面設計、UI/UX、插畫都歡迎,帶上你正在做的案子來討論。交流工具技巧,甚至找到能一起接案的夥伴。",
      detailLink: "/group2",
      tags: ["找工作夥伴"],
    },
    {
      key: "tennis",
      image: "./img-Group/tennis.jpg",
      signupCount: 5,
      groupSize: 10,
      date: "2025/10/13 (一)",
      time: "10:00",
      location: "葡萄牙 / 里斯本",
      title: "每周一網球",
      description: `手癢想打網球卻找不到球友嗎?
周一網球社歡迎你的加入!我們有哥等級的給你練練技術,也有初階等級的夥伴跟你一起搭配練習,快來加入!`,
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "emily-paris",
      image: "./img-Group/Paris.jpg",
      signupCount: 8,
      groupSize: 10,
      date: "2025/09/17 (三)",
      time: "8:00",
      location: "法國 / 巴黎",
      title: "一日艾蜜莉在巴黎",
      description:
        "打卡所有劇中的經典景點,化身艾蜜莉漫遊城市角落,走進每一幕熟悉場景,從咖啡館到花店,劇迷絕對不能錯過的一日朝聖行程,讓你拍好拍滿、浪漫爆棚!",
      detailLink: "/group2",
      tags: ["找踩點夥伴"],
    },
    {
      key: "sunset-hike",
      image: "./img-Group/sunset-hike.jpg",
      signupCount: 7,
      groupSize: 10,
      date: "2025/10/03 (五)",
      time: "16:30",
      location: "香港 / 香港",
      title: "夕陽輕登山",
      description:
        "慢慢走上小山,邊走邊聊天。到山頂剛好看到夕陽緩下的金色光,帶點運動、帶點浪漫,讓心情徹底放鬆。",
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "startup-ideas",
      image: "./img-Group/startup.jpg",
      signupCount: 5,
      groupSize: 10,
      date: "2025/09/27 (六)",
      time: "15:00",
      location: "新加坡 / 新加坡",
      title: "新創點子腦力激盪",
      description:
        "想創業卻卡住?帶上你的點子,我們來場頭腦風暴。不同背景的朋友互相激盪靈感,也許下個合作就在這裡誕生。",
      detailLink: "/group2",
      tags: ["找工作夥伴"],
    },
    {
      key: "rooftop-talk",
      image: "./img-Group/fireworks.jpeg",
      signupCount: 8,
      groupSize: 10,
      date: "2025/09/30 (二)",
      time: "20:00",
      location: "韓國 / 首爾",
      title: "屋頂談心",
      description:
        "心情不好,找不到好地方,好酒友,我們舉辦了一個專門給想一起看夜景,一起喝酒玩遊戲的屋頂聚會,現場提供超款桌遊跟特製調酒,別怕尷尬",
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "sydney-opera",
      image: "./img-Group/sydney-opera-house-view.jpg",
      signupCount: 10,
      groupSize: 10,
      date: "2025/09/28 (日)",
      time: "17:00",
      location: "澳洲 / 雪梨",
      title: "參觀雪梨歌劇院雪梨",
      description:
        "澳洲雪梨必去景點!但你一定還沒有進去參觀過吧!我們正在找10個人一起團體報名,有全中文解說的導遊師帶領,不用怕有聽沒有懂,目前報名人數已達5人,一人只要50澳幣,數量有限快來跟我們一起參加吧!結束還可以一起去",
      detailLink: "/group2",
      tags: ["找踩點夥伴"],
    },
    {
      key: "book-club",
      date: "2025/10/02 (四)",
      time: "14:00",
      location: "泰國 / 曼谷",
      title: "圖書館讀書會",
      description:
        "看完一本書獲得很多感悟後沒地方分享嗎?來參加我們新創的讀書會!不僅可以解決你的分享慾,還可以獲得很多推薦書籍",
      detailLink: "/group2",
      tags: ["找工作夥伴"],
      groupSize: 10,
    },
    {
      key: "photography-tour",
      image: "./img-Group/photography-tour.jpg",
      signupCount: 9,
      groupSize: 10,
      date: "2025/11/05 (二)",
      time: "10:00",
      location: "泰國 / 清邁",
      title: "古城攝影散步",
      description:
        `這趟攝影散步將帶領大家穿梭於清邁古城的巷弄與寺廟。帶上你的相機或手機,
一起捕捉光影下的金色佛塔、手工市集的繽紛布料,以及街頭巷尾的咖啡館日常。`,
      detailLink: "/group2",
      tags: ["找踩點夥伴"],
    },
    {
      key: "desert-meditation",
      date: "2025/10/15 (三)",
      time: "23:00",
      location: "摩洛哥 / 撒哈拉",
      title: "午夜星空冥想派對",
      description:
        "集合在撒哈拉沙丘的帳篷營地,等夜幕完全降臨,大家先靜默片刻,讓自己跟沙漠的寂靜同步。接著我會帶領一個「星空冥想體驗」,透過引導呼吸和專注,把注意力放在滿天星斗與銀河,讓腦袋從白天的工作模式切換成放鬆狀態。之後我們會進行「靈感分享環節」,每個人可以在沙漠夜空下分享自己最想完成的一個夢想,或是最近茁芽的創意。最後,我準備了小型投影裝置,在帳篷牆上映放一段「游牧者的旅程紀錄片」或是大家共同的短片,陪伴彼此直到凌晨。這是一個融合靈性、創意、與游牧連結的夜晚。",
      detailLink: "/group2",
      tags: ["找Chill伴"],
      groupSize: 12,
    },
    {
      key: "bbq-88",
      image: "./img-Group/BBQ.jpg",
      signupCount: 9,
      groupSize: 10,
      date: "2025/08/08 (五)",
      time: "11:30",
      location: "美國 / 加州",
      title: "88BBQ",
      description:
        `父親節帶爸爸來參加烤肉聚會吧!
人數限制10人,當天每個人帶自己喜歡的食材來參加,請在報名時就填寫在報名表上,大家快來參加,叫朋友一起來!`,
      detailLink: "/group2",
      tags: ["找吃飯夥伴", "找Chill伴"],
    },
    {
      key: "co-work-cafe",
      image: "./img-Group/co-work-cafe.jpg",
      signupCount: 7,
      groupSize: 10,
      date: "2025/09/18 (四)",
      time: "10:00",
      location: "台灣 / 台北",
      title: "咖啡廳共工日",
      description:
        "找個安靜的咖啡廳,一起開電腦工作。有人寫程式、有人剪片,不同領域的游牧者互相陪伴,彼此專注卻不孤單。",
      detailLink: "/group2",
      tags: ["找工作夥伴"],
    },
    {
      key: "content-sprint",
      image: "./img-Group/content.jpg",
      signupCount: 8,
      groupSize: 10,
      date: "2025/10/10 (五)",
      time: "11:00",
      location: "泰國 / 清邁",
      title: "內容創作者快閃日",
      description:
        "部落客、Youtuber、IG經營者,一起挑戰三小時快閃內容製作。大家互相給回饋,讓創作不再是孤軍奮戰。",
      detailLink: "/group2",
      tags: ["找工作夥伴", "找Chill伴"],
    },
  ];

  /** 重要:使用一個 activities state 由父層統一管理人數 */
  const [activities, setActivities] = useState(staticActivities);

  // 如果從 group3 帶入新活動,插到最前面(標記 isUserActivity 以便排序在前)
  useEffect(() => {
    const newActivity = location.state?.newActivity;
    if (newActivity) {
      setActivities(prev => {
        const idKey = newActivity.key || newActivity.id;
        const filtered = prev.filter(a => (a.key || a.id) !== idKey);
        return [{ ...newActivity, isUserActivity: true, groupSize: newActivity.groupSize ?? 10 }, ...filtered];
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // 切換加入/取消
  const handleToggleJoin = (activity) => {
    const auth = getAuthFromLS();
    const loggedIn = !!(auth && (auth.isAuthed || auth.isLogin || auth.user));
    if (!loggedIn) {
      window.__ndOpenLogin?.();
      return;
    }

    const id = activity.key ?? activity.id;
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
          signupCount: activity.signupCount ?? 0,
          detailLink: activity.detailLink || "/group2",
          groupSize: activity.groupSize ?? 10,
        },
        auth
      );
      // 彈窗資訊
      const newCount = Math.max(0, (activity.signupCount || 0) + 1);
      const fullSize = activity.groupSize ?? 10;
      setJoinedActivityTitle(activity.title);
      setJoinedActivityCount(newCount);
      setJoinedActivityFull(fullSize);
    }

    // 同步卡片上的人數
    setActivities(prev =>
      prev.map(a => {
        const aid = a.key ?? a.id;
        if (aid !== id) return a;
        const delta = already ? -1 : +1;
        return { ...a, signupCount: Math.max(0, (a.signupCount || 0) + delta) };
      })
    );

    if (!already) setShowJoinSuccessModal(true);
  };

  // 依篩選結果過濾
  const filtered = activities.filter(a =>
    activeFilter === '全部活動' || (a.tags || []).includes(activeFilter)
  );

  // 用 isUserActivity 讓新建立的活動永遠排在前面
  const userFiltered = filtered.filter(a => a.isUserActivity);
  const staticFiltered = filtered.filter(a => !a.isUserActivity);
  const reorderedFiltered = [...userFiltered, ...staticFiltered];

  // 「更多活動」按鈕:不足就循環補滿,再截斷至 visibleCount
  const getPagedActivities = () => {
    if (reorderedFiltered.length === 0) return [];
    const result = [];
    while (result.length < visibleCount) {
      result.push(...reorderedFiltered);
    }
    return result.slice(0, visibleCount);
  };

  const handleViewMore = () => setVisibleCount(prev => prev + 6);

  const pagedActivities = getPagedActivities();

  // 按鈕列:使用 IntersectionObserver 觸發由左到右彈出
  const { ref: btnsRef, inView: btnsShow } = useInView(0.5);

  // 小包裝:符合就顯示,不符合就不渲染
  const FilterableCard = ({ activeFilter, ...props }) => {
    const tags = props.tags || [];
    const show = activeFilter === '全部活動' || tags.includes(activeFilter);
    if (!show) return null;
    return (
      <div className="card-fade-wrapper">
        <GroupCard {...props} />
      </div>
    );
  };

  return (
    <main>
      {/* Banner 區:不動背景圖,只對文字做淡入 */}
      <section id="groupBanner">
        <div className='groupSlogan'>
          <FadeInOnScroll as="h3">Work, Travel, Connect Together.</FadeInOnScroll>
          <FadeInOnScroll className="line" />
          <FadeInOnScroll as="h2">揪團活動</FadeInOnScroll>
          <FadeInOnScroll>
            <Link to="/group3" className="btn-create">發起揪團</Link>
          </FadeInOnScroll>
          <figure className="locScroll">
            <img src="./img-Location/scroll.svg" alt="icon" />
          </figure>
        </div>
      </section>

      {/* 內容區 */}
      <section id="group-content">
        {/* 主標題(淡入) */}
        <div className="g-content-title">
          <FadeInOnScroll as="h3">Travel solo, connect together!</FadeInOnScroll>
          <FadeInOnScroll className="line" />
          <FadeInOnScroll as="h2">漂流集合站!</FadeInOnScroll>
        </div>

        {/* 各揪團按鈕(篩選功能) ── 左到右逐一彈出 */}
        <div className="button-list">
          <ul
            ref={btnsRef}
            className={`group-buttons stagger ${btnsShow ? 'stagger-show' : ''}`}
          >
            {/* 這裡仍保留 <a>，也可改成 <Link>；點擊時只改 URL，狀態交給 useEffect */}
            <li><a href={`?`} className={activeFilter === '全部活動' ? 'active' : ''} onClick={(e) => handleFilterClick('全部活動', e)}>全部活動</a></li>
            <li><a href={`?filter=${encodeURIComponent('找吃飯夥伴')}`} className={activeFilter === '找吃飯夥伴' ? 'active' : ''} onClick={(e) => handleFilterClick('找吃飯夥伴', e)}>找吃飯夥伴</a></li>
            <li><a href={`?filter=${encodeURIComponent('找工作夥伴')}`} className={activeFilter === '找工作夥伴' ? 'active' : ''} onClick={(e) => handleFilterClick('找工作夥伴', e)}>找工作夥伴</a></li>
            <li><a href={`?filter=${encodeURIComponent('找踩點夥伴')}`} className={activeFilter === '找踩點夥伴' ? 'active' : ''} onClick={(e) => handleFilterClick('找踩點夥伴', e)}>找踩點夥伴</a></li>
            <li><a href={`?filter=${encodeURIComponent('找合租室友')}`} className={activeFilter === '找合租室友' ? 'active' : ''} onClick={(e) => handleFilterClick('找合租室友', e)}>找合租室友</a></li>
            <li><a href={`?filter=${encodeURIComponent('找Chill伴')}`} className={activeFilter === '找Chill伴' ? 'active' : ''} onClick={(e) => handleFilterClick('找Chill伴', e)}>找Chill伴</a></li>
          </ul>
        </div>

        {/* 所有卡片合輯(每張卡片淡入) */}
        <div className='cards-container' data-rev={joinedVersion}>
          {pagedActivities.length === 0 ? (
            <p className='no-activities'>目前沒有符合條件的活動</p>
          ) : (
            pagedActivities.map((activity, idx) => {
              const id = activity.key ?? activity.id;
              const joined = isJoined(id); // 讀 localStorage 狀態
              return (
                <FilterableCard
                  key={(id || 'activity') + '-' + idx}
                  activeFilter={activeFilter}
                  id={id}
                  image={activity.image}
                  signupCount={activity.signupCount}
                  date={activity.date}
                  time={activity.time}
                  location={activity.location}
                  title={activity.title}
                  description={activity.description}
                  detailLink={activity.detailLink}
                  tags={activity.tags}
                  joined={joined}
                  onToggleJoin={() => handleToggleJoin(activity)}
                  groupSize={activity.groupSize ?? 10}
                />
              );
            })
          )}
        </div>

        {/* 更多活動(淡入) */}
        <FadeInOnScroll className='g1-view-more'>
          <button className='view-more-group-btn' onClick={handleViewMore}>
            更多活動
          </button>
        </FadeInOnScroll>
      </section>

      {/* 加入成功彈窗 - 固定在整個畫面中央 */}
      {showJoinSuccessModal && (
        <div className="group-join-modal-overlay" onClick={closeJoinModal}>
          <div className="group-join-success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="group-join-modal-content group-join-fade-in show">
              <div className="group-join-success-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="#F4D000" />
                  <path d="M18 30L26 38L42 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2>加入成功</h2>
              <p>你已成功加入「{joinedActivityTitle}」活動！</p>

              {/* 活動資訊補充 */}
              <p className="group-join-extra">
                目前 <strong>{joinedActivityCount}</strong> 人報名 ｜ <strong>{joinedActivityFull}</strong> 人滿團
              </p>

              {/* 會員專區 / 活動紀錄連結 */}
              <p className="group-join-links">
                前往 <Link to="/member" className="join-link" onClick={closeJoinModal}>會員專區</Link> 查看 <Link to="/membergroup" className="join-link" onClick={closeJoinModal}>活動紀錄</Link>
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

export default Group;
