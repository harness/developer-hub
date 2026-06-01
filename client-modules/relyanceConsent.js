import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const RELYANCE_SCRIPT_SRC = 'https://consent.app.relyance.ai/relyance-agent.js';
const RELYANCE_APP_ID = 'app-25c77d8f-9b0d-5534-a04c-e3565a4c3512';

/**
 * URL substrings (semicolon-separated) that Relyance must not block or re-inject.
 * Without this, unblockDeferredScripts re-runs webpack/Docusaurus bundles and breaks React.
 * @see data-relyance-skip-url-patterns on relyance-agent.js (document.currentScript)
 */
const RELYANCE_SKIP_URL_PATTERNS = [
  'localhost',
  '127.0.0.1',
  'webpack',
  'webpack-internal',
  '/static/js/',
  '/assets/js/',
  'main.js',
  'runtime',
  'chunk',
  'docusaurus',
  'widget.kapa.ai',
  'api.kapa.ai',
  'hdh.mcp.kapa.ai',
  'consent.app.relyance.ai',
].join(';');

/**
 * Load Relyance after Docusaurus/React client bundles run.
 * Do not add relyance-agent.js to docusaurus.config `scripts` — it intercepts and
 * re-executes deferred scripts, which breaks React (useContext null) and inline plugins.
 *
 * onRouteDidUpdate fires after React has rendered each route (including the initial load),
 * so no manual DOM polling is needed. The __hdhRelyanceLoaded guard prevents re-injection
 * on subsequent navigations.
 */
function loadRelyanceConsent() {
  if (!ExecutionEnvironment.canUseDOM || window.__hdhRelyanceLoaded) {
    return;
  }

  if (new URLSearchParams(window.location.search).get('relyance') === '0') {
    return;
  }

  window.__hdhRelyanceLoaded = true;

  const script = document.createElement('script');
  script.src = RELYANCE_SCRIPT_SRC;
  script.async = true;
  script.setAttribute('data-relyance-consent-appId', RELYANCE_APP_ID);
  script.setAttribute('data-relyance-zero-fire-mode', 'true');
  script.setAttribute('data-relyance-skip-inline', 'true');
  script.setAttribute('data-relyance-skip-url-patterns', RELYANCE_SKIP_URL_PATTERNS);
  document.head.appendChild(script);
}

export function onRouteDidUpdate() {
  loadRelyanceConsent();
}
