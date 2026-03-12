import type { OpenApiSpec } from '../types';
import { parseJsonSpec } from './json';

/**
 * Parses JSON spec text in a Web Worker when available, so the main thread stays
 * responsive for large specs. Falls back to main-thread parse (parseJsonSpec) if
 * workers are unsupported or parsing in the worker fails.
 */
export function parseJsonInWorker(text: string): Promise<OpenApiSpec> {
  if (typeof Worker === 'undefined') {
    return Promise.resolve(parseJsonSpec(text));
  }

  const workerCode = `self.onmessage=function(e){try{var s=JSON.parse(e.data);self.postMessage({spec:s})}catch(err){self.postMessage({error:err.message})}};`;
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    let resolved = false;
    const worker = new Worker(url);

    const cleanup = (): void => {
      if (!resolved) {
        resolved = true;
        worker.terminate();
        URL.revokeObjectURL(url);
      }
    };

    worker.onmessage = (event: MessageEvent<{ spec?: unknown; error?: string }>) => {
      cleanup();
      if (event.data.error) {
        resolve(parseJsonSpec(text));
      } else if (event.data.spec != null && typeof event.data.spec === 'object') {
        resolve(event.data.spec as OpenApiSpec);
      } else {
        resolve(parseJsonSpec(text));
      }
    };

    worker.onerror = () => {
      cleanup();
      resolve(parseJsonSpec(text));
    };

    try {
      worker.postMessage(text);
    } catch {
      cleanup();
      resolve(parseJsonSpec(text));
    }
  });
}
