import React from 'react';
import '../sass/scss/G3InputLabelStyle.scss';

const G3InputLabel = ({
    title = '文字輸入',
    placeholder = '',
    value = '',
    onChange,
    required = false,
    disabled = false,
    name,
    maxLength,
    type = 'text',
    hint = '', // 顯示欄位提示/錯誤訊息（選用）
}) => {
    return (
        <div className="text-input-container">
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
                    className="text-input"
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled}
                    maxLength={maxLength}
                />
            </div>

            {!!hint && (
                <p className="field-hint">{hint}</p>
            )}
        </div>
    );
};

export default G3InputLabel;