import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../sass/scss/member-diary.scss';
import { getAuthFromLS } from '../js/favStore';
import { getMyDiaryList, removeMyDiary } from '../js/myDiaryStore'; // ⭐ 多匯入 remove
import { FaRegTrashAlt } from "react-icons/fa";

const MemberDiary = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const a = getAuthFromLS();
    setAuth(a);
    setList(getMyDiaryList(a));
  }, []);

  const handleGoDiary2 = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/diary2');
  };

  // ⭐ 刪除按鈕
  const handleDelete = (e, id) => {
  e.preventDefault();
  e.stopPropagation();
  if (!window.confirm('確定要刪除這篇日記嗎？刪除後無法復原。')) return;

  const res = removeMyDiary(id, auth);
  setList(res.list); // ← 用回傳的 list
};

  return (
    <main>
      <section id="member-diary">
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
            <p>我發布的日記</p>
          </div>

          <article>
            {list.length === 0 && <p className="empty-hint">尚未發布任何日記去<Link to="/diary" className="empty-link"> 漂日記 </Link>逛逛吧</p>}

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
                  {post.imgSrc && (
                    <div className="p1-sel">
                      <figure className="dia-p1">
                        <img src={post.imgSrc} alt="" />
                      </figure>
                    </div>
                  )}

                  <article className="diaArticle1">
                    <div className="d-member">
                      <img
                        src={post.profileImgSrc}
                        alt={`${post.author} 的頭像`}
                        className="profile-avatar"
                      />
                      <p>{post.author}</p>

                      {/* ⭐ 刪除按鈕（右側小垃圾桶） */}
                      <button
                        className="md-delete-btn"
                        onClick={(e) => handleDelete(e, post.id)}
                        title="刪除這篇日記"
                        aria-label="刪除這篇日記"
                      >
                        <FaRegTrashAlt />
                      </button>
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
    </main>
  );
};

export default MemberDiary;
