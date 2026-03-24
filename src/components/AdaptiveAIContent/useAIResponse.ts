import { useCallback, useEffect, useState } from 'react';
import { fetchFromKapa } from './api';

export type AIMode = 'docs' | 'general' | 'fallback-only';

interface UseAIResponseResult {
  response: string | null;
  loading: boolean;
  error: boolean;
  refetch: () => Promise<void>;
}

const CACHE_PREFIX = 'adaptive_ai_';

function readCache(key: string): string | null {
  try {
    return sessionStorage.getItem(CACHE_PREFIX + key);
  } catch {
    return null;
  }
}

function writeCache(key: string, value: string): void {
  try {
    sessionStorage.setItem(CACHE_PREFIX + key, value);
  } catch {
    // Fail silently — caching is an optimisation, not a requirement
  }
}

export function useAIResponse(
  query: string,
  mode: AIMode,
  requestBullets = false,
): UseAIResponseResult {
  const cached =
    mode === 'docs' && typeof window !== 'undefined' ? readCache(query) : null;

  const [response, setResponse] = useState<string | null>(cached);
  const [loading, setLoading] = useState(() => mode === 'docs' && !cached);
  const [error, setError] = useState(false);

  const doFetch = useCallback(async () => {
    if (mode !== 'docs') return;
    setLoading(true);
    setError(false);
    try {
      const result = await fetchFromKapa(query, requestBullets);
      writeCache(query, result);
      setResponse(result);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [query, mode, requestBullets]);

  useEffect(() => {
    if (mode !== 'docs') {
      setResponse(null);
      setLoading(false);
      setError(false);
      return;
    }

    const newCached = typeof window !== 'undefined' ? readCache(query) : null;
    if (newCached) {
      setResponse(newCached);
      setLoading(false);
      setError(false);
      return;
    }

    setResponse(null);
    setError(false);
    setLoading(true);
    void doFetch();
  }, [query, mode, doFetch]);

  return { response, loading, error, refetch: doFetch };
}
