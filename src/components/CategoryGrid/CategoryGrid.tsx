import React, { useEffect, useMemo, useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./CategoryGrid.module.scss";
import type { Category, CatItem, ModuleLink } from "./categories.data";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useColorMode } from "@docusaurus/theme-common";
import { moduleList } from "@site/src/components/LearnAboutPlatform/data/moduleListData";

/* ----- utils ----- */
const stripLeadingSlash = (p?: string) =>
  (p && p.startsWith("/") ? p.slice(1) : p) || "";
const joinBase = (baseUrl: string, rel: string) =>
  (baseUrl.endsWith("/") ? baseUrl : baseUrl + "/") + stripLeadingSlash(rel);

/* Optional overrides for odd assets */
const ICON_ALIASES: Record<string, string> = {
  // ar: "img/icon_artifact_registry.svg",
};

const kebab = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
const snake = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [breakpoint]);
  return isMobile;
}

function useModuleIconMap() {
  return useMemo(() => {
    const map = new Map<string, string>();
    moduleList.forEach((m: any) => {
      if (!m?.module) return;
      const rel =
        (m.icon && stripLeadingSlash(m.icon)) || `img/icon-${m.module}.svg`;
      map.set(m.module, rel);
    });
    return map;
  }, []);
}

function buildIconCandidates(
  item: ModuleLink | CatItem,
  moduleIconMap: Map<string, string>,
  colorMode = "light"
) {
  const roots = ["img", "icons"];
  const list: string[] = [];

  // 1. Explicit light/dark icons (highest priority)
  if (colorMode === "dark" && item.iconDark)
    list.push(stripLeadingSlash(item.iconDark));
  if (item.iconLight) list.push(stripLeadingSlash(item.iconLight));
  if (colorMode === "dark" && item.iconLight)
    list.push(stripLeadingSlash(item.iconLight)); // dark fallback to light
  // 2. Legacy single icon
  if (item.icon) list.push(stripLeadingSlash(item.icon));
  if (item.module && ICON_ALIASES[item.module])
    list.push(ICON_ALIASES[item.module]);
  if (item.module && moduleIconMap.get(item.module))
    list.push(moduleIconMap.get(item.module)!);

  if (item.module) {
    const hy = `icon-${item.module}`;
    const us = `icon_${item.module}`;
    roots.forEach((r) =>
      list.push(
        `${r}/${hy}.svg`,
        `${r}/${us}.svg`,
        `${r}/${hy}.png`,
        `${r}/${us}.png`
      )
    );
  }

  const k = kebab(item.name);
  const s = snake(item.name);
  roots.forEach((r) =>
    list.push(
      `${r}/icon-${k}.svg`,
      `${r}/icon_${s}.svg`,
      `${r}/${k}.svg`,
      `${r}/${s}.svg`,
      `${r}/icon-${k}.png`,
      `${r}/icon_${s}.png`,
      `${r}/${k}.png`,
      `${r}/${s}.png`
    )
  );

  return Array.from(new Set(list));
}

function FallbackImg({
  baseUrl,
  candidates,
  className,
  alt = "",
}: {
  baseUrl: string;
  candidates: string[];
  className?: string;
  alt?: string;
}) {
  const [idx, setIdx] = useState(0);
  const src = candidates[idx] ? joinBase(baseUrl, candidates[idx]) : "";
  return (
    <img
      src={src}
      className={className}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (idx < candidates.length - 1) setIdx(idx + 1);
        else if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn("Icon not found; tried:", candidates);
        }
      }}
    />
  );
}

/* ----- shared tile renderer ----- */
function ColTileItem({ item, baseUrl, moduleIconMap, colorMode }: {
  item: ModuleLink | CatItem;
  baseUrl: string;
  moduleIconMap: Map<string, string>;
  colorMode: string;
}) {
  return (
    <li className={styles.colTileItem}>
      <Link to={item.href} className={styles.colTile} aria-label={`${item.name} documentation`}>
        <div className={styles.colTileHead}>
          <div className={styles.iconWrap} aria-hidden="true">
            <FallbackImg
              baseUrl={baseUrl}
              candidates={buildIconCandidates(item, moduleIconMap, colorMode)}
              className={styles.featureSvg}
            />
          </div>
          <span className={styles.tileTitle}>{item.name}</span>
          {item.badge && (
            <span className={clsx(styles.badge, styles[`badge_${item.badge}`])}>{item.badge}</span>
          )}
        </div>
        {item.description && <p className={styles.tileDescription}>{item.description}</p>}
      </Link>
    </li>
  );
}

