import React from 'react';
import type { EndpointEntry, OpenApiParameter, OpenApiSpec } from './types';
import { endpointId, endpointLabel, getMethodClass, resolveParameters, resolveRequestBody, resolveResponse, getResolvedSchema, getSchemaTypeDisplay } from './utils';
import MarkdownDescription from './MarkdownDescription';
import styles from './styles.module.css';

/** Status code to highlight class (synced with Try It panel selection). */
function getResponseHighlightClass(code: string): string {
  const n = parseInt(code, 10);
  if (n >= 200 && n < 300) return styles.responseBulletSuccess;
  if (n >= 300 && n < 400) return styles.responseBulletRedirect;
  if (n >= 400 && n < 500) return styles.responseBulletClientError;
  if (n >= 500) return styles.responseBulletServerError;
  return '';
}

interface ApiSpecContentProps {
  endpoint: EndpointEntry;
  baseUrl: string;
  /** Optional path prefix (e.g. /iacm) shown and used between base URL and path */
  pathPrefix?: string;
  /** Full spec for resolving $ref (parameters, requestBody, etc.) */
  spec?: OpenApiSpec | null;
  /** When set (from Try It pill selection), the matching response bullet is highlighted */
  selectedResponseCode?: string | null;
  /** When 'above' | 'responses', render only that part (for grid alignment with Try It panel). Default 'all'. */
  part?: 'all' | 'above' | 'responses';
}

/** Single row for the consolidated parameters (path, query, header, and request body fields). */
type ParamRow = { name: string; in: string; required?: boolean; description?: string; type?: string; depth?: number };

