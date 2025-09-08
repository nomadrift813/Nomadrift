import '../sass/scss/home.scss'
import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const [hvalue, setHvalue] = useState("");

  const wrapRef = useRef(null);   // 給 IntersectionObserver 用

  // 淡入淡出（Hero）
  const [show, setShow] = useState(true);
  useEffect(() => {
    const update = () => {
      const cutoff = Math.round(window.innerHeight * 0.35);
      setShow(window.scrollY <= cutoff);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // 可重複進出視窗的捲動動畫（優勢區淡入；Group 左右滑入＋淡入）
  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const els = root.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = entry.target;
          if (entry.isIntersecting) el.classList.add('in');
          else el.classList.remove('in');
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main ref={wrapRef}>
      <section id="homebanner">
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
          <img src="./img-Home/banner-line.svg" alt="" />
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

          <div className='h-location-line'>
            <img src="./img-Home/location-line.svg" alt="" />
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
        <figure className='h-group-line'><img src="./img-Home/group-line.svg" alt="" /></figure>
      </section>

      <section id='homediary'>
        <header>
          <p className='h-t-1'>D<span>iary</span></p>
          <p className='h-t-2'>漂日記</p>
        </header>
        <div className='h-d-article-box'>
          <article>
            <div className='h-d-member'>
              <div></div>
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
