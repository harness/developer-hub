# API Reference modules

Each module has its own folder under `modules/<module-id>/` so config and parsing can be changed without affecting others.

## Adding or editing a module

1. **Config** – Create or edit `modules/<module-id>/config.ts` and export a default object matching `ApiReferenceModuleConfig` (see `types.ts`):
   - `name`, `specUrl` (required)
   - `specFormat`: `'yaml'` or `'json'` – used by the dedicated format parsers when loading from remote (static files are always JSON).
   - `pathPrefix`, `baseUrl`, `sidebarIconClass`, `iconPath`, `docsPathSegment` (optional)

2. **Register** – In `modules/index.ts`, add an import for the new config and add an entry to `MODULE_CONFIGS`.

3. **Optional parser** – If the module’s spec needs custom parsing or normalization, add `modules/<module-id>/parser.ts` that exports `parseSpec(spec: unknown): OpenApiSpec`. Then register it in `MODULE_CONFIGS` and `MODULE_PARSERS` in `modules/index.ts`.

4. **Fetch script** – Keep `scripts/fetch-api-specs.mjs` in sync (add the module’s `id` and `specUrl` to `MODULES`) so the spec is fetched at build time.
