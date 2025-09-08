import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../sass/scss/diary2.scss'


const posts = [
    {
        id: 1,
        title: '今天和新朋友一起吃了咖哩飯🍛',
        member: 'Eddie Chen',
        text: '來大阪一週，終於鼓起勇氣在平台上發了一個吃飯揪團。</br>原本以為可能沒人回應，結果居然有兩位同樣在這裡漂泊的朋友回我訊息。</br>一個是剛從東京來的工程師，另一位是畫插畫的自由接案者。</br>我們約在一間家庭式的小咖哩店見面，從點餐開始就話題不斷，邊吃邊笑，分享各自的旅程和「一個人吃飯」的尷尬瞬間。</br>吃完我們還走去附近的河邊散步，一起拍了合照。我突然理解了什麼叫「一起就有趣」，那不只是陪伴，而是一種默契的打開，讓人生在異地也能有些溫度。<br />—<br />#日本 #大阪 #咖哩飯 #新朋友 #漂泊',
        location: '大阪/ 日本',
        date: 'Apr,03 2025',
        imageUrl: './img-diary/diary-1.jpg'
    },
    {
        id: 2,
        title: '🧑‍💻 第一次在國外 co-work，竟然有點感動',
        member: 'Amy Wu',
        text: '我一直覺得自己是那種可以一個人好好工作的人，不需要太多社交。</br>但今天在清邁的一家咖啡廳發了 co-work 揪團，來了三個人，有設計師、工程師、還有一位在寫論文的學生。</br>我們沒多說話，各自戴上耳機、打開電腦，就開始了一整個下午的安靜工作。</br>但那種「身邊有人也在努力」的感覺，真的有一種莫名的安定感。中間一起點了飲料，聊了幾句工作遇到的難題，突然覺得自己不那麼孤單。</br>結束前我們互加了聯絡方式，下週決定再來試試新的共辦空間。</br>這種小小的連結，竟然讓我今天超有生產力。<br />—<br /> #清邁 #co-work #生產力 #連結',
        location: '清邁/ 泰國',
        date: 'Jun,10 2025',
        imageUrl: './img-diary/diary-2.jpg'
    },
    {
        id: 3,
        title: '🎲 今天和網友玩桌遊到凌晨三點',
        member: 'Ting',
        text: '本來只是想找個地方 chill 一下，結果一進門就被拉進一局狼人殺。</br>一開始大家還很拘謹，結果越玩越開，吵到老闆都來看我們是怎樣了。</br>我從沒想過，語言不同、背景不同，靠一場遊戲居然也能拉近距離。</br>回家的路上我竟然有點捨不得，還忍不住問他們「聖誕節你們在哪？」原來認識朋友有時不需要理由，只要你願意一起玩。<br />—<br />#遊戲 #桌遊 #新朋友 #深夜食堂',
        location: '葡萄牙/ 里斯本',
        date: 'Jul,14 2025',
        imageUrl: './img-diary/diary-5.png'
    }
];

const Diary2 = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [currentPostIndex, setCurrentPostIndex] = useState(0);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleNextPost = () => {
        setCurrentPostIndex((prevIndex) => (prevIndex + 1) % posts.length);
        setIsLiked(false); // 每次換文章時，將愛心狀態重置為未點擊
    };

    const currentPost = posts[currentPostIndex];

    return (
        <main>
            <section className="diaAll2">
                <section id='diary-discover2'>
                    <div className='d-t-title2'>
                        <span className='title-large2'>漂日記</span>
                        <span className='title-small2'>亞洲 ------------</span>
                    </div>
                    <section className='diaContent2'>
                        <div className='diaDrop2'>
                            <Link to="/diary">
                                <ul>
                                    <li>回上一頁</li><img src="./img-diary/back.svg" alt="" />
                                </ul>
                            </Link>
                        </div>

                        {/* 這裡加上了 key={currentPost.id} */}
                        <section className='diaArticleSection2' key={currentPost.id}>
                            <div className='p1-sel2'>
                                <figure className='dia-p2'><img src={currentPost.imageUrl} alt="" /></figure>
                            </div>
                            <article className='diaArticle2'>
                                <div className='d-member2'>
                                    <div></div>
                                    <p>{currentPost.member}</p>
                                </div>
                                <div className='d-text-card2' >
                                    <div className='d-text2'>
                                        <p className='d-tit2'>{currentPost.title}</p>
                                        <p className='d-word2' dangerouslySetInnerHTML={{ __html: currentPost.text }} />
                                    </div>

                                    <div className='d-sign2'>
                                        <div className='d-locaion2'>
                                            <figure><img src="./img-Home/location.svg" alt="" /></figure>
                                            <p className='h-d-loc2'>{currentPost.location}</p>
                                        </div>
                                        <p className='h-d-date2'>{currentPost.date}</p>
                                        <figure onClick={handleLikeClick}>
                                            <img src={isLiked ? "./img-diary/heart.svg" : "./img-Home/heart.svg"} alt="like" />
                                        </figure>
                                        <figure><img src="./img-Home/chat.svg" alt="" /></figure>
                                        <figure><img src="./img-Home/save.svg" alt="" /></figure>
                                    </div>
                                </div>
                            </article>
                        </section>

                        <button className='next-post-btn' onClick={handleNextPost}>
                            <img src="./img-diary/right.svg" alt="Share" />
                        </button>
                    </section>
                </section>

                <figure className='dia-p2'><img src="./img-diary/b-photo.png" alt="" /></figure>
            </section>
        </main>
    );
}

export default Diary2;