import React, { useState, useMemo, useEffect } from 'react';
import type { EndpointEntry, OpenApiParameter, OpenApiSpec } from './types';
import { endpointLabel, endpointSlug, resolveParameters, getSampleResponseFromOperation, getRequestBodyParamRows } from './utils';
import styles from './styles.module.css';

interface TryItPanelProps {
  endpoint: EndpointEntry | null;
  /** Base URL for requests (e.g. from OpenAPI spec servers[0].url or override) */
  specBaseUrl: string;
  /** Optional path prefix (e.g. /iacm) inserted between base URL and spec path */
  pathPrefix?: string;
  /** Full spec for resolving $ref (e.g. parameters) */
  spec?: OpenApiSpec | null;
}

export default function TryItPanel({ endpoint, specBaseUrl, pathPrefix = '', spec }: TryItPanelProps): React.ReactElement {
  const [apiKey, setApiKey] = useState('');
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [requestBody, setRequestBody] = useState('{}');
  const [optionalBodyParamValues, setOptionalBodyParamValues] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<{ status?: number; body?: string; error?: string } | null>(null);
  const [requestBodyOpen, setRequestBodyOpen] = useState(false);
  const [optionalParamsOpen, setOptionalParamsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCurl = async () => {
    try {
      await navigator.clipboard.writeText(buildCurl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!endpoint) {
    return (
      <aside className={styles.tryItPanel}>
        <div className={styles.tryItHeader}>Build request</div>
        <div className={styles.emptyState}>
          Select an endpoint from the sidebar to see parameters and try the API.
        </div>
      </aside>
    );
  }

  const headerTitle = `Build '${endpointLabel(endpoint)}' request`;
  const slug = endpointSlug(endpoint);

  const { path, method, operation, pathItem } = endpoint;
  const rawParams = [
    ...(pathItem?.parameters ?? []),
    ...(operation?.parameters ?? []),
  ] as OpenApiParameter[];
  const mergedParams = spec ? resolveParameters(spec, rawParams) : rawParams;
  const pathParams = mergedParams.filter((p) => p.in === 'path');
  const queryParams = mergedParams.filter((p) => p.in === 'query');
  const headerParams = mergedParams.filter((p) => p.in === 'header');
  const requiredParams = [...pathParams, ...queryParams, ...headerParams].filter((p) => p.required);
  const optionalParams = [...pathParams, ...queryParams, ...headerParams].filter((p) => !p.required);
  const optionalBodyParams = useMemo(
    () => (spec ? getRequestBodyParamRows(spec, operation).filter((r) => !r.required) : []),
    [spec, operation]
  );
  const hasOptionalParams = optionalParams.length > 0 || optionalBodyParams.length > 0;

  useEffect(() => {
    setOptionalBodyParamValues({});
  }, [path, method]);

  const handleParamChange = (name: string, value: string) => {
    setParamValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionalBodyParamChange = (name: string, value: string) => {
    setOptionalBodyParamValues((prev) => ({ ...prev, [name]: value }));
  };

  const buildRequestBodyForRequest = (): string => {
    let obj: Record<string, unknown> = {};
    try {
      const trimmed = requestBody.trim();
      if (trimmed && trimmed !== '{}') obj = JSON.parse(trimmed) as Record<string, unknown>;
    } catch {
      obj = {};
    }
    Object.entries(optionalBodyParamValues).forEach(([key, value]) => {
      if (value !== undefined && value !== '') obj[key] = value;
    });
    return JSON.stringify(obj);
  };

  const buildUrl = (): string => {
    const base = specBaseUrl.replace(/\/$/, '');
    const prefix = pathPrefix.replace(/\/$/, '') || '';
    const pathStr = path.startsWith('/') ? path : `/${path}`;
    let url = base + (prefix ? `${prefix}${pathStr}` : pathStr);
    pathParams.forEach((p) => {
      const v = paramValues[p.name];
      if (v !== undefined && v !== '') {
        url = url.replace(`{${p.name}}`, v);
      }
    });
    if (queryParams.length > 0) {
      const search = new URLSearchParams();
      queryParams.forEach((p) => {
        const v = paramValues[p.name];
        if (v !== undefined && v !== '') search.set(p.name, v);
      });
      const qs = search.toString();
      if (qs) url += (url.includes('?') ? '&' : '?') + qs;
    }
    return url;
  };

  const buildCurl = (): string => {
    const url = buildUrl();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(apiKey && { 'x-api-key': apiKey }),
    };
    headerParams.forEach((p) => {
      const v = paramValues[p.name];
      if (v !== undefined && v !== '') headers[p.name] = v;
    });
    const headerLines = Object.entries(headers)
      .map(([k, v]) => `  -H '${k}: ${v.replace(/'/g, "'\\''")}'`)
      .join(' \\\n');
    let curl = `curl -X ${method.toUpperCase()} '${url}' \\\n${headerLines}`;
    if (['post', 'put', 'patch'].includes(method)) {
      const bodyStr = buildRequestBodyForRequest();
      if (bodyStr && bodyStr !== '{}') {
        const escaped = bodyStr.replace(/'/g, "'\\''");
        curl += ` \\\n  -d '${escaped}'`;
      }
    }
    return curl;
  };

  // Sample response is from the operation's response body (responses schema/example), not request body
  const sampleResponse = useMemo(
    (): string => (spec ? getSampleResponseFromOperation(spec, operation) : '{}'),
    [spec, operation]
  );

  return (
    <aside className={styles.tryItPanel}>
      <div className={styles.tryItHeader}>{headerTitle}</div>
      <div className={styles.tryItForm}>
        <div className={styles.tryItField}>
          <label htmlFor={`api-key-${slug}`}>API Key</label>
          <input
            id={`api-key-${slug}`}
            type="password"
            placeholder="Your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        {requiredParams.map((p) => (
          <div key={p.name} className={styles.tryItField}>
            <label htmlFor={`param-${p.name}-${slug}`}>{p.name} *</label>
            <input
              id={`param-${p.name}-${slug}`}
              type="text"
              placeholder={p.description ?? p.name}
              value={paramValues[p.name] ?? ''}
              onChange={(e) => handleParamChange(p.name, e.target.value)}
            />
          </div>
        ))}

        {hasOptionalParams && (
          <div className={styles.tryItField}>
            <button
              type="button"
              className={styles.tryItCollapseTrigger}
              onClick={() => setOptionalParamsOpen((o) => !o)}
              aria-expanded={optionalParamsOpen}
            >
              Optional parameters
              <span className={styles.tryItCollapseCaret} aria-hidden>
                {optionalParamsOpen ? '▼' : '▶'}
              </span>
            </button>
            {optionalParamsOpen && (
              <div className={styles.tryItOptionalFields}>
                {optionalParams.map((p) => (
                  <div key={`param-${p.name}`} className={styles.tryItField}>
                    <label htmlFor={`param-${p.name}-${slug}`}>{p.name}</label>
                    <input
                      id={`param-${p.name}-${slug}`}
                      type="text"
                      placeholder={p.description ?? p.name}
                      value={paramValues[p.name] ?? ''}
                      onChange={(e) => handleParamChange(p.name, e.target.value)}
                    />
                  </div>
                ))}
                {optionalBodyParams.length > 0 && (
                  <>
                    {optionalParams.length > 0 && (
                      <div className={styles.tryItOptionalSectionLabel}>Request body</div>
                    )}
                    {optionalBodyParams.map((p) => (
                      <div key={`body-${p.name}`} className={styles.tryItField}>
                        <label htmlFor={`body-param-${p.name}-${slug}`}>{p.name}</label>
                        <input
                          id={`body-param-${p.name}-${slug}`}
                          type="text"
                          placeholder={p.description ?? p.name}
                          value={optionalBodyParamValues[p.name] ?? ''}
                          onChange={(e) => handleOptionalBodyParamChange(p.name, e.target.value)}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {['post', 'put', 'patch'].includes(method) && (
          <div className={styles.tryItField}>
            <button
              type="button"
              className={styles.tryItCollapseTrigger}
              onClick={() => setRequestBodyOpen((o) => !o)}
              aria-expanded={requestBodyOpen}
            >
              Request body (JSON)
              <span className={styles.tryItCollapseCaret} aria-hidden>
                {requestBodyOpen ? '▼' : '▶'}
              </span>
            </button>
            {requestBodyOpen && (
              <textarea
                id={`request-body-${slug}`}
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className={styles.tryItRequestBody}
              />
            )}
          </div>
        )}

        <div className={styles.tryItCodeSection}>
          <div className={styles.tryItCodeTabs} role="tablist">
            <span className={styles.tryItCodeTabLabel}>cURL</span>
            <button
              type="button"
              className={styles.tryItCopyBtn}
              onClick={handleCopyCurl}
              title="Copy cURL command"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className={styles.tryItCodeContent} role="tabpanel">
            <pre className={styles.tryItCodePre}>
              <code>{buildCurl()}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className={styles.tryItResponse}>
        <div className={styles.tryItResponseTitle}>
          Response{response ? (response.error ? ' (Error)' : ` ${response.status ?? ''}`) : ''}
        </div>
        <pre
          className={`${styles.tryItResponsePre} ${!response ? styles.tryItResponsePreSample : ''} ${response?.error ? styles.error : ''}`}
        >
          {response
            ? (response.error ?? response.body ?? '—')
            : `// Sample response\n${sampleResponse}`}
        </pre>
      </div>
    </aside>
  );
}
