import React from "react";
import "./tooltip.css";
import dict from "./tooltips.json";

type TooltipProps = {
  /** Dot-path id, e.g., "iacm.provider-registry.gpg-key". */
  id: string;
  /** Visible doc text. */
  children: React.ReactNode;
};

function lookup(path: string): string | null {
  // Dot-path resolution: "a.b.c".
  const parts = path.split(".");
  let node: any = dict as any;
  for (const p of parts) {
    if (node && typeof node === "object" && p in node) {
      node = node[p];
    } else {
      node = null;
      break;
    }
  }
  if (typeof node === "string") return node;

  // Fallbacks:
  // 1) Try under "iacm" root in case a plain id was used (e.g., "gpg-key").
  if ((dict as any).iacm && (dict as any).iacm[path]) {
    const val = (dict as any).iacm[path];
    if (typeof val === "string") return val;
  }
  // 2) Try last segment under "iacm" (e.g., "provider-registry.gpg-key" -> "gpg-key").
  const last = parts[parts.length - 1];
  if ((dict as any).iacm && (dict as any).iacm[last]) {
    const val = (dict as any).iacm[last];
    if (typeof val === "string") return val;
  }

  return null;
}

export default function Tooltip({ id, children }: TooltipProps) {
  const text = lookup(id);

  if (!text) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`[Tooltip] Missing tooltip id "${id}". Rendering plain content.`);
    }
    return <>{children}</>;
  }

  return (
    <span className="tooltip-wrapper" aria-label={typeof children === "string" ? (children as string) : undefined}>
      <span className="tooltip-label">{children}</span>
      <span className="tooltip-text" role="tooltip">{text}</span>
    </span>
  );
}