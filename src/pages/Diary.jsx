import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../sass/scss/diary.scss';
import CalendarInput from '../component/CalendarInput'; // 修正匯入路徑

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options).replace(/,/, '').replace(/(\w+) (\d+) (\d+)/, '$1, $2 $3');
};

const initialPosts = [
  {
    id: 1,
    author: 'Eddie Chen',
    title: '今天和新朋友一起吃了咖哩飯🍛',
    content: '來大阪一週，終於鼓起勇氣在平台上發了一個吃飯揪團。原本以為可能沒人回應，結果居然有兩位同樣在這裡漂泊的朋友回我訊息。一個是剛從東京來的工程師，另一位是畫插畫的自由接案者。我們約在一間家庭式的小咖哩店見面，從點餐開始就話題不斷，邊吃邊笑，分享各自的旅程和「一個人吃飯」的尷尬瞬間。\n吃完我們還走去附近的河邊散步，一起拍了合照。我突然理解了什麼叫「一起就有趣」，那不只是陪伴，而是一種默契的打開，讓人生在異地也能有些溫度。',
    imgSrc: './img-diary/diary-1.jpg',
    location: '大阪/ 日本',
    date: 'Apr,03 2025',
    liked: false,
    saved: false,
    category: '亞洲',
    profileImgSrc: './img-Group/people/Commenter (2).jpg',
  },
  {
    id: 2,
    author: 'Amy Wu',
    title: '🧑‍💻 第一次在國外 co-work，竟然有點感動',
    content: '我一直覺得自己是那種可以一個人好好工作的人，不需要太多社交。但今天在清邁的一家咖啡廳發了 co-work 揪團，來了三個人，有設計師、工程師、還有一位在寫論文的學生。\n我們沒多說話，各自戴上耳機、打開電腦，就開始了一整個下午的安靜工作。但那種「身邊有人也在努力」的感覺，真的有一種莫名的安定感。中間一起點了飲料，聊了幾句工作遇到的難題，突然覺得自己不那麼孤單。\n結束前我們互加了聯絡方式，下週決定再來試試新的共辦空間。這種小小的連結，竟然讓我今天超有生產力。',
    imgSrc: './img-diary/diary-2.jpg',
    location: '清邁/ 泰國',
    date: 'Jun,10 2025',
    liked: false,
    saved: false,
    category: '亞洲',
    profileImgSrc: './img-Group/people/Commenter (1).jpg',
  },
  {
    id: 3,
    author: 'Elain',
    title: '📷 一起踩點，找到人生第一張會想沖洗出來的照片',
    content: '這趟旅程原本沒預設什麼主題，只是想看看東南亞的另一面。直到在平台上發了一個攝影揪團，竟然來了三個人，而且剛好全是台灣人。\n我們拿著手機和底片機，在河內街頭亂走、拍照，互相幫對方構圖、當攝影師也當模特。拍完我們還去吃了熱呼呼的河粉，坐在路邊聊起各自的故事。\n回到旅館後整理照片，我看到那張黃昏時光下，我站在鐵道旁的背影照，竟然想沖洗出來。那瞬間，旅程突然有了重量，也有了回憶的形狀。',
    imgSrc: './img-diary/diary-3.jpg',
    location: '富國島/ 越南',
    date: 'Sep,23 2025',
    liked: false,
    saved: false,
    category: '亞洲',
    profileImgSrc: './img-Group/people/join-people (2).jpg',
  },
  {
    id: 4,
    author: 'Florahua',
    title: '🏠合租生活 Day 5：廚房對話最療癒',
    content: '和一個韓國設計師合租一間兩房小公寓已經五天，說實話，語言不通讓我們前幾天有點尷尬。但好在我們都愛做早餐。\n每天早上都會輪流在廚房準備食物，今天我做了法式吐司，他則煎了韓式煎餅。\n最意外的是他主動幫我洗碗，然後還用翻譯 app 跟我說「這個很好吃！」那一刻，我突然覺得好溫暖。\n我們不一定會成為朋友，但這段「有距離的互助關係」，在異地的生活中，竟然成了最療癒的日常。',
    imgSrc: './img-diary/diary-4.jpg',
    location: '釜山/ 韓國',
    date: 'Feb,03 2025',
    liked: false,
    saved: false,
    category: '亞洲',
    profileImgSrc: './img-Group/people/join-people (3).jpg',
  },
  {
    id: 5,
    author: 'Ting',
    title: '🎲 今天和網友玩桌遊到凌晨三點',
    content: '本來只是想找個地方 chill 一下，結果一進門就被拉進一局狼人殺。一開始大家還很拘謹，結果越玩越開，吵到老闆都來看我們是怎樣了。\n我從沒想過，語言不同、背景不同，靠一場遊戲居然也能拉近距離。\n回家的路上我竟然有點捨不得，還忍不住問他們「聖誕節你們在哪？」原來認識朋友有時不需要理由，只要你願意一起玩。',
    imgSrc: './img-diary/diary-5.jpg',
    location: '葡萄牙/ 里斯本',
    date: 'Jul,14 2025',
    liked: false,
    saved: false,
    category: '歐洲',
    profileImgSrc: './img-Group/people/join-people (5).jpg',
  },
  {
    id: 6,
    author: 'Kevin Lin',
    title: '☕️ 尋找最棒的咖啡店',
    content: '這個週末，我踏上了尋找城市裡最棒獨立咖啡店的旅程。漫無目的地在小巷裡穿梭，終於在一個不起眼的轉角處，找到了這家叫做「畫布上的咖啡」的店。推開門，濃郁的咖啡香和油墨味撲鼻而來，這兩種本該不相干的味道，在這裡卻奇妙地融合在一起。店裡沒有時下流行的網紅裝潢，牆上掛滿了風格獨特的畫作。仔細一看，每一幅畫作都充滿了強烈的個人風格，或奔放熱烈，或沉靜內斂。這時，一位身穿牛仔褲和寬鬆襯衫的中年男子從吧台後走了出來，他就是這家店的老闆兼藝術家。他留著一頭灰白長髮，眼神銳利而充滿故事。我點了一杯手沖咖啡，他一邊為我沖煮，一邊分享著他的創作理念。「每一杯咖啡，都像一幅畫。」他說，「味道、香氣、溫度，都是我的顏料。我希望我的客人能同時品味到咖啡和藝術，感受生活中的美。」咖啡上桌，我輕啜一口，溫暖醇厚的滋味在舌尖蔓延開來，帶著一絲淡淡的果酸，尾韻綿長。我抬頭看著牆上的畫作，才發現畫裡的人物，其實都是來來去去的客人。老闆用畫筆記錄著每一個來到這裡的故事，而我，也成了他畫布上的一角。這家咖啡店不僅僅是個喝咖啡的地方，更像是一個溫暖的港灣，一個充滿藝術與故事的城市綠洲。在這裡，我找到了這週最棒的獨立咖啡店，也找到了一個值得回味的故事。',
    imgSrc: './img-diary/diary-6.jpg',
    location: '巴黎/ 法國',
    date: 'Oct,28 2025',
    liked: false,
    saved: false,
    category: '歐洲',
    profileImgSrc: './img-Group/people/join-people (6).jpg',
  },
  {
    id: 7,
    author: 'Emily Chen',
    title: '📖 在圖書館度過的一天',
    content: '在這紛擾的世界中，能夠在圖書館裡，沒有網路，只有書本與筆，是多麼珍貴。今天，我決定給自己一個沒有電子產品的假期。我走進了這座城市最古老的圖書館，空氣中瀰漫著舊書與歲月的氣味。我找了一個靠窗的角落，陽光灑在泛黃的書頁上，我打開了一本許久沒有碰過的書，也打開了我的筆記本。沒有手機的提示音，沒有社交媒體的干擾，我彷彿回到了過去，專注地閱讀，書中的世界在我眼前展開，然後我開始寫作，文字如泉水般湧出，沒有任何壓力，只是單純地記錄我的思緒與感受。我抬頭，看見窗外有隻鳥兒停在樹枝上，聽見它清脆的叫聲，這些微小的細節，平時我總是忽略。這一天，我與書本對話，也與自己對話。我找回了內心的平靜，感受到了專注的力量。我意識到，真正的寧靜並非來自於環境的完全安靜，而是來自於我們內心的平靜。在沒有網路的世界裡，我找到了與自己重新連結的方式，這是一場難得的心靈之旅。',
    imgSrc: './img-diary/diary-7.jpg',
    location: '倫敦/ 英國',
    date: 'Nov,05 2025',
    liked: false,
    saved: false,
    category: '歐洲',
    profileImgSrc: './img-Group/people/people-(6).jpg',
  },
  {
    id: 8,
    author: 'Jack Wu',
    title: '登山挑戰成功！',
    content: '和朋友約好挑戰這座海拔兩千公尺的高山，從日出前就開始我們的旅程。一路上，我們氣喘吁吁，雙腿像是灌了鉛，但彼此的鼓勵讓我們沒有停下腳步。山徑蜿蜒，時而穿越濃密的森林，時而踏過濕滑的岩石，每一滴汗水都充滿了努力的證明。當我們終於攀上山頂，太陽正緩緩升起，金色的光芒灑滿整個山谷。雲海在腳下翻騰，遠方的山巒像一幅水墨畫，壯麗得讓人屏息。雖然身體疲憊到了極點，但心靈卻得到了前所未有的洗滌。我們相視而笑，笑聲在山頂迴盪，這一刻，所有的辛苦都化為值得。這片風景不僅僅是眼睛所見，更是心靈深處的震撼與滿足。',
    imgSrc: './img-diary/diary-8.jpg',
    location: '富士山/ 日本',
    date: 'Nov,12 2025',
    liked: false,
    saved: false,
    category: '亞洲',
    profileImgSrc: './img-Group/people/People-(10).jpg',
  },
  {
    id: 9,
    author: 'Lily Hsu',
    title: '🍝 自學義大利麵',
    content: '自從來到這座城市，我總覺得缺少了些什麼，直到某天夜裡，那股對家鄉義大利麵的思念湧上心頭。我決定不再只是想念，而是親自動手。從超市買回麵粉和雞蛋，我小心翼翼地將麵粉堆成小山，中間挖出一個凹槽，像座等待灌溉的火山口，接著將金黃的蛋液緩緩倒入，那瞬間，我感覺自己像個魔法師。揉麵的過程充滿挑戰，麵團一開始黏手又粗糙，我憑著記憶和直覺，不斷地揉捏、拉扯，直到它變得光滑有彈性。接著是醬汁，我選了最愛的番茄肉醬，慢慢地將洋蔥、大蒜炒香，加入絞肉、番茄，讓它們在鍋中燉煮，那股香氣漸漸充滿了整個廚房，彷彿把我帶回了家。最後，我將手工麵條放入滾水中，看著它們在沸騰的水花中舞動，再將麵條與熱騰騰的醬汁完美結合。第一口吃下去，那熟悉的味道在舌尖蔓延開來，我閉上眼睛，感覺自己回到了家。雖然製作過程充滿了挑戰，但那份親手製作的溫暖與滿足感，比任何餐廳的美味都來得珍貴。',
    imgSrc: './img-diary/diary-9.jpg',
    location: '羅馬/ 義大利',
    date: 'Nov,20 2025',
    liked: false,
    saved: false,
    category: '歐洲',
    profileImgSrc: './img-Group/people/People-(9).jpg',
  },
  {
    id: 10,
    author: 'Frank Wu',
    title: '🌆 城市夜景攝影',
    content: '這週日晚上，我和攝影同好們興奮地來到城市最高的大樓頂樓，準備捕捉那令人心醉的夜景。當電梯門緩緩打開，眼前的景象讓我們所有人都屏住了呼吸。腳下是萬家燈火，點點星光匯聚成光的河流，在高樓間蜿蜒流淌。車流的燈光拉出了一條條流動的光軌，為這靜態的畫面增添了動感。我們架起三腳架，調整相機參數，快門聲此起彼落地響起。在城市的喧囂聲中，我們找到了屬於自己的寧靜。那一晚，我們不只是在拍照，更像是在記錄著這座城市的呼吸與脈動。每一張照片，都凝結了我們對這座城市最深情的凝視。雖然夜晚的風有些涼，但我們的心卻因為眼前的美景而無比炙熱。回到家，看著電腦螢幕中那張張璀璨的夜景照片，我知道，這不僅僅是我們用鏡頭捕捉到的美景，更是我們共同創造的一段美好回憶。',
    imgSrc: './img-diary/diary-10.jpg',
    location: '紐約/ 美國',
    date: 'Nov,25 2025',
    liked: false,
    saved: false,
    category: '北美洲',
    profileImgSrc: './img-Group/people/Commenter (1).jpg',
  },
  {
    id: 11,
    author: 'Grace Wang',
    title: '✈️ 獨自旅行的啟程',
    content: '當我拉著行李箱，踏上這趟一個人的旅程，心中五味雜陳。那種熟悉的焦慮感悄悄來襲，擔心迷路、擔心語言不通、擔心各種突如其來的狀況。但隨之而來的，卻是更大的興奮。這趟旅程沒有預設好的行程，沒有需要迎合的夥伴，一切都是未知的。我將是自己的嚮導，我的步伐就是我的節奏。我選擇了一座陌生的城市，走進那些地圖上沒有標註的小巷，在轉角處發現了有趣的壁畫，聞到了從老舊麵包店飄來的香氣。我走進一家只有當地人的小餐館，用不流利的語言點餐，儘管比手畫腳，卻意外地感受到人與人之間最純粹的善意。一個人旅行，更能專注於當下的感受。我坐在咖啡館裡，看著窗外形形色色的路人，想像著他們的故事；我在博物館裡，靜靜地欣賞一件件藝術品，與之進行無聲的交流。我不再是匆匆的過客，而是這座城市的一份子。這趟旅程，讓我學會了與自己相處。我發現，真正的冒險，並非去多遠的地方，而是敢於獨自面對未知。雖然路途有些孤獨，但每一步都讓我更認識自己，也讓我對這個世界充滿了更多的好奇與愛。我期待著，下一段未知的旅程。',
    imgSrc: './img-diary/diary-11.jpg',
    location: '柏林/ 德國',
    date: 'Nov,30 2025',
    liked: false,
    saved: false,
    category: '歐洲',
    profileImgSrc: './img-Group/people/Commenter (2).jpg',
  },
  {
    id: 12,
    author: 'Peter Liu',
    title: '🎉 參加當地節慶',
    content: '在這充滿異國情調的城市裡，我有幸參與了一場當地的傳統節慶。從一踏入會場，我就被那股濃厚的文化氛圍深深吸引。空氣中瀰漫著食物的香氣，耳邊傳來獨特的傳統樂曲，眼前是人們身著華麗服飾，隨著音樂翩翩起舞。我穿梭在熱鬧的人群中，品嚐了各種特別的美食，那些口味是我從未體驗過的，每一口都像是一場新的冒險。我跟著當地人學著跳舞，雖然動作笨拙，但每個人都對我報以友善的微笑。這次的體驗，不僅讓我品嚐到美食，更讓我感受到了文化的力量，那種透過節慶傳遞的熱情與團結。離開時，我手中拿著一個小小的傳統工藝品，心中滿載著難忘的回憶。這次的節慶，讓我更深入地了解了這個地方，也讓我對這個世界充滿了更多的好奇心。',
    imgSrc: './img-diary/diary-12.jpg',
    location: '馬德里/ 西班牙',
    date: 'Dec,05 2025',
    liked: false,
    saved: false,
    category: '歐洲',
    profileImgSrc: './img-Group/people/Commenter (3).jpg',
  },
  {
    id: 13,
    author: 'Amy Wu',
    title: '我的第二篇日記',
    content: '在這座車水馬龍的城市裡，能認識一個新朋友，總是一件讓人感到溫暖的事情。今天，我在一個共同的興趣小組裡，遇見了小李。我們因為都喜歡老電影而聊了起來，從經典的黑白片到現代的獨立電影，我們的話題彷彿永遠也聊不完。他對電影的獨到見解和幽默的談吐，讓我感到非常投緣。我們聊著聊著，從電影聊到了生活，分享彼此的故事與夢想。那一刻，我感覺自己與這個世界有了更深的連結。原本陌生的人，因為共同的喜好而變得親近。這次的相遇讓我意識到，生活中的每一個轉角，都可能藏著一段新的友誼。能夠與一個新朋友分享喜悅與想法，讓我的今天充滿了意義與溫暖。',
    imgSrc: './img-diary/diary-13.jpg',
    location: '清邁/ 泰國',
    date: 'Dec,10 2025',
    liked: false,
    saved: false,
    category: '亞洲',
    profileImgSrc: './img-Group/people/join-people (4).jpg',
  },
  {
    id: 14,
    author: 'Alex Chen',
    title: '在古巴遇見的色彩與節奏',
    content: '在哈瓦那，每個轉角都充滿驚喜。老爺車、雪茄、Salsa舞曲，這裡的一切都像一場熱情的派對。今天，我在一個小巷的藝術工作室裡，遇見了當地的畫家——瑪莉亞。她的畫作充滿了繽紛的色彩與古巴的熱帶風情。我對她的一幅描繪街頭音樂家的畫作深深著迷，我們便從此聊開。她告訴我，每個顏色、每個音符都代表著古巴人的生命力與樂觀。她帶我去了一間她常去的Salsa舞廳，教我跳了幾個簡單的舞步。在音樂與笑聲中，我感受到前所未有的自由與快樂。這次的相遇，不只讓我認識了一個新朋友，更讓我體驗到古巴文化最真實、最有生命力的部分。',
    imgSrc: './img-diary/diary-14.jpg',
    location: '哈瓦那 / 古巴',
    date: 'Jan, 15 2026',
    liked: false,
    saved: false,
    category: '中南美洲',
    profileImgSrc: './img-Group/people/join-people (5).jpg',
  },
  {
    id: 15,
    author: 'Linda Wang',
    title: '哥斯大黎加的生態奇遇',
    content: '哥斯大黎加的雨林，是個充滿生命力的神奇之地。我參加了一個當地的生態導覽，在濃密的樹林裡，導遊胡安帶我們認識了各種奇特的動植物。他對這片土地的熱愛與了解，讓我深受感動。我們聊到了當地人對環境保護的努力，以及他們與大自然和諧共處的生活方式。當我們在雨林深處看到一隻稀有的樹懶時，胡安的眼中閃爍著驕傲與喜悅。他分享的故事，讓我意識到這片雨林不僅是個景點，更是許多人賴以生存的家園。這次的旅程，讓我結識了一位知識淵博又充滿熱情、才華的朋友，也讓我對生態保育有了更深的體會。',
    imgSrc: './img-diary/diary-15.jpg',
    location: '塔里科勒斯 / 哥斯大黎加',
    date: 'Feb, 22 2026',
    liked: false,
    saved: false,
    category: '中南美洲',
    profileImgSrc: './img-Group/people/join-people (6).jpg',
  },
  {
    id: 16,
    author: 'Ben Liu',
    title: '開普敦的色彩與旋律',
    content: '在南非的開普敦，我總是被那裡的多元文化所吸引。今天，我在一個當地的市集閒逛時，遇到了一位名叫 Thabo 的街頭藝人。他用非洲鼓演奏著充滿活力的節奏，那鼓聲彷彿在訴說著一個個古老的故事。我駐足聆聽，在他短暫的休息時，我們聊了起來。他分享了許多關於南非音樂與文化的故事，並告訴我，每個鼓點都代表著當地人的情感與生命力。他甚至讓我試著打了幾個節奏，雖然我打得很生疏，但他依然鼓勵我。這次的相遇，讓我更深入地了解了南非文化，也結識了一位充滿熱情與才華的朋友。',
    imgSrc: './img-diary/diary-16.jpg',
    location: '開普敦 / 南非',
    date: ' Mar, 10 2026',
    liked: false,
    saved: false,
    category: '非洲',
    profileImgSrc: './img-Group/people/organizer.jpg',
  },
  {
    id: 17,
    author: 'Sarah Adams',
    title: '在紐西蘭南島的寧靜相遇',
    content: '在紐西蘭南島的湖畔，我找到了內心的平靜。今天，我在一個小鎮的咖啡館裡，遇到了一位名叫 Kahu 的毛利長者。他正悠閒地喝著茶，身旁放著他親手雕刻的木製品。我被其中一個精緻的圖騰雕刻所吸引，便好奇地問他這背後的意義。他微笑著，向我講述了毛利人與自然、祖先之間緊密相連的故事。他的聲音充滿了智慧與溫暖，每個詞都像是在傳遞著古老的力量。我們從雕刻藝術聊到了環保，再聊到紐西蘭人對土地的熱愛。這次的相遇，不只讓我欣賞到了精湛的毛利工藝，更讓我感受到一種深厚的人文精神，也結識了一位充滿智慧的新朋友。',
    imgSrc: './img-diary/diary-17.jpg',
    location: '皇后鎮 / 紐西蘭',
    date: ' Apr, 05 2026',
    liked: false,
    saved: false,
    category: '大洋洲',
    profileImgSrc: './img-Group/people/Commenter (3).jpg',
  },
];

