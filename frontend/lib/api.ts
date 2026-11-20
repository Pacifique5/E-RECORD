export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export type ApiOptions = RequestInit & { skipJson?: boolean };

async function parseResponse(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export async function apiFetch(path: string, options: ApiOptions = {}) {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  // Only set Content-Type for non-FormData requests
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const method = (options.method || "GET").toUpperCase()
  let requestPath = path
  if (method === "GET" && typeof window !== "undefined" && !path.includes("year=")) {
    const raw = localStorage.getItem("e-record-period")
    if (raw) {
      try {
        const period = JSON.parse(raw)
        if (period.year && period.term) {
          const join = path.includes("?") ? "&" : "?"
          requestPath = `${path}${join}year=${encodeURIComponent(period.year)}&term=${encodeURIComponent(period.term)}`
        }
      } catch {
        requestPath = path
      }
    }
  }

  const res = await fetch(`${API_BASE}${requestPath}`, { ...options, headers });

  if (!res.ok) {
    const body = await parseResponse(res);
    const message = body && body.message ? body.message : res.statusText || String(body);
    const err: any = new Error(message);
    err.status = res.status;
    err.body = body;
    throw err;
  }

  if (options.skipJson) return null;
  return parseResponse(res);
}
