import { Link } from "react-router-dom"
import "../sass/scss/GroupCardStyle.scss"

const GroupCard = ({
    image,
    signupCount,
    date,
    time,
    location,
    title,
    description,
    detailLink,
    onJoin
}) => {
    const handleJoin = (e) => {
        e.preventDefault();   // 防止 Link 跳轉
        e.stopPropagation();  // 阻止事件往外冒泡
        onJoin?.();           // 交給父層處理 +1 與彈窗
    };

    return (
        <Link to={detailLink} className="group-event-card">
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
                    <button className="join" onClick={handleJoin}>
                        加入
                    </button>
                    <div className="view-more">
                        了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GroupCard
