import React, { useRef } from "react";
import { Link } from 'react-router-dom'
import '../sass/scss/location-2.scss'

const Location2 = () => {

    // 卡片左右滑動
    const cardsRef = useRef(null);
    // 單張卡片寬度（270px）+ gap（28px）
    const cardWidth = 270 + 28;

    const scrollLeft = () => {
        if (cardsRef.current) {
            cardsRef.current.scrollLeft -= 300; // 每次往左滑 300px
        }
    };
    const scrollRight = () => {
        if (cardsRef.current) {
            cardsRef.current.scrollLeft += 300; // 每次往右滑 300px
        }
    };

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
                <p className='theCity'>亞洲-泰國-清邁</p>
            </section>

            {/* <img className='pathArrow' src="pathArrow.svg" alt="" /> */}

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

                <div className='moreCards'>
                    <button className='left' onClick={scrollLeft}>
                        <img src="./img-Location/left.svg" alt="" />
                    </button>

                    < article className='cards' ref={cardsRef}>
                        {/* 卡片1 義大利 */}
                        <Link to="/location2">
                            <section className='country' >
                                <div className='p1-sel'>
                                    <figure className='loc-p1'><img src="./img-Location/Italy.jpg" alt="" /></figure>
                                    <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                                </div>
                                <article className='loc-info'>
                                    <h2>義大利</h2>
                                    <p className='loc-text'>以古羅馬遺跡、文藝復興藝術、美食與時尚聞名。擁有羅馬、威尼斯、佛羅倫斯等歷史名城，文化魅力獨特。</p>
                                    <div className='wi-st'>
                                        <ul>
                                            <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                                        </ul>
                                        <figure className='stars'>
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star2.svg" alt="" />
                                            <img src="./img-Location/Star2.svg" alt="" />
                                        </figure>
                                    </div>
                                    <span>15000 /月</span>
                                </article>
                                <div className='color-block'></div>
                            </section >
                        </Link>
                        {/* 卡片2 加拿大 */}
                        <Link to="/location2">
                            <section className='country' >
                                <div className='p1-sel'>
                                    <figure className='loc-p1'><img src="./img-Location/Canada.jpg" alt="" /></figure>
                                    <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                                </div>
                                <article className='loc-info'>
                                    <h2>加拿大</h2>
                                    <p className='loc-text'>氣候宜人、自然風光壯麗，是融合多元文化的城市，擁有海灘、山脈與都市生活的完美平衡。</p>
                                    <div className='wi-st'>
                                        <ul>
                                            <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                                        </ul>
                                        <figure className='stars'>
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star2.svg" alt="" />
                                        </figure>
                                    </div>
                                    <span>15000 /月</span>
                                </article>
                                <div className='color-block'></div>
                            </section >
                        </Link>
                        {/* 卡片3 尼泊爾 */}
                        <Link to="/location2">
                            <section className='country'>
                                <div className='p1-sel'>
                                    <figure className='loc-p1'><img src="./img-Location/Nepal.jpg" alt="" /></figure>
                                    <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                                </div>
                                <article className='loc-info'>
                                    <h2>尼泊爾</h2>
                                    <p className='loc-text'>位於喜馬拉雅山腳下，是宗教與歷史重鎮，擁有眾多佛教與印度教寺廟，文化深厚、街道熱鬧，是前往登山與探索尼泊爾文化的門戶。</p>
                                    <div className='wi-st'>
                                        <ul>
                                            <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                                        </ul>
                                        <figure className='stars'>
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star2.svg" alt="" />
                                        </figure>
                                    </div>
                                    <span>15000 /月</span>
                                </article>
                                <div className='color-block'></div>
                            </section>
                        </Link>
                        {/* 卡片4 西班牙 */}
                        <Link to="/location2">
                            <section className='country' >
                                <div className='p1-sel'>
                                    <figure className='loc-p1'><img src="./img-Location/Spain.jpg" alt="" /></figure>
                                    <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                                </div>
                                <article className='loc-info'>
                                    <h2>西班牙</h2>
                                    <p className='loc-text'>擁有豐富歷史與藝術文化，以佛朗明哥、鬥牛、美食和建築聞名，是充滿熱情與陽光的國度。ß</p>
                                    <div className='wi-st'>
                                        <ul>
                                            <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                                        </ul>
                                        <figure className='stars'>
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star2.svg" alt="" />
                                            <img src="./img-Location/Star2.svg" alt="" />
                                        </figure>
                                    </div>
                                    <span>15000 /月</span>
                                </article>
                                <div className='color-block'></div>
                            </section >
                        </Link>

                        {/* 卡片5 阿根廷 */}
                        <Link to="/location2" >
                            <section className='country' >
                                <div className='p1-sel'>
                                    <figure className='loc-p1'><img src="./img-Location/Argentina.jpg" alt="" /></figure>
                                    <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                                </div>
                                <article className='loc-info'>
                                    <h2>阿根廷</h2>
                                    <p className='loc-text'>以熱情和對探戈、足球的熱愛而著稱，擁有悠久的歐洲移民歷史，並在文化、經濟和政治上是拉丁美洲的重要國家。</p>
                                    <div className='wi-st'>
                                        <ul>
                                            <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                                        </ul>
                                        <figure className='stars'>
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star2.svg" alt="" />
                                        </figure>
                                    </div>
                                    <span>15000 /月</span>
                                </article>
                                <div className='color-block'></div>
                            </section >
                        </Link >

                        {/* 卡片6 摩洛哥 */}
                        <Link to="/location2" >
                            <section className='country' >
                                <div className='p1-sel'>
                                    <figure className='loc-p1'><img src="./img-Location/Morocco.jpg" alt="" /></figure>
                                    <figure className='select'><img src="./img-Location/select.svg" alt="" /></figure>
                                </div>
                                <article className='loc-info'>
                                    <h2>摩洛哥</h2>
                                    <p className='loc-text'>擁有獨特多樣的地貌，包括地中海沿岸、大西洋、撒哈拉沙漠和綿延的阿特拉斯山脈，使其成為受歡迎的旅遊目的地，特別是以「北非花園」的稱號著稱。</p>
                                    <div className='wi-st'>
                                        <ul>
                                            <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                                        </ul>
                                        <figure className='stars'>
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star2.svg" alt="" />
                                        </figure>
                                    </div>
                                    <span>15000 /月</span>
                                </article>
                                <div className='color-block'></div>
                            </section >
                        </Link >

                    </article >

                    <button className='right' onClick={scrollRight}>
                        <img src="./img-Location/right.svg" alt="" />
                    </button>
                </div>

            </section>


        </main>
    )
}

export default Location2