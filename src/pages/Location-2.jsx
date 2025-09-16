
import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom'
import SelectIcon from '../component/SelectIcon';
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

    // select點擊
    const [active, setActive] = useState(false);

    // 圖片來源陣列
    const images = [
        "./img-Location/p01.jpeg",
        "./img-Location/p02.jpeg",
        "./img-Location/p03.jpeg",
        "./img-Location/p04.jpeg",
    ];

    // 使用 useState 來管理主圖片的 URL
    const [mainImage, setMainImage] = useState(images[0]);

    // 使用 useState 來管理縮圖陣列
    const [thumbnailImages, setThumbnailImages] = useState(images.slice(1));

    // 處理點擊事件的函式
    const handleThumbnailClick = (clickedImage) => {
        // 找出目前主圖片在縮圖陣列中的位置
        const currentMainIndex = thumbnailImages.findIndex(img => img === mainImage);

        // 如果主圖片不在縮圖中，代表它被點選了
        if (currentMainIndex === -1) {
            // 找到被點選的縮圖，並將主圖片替換
            const newThumbnails = thumbnailImages.map(img => img === clickedImage ? mainImage : img);
            setThumbnailImages(newThumbnails);
            setMainImage(clickedImage);
        } else {
            // 否則，將點選的縮圖與主圖片交換位置
            const newThumbnails = thumbnailImages.map(img => img === clickedImage ? mainImage : img);
            setThumbnailImages(newThumbnails);
            setMainImage(clickedImage);
        }
    };

    // 地點收藏
    const [active2, setActive2] = useState(false);

    const handleToggle = () => {
        setActive2(!active2);
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
                    {/* 主圖片，src 會根據狀態改變 */}
                    <img className='picXl' src={mainImage} alt="" />

                    {/* 縮圖區 */}
                    <div className='detPic'>
                        {thumbnailImages.map((image, index) => (
                            <img
                                key={index} // 記得為列表項目提供 key
                                src={image}
                                alt={`Thumbnail ${index + 2}`}
                                onClick={() => handleThumbnailClick(image)} // 點擊時呼叫處理函式
                            />
                        ))}
                    </div>
                </figure>

                <div className='allContent'>
                    {/* 地點內容 */}
                    <div className='locContent'>
                        <div className='locTitle'>
                            <h2>清邁</h2>
                            <svg className="select" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
                                onClick={() => setActive(!active)} // 點擊切換狀態
                                style={{ cursor: "pointer" }}>
                                <circle cx="30" cy="30" r="30" fill="none" />
                                <path d="M18 21.667C18 18.5372 20.5746 16 23.7506 16H36.2494C39.4254 16 42 18.5372 42 21.667V39.215C42 42.368 38.312 44.1337 35.7968 42.185L31.1847 38.6117C30.4895 38.073 29.5105 38.073 28.8153 38.6117L24.2032 42.185C21.688 44.1337 18 42.368 18 39.215V21.667Z" stroke="#1F1F1F" strokeWidth="1.5" fill={active ? "#201811" : "none"} />
                            </svg>
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
                        <section className='country' >
                            <div className='p1-sel'>
                                <Link to="/location2" ><figure className='loc-p1'><img src="./img-Location/Italy.jpg" alt="" /></figure></Link>
                                <SelectIcon active={active} onClick={handleToggle} />
                            </div>
                            <Link to="/location2" >
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
                            </Link>
                        </section >
                        {/* 卡片2 加拿大 */}
                        <section className='country' >
                            <div className='p1-sel'>
                                <Link to="/location2" ><figure className='loc-p1'><img src="./img-Location/Canada.jpg" alt="" /></figure></Link>
                                <SelectIcon active={active} onClick={handleToggle} />
                            </div>
                            <Link to="/location2" >
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
                            </Link>
                        </section >
                        {/* 卡片3 尼泊爾 */}
                        <section className='country'>
                            <div className='p1-sel'>
                                <Link to="/location2" ><figure className='loc-p1'><img src="./img-Location/Nepal.jpg" alt="" /></figure></Link>
                                <SelectIcon active={active} onClick={handleToggle} />
                            </div>
                            <Link to="/location2" >
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
                            </Link>
                        </section>
                        {/* 卡片4 西班牙 */}
                        <section className='country' >
                            <div className='p1-sel'>
                                <Link to="/location2" ><figure className='loc-p1'><img src="./img-Location/Spain.jpg" alt="" /></figure></Link>
                                <SelectIcon active={active} onClick={handleToggle} />
                            </div>
                            <Link to="/location2" >
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
                            </Link>
                        </section >
                        {/* 卡片5 阿根廷 */}
                        <section className='country' >
                            <div className='p1-sel'>
                                <Link to="/location2" ><figure className='loc-p1'><img src="./img-Location/Argentina.jpg" alt="" /></figure></Link>
                                <SelectIcon active={active} onClick={handleToggle} />
                            </div>
                            <Link to="/location2" >
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
                            </Link>
                        </section >
                        {/* 卡片6 摩洛哥 */}
                        <section className='country' >
                            <div className='p1-sel'>
                                <Link to="/location2" ><figure className='loc-p1'><img src="./img-Location/Morocco.jpg" alt="" /></figure></Link>
                                <SelectIcon active={active} onClick={handleToggle} />
                            </div>
                            <Link to="/location2" >
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
                            </Link>
                        </section >
                        {/* 卡片7 以色列 */}
                        <section className='country'>
                            <div className='p1-sel'>
                                <Link to="/location2"><figure className='loc-p1'><img src="./img-Location/Israel.jpg" alt="" /></figure></Link>
                                <SelectIcon active={active} onClick={handleToggle} />
                            </div>
                            <Link to="/location2">
                                <article className='loc-info'>
                                    <h2>以色列</h2>
                                    <p className='loc-text'>融合古老宗教文化與現代科技創新，以耶路撒冷與特拉維夫聞名。</p>
                                    <div className='wi-st'>
                                        <ul>
                                            <img src="./img-Location/Wifi.svg" alt="" /><p>242Mbps</p>
                                        </ul>
                                        <figure className='stars'>
                                            <img src="./img-Location/Star1.svg" alt="" />
                                            <img src="./img-Location/Star2.svg" alt="" />
                                            <img src="./img-Location/Star2.svg" alt="" />
                                            <img src="./img-Location/Star2.svg" alt="" />
                                            <img src="./img-Location/Star2.svg" alt="" />
                                        </figure>
                                    </div>
                                    <span>15000 /月</span>
                                </article>
                                <div className='color-block'></div>
                            </Link>
                        </section>
                        {/* 卡片8 荷蘭 */}
                        <section className='country' >
                            <div className='p1-sel'>
                                <Link to="/location2" ><figure className='loc-p1'><img src="./img-Location/Netherlands.jpg" alt="" /></figure></Link>
                                <SelectIcon active={active} onClick={handleToggle} />
                            </div>
                            <Link to="/location2" >
                                <article className='loc-info'>
                                    <h2>荷蘭</h2>
                                    <p className='loc-text'>以風車、鬱金香、運河和自行車文化著稱。首都阿姆斯特丹充滿藝術氣息，是自由、多元且環保的現代化國家。</p>
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
                            </Link>
                        </section >
                        {/* 卡片9 美國 */}
                        <section className='country' >
                            <div className='p1-sel'>
                                <Link to="/location2" ><figure className='loc-p1'><img src="./img-Location/US.jpg" alt="" /></figure></Link>
                                <SelectIcon active={active} onClick={handleToggle} />
                            </div>
                            <Link to="/location2" >
                                <article className='loc-info'>
                                    <h2>美國</h2>
                                    <p className='loc-text'>擁融合多元文化，擁有自由女神、中央公園、時代廣場等地標，是全球金融、藝術與時尚重鎮，節奏快速，活力十足。</p>
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
                            </Link>
                        </section >
                        {/* 卡片10 哥倫比亞 */}
                        <section className='country' >
                            <div className='p1-sel'>
                                <Link to="/location2" ><figure className='loc-p1'><img src="./img-Location/Colombia.jpg" alt="" /></figure></Link>
                                <SelectIcon active={active} onClick={handleToggle} />
                            </div>
                            <Link to="/location2" >
                                <article className='loc-info'>
                                    <h2>哥倫比亞</h2>
                                    <p className='loc-text'>以多元文化著稱，擁有豐富的咖啡、寶石和製造業，也是拉丁美洲重要的文化和經濟中心之一。 </p>
                                    <div className='wi-st'>
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
                                    </div>
                                    <span>15000 /月</span>
                                </article>
                                <div className='color-block'></div>
                            </Link>
                        </section >
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