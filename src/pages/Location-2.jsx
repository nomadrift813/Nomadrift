import '../sass/scss/location-2.scss'

const Location2 = () => {
    return (
        <main>
            {/* 標題-探索地點 */}
            <section id='disDes'>
                {/* <div>
                    <img src="./img-Location/back.svg" alt="" />
                </div> */}
                <header>
                    <p className='l-t-1'>Discover<span> De</span>stination</p>
                    <p className='l-t-2'>探索地點</p>
                </header>
            </section>

            {/* 內容-探索地點 */}
            <section id='allInfo'>
                {/* 地點照片 */}
                <figure className='allPic'>
                    <img className='picXl' src="./img-Location/p01.jpeg" alt="" />
                    <div className='detPic'>
                        <img src="./img-Location/p02.jpeg" alt="" />
                        <img src="./img-Location/p03.jpeg" alt="" />
                        <img src="./img-Location/p04.jpeg" alt="" />
                    </div>
                </figure>

                <div className='allContent'>
                    {/* 地點內容 */}
                    <div className='locContent'>
                        <div className='locTitle'>
                            <h2>清邁</h2>
                            <img src="./img-Location/select.svg" alt="" />
                        </div>
                        <div className='wifiStr'>
                            <ul>
                                <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                            </ul>
                            <figure className='stars'>
                                <img src="./img-Location/Star1.svg" alt="" />
                                <img src="./img-Location/Star1.svg" alt="" />
                                <img src="./img-Location/Star2.svg" alt="" />
                                <img src="./img-Location/Star2.svg" alt="" />
                                <img src="./img-Location/Star2.svg" alt="" />
                            </figure>
                            <span>NT $15000 /月</span>
                        </div>
                        <p>清邁的生活節奏相對曼谷來得慢與平靜。城市不大，但應有盡有。走在老城區，滿是佛寺、咖啡館和手作市集；到了寧曼路一帶，又搖身一變成充滿創意和現代感的熱點，集合了co-working空間、設計品牌店與人氣甜點店，是數位遊牧者的根據地之一。
                            清邁氣候宜人，尤其11月到2月的涼季，氣溫舒適又乾爽，非常適合長時間工作與生活。加上周邊有豐富的大自然資源，週末可以輕鬆安排短程旅遊，如拜訪象園、瀑布健行，或到郊區租機車探索咖啡山路。
                            如果你正在尋找一個生活成本合理、步調舒適、又能有效遠距工作的城市，清邁絕對值得一試。或許你會和許多人一樣，原本只打算待兩週，卻一不小心住了半年。
                        </p>
                    </div>

                    {/* 評分 */}
                    <div className='locScore'>
                        <ul>
                            <li><p>整體</p><img src="./img-Location/score-2.svg" alt="" /></li>
                            <li><p>安全性</p><img src="./img-Location/score-1.svg" alt="" /></li>
                            <li><p>網路順暢</p><img src="./img-Location/score-4.svg" alt="" /></li>
                            <li><p>消費水平</p><img src="./img-Location/score-1.svg" alt="" /></li>
                            <li><p>氣候舒適</p><img src="./img-Location/score-3.svg" alt="" /></li>
                        </ul>
                        <ul>
                            <li><p>友善度</p><img src="./img-Location/score-1.svg" alt="" /></li>
                            <li><p>語言溝通</p><img src="./img-Location/score-4.svg" alt="" /></li>
                            <li><p>交通便利</p><img src="./img-Location/score-5.svg" alt="" /></li>
                            <li><p>食物品質</p><img src="./img-Location/score-5.svg" alt="" /></li>
                            <li><p>醫療品質</p><img src="./img-Location/score-2.svg" alt="" /></li>
                        </ul>
                    </div>

                    <div className='color-block'></div>
                </div>

            </section>

            {/* 探索更多城市 */}
            <section id='moreDes'>
                <header>
                    <p className='l-t-1'>Discover M<span>ore</span> Destination</p>
                    <p className='l-t-2'>探索更多地點</p>
                </header>

            </section>


        </main>
    )
}

export default Location2