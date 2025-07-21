export function secondsToMMSS(total) {
  const totalSeconds = Number(total);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const mm = String(minutes).padStart(1, "0"); // No leading zero for minutes unless you want it
  const ss = String(seconds).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function totalDuration(songs) {
  const totalSeconds = songs.reduce((sum, s) => sum + (s.duration || 0), 0);
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours ? `${hours} hr ${mins} min` : `${mins} min`;
}

export function getMenuPosition(clickX, clickY, menuWidth, menuHeight) {
  const padding = 16;
  let x = clickX;
  let y = clickY;

  if (x + menuWidth + padding > window.innerWidth) {
    x = window.innerWidth - menuWidth - padding;
  }
  if (y + menuHeight + padding > window.innerHeight) {
    y = window.innerHeight - menuHeight - padding;
  }
  x = Math.max(x, padding);
  y = Math.max(y, padding);

  return { x, y };
}

export function match(name, search) {
  if (!search) return true;

  return name.toLowerCase().startsWith(search.toLowerCase());
}
