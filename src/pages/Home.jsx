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

 /* 2) 進入 section：重播刷線；刷完線自動觸發一次划船 */
useEffect(() => {
  const root = bannerRef.current;
  if (!root) return;

  const target = root.querySelector(".banner-line");
  if (!target) return;

  const wipe = target.querySelector(".b-wipe");
  const anim = wipe?.querySelector?.("animate");
  if (!wipe || !anim) return;

  let autoQueued = false; // 避免同一輪重複掛 endEvent


  const onEnter = () => {
    // 先重設虛線並播放刷線
    const dash = wipe.getAttribute("stroke-dasharray") || "1";
    wipe.setAttribute("stroke-dashoffset", dash);
    void wipe.getBoundingClientRect(); // 強制 reflow
    if (typeof anim.beginElement === "function") anim.beginElement();

    // 線刷完 → 自動發出一次「boat-play」事件，讓船跑一次
    if (!autoQueued) {
      autoQueued = true;
      const handleWipeEnd = () => {
        target.dispatchEvent(new CustomEvent("boat-play"));
        anim.removeEventListener("endEvent", handleWipeEnd);
        // 等船跑完會自動回起點；等下次再次進入視窗時再重播
      };
      anim.addEventListener("endEvent", handleWipeEnd, { once: true });
    }
  };

  // IntersectionObserver：看到 section 才觸發
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) onEnter();
        else {
          // 離開視窗時把旗標清掉，避免停留期間多次觸發
          autoQueued = false;
        }
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


 /* 5) 划船：維持待機漂浮；收到點擊或「boat-play」事件就沿路徑跑到底，結束回起點 */
useEffect(() => {
  const AMP = 6;        // 漂浮幅度(px)
  const PERIOD = 3400;  // 週期(ms)
  const W = (2 * Math.PI) / PERIOD;

  const root = bannerRef.current;
  if (!root) return;

  const container = root.querySelector(".banner-line");
  const boat = container?.querySelector(".boat");
  const bob = container?.querySelector(".boatBob");
  const init = container?.querySelector("#boatInit");
  const fwd = container?.querySelector("#boatFwd");
  if (!container || !boat || !bob || !init || !fwd) return;

  // 進頁：把船定位到起點
  init.beginElement?.();

  // rAF：待機上下漂浮（播放時暫停）
  let playing = false;
  let rafId = 0;
  const t0 = performance.now();

  const loop = (t) => {
    const y = playing ? 0 : Math.sin((t - t0) * W) * -AMP; // 往上為負
    bob.style.transform = `translateY(${y}px)`;
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);

  // 觸發一次完整航行
  const play = () => {
    if (playing) return;
    playing = true;
    fwd.beginElement(); // 開始沿路徑前進

    const onEnd = () => {
      init.beginElement?.();   // 跑完立刻回到起點
      playing = false;         // 恢復漂浮
      fwd.removeEventListener("endEvent", onEnd);
    };
    fwd.addEventListener("endEvent", onEnd, { once: true });
  };

  // 點擊 / 鍵盤 啟動
  const onClick = () => play();
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); }
  };
  boat.addEventListener("click", onClick);
  boat.addEventListener("keydown", onKey);

  // 監聽「刷線完成後」由上一個 effect 發出的自動播放事件
  const onAutoPlay = () => play();
  container.addEventListener("boat-play", onAutoPlay);

  return () => {
    boat.removeEventListener("click", onClick);
    boat.removeEventListener("keydown", onKey);
    container.removeEventListener("boat-play", onAutoPlay);
    cancelAnimationFrame(rafId);
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
          <svg className="b-line" viewBox="0 0 1280 641" preserveAspectRatio="xMaxYMin meet" aria-hidden="true">
            <defs>
              {/* <!-- 箭頭 --> */}
              <marker id="bArrow" viewBox="0 0 10 10" refX="9" refY="5"
                markerWidth="10" markerHeight="10" orient="auto" markerUnits="userSpaceOnUse">
                <path d="M0,1 L9,5 L0,9" fill="none" stroke="context-stroke"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </marker>

              {/* <!-- 遮罩：讓虛線用「刷出」效果 --> */}
              <mask id="bReveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1280" height="641">
                <rect x="0" y="0" width="1280" height="641" fill="black" />
                <path className="b-wipe"
                  d="M1268.3 7.15837C1237.66 21.299 1149.16 57.0041 1040.28 86.6994C904.178 123.819 798.123 107.91 776.912 86.6994C755.701 65.4885 755.701 26.6018 821.102 7.15837C886.502 -12.285 944.832 23.0666 943.064 54.883C941.297 86.6994 943.064 334.077 643.057 360.269C332.737 387.361 128.21 426.075 64.5775 484.405C13.6712 531.069 -9.66082 606.368 6.24739 639.952"
                  fill="none" stroke="white" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"
                  pathLength="1" strokeDasharray="1" strokeDashoffset="1">
                  <animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.8s"
                    begin="indefinite" fill="freeze" />
                </path>
              </mask>
            </defs>

            {/* <!-- 可見的虛線（船跟著這條跑） --> */}
            <path id="bPath"
              d="M1268.3 7.15837C1237.66 21.299 1149.16 57.0041 1040.28 86.6994C904.178 123.819 798.123 107.91 776.912 86.6994C755.701 65.4885 755.701 26.6018 821.102 7.15837C886.502 -12.285 944.832 23.0666 943.064 54.883C941.297 86.6994 943.064 334.077 643.057 360.269C332.737 387.361 128.21 426.075 64.5775 484.405C13.6712 531.069 -9.66082 606.368 6.24739 639.952"
              fill="none" stroke="#e0ded3ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="8 10" vectorEffect="non-scaling-stroke"
              markerEnd="url(#bArrow)" mask="url(#bReveal)" />

            {/* <!-- 船（整組） --> */}
            <g className="boat" role="button" tabIndex="0" aria-label="sail">
              {/* <!-- rAF 會在這層寫 translateY，整船一起漂浮 --> */}
              <g className="boatBob">
                {/* <!-- 局部座標（方便微調位置） --> */}
                <g className="boatLocal" transform="translate(20,40)">
                  {/* <!-- 命中盒：完全透明、無外框，但可接滑鼠事件 --> */}
                  <rect className="boatHit" x="-42" y="-78" width="84" height="110"
                    fill="none" stroke="none" />

                  {/* <!-- 船圖（顏色用 currentColor 控制；角度可微調） --> */}
                  <g className="boatIcon" transform="rotate(-155)">
                    <g transform="translate(-32,-32)">
                      <path d="M7.5 42.7021L18.5831 53.7852H53.8833L57.5 42.7021H7.5Z"
                        fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                      <path d="M42.912 11V13.1719V42.7021"
                        fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                      <path d="M29.7781 42.7021L29.2934 41.7699C27.349 37.9363 26.9107 33.5134 28.0649 29.3727C29.2192 25.2319 31.8822 21.6736 35.5294 19.3986L42.912 14.7938"
                        fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                      <path d="M18.6763 42.7021H22.2464C21.3639 40.9549 20.6371 39.1333 20.0745 37.2584C19.4961 35.2266 19.3329 33.0991 19.5947 31.0029C19.8566 28.9067 20.5381 26.8847 21.5987 25.0577C22.6592 23.2307 24.077 21.6361 25.7674 20.3691C27.4578 19.1021 29.3862 18.1887 31.4373 17.6834L42.912 14.7938"
                        fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                    </g>
                  </g>
                </g>
              </g>

              {/* <!-- 沿路徑動畫：JS 觸發 begin()；跑完用 init 回起點 --> */}
              <animateMotion id="boatInit" begin="0s;boatFwd.end" dur="0.001s"
                rotate="auto" fill="freeze" keyTimes="0;1" keyPoints="0;0">
                <mpath href="#bPath" />
              </animateMotion>
              <animateMotion id="boatFwd" begin="indefinite" dur="6s"
                rotate="auto" fill="freeze" calcMode="spline"
                keyTimes="0;1" keySplines="0.25 0.1 0.25 1">
                <mpath href="#bPath" />
              </animateMotion>
            </g>
          </svg>
        </div>
        {/* <div className="homeboat-b">
          <img src="./img-Home/boat-b.svg" alt="" />
        </div> */}
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
          {/* <!-- 大塊填色，從 -2400 開到 +2400 --> */}
          <path id="segBigLong"
            d="
        M -2400,30
        C -2360,0 -2360,60 -2320,30
        S -2280,60 -2240,30
        S -2200,60 -2160,30
        S -2120,60 -2080,30
        S -2040,60 -2000,30
        S -1960,60 -1920,30
        S -1880,60 -1840,30
        S -1800,60 -1760,30
        S -1720,60 -1680,30
        S -1640,60 -1600,30
        S -1560,60 -1520,30
        S -1480,60 -1440,30
        S -1400,60 -1360,30
        S -1320,60 -1280,30
        S -1240,60 -1200,30
        S -1160,60 -1120,30
        S -1080,60 -1040,30
        S -1000,60  -960,30
        S  -920,60  -880,30
        S  -840,60  -800,30
        S  -760,60  -720,30
        S  -680,60  -640,30
        S  -600,60  -560,30
        S  -520,60  -480,30
        S  -440,60  -400,30
        S  -360,60  -320,30
        S  -280,60  -240,30
        S  -200,60  -160,30
        S  -120,60   -80,30
        S   -40,60     0,30
        S    40,60    80,30
        S   120,60   160,30
        S   200,60   240,30
        S   280,60   320,30
        S   360,60   400,30
        S   440,60   480,30
        S   520,60   560,30
        S   600,60   640,30
        S   680,60   720,30
        S   760,60   800,30
        S   840,60   880,30
        S   920,60   960,30
        S  1000,60  1040,30
        S  1080,60  1120,30
        S  1160,60  1200,30
        S  1240,60  1280,30
        S  1320,60  1360,30
        S  1400,60  1440,30
        S  1480,60  1520,30
        S  1560,60  1600,30
        S  1640,60  1680,30
        S  1720,60  1760,30
        S  1800,60  1840,30
        S  1880,60  1920,30
        S  1960,60  2000,30
        S  2040,60  2080,30
        S  2120,60  2160,30
        S  2200,60  2240,30
        S  2280,60  2320,30
        S  2360,60  2400,30
        V 60 H -2400 Z
      " />

          {/* <!-- 中線 --> */}
          <path id="segMidLong"
            d="
        M -2400,30
        C -2370,10 -2370,50 -2340,30
        S -2310,50 -2280,30
        S -2250,50 -2220,30
        S -2190,50 -2160,30
        S -2130,50 -2100,30
        S -2070,50 -2040,30
        S -2010,50 -1980,30
        S -1950,50 -1920,30
        S -1890,50 -1860,30
        S -1830,50 -1800,30
        S -1770,50 -1740,30
        S -1710,50 -1680,30
        S -1650,50 -1620,30
        S -1590,50 -1560,30
        S -1530,50 -1500,30
        S -1470,50 -1440,30
        S -1410,50 -1380,30
        S -1350,50 -1320,30
        S -1290,50 -1260,30
        S -1230,50 -1200,30
        S -1170,50 -1140,30
        S -1110,50 -1080,30
        S -1050,50 -1020,30
        S  -990,50  -960,30
        S  -930,50  -900,30
        S  -870,50  -840,30
        S  -810,50  -780,30
        S  -750,50  -720,30
        S  -690,50  -660,30
        S  -630,50  -600,30
        S  -570,50  -540,30
        S  -510,50  -480,30
        S  -450,50  -420,30
        S  -390,50  -360,30
        S  -330,50  -300,30
        S  -270,50  -240,30
        S  -210,50  -180,30
        S  -150,50  -120,30
        S   -90,50   -60,30
        S   -30,50     0,30
        S    30,50    60,30
        S    90,50   120,30
        S   150,50   180,30
        S   210,50   240,30
        S   270,50   300,30
        S   330,50   360,30
        S   390,50   420,30
        S   450,50   480,30
        S   510,50   540,30
        S   570,50   600,30
        S   630,50   660,30
        S   690,50   720,30
        S   750,50   780,30
        S   810,50   840,30
        S   870,50   900,30
        S   930,50   960,30
        S   990,50  1020,30
        S  1050,50  1080,30
        S  1110,50  1140,30
        S  1170,50  1200,30
        S  1230,50  1260,30
        S  1290,50  1320,30
        S  1350,50  1380,30
        S  1410,50  1440,30
        S  1470,50  1500,30
        S  1530,50  1560,30
        S  1590,50  1620,30
        S  1650,50  1680,30
        S  1710,50  1740,30
        S  1770,50  1800,30
        S  1830,50  1860,30
        S  1890,50  1920,30
        S  1950,50  1980,30
        S  2010,50  2040,30
        S  2070,50  2100,30
        S  2130,50  2160,30
        S  2190,50  2220,30
        S  2250,50  2280,30
        S  2310,50  2340,30
        S  2370,50  2400,30
      " />

          {/* <!-- 小線 --> */}
          <path id="segSmallLong"
            d="
        M -2400,30
        C -2380,20 -2380,40 -2360,30
        S -2340,40 -2320,30
        S -2300,40 -2280,30
        S -2260,40 -2240,30
        S -2220,40 -2200,30
        S -2180,40 -2160,30
        S -2140,40 -2120,30
        S -2100,40 -2080,30
        S -2060,40 -2040,30
        S -2020,40 -2000,30
        S -1980,40 -1960,30
        S -1940,40 -1920,30
        S -1900,40 -1880,30
        S -1860,40 -1840,30
        S -1820,40 -1800,30
        S -1780,40 -1760,30
        S -1740,40 -1720,30
        S -1700,40 -1680,30
        S -1660,40 -1640,30
        S -1620,40 -1600,30
        S -1580,40 -1560,30
        S -1540,40 -1520,30
        S -1500,40 -1480,30
        S -1460,40 -1440,30
        S -1420,40 -1400,30
        S -1380,40 -1360,30
        S -1340,40 -1320,30
        S -1300,40 -1280,30
        S -1260,40 -1240,30
        S -1220,40 -1200,30
        S -1180,40 -1160,30
        S -1140,40 -1120,30
        S -1100,40 -1080,30
        S -1060,40 -1040,30
        S -1020,40 -1000,30
        S  -980,40  -960,30
        S  -940,40  -920,30
        S  -900,40  -880,30
        S  -860,40  -840,30
        S  -820,40  -800,30
        S  -780,40  -760,30
        S  -740,40  -720,30
        S  -700,40  -680,30
        S  -660,40  -640,30
        S  -620,40  -600,30
        S  -580,40  -560,30
        S  -540,40  -520,30
        S  -500,40  -480,30
        S  -460,40  -440,30
        S  -420,40  -400,30
        S  -380,40  -360,30
        S  -340,40  -320,30
        S  -300,40  -280,30
        S  -260,40  -240,30
        S  -220,40  -200,30
        S  -180,40  -160,30
        S  -140,40  -120,30
        S  -100,40   -80,30
        S   -60,40   -40,30
        S   -20,40     0,30
        S    20,40    40,30
        S    60,40    80,30
        S   100,40   120,30
        S   140,40   160,30
        S   180,40   200,30
        S   220,40   240,30
        S   260,40   280,30
        S   300,40   320,30
        S   340,40   360,30
        S   380,40   400,30
        S   420,40   440,30
        S   460,40   480,30
        S   500,40   520,30
        S   540,40   560,30
        S   580,40   600,30
        S   620,40   640,30
        S   660,40   680,30
        S   700,40   720,30
        S   740,40   760,30
        S   780,40   800,30
        S   820,40   840,30
        S   860,40   880,30
        S   900,40   920,30
        S   940,40   960,30
        S   980,40  1000,30
        S  1020,40  1040,30
        S  1060,40  1080,30
        S  1100,40  1120,30
        S  1140,40  1160,30
        S  1180,40  1200,30
        S  1220,40  1240,30
        S  1260,40  1280,30
        S  1300,40  1320,30
        S  1340,40  1360,30
        S  1380,40  1400,30
        S  1420,40  1440,30
        S  1460,40  1480,30
        S  1500,40  1520,30
        S  1540,40  1560,30
        S  1580,40  1600,30
        S  1620,40  1640,30
        S  1660,40  1680,30
        S  1700,40  1720,30
        S  1740,40  1760,30
        S  1780,40  1800,30
        S  1820,40  1840,30
        S  1860,40  1880,30
        S  1900,40  1920,30
        S  1940,40  1960,30
        S  1980,40  2000,30
        S  2020,40  2040,30
        S  2060,40  2080,30
        S  2100,40  2120,30
        S  2140,40  2160,30
        S  2180,40  2200,30
        S  2220,40  2240,30
        S  2260,40  2280,30
        S  2300,40  2320,30
        S  2340,40  2360,30
        S  2380,40  2400,30
      " />
        </defs>

        {/* <!-- 只畫一次（不要用 x="0"/"238" 拼），每條都已經是超長連續線 --> */}
        <g className="move fill big">
          <use href="#segBigLong" />
        </g>
        <g className="move stroke mid">
          <use href="#segMidLong" />
        </g>
        <g className="move stroke small">
          <use href="#segSmallLong" />
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
          <div className="home-city-grid">
            <Link to="/location" className="h-city">
              <img src="./img-Home/location-1.jpg" alt="奧克蘭" />
              <span className="h-cityname">奧克蘭</span>
            </Link>

            <Link to="/location" className="h-city">
              <img src="./img-Home/location-2.jpg" alt="峇里島" />
              <span className="h-cityname">峇里島</span>
            </Link>

            <Link to="/location" className="h-city">
              <img src="./img-Home/location-3.jpg" alt="曼谷" />
              <span className="h-cityname">曼谷</span>
            </Link>

            <Link to="/location" className="h-city">
              <img src="./img-Home/location-4.jpg" alt="里斯本" />
              <span className="h-cityname">里斯本</span>
            </Link>

            <Link to="/location" className="h-city">
              <img src="./img-Home/location-5.jpg" alt="墨西哥城" />
              <span className="h-cityname">墨西哥城</span>
            </Link>

            <Link to="/location" className="h-city">
              <img src="./img-Home/location-6.jpg" alt="柏林" />
              <span className="h-cityname">柏林</span>
            </Link>

            <Link to="/location" className="h-city">
              <img src="./img-Home/location-7.jpg" alt="紐約" />
              <span className="h-cityname">紐約</span>
            </Link>
          </div>


          <Link to="/location" className="home-all-spot" role="button">
            更多地點
          </Link>

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

            <Link to="/group" className="home-all-spot" role="button">
              所有活動
            </Link>
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
                {/* <figure><img src="./img-Home/heart.svg" alt="" /></figure>
                <figure><img src="./img-Home/chat.svg" alt="" /></figure>
                <figure><img src="./img-Home/save.svg" alt="" /></figure> */}
              </div>
            </div>
          </article>
          <Link to="/diary" className="home-all-spot" role="button">
            所有日記
          </Link>
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
