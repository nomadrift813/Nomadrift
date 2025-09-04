import React, { useState, useRef, useEffect, useCallback } from 'react';
import "../sass/scss/TimeInputStyle.scss";
import { ChevronUp, ChevronDown, Clock } from 'lucide-react';

const TimeInput = ({
    value = '',
    onChange,
    placeholder = '選擇時間',
    title = '活動時間',
    required = false,
    disabled = false,
    allowRange = false,          // 是否允許選擇時間區間
    rangePlaceholder = '選擇時間區間',
    format24Hour = true,         // 是否使用24小時制
    minuteStep = 15              // 分鐘間隔（5, 10, 15, 30）
}) => {
    const [selectedTime, setSelectedTime] = useState(value);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [rangeStart, setRangeStart] = useState(null);
    const [rangeEnd, setRangeEnd] = useState(null);
    const [isSelectingRange, setIsSelectingRange] = useState(false);
    const [currentHour, setCurrentHour] = useState(9);
    const [currentMinute, setCurrentMinute] = useState(0);
    const [currentPeriod, setCurrentPeriod] = useState('AM'); // 12h: AM/PM
    const inputRef = useRef(null);
    const timePickerRef = useRef(null);

    // 格式化時間
    const formatTime = useCallback((hour, minute, period = null) => {
        if (format24Hour) {
            return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        }
        return `${period} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    }, [format24Hour]);

    // 格式化區間時間
    const formatRangeTime = (start, end) => {
        if (!start) return '';
        if (!end || start === end) return start;
        return `${start} ~ ${end}`;
    };

    // 解析時間字串 → {hour, minute, period|null}
    const parseTime = useCallback((timeStr) => {
        if (!timeStr) return null;
        if (format24Hour) {
            const parts = timeStr.split(':');
            if (parts.length === 2) {
                return {
                    hour: parseInt(parts[0], 10),
                    minute: parseInt(parts[1], 10),
                    period: null
                };
            }
        } else {
            // 接受 1~2 位數小時：AM 9:05 / PM 12:30
            const match = timeStr.match(/^(AM|PM)\s(\d{1,2}):(\d{2})$/);
            if (match) {
                return {
                    hour: parseInt(match[2], 10),
                    minute: parseInt(match[3], 10),
                    period: match[1]
                };
            }
        }
        return null;
    }, [format24Hour]);

    // 解析區間時間字串
    const parseRangeTime = (rangeStr) => {
        if (!rangeStr) return { start: null, end: null };
        if (rangeStr.includes(' ~ ')) {
            const [startStr, endStr] = rangeStr.split(' ~ ');
            return { start: startStr.trim(), end: endStr.trim() };
        }
        return { start: rangeStr, end: rangeStr };
    };

    // 生成小時/分鐘選項
    const generateHours = useCallback(() => {
        if (format24Hour) return Array.from({ length: 24 }, (_, i) => i);
        return Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));
    }, [format24Hour]);

    const generateMinutes = useCallback(() => {
        const minutes = [];
        for (let i = 0; i < 60; i += minuteStep) minutes.push(i);
        return minutes;
    }, [minuteStep]);

    // 上下調整小時/分鐘
    const handleHourChange = (direction) => {
        const hours = generateHours();
        const currentIndex = hours.indexOf(currentHour);
        let newIndex;
        if (direction === 'up') newIndex = currentIndex === hours.length - 1 ? 0 : currentIndex + 1;
        else newIndex = currentIndex === 0 ? hours.length - 1 : currentIndex - 1;
        setCurrentHour(hours[newIndex]);
    };

    const handleMinuteChange = (direction) => {
        const minutes = generateMinutes();
        const currentIndex = minutes.indexOf(currentMinute);
        let newIndex;
        if (direction === 'up') newIndex = currentIndex === minutes.length - 1 ? 0 : currentIndex + 1;
        else newIndex = currentIndex === 0 ? minutes.length - 1 : currentIndex - 1;
        setCurrentMinute(minutes[newIndex]);
    };

    // AM/PM 切換 (12h)
    const handlePeriodChange = () => {
        if (!format24Hour) setCurrentPeriod((p) => (p === 'AM' ? 'PM' : 'AM'));
    };

    // 24h 時間比較工具（支援 12h 轉換）
    const to24 = useCallback(({ hour, minute, period }) => {
        if (format24Hour) return { h: hour, m: minute };
        const h = period === 'AM' ? (hour === 12 ? 0 : hour) : (hour === 12 ? 12 : hour + 12);
        return { h, m: minute };
    }, [format24Hour]);

    const cmpTime = useCallback((aStr, bStr) => {
        const a = parseTime(aStr);
        const b = parseTime(bStr);
        if (!a || !b) return 0;
        const A = to24(a), B = to24(b);
        return (A.h * 60 + A.m) - (B.h * 60 + B.m);
    }, [parseTime, to24]);

    // 確認時間 / 區間
    const handleTimeConfirm = () => {
        const timeString = formatTime(currentHour, currentMinute, currentPeriod);

        if (allowRange) {
            if (!isSelectingRange) {
                setRangeStart(timeString);
                setRangeEnd(null);
                setIsSelectingRange(true);
                return;
            }
            // 完成區間：若順序顛倒自動排序
            let start = rangeStart;
            let end = timeString;
            if (cmpTime(start, end) > 0) [start, end] = [end, start];

            const formattedRange = formatRangeTime(start, end);
            setSelectedTime(formattedRange);
            setShowTimePicker(false);
            setIsSelectingRange(false);
            onChange?.(formattedRange);
            return;
        }

        // 單點時間
        setSelectedTime(timeString);
        setShowTimePicker(false);
        onChange?.(timeString);
    };

    // 重置區間選擇
    const resetSelection = () => {
        setIsSelectingRange(false);
        setRangeStart(null);
        setRangeEnd(null);
    };

    // 點擊外部關閉
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                timePickerRef.current && !timePickerRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)
            ) {
                setShowTimePicker(false);
                resetSelection();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 鍵盤操作（Esc、上下鍵）
    useEffect(() => {
        const onKey = (e) => {
            if (!showTimePicker) return;
            if (e.key === 'Escape') {
                setShowTimePicker(false);
                resetSelection();
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                handleMinuteChange('up');
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                handleMinuteChange('down');
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [showTimePicker]);

    // 同步外部 value / allowRange / format24Hour
    useEffect(() => {
        setSelectedTime(value);

        if (allowRange && value) {
            const { start, end } = parseRangeTime(value);
            setRangeStart(start);
            setRangeEnd(end);
        } else if (value) {
            const parsed = parseTime(value);
            if (parsed) {
                setCurrentHour(parsed.hour);
                setCurrentMinute(parsed.minute);
                if (!format24Hour && parsed.period) setCurrentPeriod(parsed.period);
            }
        }
    }, [value, allowRange, format24Hour, parseTime]);

    // minuteStep 對齊（避免 indexOf -1）
    useEffect(() => {
        const mins = generateMinutes();
        if (!mins.includes(currentMinute)) {
            const nearest = mins.reduce(
                (p, c) => (Math.abs(c - currentMinute) < Math.abs(p - currentMinute) ? c : p),
                mins[0]
            );
            setCurrentMinute(nearest);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minuteStep]);

    // 切換 12/24h 時，若無外部 value，重置顯示到 09:00（可自行調整）
    useEffect(() => {
        if (!value) {
            setCurrentHour(9);
            setCurrentMinute(0);
            if (!format24Hour) setCurrentPeriod('AM');
        }
    }, [format24Hour, value]);

    return (
        <div className="time-picker-container">
            {title && (
                <div className="title-section">
                    <h2 className="title">
                        {title}
                        {required && <span className="required-asterisk">*</span>}
                    </h2>
                </div>
            )}

            <div className="input-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    className="time-input"
                    placeholder={allowRange ? rangePlaceholder : placeholder}
                    value={selectedTime}
                    onClick={() => !disabled && setShowTimePicker((s) => !s)}
                    disabled={disabled}
                    readOnly
                />

                <Clock className="clock-icon" />

                {showTimePicker && (
                    <div ref={timePickerRef} className="time-picker-container-dropdown">
                        <div className="time-picker-header">
                            <h3 className="time-title">
                                {allowRange && isSelectingRange ? '選擇結束時間' : '選擇時間'}
                            </h3>
                        </div>

                        {allowRange && isSelectingRange && (
                            <div className="range-hint">
                                開始時間: {rangeStart}
                                <button className="reset-btn" onClick={resetSelection} type="button">
                                    重新選擇
                                </button>
                            </div>
                        )}

                        <div className="time-controls">
                            <div className="time-column">
                                <button className="time-nav-btn" onClick={() => handleHourChange('up')} type="button">
                                    <ChevronUp className="nav-icon" />
                                </button>
                                <div className="time-value">{String(currentHour).padStart(2, '0')}</div>
                                <button className="time-nav-btn" onClick={() => handleHourChange('down')} type="button">
                                    <ChevronDown className="nav-icon" />
                                </button>
                                <div className="time-label">小時</div>
                            </div>

                            <div className="time-separator">:</div>

                            <div className="time-column">
                                <button className="time-nav-btn" onClick={() => handleMinuteChange('up')} type="button">
                                    <ChevronUp className="nav-icon" />
                                </button>
                                <div className="time-value">{String(currentMinute).padStart(2, '0')}</div>
                                <button className="time-nav-btn" onClick={() => handleMinuteChange('down')} type="button">
                                    <ChevronDown className="nav-icon" />
                                </button>
                                <div className="time-label">分鐘</div>
                            </div>

                            {!format24Hour && (
                                <>
                                    <div className="time-separator" />
                                    <div className="time-column">
                                        <button className="time-nav-btn" onClick={handlePeriodChange} type="button">
                                            <ChevronUp className="nav-icon" />
                                        </button>
                                        <div className="time-value period">{currentPeriod}</div>
                                        <button className="time-nav-btn" onClick={handlePeriodChange} type="button">
                                            <ChevronDown className="nav-icon" />
                                        </button>
                                        <div className="time-label">上午/下午</div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="time-picker-actions">
                            <button className="confirm-btn" onClick={handleTimeConfirm} type="button">
                                確認
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimeInput;
