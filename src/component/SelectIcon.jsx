import React, { useState } from 'react';
import '../sass/scss/SelectIcon.scss';

const SelectIcon = ({ className }) => {
    // 使用 useState 來追蹤 SVG 的點選狀態
    const [isFilled, setIsFilled] = useState(false);

    // 處理點擊事件的函式
    const handleClick = () => {
        setIsFilled(!isFilled);
    };

    return (
        <figure className={className} onClick={handleClick}>
            <svg 
                className="select-icon"
                width="60" 
                height="60" 
                viewBox="0 0 60 60" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: 'pointer' }}
            >
                <circle cx="30" cy="30" r="30" fill="white"/>
                <path 
                    d="M18 21.667C18 18.5372 20.5746 16 23.7506 16H36.2494C39.4254 16 42 18.5372 42 21.667V39.215C42 42.368 38.312 44.1337 35.7968 42.185L31.1847 38.6117C30.4895 38.073 29.5105 38.073 28.8153 38.6117L24.2032 42.185C21.688 44.1337 18 42.368 18 39.215V21.667Z" 
                    stroke="#1F1F1F" 
                    strokeWidth="1.5" 
                    // 根據 isFilled 狀態來設定 fill 顏色
                    fill={isFilled ? "#1F1F1F" : "none"} 
                />
            </svg>
        </figure>
    );
};

export default SelectIcon;