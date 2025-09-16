import { useState, useRef, useEffect } from "react";
import G3InputLabel from "./G3InputLabel";
// 注意：我們改為在本檔內實作生日專用日曆，但仍沿用 CalendarInput 的樣式類名
import "../sass/scss/CalendarInputStyle.scss";
import "../sass/scss/sign.scss";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

const BirthdatePicker = ({
  value = "",
  onChange,
  placeholder = "選擇生日",
  title = "出生日期",
  disabled = false,
  required = false,
}) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    // 若已有值，月份跳到該值；否則到今天
    const d = parseDate(value);
    return d ? new Date(d.getFullYear(), d.getMonth(), 1) : new Date();
  });

  const inputRef = useRef(null);
  const calendarRef = useRef(null);

  const months = [
    "1月","2月","3月","4月","5月","6月",
    "7月","8月","9月","10月","11月","12月"
  ];
  const weekdays = ["日","一","二","三","四","五","六"];

  function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}/${m}/${d}`;
  }

  function parseDate(str) {
    if (!str) return null;
    const parts = str.split("/");
    if (parts.length !== 3) return null;
    const [y, m, d] = parts.map((s) => parseInt(s, 10));
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }

  function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function generateCalendarDays() {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }

  function handleDateSelect(day) {
    if (!day) return;
    const selected = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const formatted = formatDate(selected);
    setSelectedDate(formatted);
    setShowCalendar(false);
    onChange?.(formatted);
  }

  function previousMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  }

  function nextMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  }

  // 點擊外部關閉
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 同步外部 value
  useEffect(() => {
    setSelectedDate(value || "");
    const d = parseDate(value);
    if (d) setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1));
  }, [value]);

  const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

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
          placeholder={placeholder}
          value={selectedDate}
          onClick={() => !disabled && setShowCalendar((s) => !s)}
          disabled={disabled}
          readOnly
        />
        <CalendarIcon className="calendar-icon" />

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
                aria-label="Next month"
              >
                <ChevronRight className="nav-icon" />
              </button>
            </div>

            <div className="weekdays">
              {weekdays.map((wd) => (
                <div key={wd} className="weekday">
                  {wd}
                </div>
              ))}
            </div>

            <div className="calendar-grid">
              {generateCalendarDays().map((day, idx) => {
                if (!day) return <div key={`e-${idx}`} className="calendar-day empty" />;

                const currentDate = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                );

                const isToday =
                  currentDate.getFullYear() === today.getFullYear() &&
                  currentDate.getMonth() === today.getMonth() &&
                  currentDate.getDate() === today.getDate();

                // 關鍵差異：禁止「未來」日期，允許「今天與過去」日期
                const isDisabled = currentDate > today;

                const selected = parseDate(selectedDate);
                const isSelected =
                  selected &&
                  currentDate.getTime() ===
                    new Date(selected.getFullYear(), selected.getMonth(), selected.getDate()).getTime();

                return (
                  <button
                    key={`d-${idx}`}
                    className={`calendar-day ${isSelected ? "selected" : ""} ${isToday ? "today" : ""} ${isDisabled ? "disabled" : ""}`}
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

const Sign = ({ onAuth, onSwitch }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthdate: "",
    phone: "",
    nationality: "",
  });

  const handleInputChange = (field) => (value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 註冊流程 / API
    onAuth?.({ username: formData.username, email: formData.email });
  };

  return (
    <main>
      <section id="sign">
        <div className="auth-inner">
          <h1>註冊</h1>

          <form id="signform" method="post" onSubmit={handleSubmit}>
            <div className="sign-input-custom">
              <G3InputLabel
                title="會員名稱"
                placeholder="暱稱"
                value={formData.username}
                onChange={handleInputChange("username")}
                name="username"
                type="text"
                required
              />
            </div>

            <div className="sign-input-custom">
              <G3InputLabel
                title="Email"
                placeholder="123@gmail.com"
                value={formData.email}
                onChange={handleInputChange("email")}
                name="email"
                type="email"
                required
              />
            </div>

            <div className="sign-input-custom">
              <G3InputLabel
                title="密碼"
                placeholder="密碼需至少8個字元"
                value={formData.password}
                onChange={handleInputChange("password")}
                required
                name="password"
                type="password"
                required
              />
            </div>

            <div className="calendar-input-wrapper">
              {/* 使用本檔內的 BirthdatePicker：允許選擇今天與更早的日期 */}
              <BirthdatePicker
                title="出生日期"
                placeholder="選擇生日"
                value={formData.birthdate}
                onChange={handleInputChange("birthdate")}
                required
              />
            </div>

            <div className="sign-input-custom">
              <G3InputLabel
                title="連絡電話"
                placeholder="0912345678"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                name="phone"
                type="tel"
                maxLength={10}
                required
              />
            </div>

            <div className="sign-input-custom">
              <G3InputLabel
                title="國籍"
                placeholder="台灣"
                value={formData.nationality}
                onChange={handleInputChange("nationality")}
                name="nationality"
                type="text"
                required
              />
            </div>

            <button className="sign-join-btn" type="submit">
              立刻加入
            </button>
          </form>

          <div className="sign-text-outline">
            <p>
              你是會員？{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSwitch?.();
                }}
              >
                登入
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Sign;
