/*
 * DynamicMarkdownSelector Component
 *
 * Renders a row of selectable tiles. When a tile is selected, it fetches and displays markdown content from a corresponding path.
 *
 * Props:
 *   options: Record<string, string>
 *     - An object where each key is a label for a selector tile, and each value is a URL/path to a markdown file.
 *
 * Usage Example:
 *
 * import { DynamicMarkdownSelector } from './DynamicMarkdownSelector';
 *
 * <DynamicMarkdownSelector
 *   options={{
 *     Docker: '/docs/artifact-registry/docker.md',
 *     Maven: '/docs/artifact-registry/maven.md',
 *     Python: '/docs/artifact-registry/python.md',
 *   }}
 * />
 */

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./DynamicMarkdownSelector.css";

export interface DynamicMarkdownSelectorProps {
  options: Record<string, string>;
}

const DynamicMarkdownSelector: React.FC<DynamicMarkdownSelectorProps> = ({
  options,
}) => {
  const labels = Object.keys(options);

  // Helper to normalize hash and label for comparison
  const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, "");

  // Create slug from heading text (same algo used in TOC & rendered headings)
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  // Get initial selection from hash, or default to first label
  const getInitialSelected = () => {
    const hash = window.location.hash.replace("#", "");
    const match = labels.find((label) => normalize(label) === normalize(hash));
    return match || labels[0];
  };

  const [selected, setSelected] = useState(getInitialSelected());
  const [markdown, setMarkdown] = useState("");
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

  // Update hash in URL when selection changes
  useEffect(() => {
    const normalized = normalize(selected);
    if (normalized !== window.location.hash.replace("#", "")) {
      window.location.hash = normalized;
    }
  }, [selected]);

  useEffect(() => {
    const fetchMarkdown = async () => {
      const path = options[selected];
      try {
        const response = await fetch(path);
        const text = await response.text();
        setMarkdown(text);
      } catch (e) {
        setMarkdown("Error loading content.");
      }
    };
    fetchMarkdown();
  }, [selected, options]);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        // Try scrolling after a tick, to ensure DOM is updated
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 0);
      }
    };
    window.addEventListener("hashchange", scrollToHash);
    // Run once after new markdown loads
    setTimeout(scrollToHash, 0);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [markdown]);

  // Build TOC whenever markdown string changes
  useEffect(() => {
    const headingRegex = /^(#{2,6})\s+(.*)$/gm; // capture headings ## and deeper
    const newToc: { id: string; text: string; level: number }[] = [];

    let match;
    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length; // number of # signs
      const text = match[2].trim();
      const id = slugify(text);
      newToc.push({ id, text, level });
    }
    setToc(newToc);
  }, [markdown]);

  return (
    <div className="dynamic-markdown-selector">
      <hr className="selector-divider" />
      <div className="selector-tiles">
        {labels.map((label) => (
          <button
            key={label}
            className={`selector-tile${selected === label ? " selected" : ""}`}
            onClick={() => setSelected(label)}
            type="button"
          >
            <span>{label}</span>
          </button>
        ))}
      </div>
      {/* Right‑hand runtime TOC */}
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
        <ReactMarkdown
          components={{
            h2: ({ node, children, ...props }) => {
              const text = Array.isArray(children) ? children.join(" ") : String(children);
              const id = slugify(text);
              return (
                <h2 id={id} {...props}>
                  {children}
                </h2>
              );
            },
            h3: ({ node, children, ...props }) => {
              const text = Array.isArray(children) ? children.join(" ") : String(children);
              const id = slugify(text);
              return (
                <h3 id={id} {...props}>
                  {children}
                </h3>
              );
            },
            h4: ({ node, children, ...props }) => {
              const text = Array.isArray(children) ? children.join(" ") : String(children);
              const id = slugify(text);
              return (
                <h4 id={id} {...props}>
                  {children}
                </h4>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
      <hr className="selector-divider" />
    </div>
  );
};

export default DynamicMarkdownSelector;