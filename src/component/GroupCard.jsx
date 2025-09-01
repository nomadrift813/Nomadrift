import { Link } from "react-router-dom"
import "../sass/scss/GroupCardStyle.scss"

const GroupCard = ({
    image,
    signupCount,
    dateTime,
    location,
    title,
    description,
    detailLink,
    onJoin
}) => {
    return (
        <div className="group-event-card">
            {/* 上半部圖片 (有傳 image 才渲染) */}
            {image && (
                <figure className="card-img">
                    <img src={image} alt={title} />
                    {signupCount !== undefined && (
                        <div className="badge-signup-count" aria-label="已報名人數">
                            {signupCount}人已報名
                        </div>
                    )}
                </figure>
            )}

            {/* 下半部活動內容 */}
            <div className="card-content">
                <header className="card-date">
                    {dateTime}
                    <div className="card-location">{location}</div>
                </header>

                <article className="card-item">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </article>

                <div className="card-btns">
                    <button className="join" onClick={onJoin}>
                        加入
                    </button>
                    <Link to={detailLink} className="view-more">
                        了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" />
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default GroupCard
