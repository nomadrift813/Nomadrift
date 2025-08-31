import '../sass/scss/group2.scss'
import { Link } from "react-router-dom"

const Group2 = () => {
    return (
        <main>
            {/* Banner區 */}
            <section id="groupBanner2">
                <img src="./img-Group/g-2-BN.jpg" alt="" />
                <div className='groupSlogan2'>
                    <h3>Activity theme</h3>
                    <div className="line"></div>
                    <h2>一起逛饒河夜市</h2>
                </div>
            </section>

            {/* 內文資訊*/}
            <section id='groupInfo'>
                <div className='activity-main'>
                    <figure className='info_img'>
                        <img src="./img-Group/night-market.jpg" alt="" />
                    </figure>

                    <div className='activity-introduction'>
                        <li>
                            <h3>活動類型</h3>
                            <p>#吃飯探索 #美食旅遊 #認識朋友</p>
                        </li>

                        <li>
                            <h3>活動時間</h3>
                            <p>2025/ 09/ 12　18:00 ~ 22:00</p>
                        </li>

                        <li>
                            <h3>集合地點</h3>
                            <p>台灣/ 台北市　捷運松山站 4 號出口</p>
                        </li>

                        <li>
                            <h3>報名截止日</h3>
                            <p>2025/ 09/ 10　23:59</p>
                        </li>

                        <div className='activity-btn'>
                            <button className='pm'>私訊揪團主</button>
                            <button className='join'>報名參加<img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
                        </div>
                    </div>
                </div>

                <article className='activity-content'>
                    <div className='content-title'>
                        <h3>Activity content</h3>
                        <div className="line"></div>
                        <h2>活動說明</h2>
                        <p>來去饒河夜市走走吧！集合好之後就一起逛，先買個剛出爐的胡椒餅，再來一杯冰冰涼涼的仙草茶，邊吃邊聊超chill～一路上想停哪就停哪，看到什麼想吃就買，沒有SOP、也不用趕行程，就是數位遊牧者聚在一起隨興散步，順便認識新朋友。燈火通明、人聲熱鬧，美食香氣一路陪伴，聊工作、聊旅行、聊生活，輕鬆自在到不想回家，快來加入我們，用夜市的熱鬧氛圍開啟一個超好玩的夜晚吧！</p>
                    </div>

                </article>
            </section>

            {/* 發起人+報名人數 */}
            <section id='people-info'>
                <div className='organizer-info'>
                    <h3>發起人</h3>
                    <p>Peggy Chen</p>
                    <img className='people-img' src="./img-Group/people/organizer.jpg" alt="" />
                </div>
                <div className='participants'>
                    <h3>報名人數</h3>
                    <p>7 人已報名</p>

                    <div className='join-people'>
                        <img className='people-img' src="./img-Group/people/join-people (1).jpg" alt="" />
                        <img className='people-img2' src="./img-Group/people/join-people (2).jpg" alt="" />
                        <img className='people-img2' src="./img-Group/people/join-people (3).jpg" alt="" />
                        <img className='people-img2' src="./img-Group/people/join-people (4).jpg" alt="" />
                        <img className='people-img2' src="./img-Group/people/join-people (5).jpg" alt="" />
                        <img className='people-img2' src="./img-Group/people/join-people (6).jpg" alt="" />
                    </div>
                </div>
            </section>

            {/* 留言區 */}
            <section id='activity-comments'>
                <h3>留言區</h3>
                {/* Sherry */}
                <div className='comment'>
                    <img className="commenter-photo" src="./img-Group/people/Commenter (1).jpg" alt="" />
                    <div className='comment-content'>
                        <p className='commenter-name'>Sherry</p>
                        <p>哇～夜市行程聽起來也太讚了吧！可惜那天有事走不開😭</p>
                    </div>
                </div>
                {/* Eason */}
                <div className='comment'>
                    <img className="commenter-photo" src="./img-Group/people/Commenter (2).jpg" alt="" />
                    <div className='comment-content'>
                        <p className='commenter-name'>Eason</p>
                        <p>我超愛逛夜市耶！饒河真的推推！！</p>
                    </div>
                </div>
                {/* Jason */}
                <div className='comment'>
                    <img className="commenter-photo" src="./img-Group/people/Commenter (3).jpg" alt="" />
                    <div className='comment-content'>
                        <p className='commenter-name'>Jason</p>
                        <p>團主的揪團超棒！希望下次能跟到！</p>
                    </div>
                </div>
                {/* Andy Chen */}
                <div className='comment'>
                    <img className="commenter-photo" src="./img-Group/people/People-(10).jpg" alt="" />
                    <div className='comment-content'>
                        <p className='commenter-name'>Andy Chen</p>
                        <p className='input'>我要留言</p>
                    </div>
                </div>


            </section>

            {/* 更多揪團 */}
            <section id='more-activities'>
                <div className="more-activities-title">
                    <h3>More Fun Together</h3>
                    <div className="line"></div>
                    <h2>更多揪團</h2>
                </div>

                <div className='more-activities-cards'>
                    {/* 揪團卡片_投杯乒乓 Beer pong */}
                    <Link to="/group2" className="group-event-card">
                        {/* 上半部圖片 */}
                        <figure className="card-img">
                            <img src="./img-Group/beer-pong.jpeg" alt="" />
                            <div className="badge-signup-count" aria-label="已報名人數">4人已報名</div>
                        </figure>

                        {/* 下半部活動內容 */}
                        <div className="card-content">
                            {/* 活動時間, 地點 */}
                            <header className='card-date'>2025/09/25  17:00
                                <div className='card-location'>紐西蘭</div>
                            </header>
                            {/* 活動標題+內容 */}
                            <article className="card-item">
                                <h2>投杯乒乓 Beer pong</h2>
                                <p>想看朋友一口接一口喝啤酒嗎？
                                    快來展現你的精準投球能力吧！
                                    **遊戲規則**：
                                    - 每個回合內，每人有兩次機會投對方的杯子。
                                    - 投進一個杯子，對方就要喝一口。
                                    - 如果兩球進了不同的杯子，對方要拿三杯、喝三口。
                                    - 如果兩球進了同一個杯子，對方要拿四杯、喝四口。</p>
                            </article>

                            <div className="card-btns">
                                <button className="join">加入</button>
                                <button className="view-more">了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
                            </div>
                        </div>
                    </Link>

                    {/* 揪團卡片_每周一網球 */}
                    <Link to="/group2" className="group-event-card">
                        {/* 上半部圖片 */}
                        <figure className="card-img">
                            <img src="./img-Group/tennis.jpg" alt="" />
                            <div className="badge-signup-count" aria-label="已報名人數">5人已報名</div>
                        </figure>

                        {/* 下半部活動內容 */}
                        <div className="card-content">
                            {/* 活動時間, 地點 */}
                            <header className='card-date'>2025/10/13  10:00
                                <div className='card-location'>里斯本</div>
                            </header>
                            {/* 活動標題+內容 */}
                            <article className="card-item">
                                <h2>每周一網球</h2>
                                <p>手癢想打網球卻找不到球友嗎?
                                    周一網球社歡迎你的加入，我們有哥等級的給你練練技術，也有初階等級的夥伴跟你一起搭配練習，快來加入!</p>
                            </article>

                            <div className="card-btns">
                                <button className="join">加入</button>
                                <button className="view-more">了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
                            </div>
                        </div>
                    </Link>

                    {/* 揪團卡片_一日艾蜜莉在巴黎 */}
                    <Link to="/group2" className="group-event-card">
                        {/* 上半部圖片 */}
                        <figure className="card-img">
                            <img src="./img-Group/Paris.jpg" alt="" />
                            <div className="badge-signup-count" aria-label="已報名人數">8人已報名</div>
                        </figure>

                        {/* 下半部活動內容 */}
                        <div className="card-content">
                            {/* 活動時間, 地點 */}
                            <header className='card-date'>2025/09/17  8:00
                                <div className='card-location'>巴黎</div>
                            </header>
                            {/* 活動標題+內容 */}
                            <article className="card-item">
                                <h2>一日艾蜜莉在巴黎</h2>
                                <p>打卡所有劇中的經典景點，化身艾蜜莉漫遊城市角落，走進每一幕熟悉場景，從咖啡館到花店，劇迷絕對不能錯過的一日朝聖行程，讓你拍好拍滿、浪漫爆棚！</p>
                            </article>

                            <div className="card-btns">
                                <button className="join">加入</button>
                                <button className="view-more">了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
                            </div>
                        </div>
                    </Link>

                </div>
            </section>

            {/* 發起揪團 */}
            <section id='createGroup'>
                <div className="createGroup-title">
                    <h2>沒有喜歡的團？</h2>
                    <div className="line"></div>
                    <button>發起揪團</button>
                </div>

            </section>
        </main>
    )
}
export default Group2