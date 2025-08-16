import '../sass/scss/home.scss'
import homesright from'../images/img-Home/home-s-right.svg'
import homescroll from'../images/img-Home/homescroll.svg'

const Home = () => {
  return (
    <main>
      <section id="homebanner">

        <div className="homeslogan">
          <h2>在世界的浪潮中， 自由前行</h2>

          <button className="home-b-form" type="button">
            <span>Start</span>
            <img src={homesright} alt="" />
          </button>
        </div>

        <p>floating your own way</p> 
        <div className="homescroll">
          <img src={homescroll} alt="" />
        </div>
      </section>
    </main>
  )
}

export default Home