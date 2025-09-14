import React, { useState, useRef, useEffect } from 'react';
import "../sass/scss/CalendarInputStyle.scss"
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';


const CalendarInput = ({
    value = '',
    onChange,
    placeholder = '選擇日期',
    title = '',
    required = false,
    disabled = false,
    allowRange = false, // 新增：是否允許選擇區間
    rangePlaceholder = '選擇日期區間' // 新增：區間模式的佔位符
}) => {
    const [selectedDate, setSelectedDate] = useState(value);
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [rangeStart, setRangeStart] = useState(null);
    const [rangeEnd, setRangeEnd] = useState(null);
    const [isSelectingRange, setIsSelectingRange] = useState(false);
    const inputRef = useRef(null);
    const calendarRef = useRef(null);


    const months = [
        '1月', '2月', '3月', '4月', '5月', '6月',
        '7月', '8月', '9月', '10月', '11月', '12月'
    ];


    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];


    // 格式化日期
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };


    // 格式化區間日期
    const formatRangeDate = (start, end) => {
        if (!start) return '';
        if (!end || start.getTime() === end.getTime()) return formatDate(start);
        return `${formatDate(start)} ~ ${formatDate(end)}`;
    };


    // 解析日期字符串
    const parseDate = (dateStr) => {
        if (!dateStr) return null;
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        }
        return null;
    };


    // 解析區間日期字符串
    const parseRangeDate = (rangeStr) => {
        if (!rangeStr) return { start: null, end: null };


        if (rangeStr.includes(' ~ ')) {
            const [startStr, endStr] = rangeStr.split(' ~ ');
            return {
                start: parseDate(startStr.trim()),
                end: parseDate(endStr.trim())
            };
        } else {
            const date = parseDate(rangeStr);
            return { start: date, end: date };
        }
    };


    // 獲取月份的天數
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };


    // 獲取月份第一天是星期幾
    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };


    // 生成日曆天數
    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const days = [];


        // 填充空白天數
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }


        // 填充本月天數
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }


        return days;
    };


    // 檢查日期是否在區間內
    const isDateInRange = (date, start, end) => {
        if (!date || !start || !end) return false;
        const dateTime = date.getTime();
        const startTime = start.getTime();
        const endTime = end.getTime();
        return dateTime >= Math.min(startTime, endTime) && dateTime <= Math.max(startTime, endTime);
    };


    // 處理日期選擇
    const handleDateSelect = (day) => {
        if (!day) return;


        const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);


        if (allowRange) {
            if (!isSelectingRange) {
                // 開始選擇區間
                setRangeStart(selected);
                setRangeEnd(null);
                setIsSelectingRange(true);
            } else {
                // 完成區間選擇
                setRangeEnd(selected);
                setIsSelectingRange(false);


                const formattedRange = formatRangeDate(rangeStart, selected);
                setSelectedDate(formattedRange);
                setShowCalendar(false);


                if (onChange) {
                    onChange(formattedRange);
                }
            }
        } else {
            // 單日選擇模式
            const formattedDate = formatDate(selected);
            setSelectedDate(formattedDate);
            setShowCalendar(false);


            if (onChange) {
                onChange(formattedDate);
            }
        }
    };


    // 上個月
    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };


    // 下個月
    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };


    // 重置選擇
    const resetSelection = () => {
        setIsSelectingRange(false);
        setRangeStart(null);
        setRangeEnd(null);
    };


    // 點擊外部關閉日曆
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setShowCalendar(false);
                resetSelection();
            }
        };


        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    // 同步外部 value
    useEffect(() => {
        setSelectedDate(value);
        if (allowRange && value) {
            const { start, end } = parseRangeDate(value);
            setRangeStart(start);
            setRangeEnd(end);
        }
    }, [value, allowRange]);


    return (
        <div className="date-picker-container">
            {title && (
                <div className="calendarInput-title-section">
                    <h2 className="calendarInput-title">
                        {title}
                        {required && <span className="required-asterisk">*</span>}
                    </h2>
                </div>
            )}


            <div className="input-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    className="date-input"
                    placeholder={allowRange ? rangePlaceholder : placeholder}
                    value={selectedDate}
                    onClick={() => !disabled && setShowCalendar(!showCalendar)}
                    disabled={disabled}
                    readOnly
                />


                <Calendar className="calendar-icon" />


                {showCalendar && (
                    <div ref={calendarRef} className="calendar-container">
                        <div className="calendar-header">
                            <button
                                onClick={previousMonth}
                                className="month-nav-btn"
                                type="button"
                            >
                                <ChevronLeft className="nav-icon" />
                            </button>


                            <h3 className="month-title">
                                {currentMonth.getFullYear()}年{months[currentMonth.getMonth()]}
                            </h3>


                            <button
                                onClick={nextMonth}
                                className="month-nav-btn"
                                type="button"
                            >
                                <ChevronRight className="nav-icon" />
                            </button>
                        </div>


                        {allowRange && isSelectingRange && (
                            <div className="range-hint">
                                請選擇結束日期
                                <button
                                    className="reset-btn"
                                    onClick={resetSelection}
                                    type="button"
                                >
                                    重新選擇
                                </button>
                            </div>
                        )}


                        <div className="weekdays">
                            {weekdays.map((day, index) => (
                                <div key={index} className="weekday">
                                    {day}
                                </div>
                            ))}
                        </div>


                        <div className="calendar-grid">
                            {generateCalendarDays().map((day, index) => {
                                if (!day) {
                                    return <div key={index} className="calendar-day empty"></div>;
                                }


                                const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                                const today = new Date();


                                const isToday = currentDate.getFullYear() === today.getFullYear() &&
                                    currentDate.getMonth() === today.getMonth() &&
                                    currentDate.getDate() === today.getDate();


                                const isDisabled = currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());


                                let isSelected = false;
                                let isInRange = false;
                                let isRangeStart = false;
                                let isRangeEnd = false;


                                if (allowRange) {
                                    if (rangeStart && currentDate.getTime() === rangeStart.getTime()) {
                                        isRangeStart = true;
                                        isSelected = true;
                                    }
                                    if (rangeEnd && currentDate.getTime() === rangeEnd.getTime()) {
                                        isRangeEnd = true;
                                        isSelected = true;
                                    }
                                    if (rangeStart && rangeEnd) {
                                        isInRange = isDateInRange(currentDate, rangeStart, rangeEnd);
                                    }
                                } else {
                                    const singleDate = parseDate(selectedDate);
                                    isSelected = singleDate && currentDate.getTime() === singleDate.getTime();
                                }


                                return (
                                    <button
                                        key={index}
                                        className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${isDisabled ? 'disabled' : ''} ${isInRange && !isSelected ? 'in-range' : ''} ${isRangeStart ? 'range-start' : ''} ${isRangeEnd ? 'range-end' : ''}`}
                                        onClick={() => !isDisabled && handleDateSelect(day)}
                                        disabled={isDisabled}
                                        type="button"
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default CalendarInput;

