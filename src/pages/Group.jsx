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
            <img src="./img-Location/scroll.svg" alt="" />
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


        <div className='group-event-card'>
          <figure class="card-media">
            <img src="raohe.jpg" alt="饒河夜市揪團活動縮圖" itemprop="image">
              <figcaption class="badge">7人已報名</figcaption>
          </figure>


        </div>
      </section >
    </main>

  )
}

export default Group
