import '../sass/scss/group3.scss'
import '../sass/scss/CalendarInputStyle.scss'
import '../sass/scss/TimeInputStyle.scss'
import '../sass/scss/G3InputLabelStyle.scss'
import { useState, useEffect } from 'react'
import CalendarInput from '../component/CalendarInput'
import TimeInput from '../component/TimeInput'
import G3InputLabel from '../component/G3InputLabel'

const Group3 = () => {
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

    // 第二區塊輸入框（⚠️ 必須在最外層宣告）
    const [activityTitle, setActivityTitle] = useState('');
    const [activityContent, setActivityContent] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);

    // 將時間字串轉成分鐘（支援 24h "HH:MM" 與 12h "AM 9:05"）
    const toMinutes = (timeStr) => {
        if (!timeStr) return null;

        // 12h: "AM 9:05" / "PM 12:30"（大小寫不敏感、允許多一格空白）
        const m12 = timeStr.match(/^\s*(AM|PM)\s+(\d{1,2}):(\d{2})\s*$/i);
        if (m12) {
            let h = parseInt(m12[2], 10);
            const min = parseInt(m12[3], 10);
            const period = m12[1].toUpperCase();
            if (period === 'AM') h = (h === 12 ? 0 : h);
            else h = (h === 12 ? 12 : h + 12);
            return h * 60 + min;
        }

        // 24h: "HH:MM"
        const parts = timeStr.split(':');
        if (parts.length === 2) {
            const h = parseInt(parts[0], 10);
            const min = parseInt(parts[1], 10);
            if (Number.isFinite(h) && Number.isFinite(min)) return h * 60 + min;
        }
        return null;
    };

    // 自動檢查：若結束時間早於開始時間 → 自動調整並提示
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

    // Handlers
    const handleSingleDateChange = (date) => {
        setSingleDate(date);
        console.log('單日選擇:', date);
    };

    const handleDeadlineDateChange = (date) => {
        setDeadlineDate(date);
        console.log('報名截止日:', date);
    };

    const handleEventStartTimeChange = (time) => {
        setEventStartTime(time);
        console.log('活動開始時間:', time);
    };

    const handleEventEndTimeChange = (time) => {
        setEventEndTime(time);
        console.log('活動結束時間:', time);
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

                    <div className='form1-fields'>
                        {/* 揪團類型選擇（目前皆為示意 active） */}
                        <label className='group-category'>
                            <h3 className='category-title'>想揪甚麼團?</h3>
                            <div className='g3-btns'>
                                <button className='active-btn'>找吃飯夥伴</button>
                                <button className='active-btn'>找工作夥伴</button>
                                <button className='active-btn'>找踩點夥伴</button>
                                <button className='active-btn'>找合租室友</button>
                                <button className='active-btn'>找Chill伴</button>
                            </div>
                        </label>

                        {/* 活動日期（單日） */}
                        <label className='group-category'>
                            <CalendarInput
                                title="活動日期"
                                placeholder="決定哪天要一起玩吧！"
                                value={singleDate}
                                onChange={handleSingleDateChange}
                                required={true}
                            />
                        </label>

                        {/* 活動開始時間 */}
                        <label className='group-category'>
                            <TimeInput
                                title="活動開始時間"
                                placeholder="選擇開始時間"
                                value={eventStartTime}
                                onChange={handleEventStartTimeChange}
                                required={true}
                            />
                        </label>

                        {/* 活動預計結束時間 */}
                        <label className='group-category'>
                            <TimeInput
                                title="活動預計結束時間"
                                placeholder="選擇結束時間"
                                value={eventEndTime}
                                onChange={handleEventEndTimeChange}
                                required={true}
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
                                required={true}
                            />
                        </label>

                        {/* 報名截止日（單日） */}
                        <label className='group-category'>
                            <CalendarInput
                                title="報名截止日"
                                placeholder="選擇截止日期"
                                value={deadlineDate}
                                onChange={handleDeadlineDateChange}
                                required={true}
                            />
                        </label>
                    </div>
                </section>

                {/* 第二區塊:活動詳細資訊區塊 */}
                <section id="detail-info">
                    <div className='detail-info-header-title'>
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
                                required={true}
                            />
                        </label>

                        {/* 活動詳細內容 */}
                        <label className='group-category'>
                            <G3InputLabel
                                title="活動詳細內容"
                                placeholder="請輸入：行程安排/活動流程 吸引更多人參加！"
                                value={activityContent}
                                onChange={setActivityContent}
                                isTextarea={true}
                                maxLength={1000}
                                required={true}
                            />
                        </label>

                        {/* 上傳照片 */}
                        <label className='group-category'>
                            <G3InputLabel
                                title="上傳照片"
                                value={uploadedFiles}
                                onChange={setUploadedFiles}
                                isFileUpload={true}
                            />
                        </label>
                    </div>

                    {/* 完成按鈕 */}
                    <section id="createSuccessful-btn">
                        <button className="successful-btn">完成建立</button>
                    </section>

                </section>
            </div>
        </main>
    );
};

export default Group3;
