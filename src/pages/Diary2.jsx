import '../sass/scss/diary2.scss'

const Diary2 = () => {
    return (
        <main>
            {/* 發文 */}
            {/* 探索所有地點 */}
            <section className="diaAll2">
                <section id='diary-discover2'>
                    <div className='d-t-title2'>
                        <span className='title-large2'>漂日記</span>
                        <span className='title-small2'>亞洲/東南亞  ------------</span>
                    </div>
                    <section className='diaContent2'>
                        <div className='diaDrop2'>
                            <ul>
                                <li>亞洲</li><img src="./img-diary/icon-right.png" alt="" />
                            </ul>
                            <ul>
                                <li>歐洲</li><img src="./img-diary/icon-right.png" alt="" />
                            </ul>
                            <ul>
                                <li>北美洲</li><img src="./img-diary/icon-right.png" alt="" />
                            </ul>
                            <ul>
                                <li>中南美洲</li><img src="./img-diary/icon-right.png" alt="" />
                            </ul>
                            <ul>
                                <li>非洲</li><img src="./img-diary/icon-right.png" alt="" />
                            </ul>
                            <ul>
                                <li>大洋洲</li><img src="./img-diary/icon-right.png" alt="" />
                            </ul>
                        </div>
                        {/* 文章區 */}
                        <section className='diaArticleSection2'>
                            <div className='p1-sel2'>
                                <figure className='dia-p2'><img src="./img-diary/d2-photo.jpg" alt="" /></figure>
                            </div>
                            <article className='diaArticle2'>
                                <div className='d-member2'>
                                    <div></div>
                                    <p>Eddie Chen</p>
                                </div>
                                <div className='d-text-card2' >
                                    <div className='d-text2'>
                                        <p className='d-tit2'>📖 週末日記｜海灘上的營火夜，好像回到青春那一頁</p>
                                        <p className='d-word2'>
                                            昨天真的過了一個超級難忘的晚上。朋友們約了一起去白沙灣參加了一場海邊營火聚會，本來只是想放鬆一下、看看海，結果整個晚上完全超出我的期待。<br/>
                                            我們大概五點左右就到了，太陽還沒下山，海風輕輕吹著，感覺整個人都放鬆下來。沙灘上早就擺好了幾張躺椅和野餐墊，中心是一個圓形的鐵製火盆，旁邊堆著木材。大家陸續到齊後，開始一起升火。雖然只是簡單的活動，但那種一起動手、一邊聊天的感覺真的很溫暖。<br/>
                                            火升起來的那一刻，好像整個氣氛都變了。火光照在大家的臉上，有人開始彈吉他，有人烤著棉花糖，笑聲此起彼落。我還記得某個朋友用力烤焦了香腸，然後還堅持自己吃掉那根“黑炭版”的，笑到我們肚子都痛。<br/>
                                            吃的部分也很棒，我們準備了一些輕食和飲料，也有幾個人帶了特別的手作點心來分享。大家坐成一圈，有時候聊旅行、有時候談生活，也有人靜靜看著火出神。我特別喜歡那個瞬間，沒有手機、沒有壓力，只有一群人單純地享受眼前這個夜晚。<br/>
                                            大約九點多，星星慢慢出現了。我們關掉音響，改成大家輪流說故事，甚至玩起了童年玩過的「真心話大冒險」。雖然有點幼稚，但那種純粹的快樂好像真的很久沒感受到了。<br/>
                                            回家的路上雖然有點冷，但心裡是暖的。這次的營火派對，真的讓我重新體會到朋友相聚的珍貴，以及大自然帶來的療癒感。希望以後能有更多這種放鬆又開心的活動，也很期待下一次再和大家一起坐在沙灘上，看火光跳動、看星星閃爍。<br/>
                                            —<br/>
                                           📷#海邊日記 #營火派對 #友情萬歲 #白沙灣的夜晚 #生活的療癒時刻<br/>
                                           </p>
                                    </div>

                                    <div className='d-sign2'>
                                        <div className='d-locaion2'>
                                            <figure><img src="./img-Home/location.svg" alt="" /></figure>
                                            <p className='h-d-loc2'>新北/ 台灣</p>
                                        </div>
                                        <p className='h-d-date2'>Jun,10 2025</p>
                                        <figure><img src="./img-Home/heart.svg" alt="" /></figure>
                                        <figure><img src="./img-Home/chat.svg" alt="" /></figure>
                                        <figure><img src="./img-Home/save.svg" alt="" /></figure>
                                    </div>
                                </div>
                            </article>
                        </section>
                    </section>
                </section>

                <figure className='dia-p2'><img src="./img-diary/b-photo.png" alt="" /></figure>
            </section>
        </main>

    )
}

export default Diary2