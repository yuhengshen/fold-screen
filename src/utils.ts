export const isMainScreen = window.name === "main-screen";


/**
 * 获取主屏幕的 router（一定存在）
 */
export function getMainRouter() {
  const top = window.top!;
  const iframes = top.frames as unknown as Record<string, Window>;
  return iframes['main-screen']?.router;
}

/**
 * 获取副屏幕的 router（可能不存在）
 */
export function getSecondRouter() {
  const top = window.top!;
  const iframes = top.frames as unknown as Record<string, Window>;
  return iframes['second-screen']?.router;
}