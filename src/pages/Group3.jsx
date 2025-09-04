import '../sass/scss/group3.scss'
import { Link } from "react-router-dom"
import { useState } from "react"
import CalendarInput from '../component/CalendarInput'
import TimeInput from '../component/TimeInput'

const Group3 = () => {
    // 日曆輸入框
    const [singleDate, setSingleDate] = useState('');
    const [rangeDate, setRangeDate] = useState('');
    const [eventDate, setEventDate] = useState('');

    const handleSingleDateChange = (date) => {
        setSingleDate(date);
        console.log('單日選擇:', date);
    };

    const handleRangeDateChange = (range) => {
        setRangeDate(range);
        console.log('區間選擇:', range);
    };

    const handleEventDateChange = (date) => {
        setEventDate(date);
        console.log('活動日期:', date);
    };
    // 日曆輸入框


    // 時間輸入框
    const handleEventTimeChange = (time) => {   // << 新增 handler
        setEventTime(time);
        console.log('活動時間:', time);
    };
    // 時間輸入框


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
                {/* 表單大標 */}
                <section id="basic-info">
                    <div className='header-title'>
                        <h2>活動基本資訊</h2>
                        <p>簡單幾步，就能號召志同道合的遊牧夥伴！</p>
                    </div>

                    {/* 白底表單1 */}
                    <div className='form1-fields'>
                        {/* 揪團類型選擇 */}
                        <label className='group-category' > {/*htmlFor=""*/}
                            <h3 className='category-title'>想揪甚麼團?</h3>
                            {/* 按鈕類型選擇 */}
                            <div className='g3-btns'>
                                <button className='active-btn'>找吃飯夥伴</button>
                                <button className='active-btn'>找工作夥伴</button>
                                <button className='active-btn'>找踩點夥伴</button>
                                <button className='active-btn'>找合租室友</button>
                                <button className='active-btn'>找Chill伴</button>
                            </div>
                        </label>


                        {/* 活動日期 */}
                        <label className='group-category' >
                            <CalendarInput
                                title="活動日期"
                                placeholder="決定哪天要一起玩吧！"
                                rangePlaceholder="選擇活動日期"
                                allowRange={true}
                                value={rangeDate}
                                onChange={handleRangeDateChange}
                            />
                        </label>

                        {/* 活動時間 */}
                        <label className='group-category' >
                            <CalendarInput
                                title="活動時間"
                                placeholder="請選擇活動時間"
                                rangePlaceholder="選擇活動日期"
                                allowRange={true}
                                value={rangeDate}
                                onChange={handleRangeDateChange}
                            />
                        </label>

                        {/* 集合地點 */}
                        <label className='group-category' > {/*htmlFor=""*/}
                            <h3 className='category-title'>集合地點</h3>
                            {/* 按鈕類型選擇 */}
                            <input
                                type="text"
                                placeholder='例如：台北信義區' />
                        </label>

                        {/*報名截止日 */}
                        <label className='group-category' >
                            <CalendarInput
                                title="報名截止日期"
                                placeholder="請選擇截止日期"
                                rangePlaceholder="選擇日期"
                                allowRange={true}
                                value={rangeDate}
                                onChange={handleRangeDateChange}
                            />
                        </label>

                    </div>
                </section>
            </div>
        </main>
    );
};

export default Group3;