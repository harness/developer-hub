import { useCallback, useEffect, useState } from 'react';
import { buildKapaPrompt, fetchKapaAnswer } from './api';
import type { AIMode } from './types';

interface UseAIResponseResult {
  response: string | null;
  loading: boolean;
  error: boolean;
  refetch: () => Promise<void>;
}

const CACHE_PREFIX = 'adaptive_ai_';

function storageKey(query: string, requestBullets: boolean): string {
  return CACHE_PREFIX + buildKapaPrompt(query, requestBullets);
}

function readCache(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeCache(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Caching is optional (e.g. private mode quota).
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

  const [response, setResponse] = useState<string | null>(cached);
  const [loading, setLoading] = useState(() => mode === 'docs' && !cached);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    if (mode !== 'docs') {
      setResponse(null);
      setLoading(false);
      setError(false);
      return;
    }

    const newCached = typeof window !== 'undefined' ? readCache(key) : null;
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
  }, [query, mode, key, doFetch]);

  return { response, loading, error, refetch: doFetch };
}
