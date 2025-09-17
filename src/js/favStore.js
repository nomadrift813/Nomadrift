// 收藏資料 & 全域委派（單例，避免 StrictMode 重綁）
// ---------------------------------------------------
export const FAV_EVENT = "nd:fav-changed";
const AUTH_KEY = "nd_auth";

export function getAuthFromLS() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function userId(auth = getAuthFromLS()) {
  return auth?.user?.id || auth?.user?.email || auth?.user?.uid || "me";
}
function favKey(type, auth = getAuthFromLS()) {
  return `nd_fav_${type}_${userId(auth)}`;
}

export function getFavList(type, auth = getAuthFromLS()) {
  try {
    return JSON.parse(localStorage.getItem(favKey(type, auth))) || [];
  } catch {
    return [];
  }
}
export function isFav(type, id, auth = getAuthFromLS()) {
  const list = getFavList(type, auth);
  return list.some((x) => String(x.id) === String(id));
}
export function setFavList(type, list, auth = getAuthFromLS()) {
  localStorage.setItem(favKey(type, auth), JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(FAV_EVENT, { detail: { type, list } }));
}
export function clearFav(type, auth = getAuthFromLS()) {
  try {
    localStorage.removeItem(favKey(type, auth));
  } finally {
    window.dispatchEvent(new CustomEvent(FAV_EVENT, { detail: { type, list: [] } }));
  }
}
export function toggleFav(type, item, auth = getAuthFromLS()) {
  if (!auth?.isAuthed) return { ok: false, needLogin: true };
  const list = getFavList(type, auth);
  const idx = list.findIndex((x) => String(x.id) === String(item.id));
  let active;
  if (idx >= 0) {
    list.splice(idx, 1);
    active = false;
  } else {
    list.push(item);
    active = true;
  }
  setFavList(type, list, auth);
  return { ok: true, active, list };
}

/** 讓頁面上所有 .js-fav / [data-fav] 圖示套用「已收藏」外觀 */
export function hydrateFavIcons() {
  const auth = getAuthFromLS();
  const els = document.querySelectorAll(".js-fav, [data-fav]");
  els.forEach((el) => {
    let type, id;
    if (el.dataset.fav) {
      try {
        const cfg = JSON.parse(el.dataset.fav);
        type = cfg?.type;
        id = cfg?.id;
      } catch {}
    } else {
      type = el.dataset.favType;
      id = el.dataset.favId;
    }
    if (!type || !id) return;
    const active = isFav(type, id, auth);
    el.setAttribute("data-active", active ? "true" : "false");
    el.setAttribute("aria-pressed", active ? "true" : "false");
    el.classList.toggle("is-active", !!active);

    // 若裡面是 <path data-bm>，切換填色
    const path = el.querySelector && el.querySelector("path[data-bm]");
    if (path) {
      if (active) {
        path.setAttribute("fill", "currentColor");
        path.setAttribute("stroke", "currentColor");
      } else {
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "currentColor");
      }
    }

    // 若是 <img> 可切換 src（支援舊寫法）
    const actSrc = el.dataset.activeSrc || el.dataset.favSrcActive;
    const inactSrc = el.dataset.inactiveSrc || el.dataset.favSrcInactive;
    if (el.tagName === "IMG" && actSrc && inactSrc) {
      el.src = active ? actSrc : inactSrc;
    }
  });
}

/**
 * 全域收藏委派（單例）
 * 可點元素：.js-fav 或 [data-fav]（可以是 SVG 自己）
 * 未登入時：呼叫 onNeedLogin()（顯示你的登入 Modal），不導頁
 */
export function initFavDelegator({ onNeedLogin, navigate, getAuth } = {}) {
  // 若已經綁過，先清掉（避免 StrictMode 重複綁）
  if (window.__ndFavDelegatorCleanup) {
    try { window.__ndFavDelegatorCleanup(); } catch {}
  }

  const clickHandler = (e) => {
    const el = e.target.closest?.("[data-fav]") || e.target.closest?.(".js-fav");
    if (!el) return;

    let cfg = null;
    if (el.dataset.fav) {
      try { cfg = JSON.parse(el.dataset.fav); } catch { cfg = {}; }
    } else {
      cfg = {
        type: el.dataset.favType,
        id: el.dataset.favId,
        name: el.dataset.favName,
        img: el.dataset.favImg,
      };
      if (el.dataset.favJson) {
        try { cfg.item = JSON.parse(el.dataset.favJson); } catch {}
      }
    }

    const type = cfg?.type;
    const id = cfg?.id;
    if (!type || !id) return;

    const auth = (getAuth && getAuth()) || getAuthFromLS();
    const item = cfg.item || { id, name: cfg?.name, img: cfg?.img };

    // 未登入 → 顯示登入彈窗（記住回跳）
    if (!auth?.isAuthed) {
      const from = window.location.pathname + window.location.search + window.location.hash;
      sessionStorage.setItem("nd_login_back", from);
      if (onNeedLogin) onNeedLogin(from);
      else if (navigate) navigate("/log", { replace: true });

      // ★ 關鍵：阻止外層 <Link>/<a> 導航
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // 已登入 → 切換收藏
    const res = toggleFav(type, item, auth);
    if (res?.ok) {
      const active = res.active;
      el.setAttribute("data-active", active ? "true" : "false");
      el.setAttribute("aria-pressed", active ? "true" : "false");
      el.classList.toggle("is-active", !!active);

      // 同步 <path data-bm>
      const path = el.querySelector && el.querySelector("path[data-bm]");
      if (path) {
        if (active) {
          path.setAttribute("fill", "currentColor");
          path.setAttribute("stroke", "currentColor");
        } else {
          path.setAttribute("fill", "none");
          path.setAttribute("stroke", "currentColor");
        }
      }

      // 可選：收藏成功後導頁
      const goto = el.dataset.favGoto || el.dataset.goto;
      if (active && goto && navigate) navigate(goto);

      e.preventDefault();
      e.stopPropagation();
    }
  };

  // ★ 用 capture 先於 <Link> 的導航攔截（這是這次的唯一必要變更）
  document.addEventListener("click", clickHandler, true);

  const sync = () => hydrateFavIcons();
  window.addEventListener("storage", sync);
  window.addEventListener(FAV_EVENT, sync);

  // 首次同步
  hydrateFavIcons();

  const dispose = () => {
    document.removeEventListener("click", clickHandler, true);
    window.removeEventListener("storage", sync);
    window.removeEventListener(FAV_EVENT, sync);
  };
  window.__ndFavDelegatorCleanup = dispose;
  return dispose;
}


