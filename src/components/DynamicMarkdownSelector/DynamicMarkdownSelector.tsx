/**
 * DynamicMarkdownSelector Component
 *
 * Renders a row of selectable tiles. When a tile is selected, it renders an imported MDX module from src/content.
 *
 * Props:
 *   options: Record<string, string>
 *     - Each key is a tab label (e.g. Docker), and each value is the path relative to src/content (e.g. '/artifact-registry/docker.mdx').
 *
 * Usage Example:
 *
 * <DynamicMarkdownSelector
 *   options={{
 *     Docker: '/artifact-registry/docker.mdx',
 *     Maven: '/artifact-registry/maven.mdx',
 *     Python: '/artifact-registry/python.mdx',
 *   }}
 * />
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
import DocVideo from '@site/src/components/DocVideo';
import "./DynamicMarkdownSelector.css";

// Load MDX modules from src/content (must use .default when importing via require.context)
const mdxCtx = require.context("@site/src/content", true, /\.mdx?$/);

const mdxMap: Record<string, React.ComponentType<any>> = {};
mdxCtx.keys().forEach((key: string) => {
  const normalized = '/' + key.replace('./', '');
  mdxMap[normalized] = mdxCtx(key).default;
});

export interface DynamicMarkdownSelectorProps {
  options: Record<string, string>; // { label: '/artifact-registry/docker.mdx' }
}

const DynamicMarkdownSelector: React.FC<DynamicMarkdownSelectorProps> = ({ options }) => {
  const labels = Object.keys(options);
  const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, "");

  // 1. Get selection from hash on first load
  const getInitialSelected = () => {
    const hash = window.location.hash.replace("#", "");
    const match = labels.find((label) => normalize(label) === normalize(hash));
    return match || labels[0];
  };

  const [selected, setSelected] = useState(getInitialSelected());
  const [ContentComp, setContentComp] = useState<React.ComponentType<any> | null>(null);

  // If no hash is present, update the URL to reflect the default tab
useEffect(() => {
  if (!window.location.hash) {
    const normalized = normalize(selected);
    window.history.replaceState(null, "", `#${normalized}`);
  }
}, []);

  // 2. Load MDX component based on current tab
  useEffect(() => {
    const path = options[selected];
    const entry = mdxMap[path];
    if (entry) {
      setContentComp(() => entry);
    } else {
      setContentComp(() => () => <p>Could not find content for <code>{path}</code>.</p>);
    }
  }, [selected, options]);

  // 3. Update hash manually without triggering a loop
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

      <div className="markdown-content">
        {ContentComp && <ContentComp components={{ Tabs, TabItem, DocVideo }} />}
      </div>

      <hr className="selector-divider" />
    </div>
  );
};

export default DynamicMarkdownSelector;