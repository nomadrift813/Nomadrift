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
    icon = null,                // 可自訂 icon（ReactNode）
}) => {
    // 內部狀態仍用陣列，但長度最多 1
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]); // 最多 1 個 URL
    const fileInputRef = useRef(null);

    // 父層傳的 value（陣列）→ 只保留第一張
    useEffect(() => {
        if (isFileUpload && Array.isArray(value)) {
            const v = value.slice(0, 1);
            setSelectedFiles(v);
            generatePreviewUrls(v);
        }
    }, [isFileUpload, value]);

    // 生成單張預覽 URL
    const generatePreviewUrls = (files) => {
        // 清理舊 URL
        previewUrls.forEach((url) => {
            if (url && typeof url === 'string' && url.startsWith('blob:')) {
                URL.revokeObjectURL(url);
            }
        });

        const first = files[0];
        const urls = first
            ? [first instanceof File ? URL.createObjectURL(first) : first]
            : [];
        setPreviewUrls(urls);
    };

    // 只允許一張，覆蓋舊檔
    const handleFileSelect = (files) => {
        const valid = Array.from(files).filter((f) => f.type.startsWith('image/'));
        const first = valid[0] ?? null;
        const newFiles = first ? [first] : [];
        setSelectedFiles(newFiles);
        generatePreviewUrls(newFiles);
        onChange?.(newFiles); // 對外仍是陣列 API（最多一張）
    };

    const handleFileRemove = () => {
        setSelectedFiles([]);
        generatePreviewUrls([]);
        onChange?.([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // 卸載清理 URL
    useEffect(() => {
        return () => {
            previewUrls.forEach((url) => {
                if (url && typeof url === 'string' && url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [previewUrls]);

    // DnD
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
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files); // 內部只取第一張
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
                    className={`file-upload-area ${dragActive ? 'drag-active' : ''} ${selectedFiles.length > 0 ? 'has-files' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => {
                        if (fileInputRef.current) fileInputRef.current.value = ''; // 允許同名檔案替換
                        fileInputRef.current?.click();
                    }}
                >
                    {selectedFiles.length === 0 ? (
                        // 沒有檔案時顯示上傳提示
                        <>
                            <Upload className="upload-icon" />
                            <p className="upload-text">點擊上傳或拖拽照片到這裡</p>
                            <p className="upload-hint">建議上傳 4:3 或 1920x1280 橫向照片，以保持最佳顯示</p>
                        </>
                    ) : (
                        // 單張預覽
                        <div className="image-preview-single">
                            <img
                                src={previewUrls[0]}
                                alt="預覽"
                                className="preview-image"
                            />
                            <button
                                type="button"
                                className="remove-image-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleFileRemove();
                                }}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        style={{ display: 'none' }}
                    />
                </div>

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
