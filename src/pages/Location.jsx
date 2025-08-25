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
        
        {/* 亞洲區 */}
        <article className='asia'>
          <figure><img src="" alt="" /></figure>
          <h2>亞洲</h2>
        </article>

        {/* 亞洲卡片1 */}
        <section className='manila'>
          <div className='p1-sel'>
            <figure className='loc-p1'><img src="img-Location/Manila.jpg" alt="" /></figure>
            <figure className='select'><img src="img-Location/select.svg" alt="" /></figure>
          </div>
          <article className='loc-info'>
            <h2>馬尼拉</h2>
            <p className='loc-text'>是歷史與現代交融的城市，擁有西班牙殖民遺跡與繁忙商業區，文化多元，生活節奏熱情而活力十足。</p>
            <div className='wi-st'>
              <ul>
                <img src="img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
              </ul>
              <figure className='stars'>
                <img src="img-Location/Star1.svg" alt="" />
                <img src="img-Location/Star1.svg" alt="" />
                <img src="img-Location/Star2.svg" alt="" />
                <img src="img-Location/Star2.svg" alt="" />
                <img src="img-Location/Star2.svg" alt="" />
              </figure>
            </div>
            <span>15000 /月</span>
          </article>
          <div className='color-block'></div>
        </section>
        {/* 亞洲卡片2 */}
        <section className='nepal'>
          <div className='p1-sel'>
            <figure className='loc-p1'><img src="img-Location/Nepal.jpg" alt="" /></figure>
            <figure className='select'><img src="img-Location/select.svg" alt="" /></figure>
          </div>
          <article className='loc-info'>
            <h2>尼泊爾</h2>
            <p className='loc-text'>位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。</p>
            <div className='wi-st'>
              <ul>
                <img src="img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
              </ul>
              <figure className='stars'>
                <img src="img-Location/Star1.svg" alt="" />
                <img src="img-Location/Star1.svg" alt="" />
                <img src="img-Location/Star1.svg" alt="" />
                <img src="img-Location/Star1.svg" alt="" />
                <img src="img-Location/Star2.svg" alt="" />
              </figure>
            </div>
            <span>15000 /月</span>
          </article>
          <div className='color-block'></div>
        </section>
        {/* 亞洲卡片3 */}
        <section className='israel'>
          <div className='p1-sel'>
            <figure className='loc-p1'><img src="img-Location/Israel.jpg" alt="" /></figure>
            <figure className='select'><img src="img-Location/select.svg" alt="" /></figure>
          </div>
          <article className='loc-info'>
            <h2>以色列</h2>
            <p className='loc-text'>融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。</p>
            <div className='wi-st'>
              <ul>
                <img src="img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
              </ul>
              <figure className='stars'>
                <img src="img-Location/Star1.svg" alt="" />
                <img src="img-Location/Star2.svg" alt="" />
                <img src="img-Location/Star2.svg" alt="" />
                <img src="img-Location/Star2.svg" alt="" />
                <img src="img-Location/Star2.svg" alt="" />
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