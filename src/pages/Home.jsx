import '../sass/scss/home.scss'
import { Link } from "react-router-dom"


const Home = () => {
  return (
    <main>
      <section id="homebanner">

        <div className="homeslogan">
          <h2>在世界的浪潮中，自由前行</h2>

          <button className="home-b-form" type="button">
            <span>Start</span>
            <img src="/img-Home/home-s-right.svg" alt="" />
          </button>
        </div>

        <p className='banner-side-word'>floating your own way</p>
        <div className="homescroll">
          <img src="/img-Home/homescroll.svg" alt="" />
        </div>

        <div className="banner-line">
          <img src="/img-Home/banner-line.svg" alt="" />
        </div>

        <div className="homeboat-b">
          <img src="/img-Home/boat-b.svg" alt="" />
        </div>
      </section>

      <section className='home-advantages'>

      </section>

      <section id='homelocation'>
        <header>
          <div className='homenext'>
            <p className='h-t-1'>Start your next journey here</p>
            <p className='h-t-2'>下一站 點擊出發!</p>
          </div>
          <div className='popularcity'>
            <p>Popular</p>
            <p>City</p>
          </div>
          <figure><img src="/img-Home/home-title-line.svg" alt="" /></figure>
        </header>

        <div className='home-lo-boxs'>
          <figure className="home-city-grid">
            <img src="/img-Home/location-1.jpg" alt="" />
            <img src="/img-Home/location-2.jpg" alt="" />
            <img src="/img-Home/location-3.jpg" alt="" />
            <img src="/img-Home/location-4.jpg" alt="" />
            <img src="/img-Home/location-5.jpg" alt="" />
            <img src="/img-Home/location-6.jpg" alt="" />
            <img src="/img-Home/location-7.jpg" alt="" />
          </figure>
          <p className='home-all-spot' >
            <Link to="/location" >更多地點</Link>
          </p>

          <div className='h-location-line'>
            <img src="/img-Home/location-line.svg" alt="" />
          </div>

        </div>
        <p className='h-1-side-word-1'>next stop</p>
        <p className='h-1-side-word-2'>Top Trending Nomad Cities</p>



      </section>

      <section id='homegroup'>
        <header>
          <p className='h-t-1'>Travel solo, c<span>onn</span>ect together!</p>
          <p className='h-t-2'>漂友集合站!!</p>

        </header>
        <div className='h-l-text'>
          <div className='h-g-pic'>
            <figure className='h-g-p-1'><img src="/img-Home/group1.jpg" alt="" /></figure>
            <figure className='h-g-p-2'><img src="/img-Home/group2.jpeg" alt="" /></figure>
            <figure className='h-g-p-3'><img src="/img-Home/group3.jpeg" alt="" /></figure>
          </div>
          <ul>
            <li><span>找吃飯夥伴<img src="/img-Home/home-s-right.svg" alt="" /></span></li>
            <li><span>找工作夥伴<img src="/img-Home/home-s-right.svg" alt="" /></span></li>
            <li><span>找踩點夥伴<img src="/img-Home/home-s-right.svg" alt="" /></span></li>
            <li><span>找合租室友<img src="/img-Home/home-s-right.svg" alt="" /></span></li>
            <li><span>找 Chill 伴<img src="/img-Home/home-s-right.svg" alt="" /></span></li>
            <p className='home-all-spot' >
              <Link to="/group" >所有活動</Link>
            </p>
          </ul>
        </div>
      
        <div className="h-g-tags">
          <p className='h-g-block1'>讓你在異鄉，也有同路人～</p>
          <p className='h-g-block2'>一個人沒動力？一起就有趣！!</p>
        </div>
         <div className="h-g-botton-wrap">
        <p className='h-g-botton'>Get together Get together</p>
        </div>
      
      
      </section>
    </main>
  )
}

export default Home