/* ----- main ----- */
export default function CategoryGrid({
  categories,
}: {
  categories: Category[];
}) {
  const isMobile = useIsMobile();
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const moduleIconMap = useModuleIconMap();

  const [focusedCol, setFocusedCol] = useState<number | null>(null);

  return (
    <section className={styles.wrapper} aria-label="Documentation categories">
      <div className="container">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className={styles.sectionHeader}>
          <img
            src={joinBase(baseUrl, "img/home/harness.svg")}
            alt=""
            aria-hidden="true"
            className={styles.sectionHeaderIcon}
          />
          <h3>Modules</h3>
        </div>

        {isMobile ? (
          // Mobile: collapsible accordions
          <>
            {categories.map((cat) => (
              <details key={cat.title} className={styles.categoryDetails}>
                <summary className={styles.categorySummary}>
                  <span className={styles.categoryTitle}>{cat.title}</span>
                  {cat.blurb && (
                    <span className={styles.categoryBlurb}>{cat.blurb}</span>
                  )}
                </summary>
                <ul className={styles.tileList} role="list">
                  {cat.subgroups ? (
                    cat.subgroups.map((sg, index) => (
                      <React.Fragment key={sg.subgroupTitle}>
                        <li
                          className={styles.subgroupDivider}
                          role="presentation"
                          style={{ animationDelay: `${index * 0.5}s` }}
                        >
                          <span className={styles.subgroupLabel}>{sg.subgroupTitle}</span>
                        </li>
                        {sg.items.map((item) => (
                          <li key={item.name} className={styles.tileListItem}>
                            <Link to={item.href} className={styles.tileRow} aria-label={`${item.name} documentation`}>
                              <div className={styles.tileRowHead}>
                                <div className={styles.iconWrap} aria-hidden="true">
                                  <FallbackImg baseUrl={baseUrl} candidates={buildIconCandidates(item, moduleIconMap, colorMode)} className={styles.featureSvg} />
                                </div>
                                <span className={styles.tileTitle}>{item.name}</span>
                                {item.badge && (
                                  <span className={clsx(styles.badge, styles[`badge_${item.badge}`])}>{item.badge}</span>
                                )}
                              </div>
                              {item.description && (
                                <span className={styles.tileDescriptionMobile}>{item.description}</span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </React.Fragment>
                    ))
                  ) : (
                    (cat.items ?? []).map((item) => (
                      <li key={item.name} className={styles.tileListItem}>
                        <Link to={item.href} className={styles.tileRow} aria-label={`${item.name} documentation`}>
                          <div className={styles.tileRowHead}>
                            <div className={styles.iconWrap} aria-hidden="true">
                              <FallbackImg baseUrl={baseUrl} candidates={buildIconCandidates(item, moduleIconMap, colorMode)} className={styles.featureSvg} />
                            </div>
                            <span className={styles.tileTitle}>{item.name}</span>
                            {item.badge && (
                              <span className={clsx(styles.badge, styles[`badge_${item.badge}`])}>{item.badge}</span>
                            )}
                          </div>
                          {item.description && (
                            <span className={styles.tileDescriptionMobile}>{item.description}</span>
                          )}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </details>
            ))}
          </>
        ) : (
          // Desktop: columns that expand on hover/focus
          <div
            className={styles.categoryColumns}
            data-focused={focusedCol !== null ? focusedCol : undefined}
          >
            {categories.map((cat, idx) => (
              <div
                key={cat.title}
                className={clsx(
                  styles.categoryCol,
                  focusedCol === idx && styles.isFocused
                )}
                onFocusCapture={() => setFocusedCol(idx)}
                onBlurCapture={(e) => {
                  if (
                    !(e.currentTarget as HTMLElement).contains(
                      e.relatedTarget as Node
                    )
                  ) {
                    setFocusedCol(null);
                  }
                }}
              >
                <header className={styles.colHeader}>
                  <h2 className={styles.categoryTitle}>{cat.title}</h2>
                  {cat.blurb && (
                    <p className={styles.categoryBlurb}>{cat.blurb}</p>
                  )}
                </header>

                <ul className={styles.colTiles} role="list">
                  {cat.subgroups ? (
                    cat.subgroups.map((sg, index) => (
                      <React.Fragment key={sg.subgroupTitle}>
                        <li
                          className={styles.subgroupDivider}
                          role="presentation"
                          style={{ animationDelay: `${index * 0.5}s` }}
                        >
                          <span className={styles.subgroupLabel}>{sg.subgroupTitle}</span>
                        </li>
                        {sg.items.map((item) => (
                          <ColTileItem key={item.name} item={item} baseUrl={baseUrl} moduleIconMap={moduleIconMap} colorMode={colorMode} />
                        ))}
                      </React.Fragment>
                    ))
                  ) : (
                    (cat.items ?? []).map((item) => (
                      <ColTileItem key={item.name} item={item} baseUrl={baseUrl} moduleIconMap={moduleIconMap} colorMode={colorMode} />
                    ))
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}