import { Link } from "react-router-dom";
import "../sass/scss/GroupCardStyle.scss";

const GroupCard = ({
  id,
  image,
  signupCount = 0,
  groupSize = 10,         // 滿團人數（預設 10）
  date,
  time,
  location,
  title,
  description,
  detailLink,
  joined = false,         // 是否已加入
  onToggleJoin,           // 新用法：加入/取消
  onJoin                  // 舊用法：兼容
}) => {
  const isFull = Number.isFinite(groupSize) && signupCount >= groupSize;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFull && !joined) return; // 已滿且未加入者不可再加入
    if (onToggleJoin) onToggleJoin();
    else onJoin?.();
  };

  const Wrapper = detailLink ? Link : "div";
  const wrapperProps = detailLink ? { to: detailLink } : {};

  // 計算進度條百分比
  const pct = Math.max(0, Math.min(100, Math.round((signupCount / (groupSize || 1)) * 100)));

  return (
    <Wrapper
      className={`group-event-card ${joined ? "is-joined" : ""} ${isFull ? "is-full" : ""}`}
      data-id={id}
      {...wrapperProps}
    >
      {image && (
        <figure className="card-img">
          <img src={image} alt={title} />
          {/* 右上角人數徽章：顯示已報名/滿團人數 */}
          <div className="badge-signup-count" aria-label="已報名人數">
            {signupCount} / {groupSize} 人
            {/* 報名進度條 */}
            <div className="people-progress" role="progressbar" aria-valuemin={0} aria-valuemax={groupSize} aria-valuenow={signupCount}>
              <div className="people-progress-bar" style={{ width: `${pct}%` }} />
            </div>
          </div>
          {isFull && (
            <div className="badge-full" aria-label="已滿團">已滿團</div>
          )}
          <div className="card-location">{location}</div>
        </figure>
      )}

      <div className="card-content">
        <header className="card-header">
          <div className="datetime">
            <div className="date">{date}</div>
            <div className="time">{time}</div>
          </div>
          {/* <div className="card-location">{location}</div> */} {/* 移到圖片上 */}
        </header>

        <article className="card-item">
          <h2>{title}</h2>
          <p>{description}</p>
        </article>

        <div className="card-btns">
          <button
            className={`join ${joined ? "is-cancel" : ""} ${isFull && !joined ? "is-disabled" : ""}`}
            onClick={handleClick}
            disabled={isFull && !joined}
            aria-disabled={isFull && !joined}
          >
            {isFull && !joined ? "已滿團" : (joined ? "取消" : "加入")}
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
