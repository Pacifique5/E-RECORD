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

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

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