const Diary = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newPostLocation, setNewPostLocation] = useState('台北/ 台灣');
  const [newPostDate, setNewPostDate] = useState(new Date().toISOString().substring(0, 10));
  const [activeCategory, setActiveCategory] = useState('全部日記');
  const [modalMessage, setModalMessage] = useState('');

  const filteredPosts = activeCategory === '全部日記'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  const [visibleCount, setVisibleCount] = useState(5);

  const handleOpenPostModal = () => {
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setShowPostModal(false);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostImage(null);
    setImagePreview(null);
    setNewPostLocation('台北/ 台灣');
    setNewPostDate(new Date().toISOString().substring(0, 10));
  };
  
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };
  
  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPostImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setNewPostImage(null);
    setImagePreview(null);
  };

  const handlePublishPost = () => {
    if (!newPostTitle || !newPostContent) {
      setModalMessage('標題和內容都不能為空！');
      setShowErrorModal(true);
      return;
    }

    const newPost = {
      id: Date.now(),
      author: 'Jun cheng',
      title: newPostTitle,
      content: newPostContent,
      imgSrc: imagePreview,
      location: newPostLocation,
      date: formatDate(newPostDate),
      liked: false,
      saved: false,
      category: activeCategory,
      profileImgSrc: './img-Group/people/Commenter (2).jpg',
    };

    setPosts([newPost, ...posts]);
    closePostModal();
    setVisibleCount(filteredPosts.length + 1);

    setModalMessage('您的日記已成功發布！');
    setShowSuccessModal(true);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, liked: !post.liked } : post
    ));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, saved: !post.saved } : post
    ));
  };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  const hasMoreArticles = visibleCount < filteredPosts.length;

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    setVisibleCount(5);
  };

  const categories = ['全部日記', '亞洲', '歐洲', '北美洲', '中南美洲', '非洲', '大洋洲'];


  return (
    <main>
      <section className="diaAll">
        
        {/* 發布新文章的彈窗容器 */}
        {showPostModal && (
          <div className="post-modal-overlay" style={{ zIndex: 1000 }} onClick={closePostModal}>
            <div className="post-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <img src="./img-Group/people/Commenter (2).jpg" alt="" className="member-avatar" />
                <span className="member-name">Andy Chen</span>
                <button className="close-btn" onClick={closePostModal}>&times;</button>
              </div>
              {imagePreview && (
                <div className="image-preview" onClick={() => document.getElementById('file-upload').click()}>
                  <img src={imagePreview} alt="預覽" />
                  <button className="remove-image-btn" onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}>&times;</button>
                </div>
              )}
              <textarea
                placeholder="標題"
                className="post-title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              ></textarea>
              <textarea
                placeholder="有什麼事想分享到漂日記?"
                className="post-textarea"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              ></textarea>
              <div className="modal-footer">
                <div className="left-controls">
                  <label htmlFor="file-upload" className="upload-btn">
                    <img src="./img-diary/upphoto.png" alt="上傳照片" /><span>上傳照片</span>
                  </label>
                  <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  <div className="location-date">
                    <div className="location-icon">
                      <img src="./img-Home/location.svg" alt="位置圖示" />
                      <input
                        type="text"
                        className="location-input"
                        value={newPostLocation}
                        onChange={(e) => setNewPostLocation(e.target.value)}
                      />
                    </div>
                    {/* 這裡替換為 CalendarInput 元件 */}
                    <CalendarInput 
                      value={newPostDate}
                      onChange={setNewPostDate}
                    />
                  </div>
                </div>
                <button className="publish-btn" onClick={handlePublishPost}>發布</button>
              </div>
            </div>
          </div>
        )}

        {/* 發布成功的模態框容器 */}
        {showSuccessModal && (
          <div className="custom-modal-backdrop" style={{ zIndex: 2000 }} onClick={closeSuccessModal}>
            <div className="custom-modal" onClick={e => e.stopPropagation()}>
              <div className="success-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="#F4D000" />
                  <path d="M18 30L26 38L42 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="custom-modal-header">
                <h3>發布成功</h3>
              </div>
              <div className="custom-modal-body">
                <p>{modalMessage}</p>
              </div>
              <button className="modal-ok-button" onClick={closeSuccessModal}>確認</button>
            </div>
          </div>
        )}

        {/* 錯誤提示模態框容器 */}
        {showErrorModal && (
          <div className="custom-modal-backdrop" style={{ zIndex: 3000 }} onClick={closeErrorModal}>
            <div className="custom-modal" onClick={e => e.stopPropagation()}>
              <div className="error-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="#F40000" />
                  <path d="M22 22L38 38M38 22L22 38" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="custom-modal-header">
                <h3>發布失敗</h3>
              </div>
              <div className="custom-modal-body">
                <p>{modalMessage}</p>
              </div>
              <button className="modal-ok-button" onClick={closeErrorModal}>確認</button>
            </div>
          </div>
        )}
        
        <section id='diary-discover'>
          {/* 背景圖片容器 - 專門負責背景樣式 */}
          <div className="title-bg-container"></div>
          {/* 內容容器 - 負責所有內容排版 */}
          <div className="title-content-wrapper">
            <div className='d-t-title'>
              <h2>漂日記<span>{activeCategory} ------------</span></h2>
              <p>A diary beyond borders</p>
            </div>
            <section className='diaContent'>
              <div className='diaDrop'>
                {categories.map((category, index) => (
                  <ul
                    key={index}
                    className={`${category === activeCategory ? 'active' : ''} slide-up-item`}
                    onClick={() => handleCategoryClick(category)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <li>{category}</li>
                    <img src="./img-diary/icon-right.png" alt="" />
                  </ul>
                ))}
              </div>
              <section id='diary-article'>
                <section className="diaPost" onClick={handleOpenPostModal}>
                  <img src="./img-Group/people/Commenter (3).jpg" alt="User Avatar" className="current-user-avatar" />
                  <p className="input-placeholder">新鮮事?</p>
                  <button className="share-btn">
                    <img src="./img-diary/open-in-new.svg" alt="Share" />
                  </button>
                </section>

                {filteredPosts.slice(0, visibleCount).map((post, index) => (
                  <Link to="/diary2" key={post.id}>
                    <section
                      className='diaArticleSection1 article-slide-in'
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {post.imgSrc && (
                        <div className='p1-sel'>
                          <figure className='dia-p1'><img src={post.imgSrc} alt="" /></figure>
                        </div>
                      )}
                      <article className='diaArticle1'>
                        <div className='d-member'>
                          <img src={post.profileImgSrc} alt={`${post.author} 的頭像`} className="profile-avatar" />
                          <p>{post.author}</p>
                        </div>
                        <div className='d-text-card' >
                          <div className='d-text'>
                            <p className='d-tit'>{post.title}</p>
                            <p className='d-word'>
                              {post.content.split('\n').map((line, lineIndex) => (
                                <React.Fragment key={lineIndex}>
                                  {line}
                                  {lineIndex < post.content.split('\n').length - 1 && <br />}
                                </React.Fragment>
                              ))}
                            </p>
                          </div>
                          <div className='d-sign'>
                            <div className='d-locaion'>
                              <figure><img src="./img-Home/location.svg" alt="" /></figure>
                              <p className='h-d-loc'>{post.location}</p>
                            </div>
                            <p className='h-d-date'>{post.date}</p>
                            <div className='allbutton'>
                              <figure className='like-button' onClick={(e) => { e.preventDefault(); handleLike(post.id); }}>
                                <img src={post.liked ? "./img-diary/heart.svg" : "./img-Home/heart.svg"} alt="愛心圖示" />
                              </figure>
                              <figure><img src="./img-Home/chat.svg" alt="" /></figure>
                              <figure className='save-button' onClick={(e) => { e.preventDefault(); handleSave(post.id); }}>
                                <img src={post.saved ? "./img-diary/bookmark.svg" : "./img-Home/save.svg"} alt="收藏圖示" />
                              </figure>
                            </div>
                          </div>
                        </div>
                      </article>
                    </section>
                  </Link>
                ))}

                {hasMoreArticles && (
                  <div className='load-more'>
                    <button
                      className='load-more-btn'
                      onClick={handleLoadMore}
                    >
                      更多日記
                    </button>
                  </div>
                )}
              </section>
            </section>
          </div>
        </section>
        <figure className='dia-p1'><img src="./img-diary/b-photo.png" alt="" /></figure>
      </section>
    </main>
  );
};

