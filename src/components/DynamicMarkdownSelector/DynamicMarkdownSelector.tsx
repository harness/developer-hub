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
}) => {
  const labels = disableSort ? Object.keys(options) : Object.keys(options).sort((a, b) => a.localeCompare(b));

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
        ? window.location.hash.replace("#", "")
        : "";
    const match = labels.find((label) => normalize(label) === normalize(hash));
    return match || labels[0];
  };

  const getInitialFromHash = () => {
    const raw = typeof window !== "undefined" ? window.location.hash : "";
    const { sel, sec } = parseHash(raw);
    // Back-compat: allow old single-part hashes like #python.
    const matchSel =
      labels.find((l) => normalize(l) === normalize(sel)) ||
      labels.find((l) => normalize(l) === normalize(raw.replace(/^#/, ""))) ||
      labels[0];
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
    const onHashChange = () => {
      const { sel, sec } = parseHash(window.location.hash);
      const match =
        labels.find((l) => normalize(l) === normalize(sel)) || labels[0];
      setSelected(match);
      setSectionId(sec || "");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [labels]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState(
        null,
        "",
        buildHash(selected, sectionId || undefined)
      );
    }
  }, [selected, sectionId]);

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
      window.history.pushState(null, "", buildHash(selected, targetId));
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ block: "start" });
    };

    container.addEventListener("click", handler);
    return () => container.removeEventListener("click", handler);
  }, [selected]);

  useEffect(() => {
    // If changing selected invalidates current sectionId, clear it.
    try {
      const dms = mdxCtx("." + options[selected]?.path);
      const ids = (dms?.toc || []).map((t: TOCItem) => t.id);
      if (sectionId && !ids.includes(sectionId)) setSectionId("");
    } catch {
      /* no-op */
    }
  }, [selected]);

  // Update hash in URL when selection changes

  useEffect(() => {
    const path = options[selected]?.path;
    const entry = mdxMap[path];
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

  spliceMDToc(
    toc,
    precedingHeadingID,
    nextHeadingID,
    mdxCtx("." + options[selected]?.path)?.toc || [], //e.g. mdxCtx('./cloud-cost-management/content/get-started/aws-quickstart.md').toc
    selected
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
                    }`}
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
                          {...(entry.logoWidth ||
                          entry.logoHeight ||
                          entry.logoSize
                            ? {
                                style: {
                                  width: entry.logoWidth ?? entry.logoSize,
                                  height: entry.logoHeight ?? entry.logoSize,
                                  objectFit: "contain",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                },
                              }
                            : {})}
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
  selected: string
) {
  if (!mdToc) return;

  removePlaceholder(mdToc);

  const mdTocSpliceStart =
    mdToc.findIndex((e) => e.id === precedingHeadingID?.replace("#", "")) + 1;

  let mdTocSpliceEnd = mdToc.findIndex(
    (e) => e.id === nextHeadingID?.replace("#", "")
  );
  if (mdTocSpliceEnd === -1) mdTocSpliceEnd = mdToc.length;
  // remove DynamicMarkdownSelector (DMS) toc content (from previous component render)
  mdToc.splice(mdTocSpliceStart, mdTocSpliceEnd - mdTocSpliceStart);

  /* console.log("DEBUG (after removing in DMS content) mdToc length", mdToc.length);
  for (let i = 0; i < mdToc.length; i++) {
    console.log("# mdToc" + i, mdToc[i].value);
  } */

  if (dmsToc) {
    // (re-)add DMS toc content
    mdToc.splice(mdTocSpliceStart, 0, ...dmsToc);
    updateTocHTML(mdToc, selected);
  }

  addPlaceholder(mdToc);
}

/**
 * Manually update the page's table of contents, using innerHTML.
 * -- We are doing this because we cannot nudge the parent component to refresh using normal React
 *  patterns (i.e. we can't define state variables in the md page and pass them to the child component).
 * @param mdToc The parent component's toc (table of contents) array. We copy these headings to the DOM tree.
 */
function updateTocHTML(mdToc: TOCItem[], selectedLabel: string) {
  if (!ExecutionEnvironment.canUseDOM) return;
  const pgToc: Element | null = document
    .getElementsByClassName("table-of-contents table-of-contents__left-border")
    .item(0);
  if (!pgToc) return;

  pgToc.innerHTML = "";

  let i = 0;
  const selHash = encodeURIComponent(normalize(selectedLabel));

  while (i < mdToc.length) {
    const li = document.createElement("li");
    const id2 = mdToc[i].id;
    const href2 = `#${selHash}${DELIM}${encodeURIComponent(id2)}`;
    li.innerHTML = `<a href="${href2}" class="table-of-contents__link toc-highlight table-of-contents__link">${mdToc[i].value}</a>`;

    i++;

    let l3 = "";
    while (i < mdToc.length && mdToc[i].level >= 3) {
      if (mdToc[i].level === 3) {
        const id3 = mdToc[i].id;
        const href3 = `#${selHash}${DELIM}${encodeURIComponent(id3)}`;
        l3 += `<li><a href="${href3}" class="table-of-contents__link toc-highlight table-of-contents__link">${mdToc[i].value}</a></li>`;
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
