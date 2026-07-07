export const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data?.error || `Error ${response.status}`)
  }

  return data as T
}
