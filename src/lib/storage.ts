export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function pushRecent(key: string, value: string, limit = 20) {
  const current = readJson<string[]>(key, []);
  const next = [value, ...current.filter(x => x !== value)].slice(0, limit);
  writeJson(key, next);
  return next;
}
