import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from 'react-router-dom';
import yaml from 'js-yaml';
import {
  getApiReferenceModule,
  getApiReferenceModuleIds,
  getDocsBasePathForModule,
} from '@site/src/components/ApiReference/modulesConfig';
import ApiReferenceLayout from '@site/src/components/ApiReference/ApiReferenceLayout';
import type { OpenApiSpec } from '@site/src/components/ApiReference/types';
import styles from '@site/src/components/ApiReference/styles.module.css';

const DOCS_BASE = '/docs';

function getDocsBasePath(moduleId: string): string {
  if (!moduleId) return DOCS_BASE;
  return getDocsBasePathForModule(moduleId);
}

export default function ApiReferencePage(): React.ReactElement {
  const { search } = useLocation();
  const moduleId = new URLSearchParams(search).get('module') ?? '';
  const [spec, setSpec] = useState<OpenApiSpec | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const moduleConfig = moduleId ? getApiReferenceModule(moduleId) : null;
  const moduleIds = getApiReferenceModuleIds();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.scrollingElement?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const main = document.querySelector('main');
    if (main && 'scrollTo' in main) main.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!moduleConfig) {
      setLoading(false);
      setSpec(null);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);

    const savedSpecUrl = `/api-specs/${moduleId}.json`;

    function parseResponse(res: Response, text: string): OpenApiSpec {
      const contentType = res.headers.get('content-type') ?? '';
      if (contentType.includes('application/json')) {
        return JSON.parse(text) as OpenApiSpec;
      }
      try {
        return JSON.parse(text) as OpenApiSpec;
      } catch {
        return yaml.load(text) as OpenApiSpec;
      }
    }

    fetch(savedSpecUrl)
      .then((res) => {
        if (res.ok) return res.text().then((text) => parseResponse(res, text));
        if (res.status === 404) return fetch(moduleConfig.specUrl);
        throw new Error(`Failed to load spec: ${res.status}`);
      })
      .then((dataOrRes) => {
        if (dataOrRes instanceof Response) {
          if (!dataOrRes.ok) throw new Error(`Failed to load spec: ${dataOrRes.status}`);
          return dataOrRes.text().then((text) => parseResponse(dataOrRes, text));
        }
        return dataOrRes as OpenApiSpec;
      })
      .then((data) => {
        setSpec(data);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load API spec');
        setSpec(null);
      })
      .finally(() => setLoading(false));
  }, [moduleId, moduleConfig?.specUrl]);

  const title = moduleConfig
    ? `${moduleConfig.name} API Reference`
    : 'API Reference';
  const description = moduleConfig
    ? `API reference for ${moduleConfig.name}, powered by the module's OpenAPI spec.`
    : 'Select a module to view its API reference.';

  return (
    <Layout title={title} description={description}>
      <main className={spec ? styles.apiRefMain : 'container margin-vert--lg'}>
        {!moduleId ? (
          <div className={styles.emptyState}>
            <h1>API Reference</h1>
            <p>Choose a module to view its API reference.</p>
            <ul>
              {moduleIds.map((id) => {
                const config = getApiReferenceModule(id);
                if (!config) return null;
                return (
                  <li key={id}>
                    <a href={`/api-reference?module=${encodeURIComponent(id)}`}>
                      {config.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : !moduleConfig ? (
          <div className={styles.errorState}>
            <p>Unknown module: {moduleId}. Go to{' '}
              <a href="/api-reference">API Reference</a> to pick a module.
            </p>
          </div>
        ) : loading ? (
          <div className={styles.loadingState}>Loading API spec…</div>
        ) : error ? (
          <div className={styles.errorState}>
            <p>{error}</p>
            <p>Check that the spec URL is correct and accessible: {moduleConfig.specUrl}</p>
          </div>
        ) : spec ? (
          <div className={styles.apiRefPageWrapper}>
            <ApiReferenceLayout
              spec={spec}
              moduleName={moduleConfig.name}
              moduleId={moduleId}
              docsBasePath={getDocsBasePath(moduleId)}
            />
          </div>
        ) : null}
      </main>
    </Layout>
  );
}
