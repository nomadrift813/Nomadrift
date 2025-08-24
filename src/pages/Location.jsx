import '../sass/scss/location.scss'

const Location = () => {
  return (
    <main>
      {/* 熱門地點 */}
      <section id="locBanner">
        <div className='locSlogan'>
          <div className='locTitle'>
            <p className='l-t-1'>Start your next journey here</p>
            <p className='l-t-2'>熱門地點</p>
          </div>
          <div className="locScroll">
            <img src="/img-Location/scroll.svg" alt="" />
          </div>
        </div>

        <p className='locBanner-side-word'>where is the next</p>
      </section>

      {/* 探索所有地點 */}
      <section id='discover'>
        <header>
          <p className='l-t-1'>Discover Ev<span>ery </span>Destination</p>
          <p className='l-t-2'>探索所有地點</p>
        </header>
        <div className='locDrop'>
          <ul>
            <li>亞洲</li><img src="img-Location/smScroll.svg" alt="" />
          </ul>
          <ul>
            <li>歐洲</li><img src="img-Location/smScroll.svg" alt="" />
          </ul>
          <ul>
            <li>北美洲</li><img src="img-Location/smScroll.svg" alt="" />
          </ul>
          <ul>
            <li>中南美洲</li><img src="img-Location/smScroll.svg" alt="" />
          </ul>
          <ul>
            <li>非洲</li><img src="img-Location/smScroll.svg" alt="" />
          </ul>
          <ul>
            <li>大洋洲</li><img src="img-Location/smScroll.svg" alt="" />
          </ul>
        </div>
      </section>

      {/* 城市卡片 */}
      <section id='global'>
        <article className='asia'>
          <figure><img src="" alt="" /></figure>
          <h2>亞洲</h2>
        </article>

        <section className='manila'>
          <div className='p1-sel'>
            <figure className='loc-p1'><img src="img-Location/Manila.jpg" alt="" /></figure>
            <figure className='select'><img src="img-Location/select.png" alt="" /></figure>
          </div>
          <article className='loc-info'>
            <h2>馬尼拉</h2>
            <p className='loc-text'>是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。</p>
            <div className='wi-st'>
              <ul>
                <img src="img-Location/Wifi.png" alt="" /><p>242Mbps</p>
              </ul>
              <figure className='stars'>
                <img src="img-Location/Star1.png" alt="" />
                <img src="img-Location/Star1.png" alt="" />
                <img src="img-Location/Star2.png" alt="" />
                <img src="img-Location/Star2.png" alt="" />
                <img src="img-Location/Star2.png" alt="" />
              </figure>
            </div>
            <span>15000 /月</span>
          </article>
          <div className='color-block'></div>
        </section>

      </section>

    </main>

  )
}

export default Location