/**
 * ModuleLandingPageAnimation
 *
 * A reusable animated journey component for Harness module landing pages.
 * Displays a staggered (zigzag) path of workflow steps that animate one-by-one,
 * looping a single randomly-chosen sequence for the entire browser session.
 *
 * Features
 * ────────
 * • Zigzag node layout — alternating elevated/lowered positions for a journey feel
 * • Diagonal animated connectors — rotated div bars with CSS fill transitions
 * • Per-step icons — accepts any React.ReactNode (emoji, FontAwesome <i>, SVG, <img>)
 * • Named sequences — one is chosen at random and stored in sessionStorage
 *   so the same sequence plays for the whole session without changing on reload
 * • Module colour map — maps MODULES enum values to their CSS custom properties
 * • BrowserOnly wrapper — safe for Docusaurus SSR
 * • prefers-reduced-motion support
 */

import React, { useEffect, useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import { MODULES } from '@site/src/constants';
import styles from './ModuleLandingPageAnimation.module.scss';

// ─────────────────────────────────────────────────────────────────────────────
// Module → CSS custom-property colour map
// Extend this as more landing pages adopt the component.
// ─────────────────────────────────────────────────────────────────────────────
export const MODULE_COLORS: Partial<Record<MODULES, string>> = {
  [MODULES.iacm]:     'var(--mod-iacm-200)',
  [MODULES.ci]:       'var(--mod-ci-200)',
  [MODULES.cd]:       'var(--mod-cd-200)',
  [MODULES.cde]:      'var(--mod-cde-200)',
  [MODULES.ccm]:      'var(--mod-ccm-200)',
  [MODULES.ff]:       'var(--mod-ff-200)',
  [MODULES.sto]:      'var(--mod-sto-200)',
  [MODULES.ssca]:     'var(--mod-ssca-200)',
  [MODULES.idp]:      'var(--mod-idp-200)',
  [MODULES.sei]:      'var(--mod-sei-200)',
  [MODULES.dbdevops]: 'var(--mod-dbdevops-200)',
  [MODULES.code]:     'var(--mod-code-200)',
  [MODULES.ar]:       'var(--mod-ar-200)',
};

// ─────────────────────────────────────────────────────────────────────────────
// Public types
// ─────────────────────────────────────────────────────────────────────────────
export interface WorkflowStep {
  /** Short label shown below the step circle */
  label: string;
  /** Optional smaller subtitle (hidden on mobile) */
  sublabel?: string;
  /** Clicking the step navigates here */
  link?: string;
  /**
   * Icon rendered inside the circle.
   * Accepts any React.ReactNode — emoji string, <i className="fa-solid fa-..."/>,
   * <img src="...">, or any SVG/component.
   */
  icon?: React.ReactNode;
}

export interface WorkflowSequence {
  /** Title shown above the animation — describes this sequence's theme */
  title: string;
  steps: WorkflowStep[];
}

export interface ModuleLandingPageAnimationProps {
  sequences: WorkflowSequence[];
  /**
   * CSS colour for the active path/nodes.
   * Use `MODULE_COLORS[MODULES.iacm] ?? 'var(--mod-iacm-200)'` (etc.)
   * so the value is always a defined string even when the map has no entry.
   */
  color: string;
  /** Milliseconds each step is highlighted before advancing. Default 2000. */
  stepDuration?: number;
  /**
   * Horizontal inset (px) from each canvas edge when placing nodes.
   * Sets both `startInset` and `endInset` when they are omitted.
   * Insets align to the outer edge of the first/last node circles.
   * Default: NODE_R (20).
   */
  horizontalInset?: number;
  /** Inset (px) from the canvas start edge to the first node circle. Default: `horizontalInset` or NODE_R. */
  startInset?: number;
  /** Inset (px) from the canvas end edge to the last node circle. Default: `horizontalInset` or NODE_R. */
  endInset?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout constants (px)
// ─────────────────────────────────────────────────────────────────────────────
const ELEVATED_CY = 24;   // centre-Y of "high" nodes
const LOWERED_CY  = 68;   // centre-Y of "low" nodes
const NODE_R      = 20;   // node radius (diameter 40px)
const CONN_H      = 4;    // connector bar height
const CANVAS_H    = 148;  // total canvas height (nodes + label space)
const MAX_STEPS   = 6;    // hard cap on nodes per sequence (layout + label spacing tuned for ≤6)

function getNodeCY(stepIndex: number): number {
  return stepIndex % 2 === 0 ? ELEVATED_CY : LOWERED_CY;
}

function getNodeCX(
  stepIndex: number,
  totalSteps: number,
  leftCenterX: number,
  rightCenterX: number,
): number {
  // leftCenterX / rightCenterX are the x-coordinates of the first and last node
  // centers; interior nodes interpolate evenly between them.
  const frac = totalSteps === 1 ? 0.5 : stepIndex / (totalSteps - 1);
  return leftCenterX + frac * (rightCenterX - leftCenterX);
}

// ─────────────────────────────────────────────────────────────────────────────
// Inner component — rendered client-side only
// ─────────────────────────────────────────────────────────────────────────────
type Phase = 'animating' | 'done';

function Inner({
  sequences,
  color,
  stepDuration = 2000,
  horizontalInset = NODE_R,
  startInset,
  endInset,
}: ModuleLandingPageAnimationProps) {
  const resolvedStartInset = startInset ?? horizontalInset;
  const resolvedEndInset   = endInset ?? horizontalInset;
  const canvasRef                 = useRef<HTMLDivElement>(null);
  const [canvasW, setCanvasW]     = useState(0);
  const [completed, setCompleted] = useState(0);
  const [phase, setPhase]         = useState<Phase>('animating');

  // Pick one sequence randomly per browser session; stable across re-renders.
  // The key encodes the module colour (unique per module) + sequence count so
  // two different module pages can never share the same sessionStorage slot.
  const [seqIdx] = useState(() => {
    const colorSlug = color.replace(/[^a-z0-9]/gi, '');
    const key       = `mlpa-${colorSlug}-${sequences.length}`;
    const stored    = sessionStorage.getItem(key);
    if (stored !== null) {
      const idx = parseInt(stored, 10);
      if (!isNaN(idx) && idx >= 0 && idx < sequences.length) return idx;
    }
    const picked = Math.floor(Math.random() * sequences.length);
    sessionStorage.setItem(key, String(picked));
    return picked;
  });

  const currentSeq = sequences[seqIdx];
  // Cap at MAX_STEPS: the zigzag layout and label spacing are tuned for ≤6 nodes.
  // Slice so production never renders an overcrowded row; warn in dev so an author
  // who overfills a sequence notices instead of finding out visually.
  if (
    process.env.NODE_ENV !== 'production' &&
    currentSeq.steps.length > MAX_STEPS
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      `[ModuleLandingPageAnimation] Sequence "${currentSeq.title}" has ` +
        `${currentSeq.steps.length} steps; capping at ${MAX_STEPS}. ` +
        `Trim the sequence in its config.`,
    );
  }
  const steps = currentSeq.steps.slice(0, MAX_STEPS);
  const n     = steps.length;

  // ── Measure canvas width (responsive) ──────────────────────────────────────
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    setCanvasW(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(entries => {
      if (entries[0]) setCanvasW(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Animation state machine ─────────────────────────────────────────────────
  // Plays through the sequence once then stops at the finished state.
  useEffect(() => {
    if (phase !== 'animating') return;

    if (completed < n) {
      // Advance one step after stepDuration ms
      const t = setTimeout(() => setCompleted(c => c + 1), stepDuration);
      return () => clearTimeout(t);
    } else {
      // All steps lit — move to the final done state immediately
      setPhase('done');
    }
  }, [phase, completed, n, stepDuration]);

  // ── Label width budget ──────────────────────────────────────────────────────
  // Every label is centered on its node. The first/last labels therefore extend
  // half their width past the end nodes, so the label budget feeds directly into
  // where those nodes can sit (below).
  const slotW     = n > 1 ? canvasW / n : canvasW;
  const labelMaxW = Math.max(104, slotW * 0.92);
  const labelHalf = labelMaxW / 2;

  // ── Computed geometry ───────────────────────────────────────────────────────
  // Inset the first/last node centers by at least half a label so the centered
  // end captions reach — but never exceed — the canvas edges. The node line is
  // thus narrower than the canvas, and the overall animation width tracks the
  // outer reach of the first and last node text. Clamp each inset to canvasW/2 so
  // the bounds can never cross on very narrow (mobile) widths.
  const minLeftInset  = Math.max(resolvedStartInset + NODE_R, labelHalf);
  const minRightInset = Math.max(resolvedEndInset + NODE_R, labelHalf);
  const leftCenterX   = Math.min(minLeftInset, canvasW / 2);
  const rightCenterX  = canvasW - Math.min(minRightInset, canvasW / 2);

  const positions = steps.map((_, i) => ({
    cx: getNodeCX(i, n, leftCenterX, rightCenterX),
    cy: getNodeCY(i),
  }));

  const connectors = steps.slice(0, -1).map((_, i) => {
    const { cx: x1, cy: y1 } = positions[i];
    const { cx: x2, cy: y2 } = positions[i + 1];
    const dx       = x2 - x1;
    const dy       = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle    = Math.atan2(dy, dx) * (180 / Math.PI);
    const filled   = completed > i;
    return { x1, y1, distance, angle, filled };
  });

  const isSequenceDone = phase === 'done';

  return (
    <div
      className={styles.wrapper}
      style={{ '--workflow-color': color } as React.CSSProperties}
      aria-label={`${currentSeq.title} workflow`}
    >
      {/* ── Sequence title ──────────────────────────────────────────────── */}
      <div className={[styles.sequenceTitle, styles.titleVisible].join(' ')}>
        {currentSeq.title}
      </div>

      {/* ── Animation canvas ─────────────────────────────────────────────── */}
      <div
        ref={canvasRef}
        className={styles.canvas}
        style={{ height: CANVAS_H }}
      >
        {canvasW > 0 && (
          <>
            {/* Connector tracks + fills */}
            {connectors.map((c, i) => (
              <div
                key={`conn-${i}`}
                className={styles.connTrack}
                style={{
                  left:            c.x1,
                  top:             c.y1 - CONN_H / 2,
                  width:           c.distance,
                  height:          CONN_H,
                  transform:       `rotate(${c.angle}deg)`,
                  transformOrigin: 'left center',
                }}
              >
                <div
                  className={[
                    styles.connFill,
                    c.filled ? styles.connFillActive : '',
                  ].join(' ')}
                />
              </div>
            ))}

            {/* Step nodes + labels */}
            {steps.map((step, i) => {
              const { cx, cy } = positions[i];
              const stepDone      = i < completed;
              const isCurrent     = i === completed && completed < n;
              // Last node while active: white fill + spinning arc instead of pulse
              const isLastCurrent = isCurrent && i === n - 1;
              // Last node once fully done: solid colour + check + ring burst
              const isFinished    = isSequenceDone && i === n - 1;

              const LabelEl: React.ElementType = step.link ? Link : 'div';
              const linkProps = step.link ? { to: step.link } : {};

              // Override the final node's icon with a checkmark on completion
              const icon = isFinished
                ? <i className="fa-solid fa-check" aria-hidden="true" />
                : step.icon;

              return (
                <React.Fragment key={`step-${i}`}>
                  {/* Circle */}
                  <div
                    className={[
                      styles.node,
                      stepDone        ? styles.nodeDone        : '',
                      // Normal mid-journey pulse — skip for the last node
                      isCurrent && !isLastCurrent ? styles.nodeCurrent    : '',
                      // Last node while active: white + spinner
                      isLastCurrent   ? styles.nodeLastCurrent : '',
                      // Last node once done: solid colour + ring burst
                      isFinished      ? styles.nodeFinished    : '',
                    ].filter(Boolean).join(' ')}
                    style={{
                      left:   cx - NODE_R,
                      top:    cy - NODE_R,
                      width:  NODE_R * 2,
                      height: NODE_R * 2,
                    }}
                    aria-label={step.label}
                  >
                    {icon != null
                      ? <span className={styles.nodeIcon}>{icon}</span>
                      : <span className={styles.nodeNum}>{i + 1}</span>
                    }
                  </div>

                  {/* Label — clickable if step has a link */}
                  {/* @ts-ignore polymorphic element */}
                  <LabelEl
                    {...linkProps}
                    className={[
                      styles.stepLabel,
                      stepDone || isCurrent ? styles.labelActive  : '',
                      isCurrent             ? styles.labelCurrent : '',
                    ].filter(Boolean).join(' ')}
                    style={{
                      // Every label is centered on its node's x (SCSS adds
                      // translateX(-50%)). The end nodes are inset by half a label
                      // (see geometry above), so the centered first/last captions
                      // land flush with the canvas edges without clipping.
                      left:     cx,
                      top:      cy + NODE_R + 6,
                      maxWidth: labelMaxW,
                    }}
                  >
                    <span className={styles.labelText}>{step.label}</span>
                    {step.sublabel && (
                      <span className={styles.sublabel}>{step.sublabel}</span>
                    )}
                  </LabelEl>
                </React.Fragment>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Public export — BrowserOnly wrapper for Docusaurus SSR safety
// ─────────────────────────────────────────────────────────────────────────────
export default function ModuleLandingPageAnimation(props: ModuleLandingPageAnimationProps) {
  return (
    <BrowserOnly fallback={<div style={{ height: CANVAS_H + 40 }} />}>
      {() => <Inner {...props} />}
    </BrowserOnly>
  );
}
