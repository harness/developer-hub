# API Reference format parsers

Dedicated parsers by spec format so we can handle YAML and JSON cleanly without impacting each other.

- **`yaml.ts`** – `parseYamlSpec(text)` – for modules whose spec is YAML (e.g. IaCM, Code Repository).
- **`json.ts`** – `parseJsonSpec(text)` – for modules whose spec is JSON (e.g. HAR/Artifact Registry).
- **`index.ts`** – `parseSpecByFormat(text, format)` – picks the right parser from `specFormat` in module config.

Static files at `/api-specs/<moduleId>.json` are always JSON (build-time fetch writes JSON). When loading from the remote `specUrl` on 404, the page uses the module’s `specFormat` to choose the parser.

After format parsing, an optional **per-module parser** (e.g. `modules/<module-id>/parser.ts`) can run to handle module-specific oddities.
