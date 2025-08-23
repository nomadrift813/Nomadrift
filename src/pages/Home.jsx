import '../sass/scss/home.scss'
import homesright from '../images/img-Home/home-s-right.svg'
import homescroll from '../images/img-Home/homescroll.svg'
import bannerline from '../images/img-Home/banner-line.svg'
import boatb from '../images/img-Home/boat-b.svg'

import location1 from '../images/img-Home/location-1.jpg'
import location2 from '../images/img-Home/location-2.jpg'
import location3 from '../images/img-Home/location-3.jpg'
import location4 from '../images/img-Home/location-4.jpg'
import location5 from '../images/img-Home/location-5.jpg'
import location6 from '../images/img-Home/location-6.jpg'
import location7 from '../images/img-Home/location-7.jpg'


const Home = () => {
  return (
    <main>
      <section id="homebanner">

        <div className="homeslogan">
          <h2>在世界的浪潮中，自由前行</h2>

          <button className="home-b-form" type="button">
            <span>Start</span>
            <img src="/img-Home/HomeBanner.jpg" alt="" />
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
        <div className='homenext'>
          <p className='h-n-1'>Start your next journey here</p>
          <p className='h-n-2'>下一站 點擊出發!</p>
        </div>   
        <div className='popularcity'>
          <p>Popular</p>
          <p>City</p>
        </div>
        <figure className="home-city-grid">
          <img src="/img-Home/location-1.jpg" alt="" />
          <img src="/img-Home/location-2.jpg" alt="" />
          <img src="/img-Home/location-3.jpg" alt="" />
          <img src="/img-Home/location-4.jpg" alt="" />
          <img src="/img-Home/location-5.jpg" alt="" />
          <img src="/img-Home/location-6.jpg" alt="" />
          <img src="/img-Home/location-7.jpg" alt="" />
        </figure>
        <p>next stop</p>
        <p>Top Trending Nomad Cities</p>

        <button className='home-all-spot' type='button'>
          所有地點
        </button>

      </section>
    </main>
  )
}

export default Home