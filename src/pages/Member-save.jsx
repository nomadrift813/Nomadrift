import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../sass/scss/member-save.scss';
import { getFavList, setFavList, FAV_EVENT, hydrateFavIcons } from '../js/favStore';

const MemberSave = () => {
    const [items, setItems] = useState(() => getFavList('diary'));
    const navigate = useNavigate();
  // 設定網頁標題
  useEffect(() => {
    document.title = '收藏日記｜漂遊牧';
    // 空陣列 [] 表示這個副作用只會在元件首次載入時執行一次
  }, []);
    useEffect(() => {
        const sync = () => setItems(getFavList('diary'));
        window.addEventListener(FAV_EVENT, sync);
        window.addEventListener('storage', sync);
        hydrateFavIcons();
        return () => {
            window.removeEventListener(FAV_EVENT, sync);
            window.removeEventListener('storage', sync);
        };
    }, []);

    // 切換愛心（不導頁）
    const handleLike = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setItems(prev => {
            const next = prev.map(x => (x.id === id ? { ...x, liked: !x.liked } : x));
            setFavList('diary', next);
            return next;
        });
    };

    // 收藏（阻止Link，交給全域收藏委派處理）
    const stopForFav = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // 聊天 icon → 導到 /diary2
    const goDiary2 = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/diary2');
    };

    return (
        <main>
            <section id="member-save">
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
                        <p>收藏文章</p>
                    </div>

                    {items.length === 0 && (
                        <p className="empty-hint">
                            尚未收藏任何日記去
                            <Link to="/diary" className="empty-link"> 漂日記 </Link>逛逛吧！
                        </p>
                    )}

                    {items.map((p, idx) => (
                        <Link
                            key={p.id}
                            to="/diary2"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <article
                                className="diaArticleSection1 article-slide-in"
                                style={{ animationDelay: `${idx * 0.08}s` }}
                            >
                                <div className="diaArticle1">
                                    <div className="d-member">
                                        <img src={p.profileImgSrc} alt="" className="profile-avatar" />
                                        <p>{p.author}</p>
                                    </div>

                                    <div className="d-text-card">
                                        <div className="d-text">
                                            <p className="d-tit">{p.title}</p>
                                            <p className="d-word">
                                                {String(p.content).split('\n').map((line, i, arr) => (
                                                    <React.Fragment key={i}>
                                                        {line}
                                                        {i < arr.length - 1 && <br />}
                                                    </React.Fragment>
                                                ))}
                                            </p>
                                        </div>

                                        <div className="d-sign">
                                            <div className="d-locaion">
                                                <figure><img src="./img-Home/location.svg" alt="" /></figure>
                                                <p className="h-d-loc">{p.location}</p>
                                            </div>
                                            <p className="h-d-date">{p.date}</p>

                                            <div className="allbutton">
                                                <figure className="like-button" onClick={(e) => handleLike(e, p.id)}>
                                                    <img
                                                        src={p.liked ? './img-diary/heart.svg' : './img-Home/heart.svg'}
                                                        alt="愛心"
                                                    />
                                                </figure>

                                                {/* 聊天 → /diary2 */}
                                                <figure onClick={goDiary2}>
                                                    <img src="./img-Home/chat.svg" alt="留言" />
                                                </figure>

                                                <figure className="save-button" onClick={stopForFav}>
                                                    <img
                                                        alt="取消收藏"
                                                        data-fav={JSON.stringify({ type: 'diary', id: p.id, item: p })}
                                                        data-active-src="./img-diary/bookmark.svg"
                                                        data-inactive-src="./img-Home/save.svg"
                                                    />
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {p.imgSrc && (
                                    <div className="p1-sel">
                                        <figure className="dia-p1">
                                            <img src={p.imgSrc} alt="" />
                                        </figure>
                                    </div>
                                )}
                            </article>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default MemberSave;
