import React, { useState, useEffect } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import DocVideo from "@site/src/components/DocVideo";
import "./DynamicMarkdownSelector.css";

import type { TOCItem } from "@docusaurus/mdx-loader";

const DELIM = "--";
const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, "");

/** Slug from option path (last segment, no .md). Enables hash to match either label (e.g. #aws) or content filename (e.g. #aws-as). */
function slugFromPath(path: string): string {
  if (!path) return "";
  const segment = path.replace(/\.md$/i, "").split("/").filter(Boolean).pop() ?? "";
  return segment;
}

/** For each option label, the normalized hash values that select it: normalized label + normalized slug from path. */
function getHashAliasesForOptions(
  options: Record<string, { path: string }>,
  labels: string[]
): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  labels.forEach((label) => {
    const aliases = new Set<string>();
    aliases.add(normalize(label));
    const path = options[label]?.path;
    if (path) {
      const slug = slugFromPath(path);
      if (slug) aliases.add(normalize(slug));
    }
    map.set(label, aliases);
  });
  return map;
}

declare var require: {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
    mode?: string
  ): any;
};

const mdxCtx = require.context("@site/docs", true, /\/content\/.*\.md$/);
const mdxMap: Record<string, React.ComponentType<any>> = {};
mdxCtx.keys().forEach((key: string) => {
  const normalized = "/" + key.replace("./", "");
  mdxMap[normalized] = mdxCtx(key).default;
});

/** Paths in options may omit .md; require.context keys always have .md. Normalize for lookup. */
function toContentModulePath(path: string): string {
  if (!path) return path;
  return path.endsWith(".md") ? path : path + ".md";
}

export interface DynamicMarkdownSelectorProps {
  options: Record<
    string,
    {
      path: string;
      logo?: string;
      iconOnly?: boolean;
      logoSize?: number;
      logoWidth?: number;
      logoHeight?: number;
    }
  >;
  toc: TOCItem[];
  precedingHeadingID: string;
  nextHeadingID: string;
  defaultSelection?: string;
  disableSort?: boolean;
  disableHash?: boolean;
}

// Determine column count for visual balance
const getGridColumns = (count: number): number => {
  if (count <= 5) return count;
  if (count <= 10) return Math.ceil(count / 2);
  if (count <= 15) return Math.ceil(count / 3);
  return 5;
};

