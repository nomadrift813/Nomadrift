import React, { useRef, useState, useId } from 'react';
import '../sass/scss/G3InputLabelStyle.scss';
import { MapPin, Upload, X } from 'lucide-react';

const G3InputLabel = ({
    title = '文字輸入',
    placeholder = '',
    value = null,             // File | string | null
    onChange,
    required = false,
    disabled = false,
    name,
    maxLength,
    type = 'text',
    hint = '',
    isTextarea = false,
    isFileUpload = false,     // 單張上傳（Diary風）
    showLocationIcon = false,
    icon = null,
}) => {
    const [imagePreview, setImagePreview] = useState(null); // 預覽 URL
    const fileInputRef = useRef(null);
    const inputId = useId();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // 設置檔案到父組件
            onChange?.(file);
            // 建立預覽
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        // 清除預覽
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
            setImagePreview(null);
        }
        // 清除父組件的檔案
        onChange?.(null);
        // 清除 input 的 value
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // 單張上傳 UI（採用 Diary 風格）
    if (isFileUpload) {
        return (
            <div className="text-input-container">
                {title && (
                    <div className="inputLabel-title-section">
                        <h2 className="inputLabel-title">
                            {title}
                            {required && <span className="required-asterisk">*</span>}
                        </h2>
                    </div>
                )}

                <div className="file-upload-area">
                    {imagePreview ? (
                        <div className="image-preview" onClick={() => fileInputRef.current?.click()}>
                            <img src={imagePreview} alt="預覽" />
                            <button 
                                className="remove-image-btn" 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    handleRemoveImage(); 
                                }}
                                type="button"
                            >
                                &times;
                            </button>
                        </div>
                    ) : (
                        <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="upload-icon" />
                            <p className="upload-text">點擊上傳照片</p>
                            <p className="upload-hint">建議 4:3 或 1920×1280 橫向，效果最佳</p>
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                </div>

                {!!hint && <p className="field-hint">{hint}</p>}
            </div>
        );
    }

    // 文字區塊 & Textarea（原樣）
    if (isTextarea) {
        return (
            <div className="text-input-container">
                {title && (
                    <div className="inputLabel-title-section">
                        <h2 className="inputLabel-title">
                            {title}
                            {required && <span className="required-asterisk">*</span>}
                        </h2>
                    </div>
                )}
                <div className="input-wrapper">
                    <textarea
                        className="text-textarea"
                        name={name}
                        placeholder={placeholder}
                        value={value || ''}
                        onChange={(e) => onChange?.(e.target.value)}
                        disabled={disabled}
                        maxLength={maxLength}
                        rows={4}
                    />
                </div>
                {!!hint && <p className="field-hint">{hint}</p>}
            </div>
        );
    }

    return (
        <div className="text-input-container">
            {title && (
                <div className="inputLabel-title-section">
                    <h2 className="inputLabel-title">
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
                    value={value || ''}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled}
                    maxLength={maxLength}
                />
                {icon ? icon : (showLocationIcon && <MapPin className="location-icon" />)}
            </div>

            {!!hint && <p className="field-hint">{hint}</p>}
        </div>
    );
};

export default G3InputLabel;