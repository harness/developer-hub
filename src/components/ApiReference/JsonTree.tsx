import React, { useState } from 'react';
import styles from './styles.module.css';

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

/** Render a single JSON value (recursively). depth=0 is the root. */
function JsonNode({
  value,
  depth,
  isLast,
}: {
  value: JsonValue;
  depth: number;
  isLast: boolean;
}): React.ReactElement {
  // Auto-expand for the first two levels, collapse beyond that
  const [open, setOpen] = useState(depth < 2);
  const comma = isLast ? '' : ',';

  // ── Primitives ──
  if (value === null) {
    return (
      <span>
        <span className={styles.jsonNull}>null</span>
        {comma}
      </span>
    );
  }
  if (typeof value === 'boolean') {
    return (
      <span>
        <span className={styles.jsonBool}>{String(value)}</span>
        {comma}
      </span>
    );
  }
  if (typeof value === 'number') {
    return (
      <span>
        <span className={styles.jsonNumber}>{value}</span>
        {comma}
      </span>
    );
  }
  if (typeof value === 'string') {
    return (
      <span>
        <span className={styles.jsonString}>&quot;{value}&quot;</span>
        {comma}
      </span>
    );
  }

  // ── Array ──
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span>{'[]'}{comma}</span>;
    }
    return (
      <span className={styles.jsonCollapsible}>
        <button
          type="button"
          className={styles.jsonToggle}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Collapse array' : 'Expand array'}
        >
          {open ? '▾' : '▸'}
        </button>
        {open ? (
          <>
            {'['}
            <div className={styles.jsonIndent}>
              {value.map((v, i) => (
                <div key={`${i}-${typeof v === 'object' ? i : String(v)}`}>
                  <JsonNode value={v} depth={depth + 1} isLast={i === value.length - 1} />
                </div>
              ))}
            </div>
            {']'}{comma}
          </>
        ) : (
          <span className={styles.jsonSummary}>
            [{value.length} {value.length === 1 ? 'item' : 'items'}]{comma}
          </span>
        )}
      </span>
    );
  }

  // ── Object ──
  const entries = Object.entries(value as JsonObject);
  if (entries.length === 0) {
    return <span>{'{}'}{comma}</span>;
  }
  return (
    <span className={styles.jsonCollapsible}>
      <button
        type="button"
        className={styles.jsonToggle}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Collapse object' : 'Expand object'}
      >
        {open ? '▾' : '▸'}
      </button>
      {open ? (
        <>
          {'{'}
          <div className={styles.jsonIndent}>
            {entries.map(([k, v], i) => (
              <div key={k}>
                <span className={styles.jsonKey}>&quot;{k}&quot;</span>
                <span className={styles.jsonColon}>: </span>
                <JsonNode value={v} depth={depth + 1} isLast={i === entries.length - 1} />
              </div>
            ))}
          </div>
          {'}'}{comma}
        </>
      ) : (
        <span className={styles.jsonSummary}>
          {'{'}
          {entries
            .slice(0, 3)
            .map(([k]) => `"${k}"`)
            .join(', ')}
          {entries.length > 3 ? ', …' : ''}
          {'}'}{comma}
        </span>
      )}
    </span>
  );
}

interface JsonTreeProps {
  /** Raw JSON string (may include a leading comment line like "// Sample response") */
  raw: string;
  className?: string;
}

/**
 * Collapsible JSON tree renderer.
 * Falls back to a plain <pre> block when the input is not parseable JSON.
 */
export default function JsonTree({ raw, className }: JsonTreeProps): React.ReactElement {
  // Strip leading comment line (e.g. "// Sample response\n")
  const stripped = raw.replace(/^\/\/[^\n]*\n?/, '').trim();

  let parsed: JsonValue | undefined;
  try {
    parsed = JSON.parse(stripped) as JsonValue;
  } catch {
    // Not valid JSON — render as plain pre
    return <pre className={className}>{raw}</pre>;
  }

  return (
    <div className={`${styles.jsonTree} ${className ?? ''}`}>
      <JsonNode value={parsed} depth={0} isLast={true} />
    </div>
  );
}
