import { Link } from "react-router-dom";
import "../sass/scss/GroupCardStyle.scss";

const GroupCard = ({
  id,
  image,
  signupCount,
  date,
  time,
  location,
  title,
  description,
  detailLink,
  joined = false,           // ✅ 新增：是否已加入（member-group 會傳 true）
  onToggleJoin,             // ✅ 新增：加入/取消 切換
  onJoin                    // 兼容舊用法（Group 頁傳 onJoin）
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // 優先走 onToggleJoin；舊用法 fallback 到 onJoin
    if (onToggleJoin) onToggleJoin();
    else onJoin?.();
  };

  // 如果沒有 detailLink，就不要用 <Link> 包，避免點到其它地方導頁
  const Wrapper = detailLink ? Link : "div";
  const wrapperProps = detailLink ? { to: detailLink } : {};

  return (
    <Wrapper className="group-event-card" {...wrapperProps}>
      {image && (
        <figure className="card-img">
          <img src={image} alt={title} />
          {signupCount !== undefined && (
            <div className="badge-signup-count" aria-label="已報名人數">
              {(signupCount ?? 0)}人已報名
            </div>
          )}
        </figure>
      )}

      <div className="card-content">
        <header className="card-header">
          <div className="datetime">
            <div className="date">{date}</div>
            <div className="time">{time}</div>
          </div>
          <div className="card-location">{location}</div>
        </header>

        <article className="card-item">
          <h2>{title}</h2>
          <p>{description}</p>
        </article>

        <div className="card-btns">
          <button
            className={`join ${joined ? "is-cancel" : ""}`}  // ✅ 套用取消樣式
            onClick={handleClick}
          >
            {joined ? "取消" : "加入"}                         {/* ✅ 文字切換 */}
          </button>
          {detailLink && (
            <div className="view-more">
              了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default GroupCard;