const DynamicMarkdownSelector: React.FC<DynamicMarkdownSelectorProps> = ({
  options,
  toc,
  precedingHeadingID = "",
  nextHeadingID = "",
  defaultSelection,
  disableSort = false,
  disableHash = false,
}) => {
  const labels = React.useMemo(
    () =>
      disableSort
        ? Object.keys(options)
        : Object.keys(options).slice().sort((a, b) => a.localeCompare(b)),
    [options, disableSort]
  );
  const hashAliases = React.useMemo(
    () => getHashAliasesForOptions(options, labels),
    [options, labels]
  );

  /** Resolve hash (label or content-path slug) to option label. */
  const findLabelByHash = (hashValue: string) => {
    const normalized = normalize(hashValue);
    return labels.find((label) => hashAliases.get(label)?.has(normalized)) ?? labels[0];
  };

  const buildHash = (sel: string, sec?: string) =>
    `#${encodeURIComponent(normalize(sel))}${
      sec ? DELIM + encodeURIComponent(sec) : ""
    }`;

  const parseHash = (hash: string) => {
    const raw = hash.replace(/^#/, "").trim();
    if (!raw) return { sel: "", sec: "" };
    const [sel, ...rest] = raw.split(DELIM);
    return { sel: sel || "", sec: rest.join(DELIM) || "" };
  };

  const getInitialSelected = () => {
    const hash =
      typeof window !== "undefined"
        ? window.location.hash.replace("#", "").split(DELIM)[0]
        : "";
    return findLabelByHash(hash) || labels[0];
  };

  const getInitialFromHash = () => {
    const raw = typeof window !== "undefined" ? window.location.hash : "";
    const { sel, sec } = parseHash(raw);
    const hashPart = sel || raw.replace(/^#/, "").split(DELIM)[0] || "";
    const matchSel = findLabelByHash(hashPart) || labels[0];
    return { initialSel: matchSel, initialSec: sec || "" };
  };

  const { initialSel, initialSec } = getInitialFromHash();
  const [selected, setSelected] = useState(initialSel);
  const [sectionId, setSectionId] = useState(initialSec);

  const [ContentComp, setContentComp] =
    useState<React.ComponentType<any> | null>(null);
  const [search, setSearch] = useState("");

  // Update selection if hash changes

  useEffect(() => {
    if (disableHash) return;
    const onHashChange = () => {
      const { sel, sec } = parseHash(window.location.hash);
      const match = findLabelByHash(sel) || labels[0];
      setSelected(match);
      setSectionId(sec || "");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [labels, disableHash, hashAliases]);

  useEffect(() => {
    if (disableHash) return;
    if (typeof window !== "undefined") {
      window.history.replaceState(
        null,
        "",
        buildHash(selected, sectionId || undefined)
      );
    }
  }, [selected, sectionId, disableHash]);

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const container = document.querySelector(".markdown-content");
    if (!container) return;

    const handler = (e: Event) => {
      const a = (e.target as HTMLElement).closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const targetId = a.getAttribute("href")!.replace(/^#/, "");
      // Force compound hash.
      e.preventDefault();
      setSectionId(targetId);
      if (!disableHash) {
        window.history.pushState(null, "", buildHash(selected, targetId));
      }
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ block: "start" });
    };

    container.addEventListener("click", handler);
    return () => container.removeEventListener("click", handler);
  }, [selected, disableHash]);

  useEffect(() => {
    // If changing selected invalidates current sectionId, clear it.
    try {
      const dms = mdxCtx("." + toContentModulePath(options[selected]?.path ?? ""));
      const tocList = (dms?.toc || []).filter((t): t is TOCItem => t != null && typeof t.id !== "undefined");
      const ids = tocList.map((t) => t.id);
      if (sectionId && !ids.includes(sectionId)) setSectionId("");
    } catch {
      /* no-op */
    }
  }, [selected]);

  // Update hash in URL when selection changes

  useEffect(() => {
    const path = options[selected]?.path;
    const entry = mdxMap[toContentModulePath(path ?? "")];
    setContentComp(() =>
      entry
        ? entry
        : () => (
            <p>
              Could not find content for <code>{path}</code>.
            </p>
          )
    );
  }, [selected, options]);

  const filteredLabels = labels.filter((label) =>
    label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM || !sectionId) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(decodeURIComponent(sectionId));
      if (el) el.scrollIntoView({ block: "start" });
    });
  }, [ContentComp, sectionId]);

  // Determine which labels to show and how many columns
  const showSearch = labels.length > 12;
  const displayLabels = showSearch ? filteredLabels : labels;
  const columns = getGridColumns(displayLabels.length);

  let dmsTocRaw: unknown[] = [];
  try {
    dmsTocRaw =
      mdxCtx("." + toContentModulePath(options[selected]?.path ?? ""))?.toc || [];
  } catch {
    dmsTocRaw = [];
  }
  const dmsTocSafe = Array.isArray(dmsTocRaw)
    ? dmsTocRaw.filter(
        (e: unknown): e is TOCItem =>
          e != null && typeof e === "object" && typeof (e as TOCItem).id !== "undefined"
      )
    : [];
  spliceMDToc(
    toc,
    precedingHeadingID,
    nextHeadingID,
    dmsTocSafe,
    selected,
    disableHash
  );

  return (
    <BrowserOnly>
      {() => (
        <div className="dynamic-markdown-selector">
          <hr className="selector-divider" />
          <div className="selector-panel">
            {showSearch && (
              <input
                type="text"
                placeholder="Search formats..."
                className="format-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}
            <div
              className="selector-grid"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(140px, 1fr))`,
              }}
            >
              {displayLabels.map((label) => {
                const entry = options[label];
                return (
                  <button
                    key={label}
                    className={`selector-card${
                      selected === label ? " selected" : ""
                    }${entry.iconOnly ? " selector-card--icon-only" : ""}`}
                    onClick={() => {
                      setSelected(label);
                      setSectionId("");
                    }}
                    type="button"
                  >
                    {entry.logo ? (
                      <div className="selector-entry">
                        <img
                          src={`/provider-logos/${entry.logo}`}
                          alt={`${label} logo`}
                          className="selector-icon"
                          {...(() => {
                            const { logoWidth, logoHeight, logoSize, iconOnly } =
                              entry;
                            if (logoWidth != null || logoHeight != null) {
                              return {
                                style: {
                                  width: logoWidth ?? logoSize,
                                  height: logoHeight ?? logoSize,
                                  objectFit: "contain" as const,
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                },
                              };
                            }
                            if (logoSize != null) {
                              if (iconOnly) {
                                return {
                                  style: {
                                    height: logoSize,
                                    width: "auto",
                                    objectFit: "contain" as const,
                                    maxWidth: "100%",
                                  },
                                };
                              }
                              return {
                                style: {
                                  width: logoSize,
                                  height: logoSize,
                                  objectFit: "contain" as const,
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                },
                              };
                            }
                            return {};
                          })()}
                        />
                        {!entry.iconOnly && <span>{label}</span>}
                      </div>
                    ) : (
                      !entry.iconOnly && (
                        <span className="selector-entry no-logo">{label}</span>
                      )
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="markdown-content">
            {ContentComp && (
              <ContentComp components={{ Tabs, TabItem, DocVideo }} />
            )}
          </div>
          <hr className="selector-divider" />
        </div>
      )}
    </BrowserOnly>
  );
};

/**
 * Dynamically updates table of contents of the parent component (the parent md page).
 * Inserts the headings from the DynamicMarkdownSelector (DMS) content into the table of
 * contents that appears at the page top right.
 * @param mdToc              Parent component's toc (table of contents) array. We add headings to this.
 * @param precedingHeadingID Heading id that comes before the DMS component on the parent page.
 * @param nextHeadingID      Heading id that comes after the DMS component on the parent page.
 * @param dmsToc             Linked page that is selected in the DMS. We add headings from this page to mdToc.
 */
function spliceMDToc(
  mdToc: TOCItem[],
  precedingHeadingID: string = "",
  nextHeadingID: string = "",
  dmsToc: TOCItem[],
  selected: string,
  disableHash: boolean = false
) {
  if (!mdToc || !Array.isArray(mdToc)) return;

  removePlaceholder(mdToc);

  const mdTocSpliceStart =
    mdToc.findIndex((e) => e && e.id === precedingHeadingID?.replace("#", "")) + 1;

  let mdTocSpliceEnd = mdToc.findIndex(
    (e) => e && e.id === nextHeadingID?.replace("#", "")
  );
  if (mdTocSpliceEnd === -1) mdTocSpliceEnd = mdToc.length;
  // remove DynamicMarkdownSelector (DMS) toc content (from previous component render)
  mdToc.splice(mdTocSpliceStart, mdTocSpliceEnd - mdTocSpliceStart);

  if (dmsToc && dmsToc.length > 0) {
    // (re-)add DMS toc content
    mdToc.splice(mdTocSpliceStart, 0, ...dmsToc);
    updateTocHTML(mdToc, selected, disableHash);
  }

  addPlaceholder(mdToc);
}

/**
 * Manually update the page's table of contents, using innerHTML.
 * -- We are doing this because we cannot nudge the parent component to refresh using normal React
 *  patterns (i.e. we can't define state variables in the md page and pass them to the child component).
 * @param mdToc The parent component's toc (table of contents) array. We copy these headings to the DOM tree.
 */
function updateTocHTML(mdToc: TOCItem[], selectedLabel: string, disableHash: boolean = false) {
  if (!ExecutionEnvironment.canUseDOM) return;
  const pgToc: Element | null = document
    .getElementsByClassName("table-of-contents table-of-contents__left-border")
    .item(0);
  if (!pgToc) return;

  pgToc.innerHTML = "";

  let i = 0;
  const selHash = encodeURIComponent(normalize(selectedLabel));

  while (i < mdToc.length) {
    const item = mdToc[i];
    if (item == null || typeof item.id === "undefined") {
      i++;
      continue;
    }
    const li = document.createElement("li");
    const id2 = item.id;
    const href2 = disableHash ? `#${encodeURIComponent(id2)}` : `#${selHash}${DELIM}${encodeURIComponent(id2)}`;
    li.innerHTML = `<a href="${href2}" class="table-of-contents__link toc-highlight table-of-contents__link">${item.value ?? ""}</a>`;

    i++;

    let l3 = "";
    while (i < mdToc.length && mdToc[i] != null && (mdToc[i] as TOCItem).level >= 3) {
      const sub = mdToc[i] as TOCItem;
      if (sub.level === 3 && typeof sub.id !== "undefined") {
        const id3 = sub.id;
        const href3 = disableHash ? `#${encodeURIComponent(id3)}` : `#${selHash}${DELIM}${encodeURIComponent(id3)}`;
        l3 += `<li><a href="${href3}" class="table-of-contents__link toc-highlight table-of-contents__link">${sub.value ?? ""}</a></li>`;
      }
      i++;
    }

    if (l3) li.innerHTML += `<ul>${l3}</ul>`;
    pgToc.append(li);
  }
}
/**
 * We add/remove a placeholder to handle an edge case: If there are no headings in the
 * first DMS button selected, then the toc is not created in the DOM of the parent page
 * and cannot be updated.
 * -- To prevent this from happening, we add and remove a placeholder. Then the DOM elements
 *  for the tocare created and we can update them when the selection changes.
 * @param mdToc The parent component's toc (table of contents) array.
 */

const placeholder: TOCItem = { id: "placeholder", value: "", level: 2 };

function addPlaceholder(mdToc: TOCItem[]) {
  if (mdToc.length == 0) mdToc.push(placeholder);
}

function removePlaceholder(mdToc: TOCItem[]) {
  const placeholderIndex: number = mdToc.findIndex(
    (x) =>
      x.id == placeholder.id &&
      x.value == placeholder.value &&
      x.level == placeholder.level
  );

  if (placeholderIndex != -1) mdToc.splice(placeholderIndex, 1);
}

export default DynamicMarkdownSelector;
