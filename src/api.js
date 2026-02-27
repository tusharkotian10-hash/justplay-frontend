// src/api.js
// All API calls go through here — always sends the user's auth token

import { getIdToken } from './firebase.js';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Helper: authenticated fetch
async function authFetch(path, options = {}) {
  const token = await getIdToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// ─── Recommendations ─────────────────────────────────────────────────

export async function getRecommendation({ mood, time, who, platforms, languages }) {
  return authFetch('/api/recommend', {
    method: 'POST',
    body: JSON.stringify({ mood, time, who, platforms, languages }),
  });
}

// ─── Poster ──────────────────────────────────────────────────────────

export async function getPoster(title) {
  return authFetch(`/api/poster?title=${encodeURIComponent(title)}`);
}

// ─── History ─────────────────────────────────────────────────────────

export async function getHistory() {
  return authFetch('/api/history');
}

export async function rateMovie(historyId, rating) {
  return authFetch(`/api/history/${historyId}/rate`, {
    method: 'PATCH',
    body: JSON.stringify({ rating }),
  });
}

export async function clearHistory() {
  return authFetch('/api/history', { method: 'DELETE' });
}

export async function getProfile() {
  return authFetch('/api/history/profile');
}
