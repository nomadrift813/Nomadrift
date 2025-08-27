import '../sass/scss/group.scss'
import { Link } from "react-router-dom"

const Group = () => {
  return (
    <><main>
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
    </main>


      {/* 內容區 */}
      {/* 主標題 */}
      <section id="group-content">
        <div className='content-title'>
          <h3>Travel solo, connect together!</h3>
          <div className="line"></div>
          <h2>漂友集合站！</h2>
        </div>

        {/* 各揪團按鈕 */}
        <div id="button-list">
        <ul className="group-buttons">
          <li><button>全部活動</button></li>
          <li><button>找吃飯夥伴</button></li>
          <li><button>找工作夥伴</button></li>
          <li><button>找踩點夥伴</button></li>
          <li><button>找合租室友</button></li>
          <li><button>找Chill伴</button></li>
        </ul>
        </div>

        <div className='group-card'></div>
      </section>
    </>

  )
}

export default Group