export default Diary;
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../sass/scss/diary.scss';

// const formatDate = (dateString) => {
//   const options = { year: 'numeric', month: 'short', day: '2-digit' };
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', options).replace(/,/, '').replace(/(\w+) (\d+) (\d+)/, '$1, $2 $3');
// };

// const initialPosts = [
//   {
//     id: 1,
//     author: 'Eddie Chen',
//     title: '今天和新朋友一起吃了咖哩飯🍛',
//     content: '來大阪一週，終於鼓起勇氣在平台上發了一個吃飯揪團。原本以為可能沒人回應，結果居然有兩位同樣在這裡漂泊的朋友回我訊息。一個是剛從東京來的工程師，另一位是畫插畫的自由接案者。我們約在一間家庭式的小咖哩店見面，從點餐開始就話題不斷，邊吃邊笑，分享各自的旅程和「一個人吃飯」的尷尬瞬間。\n吃完我們還走去附近的河邊散步，一起拍了合照。我突然理解了什麼叫「一起就有趣」，那不只是陪伴，而是一種默契的打開，讓人生在異地也能有些溫度。',
//     imgSrc: './img-diary/diary-1.jpg',
//     location: '大阪/ 日本',
//     date: 'Apr,03 2025',
//     liked: false,
//     saved: false,
//     category: '亞洲',
//     profileImgSrc: './img-Group/people/Commenter (2).jpg',
//   },
//   {
//     id: 2,
//     author: 'Amy Wu',
//     title: '🧑‍💻 第一次在國外 co-work，竟然有點感動',
//     content: '我一直覺得自己是那種可以一個人好好工作的人，不需要太多社交。但今天在清邁的一家咖啡廳發了 co-work 揪團，來了三個人，有設計師、工程師、還有一位在寫論文的學生。\n我們沒多說話，各自戴上耳機、打開電腦，就開始了一整個下午的安靜工作。但那種「身邊有人也在努力」的感覺，真的有一種莫名的安定感。中間一起點了飲料，聊了幾句工作遇到的難題，突然覺得自己不那麼孤單。\n結束前我們互加了聯絡方式，下週決定再來試試新的共辦空間。這種小小的連結，竟然讓我今天超有生產力。',
//     imgSrc: './img-diary/diary-2.jpg',
//     location: '清邁/ 泰國',
//     date: 'Jun,10 2025',
//     liked: false,
//     saved: false,
//     category: '亞洲',
//     profileImgSrc: './img-Group/people/Commenter (1).jpg',
//   },
//   {
//     id: 3,
//     author: 'Elain',
//     title: '📷 一起踩點，找到人生第一張會想沖洗出來的照片',
//     content: '這趟旅程原本沒預設什麼主題，只是想看看東南亞的另一面。直到在平台上發了一個攝影揪團，竟然來了三個人，而且剛好全是台灣人。\n我們拿著手機和底片機，在河內街頭亂走、拍照，互相幫對方構圖、當攝影師也當模特。拍完我們還去吃了熱呼呼的河粉，坐在路邊聊起各自的故事。\n回到旅館後整理照片，我看到那張黃昏時光下，我站在鐵道旁的背影照，竟然想沖洗出來。那瞬間，旅程突然有了重量，也有了回憶的形狀。',
//     imgSrc: './img-diary/diary-3.jpg',
//     location: '富國島/ 越南',
//     date: 'Sep,23 2025',
//     liked: false,
//     saved: false,
//     category: '亞洲',
//     profileImgSrc: './img-Group/people/join-people (2).jpg',
//   },
//   {
//     id: 4,
//     author: 'Florahua',
//     title: '🏠合租生活 Day 5：廚房對話最療癒',
//     content: '和一個韓國設計師合租一間兩房小公寓已經五天，說實話，語言不通讓我們前幾天有點尷尬。但好在我們都愛做早餐。\n每天早上都會輪流在廚房準備食物，今天我做了法式吐司，他則煎了韓式煎餅。\n最意外的是他主動幫我洗碗，然後還用翻譯 app 跟我說「這個很好吃！」那一刻，我突然覺得好溫暖。\n我們不一定會成為朋友，但這段「有距離的互助關係」，在異地的生活中，竟然成了最療癒的日常。',
//     imgSrc: './img-diary/diary-4.jpg',
//     location: '釜山/ 韓國',
//     date: 'Feb,03 2025',
//     liked: false,
//     saved: false,
//     category: '亞洲',
//     profileImgSrc: './img-Group/people/join-people (3).jpg',
//   },
//   {
//     id: 5,
//     author: 'Ting',
//     title: '🎲 今天和網友玩桌遊到凌晨三點',
//     content: '本來只是想找個地方 chill 一下，結果一進門就被拉進一局狼人殺。一開始大家還很拘謹，結果越玩越開，吵到老闆都來看我們是怎樣了。\n我從沒想過，語言不同、背景不同，靠一場遊戲居然也能拉近距離。\n回家的路上我竟然有點捨不得，還忍不住問他們「聖誕節你們在哪？」原來認識朋友有時不需要理由，只要你願意一起玩。',
//     imgSrc: './img-diary/diary-5.png',
//     location: '葡萄牙/ 里斯本',
//     date: 'Jul,14 2025',
//     liked: false,
//     saved: false,
//     category: '歐洲',
//     profileImgSrc: './img-Group/people/join-people (5).jpg',
//   },
//   {
//     id: 6,
//     author: 'Kevin Lin',
//     title: '☕️ 尋找最棒的咖啡店',
//     content: '這個週末，我踏上了尋找城市裡最棒獨立咖啡店的旅程。漫無目的地在小巷裡穿梭，終於在一個不起眼的轉角處，找到了這家叫做「畫布上的咖啡」的店。推開門，濃郁的咖啡香和油墨味撲鼻而來，這兩種本該不相干的味道，在這裡卻奇妙地融合在一起。店裡沒有時下流行的網紅裝潢，牆上掛滿了風格獨特的畫作。仔細一看，每一幅畫作都充滿了強烈的個人風格，或奔放熱烈，或沉靜內斂。這時，一位身穿牛仔褲和寬鬆襯衫的中年男子從吧台後走了出來，他就是這家店的老闆兼藝術家。他留著一頭灰白長髮，眼神銳利而充滿故事。我點了一杯手沖咖啡，他一邊為我沖煮，一邊分享著他的創作理念。「每一杯咖啡，都像一幅畫。」他說，「味道、香氣、溫度，都是我的顏料。我希望我的客人能同時品味到咖啡和藝術，感受生活中的美。」咖啡上桌，我輕啜一口，溫暖醇厚的滋味在舌尖蔓延開來，帶著一絲淡淡的果酸，尾韻綿長。我抬頭看著牆上的畫作，才發現畫裡的人物，其實都是來來去去的客人。老闆用畫筆記錄著每一個來到這裡的故事，而我，也成了他畫布上的一角。這家咖啡店不僅僅是個喝咖啡的地方，更像是一個溫暖的港灣，一個充滿藝術與故事的城市綠洲。在這裡，我找到了這週最棒的獨立咖啡店，也找到了一個值得回味的故事。',
//     imgSrc: './img-diary/diary-6.jpg',
//     location: '巴黎/ 法國',
//     date: 'Oct,28 2025',
//     liked: false,
//     saved: false,
//     category: '歐洲',
//     profileImgSrc: './img-Group/people/join-people (6).jpg',
//   },
//   {
//     id: 7,
//     author: 'Emily Chen',
//     title: '📖 在圖書館度過的一天',
//     content: '在這紛擾的世界中，能夠在圖書館裡，沒有網路，只有書本與筆，是多麼珍貴。今天，我決定給自己一個沒有電子產品的假期。我走進了這座城市最古老的圖書館，空氣中瀰漫著舊書與歲月的氣味。我找了一個靠窗的角落，陽光灑在泛黃的書頁上，我打開了一本許久沒有碰過的書，也打開了我的筆記本。沒有手機的提示音，沒有社交媒體的干擾，我彷彿回到了過去，專注地閱讀，書中的世界在我眼前展開，然後我開始寫作，文字如泉水般湧出，沒有任何壓力，只是單純地記錄我的思緒與感受。我抬頭，看見窗外有隻鳥兒停在樹枝上，聽見它清脆的叫聲，這些微小的細節，平時我總是忽略。這一天，我與書本對話，也與自己對話。我找回了內心的平靜，感受到了專注的力量。我意識到，真正的寧靜並非來自於環境的完全安靜，而是來自於我們內心的平靜。在沒有網路的世界裡，我找到了與自己重新連結的方式，這是一場難得的心靈之旅。',
//     imgSrc: './img-diary/diary-7.jpg',
//     location: '倫敦/ 英國',
//     date: 'Nov,05 2025',
//     liked: false,
//     saved: false,
//     category: '歐洲',
//     profileImgSrc: './img-Group/people/people-(6).jpg',
//   },
//   {
//     id: 8,
//     author: 'Jack Wu',
//     title: '登山挑戰成功！',
//     content: '和朋友約好挑戰這座海拔兩千公尺的高山，從日出前就開始我們的旅程。一路上，我們氣喘吁吁，雙腿像是灌了鉛，但彼此的鼓勵讓我們沒有停下腳步。山徑蜿蜒，時而穿越濃密的森林，時而踏過濕滑的岩石，每一滴汗水都充滿了努力的證明。當我們終於攀上山頂，太陽正緩緩升起，金色的光芒灑滿整個山谷。雲海在腳下翻騰，遠方的山巒像一幅水墨畫，壯麗得讓人屏息。雖然身體疲憊到了極點，但心靈卻得到了前所未有的洗滌。我們相視而笑，笑聲在山頂迴盪，這一刻，所有的辛苦都化為值得。這片風景不僅僅是眼睛所見，更是心靈深處的震撼與滿足。',
//     imgSrc: './img-diary/diary-8.jpg',
//     location: '富士山/ 日本',
//     date: 'Nov,12 2025',
//     liked: false,
//     saved: false,
//     category: '亞洲',
//     profileImgSrc: './img-Group/people/People-(10).jpg',
//   },
//   {
//     id: 9,
//     author: 'Lily Hsu',
//     title: '🍝 自學義大利麵',
//     content: '自從來到這座城市，我總覺得缺少了些什麼，直到某天夜裡，那股對家鄉義大利麵的思念湧上心頭。我決定不再只是想念，而是親自動手。從超市買回麵粉和雞蛋，我小心翼翼地將麵粉堆成小山，中間挖出一個凹槽，像座等待灌溉的火山口，接著將金黃的蛋液緩緩倒入，那瞬間，我感覺自己像個魔法師。揉麵的過程充滿挑戰，麵團一開始黏手又粗糙，我憑著記憶和直覺，不斷地揉捏、拉扯，直到它變得光滑有彈性。接著是醬汁，我選了最愛的番茄肉醬，慢慢地將洋蔥、大蒜炒香，加入絞肉、番茄，讓它們在鍋中燉煮，那股香氣漸漸充滿了整個廚房，彷彿把我帶回了家。最後，我將手工麵條放入滾水中，看著它們在沸騰的水花中舞動，再將麵條與熱騰騰的醬汁完美結合。第一口吃下去，那熟悉的味道在舌尖蔓延開來，我閉上眼睛，感覺自己回到了家。雖然製作過程充滿了挑戰，但那份親手製作的溫暖與滿足感，比任何餐廳的美味都來得珍貴。',
//     imgSrc: './img-diary/diary-9.jpg',
//     location: '羅馬/ 義大利',
//     date: 'Nov,20 2025',
//     liked: false,
//     saved: false,
//     category: '歐洲',
//     profileImgSrc: './img-Group/people/People-(9).jpg',
//   },
//   {
//     id: 10,
//     author: 'Frank Wu',
//     title: '🌆 城市夜景攝影',
//     content: '這週日晚上，我和攝影同好們興奮地來到城市最高的大樓頂樓，準備捕捉那令人心醉的夜景。當電梯門緩緩打開，眼前的景象讓我們所有人都屏住了呼吸。腳下是萬家燈火，點點星光匯聚成光的河流，在高樓間蜿蜒流淌。車流的燈光拉出了一條條流動的光軌，為這靜態的畫面增添了動感。我們架起三腳架，調整相機參數，快門聲此起彼落地響起。在城市的喧囂聲中，我們找到了屬於自己的寧靜。那一晚，我們不只是在拍照，更像是在記錄著這座城市的呼吸與脈動。每一張照片，都凝結了我們對這座城市最深情的凝視。雖然夜晚的風有些涼，但我們的心卻因為眼前的美景而無比炙熱。回到家，看著電腦螢幕中那張張璀璨的夜景照片，我知道，這不僅僅是我們用鏡頭捕捉到的美景，更是我們共同創造的一段美好回憶。',
//     imgSrc: './img-diary/diary-10.jpg',
//     location: '紐約/ 美國',
//     date: 'Nov,25 2025',
//     liked: false,
//     saved: false,
//     category: '北美洲',
//     profileImgSrc: './img-Group/people/Commenter (1).jpg',
//   },
//   {
//     id: 11,
//     author: 'Grace Wang',
//     title: '✈️ 獨自旅行的啟程',
//     content: '當我拉著行李箱，踏上這趟一個人的旅程，心中五味雜陳。那種熟悉的焦慮感悄悄來襲，擔心迷路、擔心語言不通、擔心各種突如其來的狀況。但隨之而來的，卻是更大的興奮。這趟旅程沒有預設好的行程，沒有需要迎合的夥伴，一切都是未知的。我將是自己的嚮導，我的步伐就是我的節奏。我選擇了一座陌生的城市，走進那些地圖上沒有標註的小巷，在轉角處發現了有趣的壁畫，聞到了從老舊麵包店飄來的香氣。我走進一家只有當地人的小餐館，用不流利的語言點餐，儘管比手畫腳，卻意外地感受到人與人之間最純粹的善意。一個人旅行，更能專注於當下的感受。我坐在咖啡館裡，看著窗外形形色色的路人，想像著他們的故事；我在博物館裡，靜靜地欣賞一件件藝術品，與之進行無聲的交流。我不再是匆匆的過客，而是這座城市的一份子。這趟旅程，讓我學會了與自己相處。我發現，真正的冒險，並非去多遠的地方，而是敢於獨自面對未知。雖然路途有些孤獨，但每一步都讓我更認識自己，也讓我對這個世界充滿了更多的好奇與愛。我期待著，下一段未知的旅程。',
//     imgSrc: './img-diary/diary-11.jpg',
//     location: '柏林/ 德國',
//     date: 'Nov,30 2025',
//     liked: false,
//     saved: false,
//     category: '歐洲',
//     profileImgSrc: './img-Group/people/Commenter (2).jpg',
//   },
//   {
//     id: 12,
//     author: 'Peter Liu',
//     title: '🎉 參加當地節慶',
//     content: '在這充滿異國情調的城市裡，我有幸參與了一場當地的傳統節慶。從一踏入會場，我就被那股濃厚的文化氛圍深深吸引。空氣中瀰漫著食物的香氣，耳邊傳來獨特的傳統樂曲，眼前是人們身著華麗服飾，隨著音樂翩翩起舞。我穿梭在熱鬧的人群中，品嚐了各種特別的美食，那些口味是我從未體驗過的，每一口都像是一場新的冒險。我跟著當地人學著跳舞，雖然動作笨拙，但每個人都對我報以友善的微笑。這次的體驗，不僅讓我品嚐到美食，更讓我感受到了文化的力量，那種透過節慶傳遞的熱情與團結。離開時，我手中拿著一個小小的傳統工藝品，心中滿載著難忘的回憶。這次的節慶，讓我更深入地了解了這個地方，也讓我對這個世界充滿了更多的好奇心。',
//     imgSrc: './img-diary/diary-12.jpg',
//     location: '馬德里/ 西班牙',
//     date: 'Dec,05 2025',
//     liked: false,
//     saved: false,
//     category: '歐洲',
//     profileImgSrc: './img-Group/people/Commenter (3).jpg',
//   },
//   {
//     id: 13,
//     author: 'Amy Wu',
//     title: '我的第二篇日記',
//     content: '在這座車水馬龍的城市裡，能認識一個新朋友，總是一件讓人感到溫暖的事情。今天，我在一個共同的興趣小組裡，遇見了小李。我們因為都喜歡老電影而聊了起來，從經典的黑白片到現代的獨立電影，我們的話題彷彿永遠也聊不完。他對電影的獨到見解和幽默的談吐，讓我感到非常投緣。我們聊著聊著，從電影聊到了生活，分享彼此的故事與夢想。那一刻，我感覺自己與這個世界有了更深的連結。原本陌生的人，因為共同的喜好而變得親近。這次的相遇讓我意識到，生活中的每一個轉角，都可能藏著一段新的友誼。能夠與一個新朋友分享喜悅與想法，讓我的今天充滿了意義與溫暖。',
//     imgSrc: './img-diary/diary-13.jpg',
//     location: '清邁/ 泰國',
//     date: 'Dec,10 2025',
//     liked: false,
//     saved: false,
//     category: '亞洲',
//     profileImgSrc: './img-Group/people/join-people (4).jpg',
//   },
//   {
//     id: 14,
//     author: 'Alex Chen',
//     title: '在古巴遇見的色彩與節奏',
//     content: '在哈瓦那，每個轉角都充滿驚喜。老爺車、雪茄、Salsa舞曲，這裡的一切都像一場熱情的派對。今天，我在一個小巷的藝術工作室裡，遇見了當地的畫家——瑪莉亞。她的畫作充滿了繽紛的色彩與古巴的熱帶風情。我對她的一幅描繪街頭音樂家的畫作深深著迷，我們便從此聊開。她告訴我，每個顏色、每個音符都代表著古巴人的生命力與樂觀。她帶我去了一間她常去的Salsa舞廳，教我跳了幾個簡單的舞步。在音樂與笑聲中，我感受到前所未有的自由與快樂。這次的相遇，不只讓我認識了一個新朋友，更讓我體驗到古巴文化最真實、最有生命力的部分。',
//     imgSrc: './img-diary/diary-14.jpg',
//     location: '哈瓦那 / 古巴',
//     date: 'Jan, 15 2026',
//     liked: false,
//     saved: false,
//     category: '中南美洲',
//     profileImgSrc: './img-Group/people/join-people (5).jpg',
//   },
//   {
//     id: 15,
//     author: 'Linda Wang',
//     title: '哥斯大黎加的生態奇遇',
//     content: '哥斯大黎加的雨林，是個充滿生命力的神奇之地。我參加了一個當地的生態導覽，在濃密的樹林裡，導遊胡安帶我們認識了各種奇特的動植物。他對這片土地的熱愛與了解，讓我深受感動。我們聊到了當地人對環境保護的努力，以及他們與大自然和諧共處的生活方式。當我們在雨林深處看到一隻稀有的樹懶時，胡安的眼中閃爍著驕傲與喜悅。他分享的故事，讓我意識到這片雨林不僅是個景點，更是許多人賴以生存的家園。這次的旅程，讓我結識了一位知識淵博又充滿熱情、才華的朋友，也讓我對生態保育有了更深的體會。',
//     imgSrc: './img-diary/diary-15.jpg',
//     location: '塔里科勒斯 / 哥斯大黎加',
//     date: 'Feb, 22 2026',
//     liked: false,
//     saved: false,
//     category: '中南美洲',
//     profileImgSrc: './img-Group/people/join-people (6).jpg',
//   },
//   {
//     id: 16,
//     author: 'Ben Liu',
//     title: '開普敦的色彩與旋律',
//     content: '在南非的開普敦，我總是被那裡的多元文化所吸引。今天，我在一個當地的市集閒逛時，遇到了一位名叫 Thabo 的街頭藝人。他用非洲鼓演奏著充滿活力的節奏，那鼓聲彷彿在訴說著一個個古老的故事。我駐足聆聽，在他短暫的休息時，我們聊了起來。他分享了許多關於南非音樂與文化的故事，並告訴我，每個鼓點都代表著當地人的情感與生命力。他甚至讓我試著打了幾個節奏，雖然我打得很生疏，但他依然鼓勵我。這次的相遇，讓我更深入地了解了南非文化，也結識了一位充滿熱情與才華的朋友。',
//     imgSrc: './img-diary/diary-16.jpg',
//     location: '開普敦 / 南非',
//     date: ' Mar, 10 2026',
//     liked: false,
//     saved: false,
//     category: '非洲',
//     profileImgSrc: './img-Group/people/organizer.jpg',
//   },
//   {
//     id: 17,
//     author: 'Sarah Adams',
//     title: '在紐西蘭南島的寧靜相遇',
//     content: '在紐西蘭南島的湖畔，我找到了內心的平靜。今天，我在一個小鎮的咖啡館裡，遇到了一位名叫 Kahu 的毛利長者。他正悠閒地喝著茶，身旁放著他親手雕刻的木製品。我被其中一個精緻的圖騰雕刻所吸引，便好奇地問他這背後的意義。他微笑著，向我講述了毛利人與自然、祖先之間緊密相連的故事。他的聲音充滿了智慧與溫暖，每個詞都像是在傳遞著古老的力量。我們從雕刻藝術聊到了環保，再聊到紐西蘭人對土地的熱愛。這次的相遇，不只讓我欣賞到了精湛的毛利工藝，更讓我感受到一種深厚的人文精神，也結識了一位充滿智慧的新朋友。',
//     imgSrc: './img-diary/diary-17.jpg',
//     location: '皇后鎮 / 紐西蘭',
//     date: ' Apr, 05 2026',
//     liked: false,
//     saved: false,
//     category: '大洋洲',
//     profileImgSrc: './img-Group/people/Commenter (3).jpg',
//   },
// ];

