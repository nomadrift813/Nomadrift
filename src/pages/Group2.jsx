import React, { useEffect, useMemo, useRef, useState } from "react";
import '../sass/scss/group2.scss'
import { Link } from "react-router-dom"
import GroupCard from '../component/GroupCard'

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
const FadeInOnScroll = ({ as: Tag = 'div', className = '', children, threshold = 0.5 }) => {
    const { ref, inView } = useInView(threshold);
    return (
        <Tag ref={ref} className={`fade-in ${inView ? 'show' : ''} ${className}`}>
            {children}
        </Tag>
    );
};

/** 修正版：不使用淡入、只負責水平無限輪播 */
const CardCarousel = ({ items }) => {
    const viewportRef = useRef(null);
    const trackRef = useRef(null);
    const [oneSetWidth, setOneSetWidth] = useState(0);  // 一組卡片的總寬（px）
    const [x, setX] = useState(0);                      // translateX
    const pausedRef = useRef(false);                    // 滑入暫停
    const speedPxPerFrame = 1.0;                        // 速度（可調）

    // 產出 3 組一樣的卡片，做無縫循環
    const tripleSets = useMemo(() => [items, items, items], [items]);

    // 量測第一組寬度
    useEffect(() => {
        const calc = () => {
            if (!trackRef.current) return;
            const firstSet = trackRef.current.querySelector(".carousel-set");
            if (firstSet) {
                const w = firstSet.scrollWidth;
                if (w !== oneSetWidth) setOneSetWidth(w);
            }
        };
        calc();

        const ro = new ResizeObserver(calc);
        if (trackRef.current) ro.observe(trackRef.current);
        return () => ro.disconnect();
    }, [items, oneSetWidth]);

    // 連續位移（hover 暫停）
    useEffect(() => {
        let raf;
        const step = () => {
            if (!pausedRef.current && oneSetWidth > 0) {
                setX(prev => {
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
        <div className="carousel" ref={viewportRef}>
            {/* 標題不做淡入，直接顯示 */}
            <h3 className="carousel-title-en">More Fun Together</h3>
            <div className="line" />
            <h2 className="carousel-title">更多揪團</h2>

            {/* viewport 不做淡入，track 以 JS 控制位移 */}
            <div
                className="carousel-viewport"
                onMouseEnter={() => (pausedRef.current = true)}
                onMouseLeave={() => (pausedRef.current = false)}
            >
                <div
                    className="carousel-track"
                    ref={trackRef}
                    style={{ transform: `translateX(${x}px)` }}
                >
                    {tripleSets.map((set, gi) => (
                        <div className="carousel-set" key={`set-${gi}`}>
                            {set.map((card, ci) => (
                                <div className="carousel-card" key={`card-${gi}-${card.id ?? ci}`}>
                                    <GroupCard
                                        image={card.image}
                                        signupCount={card.signupCount}
                                        date={card.date}
                                        time={card.time}
                                        location={card.location}
                                        title={card.title}
                                        description={card.description}
                                        detailLink={card.detailLink}
                                        onJoin={() => console.log("加入活動")}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Group2 = () => {
    const groupCardData = [
        {
            id: 1,
            image: "./img-Group/fireworks.jpeg",
            signupCount: 8,
            date: "2025/09/30",
            time: "20:00",
            location: "首爾",
            title: "屋頂談心",
            description: "心情不好，找不到好地方，好酒友，我們舉辦了一個專門給想一起看夜景，一起喝酒玩遊戲的屋頂聚會，現場提供超款桌遊跟特製調酒，別怕尷尬",
            detailLink: "/group2",
        },
        {
            id: 2,
            image: "./img-Group/surf.jpg",
            signupCount: 9,
            date: "2025/09/01",
            time: "7:00",
            location: "黃金海岸",
            title: "來衝個早浪",
            description: "一起早起去海邊，踩著第一道陽光下水衝浪，滑幾道舒服的浪，讓身體醒過來，心也跟著放鬆。衝完再找間早餐店，好好開啟這一天，給生活一點鹹鹹的、自由的味道。",
            detailLink: "/group2",
        },
        {
            id: 3,
            image: "./img-Group/tennis.jpg",
            signupCount: 5,
            date: "2025/10/13",
            time: "10:00",
            location: "里斯本",
            title: "每周一網球",
            description: "手癢想打網球卻找不到球友嗎?\n周一網球社歡迎你的加入，我們有哥等級的給你練練技術，也有初階等級的夥伴跟你一起搭配練習，快來加入!",
            detailLink: "/group2",
        },
        {
            id: 4,
            image: "./img-Group/Paris.jpg",
            signupCount: 8,
            date: "2025/09/17",
            time: "8:00",
            location: "巴黎",
            title: "一日艾蜜莉在巴黎",
            description: "打卡所有劇中的經典景點，化身艾蜜莉漫遊城市角落，走進每一幕熟悉場景，從咖啡館到花店，劇迷絕對不能錯過的一日朝聖行程，讓你拍好拍滿、浪漫爆棚！",
            detailLink: "/group2",
        },
        {
            id: 5,
            image: "./img-Group/sydney-opera-house-view.jpg",
            signupCount: 10,
            date: "2025/09/28",
            time: "17:00",
            location: "雪梨",
            title: "參觀雪梨歌劇院雪梨",
            description: "澳洲雪梨必去景點!但你一定還沒有進去參觀過吧!我們正在找10個人一起團體報名，有全中文解說的導遊帶領，不用怕有聽沒有懂，目前報名人數已達5人，一人只要50澳幣，數量有限快來跟我們一起參加吧!結束還可以一起去",
            detailLink: "/group2",
        },
    ];

    // --- 新增：留言狀態 ---
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
        setComments(prev => [
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
        <main>
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
                        <img src="./img-Group/night-market.jpg" alt="" />
                    </FadeInOnScroll>

                    <div className="activity-introduction">
                        <FadeInOnScroll as="li">
                            <h3>活動類型</h3>
                            <p>#找吃飯夥伴 #找踩點夥伴</p>
                        </FadeInOnScroll>

                        <FadeInOnScroll as="li">
                            <h3>活動時間</h3>
                            <p>2025/ 09/ 12　18:00 ~ 22:00</p>
                        </FadeInOnScroll>

                        <FadeInOnScroll as="li">
                            <h3>集合地點</h3>
                            <p>台灣/ 台北市　捷運松山站 4 號出口</p>
                        </FadeInOnScroll>

                        <FadeInOnScroll as="li">
                            <h3>報名截止日</h3>
                            <p>2025/ 09/ 10　23:59</p>
                        </FadeInOnScroll>

                        <FadeInOnScroll className="activity-btn">
                            {/* <button className="pm">私訊揪團主</button> */}
                            <button className="join">
                                報名參加
                                <img src="./img-Group/right-arrow.svg" alt="right-arrow" />
                            </button>
                        </FadeInOnScroll>
                    </div>
                </div>
            </section>

            {/* 活動說明 */}
            <article id="activity-content">
                <div className="content-title">
                    <FadeInOnScroll as="h3">Activity content</FadeInOnScroll>
                    <FadeInOnScroll className="line" />
                    <FadeInOnScroll as="h2">活動說明</FadeInOnScroll>
                    <FadeInOnScroll as="p">
                        來去饒河夜市走走吧！集合好之後就一起逛，先買個剛出爐的胡椒餅，再來一杯冰冰涼涼的仙草茶，邊吃邊聊超chill～一路上想停哪就停哪，看到什麼想吃就買，沒有SOP、也不用趕行程，就是數位遊牧者聚在一起隨興散步，順便認識新朋友。燈火通明、人聲熱鬧，美食香氣一路陪伴，聊工作、聊旅行、聊生活，輕鬆自在到不想回家，快來加入我們，用夜市的熱鬧氛圍開啟一個超好玩的夜晚吧！
                    </FadeInOnScroll>
                </div>
            </article>

            {/* 發起人+報名人數 */}
            <section id="people-info">
                <FadeInOnScroll className="organizer-info">
                    <h3>發起人</h3>
                    <p>Peggy Chen</p>
                    <img className="people-img" src="./img-Group/people/organizer.jpg" alt="" />
                </FadeInOnScroll>

                <FadeInOnScroll className="participants">
                    <h3>報名人數</h3>
                    <p>7 人已報名</p>

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

            {/* 留言區 */}
            <section id='activity-comments'>
                <FadeInOnScroll as="h3">留言區</FadeInOnScroll>

                {comments.map((c, idx) => (
                    <FadeInOnScroll className='comment' key={`c-${idx}`}>
                        <img className="commenter-photo" src={c.photo} alt="" />
                        <div className='comment-content'>
                            <p className='commenter-name'>{c.name}</p>
                            <p>{c.text}</p>
                        </div>
                    </FadeInOnScroll>
                ))}

                <FadeInOnScroll className='comment-user'>
                    <img className="commenter-photo" src="./img-Group/people/People-(11).jpg" alt="" />
                    <div className='comment-content'>
                        <p className='commenter-name'>Andy Chen</p>
                        <form className='comment-input-row' onSubmit={handleAddComment}>
                            <textarea
                                className='input'
                                type="text"
                                placeholder="我要留言"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                aria-label="新增留言內容"
                            />
                            <button type="submit" className="btn-add-comment">送出</button>
                        </form>
                    </div>
                </FadeInOnScroll>
            </section>

            {/* 更多揪團（Carousel 無淡入） */}
            <section id="more-activities">
                <CardCarousel items={groupCardData} />
            </section>

            {/* 發起揪團 */}
            <section id="createGroup">
                <div className="createGroup-title">
                    <FadeInOnScroll as="h2">沒有喜歡的團？</FadeInOnScroll>
                    <FadeInOnScroll className="line" />
                    <FadeInOnScroll>
                        <Link to="/group3" className="btn2-create">發起揪團</Link>
                    </FadeInOnScroll>
                </div>
            </section>
        </main>
    );
};

export default Group2;
