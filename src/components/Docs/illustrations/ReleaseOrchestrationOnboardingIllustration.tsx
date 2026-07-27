import React from "react";
import styles from "./releaseOrchestrationOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Release Orchestration module landing page.
 *
 * Mirrors the core Release Orchestration workflow as a five-stage journey:
 *   1. Plan multi-service release  - lay out the release timeline up front
 *   2. Map service dependencies    - understand how services relate to each other
 *   3. Coordinate approvals        - route the release through sign-off
 *   4. Execute release train       - roll the coordinated release out
 *   5. Track rollout status        - monitor the outcome across services
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the FME, AI DLC
 * Insights, and IaCM illustrations. The one piece of JS is a shared
 * IntersectionObserver hook (./shared/usePauseWhenOffscreen) that pauses all
 * animation while the illustration is scrolled out of view. Shared timing
 * (single $cycle/beat/fire clock) and color-free keyframe shapes live in
 * ./shared/_motion.scss.
 */
export default function ReleaseOrchestrationOnboardingIllustration() {
  const { ref, visible } = usePauseWhenOffscreen<SVGSVGElement>();

  return (
    <svg
      ref={ref}
      className={`${styles.illustration} ${visible ? "" : styles.paused}`}
      viewBox="0 0 860 270"
      width="860"
      height="270"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Animated diagram of the Release Orchestration onboarding flow: plan a multi-service release, map service dependencies, coordinate approvals, execute the release train, then track rollout status."
    >
      <defs>
        <linearGradient id="rmGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#62F91F" />
          <stop offset="100%" stopColor="#45BD35" />
        </linearGradient>
      </defs>

      {/* backbone connector - gapped at each node so the line reads as a
          connector between stages, not an overlay running through them */}
      <line x1="148" y1="140" x2="242" y2="140" className={styles.connectorLine} />
      <line x1="318" y1="140" x2="412" y2="140" className={styles.connectorLine} />
      <line x1="488" y1="140" x2="572" y2="140" className={styles.connectorLine} />
      <line x1="648" y1="140" x2="732" y2="140" className={styles.connectorLine} />

      {/* traveling pulse */}
      <circle cx="110" cy="140" r="6" className={styles.travelDot} />

      {/* Stage 1 - Plan multi-service release */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <rect x="92" y="118" width="36" height="30" rx="4" className={styles.iconStroke} />
        {/* solid color, not the gradient: purely horizontal tick marks have a
            zero-height bounding box, which makes an objectBoundingBox
            gradient render invisible in some SVG engines */}
        <line x1="99" y1="128" x2="112" y2="128" className={`${styles.tickLine} ${styles.tick1}`} />
        <line x1="99" y1="136" x2="121" y2="136" className={`${styles.tickLine} ${styles.tick2}`} />
        <line x1="99" y1="144" x2="116" y2="144" className={`${styles.tickLine} ${styles.tick3}`} />
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Plan multi-service release
        </text>
      </g>

      {/* Stage 2 - Map service dependencies */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <line x1="280" y1="116" x2="264" y2="144" className={styles.iconStroke} />
        <line x1="280" y1="116" x2="296" y2="144" className={styles.iconStroke} />
        {/* solid color, not the gradient: a purely horizontal line has a
            zero-height bounding box, which makes an objectBoundingBox
            gradient render invisible in some SVG engines */}
        <line x1="264" y1="144" x2="296" y2="144" className={styles.graphLine} />
        <circle cx="280" cy="116" r="6" fill="url(#rmGrad)" className={`${styles.graphNode} ${styles.graphNode1}`} />
        <circle cx="264" cy="144" r="6" fill="url(#rmGrad)" className={`${styles.graphNode} ${styles.graphNode2}`} />
        <circle cx="296" cy="144" r="6" fill="url(#rmGrad)" className={`${styles.graphNode} ${styles.graphNode3}`} />
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Map service dependencies
        </text>
      </g>

      {/* Stage 3 - Coordinate approvals */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <path d="M434 142 L441 149 L456 128" className={styles.checkMark} />
        <path d="M448 126 L452 130 L460 118" className={`${styles.checkMark} ${styles.checkMarkDelay}`} />
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Coordinate approvals
        </text>
      </g>

      {/* Stage 4 - Execute release train */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <rect x="585" y="133" width="14" height="14" rx="3" className={styles.iconStroke} />
        <rect x="603" y="133" width="14" height="14" rx="3" fill="url(#rmGrad)" className={styles.trainCarHighlight} />
        <rect x="621" y="133" width="14" height="14" rx="3" className={styles.iconStroke} />
        {/* solid color, not the gradient: purely horizontal connector lines
            have a zero-height bounding box, which makes an
            objectBoundingBox gradient render invisible in some SVG engines */}
        <line x1="599" y1="140" x2="603" y2="140" className={styles.trainConnector} />
        <line x1="617" y1="140" x2="621" y2="140" className={styles.trainConnector} />
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Execute release train
        </text>
      </g>

      {/* Stage 5 - Track rollout status */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <rect x="750" y="148" width="6" height="10" fill="url(#rmGrad)" className={`${styles.rolloutBar} ${styles.rolloutBar1}`} />
        <rect x="759" y="142" width="6" height="16" fill="url(#rmGrad)" className={`${styles.rolloutBar} ${styles.rolloutBar2}`} />
        <rect x="768" y="136" width="6" height="22" fill="url(#rmGrad)" className={`${styles.rolloutBar} ${styles.rolloutBar3}`} />
        <rect x="777" y="130" width="6" height="28" fill="url(#rmGrad)" className={`${styles.rolloutBar} ${styles.rolloutBar4}`} />
        <text x="770" y="204" textAnchor="middle" className={styles.label}>
          Track rollout status
        </text>
      </g>
    </svg>
  );
}