// const Diary = () => {
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showErrorModal, setShowErrorModal] = useState(false); // 新增錯誤提示彈窗狀態
//   const [posts, setPosts] = useState(initialPosts);
//   const [newPostTitle, setNewPostTitle] = useState('');
//   const [newPostContent, setNewPostContent] = useState('');
//   const [newPostImage, setNewPostImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [newPostLocation, setNewPostLocation] = useState('台北/ 台灣');
//   const [newPostDate, setNewPostDate] = useState(new Date().toISOString().substring(0, 10));
//   const [activeCategory, setActiveCategory] = useState('全部日記');
//   const [modalMessage, setModalMessage] = useState('');

//   const filteredPosts = activeCategory === '全部日記'
//     ? posts
//     : posts.filter(post => post.category === activeCategory);

//   const [visibleCount, setVisibleCount] = useState(5);

//   const handleOpenPostModal = () => {
//     setShowPostModal(true);
//   };

//   const closePostModal = () => {
//     setShowPostModal(false);
//     setNewPostTitle('');
//     setNewPostContent('');
//     setNewPostImage(null);
//     setImagePreview(null);
//     setNewPostLocation('台北/ 台灣');
//     setNewPostDate(new Date().toISOString().substring(0, 10));
//   };
  
//   const closeSuccessModal = () => {
//     setShowSuccessModal(false);
//   };
  
