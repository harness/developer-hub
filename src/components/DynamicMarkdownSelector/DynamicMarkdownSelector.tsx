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
      <label>
        <strong>Select format: </strong>
        <select value={selected} onChange={e => setSelected(e.target.value)}>
          {labels.map(label => (
            <option key={label} value={label}>{label}</option>
          ))}
        </select>
      </label>
      <div className="markdown-content">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default DynamicMarkdownSelector;
