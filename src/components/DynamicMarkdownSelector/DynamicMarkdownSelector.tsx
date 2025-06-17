import React, { useState, useEffect } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import DocVideo from "@site/src/components/DocVideo";
import "./DynamicMarkdownSelector.css";

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
    }
  >;
}

// Determine column count for visual balance
const getGridColumns = (count: number): number => {
  if (count <= 5) return count;
  if (count <= 10) return Math.ceil(count / 2);
  if (count <= 15) return Math.ceil(count / 3);
  return 5;
};

const DynamicMarkdownSelector: React.FC<DynamicMarkdownSelectorProps> = ({ options }) => {
  // --- BEGIN: Auto-redirect if loaded directly on a content page ---
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const { pathname } = window.location;
    // Find if the current path matches any option's path
    const match = Object.entries(options).find(([_label, entry]) => {
      // Normalize both to ensure leading slash
      const normalized = entry.path.startsWith("/") ? entry.path : "/" + entry.path;
      // Docusaurus usually serves content pages under /docs, but sometimes without
      return pathname.endsWith(normalized) || pathname.endsWith(normalized.replace(/^\/docs/, ""));
    });
    if (match) {
      const [label] = match;
      // Find the parent page (assume it's one directory up from /content/)
      const parent = match[1].path.split('/content/')[0] || '/';
      // Redirect to parent page with hash
      window.location.replace(`${parent}/supported-formats#${label.toLowerCase()}`);
    }
  }, [options]);
  // --- END: Auto-redirect ---
  const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, "");
  const labels = Object.keys(options).sort((a, b) => a.localeCompare(b));

  const getInitialSelected = () => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const match = labels.find((label) => normalize(label) === normalize(hash));
    return match || labels[0];
  };

  const [selected, setSelected] = useState(getInitialSelected());
  const [ContentComp, setContentComp] = useState<React.ComponentType<any> | null>(null);
  const [search, setSearch] = useState("");
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);

  // Update selection if hash changes
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const match = labels.find(
        (label) => normalize(label) === normalize(hash)
      );
      if (match) setSelected(match);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [labels]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll(".markdown-content h2"));
    const newToc = headings.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: parseInt(el.tagName[1], 10),
    }));
    setToc(newToc);
  }, [ContentComp]);

  // Update hash in URL when selection changes
  useEffect(() => {
    const path = options[selected]?.path;
    const entry = mdxMap[path];
    setContentComp(() =>
      entry ? entry : () => <p>Could not find content for <code>{path}</code>.</p>
    );
  }, [selected, options]);

  useEffect(() => {
    const hash = normalize(selected);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${hash}`);
    }
  }, [selected]);

  const filteredLabels = labels.filter((label) =>
    label.toLowerCase().includes(search.toLowerCase())
  );

  // Determine which labels to show and how many columns
  const showSearch = labels.length > 12;
  const displayLabels = showSearch ? filteredLabels : labels;
  const columns = getGridColumns(displayLabels.length);

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
                    className={`selector-card${selected === label ? " selected" : ""}`}
                    onClick={() => setSelected(label)}
                    type="button"
                  >
                    {entry.logo ? (
  <div className="selector-entry">
    <img
      src={`/provider-logos/${entry.logo}`}
      alt={`${label} logo`}
      className="selector-icon"
    />
    {!entry.iconOnly && <span>{label}</span>}
  </div>
) : (
  !entry.iconOnly && <span className="selector-entry no-logo">{label}</span>
)}
                  </button>
                );
              })}
            </div>
          </div>
          {toc.length > 0 && (
            <nav className="runtime-toc">
              <ul>
                {toc.map((h) => (
                  <li key={h.id} className={`level-${h.level}`}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="markdown-content">
            {ContentComp && <ContentComp components={{ Tabs, TabItem, DocVideo }} />}
          </div>
          <hr className="selector-divider" />
        </div>
      )}
    </BrowserOnly>
  );
};

export default DynamicMarkdownSelector;