//   const closeErrorModal = () => {
//     setShowErrorModal(false);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setNewPostImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleRemoveImage = () => {
//     setNewPostImage(null);
//     setImagePreview(null);
//   };

//   const handlePublishPost = () => {
//     if (!newPostTitle || !newPostContent) {
//       setModalMessage('標題和內容都不能為空！');
//       setShowErrorModal(true);
//       return;
//     }

//     const newPost = {
//       id: Date.now(),
//       author: 'Jun cheng',
//       title: newPostTitle,
//       content: newPostContent,
//       imgSrc: imagePreview,
//       location: newPostLocation,
//       date: formatDate(newPostDate),
//       liked: false,
//       saved: false,
//       category: activeCategory,
//       profileImgSrc: './img-Group/people/Commenter (2).jpg',
//     };

//     setPosts([newPost, ...posts]);
//     closePostModal();
//     setVisibleCount(filteredPosts.length + 1);

//     setModalMessage('您的日記已成功發布！');
//     setShowSuccessModal(true);
//   };

//   const handleLike = (postId) => {
//     setPosts(posts.map(post =>
//       post.id === postId ? { ...post, liked: !post.liked } : post
//     ));
//   };

//   const handleSave = (postId) => {
//     setPosts(posts.map(post =>
//       post.id === postId ? { ...post, saved: !post.saved } : post
//     ));
//   };

