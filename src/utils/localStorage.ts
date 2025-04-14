export function persist<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function get<T>(key: string): T | null
{
  const value = localStorage.getItem(key)

  return value !== null ? JSON.parse(value) as T : value
}
