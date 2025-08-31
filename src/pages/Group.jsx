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
      <section className="group-content">
        <div className="g-content-title">
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

        {/* 所有卡片合輯 */}
        <div className='cards-container'>

        <div className='all-cards'>
          {/* 揪團卡片_饒河夜市 */}
          <Link to="/group2"  className="group-event-card">
            {/* 上半部圖片 */}
            <figure className="card-img">
              <img src="./img-Group/night-market.jpg" alt="night-market" />
              <div className="badge-signup-count" aria-label="已報名人數">8人已報名</div>
            </figure>

            {/* 下半部活動內容 */}
            <div className="card-content">
              {/* 活動時間, 地點 */}
              <header className='card-date'>2025/09/12  18:00
                <div className='card-location'>台灣</div>
              </header>
              {/* 活動標題+內容 */}
              <article className="card-item">
                <h2>逛饒河夜市</h2>
                <p>來去饒河夜市走走吧！集合好之後就一起逛，先買個剛出爐的胡椒餅，再來一杯冰冰涼涼的仙草茶，邊吃邊聊超chill～一路上想停哪就停哪，看到什麼想吃就買，沒有SOP、也不用趕行程，就是數位遊牧者聚在一起隨興散步，順便認識新朋友。燈火通明、人聲熱鬧，美食香氣一路陪伴，聊工作、聊旅行、聊生活，輕鬆自在到不想回家，快來加入我們，用夜市的熱鬧氛圍開啟一個超好玩的夜晚吧！</p>
              </article>

              <div className="card-btns">
                <button className="join">加入</button>
                <button className="view-more">了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
              </div>
            </div>
          </Link>

          {/* 揪團卡片_一起征服米其林 */}
          <Link to="/group2"  className="group-event-card">
            {/* 上半部圖片 */}
            <figure className="card-img">
              <img src="./img-Group/dinner.jpg" alt="" />
              <div className="badge-signup-count" aria-label="已報名人數">5人已報名</div>
            </figure>

            {/* 下半部活動內容 */}
            <div className="card-content">
              {/* 活動時間, 地點 */}
              <header className='card-date'>2025/09/20  19:00
                <div className='card-location'>曼谷</div>
              </header>
              {/* 活動標題+內容 */}
              <article className="card-item">
                <h2>一起征服米其林</h2>
                <p>這次我們把筆電和咖啡廳先放一邊，換上米其林二星餐桌，享受主廚精心設計的 tasting menu，邊品嚐邊聊遊牧工作與旅行故事。用餐後還會一起去昭披耶河畔小酌，看夜景繼續交流，這不是單純吃飯，而是一場奢華的遊牧社交體驗。</p>
              </article>

              <div className="card-btns">
                <button className="join">加入</button>
                <button className="view-more">了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
              </div>
            </div>
          </Link>

          {/* 揪團卡片_死了都要愛 */}
          <Link to="/group2"  className="group-event-card">
            {/* 上半部圖片 */}
            {/* <figure className="card-img">
            <img src="./img-Group/night-market.jpg" alt="night-market" />
            <div className="badge-signup-count" aria-label="已報名人數">8人已報名</div>
          </figure> */}

            {/* 下半部活動內容 */}
            <div className="card-content">
              {/* 活動時間, 地點 */}
              <header className='card-date'>2025/09/22  13:00
                <div className='card-location'>泰國</div>
              </header>
              {/* 活動標題+內容 */}
              <article className="card-item">
                <h2>死了都要愛-聯誼活動</h2>
                <p>活著如果不愛，那不如死了算，人在異國就是要來談場轟轟烈烈的戀愛，目前想約8男8女，想來場美式戀愛的朋友們快來。</p>
              </article>

              <div className="card-btns">
                <button className="join">加入</button>
                <button className="view-more">了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
              </div>
            </div>
          </Link>

          {/* 揪團卡片_來衝個早浪 */}
          <Link to="/group2"  className="group-event-card">
            {/* 上半部圖片 */}
            <figure className="card-img">
              <img src="./img-Group/surf.jpg" alt="night-market" />
              <div className="badge-signup-count" aria-label="已報名人數">9人已報名</div>
            </figure>

            {/* 下半部活動內容 */}
            <div className="card-content">
              {/* 活動時間, 地點 */}
              <header className='card-date'>2025/09/01  7:00
                <div className='card-location'>黃金海岸</div>
              </header>
              {/* 活動標題+內容 */}
              <article className="card-item">
                <h2>來衝個早浪</h2>
                <p>一起早起去海邊，踩著第一道陽光下水衝浪，滑幾道舒服的浪，讓身體醒過來，心也跟著放鬆。衝完再找間早餐店，好好開啟這一天，給生活一點鹹鹹的、自由的味道。</p>
              </article>

              <div className="card-btns">
                <button className="join">加入</button>
                <button className="view-more">了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
              </div>
            </div>
          </Link>
        </div>

        <div className='all-cards'>
          {/* 揪團卡片_投杯乒乓 Beer pong */}
          <Link to="/group2"  className="group-event-card">
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
          <Link to="/group2"  className="group-event-card">
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
          <Link to="/group2"  className="group-event-card">
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

          {/* 揪團卡片_午夜星空冥想派對 */}
          <Link to="/group2"  className="group-event-card">
            {/* 上半部圖片 */}
            {/* <figure className="card-img">
              <img src="./img-Group/surf.jpg" alt="night-market" />
              <div className="badge-signup-count" aria-label="已報名人數">9人已報名</div>
            </figure> */}

            {/* 下半部活動內容 */}
            <div className="card-content">
              {/* 活動時間, 地點 */}
              <header className='card-date'>2025/10/15  23:00
                <div className='card-location'>摩洛哥</div>
              </header>
              {/* 活動標題+內容 */}
              <article className="card-item">
                <h2>午夜星空冥想派對</h2>
                <p>集合在撒哈拉沙丘的帳篷營地，等夜幕完全降臨，大家先靜坐片刻，讓自己跟沙漠的寂靜同步。接著我會帶領一個「星空冥想體驗」，透過引導呼吸和專注，把注意力放在滿天星斗與銀河，讓腦袋從白天的工作模式切換成放鬆狀態。之後我們會進行「靈感分享環節」，每個人可以在沙漠夜空下分享自己最想完成的一個夢想，或是最近萌芽的創意。最後，我準備了小型投影裝置，在帳篷牆上映放一段「遊牧者的旅程紀錄片」或是大家共同的短片，陪伴彼此直到凌晨。這是一個融合靈性、創意、與遊牧連結的夜晚。</p>
              </article>

              <div className="card-btns">
                <button className="join">加入</button>
                <button className="view-more">了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
              </div>
            </div>
          </Link>
        </div>

        <div className='all-cards'>
          {/* 揪團卡片_參觀雪梨歌劇院 */}
          <Link to="/group2"  className="group-event-card">
            {/* 上半部圖片 */}
            <figure className="card-img">
              <img src="./img-Group/sydney-opera-house-view.jpg" alt="" />
              <div className="badge-signup-count" aria-label="已報名人數">10人已報名</div>
            </figure>

            {/* 下半部活動內容 */}
            <div className="card-content">
              {/* 活動時間, 地點 */}
              <header className='card-date'>2025/09/28  17:00
                <div className='card-location'>雪梨</div>
              </header>
              {/* 活動標題+內容 */}
              <article className="card-item">
                <h2>參觀雪梨歌劇院</h2>
                <p>澳洲雪梨必去景點!但你一定還沒有進去參觀過吧!我們正在找10個人一起團體報名，有全中文解說的導遊帶領，不用怕有聽沒有懂，目前報名人數已達5人，一人只要50澳幣，數量有限快來跟我們一起參加吧!結束還可以一起去</p>
              </article>

              <div className="card-btns">
                <button className="join">加入</button>
                <button className="view-more">了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
              </div>
            </div>
          </Link>

          {/* 揪團卡片_圖書館讀書會 */}
          <Link to="/group2"  className="group-event-card">
            {/* 上半部圖片 */}
            {/* <figure className="card-img">
              <img src="./img-Group/dinner.jpg" alt="" />
              <div className="badge-signup-count" aria-label="已報名人數">5人已報名</div>
            </figure> */}

            {/* 下半部活動內容 */}
            <div className="card-content">
              {/* 活動時間, 地點 */}
              <header className='card-date'>2025/10/02  14:00
                <div className='card-location'>泰國</div>
              </header>
              {/* 活動標題+內容 */}
              <article className="card-item">
                <h2>圖書館讀書會</h2>
                <p>看完一本書獲得很多感悟後沒地方分享嗎?來參加我們新創的讀書會，不僅可以解決你的分享欲，還可以獲得很多推薦書籍</p>
              </article>

              <div className="card-btns">
                <button className="join">加入</button>
                <button className="view-more">了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
              </div>
            </div>
          </Link>

          {/* 揪團卡片_屋頂談心 */}
          <Link to="/group2"  className="group-event-card">
            {/* 上半部圖片 */}
            <figure className="card-img">
              <img src="./img-Group/fireworks.jpeg" alt="" />
              <div className="badge-signup-count" aria-label="已報名人數">8人已報名</div>
            </figure>

            {/* 下半部活動內容 */}
            <div className="card-content">
              {/* 活動時間, 地點 */}
              <header className='card-date'>2025/09/30  20:00
                <div className='card-location'>首爾</div>
              </header>
              {/* 活動標題+內容 */}
              <article className="card-item">
                <h2>屋頂談心</h2>
                <p>心情不好，找不到好地方，好酒友，我們舉辦了一個專門給想一起看夜景，一起喝酒玩遊戲的屋頂聚會，現場提供超款桌遊跟特製調酒，別怕尷尬</p>
              </article>

              <div className="card-btns">
                <button className="join">加入</button>
                <button className="view-more">了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
              </div>
            </div>
          </Link>

          {/* 揪團卡片_88BBQ */}
          <Link to="/group2"  className="group-event-card">
            {/* 上半部圖片 */}
            <figure className="card-img">
              <img src="./img-Group/BBQ.jpg" alt="" />
              <div className="badge-signup-count" aria-label="已報名人數">9人已報名</div>
            </figure>

            {/* 下半部活動內容 */}
            <div className="card-content">
              {/* 活動時間, 地點 */}
              <header className='card-date'>2025/08/08  11:30
                <div className='card-location'>加州</div>
              </header>
              {/* 活動標題+內容 */}
              <article className="card-item">
                <h2>88BBQ</h2>
                <p>父親節帶爸爸來參加烤肉聚會吧！
                  人數限制10人，當天每個人帶自喜喜歡的食材來參加，請在報名時就填寫在報名表上，大家快來參加，加朋友
                </p>
              </article>

              <div className="card-btns">
                <button className="join">加入</button>
                <button className="view-more">了解更多 <img src="./img-Group/right-arrow.svg" alt="right-arrow" /></button>
              </div>
            </div>
          </Link>
        </div>

        </div>


      </section>
    </main>
  )
}

export default Group
