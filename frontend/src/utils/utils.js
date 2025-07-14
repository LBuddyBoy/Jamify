export function secondsToMMSS(totalSeconds) {
  if (typeof totalSeconds !== 'number' || isNaN(totalSeconds) || totalSeconds < 0) return "00:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const mm = String(minutes).padStart(1, '0'); // No leading zero for minutes unless you want it
  const ss = String(seconds).padStart(2, '0');
  return `${mm}:${ss}`;
}

export function totalDuration(songs) {
  const totalSeconds = songs.reduce((sum, s) => sum + (s.duration || 0), 0);
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours
    ? `${hours} hr ${mins} min`
    : `${mins} min`;
}
