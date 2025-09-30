import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../sass/scss/member-diary.scss';
import { getAuthFromLS } from '../js/favStore';
import { getMyDiaryList, removeMyDiary } from '../js/myDiaryStore';
import { FaRegTrashAlt } from "react-icons/fa";

const MemberDiary = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);
  
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  
  // 新增：控制刪除成功提示視窗的狀態
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const a = getAuthFromLS();
    setAuth(a);
    // 首次載入頁面時，從 localStorage 取得日記列表
    const initialList = getMyDiaryList(a);
    setList(initialList);
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
  
  // 關閉成功提示視窗
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
    // 關閉確認刪除視窗
    closeConfirmDeleteModal();

    // 呼叫刪除函式，讓它處理 localStorage 的資料
    removeMyDiary(postIdToDelete, auth);
    
    // ⭐ 核心修改 ⭐
    // 直接在這邊重新讀取最新的列表，並強制觸發 React 重新渲染
    // 即使 removeMyDiary 回傳了舊的陣列，這裡也會確保狀態更新
    const updatedList = getMyDiaryList(auth);
    setList(updatedList);
    
    // 顯示「日記已刪除」的成功提示視窗
    setShowSuccessModal(true);
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
                          <figure onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                            <img
                              src={post.liked ? './img-diary/heart.svg' : './img-Home/heart.svg'}
                              alt="愛心圖示"
                            />
                          </figure>

                          <figure onClick={handleGoDiary2}>
                            <img src="./img-Home/chat.svg" alt="留言" />
                          </figure>

                          <figure onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                            <img
                              alt="收藏圖示"
                              src="./img-Home/save.svg"
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
      </section>
      
      {/* 確認刪除的 Modal (你的原始程式碼) */}
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

      {/* 新增刪除成功的 Modal */}
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
    </main>
  );
};

export default MemberDiary;