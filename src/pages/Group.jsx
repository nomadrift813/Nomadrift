import '../sass/scss/group.scss'
import { Link } from "react-router-dom"

const Group = () => {
  return (
    <main>
      {/* Banner 區 */}
      <section id="groupBanner">
        <div className='groupSlogan'>
          <h3>Work, Travel, Connect Together.</h3>
          <div className="line"></div>
          <h2>一個人沒動力？一起就有趣！</h2>
          <button>發起揪團</button>
          <figure className="locScroll">
            <img src="./img-Location/scroll.svg" alt="icon" />
          </figure>
        </div>
      </section>



      {/* 內容區 */}
      {/* 主標題 */}
      <section id="group-content">
        <div className="content-title">
          <h3>Travel solo, connect together!</h3>
          <div className="line"></div>
          <h2>漂友集合站！</h2>
        </div>

        {/* 各揪團按鈕 */}
        <div className="button-list">
          <ul className="group-buttons">
            <li><a href="#">全部活動</a></li>
            <li><a href="#">找吃飯夥伴</a></li>
            <li><a href="#">找工作夥伴</a></li>
            <li><a href="#">找踩點夥伴</a></li>
            <li><a href="#">找合租室友</a></li>
            <li><a href="#">找Chill伴</a></li>
          </ul>
        </div>


        {/* 揪團卡片 */}

        {/* 上半部圖片 */}
        <section id='group-event-card'>
          <figure className="card-img">
            <img src="./img-Group/night-market.jpg" alt="night-market" itemprop="image" />
            <div className="badge-signup-count" aria-label="已報名人數">8人已報名</div>
          </figure>

          {/* 下半部活動內容 */}
          <section id="card-content">

            <header className='card-date'>2025/09/12  18:00</header>
            <div className='location'>台灣</div>

            <article className='card-item'>
              <h2>逛饒河夜市</h2>
              <p>來去饒河夜市走走吧！集合好之後就一起逛，先買個剛出爐的胡椒餅，再來一杯冰冰涼涼的仙草茶，邊吃邊聊超chill～一路上想停哪就停哪，看到什麼想吃就買，沒有SOP、也不用趕行程，就是數位遊牧者聚在一起隨興散步，順便認識新朋友。燈火通明、人聲熱鬧，美食香氣一路陪伴，聊工作、聊旅行、聊生活，輕鬆自在到不想回家，快來加入我們，用夜市的熱鬧氛圍開啟一個超好玩的夜晚吧！</p>
            </article>

            <footer className='card-btn'>
              <button className='join'>加入</button>
              <button className='view-more'>了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
            </footer>

          </section>



        </section>
      </section >
    </main>

  )
}

export default Group
