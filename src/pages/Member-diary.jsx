import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../sass/scss/member-diary.scss';
import { getAuthFromLS } from '../js/favStore';
import { getMyDiaryList, removeMyDiary } from '../js/myDiaryStore';
import { FaRegTrashAlt } from "react-icons/fa";

// 從 favStore 導入收藏相關函數
import { hydrateFavIcons, getFavList, setFavList, FAV_EVENT } from '../js/favStore';

// ✅ 使用與 MemberSave.js 相同的邏輯
const MemberDiary = () => {
    // 使用 favStore 的 getFavList 初始化 state，確保與收藏頁面同步
    const [list, setList] = useState(() => {
        const auth = getAuthFromLS();
        const initialListFromStore = getMyDiaryList(auth);
        const favs = getFavList('diary'); // 從 favStore 讀取收藏狀態
        
        // 結合日記列表和收藏狀態
        const combinedList = initialListFromStore.map(post => {
            const isLiked = favs.some(fav => fav.id === post.id && fav.liked);
            const isBookmarked = favs.some(fav => fav.id === post.id); // 檢查是否在收藏清單中
            return {
                ...post,
                liked: isLiked,
                bookmarked: isBookmarked
            };
        });
        return combinedList;
    });

    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        document.title = '我的文章｜漂遊牧';
    }, []);

    useEffect(() => {
        const a = getAuthFromLS();
        setAuth(a);

        // ✅ 設定事件監聽器，當收藏狀態改變時自動更新頁面
        const sync = () => {
            const updatedList = getMyDiaryList(a);
            const favs = getFavList('diary');
            const combinedList = updatedList.map(post => {
                const isLiked = favs.some(fav => fav.id === post.id && fav.liked);
                const isBookmarked = favs.some(fav => fav.id === post.id);
                return {
                    ...post,
                    liked: isLiked,
                    bookmarked: isBookmarked
                };
            });
            setList(combinedList);
        };

        window.addEventListener(FAV_EVENT, sync);
        window.addEventListener('storage', sync);
        hydrateFavIcons(); // 初始化收藏圖示狀態

        return () => {
            window.removeEventListener(FAV_EVENT, sync);
            window.removeEventListener('storage', sync);
        };
    }, []);


    const handleGoDiary2 = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/diary2');
    };

    const closeConfirmDeleteModal = () => {
        setShowConfirmDeleteModal(false);
        setPostIdToDelete(null);
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const handleDeleteClick = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setPostIdToDelete(id);
        setShowConfirmDeleteModal(true);
    };

    const confirmAndDelete = () => {
        closeConfirmDeleteModal();
        removeMyDiary(postIdToDelete, auth);
        
        // ✅ 刪除日記時，同時從 favStore 中移除收藏狀態
        const favs = getFavList('diary');
        const updatedFavs = favs.filter(item => item.id !== postIdToDelete);
        setFavList('diary', updatedFavs);
        
        const updatedList = getMyDiaryList(auth);
        const finalFavs = getFavList('diary');
        const listAfterDelete = updatedList.map(post => {
            const isLiked = finalFavs.some(fav => fav.id === post.id && fav.liked);
            const isBookmarked = finalFavs.some(fav => fav.id === post.id);
            return {
                ...post,
                liked: isLiked,
                bookmarked: isBookmarked
            };
        });
        setList(listAfterDelete);

        setShowSuccessModal(true);
    };

    // ✅ 處理愛心點擊，使用 favStore 的 setFavList 更新狀態
    const handleLikeClick = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        const favs = getFavList('diary');
        const updatedFavs = favs.map(fav => {
            if (fav.id === id) {
                return { ...fav, liked: !fav.liked };
            }
            return fav;
        });
        setFavList('diary', updatedFavs);
    };

    // ✅ 處理書籤點擊，使用 favStore 的 setFavList 更新狀態
    const handleBookmarkClick = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        const itemToToggle = list.find(item => item.id === id);
        if (!itemToToggle) return;
        
        const favs = getFavList('diary');
        const index = favs.findIndex(fav => fav.id === id);

        if (index > -1) {
            // 已收藏，移除它
            const updatedFavs = favs.filter(fav => fav.id !== id);
            setFavList('diary', updatedFavs);
        } else {
            // 未收藏，加入它
            const newFavs = [...favs, { type: 'diary', id: id, item: itemToToggle }];
            setFavList('diary', newFavs);
        }
    };


    return (
        <main>
            <section id="member-diary">
                <header>
                    <ul>
                        <li><Link to="/member">會員資料</Link></li>
                        <li><Link to="/memberCity">收藏國家</Link></li>
                        <li><Link to="/memberdiary">我的文章</Link></li>
                        <li><Link to="/membersave">收藏日記</Link></li>
                        <li><Link to="/membergroup">活動紀錄</Link></li>
                    </ul>
                </header>

                <div className='m-all-box'>
                    <div className='m-d-title'>
                        <p>我發布的日記</p>
                    </div>

                    <article>
                        {list.length === 0 && <p className="empty-hint">尚未發布任何文章去<Link to="/diary" className="empty-link"> 漂日記 </Link>逛逛吧！</p>}

                        {list.map((post, index) => (
                            <Link
                                to="/diary2"
                                key={post.id}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <section
                                    className="diaArticleSection1 article-slide-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="p1-sel">
                                        {post.imgSrc && (
                                            <figure className="dia-p1">
                                                <img src={post.imgSrc} alt="" />
                                            </figure>
                                        )}
                                        <div className='delete-btn-container'>
                                            <button
                                                className="md-delete-btn"
                                                onClick={(e) => handleDeleteClick(e, post.id)}
                                                title="刪除這篇日記"
                                                aria-label="刪除這篇日記"
                                            >
                                                <FaRegTrashAlt />
                                            </button>
                                        </div>
                                    </div>

                                    <article className="diaArticle1">
                                        <div className="d-member">
                                            <img
                                                src={post.profileImgSrc}
                                                alt={`${post.author} 的頭像`}
                                                className="profile-avatar"
                                            />
                                            <p>{post.author}</p>
                                        </div>

                                        <div className="d-text-card">
                                            <div className="d-text">
                                                <p className="d-tit">{post.title}</p>
                                                <p className="d-word">
                                                    {String(post.content).split('\n').map((line, i, arr) => (
                                                        <React.Fragment key={i}>
                                                            {line}
                                                            {i < arr.length - 1 && <br />}
                                                        </React.Fragment>
                                                    ))}
                                                </p>
                                            </div>

                                            <div className="d-sign">
                                                <div className="d-locaion">
                                                    <figure>
                                                        <img src="./img-Home/location.svg" alt="" />
                                                    </figure>
                                                    <p className="h-d-loc">{post.location}</p>
                                                </div>

                                                <p className="h-d-date">{post.date}</p>

                                                <div className="allbutton">
                                                    <figure onClick={(e) => handleLikeClick(e, post.id)}>
                                                        <img
                                                            src={post.liked ? './img-diary/heart.svg' : './img-Home/heart.svg'}
                                                            alt="愛心圖示"
                                                        />
                                                    </figure>

                                                    <figure onClick={handleGoDiary2}>
                                                        <img src="./img-Home/chat.svg" alt="留言" />
                                                    </figure>

                                                    <figure onClick={(e) => handleBookmarkClick(e, post.id)}>
                                                        <img
                                                            alt="收藏圖示"
                                                            src={post.bookmarked ? './img-diary/bookmark.svg' : './img-Home/save.svg'}
                                                            data-fav={JSON.stringify({
                                                                type: 'diary',
                                                                id: post.id,
                                                                item: post,
                                                            })}
                                                            data-active-src="./img-diary/bookmark.svg"
                                                            data-inactive-src="./img-Home/save.svg"
                                                        />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </section>
                            </Link>
                        ))}
                    </article>
                </div>

                {showConfirmDeleteModal && (
                    <div className="custom-modal-backdrop" style={{ zIndex: 3000 }} onClick={closeConfirmDeleteModal}>
                        <div
                            className="custom-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="error-icon">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="30" fill="#F4D000" />
                                    <path
                                        d="M30 15V35M30 40H30.01"
                                        stroke="white"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="custom-modal-header">
                                <h3>確認刪除</h3>
                            </div>
                            <div className="custom-modal-body">
                                <p>確定要刪除這篇日記嗎？刪除後無法復原。</p>
                            </div>
                            <div className="modal-buttons">
                                <button className="modal-cancel-button" onClick={closeConfirmDeleteModal}>取消</button>
                                <button className="modal-ok-button" onClick={confirmAndDelete}>確定刪除</button>
                            </div>
                        </div>
                    </div>
                )}

                {showSuccessModal && (
                    <div className="custom-modal-backdrop" style={{ zIndex: 3000 }} onClick={closeSuccessModal}>
                        <div
                            className="custom-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="error-icon">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="30" fill="#F4D000" />
                                    <path
                                        d="M20 30L28 38L40 25"
                                        stroke="white"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="custom-modal-header">
                                <h3>刪除成功</h3>
                            </div>
                            <div className="custom-modal-body">
                                <p>日記已成功刪除。</p>
                            </div>
                            <div className="modal-buttons">
                                <button className="modal-ok-button" onClick={closeSuccessModal}>確定</button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};

export default MemberDiary;
