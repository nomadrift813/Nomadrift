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
            </section>

            <article className='activity-content'>
                <div className='content-title'>
                    <h3>Activity content</h3>
                    <div className="line"></div>
                    <h2>活動說明</h2>
                    <p>來去饒河夜市走走吧！集合好之後就一起逛，先買個剛出爐的胡椒餅，再來一杯冰冰涼涼的仙草茶，邊吃邊聊超chill～一路上想停哪就停哪，看到什麼想吃就買，沒有SOP、也不用趕行程，就是數位遊牧者聚在一起隨興散步，順便認識新朋友。燈火通明、人聲熱鬧，美食香氣一路陪伴，聊工作、聊旅行、聊生活，輕鬆自在到不想回家，快來加入我們，用夜市的熱鬧氛圍開啟一個超好玩的夜晚吧！</p>
                </div>

            </article>
        </main>
    )
}
export default Group2