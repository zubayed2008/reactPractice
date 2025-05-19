export function formatTime(utcSeconds) {
  const localTimestamp = utcSeconds * 1000;
  const date = new Date(localTimestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}