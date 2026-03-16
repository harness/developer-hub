/**
 * Fetches OpenAPI specs for each API Reference module and writes them to
 * static/api-specs/<moduleId>.json so the app can load specs at runtime without
 * hitting remote URLs. Run on yarn start and production build.
 *
 * Keep MODULES in sync with src/components/ApiReference/modules/<module-id>/config.ts.
 * Prefer specUrl; use localPath only when the spec is not available at a URL.
 */
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'static', 'api-specs');

const MODULES = [
  { id: 'code-repository', specUrl: 'https://app.harness.io/prod1/code/openapi.yaml' },
  { id: 'infra-as-code-management', specUrl: 'https://app.harness.io/prod1/iacm/openapi3.yaml' },
  { id: 'artifact-registry', specUrl: 'https://app.harness.io/prod1/har/swagger.json' },
  { id: 'security-test-orchestration', specUrl: 'https://app.harness.io/prod1/sto/openapi3.yaml' },
  {
    id: 'software-supply-chain-assurance',
    localPath: 'src/components/ApiReference/modules/software-supply-chain-assurance/openapi.yaml',
  },
];

async function fetchSpec(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return yaml.load(text);
  }
}

async function main() {
  await fs.ensureDir(OUT_DIR);
  for (const mod of MODULES) {
    const { id } = mod;
    try {
      let spec;
      const localFull = mod.localPath ? path.join(ROOT, mod.localPath) : null;
      const useLocal = localFull && (await fs.pathExists(localFull));
      if (useLocal) {
        const text = await fs.readFile(localFull, 'utf8');
        spec = yaml.load(text);
        console.log(`[fetch-api-specs] ${id} (local) -> ${path.join(OUT_DIR, `${id}.json`)}`);
      } else if (mod.specUrl) {
        spec = await fetchSpec(mod.specUrl);
        console.log(`[fetch-api-specs] ${id} -> ${path.join(OUT_DIR, `${id}.json`)}`);
      } else {
        throw new Error('Neither localPath (file present) nor specUrl');
      }
      const outPath = path.join(OUT_DIR, `${id}.json`);
      await fs.writeJson(outPath, spec, { spaces: 0 });
    } catch (err) {
      console.error(`[fetch-api-specs] ${id} failed:`, err.message);
      process.exitCode = 1;
    }
  }
}

main();
