// API Configuration for deployment
// In development, Vite proxy handles /api -> localhost:8000
// In production, we need the full backend URL

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export function apiUrl(path) {
  // path should start with /api/...
  return `${API_BASE}${path}`;
}

export default API_BASE;