//   const handleLoadMore = () => {
//     setVisibleCount(prevCount => prevCount + 5);
//   };

//   const hasMoreArticles = visibleCount < filteredPosts.length;

//   const handleCategoryClick = (categoryName) => {
//     setActiveCategory(categoryName);
//     setVisibleCount(5);
//   };

//   const categories = ['全部日記', '亞洲', '歐洲', '北美洲', '中南美洲', '非洲', '大洋洲'];


//   return (
//     <main>
//       <section className="diaAll">
        
//         {/* 發布新文章的彈窗容器 */}
//         {showPostModal && (
//           <div className="post-modal-overlay" style={{ zIndex: 1000 }} onClick={closePostModal}>
//             <div className="post-modal-content" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-header">
//                 <img src="./img-Group/people/Commenter (2).jpg" alt="" className="member-avatar" />
//                 <span className="member-name">Andy Chen</span>
//                 <button className="close-btn" onClick={closePostModal}>&times;</button>
//               </div>
//               {imagePreview && (
//                 <div className="image-preview" onClick={() => document.getElementById('file-upload').click()}>
//                   <img src={imagePreview} alt="預覽" />
//                   <button className="remove-image-btn" onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}>&times;</button>
//                 </div>
//               )}
//               <textarea
//                 placeholder="標題"
//                 className="post-title"
//                 value={newPostTitle}
//                 onChange={(e) => setNewPostTitle(e.target.value)}
//               ></textarea>
//               <textarea
//                 placeholder="有什麼事想分享到漂日記?"
//                 className="post-textarea"
//                 value={newPostContent}
//                 onChange={(e) => setNewPostContent(e.target.value)}
//               ></textarea>
//               <div className="modal-footer">
//                 <div className="left-controls">
//                   <label htmlFor="file-upload" className="upload-btn">
//                     <img src="./img-diary/upphoto.png" alt="上傳照片" /><span>上傳照片</span>
//                   </label>
//                   <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
//                   <div className="location-date">
//                     <div className="location-icon">
//                       <img src="./img-Home/location.svg" alt="位置圖示" />
//                       <input
//                         type="text"
//                         className="location-input"
//                         value={newPostLocation}
//                         onChange={(e) => setNewPostLocation(e.target.value)}
//                       />
//                     </div>
//                     <input
//                       type="date"
//                       className="date-input"
//                       value={newPostDate}
//                       onChange={(e) => setNewPostDate(e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <button className="publish-btn" onClick={handlePublishPost}>發布</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* 發布成功的模態框容器 */}
//         {showSuccessModal && (
//           <div className="custom-modal-backdrop" style={{ zIndex: 2000 }} onClick={closeSuccessModal}>
//             <div className="custom-modal" onClick={e => e.stopPropagation()}>
//               <div className="success-icon">
//                 <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
//                   <circle cx="30" cy="30" r="30" fill="#F4D000" />
//                   <path d="M18 30L26 38L42 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </div>
//               <div className="custom-modal-header">
//                 <h3>發布成功</h3>
//               </div>
//               <div className="custom-modal-body">
//                 <p>{modalMessage}</p>
//               </div>
//               <button className="modal-ok-button" onClick={closeSuccessModal}>確認</button>
//             </div>
//           </div>
//         )}

