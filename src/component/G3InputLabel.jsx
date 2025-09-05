import React, { useEffect, useRef, useState } from 'react';
import '../sass/scss/G3InputLabelStyle.scss';
import { MapPin, Upload, X } from 'lucide-react';

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
    hint = '',                  // 顯示欄位提示/錯誤訊息（選用）
    isTextarea = false,         // 是否為textarea
    isFileUpload = false,       // 是否為檔案上傳
    showLocationIcon = false,   // 是否顯示位置圖標（預設 MapPin）
    icon = null,                // 新增：可自訂 icon（ReactNode）
}) => {
    // 受控 / 非受控：若父層有 value（檔案陣列），以父層為準；否則用內部狀態
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    // 父層傳的 value 若是檔案陣列，與內部保持同步
    useEffect(() => {
        if (isFileUpload && Array.isArray(value)) {
            setSelectedFiles(value);
        }
    }, [isFileUpload, value]);

    // 處理文件選擇
    const handleFileSelect = (files) => {
        const validFiles = Array.from(files).filter(file =>
            file.type.startsWith('image/')
        );
        const newFiles = [...(Array.isArray(value) ? value : selectedFiles), ...validFiles];
        setSelectedFiles(newFiles);
        onChange?.(newFiles);
    };

    const handleFileRemove = (indexToRemove) => {
        const source = Array.isArray(value) ? value : selectedFiles;
        const updatedFiles = source.filter((_, index) => index !== indexToRemove);
        setSelectedFiles(updatedFiles);
        onChange?.(updatedFiles);
    };

    const [dragActive, setDragActive] = useState(false);
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files);
        }
    };

    // 檔案上傳區域
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

                <div
                    className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Upload className="upload-icon" />
                    <p className="upload-text">點擊上傳或拖拽照片到這裡</p>
                    <p className="upload-hint">建議上傳 4:3 或 1920x1280 橫向照片，以保持最佳顯示</p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        style={{ display: 'none' }}
                    />
                </div>

                {selectedFiles.length > 0 && (
                    <div className="selected-files">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="file-preview">
                                <span className="file-name">{file.name}</span>
                                <button
                                    type="button"
                                    className="remove-file"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFileRemove(index);
                                    }}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {!!hint && <p className="field-hint">{hint}</p>}
            </div>
        );
    }

    // Textarea
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
                        value={value}
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

    // 原始的文字輸入
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
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled}
                    maxLength={maxLength}
                />

                {/* 優先顯示自訂 icon，否則可選 MapPin */}
                {icon ? icon : (showLocationIcon && <MapPin className="location-icon" />)}
            </div>

            {!!hint && <p className="field-hint">{hint}</p>}
        </div>
    );
};

export default G3InputLabel;
