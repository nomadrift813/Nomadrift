import '../sass/scss/home.scss'
import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react";

const Home = () => {
  // component 內
  const [hvalue, setHvalue] = useState("");
  const [show, setShow] = useState(true);

  // 觀察範圍：整頁主要容器 & 只有 banner 區
  const wrapRef = useRef(null);     // 包住 .reveal、.h-location-line、.h-group-line 的外層
  const bannerRef = useRef(null);   // 只包住 section#banner（含 .banner-line）

  /* 1) .reveal：滑入淡入（加/移除 .in） */
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const els = root.querySelectorAll(".reveal");
    if (!els.length) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(({ isIntersecting, target }) => {
          target.classList.toggle("in", isIntersecting);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* 2) Banner 線：看到 section banner 就重播（SMIL .b-wipe） */
  useEffect(() => {
    const root = bannerRef.current;
    if (!root) return;

    const target = root.querySelector(".banner-line");
    if (!target) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(({ isIntersecting }) => {
          if (!isIntersecting) return;

          const wipe = target.querySelector(".b-wipe");
          const anim = wipe?.querySelector?.("animate");
          if (!wipe || !anim) return;

          // 重設 → 強制 reflow → 重新播放
          const dash = wipe.getAttribute("stroke-dasharray") || "1";
          wipe.setAttribute("stroke-dashoffset", dash);
          void wipe.getBoundingClientRect();
          if (typeof anim.beginElement === "function") anim.beginElement();
        });
      },
      { threshold: 0.6, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(target);
    return () => io.disconnect();
  }, []);

  /* 3) 其它兩條線（CSS 版）：進場重播（移除→reflow→加回 .play） */
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const lines = root.querySelectorAll(".h-location-line, .h-group-line");
    if (!lines.length) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            target.classList.remove("play");
            void target.getBoundingClientRect(); // 強制 reflow
            target.classList.add("play");
          } else {
            target.classList.remove("play");
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -20% 0px" }
    );

    lines.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* 4) Hero 淡入淡出（依視窗高度 35% 為切換點） */
  useEffect(() => {
    const update = () => {
      const cutoff = Math.round(window.innerHeight * 0.35);
      setShow(window.scrollY <= cutoff);
    };
    update();

    const opts = { passive: true };
    window.addEventListener("scroll", update, opts);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <main ref={wrapRef}>
      <section id="homebanner" ref={bannerRef}>
        <div className={`homeslogan ${show ? "fade-in" : "fade-out"}`}>
          <h2>在世界的浪潮中，自由前行</h2>

          <div className={`home-b-form ${hvalue ? "typing" : ""}`}>
            <input
              type="text"
              placeholder="Start"
              value={hvalue}
              onChange={(e) => setHvalue(e.target.value)}
            />
            <img src="./img-Home/home-s-right.svg" alt="" />
          </div>
        </div>

        <p className='banner-side-word'>floating your own way</p>
        <div className="homescroll">
          <img src="./img-Home/homescroll.svg" alt="" />
        </div>

        <div className="banner-line">
          <svg
            className="b-line"
            viewBox="0 0 1280 641"
            preserveAspectRatio="xMaxYMin meet"
            aria-hidden="true"
          >
            <defs>
              {/* 開口箭頭（跟前面一樣），會沿路徑方向自動旋轉 */}
              <marker id="bArrow"
                viewBox="0 0 10 10"
                refX="9" refY="5"
                markerWidth="10" markerHeight="10"
                orient="auto"
                markerUnits="userSpaceOnUse">
                <path d="M0,1 L9,5 L0,9"
                  fill="none"
                  stroke="context-stroke"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
              </marker>

              {/* 白色畫筆遮罩：用較粗的筆，讓箭頭也被露出 */}
              <mask id="bReveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1280" height="641">
                <rect x="0" y="0" width="1280" height="641" fill="black" />
                <path
                  className="b-wipe"
                  d="M1268.3 7.15837C1237.66 21.299 1149.16 57.0041 1040.28 86.6994C904.178 123.819 798.123 107.91 776.912 86.6994C755.701 65.4885 755.701 26.6018 821.102 7.15837C886.502 -12.285 944.832 23.0666 943.064 54.883C941.297 86.6994 943.064 334.077 643.057 360.269C332.737 387.361 128.21 426.075 64.5775 484.405C13.6712 531.069 -9.66082 606.368 6.24739 639.952"
                  fill="none"
                  stroke="white"
                  strokeWidth="16"          /* ↑ 夠粗，最後端的箭頭才會被露出 */
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                >
                  <animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.8s" begin="indefinite" fill="freeze" />
                </path>
              </mask>
            </defs>

            {/* 虛線主體（不動），靠遮罩露出；加上箭頭 */}
            <path
              d="M1268.3 7.15837C1237.66 21.299 1149.16 57.0041 1040.28 86.6994C904.178 123.819 798.123 107.91 776.912 86.6994C755.701 65.4885 755.701 26.6018 821.102 7.15837C886.502 -12.285 944.832 23.0666 943.064 54.883C941.297 86.6994 943.064 334.077 643.057 360.269C332.737 387.361 128.21 426.075 64.5775 484.405C13.6712 531.069 -9.66082 606.368 6.24739 639.952"
              fill="none"
              stroke="#e0ded3ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8 10"       /* 想更密可改 6 8 / 5 6 */
              vectorEffect="non-scaling-stroke"
              markerEnd="url(#bArrow)"
              mask="url(#bReveal)"
            />
          </svg>
        </div>

        <div className="homeboat-b">
          <img src="./img-Home/boat-b.svg" alt="" />
        </div>
      </section>

      <section id='homeadvantages'>
        <header>
          <p className='h-t-1'><span>From</span> Taiwan to the World</p>
          <p className='h-t-2'>亞洲第一<br />數位遊牧平台</p>
        </header>
        <div className='h-a-boxs'>
          <article>
            <figure><img src="./img-Home/advico-1.svg" alt="" /></figure>
            <h3>全中介面</h3>
            <p>亞洲第一數位遊牧<br />揪團社群網頁</p>
          </article>
          <article>
            <figure><img src="./img-Home/advico-2.svg" alt="" /></figure>
            <h3>資訊整合</h3>
            <p>整合揪團&資源<br />一站式查詢</p>
          </article>
          <article>
            <figure><img src="./img-Home/advico-3.svg" alt="" /></figure>
            <h3>跨國交流</h3>
            <p>與世界各地游牧者<br />互動學習</p>
          </article>
          <article>
            <figure><img src="./img-Home/advico-4.svg" alt="" /></figure>
            <h3>快速揪團</h3>
            <p>一鍵開團<br />立刻找到同行夥伴</p>
          </article>
        </div>
      </section>

      <svg className="wave-svg" viewBox="0 0 240 60" preserveAspectRatio="none">
        <defs>
          <path id="segBig"
            d="M0,30 C40,0 40,60 80,30 C120,0 120,60 160,30 C200,0 200,60 240,30 V60 H0 Z" />
          <path id="segMid"
            d="M0,30 C30,10 30,50 60,30 C90,10 90,50 120,30 C150,10 150,50 180,30 C210,10 210,50 240,30" />
          <path id="segSmall"
            d="M0,30 C20,20 20,40 40,30 C60,20 60,40 80,30 C100,20 100,40 120,30 C140,20 140,40 160,30 C180,20 180,40 200,30 C220,20 220,40 240,30" />
        </defs>

        <g className="move fill big">
          <use href="#segBig" x="0" />
          <use href="#segBig" x="239" />
        </g>
        <g className="move stroke mid">
          <use href="#segMid" x="0" />
          <use href="#segMid" x="239" />
        </g>
        <g className="move stroke small">
          <use href="#segSmall" x="0" />
          <use href="#segSmall" x="239" />
        </g>
      </svg>

      <section id='homelocation'>
        <header>
          <div className='homenext'>
            <p className='h-t-1'>Start your next journey <span>here</span></p>
            <p className='h-t-2'>下一站 點擊出發!</p>
          </div>
          <div className='popularcity'>
            <p>Popular</p>
            <p>City</p>
          </div>
        </header>

        <div className='home-lo-boxs'>
          <figure className="home-city-grid">
            <div className="h-city">
              <img src="./img-Home/location-1.jpg" alt="奧克蘭" />
              <span className="h-cityname">奧克蘭</span>
            </div>
            <div className="h-city">
              <img src="./img-Home/location-2.jpg" alt="峇里島" />
              <span className="h-cityname">峇里島</span>
            </div>
            <div className="h-city">
              <img src="./img-Home/location-3.jpg" alt="曼谷" />
              <span className="h-cityname">曼谷</span>
            </div>
            <div className="h-city">
              <img src="./img-Home/location-4.jpg" alt="里斯本" />
              <span className="h-cityname">里斯本</span>
            </div>
            <div className="h-city">
              <img src="./img-Home/location-5.jpg" alt="墨西哥城" />
              <span className="h-cityname">墨西哥城</span>
            </div>
            <div className="h-city">
              <img src="./img-Home/location-6.jpg" alt="柏林" />
              <span className="h-cityname">柏林</span>
            </div>
            <div className="h-city">
              <img src="./img-Home/location-7.jpg" alt="紐約" />
              <span className="h-cityname">紐約</span>
            </div>
          </figure>
          <button className='home-all-spot'>
            <Link to="/location">更多地點</Link>
          </button>

          <div className="h-location-line">
            <svg viewBox="0 0 160 575" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                {/* 開口箭頭（像你圖一），會跟著路徑方向旋轉 */}
                <marker id="locArrow"
                  viewBox="0 0 12 12"
                  refX="11" refY="6"
                  markerWidth="12" markerHeight="12"
                  orient="auto" markerUnits="userSpaceOnUse">
                  <path d="M1,2 L11,6 L1,10"
                    fill="none"
                    stroke="context-stroke"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                </marker>

                {/* 遮罩：白色「畫筆」只負責把虛線擦出來 */}
                <mask id="locReveal" maskUnits="userSpaceOnUse" x="0" y="0" width="160" height="575">
                  <rect x="0" y="0" width="160" height="575" fill="black" />
                  <path className="loc-wipe"
                    d="M150 8 C 38 150, 20 315, 58 435 C 102 535, 145 565, 150 568"
                    fill="none"
                    stroke="white"
                    stroke-width="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    pathLength="1"
                    stroke-dasharray="1"
                    stroke-dashoffset="1" />
                </mask>
              </defs>

              {/* 真正的虛線（不動），靠遮罩露出 */}
              <path
                d="M150 8 C 38 150, 20 315, 58 435 C 102 535, 145 565, 150 568"
                fill="none"
                stroke="#737B6B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-dasharray="5 4"
                marker-end="url(#locArrow)"
                vectorEffect="non-scaling-stroke"
                mask="url(#locReveal)"
              />
            </svg>
          </div>
        </div>

        <p className='h-1-side-word-1'>next stop</p>
        <p className='h-1-side-word-2'>Top Trending Nomad Cities</p>
      </section>

      <section id='homegroup'>
        <header>
          <p className='h-t-1'>Travel solo, c<span>onn</span>ect together!</p>
          <p className='h-t-2'>漂友集合站!!</p>
        </header>

        <div className='h-l-text'>
          <div className='h-g-pic'>
            {/* Group：保留旋轉 + 左右滑入 */}
            <figure className="h-g-p-1 reveal reveal-left-120"><img src="./img-Home/group1.jpg" alt="" /></figure>
            <figure className='h-g-p-2 reveal reveal-right-60'><img src="./img-Home/group2.jpeg" alt="" /></figure>
            <figure className='h-g-p-3 reveal reveal-right-200'><img src="./img-Home/group3.jpeg" alt="" /></figure>
          </div>
          <ul>
            <li>
              <Link to="/group?filter=找吃飯夥伴">
                <span>
                  找吃飯夥伴 <img src="./img-Home/home-s-right.svg" alt="" />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/group?filter=找工作夥伴">
                <span>
                  找工作夥伴 <img src="./img-Home/home-s-right.svg" alt="" />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/group?filter=找踩點夥伴">
                <span>
                  找踩點夥伴 <img src="./img-Home/home-s-right.svg" alt="" />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/group?filter=找合租室友">
                <span>
                  找合租室友 <img src="./img-Home/home-s-right.svg" alt="" />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/group?filter=找Chill伴">
                <span>
                  找 Chill 伴 <img src="./img-Home/home-s-right.svg" alt="" />
                </span>
              </Link>
            </li>
            <button className='home-all-spot'>
              <Link to="/group">所有活動</Link>
            </button>
          </ul>
        </div>

        <div className="h-g-tags">
          <p className='h-g-block1 hover-fun'>讓你在異鄉，也有同路人～</p>
          <p className='h-g-block2 hover-fun'>一個人沒動力？一起就有趣！!</p>
        </div>
        <div className="h-g-botton-wrap">
          <div className="h-g-track">
            <span className="h-g-item">&nbsp;Get together Get together</span>
            <span className="h-g-item" aria-hidden="true">&nbsp;Get together Get together</span>
            <span className="h-g-item" aria-hidden="true">&nbsp;Get together Get together</span>
            <span className="h-g-item" aria-hidden="true">&nbsp;Get together Get together</span>
          </div>
        </div>
        <p className='h-g-side-word-1'>nice to me you</p>
        <div className="h-group-line">
          <svg viewBox="0 0 474 614" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id="grpArrow" viewBox="0 0 10 10"
                refX="9" refY="5" markerWidth="10" markerHeight="10"
                orient="auto" markerUnits="userSpaceOnUse">
                <path d="M0,1 L9,5 L0,9"
                  fill="none" stroke="context-stroke"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </marker>

              <mask id="grpReveal" maskUnits="userSpaceOnUse" x="0" y="0" width="474" height="614">
                <rect x="0" y="0" width="474" height="614" fill="black" />
                <path className="grp-wipe"
                  d="M189 1.5C473 142 348.5 464 0.56958 612.595"
                  fill="none" stroke="white" strokeWidth="12"
                  strokeLinecap="round" strokeLinejoin="round"
                  pathLength="1" />
              </mask>
            </defs>

            <path
              d="M189 1.5C473 142 348.5 464 0.56958 612.595"
              fill="none" stroke="#737B6B" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="5 4" vectorEffect="non-scaling-stroke"
              markerEnd="url(#grpArrow)" mask="url(#grpReveal)" />
          </svg>
        </div>
      </section>

      <section id='homediary'>
        <header>
          <p className='h-t-1'>D<span>iary</span></p>
          <p className='h-t-2'>漂日記</p>
        </header>
        <div className='h-d-article-box'>
          <article>
            <div className='h-d-member'>
              <img src="./img-Group/people/join-people (5).jpg" alt="" />
              <p>Josh Kuo</p>
            </div>
            <div className='h-d-text-card'>
              <div className='h-d-text'>
                <p className='h-d-tit'>/ 只緣身在此山中</p>
                <p className='h-d-word'>
                  以為是迷路，原來是迷霧。<br />
                  穿過層層山路，終於與雲相遇。<br />
                  腳下是現實，身邊是霧，<br />
                  心裡，是一種說不出的寧靜。</p>
              </div>
              <div className='h-d-sign'>
                <div className='h-d-locaion'>
                  <figure><img src="./img-Home/location.svg" alt="" /></figure>
                  <p>越南/番西邦峰</p>
                </div>
                <p className='h-d-date'>Apr,03 2025</p>
                <figure><img src="./img-Home/heart.svg" alt="" /></figure>
                <figure><img src="./img-Home/chat.svg" alt="" /></figure>
                <figure><img src="./img-Home/save.svg" alt="" /></figure>
              </div>
            </div>
          </article>
          <button className='home-all-spot'>
            <Link to="/diary">所有日記</Link>
          </button>
        </div>

        <figure className='h-d-pics'>
          <img className="reveal reveal-left-300" src="./img-Home/diary-1.jpg" alt="" />
          <img className="reveal reveal-left-120" src="./img-Home/diary-2.jpg" alt="" />
          <img className="reveal reveal-left-60" src="./img-Home/diary-3.jpg" alt="" />
        </figure>
        <p className='h-d-side-word'>mood ...</p>
        {/* <figure className='h-d-boat'><img src="./img-Home/diary-boat.svg" alt="" /></figure> */}
      </section>
    </main>
  )
}

export default Home
