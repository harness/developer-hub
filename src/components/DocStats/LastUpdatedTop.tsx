import React from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";

function formatDateLong(ts: number | string | undefined): string | null {
  if (!ts) return null;
  let date: Date;
  if (typeof ts === "number") {
    date = new Date(ts < 1e12 ? ts * 1000 : ts);
  } else {
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return null;
    date = d;
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function LastUpdatedTop() {
  let metadata: any | undefined;
  try {
    ({ metadata } = useDoc());
  } catch {
    return null; // not a docs route
  }

  // Try both common Docusaurus fields for published date
  const published = formatDateLong(metadata?.date || metadata?.createdAt);
  const updated = formatDateLong(metadata?.lastUpdatedAt);

  if (!published && !updated) return null;

  return (
    <div
      style={{
        marginTop: "-0.5rem",
        marginBottom: "1rem",
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "var(--ifm-color-emphasis-700)",
      }}
      aria-label="Document last updated date"
      data-testid="last-updated-top"
    >
      {updated && <span>{`Updated on ${updated}`}</span>}
      {updated && published && <span>{" • "}</span>}
      {published && <span>{`Published on ${published}`}</span>}
    </div>
  );
}
