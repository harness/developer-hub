/**
 * Strip leading digit-prefix segments (e.g. `4-foo` → `foo`) so repo folder names map to
 * canonical doc URLs. Used by `createRedirects` in docusaurus.config, client DMS redirect,
 * and test-dms-redirects — keep this file single-sourced.
 *
 * @param {string} pathname Absolute path (e.g. `/docs/foo/4-bar/baz`)
 * @returns {string | null} Canonical path if it differs from `pathname`, otherwise `null`
 */
export function repoPathToCanonical(pathname) {
  const segments = pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
  const canonical = segments.map((s) => s.replace(/^\d+-(.*)$/, '$1')).join('/');
  const result = '/' + canonical;
  return result !== pathname ? result : null;
}