//         {/* 新增的錯誤提示模態框容器 */}
//         {showErrorModal && (
//           <div className="custom-modal-backdrop" style={{ zIndex: 3000 }} onClick={closeErrorModal}>
//             <div className="custom-modal" onClick={e => e.stopPropagation()}>
//               <div className="error-icon">
//                 <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
//                   <circle cx="30" cy="30" r="30" fill="#F40000" />
//                   <path d="M22 22L38 38M38 22L22 38" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </div>
//               <div className="custom-modal-header">
//                 <h3>發布失敗</h3>
//               </div>
//               <div className="custom-modal-body">
//                 <p>{modalMessage}</p>
//               </div>
//               <button className="modal-ok-button" onClick={closeErrorModal}>確認</button>
//             </div>
//           </div>
//         )}
        
//         <section id='diary-discover'>
//           {/* 背景圖片容器 - 專門負責背景樣式 */}
//           <div className="title-bg-container"></div>
//           {/* 內容容器 - 負責所有內容排版 */}
//           <div className="title-content-wrapper">
//             <div className='d-t-title'>
//               <h2>漂日記<span>{activeCategory} ------------</span></h2>
//               <p>A diary beyond borders</p>
//             </div>
//             <section className='diaContent'>
//               <div className='diaDrop'>
//                 {categories.map((category, index) => (
//                   <ul
//                     key={index}
//                     className={`${category === activeCategory ? 'active' : ''} slide-up-item`}
//                     onClick={() => handleCategoryClick(category)}
//                     style={{ animationDelay: `${index * 0.1}s` }}
//                   >
//                     <li>{category}</li>
//                     <img src="./img-diary/icon-right.png" alt="" />
//                   </ul>
//                 ))}
//               </div>
//               <section id='diary-article'>
//                 <section className="diaPost" onClick={handleOpenPostModal}>
//                   <img src="./img-Group/people/Commenter (3).jpg" alt="User Avatar" className="current-user-avatar" />
//                   <p className="input-placeholder">新鮮事?</p>
//                   <button className="share-btn">
//                     <img src="./img-diary/open-in-new.svg" alt="Share" />
//                   </button>
//                 </section>