/** Table view for path, query, and header parameters (Name, In, Type, Required, Description). */
function ParametersTable({ rows }: { rows: ParamRow[] }): React.ReactElement {
  const showType = rows.some((r) => r.type != null && r.type !== '');
  return (
    <table className={styles.paramsTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>In</th>
          {showType && <th>Type</th>}
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={`${row.in}-${row.name}-${i}`}>
            <td><code>{row.name}</code></td>
            <td>{row.in}</td>
            {showType && <td>{row.type ? <code className={styles.specBody}>{row.type}</code> : '—'}</td>}
            <td>{row.required ? 'Yes' : 'No'}</td>
            <td><MarkdownDescription text={row.description ?? ''} className={styles.specBody} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Table view for request body parameters (Name, Type, Required, Description). */
function RequestBodyParamsTable({ rows }: { rows: ParamRow[] }): React.ReactElement {
  return (
    <table className={styles.paramsTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={`body-${row.name}-${i}`}>
            <td style={row.depth ? { paddingLeft: `${0.75 + (row.depth ?? 0) * 1.25}rem` } : undefined}>
              <code>{row.name}</code>
            </td>
            <td>{row.type ? <code className={styles.specBody}>{row.type}</code> : '—'}</td>
            <td>{row.required ? 'Yes' : 'No'}</td>
            <td>
              <MarkdownDescription text={row.description ?? ''} className={styles.specBody} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function flattenSchemaProperties(
  spec: OpenApiSpec,
  schema: Record<string, unknown> | undefined,
  requiredList: string[],
  depth: number
): Array<{ name: string; typeDisplay: string; required: boolean; description: string; depth: number }> {
  const resolved = spec ? getResolvedSchema(spec, schema) : schema;
  if (!resolved) return [];
  const properties = resolved.properties as Record<string, Record<string, unknown>> | undefined;
  const required = (resolved.required as string[] | undefined) ?? requiredList;
  if (!properties) return [];
  const rows: Array<{ name: string; typeDisplay: string; required: boolean; description: string; depth: number }> = [];
  for (const [name, propSchema] of Object.entries(properties)) {
    const resolvedProp = spec ? getResolvedSchema(spec, propSchema) : propSchema;
    const typeDisplay = getSchemaTypeDisplay(resolvedProp ?? propSchema);
    const isRequired = Array.isArray(required) && required.includes(name);
    const description = (resolvedProp?.description ?? propSchema?.description ?? '') as string;
    rows.push({ name, typeDisplay, required: isRequired, description, depth });
    const nestedProps = resolvedProp?.properties;
    if (nestedProps && typeof nestedProps === 'object' && Object.keys(nestedProps).length > 0) {
      const nestedRequired = (resolvedProp?.required as string[] | undefined) ?? [];
      rows.push(...flattenSchemaProperties(spec, resolvedProp as Record<string, unknown>, nestedRequired, depth + 1));
    }
  }
  return rows;
}

export default function ApiSpecContent({
  endpoint,
  baseUrl,
  pathPrefix = '',
  spec,
  selectedResponseCode,
  part = 'all',
}: ApiSpecContentProps): React.ReactElement {
  const { path, method, operation, pathItem } = endpoint;
  const op = operation ?? (pathItem as Record<string, unknown>)?.[method] as typeof operation;
  const rawParams = [
    ...(pathItem?.parameters ?? []),
    ...(op?.parameters ?? []),
  ] as OpenApiParameter[];
  const mergedParams = spec ? resolveParameters(spec, rawParams) : rawParams;
  const requestBodyResolved = spec && op?.requestBody
    ? resolveRequestBody(spec, op.requestBody as { $ref?: string; content?: Record<string, { schema?: unknown }>; description?: string })
    : op?.requestBody;
  const bodySchema = requestBodyResolved?.content?.['application/json']?.schema as Record<string, unknown> | undefined;
  const bodyRows: ParamRow[] = spec && bodySchema
    ? flattenSchemaProperties(spec, getResolvedSchema(spec, bodySchema) ?? bodySchema, (getResolvedSchema(spec, bodySchema)?.required as string[]) ?? [], 0).map((r) => ({
        name: r.name,
        in: 'body' as const,
        required: r.required,
        description: r.description,
        type: r.typeDisplay,
        depth: r.depth,
      }))
    : [];
  const paramRows: ParamRow[] = mergedParams.map((p) => ({
    name: p.name,
    in: p.in,
    required: p.required,
    description: p.description,
    type: (p as OpenApiParameter & { schema?: { type?: string } }).schema?.type,
    depth: 0,
  }));
  const allParamRows: ParamRow[] = [...paramRows, ...bodyRows];
  const hasParams = allParamRows.length > 0;
  const hasResponses = op?.responses && Object.keys(op.responses).length > 0;
  const description = op?.description ?? op?.summary ?? '';
  const fullPath = pathPrefix ? `${pathPrefix.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}` : path;

  if (part === 'responses') {
    if (!hasResponses) return <div className={styles.main} />;
    return (
      <div className={styles.main}>
        <section className={styles.specSection}>
          <h2 className={styles.specSectionTitle}>Responses</h2>
          <ul className={styles.specBody}>
            {Object.entries(op!.responses!).map(([code, res]) => {
              const resolved = spec ? resolveResponse(spec, res as { $ref?: string; description?: string }) : res;
              const desc = resolved?.description ?? '';
              const isSelected = selectedResponseCode === code;
              const highlightClass = isSelected ? getResponseHighlightClass(code) : '';
              return (
                <li
                  key={code}
                  className={highlightClass ? `${styles.responseBulletItem} ${highlightClass}` : undefined}
                >
                  <strong>{code}</strong>:{' '}
                  <MarkdownDescription text={desc} className={styles.responseDescription} />
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    );
  }

  if (part === 'above') {
    return (
      <div className={styles.main}>
        <header className={styles.mainHeader}>
          <h1 className={styles.mainTitle}>{endpointLabel(endpoint)}</h1>
          <p className={styles.mainPath}>
            <span className={`${styles.endpointMethod} ${getMethodClass(styles, method)}`}>{method.toUpperCase()}</span> {baseUrl}{fullPath}
          </p>
        </header>
        {description && (
          <section className={styles.specSection}>
            <h2 className={styles.specSectionTitle}>Description</h2>
            <MarkdownDescription text={description} />
          </section>
        )}
        {hasParams && (
          <section className={styles.specSection}>
            <h2 className={styles.specSectionTitle}>Parameters</h2>
            {paramRows.length > 0 && <ParametersTable rows={paramRows} />}
            {bodyRows.length > 0 && (
              <div className={styles.paramGroup}>
                <h3 className={styles.paramGroupTitle}>Request body</h3>
                {requestBodyResolved?.description && (
                  <div className={styles.specBody}>
                    <MarkdownDescription text={requestBodyResolved.description} />
                  </div>
                )}
                <RequestBodyParamsTable rows={bodyRows} />
              </div>
            )}
          </section>
        )}
        {(requestBodyResolved ?? op?.requestBody) && bodyRows.length === 0 && (
          <section className={styles.specSection}>
            <h2 className={styles.specSectionTitle}>Request body</h2>
            <div className={styles.specBody}>
              {requestBodyResolved?.description && (
                <MarkdownDescription text={requestBodyResolved.description} />
              )}
              {!requestBodyResolved?.content?.['application/json'] && !requestBodyResolved?.description && (
                <p>See parameters table above for request body fields.</p>
              )}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <header className={styles.mainHeader}>
        <h1 className={styles.mainTitle}>{endpointLabel(endpoint)}</h1>
        <p className={styles.mainPath}>
          <span className={`${styles.endpointMethod} ${getMethodClass(styles, method)}`}>{method.toUpperCase()}</span> {baseUrl}{fullPath}
        </p>
      </header>

      {description && (
        <section className={styles.specSection}>
          <h2 className={styles.specSectionTitle}>Description</h2>
          <MarkdownDescription text={description} />
        </section>
      )}

      {hasParams && (
        <section className={styles.specSection}>
          <h2 className={styles.specSectionTitle}>Parameters</h2>
          {paramRows.length > 0 && <ParametersTable rows={paramRows} />}
          {bodyRows.length > 0 && (
            <div className={styles.paramGroup}>
              <h3 className={styles.paramGroupTitle}>Request body</h3>
              {requestBodyResolved?.description && (
                <div className={styles.specBody}>
                  <MarkdownDescription text={requestBodyResolved.description} />
                </div>
              )}
              <RequestBodyParamsTable rows={bodyRows} />
            </div>
          )}
        </section>
      )}

      {(requestBodyResolved ?? op?.requestBody) && bodyRows.length === 0 && (
        <section className={styles.specSection}>
          <h2 className={styles.specSectionTitle}>Request body</h2>
          <div className={styles.specBody}>
            {requestBodyResolved?.description && (
              <MarkdownDescription text={requestBodyResolved.description} />
            )}
            {!requestBodyResolved?.content?.['application/json'] && !requestBodyResolved?.description && (
              <p>See parameters table above for request body fields.</p>
            )}
          </div>
        </section>
      )}

      {hasResponses && (
        <section className={styles.specSection}>
          <h2 className={styles.specSectionTitle}>Responses</h2>
          <ul className={styles.specBody}>
            {Object.entries(op!.responses!).map(([code, res]) => {
              const resolved = spec ? resolveResponse(spec, res as { $ref?: string; description?: string }) : res;
              const desc = resolved?.description ?? '';
              const isSelected = selectedResponseCode === code;
              const highlightClass = isSelected ? getResponseHighlightClass(code) : '';
              return (
                <li
                  key={code}
                  className={highlightClass ? `${styles.responseBulletItem} ${highlightClass}` : undefined}
                >
                  <strong>{code}</strong>:{' '}
                  <MarkdownDescription text={desc} className={styles.responseDescription} />
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
