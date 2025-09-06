import { useEffect } from "react";

export default function ScrollEffect() {
    useEffect(() => {

        // gotop 按鈕點擊
        const gotop = document.getElementById("gotop");
        if (gotop) {
            gotop.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        }

        // 淡入淡出效果 (顯示/隱藏 gotop)
        const handleScroll = () => {
            if (gotop) {
                if (window.scrollY > 300) {
                    gotop.style.opacity = "1";
                    gotop.style.pointerEvents = "auto";
                } else {
                    gotop.style.opacity = "0";
                    gotop.style.pointerEvents = "none";
                }
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
}
