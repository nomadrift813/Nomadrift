// src/js/myDiaryStore.js
// 專門存「我發布的日記」到 localStorage

import { getAuthFromLS } from './favStore';

export const MY_DIARY_EVENT = 'nd:my-diary-changed';
const KEY_PREFIX = 'nd_my_diary_';

const userId = (auth = getAuthFromLS()) =>
  auth?.user?.id || auth?.user?.email || auth?.user?.uid || 'me';

const key = (auth = getAuthFromLS()) => `${KEY_PREFIX}${userId(auth)}`;

const setList = (list, auth = getAuthFromLS()) => {
  localStorage.setItem(key(auth), JSON.stringify(list || []));
  try {
    window.dispatchEvent(new CustomEvent(MY_DIARY_EVENT, { detail: { list } }));
  } catch {}
  return list;
};

export function getMyDiaryList(auth = getAuthFromLS()) {
  try {
    return JSON.parse(localStorage.getItem(key(auth))) || [];
  } catch {
    return [];
  }
}

/** 新增/覆蓋一篇「我的日記」，以 id 去重，最新放最前面 */
export function addMyDiary(item, auth = getAuthFromLS()) {
  if (!item || typeof item !== 'object') return { ok: false, reason: 'invalid_item' };
  const list = getMyDiaryList(auth);
  const idx = list.findIndex((x) => String(x.id) === String(item.id));
  if (idx >= 0) list.splice(idx, 1);
  list.unshift(item);
  setList(list, auth);
  return { ok: true, list };
}

/** 刪除一篇 */
export function removeMyDiary(id, auth = getAuthFromLS()) {
  const list = getMyDiaryList(auth).filter((x) => String(x.id) !== String(id));
  setList(list, auth);
  return { ok: true, list };
}

/** 清空全部 */
export function clearMyDiary(auth = getAuthFromLS()) {
  try {
    localStorage.removeItem(key(auth));
  } finally {
    try {
      window.dispatchEvent(new CustomEvent(MY_DIARY_EVENT, { detail: { list: [] } }));
    } catch {}
  }
  return { ok: true };
}
