// window.Kapa is loaded globally via the script tag in docusaurus.config.ts
declare global {
  interface Window {
    Kapa?: (command: string, options?: Record<string, unknown>) => void;
  }
}

const KAPA_TIMEOUT_MS = 8000;

export function fetchFromKapa(query: string, formatBullets = false): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || typeof window.Kapa !== 'function') {
      reject(new Error('Kapa widget not available'));
      return;
    }

    const fullQuery = formatBullets
      ? `${query}\n\nFormat your response as a concise bulleted list of steps or checks.`
      : query;

    const timeout = setTimeout(
      () => reject(new Error('Kapa timeout')),
      KAPA_TIMEOUT_MS,
    );

    window.Kapa('answer', {
      query: fullQuery,
      onFinish: (answer: string) => { clearTimeout(timeout); resolve(answer); },
      onError: (error: unknown) => { clearTimeout(timeout); reject(error); },
    });
  });
}

export async function fetchFromKapaProxy(query: string, formatBullets = false): Promise<string> {
  const fullQuery = formatBullets
    ? `${query}\n\nFormat your response as a concise bulleted list of steps or checks.`
    : query;

  const res = await fetch('/api/kapa_proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: fullQuery }),
  });
  if (!res.ok) throw new Error(`Kapa proxy error: ${res.status}`);
  const data = await res.json();
  return data.answer ?? '';
}
