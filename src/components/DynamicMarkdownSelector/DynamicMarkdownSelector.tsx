/**
 * DynamicMarkdownSelector Component
 *
 * Renders a row of selectable tiles. When a tile is selected, it renders an imported MDX module from src/content.
 */

declare var require: {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
    mode?: string
  ): any;
};

import React, { useState, useEffect } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import DocVideo from "@site/src/components/DocVideo";
import "./DynamicMarkdownSelector.css";

// Load MDX modules from src/content
const mdxCtx = require.context("@site/src/content", true, /\.mdx?$/);

const mdxMap: Record<string, React.ComponentType<any>> = {};
mdxCtx.keys().forEach((key: string) => {
  const normalized = '/' + key.replace('./', '');
  mdxMap[normalized] = mdxCtx(key).default;
});

export interface DynamicMarkdownSelectorProps {
  options: Record<string, string>;
}

const DynamicMarkdownSelector: React.FC<DynamicMarkdownSelectorProps> = ({ options }) => {
  const labels = Object.keys(options);
  const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, "");

  const getInitialSelected = () => {
    const hash = window.location.hash.replace("#", "");
    const match = labels.find((label) => normalize(label) === normalize(hash));
    return match || labels[0];
  };

  const [selected, setSelected] = useState(getInitialSelected());
  const [ContentComp, setContentComp] = useState<React.ComponentType<any> | null>(null);
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);

  // If no hash present, set it to the default tab
  useEffect(() => {
    if (!window.location.hash) {
      const normalized = normalize(selected);
      window.history.replaceState(null, "", `#${normalized}`);
    }
  }, []);

  // Load the MDX component when tab changes
  useEffect(() => {
    const path = options[selected];
    const entry = mdxMap[path];
    if (entry) {
      setContentComp(() => entry);
    } else {
      setContentComp(() => () => <p>Could not find content for <code>{path}</code>.</p>);
    }
  }, [selected, options]);

  // Scroll to heading in hash when content renders or hash changes
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 0);
      }
    };
    window.addEventListener("hashchange", scrollToHash);
    setTimeout(scrollToHash, 0);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [ContentComp]);

  // Build TOC from rendered headings
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll(".markdown-content h2, .markdown-content h3, .markdown-content h4")
    );
    const newToc = headings.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: parseInt(el.tagName[1], 10),
    }));
    setToc(newToc);
  }, [ContentComp]);

  // Update tab and hash when button clicked
  const handleTabClick = (label: string) => {
    setSelected(label);
    window.history.replaceState(null, "", `#${normalize(label)}`);
  };

  return (
    <div className="dynamic-markdown-selector">
      <hr className="selector-divider" />
      <div className="selector-tiles">
        {labels.map((label) => (
          <button
            key={label}
            className={`selector-tile${selected === label ? " selected" : ""}`}
            onClick={() => handleTabClick(label)}
            type="button"
          >
            <span>{label}</span>
          </button>
        ))}
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
  );
};

export default DynamicMarkdownSelector;