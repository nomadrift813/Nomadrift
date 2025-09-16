import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, children, closeOnOverlay = true }) {
  const modalRef = useRef(null);
  const lastFocused = useRef(null);

  // 鎖捲動 + 捲軸補償 + 焦點管理
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;

    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    setTimeout(() => modalRef.current?.focus(), 0);

    return () => {
      body.style.overflow = prevOverflow || "";
      body.style.paddingRight = prevPaddingRight || "";
      lastFocused.current?.focus?.();
    };
  }, [open]);

  // Esc 關閉 + 簡易焦點圈
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'a[href],button,textarea,input,select,[tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal-overlay2"
      onClick={closeOnOverlay ? onClose : undefined}
      aria-hidden="true"
    >
      <div
        className="modal-content2"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="close">
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
