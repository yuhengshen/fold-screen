export const isMainScreen = window.name === "main-screen";


/**
 * 获取主屏幕的 router（一定存在）
 */
export function getMainRouter() {
  const mainWindow = getMainWindow();
  return mainWindow.router;
}

export function getMainWindow() {
  const top = window.top!;
  const iframes = top.frames as any;
  return iframes['main-screen'] as Window;
}

/**
 * 获取副屏幕的 router（可能不存在）
 */
export function getSecondRouter() {
  const secondWindow = getSecondWindow();
  return secondWindow?.router;
}

export function getSecondWindow() {
  const top = window.top!;
  const iframes = top.frames as any;
  return iframes['second-screen'] as Window | undefined;
}
