import { MODULES, MODULE_DISPLAY_NAME } from "../../../constants";

/** Sentinel value for the "All Modules" option. */
export const ALL_MODULES = "all";

export type ModuleFilterOption = {
  /** Either a `MODULES` key or `ALL_MODULES`. */
  value: string;
  label: string;
  /** Icon path relative to `baseUrl`. Absent for the "All Modules" option. */
  icon?: string;
  /** Number of tiles the option matches. */
  count: number;
};

/**
 * Module order, matching the hand-curated item order in `sidebars-university.ts`.
 * `MODULES.platform` leads because the Harness Platform tiles are the
 * prerequisite courses each section already renders first. Any module present
 * in the data but missing here is appended alphabetically, so a new module
 * shows up in the filter without a code change and only needs an entry here to
 * take its intended position.
 */
const MODULE_ORDER: MODULES[] = [
  MODULES.platform,
  MODULES.code,
  MODULES.cd,
  MODULES.ci,
  MODULES.idp,
  MODULES.iacm,
  MODULES.dbdevops,
  MODULES.fme,
  MODULES.ce,
  MODULES.asp,
  MODULES.arp,
  MODULES.ast,
  MODULES.waap,
  MODULES.sto,
  MODULES.ssca,
  MODULES.ccm,
  MODULES.sei,
];

/**
 * University-specific module labels. These mirror the `label` values in
 * `sidebars-university.ts` wherever University names a module differently from
 * the platform-wide `MODULE_DISPLAY_NAME` map. Anything not listed here falls
 * back to `MODULE_DISPLAY_NAME`, so new modules need no change unless
 * University uses a different name for them.
 */
const UNIVERSITY_MODULE_LABEL: Partial<Record<MODULES, string>> = {
  [MODULES.cd]: "Continuous Delivery & GitOps",
  [MODULES.ce]: "Resilience Testing - CE",
  [MODULES.sto]: "Application Security Testing - STO",
  [MODULES.ssca]: "Application Security Testing - SCS",
  [MODULES.sei]: "AI DLC Insights",
};

/**
 * Modern (3k) module icons from `static/img/home/`, matching the
 * `nav[data-docs-variant="3k"] .sidebar-*` icons in `src/css/custom.css`.
 * WAAP has no dedicated 3k icon, so it reuses the runtime-protection icon.
 */
const UNIVERSITY_MODULE_ICON: Partial<Record<MODULES, string>> = {
  [MODULES.platform]: "img/home/platform.svg",
  [MODULES.code]: "img/home/code.svg",
  [MODULES.cd]: "img/home/deployment.svg",
  [MODULES.ci]: "img/home/build.svg",
  [MODULES.idp]: "img/home/portal.svg",
  [MODULES.iacm]: "img/home/infrastructure.svg",
  [MODULES.dbdevops]: "img/home/database.svg",
  [MODULES.fme]: "img/home/feature.svg",
  [MODULES.ff]: "img/home/feature.svg",
  [MODULES.ce]: "img/home/resilience-test.svg",
  [MODULES.rt]: "img/home/resilience-test.svg",
  [MODULES.asp]: "img/home/app-discovery.svg",
  [MODULES.arp]: "img/home/runtime.svg",
  [MODULES.ast]: "img/home/app-sec.svg",
  [MODULES.waap]: "img/home/runtime.svg",
  [MODULES.sto]: "img/home/security-test.svg",
  [MODULES.ssca]: "img/home/supply-chain.svg",
  [MODULES.ccm]: "img/home/cloud-cost.svg",
  [MODULES.sei]: "img/home/engineering-insights-classic.svg",
  [MODULES.aidi]: "img/home/engineering-insights-classic.svg",
  [MODULES.ar]: "img/home/artifact.svg",
  [MODULES.ata]: "img/home/ui-test.svg",
  [MODULES.aisre]: "img/home/incident.svg",
  [MODULES.aisec]: "img/home/ai-security.svg",
  [MODULES.rm]: "img/home/release.svg",
  [MODULES.qwietai]: "img/home/qwiet.svg",
  [MODULES.hsf]: "img/home/harness.svg",
  [MODULES.smp]: "img/home/harness.svg",
};

export const getModuleLabel = (module: MODULES): string =>
  UNIVERSITY_MODULE_LABEL[module] ??
  MODULE_DISPLAY_NAME[module] ??
  module.toUpperCase();

export const getModuleIcon = (module: MODULES): string =>
  UNIVERSITY_MODULE_ICON[module] ?? "img/home/harness.svg";

/**
 * Derive the filter options from the tiles a section actually renders, so the
 * dropdown never offers a module with zero results. Options follow
 * `MODULE_ORDER`, with "All Modules" pinned first.
 */
export function getModuleFilterOptions<T extends { module: MODULES }>(
  items: T[],
  allLabel = "All Modules"
): ModuleFilterOption[] {
  const counts = new Map<MODULES, number>();
  items.forEach(({ module }) => {
    counts.set(module, (counts.get(module) ?? 0) + 1);
  });

  const rank = (module: MODULES) => {
    const index = MODULE_ORDER.indexOf(module);
    return index === -1 ? MODULE_ORDER.length : index;
  };

  const moduleOptions = Array.from(counts.entries())
    .map(([module, count]) => ({
      value: module as string,
      label: getModuleLabel(module),
      icon: getModuleIcon(module),
      count,
      rank: rank(module),
    }))
    .sort((a, b) => a.rank - b.rank || a.label.localeCompare(b.label))
    .map(({ rank: _rank, ...option }) => option);

  return [
    { value: ALL_MODULES, label: allLabel, count: items.length },
    ...moduleOptions,
  ];
}

/** True when a tile should be shown for the current filter selection. */
export const matchesModuleFilter = (
  item: { module: MODULES },
  selected: string
): boolean => selected === ALL_MODULES || item.module === selected;
