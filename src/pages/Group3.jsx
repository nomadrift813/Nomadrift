import '../sass/scss/group3.scss'
import '../sass/scss/CalendarInputStyle.scss'
import '../sass/scss/TimeInputStyle.scss'
import '../sass/scss/G3InputLabelStyle.scss'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import CalendarInput from '../component/CalendarInput'
import TimeInput from '../component/TimeInput'
import G3InputLabel from '../component/G3InputLabel'

const Group3 = () => {
    const navigate = useNavigate();

    // 按鈕區（複選）
    const [selectedCategories, setSelectedCategories] = useState([]);
    const categories = ['找吃飯夥伴', '找工作夥伴', '找踩點夥伴', '找合租室友', '找Chill伴'];

    const toggleCategory = (label) => {
        setSelectedCategories((prev) =>
            prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
        );
    };

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

    // 彈窗狀態
    const [showSuccessModal, setShowSuccessModal] = useState(false);

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

    // 處理完成建立按鈕點擊
    const handleCreateSuccess = () => {
        setShowSuccessModal(true);
    };

    // 關閉彈窗並傳遞數據到 Group 頁面
    const closeModal = () => {
        setShowSuccessModal(false);
        
        // 準備新活動的數據
        const newActivity = {
            id: Date.now(), // 使用時間戳作為唯一 ID
            image: uploadedImage ? URL.createObjectURL(uploadedImage) : null,
            signupCount: 0, // 新建立的活動報名人數為 0
            date: singleDate,
            time: eventStartTime,
            location: location,
            title: activityTitle,
            description: activityContent,
            detailLink: "/group2", // 預設詳情頁面
            tags: selectedCategories,
            deadlineDate: deadlineDate,
            endTime: eventEndTime
        };

        // 使用 navigate 的 state 傳遞數據，而不是 localStorage
        navigate('/group', { 
            state: { newActivity } 
        });
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
                                {categories.map((label) => {
                                    const isActive = selectedCategories.includes(label);
                                    return (
                                        <button
                                            key={label}
                                            className={`g3-active-btn ${isActive ? 'is-active' : ''}`}
                                            aria-pressed={isActive}
                                            onClick={() => toggleCategory(label)}
                                            type="button"
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </label>

                        {/* 活動日期（單日） */}
                        <label className='group-category'>
                            <CalendarInput
                                title="活動日期"
                                placeholder="決定哪天要一起玩吧！"
                                value={singleDate}
                                onChange={setSingleDate}
                                required
                            />
                        </label>

                        {/* 活動開始時間 */}
                        <label className='group-category'>
                            <TimeInput
                                title="活動開始時間"
                                placeholder="選擇開始時間"
                                value={eventStartTime}
                                onChange={setEventStartTime}
                                required
                            />
                        </label>

                        {/* 活動預計結束時間 */}
                        <label className='group-category'>
                            <TimeInput
                                title="活動預計結束時間"
                                placeholder="選擇結束時間"
                                value={eventEndTime}
                                onChange={setEventEndTime}
                                required
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
                                required
                            />
                        </label>

                        {/* 報名截止日（單日） */}
                        <label className='group-category'>
                            <CalendarInput
                                title="報名截止日"
                                placeholder="選擇截止日期"
                                value={deadlineDate}
                                onChange={setDeadlineDate}
                                required
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
                                placeholder="一句話說明揪團主題（例如：一起去峇里島海邊做瑜珈!）"
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
                                required
                            />
                        </label>

                        {/* 上傳照片（單張，採用 Diary 風格） */}
                        <label className='group-category'>
                            <G3InputLabel
                                title="上傳照片"
                                value={uploadedImage}
                                onChange={handleImageUpload}
                                isFileUpload
                                required
                            />
                        </label>
                    </div>
                </section>

                <section id='createSuccessful-btn'>
                    <button className='successful-btn' onClick={handleCreateSuccess}>
                        完成建立
                    </button>
                </section>
            </div>

            {/* 成功彈窗 */}
            {showSuccessModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="success-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="success-icon">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="30" fill="#F4D000" />
                                    <path d="M18 30L26 38L42 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h2>發布成功</h2>
                            <p>你的活動已成功發布！</p>
                            <button className="modal-close-btn" onClick={closeModal}>
                                確定
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
};

export default Group3;