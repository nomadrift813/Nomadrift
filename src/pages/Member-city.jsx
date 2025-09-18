import React, { useEffect, useState } from 'react';
import '../sass/scss/member-city.scss';
import { Link } from 'react-router-dom';
import { getFavList, setFavList, FAV_EVENT } from '../js/favStore';

/**
 * 會員中心 - 收藏國家
 * - 讀取 getFavList('city') 顯示
 * - 監聽 FAV_EVENT 跨頁同步
 * - 可在此取消收藏（寫回 setFavList）
 */
const MemberCity = () => {
  const [favs, setFavs] = useState(() => getFavList('city'));

  useEffect(() => {
    const sync = () => setFavs(getFavList('city'));
    window.addEventListener(FAV_EVENT, sync);
    // 也可在首次進頁時同步一次（避免別頁剛動作還沒 hydrate）
    sync();
    return () => window.removeEventListener(FAV_EVENT, sync);
  }, []);

  const removeOne = (id) => {
    const next = favs.filter(x => String(x.id) !== String(id));
    setFavList('city', next);
    setFavs(next);
  };

  return (
    <main>
      <section id="member-city">
        <header>
          <ul>
            <li><Link to="/member">會員資料</Link></li>
            <li><Link to="/memberCity">收藏國家</Link></li>
            <li><Link to="/memberdiary">我的文章</Link></li>
            <li><Link to="/membersave">收藏文章</Link></li>
            <li><Link to="/membergroup">活動紀錄</Link></li>
          </ul>
        </header>

        <div className='m-all-box'>
          <div className='m-d-title'>
            <p>收藏國家</p>
          </div>

          <article className="fav-cities">
            {favs.length === 0 && (
              <p className="empty">目前沒有收藏的國家</p>
            )}

            {favs.map((c) => (
              <section key={c.id} className="country saved">
                <div className="p1-sel">
                  <figure className="loc-p1">
                    <img src={c.img} alt={c.country} />
                  </figure>

                  {/* 也可以在這裡放一個同款收藏按鈕（讓它可直接切換） */}
                  <figure
                    className="select js-fav"
                    data-fav={JSON.stringify({ type: 'city', id: c.id, item: c })}
                    title="取消收藏"
                  >
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <circle cx="30" cy="30" r="30" fill="white" />
                      <path
                        d="M18 21.667C18 18.5372 20.5746 16 23.7506 16H36.2494C39.4254 16 42 18.5372 42 21.667V39.215C42 42.368 38.312 44.1337 35.7968 42.185L31.1847 38.6117C30.4895 38.073 29.5105 38.073 28.8153 38.6117L24.2032 42.185C21.688 44.1337 18 42.368 18 39.215V21.667Z"
                        stroke="#1F1F1F"
                        strokeWidth="1.5"
                        data-bm
                      />
                    </svg>
                  </figure>
                </div>

                <article className="loc-info">
                  <h2>{c.country}</h2>
                  <p className="loc-text">{c.text}</p>
                  <div className="wi-st">
                    <ul>
                      <img src="./img-Location/Wifi.svg" alt="" />
                      <p>{c.wifi}</p>
                    </ul>
                    <figure className="stars">
                      {c.stars?.map((s, i) => (
                        <img key={i} src={`./img-Location/Star${s}.svg`} alt={`star${s}`} />
                      ))}
                    </figure>
                  </div>
                  <span>{c.price}</span>
                </article>

                <div className="color-block" />
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
};

export default MemberCity;
