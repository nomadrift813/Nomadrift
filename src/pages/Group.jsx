import '../sass/scss/group.scss'
import { Link, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import GroupCard from '../component/GroupCard'

/** 共用：觀察元素是否進入畫面 50% */
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

/** 元件：任意內容套用淡入（y:-3px → 0） */
const FadeInOnScroll = ({ as: Tag = 'div', className = '', children, threshold = 0.5 }) => {
  const { ref, inView } = useInView(threshold);
  return (
    <Tag ref={ref} className={`fade-in ${inView ? 'show' : ''} ${className}`}>
      {children}
    </Tag>
  );
};

const Group = () => {
  // state + handler
  const [activeFilter, setActiveFilter] = useState('全部活動');
  const [userActivities, setUserActivities] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12); // 初始顯示 12 張
  const location = useLocation();

  const handleFilterClick = (tag, e) => {
    e?.preventDefault?.();      // 避免 <a href="#"> 跳到頁首
    setActiveFilter(tag);
  };

  // 檢查是否有從 Group3 頁面傳來的新活動
  useEffect(() => {
    if (location.state?.newActivity) {
      setUserActivities([location.state.newActivity]);
      // 清除 navigation state，避免重複添加
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // 小包裝：符合就顯示，不符合就不渲染
  const FilterableCard = ({ activeFilter, ...props }) => {
    const tags = props.tags || [];
    const show = activeFilter === '全部活動' || tags.includes(activeFilter);
    if (!show) return null;
    // 外層套淡入效果，內層仍由 GroupCard 渲染
    return (
      <FadeInOnScroll className="card-fade-wrapper">
        <GroupCard {...props} />
      </FadeInOnScroll>
    );
  };

  // 預設的活動數據（含你原本與新增的）
  const staticActivities = [
    {
      key: "night-market",
      image: "./img-Group/night-market.jpg",
      signupCount: 8,
      date: "2025/09/12",
      time: "18:00",
      location: "台灣",
      title: "逛饒河夜市",
      description: "來去饒河夜市走走吧！集合好之後就一起逛，先買個剛出爐的胡椒餅，再來一杯冰冰涼涼的仙草茶，邊吃邊聊超chill～一路上想停哪就停哪，看到什麼想吃就買，沒有SOP、也不用趕行程，就是數位遊牧者聚在一起隨興散步，順便認識新朋友。燈火通明、人聲熱鬧，美食香氣一路陪伴，聊工作、聊旅行、聊生活，輕鬆自在到不想回家，快來加入我們，用夜市的熱鬧氛圍開啟一個超好玩的夜晚吧！",
      detailLink: "/group2",
      tags: ["找吃飯夥伴", "找踩點夥伴"],
    },
    {
      key: "remote-coding",
      // image: "./img-Group/coding.jpg",
      // signupCount: 6,
      date: "2025/10/05",
      time: "09:00",
      location: "東京",
      title: "遠端程式馬拉松",
      description: "不管你是前端、後端還是設計師，帶著筆電來參加。我們互相分享專案進度，順便交換技能，遠端工作也能一起衝刺。",
      detailLink: "/group2",
      tags: ["找工作夥伴"],
    },
    {
      key: "michelin",
      image: "./img-Group/dinner.jpg",
      signupCount: 6,
      date: "2025/09/20",
      time: "19:00",
      location: "曼谷",
      title: "一起征服米其林",
      description: "這次我們把筆電和咖啡廳先放一邊，換上米其林二星餐桌，享受主廚精心設計的 tasting menu，邊品嚐邊聊遊牧工作與旅行故事。用餐後還會一起去昭披耶河畔小酌，看夜景繼續交流，這不是單純吃飯，而是一場奢華的遊牧社交體驗。Ⱟ",
      detailLink: "/group2",
      tags: ["找吃飯夥伴", "找踩點夥伴"],
    },
    {
      key: "movie-night",
      image: "./img-Group/movie-night.jpg",
      signupCount: 6,
      date: "2025/09/19",
      time: "20:00",
      location: "台中",
      title: "戶外電影夜",
      description: "露天大螢幕、豆袋椅、爆米花，大家隨興坐著看一部好電影。邊看邊聊，享受微風和氛圍，一個舒服的夜晚。",
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "board-game-cafe",
      image: "./img-Group/board-game.jpg",
      signupCount: 5,
      date: "2025/09/26",
      time: "15:00",
      location: "高雄",
      title: "桌遊放鬆午後",
      description: "不用思考工作，來場輕鬆的桌遊下午茶。玩狼人、UNO、德國心臟病，邊笑邊聊，輕鬆建立新連結。",
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },

    {
      key: "dating",
      date: "2025/09/22",
      time: "13:00",
      location: "泰國",
      title: "死了都要愛-聯誼活動",
      description: "活著如果不愛，那不如死了算，人在異國就是要來談場轟轟烈烈的戀愛，目前想約8男8女，想來場美式戀愛的朋友們快來。",
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "surf",
      image: "./img-Group/surf.jpg",
      signupCount: 9,
      date: "2025/09/01",
      time: "7:00",
      location: "黃金海岸",
      title: "來衝個早浪",
      description: "一起早起去海邊，踩著第一道陽光下水衝浪，滑幾道舒服的浪，讓身體醒過來，心也跟著放鬆。衝完再找間早餐店，好好開啟這一天，給生活一點鹹鹹的、自由的味道。",
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "beer-pong",
      image: "./img-Group/beer-pong.jpg",
      signupCount: 4,
      date: "2025/09/25",
      time: "17:00",
      location: "紐西蘭",
      title: "投杯乒乓 Beer pong",
      description: `想看朋友一口接一口喝啤酒嗎？
快來展現你的精準投球能力吧！
**遊戲要則**：
- 每個回合內，每人有兩次機會投對方的杯子。
- 投進一個杯子，對方就要喝一口。
- 如果兩球進了不同的杯子，對方要拿三杯、喝三口。
- 如果兩球進了同一個杯子，對方要拿四杯、喝四口。`,
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "design-collab",
      image: "./img-Group/design.jpg",
      signupCount: 4,
      date: "2025/10/20",
      time: "14:00",
      location: "柏林",
      title: "設計協作沙龍",
      description: "平面設計、UI/UX、插畫都歡迎，帶上你正在做的案子來討論。交流工具技巧，甚至找到能一起接案的夥伴。",
      detailLink: "/group2",
      tags: ["找工作夥伴"],
    },
    {
      key: "tennis",
      image: "./img-Group/tennis.jpg",
      signupCount: 5,
      date: "2025/10/13",
      time: "10:00",
      location: "里斯本",
      title: "每周一網球",
      description: `手癢想打網球卻找不到球友嗎?
周一網球社歡迎你的加入，我們有哥等級的給你練練技術，也有初階等級的夥伴跟你一起搭配練習，快來加入!`,
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "emily-paris",
      image: "./img-Group/Paris.jpg",
      signupCount: 8,
      date: "2025/09/17",
      time: "8:00",
      location: "巴黎",
      title: "一日艾蜜莉在巴黎",
      description: "打卡所有劇中的經典景點，化身艾蜜莉漫遊城市角落，走進每一幕熟悉場景，從咖啡館到花店，劇迷絕對不能錯過的一日朝聖行程，讓你拍好拍滿、浪漫爆棚！",
      detailLink: "/group2",
      tags: ["找踩點夥伴"],
    },
    {
      key: "sunset-hike",
      image: "./img-Group/sunset-hike.jpg",
      signupCount: 7,
      date: "2025/10/03",
      time: "16:30",
      location: "香港",
      title: "夕陽輕登山",
      description: "慢慢走上小山，邊走邊聊天。到山頂剛好看到夕陽灑下的金色光，帶點運動、帶點浪漫，讓心情徹底放鬆。",
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "startup-ideas",
      image: "./img-Group/startup.jpg",
      signupCount: 5,
      date: "2025/09/27",
      time: "15:00",
      location: "新加坡",
      title: "新創點子腦力激盪",
      description: "想創業卻卡住？帶上你的點子，我們來場頭腦風暴。不同背景的朋友互相激盪靈感，也許下個合作就在這裡誕生。",
      detailLink: "/group2",
      tags: ["找工作夥伴"],
    },
    {
      key: "rooftop-talk",
      image: "./img-Group/fireworks.jpeg",
      signupCount: 8,
      date: "2025/09/30",
      time: "20:00",
      location: "首爾",
      title: "屋頂談心",
      description: "心情不好，找不到好地方，好酒友，我們舉辦了一個專門給想一起看夜景，一起喝酒玩遊戲的屋頂聚會，現場提供超款桌遊跟特製調酒，別怕尷尬",
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "sydney-opera",
      image: "./img-Group/sydney-opera-house-view.jpg",
      signupCount: 10,
      date: "2025/09/28",
      time: "17:00",
      location: "雪梨",
      title: "參觀雪梨歌劇院雪梨",
      description: "澳洲雪梨必去景點!但你一定還沒有進去參觀過吧!我們正在找10個人一起團體報名，有全中文解說的導遊師帶領，不用怕有聽沒有懂，目前報名人數已達5人，一人只要50澳幣，數量有限快來跟我們一起參加吧!結束還可以一起去",
      detailLink: "/group2",
      tags: ["找踩點夥伴"],
    },
    {
      key: "book-club",
      date: "2025/10/02",
      time: "14:00",
      location: "泰國",
      title: "圖書館讀書會",
      description: "看完一本書獲得很多感悟後沒地方分享嗎?來參加我們新創的讀書會，不僅可以解決你的分享慾，還可以獲得很多推薦書籍",
      detailLink: "/group2",
      tags: ["找工作夥伴"],
    },
    {
      key: "photography-tour",
      image: "./img-Group/photography-tour.jpg",
      signupCount: 9,
      date: "2025/11/05",
      time: "10:00",
      location: "清邁",
      title: "古城攝影散步",
      description: `這趟攝影散步將帶領大家穿梭於清邁古城的巷弄與寺廟。帶上你的相機或手機，
一起捕捉光影下的金色佛塔、手工市集的繽紛布料，以及街頭巷尾的咖啡館日常。`,
      detailLink: "/group2",
      tags: ["找踩點夥伴"],
    },
    {
      key: "desert-meditation",
      date: "2025/10/15",
      time: "23:00",
      location: "摩洛哥",
      title: "午夜星空冥想派對",
      description: "集合在撒哈拉沙丘的帳篷營地，等夜幕完全降臨，大家先靜坐片刻，讓自己跟沙漠的寂靜同步。接著我會帶領一個「星空冥想體驗」，透過引導呼吸和專注，把注意力放在滿天星斗與銀河，讓腦袋從白天的工作模式切換成放鬆狀態。之後我們會進行「靈感分享環節」，每個人可以在沙漠夜空下分享自己最想完成的一個夢想，或是最近萌芽的創意。最後，我準備了小型投影裝置，在帳篷牆上映放一段「遊牧者的旅程紀錄片」或是大家共同的短片，陪伴彼此直到凌晨。這是一個融合靈性、創意、與遊牧連結的夜晚。",
      detailLink: "/group2",
      tags: ["找Chill伴"],
    },
    {
      key: "bbq-88",
      image: "./img-Group/BBQ.jpg",
      signupCount: 9,
      date: "2025/08/08",
      time: "11:30",
      location: "加州",
      title: "88BBQ",
      description: `父親節帶爸爸來參加烤肉聚會吧！
人數限制10人，當天每個人帶自己喜歡的食材來參加，請在報名時就填寫在報名表上，大家快來參加，叫朋友一起來!`,
      detailLink: "/group2",
      tags: ["找吃飯夥伴", "找Chill伴"],
    },
    {
      key: "co-work-cafe",
      image: "./img-Group/co-work-cafe.jpg",
      signupCount: 7,
      date: "2025/09/18",
      time: "10:00",
      location: "台北",
      title: "咖啡廳共工日",
      description: "找個安靜的咖啡廳，一起開電腦工作。有人寫程式、有人剪片，不同領域的遊牧者互相陪伴，彼此專注又不孤單。",
      detailLink: "/group2",
      tags: ["找工作夥伴"],
    },


    {
      key: "content-sprint",
      image: "./img-Group/content.jpg",
      signupCount: 8,
      date: "2025/10/10",
      time: "11:00",
      location: "清邁",
      title: "內容創作者快閃日",
      description: "部落客、Youtuber、IG經營者，一起挑戰三小時快閃內容製作。大家互相給回饋，讓創作不再是孤軍奮戰。",
      detailLink: "/group2",
      tags: ["找工作夥伴", "找Chill伴"],
    },


  ];

  // 合併用戶活動 + 靜態活動（用戶活動會在最前面）
  const baseActivities = [...userActivities, ...staticActivities];

  // 依篩選結果過濾
  const filtered = baseActivities.filter(a =>
    activeFilter === '全部活動' || (a.tags || []).includes(activeFilter)
  );

  // 確保用戶活動始終在前面
  const userFiltered = filtered.filter(a => userActivities.some(ua => ua.id === a.id));
  const staticFiltered = filtered.filter(a => !userActivities.some(ua => ua.id === a.id));
  const reorderedFiltered = [...userFiltered, ...staticFiltered];

  // 讓「更多活動」按鈕每次都再顯示 12 張卡片：
  // 當 reorderedFiltered 不足 visibleCount，就用原本順序重複補齊，再截斷到 visibleCount。
  const getPagedActivities = () => {
    if (reorderedFiltered.length === 0) return [];
    const result = [];
    while (result.length < visibleCount) {
      result.push(...reorderedFiltered);
    }
    return result.slice(0, visibleCount);
  };

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 12); // 每按一次就增加 12 張
  };

  const pagedActivities = getPagedActivities();

  // 按鈕列：使用 IntersectionObserver 觸發由左到右彈出
  const { ref: btnsRef, inView: btnsShow } = useInView(0.5);

  return (
    <main>
      {/* Banner 區：不動背景圖，只對文字做淡入 */}
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
        {/* 主標題（淡入） */}
        <div className="g-content-title">
          <FadeInOnScroll as="h3">Travel solo, connect together!</FadeInOnScroll>
          <FadeInOnScroll className="line" />
          <FadeInOnScroll as="h2">漂流集合站！</FadeInOnScroll>
        </div>

        {/* 各揪團按鈕(篩選功能) —— 左到右逐一彈出 */}
        <div className="button-list">
          <ul
            ref={btnsRef}
            className={`group-buttons stagger ${btnsShow ? 'stagger-show' : ''}`}
          >
            <li>
              <a
                href="#"
                className={activeFilter === '全部活動' ? 'active' : ''}
                onClick={(e) => handleFilterClick('全部活動', e)}
              >
                全部活動
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeFilter === '找吃飯夥伴' ? 'active' : ''}
                onClick={(e) => handleFilterClick('找吃飯夥伴', e)}
              >
                找吃飯夥伴
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeFilter === '找工作夥伴' ? 'active' : ''}
                onClick={(e) => handleFilterClick('找工作夥伴', e)}
              >
                找工作夥伴
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeFilter === '找踩點夥伴' ? 'active' : ''}
                onClick={(e) => handleFilterClick('找踩點夥伴', e)}
              >
                找踩點夥伴
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeFilter === '找合租室友' ? 'active' : ''}
                onClick={(e) => handleFilterClick('找合租室友', e)}
              >
                找合租室友
              </a>
            </li>
            <li>
              <a
                href="#"
                className={activeFilter === '找Chill伴' ? 'active' : ''}
                onClick={(e) => handleFilterClick('找Chill伴', e)}
              >
                找Chill伴
              </a>
            </li>
          </ul>
        </div>

        {/* 所有卡片合輯（每張卡片淡入） */}
        <div className='cards-container'>
          {pagedActivities.length === 0 ? (
            <p className='no-activities'>目前沒有符合條件的活動</p>
          ) : (
            pagedActivities.map((activity, idx) => (
              <FilterableCard
                key={(activity.key || activity.id || 'activity') + '-' + idx} // 保證重複時 key 仍唯一
                activeFilter={activeFilter}
                image={activity.image}
                signupCount={activity.signupCount}
                date={activity.date}
                time={activity.time}
                location={activity.location}
                title={activity.title}
                description={activity.description}
                detailLink={activity.detailLink}
                tags={activity.tags}
                onJoin={() => console.log("加入活動")}
              />
            ))
          )}
        </div>

        {/* 更多活動（淡入） */}
        <FadeInOnScroll className='g1-view-more'>
          <button
            className='view-more-group-btn'
            onClick={handleViewMore}
          >
            更多活動
          </button>
        </FadeInOnScroll>
      </section>
    </main>
  )
}

export default Group