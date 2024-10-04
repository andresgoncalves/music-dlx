export function getApiUrl(endpoint: string | URL) {
  return new URL(endpoint, import.meta.env.VITE_API_URL);
}

export async function fetchApi<T>(endpoint: string | URL, init?: RequestInit) {
  const res = await fetch(getApiUrl(endpoint), init);
  if (!res.ok) {
    throw new Error(`ApiError: ${res.status}`);
  }
  const data: T = await res.json();
  return data;
}
