// src/js/joinStore.js
// 專門存「我加入的活動」到 localStorage（依使用者分桶）
// 事件：nd:joined-changed

import { getAuthFromLS } from './favStore'; // 直接沿用你現有的

export const JOIN_EVENT = 'nd:joined-changed';
const KEY_PREFIX = 'nd_join_';

// --- key helper ---
function userId(auth = getAuthFromLS()) {
  return auth?.user?.id || auth?.user?.email || auth?.user?.uid || 'me';
}
function key(auth = getAuthFromLS()) {
  return `${KEY_PREFIX}${userId(auth)}`;
}

// --- core set/get ---
function setJoinedList(list, auth = getAuthFromLS()) {
  localStorage.setItem(key(auth), JSON.stringify(list || []));
  try {
    window.dispatchEvent(new CustomEvent(JOIN_EVENT, { detail: { list } }));
  } catch {}
  return list;
}
export function getJoinedList(auth = getAuthFromLS()) {
  try { return JSON.parse(localStorage.getItem(key(auth))) || []; }
  catch { return []; }
}

// --- CRUD ---
export function isJoined(id, auth = getAuthFromLS()) {
  return getJoinedList(auth).some(x => String(x.id) === String(id));
}
export function addJoined(item, auth = getAuthFromLS()) {
  if (!item || !item.id) return getJoinedList(auth);
  const list = getJoinedList(auth);
  const i = list.findIndex(x => String(x.id) === String(item.id));
  if (i >= 0) list.splice(i, 1); // 去重
  list.unshift(item);            // 最新在前
  return setJoinedList(list, auth);
}
export function removeJoined(id, auth = getAuthFromLS()) {
  const next = getJoinedList(auth).filter(x => String(x.id) !== String(id));
  return setJoinedList(next, auth);
}
export function toggleJoined(itemOrId, auth = getAuthFromLS()) {
  const id = typeof itemOrId === 'object' ? itemOrId.id : itemOrId;
  if (isJoined(id, auth)) {
    const list = removeJoined(id, auth);
    return { joined: false, list };
  } else {
    const item = typeof itemOrId === 'object' ? itemOrId : { id };
    const list = addJoined(item, auth);
    return { joined: true, list };
  }
}
export function clearJoined(auth = getAuthFromLS()) {
  try { localStorage.removeItem(key(auth)); }
  finally {
    try { window.dispatchEvent(new CustomEvent(JOIN_EVENT, { detail: { list: [] } })); } catch {}
  }
}


