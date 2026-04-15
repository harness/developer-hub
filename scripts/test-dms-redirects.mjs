#!/usr/bin/env node
/**
 * Test that DMS content child paths redirect to the expected parent page + hash.
 * Uses the same logic as client-modules/dmsContentRedirect.js: generated map first, then convention.
 * Run scripts/generate-dms-redirect-map.mjs first (or use npm run test:dms-redirects which runs it).
 */
import dmsRedirectMap from '../client-modules/generated/dmsRedirectMap.js';
import { repoPathToCanonical } from '../client-modules/repoPathToCanonical.js';

function dmsNormalize(s) {
  return s.toLowerCase().replace(/\s+/g, '');
}

function slugToHash(slug) {
  const withoutQuickstart = slug.replace(/-quickstart$/i, '');
  return encodeURIComponent(dmsNormalize(withoutQuickstart));
}

/** Given a pathname (e.g. /docs/cloud-cost-management/content/auto-stopping/aws-as), return redirect target URL or null if not a content path. */
function getRedirectTarget(pathname) {
  const pathForLookup = pathname.replace(/^\/docs\//, '').replace(/\/$/, '').replace(/\.(md|mdx)$/i, '');

  const entry = dmsRedirectMap && dmsRedirectMap[pathForLookup];
  if (entry) {
    const parentFullPath = '/docs/' + entry.parentRepoPath;
    const canonical = repoPathToCanonical(parentFullPath) || parentFullPath;
    return `${canonical}#${entry.hash}`;
  }

  const contentMatch = pathname.match(/^(.*?)\/(content|supported-formats)\/(.+)$/);
  if (!contentMatch) return null;

  const [, prefix, segmentType, rest] = contentMatch;
  const parts = rest.split('/').filter(Boolean);
  let section;
  let slug;
  if (segmentType === 'supported-formats') {
    if (parts.length < 1) return null;
    section = 'supported-formats';
    slug = parts[parts.length - 1];
  } else {
    if (parts.length < 2) return null;
    section = parts[0];
    slug = parts[parts.length - 1];
  }
  const targetPage = `${prefix}/${section}`;
  const hash = slugToHash(slug);
  return `${targetPage}#${hash}`;
}

const TEST_CASES = [
  // CCM recommendations (override)
  [
    '/docs/cloud-cost-management/content/recommendations/aws-rec',
    '/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/home-recommendations#aws',
  ],
  [
    '/docs/cloud-cost-management/content/recommendations/azure-rec',
    '/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/home-recommendations#azure',
  ],
  [
    '/docs/cloud-cost-management/content/recommendations/gcp-rec',
    '/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/home-recommendations#gcp',
  ],
  // CCM auto-stopping (override)
  [
    '/docs/cloud-cost-management/content/auto-stopping/aws-as',
    '/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/autostopping-rules#aws',
  ],
  [
    '/docs/cloud-cost-management/content/auto-stopping/azure-as',
    '/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/autostopping-rules#azure',
  ],
  [
    '/docs/cloud-cost-management/content/auto-stopping/gcp-as',
    '/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/autostopping-rules#gcp',
  ],
  [
    '/docs/cloud-cost-management/content/auto-stopping/kubernetes-as',
    '/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/autostopping-rules#kubernetes',
  ],
  // IaCM get-started (parent doc get-started/get-started.md → URL uses single segment /get-started)
  [
    '/docs/infra-as-code-management/content/get-started/opentofu-quickstart',
    '/docs/infra-as-code-management/get-started#opentofu',
  ],
  [
    '/docs/infra-as-code-management/content/get-started/terraform-quickstart',
    '/docs/infra-as-code-management/get-started#terraform',
  ],
  [
    '/docs/infra-as-code-management/content/get-started/terragrunt-quickstart',
    '/docs/infra-as-code-management/get-started#terragrunt',
  ],
];

function main() {
  let failed = 0;
  for (const [childPath, expectedRedirect] of TEST_CASES) {
    const got = getRedirectTarget(childPath);
    const ok = got === expectedRedirect;
    if (!ok) {
      console.error(`FAIL ${childPath}`);
      console.error(`  expected: ${expectedRedirect}`);
      console.error(`  got:      ${got ?? '(null)'}`);
      failed++;
    } else {
      console.log(`OK   ${childPath} -> ${got}`);
    }
  }
  if (failed > 0) {
    console.error(`\n${failed} test(s) failed`);
    process.exit(1);
  }
  console.log(`\nAll ${TEST_CASES.length} DMS redirect tests passed.`);
}

main();
