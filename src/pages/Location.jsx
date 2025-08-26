import '../sass/scss/location.scss'

const Location = () => {
  return (
    <main>
      {/* 熱門地點 banner */}
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

        <div className="hotLoc">
          <figure className='h-l-1'>
            <img src="/img-Location/Bali.jpg" alt="" />
          </figure>
          <figure className='h-l-2'>
            <img src="/img-Location/Turkey.jpg" alt="" />
          </figure>
          <figure className='h-l-3'>
            <img src="/img-Location/Japan.jpg" alt="" />
          </figure>
          <figure className='h-l-4'>
            <img src="/img-Location/Thailand.jpg" alt="" />
          </figure>
        </div>

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

      {/* 亞洲區 */}
      <section id='globalAsia'>
        {/* 亞洲 */}
        <article className='asia'>
          <figure><img src="img-Location/Asia.png" alt="" /></figure>
          <h2>亞洲</h2>
        </article>
        {/* 所有卡片 */}
        <article className='asiaCard'>
          {/* 亞洲卡片1 */}
          <section className='country1'>
            <div className='p1-sel'>
              <figure className='loc-p1'><img src="img-Location/Manila.jpg" alt="" /></figure>
              <figure className='select'><img src="img-Location/select.svg" alt="" /></figure>
            </div>
            <article className='loc-info'>
              <h2>菲律賓</h2>
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
          <section className='country2'>
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
          <section className='country3'>
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
        </article>
        {/* 更多按鈕 */}
        <il><a href='#'></a>View more</il>
      </section>

      {/* 歐洲區 */}
      <section id='globalEurope'>
        {/* 歐洲 */}
        <article className='europe'>
          <figure><img src="img-Location/Europe.png" alt="" /></figure>
          <h2>歐洲</h2>
        </article>
        {/* 所有卡片 */}
        <article className='europeCard'>
          {/* 歐洲卡片1 */}
          <section className='country1'>
            <div className='p1-sel'>
              <figure className='loc-p1'><img src="img-Location/Spain.jpg" alt="" /></figure>
              <figure className='select'><img src="img-Location/select.svg" alt="" /></figure>
            </div>
            <article className='loc-info'>
              <h2>西班牙</h2>
              <p className='loc-text'>擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名，是充滿熱情與陽光的國度。ß</p>
              <div className='wi-st'>
                <ul>
                  <img src="img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                </ul>
                <figure className='stars'>
                  <img src="img-Location/Star1.svg" alt="" />
                  <img src="img-Location/Star1.svg" alt="" />
                  <img src="img-Location/Star1.svg" alt="" />
                  <img src="img-Location/Star2.svg" alt="" />
                  <img src="img-Location/Star2.svg" alt="" />
                </figure>
              </div>
              <span>15000 /月</span>
            </article>
            <div className='color-block'></div>
          </section>
          {/* 歐洲卡片2 */}
          <section className='country2'>
            <div className='p1-sel'>
              <figure className='loc-p1'><img src="img-Location/Italy.jpg" alt="" /></figure>
              <figure className='select'><img src="img-Location/select.svg" alt="" /></figure>
            </div>
            <article className='loc-info'>
              <h2>義大利</h2>
              <p className='loc-text'>以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。擁有羅馬、威尼斯、佛羅倫斯等歷史名城，文化魅力獨特。</p>
              <div className='wi-st'>
                <ul>
                  <img src="img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                </ul>
                <figure className='stars'>
                  <img src="img-Location/Star1.svg" alt="" />
                  <img src="img-Location/Star1.svg" alt="" />
                  <img src="img-Location/Star1.svg" alt="" />
                  <img src="img-Location/Star2.svg" alt="" />
                  <img src="img-Location/Star2.svg" alt="" />
                </figure>
              </div>
              <span>15000 /月</span>
            </article>
            <div className='color-block'></div>
          </section>
          {/* 亞洲卡片3 */}
          <section className='country3'>
            <div className='p1-sel'>
              <figure className='loc-p1'><img src="img-Location/Netherlands.jpg" alt="" /></figure>
              <figure className='select'><img src="img-Location/select.svg" alt="" /></figure>
            </div>
            <article className='loc-info'>
              <h2>荷蘭</h2>
              <p className='loc-text'>以風車、鬱金香、運河和自行車文化著稱。首都阿姆斯特丹充滿藝術氣息，是自由、多元且環保的現代化國家。</p>
              <div className='wi-st'>
                <ul>
                  <img src="img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                </ul>
                <figure className='stars'>
                  <img src="img-Location/Star1.svg" alt="" />
                  <img src="img-Location/Star1.svg" alt="" />
                  <img src="img-Location/Star1.svg" alt="" />
                  <img src="img-Location/Star2.svg" alt="" />
                  <img src="img-Location/Star2.svg" alt="" />
                </figure>
              </div>
              <span>15000 /月</span>
            </article>
            <div className='color-block'></div>
          </section>
        </article>
        {/* 更多按鈕 */}
        <il><a href='#'></a>View more</il>
      </section>

      {/* 北美洲區 */}
      <section id='globalNA'>
        {/* 北美洲 */}
        <article className='NorthA'>
          <figure><img src="img-Location/North America.png" alt="" /></figure>
          <h2>北美洲</h2>
        </article>
        {/* 所有卡片 */}
        <article className='NorthACard'>
          {/* 北美洲卡片1 */}
          <section className='country1'>
            <div className='p1-sel'>
              <figure className='loc-p1'><img src="img-Location/US.jpg" alt="" /></figure>
              <figure className='select'><img src="img-Location/select.svg" alt="" /></figure>
            </div>
            <article className='loc-info'>
              <h2>美國</h2>
              <p className='loc-text'>擁融合多元文化，擁有自由女神、中央公園、時代廣場等地標，是全球金融、藝術與時尚重鎮，節奏快速，活力十足。</p>
              <div className='wi-st'>
                <ul>
                  <img src="img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                </ul>
                <figure className='stars'>
                  <img src="img-Location/Star1.svg" alt="" />
                  <img src="img-Location/Star1.svg" alt="" />
                  <img src="img-Location/Star1.svg" alt="" />
                  <img src="img-Location/Star2.svg" alt="" />
                  <img src="img-Location/Star2.svg" alt="" />
                </figure>
              </div>
              <span>15000 /月</span>
            </article>
            <div className='color-block'></div>
          </section>
          {/* 北美洲卡片2 */}
          <section className='country2'>
            <div className='p1-sel'>
              <figure className='loc-p1'><img src="img-Location/Canada.jpg" alt="" /></figure>
              <figure className='select'><img src="img-Location/select.svg" alt="" /></figure>
            </div>
            <article className='loc-info'>
              <h2>加拿大</h2>
              <p className='loc-text'>氣候宜人、自然風光壯麗，是融合多元文化的城市，擁有海灘、山脈與都市生活的完美平衡。</p>
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
          {/* 北美洲卡片3 */}
          <section className='country3'>
            <div className='p1-sel'>
              <figure className='loc-p1'><img src="img-Location/Mexico.jpg" alt="" /></figure>
              <figure className='select'><img src="img-Location/select.svg" alt="" /></figure>
            </div>
            <article className='loc-info'>
              <h2>墨西哥</h2>
              <p className='loc-text'>擁有悠久的阿茲特克文明與西班牙殖民遺跡，文化藝術豐富，街頭充滿色彩與活力，是拉丁美洲的重要經濟與文化中心。</p>
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
        </article>
        {/* 更多按鈕 */}
        <il><a href='#'></a>View more</il>
      </section>

      <div className='expMore'>
        <button className="btn-expMore"><a href='#'></a>探索更多</button>
      </div>

    </main>

  )
}

export default Location