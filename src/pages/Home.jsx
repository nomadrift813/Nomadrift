import React from 'react'
import homebanner from '../images/img-Home/HomeBanner.jpg'
import '../sass/scss/home.scss'
const Home = () => {
  return (
    <main>
      <section className="homebanner">
        <figure>
          <img src={homebanner} alt="home banner" />
        </figure>

        <div className="homeslogan"> 
          <h2>在世界的浪潮中， 自由前行</h2>
          <form name="home-b-form" id="home-b-form" method="post" accept-charset="UTF-8">
            <input type="button" value="Start" className="home-b-button" />
          </form>
        </div>

        <div className="homesideword">
          <p>floating your own way</p>
        </div>
      </section>
    </main>
  )
}

export default Home