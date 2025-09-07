import '../sass/scss/group3.scss'
import '../sass/scss/CalendarInputStyle.scss'
import '../sass/scss/TimeInputStyle.scss'
import '../sass/scss/G3InputLabelStyle.scss'
import { useState, useEffect } from 'react'
import CalendarInput from '../component/CalendarInput'
import TimeInput from '../component/TimeInput'
import G3InputLabel from '../component/G3InputLabel'

const Group3 = () => {
    // 按鈕區
    // 1) 在檔案最上方的 useState 區塊加上：
    const [selectedCategory, setSelectedCategory] = useState('');
    // 2) 用一個陣列來 render 五顆 pill（也能保留你原本的五個 <button>，重點是 className / aria-pressed / onClick）
    const categories = ['找吃飯夥伴', '找工作夥伴', '找踩點夥伴', '找合租室友', '找Chill伴'];


    // 活動日期（單日）
    const [singleDate, setSingleDate] = useState('');
    // 報名截止日（單日）
    const [deadlineDate, setDeadlineDate] = useState('');
    // 集合地點
    const [location, setLocation] = useState('');
    // 開始/結束時間
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    // 提示訊息（當結束 < 開始時）
    const [timeHint, setTimeHint] = useState('');

    // 第二區塊輸入框
    const [activityTitle, setActivityTitle] = useState('');
    const [activityContent, setActivityContent] = useState('');
    // 上傳的圖片檔案 - 採用 Diary.jsx 風格
    const [uploadedImage, setUploadedImage] = useState(null);

    const toMinutes = (timeStr) => {
        if (!timeStr) return null;
        const m12 = timeStr.match(/^\s*(AM|PM)\s+(\d{1,2}):(\d{2})\s*$/i);
        if (m12) {
            let h = parseInt(m12[2], 10);
            const min = parseInt(m12[3], 10);
            const period = m12[1].toUpperCase();
            if (period === 'AM') h = (h === 12 ? 0 : h);
            else h = (h === 12 ? 12 : h + 12);
            return h * 60 + min;
        }
        const parts = timeStr.split(':');
        if (parts.length === 2) {
            const h = parseInt(parts[0], 10);
            const min = parseInt(parts[1], 10);
            if (Number.isFinite(h) && Number.isFinite(min)) return h * 60 + min;
        }
        return null;
    };

    useEffect(() => {
        if (!eventStartTime || !eventEndTime) {
            setTimeHint('');
            return;
        }
        const s = toMinutes(eventStartTime);
        const e = toMinutes(eventEndTime);
        if (s != null && e != null && e < s) {
            setEventEndTime(eventStartTime);
            setTimeHint('結束時間早於開始時間，已自動調整為相同時間。');
        } else {
            setTimeHint('');
        }
    }, [eventStartTime, eventEndTime]);

    // 處理圖片上傳，採用 Diary.jsx 的邏輯
    const handleImageUpload = (file) => {
        setUploadedImage(file);
    };

    return (
        <main>
            <div className="groupBanner3">
                {/* 頁面標題區域 */}
                <section id="groupSlogan3">
                    <h3>Plan It Your Way, Find Your Crew!</h3>
                    <div className="line"></div>
                    <h2>發起你的專屬揪團!</h2>
                    <div className="title-underline"></div>
                </section>

                {/* 活動基本資訊區域 */}
                <section id="basic-info">
                    <div className='header-title'>
                        <h2>活動基本資訊</h2>
                        <p>簡單幾步，就能號召志同道合的遊牧夥伴！</p>
                    </div>

                    {/* 白底表單1 */}
                    <div className='form1-fields'>

                        {/* 按鈕區塊 */}
                        <label className="group-category">
                            <h3 className="category-title">想揪甚麼團?</h3>
                            <div className="g3-btns">
                                <button
                                    className={`g3-active-btn ${selectedCategory === '找吃飯夥伴' ? 'is-active' : ''}`}
                                    aria-pressed={selectedCategory === '找吃飯夥伴'}
                                    onClick={() =>
                                        setSelectedCategory((prev) => (prev === '找吃飯夥伴' ? '' : '找吃飯夥伴'))
                                    }
                                    type="button"
                                >
                                    找吃飯夥伴
                                </button>

                                <button
                                    className={`g3-active-btn ${selectedCategory === '找工作夥伴' ? 'is-active' : ''}`}
                                    aria-pressed={selectedCategory === '找工作夥伴'}
                                    onClick={() =>
                                        setSelectedCategory((prev) => (prev === '找工作夥伴' ? '' : '找工作夥伴'))
                                    }
                                    type="button"
                                >
                                    找工作夥伴
                                </button>

                                <button
                                    className={`g3-active-btn ${selectedCategory === '找踩點夥伴' ? 'is-active' : ''}`}
                                    aria-pressed={selectedCategory === '找踩點夥伴'}
                                    onClick={() =>
                                        setSelectedCategory((prev) => (prev === '找踩點夥伴' ? '' : '找踩點夥伴'))
                                    }
                                    type="button"
                                >
                                    找踩點夥伴
                                </button>

                                <button
                                    className={`g3-active-btn ${selectedCategory === '找合租室友' ? 'is-active' : ''}`}
                                    aria-pressed={selectedCategory === '找合租室友'}
                                    onClick={() =>
                                        setSelectedCategory((prev) => (prev === '找合租室友' ? '' : '找合租室友'))
                                    }
                                    type="button"
                                >
                                    找合租室友
                                </button>

                                <button
                                    className={`g3-active-btn ${selectedCategory === '找Chill伴' ? 'is-active' : ''}`}
                                    aria-pressed={selectedCategory === '找Chill伴'}
                                    onClick={() =>
                                        setSelectedCategory((prev) => (prev === '找Chill伴' ? '' : '找Chill伴'))
                                    }
                                    type="button"
                                >
                                    找Chill伴
                                </button>
                            </div>
                        </label>

                        {/* 活動日期（單日） */}
                        <label className='group-category'>
                            <CalendarInput
                                title="活動日期"
                                placeholder="決定哪天要一起玩吧！"
                                value={singleDate}
                                onChange={setSingleDate}
                            />
                        </label>

                        {/* 活動開始時間 */}
                        <label className='group-category'>
                            <TimeInput
                                title="活動開始時間"
                                placeholder="選擇開始時間"
                                value={eventStartTime}
                                onChange={setEventStartTime}
                            />
                        </label>

                        {/* 活動預計結束時間 */}
                        <label className='group-category'>
                            <TimeInput
                                title="活動預計結束時間"
                                placeholder="選擇結束時間"
                                value={eventEndTime}
                                onChange={setEventEndTime}
                            />
                            {!!timeHint && (
                                <p className="field-hint" style={{ marginTop: 6, fontSize: 12, color: '#EF4444' }}>
                                    {timeHint}
                                </p>
                            )}
                        </label>

                        {/* 集合地點 */}
                        <label className='group-category'>
                            <G3InputLabel
                                title="集合地點"
                                placeholder="例如：台北信義區"
                                value={location}
                                onChange={setLocation}
                                showLocationIcon
                            />
                        </label>

                        {/* 報名截止日（單日） */}
                        <label className='group-category'>
                            <CalendarInput
                                title="報名截止日"
                                placeholder="選擇截止日期"
                                value={deadlineDate}
                                onChange={setDeadlineDate}
                            />
                        </label>
                    </div>
                </section>

                {/* 第二區塊:活動詳細資訊區塊 */}
                <section id="detail-info">
                    <div className='header-title'>
                        <h2>活動詳細內容</h2>
                        <p>想衝浪、寫作、打球、還是想找人一起喝咖啡？通通都可以揪！</p>
                    </div>

                    {/* 白底表單2 */}
                    <div className='form2-fields'>
                        {/* 活動標題 */}
                        <label className='group-category'>
                            <G3InputLabel
                                title="活動標題"
                                placeholder="一句話說明拼團主題（例如：台早島早晨傳教共工日）"
                                value={activityTitle}
                                onChange={setActivityTitle}
                                required
                            />
                        </label>

                        {/* 活動詳細內容 */}
                        <label className='group-category'>
                            <G3InputLabel
                                title="活動詳細內容"
                                placeholder="請輸入：行程安排/活動流程 吸引更多人參加！"
                                value={activityContent}
                                onChange={setActivityContent}
                                isTextarea
                                maxLength={1000}
                            />
                        </label>

                        {/* 上傳照片（單張，採用 Diary 風格） */}
                        <label className='group-category'>
                            <G3InputLabel
                                title="上傳照片"
                                value={uploadedImage}
                                onChange={handleImageUpload}
                                isFileUpload
                            />
                        </label>
                    </div>
                </section>

                <section id='createSuccessful-btn'>
                    <button className='successful-btn'>完成建立</button>
                </section>
            </div>
        </main>
    );
};

export default Group3;