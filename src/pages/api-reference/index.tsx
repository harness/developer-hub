import React, { useEffect, useState, Suspense } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { useLocation } from 'react-router-dom';
import {
  getApiReferenceModule,
  getApiReferenceModuleIds,
  getDocsBasePathForModule,
  getSpecParser,
} from '@site/src/components/ApiReference/modulesConfig';
import { parseSpecByFormat } from '@site/src/components/ApiReference/parsers';
import { parseJsonInWorker } from '@site/src/components/ApiReference/parsers/parseJsonInWorker';
import type { OpenApiSpec } from '@site/src/components/ApiReference/types';
import styles from '@site/src/components/ApiReference/styles.module.css';

const ApiReferenceLayout = React.lazy(
  () => import('@site/src/components/ApiReference/ApiReferenceLayout')
);

/** In-memory cache: moduleId -> parsed spec. Avoids re-fetch/re-parse when switching back to a module. */
const specCache = new Map<string, OpenApiSpec>();

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

    const cached = specCache.get(moduleId);
    if (cached) {
      setSpec(cached);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const savedSpecUrl = `/api-specs/${moduleId}.json`;
    const formatFromConfig = moduleConfig.specFormat ?? 'json';

    fetch(savedSpecUrl)
      .then((res) => {
        if (res.ok) {
          return res.text().then((text) => parseJsonInWorker(text));
        }
        if (res.status === 404 && moduleConfig.specUrl) {
          return fetch(moduleConfig.specUrl).then((remoteRes) => {
            if (!remoteRes.ok) throw new Error(`Failed to load spec: ${remoteRes.status}`);
            return remoteRes.text().then((text) => parseSpecByFormat(text, formatFromConfig));
          });
        }
        if (res.status === 404) {
          throw new Error('API spec not found. Run the build so static/api-specs is populated.');
        }
        throw new Error(`Failed to load spec: ${res.status}`);
      })
      .then((data) => {
        const moduleParser = moduleId ? getSpecParser(moduleId) : null;
        const normalized = moduleParser ? moduleParser(data) : data;
        specCache.set(moduleId, normalized);
        setSpec(normalized);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load API spec');
        setSpec(null);
      })
      .finally(() => setLoading(false));
  }, [moduleId, moduleConfig]);

  const title = moduleConfig
    ? `${moduleConfig.name} API Reference`
    : 'API Reference';
  const description = moduleConfig
    ? `API reference for ${moduleConfig.name}, powered by the module's OpenAPI spec.`
    : 'Select a module to view its API reference.';

  const preloadModuleId = moduleConfig ? moduleId : moduleIds[0] ?? null;
  const preloadHref = preloadModuleId ? `/api-specs/${preloadModuleId}.json` : null;

  return (
    <Layout title={title} description={description}>
      {preloadHref && (
        <Head>
          <link rel="preload" href={preloadHref} as="fetch" crossOrigin="anonymous" />
        </Head>
      )}
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
            <Suspense fallback={<div className={styles.loadingState}>Loading…</div>}>
              <ApiReferenceLayout
                spec={spec}
                moduleName={moduleConfig.name}
                moduleId={moduleId}
                docsBasePath={getDocsBasePath(moduleId)}
              />
            </Suspense>
          </div>
        ) : null}
      </main>
    </Layout>
  );
}
