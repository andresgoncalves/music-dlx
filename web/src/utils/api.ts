export function getApiUrl(endpoint: string) {
  return import.meta.env.VITE_API_URL
    ? new URL(endpoint, import.meta.env.VITE_API_URL).href
    : endpoint;
}

export async function fetchApi<T>(endpoint: string, init?: RequestInit) {
  const res = await fetch(getApiUrl(endpoint), init);
  if (!res.ok) {
    throw new Error(`ApiError: ${res.status}`);
  }
  const data: T = await res.json();
  return data;
}