//                 {filteredPosts.slice(0, visibleCount).map((post, index) => (
//                   <Link to="/diary2" key={post.id}>
//                     <section
//                       className='diaArticleSection1 article-slide-in'
//                       style={{ animationDelay: `${index * 0.1}s` }}
//                     >
//                       {post.imgSrc && (
//                         <div className='p1-sel'>
//                           <figure className='dia-p1'><img src={post.imgSrc} alt="" /></figure>
//                         </div>
//                       )}
//                       <article className='diaArticle1'>
//                         <div className='d-member'>
//                           <img src={post.profileImgSrc} alt={`${post.author} 的頭像`} className="profile-avatar" />
//                           <p>{post.author}</p>
//                         </div>
//                         <div className='d-text-card' >
//                           <div className='d-text'>
//                             <p className='d-tit'>{post.title}</p>
//                             <p className='d-word'>
//                               {post.content.split('\n').map((line, lineIndex) => (
//                                 <React.Fragment key={lineIndex}>
//                                   {line}
//                                   {lineIndex < post.content.split('\n').length - 1 && <br />}
//                                 </React.Fragment>
//                               ))}
//                             </p>
//                           </div>
//                           <div className='d-sign'>
//                             <div className='d-locaion'>
//                               <figure><img src="./img-Home/location.svg" alt="" /></figure>
//                               <p className='h-d-loc'>{post.location}</p>
//                             </div>
//                             <p className='h-d-date'>{post.date}</p>
//                             <div className='allbutton'>
//                               <figure className='like-button' onClick={(e) => { e.preventDefault(); handleLike(post.id); }}>
//                                 <img src={post.liked ? "./img-diary/heart.svg" : "./img-Home/heart.svg"} alt="愛心圖示" />
//                               </figure>
//                               <figure><img src="./img-Home/chat.svg" alt="" /></figure>
//                               <figure className='save-button' onClick={(e) => { e.preventDefault(); handleSave(post.id); }}>
//                                 <img src={post.saved ? "./img-diary/bookmark.svg" : "./img-Home/save.svg"} alt="收藏圖示" />
//                               </figure>
//                             </div>
//                           </div>
//                         </div>
//                       </article>
//                     </section>
//                   </Link>
//                 ))}

//                 {hasMoreArticles && (
//                   <div className='load-more'>
//                     <button
//                       className='load-more-btn'
//                       onClick={handleLoadMore}
//                     >
//                       更多日記
//                     </button>
//                   </div>
//                 )}
//               </section>
//             </section>
//           </div>
//         </section>
//         <figure className='dia-p1'><img src="./img-diary/b-photo.png" alt="" /></figure>
//       </section>
//     </main>
//   );
// };

// export default Diary;