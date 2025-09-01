import '../sass/scss/diary.scss'

const Diary = () => {
  return (
    <main>
      {/* 發文 */}
      {/* 探索所有地點 */}
      <section className="diaAll"> 
        <section id='diary-discover'>
          <div className='d-t-title'>
            <span className='title-large'>漂日記</span>
            <span className='title-small'>亞洲/東南亞  ------------</span>
          </div>
          <section className='diaContent'>
            <div className='diaDrop'>
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
            <section id='diary-article'>
               {/* 發佈文章 */}
               <section className='diaPost'>
                <div className='d-member'>
                    <div></div>
                    <p>新鮮事？</p>
                    <figure><img src="./img-diary/open-in-new.png" alt="" /></figure>
                  </div>
               </section>
              {/* 文章1 */}
              <section className='diaArticleSection1'>
                <div className='p1-sel'>
                  <figure className='dia-p1'><img src="./img-diary/diary-1.jpg" alt="" /></figure>
                </div>
                <article className='diaArticle1'>
                  <div className='d-member'>
                    <div></div>
                    <p>Eddie Chen</p>
                  </div>
                  <div className='d-text-card' >
                    <div className='d-text'>
                      <p className='d-tit'>今天和新朋友一起吃了咖哩飯🍛</p>
                      <p className='d-word'>
                        來大阪一週，終於鼓起勇氣在平台上發了一個吃飯揪團。原本以為可能沒人回應，結果居然有兩位同樣在這裡漂泊的朋友回我訊息。一個是剛從東京來的工程師，另一位是畫插畫的自由接案者。我們約在一間家庭式的小咖哩店見面，從點餐開始就話題不斷，邊吃邊笑，分享各自的旅程和「一個人吃飯」的尷尬瞬間。
                        吃完我們還走去附近的河邊散步，一起拍了合照。我突然理解了什麼叫「一起就有趣」，那不只是陪伴，而是一種默契的打開，讓人生在異地也能有些溫度。</p>
                    </div>

                    <div className='d-sign'>
                      <div className='d-locaion'>
                        <figure><img src="./img-Home/location.svg" alt="" /></figure>
                        <p className='h-d-loc'>大阪/ 日本</p>
                      </div>
                      <p className='h-d-date'>Apr,03 2025</p>
                      <figure><img src="./img-Home/heart.svg" alt="" /></figure>
                      <figure><img src="./img-Home/chat.svg" alt="" /></figure>
                      <figure><img src="./img-Home/save.svg" alt="" /></figure>
                    </div>
                  </div>
                </article>
              </section>
              {/* 文章2 */}
              <section className='diaArticleSection1'>
                <div className='p1-sel'>
                  <figure className='dia-p1'><img src="./img-diary/diary-2.jpg" alt="" /></figure>
                </div>
                <article className='diaArticle1'>
                  <div className='d-member'>
                    <div></div>
                    <p>Amy Wu</p>
                  </div>
                  <div className='d-text-card' >
                    <div className='d-text'>
                      <p className='d-tit'>🧑‍💻 第一次在國外 co-work，竟然有點感動</p>
                      <p className='d-word'>
                        我一直覺得自己是那種可以一個人好好工作的人，不需要太多社交。但今天在清邁的一家咖啡廳發了 co-work 揪團，來了三個人，有設計師、工程師、還有一位在寫論文的學生。
                        我們沒多說話，各自戴上耳機、打開電腦，就開始了一整個下午的安靜工作。但那種「身邊有人也在努力」的感覺，真的有一種莫名的安定感。中間一起點了飲料，聊了幾句工作遇到的難題，突然覺得自己不那麼孤單。
                        結束前我們互加了聯絡方式，下週決定再來試試新的共辦空間。這種小小的連結，竟然讓我今天超有生產力。</p>
                    </div>

                    <div className='d-sign'>
                      <div className='d-locaion'>
                        <figure><img src="./img-Home/location.svg" alt="" /></figure>
                        <p className='h-d-loc'>清邁/ 泰國</p>
                      </div>
                      <p className='h-d-date'>Jun,10 2025</p>
                      <figure><img src="./img-Home/heart.svg" alt="" /></figure>
                      <figure><img src="./img-Home/chat.svg" alt="" /></figure>
                      <figure><img src="./img-Home/save.svg" alt="" /></figure>
                    </div>
                  </div>
                </article>
              </section>

              {/* 文章3 */}
              <section className='diaArticleSection1'>
                <div className='p1-sel'>
                  <figure className='dia-p1'><img src="./img-diary/diary-3.jpg" alt="" /></figure>
                </div>
                <article className='diaArticle1'>
                  <div className='d-member'>
                    <div></div>
                    <p>Elain</p>
                  </div>
                  <div className='d-text-card' >
                    <div className='d-text'>
                      <p className='d-tit'>📷 一起踩點，找到人生第一張會想沖洗出來的照片</p>
                      <p className='d-word'>
                        這趟旅程原本沒預設什麼主題，只是想看看東南亞的另一面。直到在平台上發了一個攝影揪團，竟然來了三個人，而且剛好全是台灣人。
                        我們拿著手機和底片機，在河內街頭亂走、拍照，互相幫對方構圖、當攝影師也當模特。拍完我們還去吃了熱呼呼的河粉，坐在路邊聊起各自的故事。回到旅館後整理照片，我看到那張黃昏時光下，我站在鐵道旁的背影照，竟然想沖洗出來。
                        那瞬間，旅程突然有了重量，也有了回憶的形狀。</p>
                    </div>

                    <div className='d-sign'>
                      <div className='d-locaion'>
                        <figure><img src="./img-Home/location.svg" alt="" /></figure>
                        <p className='h-d-loc'>富國島/ 越南</p>
                      </div>
                      <p className='h-d-date'>Sep,23 2025</p>
                      <figure><img src="./img-Home/heart.svg" alt="" /></figure>
                      <figure><img src="./img-Home/chat.svg" alt="" /></figure>
                      <figure><img src="./img-Home/save.svg" alt="" /></figure>
                    </div>
                  </div>
                </article>
              </section>
              {/* 文章4 */}
              <section className='diaArticleSection1'>
                <div className='p1-sel'>
                  <figure className='dia-p1'><img src="./img-diary/diary-4.jpg" alt="" /></figure>
                </div>
                <article className='diaArticle1'>
                  <div className='d-member'>
                    <div></div>
                    <p>Elain</p>
                  </div>
                  <div className='d-text-card' >
                    <div className='d-text'>
                      <p className='d-tit'>🏠合租生活 Day 5：廚房對話最療癒</p>
                      <p className='d-word'>
                        和一個韓國設計師合租一間兩房小公寓已經五天，說實話，語言不通讓我們前幾天有點尷尬。但好在我們都愛做早餐。每天早上都會輪流在廚房準備食物，今天我做了法式吐司，他則煎了韓式煎餅。
                        最意外的是他主動幫我洗碗，然後還用翻譯 app 跟我說「這個很好吃！」那一刻，我突然覺得好溫暖。
                        我們不一定會成為朋友，但這段「有距離的互助關係」，在異地的生活中，竟然成了最療癒的日常。</p>
                    </div>

                    <div className='d-sign'>
                      <div className='d-locaion'>
                        <figure><img src="./img-Home/location.svg" alt="" /></figure>
                        <p className='h-d-loc'>釜山/ 韓國</p>
                      </div>
                      <p className='h-d-date'>Feb,03 2025</p>
                      <figure><img src="./img-Home/heart.svg" alt="" /></figure>
                      <figure><img src="./img-Home/chat.svg" alt="" /></figure>
                      <figure><img src="./img-Home/save.svg" alt="" /></figure>
                    </div>
                  </div>
                </article>
              </section>
              {/* 文章5 */}
              <section className='diaArticleSection1'>
                <div className='p1-sel'>
                  <figure className='dia-p1'><img src="./img-diary/diary-5.png" alt="" /></figure>
                </div>
                <article className='diaArticle1'>
                  <div className='d-member'>
                    <div></div>
                    <p>Ting</p>
                  </div>
                  <div className='d-text-card' >
                    <div className='d-text'>
                      <p className='d-tit'>🎲 今天和網友玩桌遊到凌晨三點</p>
                      <p className='d-word'>
                        本來只是想找個地方 chill 一下，結果一進門就被拉進一局狼人殺。一開始大家還很拘謹，結果越玩越開，吵到老闆都來看我們是怎樣了。
                        我從沒想過，語言不同、背景不同，靠一場遊戲居然也能拉近距離。回家的路上我竟然有點捨不得，還忍不住問他們「聖誕節你們在哪？」原來認識朋友有時不需要理由，只要你願意一起玩。</p>
                    </div>

                    <div className='d-sign'>
                      <div className='d-locaion'>
                        <figure><img src="./img-Home/location.svg" alt="" /></figure>
                        <p className='h-d-loc'>葡萄牙/ 里斯本</p>
                      </div>
                      <p className='h-d-date'>Jul,14 2025</p>
                      <figure><img src="./img-Home/heart.svg" alt="" /></figure>
                      <figure><img src="./img-Home/chat.svg" alt="" /></figure>
                      <figure><img src="./img-Home/save.svg" alt="" /></figure>
                    </div>
                  </div>
                </article>
              </section>
            </section>
          </section>
        </section>
        <figure className='dia-p1'><img src="./img-diary/b-photo.png" alt="" /></figure>
      </section>
    </main>

  )
}

export default Diary