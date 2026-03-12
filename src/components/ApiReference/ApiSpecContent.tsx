import React from 'react';
import type { EndpointEntry, OpenApiParameter } from './types';
import { endpointId, getMethodClass } from './utils';
import styles from './styles.module.css';

interface ApiSpecContentProps {
  endpoint: EndpointEntry;
  baseUrl: string;
  /** Optional path prefix (e.g. /iacm) shown and used between base URL and path */
  pathPrefix?: string;
}

function ParamsTable({ parameters }: { parameters: OpenApiParameter[] }): React.ReactElement {
  return (
    <table className={styles.paramsTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>In</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {parameters.map((p) => (
          <tr key={p.name}>
            <td>
              <code>{p.name}</code>
            </td>
            <td>{p.in}</td>
            <td>{p.required ? 'Yes' : 'No'}</td>
            <td>{p.description ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function ApiSpecContent({ endpoint, baseUrl, pathPrefix = '' }: ApiSpecContentProps): React.ReactElement {
  const { path, method, operation, pathItem } = endpoint;
  const op = operation ?? (pathItem as Record<string, unknown>)?.[method] as typeof operation;
  const mergedParams = [
    ...(pathItem?.parameters ?? []),
    ...(op?.parameters ?? []),
  ] as OpenApiParameter[];
  const hasParams = mergedParams.length > 0;
  const description = op?.description ?? op?.summary ?? '';
  const fullPath = pathPrefix ? `${pathPrefix.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}` : path;

  return (
    <div className={styles.main}>
      <header className={styles.mainHeader}>
        <h1 className={styles.mainTitle}>{op?.summary ?? endpointId(endpoint)}</h1>
        <p className={styles.mainPath}>
          <span className={`${styles.endpointMethod} ${getMethodClass(styles, method)}`}>{method.toUpperCase()}</span> {baseUrl}{fullPath}
        </p>
      </header>

      {description && (
        <section className={styles.specSection}>
          <h2 className={styles.specSectionTitle}>Description</h2>
          <div
            className={styles.specBody}
            dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }}
          />
        </section>
      )}

      {hasParams && (
        <section className={styles.specSection}>
          <h2 className={styles.specSectionTitle}>Parameters</h2>
          <ParamsTable parameters={mergedParams} />
        </section>
      )}

      {op?.requestBody && (
        <section className={styles.specSection}>
          <h2 className={styles.specSectionTitle}>Request body</h2>
          <div className={styles.specBody}>
            <p>See Try it panel for request body schema and example.</p>
          </div>
        </section>
      )}

      {op?.responses && Object.keys(op.responses).length > 0 && (
        <section className={styles.specSection}>
          <h2 className={styles.specSectionTitle}>Responses</h2>
          <ul className={styles.specBody}>
            {Object.entries(op.responses).map(([code, res]) => (
              <li key={code}>
                <strong>{code}</strong>: {res.description ?? '—'}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
