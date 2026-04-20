import { useCallback, useEffect, useState } from 'react';
import { buildKapaPrompt, fetchKapaAnswer } from './api';
import type { AIMode } from './types';

interface UseAIResponseResult {
  response: string | null;
  loading: boolean;
  error: boolean;
  refetch: () => Promise<void>;
}

const CACHE_PREFIX = 'adaptive_ai_v2_';

/** 30 days in milliseconds. */
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface CacheEntry {
  response: string;
  cachedAt: number;
}

interface CacheRead {
  value: string;
  stale: boolean;
}

function storageKey(query: string, requestBullets: boolean): string {
  return CACHE_PREFIX + buildKapaPrompt(query, requestBullets);
}

/**
 * Reads a cache entry from localStorage. Returns the value and whether it is
 * stale (older than CACHE_TTL_MS). Returns null only when no entry exists at all.
 * Stale entries are kept in storage so they can be shown immediately while a
 * background refresh runs (stale-while-revalidate).
 */
function readCache(key: string): CacheRead | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    const stale = Date.now() - entry.cachedAt > CACHE_TTL_MS;
    return { value: entry.response, stale };
  } catch {
    return null;
  }
}

function writeCache(key: string, value: string): void {
  try {
    const entry: CacheEntry = { response: value, cachedAt: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // Caching is optional — private mode or storage quota may prevent writes.
  }
}

export function useAIResponse(
  query: string,
  mode: AIMode,
  requestBullets = false,
): UseAIResponseResult {
  const key = storageKey(query, requestBullets);
  const cached =
    mode === 'docs' && typeof window !== 'undefined' ? readCache(key) : null;

  const [response, setResponse] = useState<string | null>(cached?.value ?? null);
  // Only show a loading spinner when there is truly nothing to display yet.
  const [loading, setLoading] = useState(() => mode === 'docs' && !cached);
  const [error, setError] = useState(false);

  /**
   * Foreground fetch — shows the loading spinner. Used when there is no cached
   * value at all, or when the user manually triggers a refetch.
   */
  const doFetch = useCallback(async () => {
    if (mode !== 'docs') return;
    const prompt = buildKapaPrompt(query, requestBullets);
    setLoading(true);
    setError(false);
    try {
      const result = await fetchKapaAnswer(prompt);
      writeCache(key, result);
      setResponse(result);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [query, mode, requestBullets, key]);

  /**
   * Background fetch — runs silently while the stale cached answer is displayed.
   * Updates the response and localStorage only when a new answer arrives.
   * Never touches the loading or error state.
   */
  const doBackgroundRefresh = useCallback(async () => {
    if (mode !== 'docs') return;
    const prompt = buildKapaPrompt(query, requestBullets);
    try {
      const result = await fetchKapaAnswer(prompt);
      writeCache(key, result);
      setResponse(result);
    } catch {
      // Silently fail — the stale answer stays on screen.
    }
  }, [query, mode, requestBullets, key]);

  useEffect(() => {
    if (mode !== 'docs') {
      setResponse(null);
      setLoading(false);
      setError(false);
      return;
    }

    const entry = typeof window !== 'undefined' ? readCache(key) : null;

    if (entry) {
      // Show whatever we have immediately — fresh or stale.
      setResponse(entry.value);
      setLoading(false);
      setError(false);

      if (entry.stale) {
        // Stale-while-revalidate: refresh silently in the background.
        void doBackgroundRefresh();
      }
      return;
    }

    // No cache at all — show the loading spinner and fetch.
    setResponse(null);
    setError(false);
    setLoading(true);
    void doFetch();
  }, [query, mode, key, doFetch, doBackgroundRefresh]);

  return { response, loading, error, refetch: doFetch };
}
