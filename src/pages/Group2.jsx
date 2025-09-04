import React, { useEffect, useMemo, useRef, useState } from "react";
import '../sass/scss/group2.scss'
import { Link } from "react-router-dom"
import GroupCard from '../component/GroupCard'

const CardCarousel = ({ items }) => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const [translateX, setTranslateX] = useState(0);
    const [setWidth, setSetWidth] = useState(0);

    // 是否暫停（hover 時為 true）
    const [isPaused, setIsPaused] = useState(false);
    const pausedRef = useRef(false);
    useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);

    // 產出 3 組一樣的卡片，做無縫循環
    const tripled = useMemo(() => [items, items, items], [items]);

    // 計算「單一組」的實際寬度（px）
    useEffect(() => {
        const calc = () => {
            if (!containerRef.current) return;
            const setEl = containerRef.current.querySelector(".carousel-set");
            if (setEl) setSetWidth(setEl.scrollWidth);
        };
        calc();
        const ro = new ResizeObserver(calc);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [items]);

    // 自動向左位移（hover 時不更新 translateX）
    useEffect(() => {
        if (!setWidth) return;
        const speedPxPerFrame = 1.2; // 速度可自行調整
        let raf;
        const tick = () => {
            if (!pausedRef.current) {
                setTranslateX(prev => {
                    const next = prev - speedPxPerFrame;
                    // 位移超過「一組寬度」就歸零，無縫接續
                    if (Math.abs(next) >= setWidth) return 0;
                    return next;
                });
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [setWidth]);

    return (
        <div className="carousel" ref={containerRef}>
            <h3 className="carousel-title-en">More Fun Together</h3>
            <div className="line"></div>
            <h2 className="carousel-title">更多揪團</h2>

            {/* 只要滑鼠在可視區（卡片上）就暫停 */}
            <div
                className="carousel-viewport"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    className="carousel-track"
                    ref={trackRef}
                    style={{ transform: `translateX(${translateX}px)` }}
                >
                    {tripled.map((group, gi) => (
                        <div className="carousel-set" key={`set-${gi}`}>
                            {group.map((card) => (
                                <div className="carousel-card" key={`card-${gi}-${card.id}`}>
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

    return (
        <main>
            {/* Banner區 */}
            <section id="groupBanner2">
                <img src="./img-Group/g-2-BN.jpg" alt="" />
                <div className="groupSlogan2">
                    <h3>Activity theme</h3>
                    <div className="line"></div>
                    <h2>一起逛饒河夜市</h2>
                </div>
            </section>

            {/* 內文資訊*/}
            <section id="groupInfo">
                <div className="activity-main">
                    <figure className="info_img">
                        <img src="./img-Group/night-market.jpg" alt="" />
                    </figure>

                    <div className="activity-introduction">
                        <li>
                            <h3>活動類型</h3>
                            <p>#吃飯探索 #美食旅遊 #認識朋友</p>
                        </li>

                        <li>
                            <h3>活動時間</h3>
                            <p>2025/ 09/ 12　18:00 ~ 22:00</p>
                        </li>

                        <li>
                            <h3>集合地點</h3>
                            <p>台灣/ 台北市　捷運松山站 4 號出口</p>
                        </li>

                        <li>
                            <h3>報名截止日</h3>
                            <p>2025/ 09/ 10　23:59</p>
                        </li>

                        <div className="activity-btn">
                            <button className="pm">私訊揪團主</button>
                            <button className="join">
                                報名參加
                                <img src="./img-Group/right-arrow.svg" alt="right-arrow" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 活動說明 */}
            <article id="activity-content">
                <div className="content-title">
                    <h3>Activity content</h3>
                    <div className="line"></div>
                    <h2>活動說明</h2>
                    <p>
                        來去饒河夜市走走吧！集合好之後就一起逛，先買個剛出爐的胡椒餅，再來一杯冰冰涼涼的仙草茶，邊吃邊聊超chill～一路上想停哪就停哪，看到什麼想吃就買，沒有SOP、也不用趕行程，就是數位遊牧者聚在一起隨興散步，順便認識新朋友。燈火通明、人聲熱鬧，美食香氣一路陪伴，聊工作、聊旅行、聊生活，輕鬆自在到不想回家，快來加入我們，用夜市的熱鬧氛圍開啟一個超好玩的夜晚吧！
                    </p>
                </div>
            </article>


            {/* 發起人+報名人數 */}
            <section id="people-info">
                <div className="organizer-info">
                    <h3>發起人</h3>
                    <p>Peggy Chen</p>
                    <img className="people-img" src="./img-Group/people/organizer.jpg" alt="" />
                </div>
                <div className="participants">
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
                </div>
            </section>

            {/* 留言區 */}
            <section id='activity-comments'>
                <h3>留言區</h3>
                {/* Sherry */}
                <div className='comment'>
                    <img className="commenter-photo" src="./img-Group/people/Commenter (1).jpg" alt="" />
                    <div className='comment-content'>
                        <p className='commenter-name'>Sherry</p>
                        <p>哇～夜市行程聽起來也太讚了吧！可惜那天有事走不開😭</p>
                    </div>
                </div>
                {/* Eason */}
                <div className='comment'>
                    <img className="commenter-photo" src="./img-Group/people/Commenter (2).jpg" alt="" />
                    <div className='comment-content'>
                        <p className='commenter-name'>Eason</p>
                        <p>我超愛逛夜市耶！饒河真的推推！！</p>
                    </div>
                </div>
                {/* Jason */}
                <div className='comment'>
                    <img className="commenter-photo" src="./img-Group/people/Commenter (3).jpg" alt="" />
                    <div className='comment-content'>
                        <p className='commenter-name'>Jason</p>
                        <p>團主的揪團超棒！希望下次能跟到！</p>
                    </div>
                </div>
                {/* Andy Chen */}
                <div className='comment'>
                    <img className="commenter-photo" src="./img-Group/people/People-(10).jpg" alt="" />
                    <div className='comment-content'>
                        <p className='commenter-name'>Andy Chen</p>
                        <p className='input'>我要留言</p>
                    </div>
                </div>


            </section>

            {/* 更多揪團：用輪播 */}
            <section id="more-activities">
                <div className="more-activities-title">
                    {/* 原本標題移交給 CardCarousel 內部以統一樣式呈現 */}
                </div>

                <CardCarousel items={groupCardData} />
            </section>

            {/* 發起揪團 */}
            <section id="createGroup">
                <div className="createGroup-title">
                    <h2>沒有喜歡的團？</h2>
                    <div className="line"></div>
                    <Link to="/group3" className="btn2-create">發起揪團</Link>
                </div>
            </section>
        </main>
    );
};

export default Group2;
