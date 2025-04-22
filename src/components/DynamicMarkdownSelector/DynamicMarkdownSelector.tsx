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

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './DynamicMarkdownSelector.css';

export interface DynamicMarkdownSelectorProps {
  options: Record<string, string>;
}

const DynamicMarkdownSelector: React.FC<DynamicMarkdownSelectorProps> = ({ options }) => {
  const labels = Object.keys(options);
  const [selected, setSelected] = useState(labels[0]);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      const path = options[selected];
      try {
        const response = await fetch(path);
        const text = await response.text();
        setMarkdown(text);
      } catch (e) {
        setMarkdown('Error loading content.');
      }
    };
    fetchMarkdown();
  }, [selected, options]);

  return (
    <div className="dynamic-markdown-selector">
      <hr className="selector-divider" />
      <div className="selector-tiles">
        {labels.map(label => (
          <button
            key={label}
            className={`selector-tile${selected === label ? ' selected' : ''}`}
            onClick={() => setSelected(label)}
            type="button"
          >
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div className="markdown-content">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <hr className="selector-divider" />
    </div>
  );
};

export default DynamicMarkdownSelector;
