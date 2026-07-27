import React from "react";
import styles from "./securityTestingOrchestrationOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Security Testing Orchestration (STO) module
 * landing page.
 *
 * Mirrors the module's real workflow:
 *   1. Trigger scan in pipeline  - a security scan kicks off as part of the
 *      pipeline run
 *   2. Run scanners in parallel  - multiple scan engines run concurrently
 *   3. Deduplicate findings      - overlapping results from different
 *      scanners are merged into a single finding
 *   4. Prioritize by risk        - findings are ranked, then forked into a
 *      low-risk (muted) path and a critical (bright) path
 *   5. Enforce policy gate       - a governance gate blocks or allows the
 *      pipeline based on policy
 *
 * All motion is done entirely with CSS keyframes on plain SVG shapes (no
 * JS/animation library), matching the pattern used for the FME, IaCM,
 * Database DevOps, and Continuous Integration illustrations. The one piece
 * of JS is a shared IntersectionObserver hook (./shared/usePauseWhenOffscreen)
 * that pauses all animation while the illustration is scrolled out of view.
 * Shared timing (single $cycle/beat/fire clock) and color-free keyframe
 * shapes live in ./shared/_motion.scss.
 */
export default function SecurityTestingOrchestrationOnboardingIllustration() {
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
      aria-label="Animated diagram of the Security Testing Orchestration onboarding flow: trigger a scan in the pipeline, run scanners in parallel, deduplicate findings, prioritize findings by risk with critical issues routed to a bright path and low risk issues routed to a muted path, then enforce a policy gate."
    >
      <defs>
        <linearGradient id="stoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4791FF" />
          <stop offset="100%" stopColor="#2E1CF3" />
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

      {/* Stage 1 - Trigger scan in pipeline */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <g className={styles.triggerPulse}>
          <path d="M100 122 L100 158 L124 140 Z" className={styles.playIcon} />
        </g>
        <line x1="94" y1="150" x2="126" y2="150" className={styles.shaftLine} />
        <text x="110" y="200" textAnchor="middle" className={styles.label}>
          Trigger scan in
        </text>
        <text x="110" y="214" textAnchor="middle" className={styles.label}>
          pipeline
        </text>
      </g>

      {/* Stage 2 - Run scanners in parallel */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <line x1="264" y1="144" x2="271" y2="144" className={styles.shaftLine} />
        <line x1="276" y1="138" x2="283" y2="138" className={styles.shaftLine} />
        <line x1="288" y1="142" x2="295" y2="142" className={styles.shaftLine} />
        <rect x="264" y="148" width="7" height="10" rx="1.5" fill="url(#stoGrad)" className={`${styles.scanBar} ${styles.scanBar1}`} />
        <rect x="276" y="142" width="7" height="16" rx="1.5" fill="url(#stoGrad)" className={`${styles.scanBar} ${styles.scanBar2}`} />
        <rect x="288" y="146" width="7" height="12" rx="1.5" fill="url(#stoGrad)" className={`${styles.scanBar} ${styles.scanBar3}`} />
        <text x="280" y="200" textAnchor="middle" className={styles.label}>
          Run scanners in
        </text>
        <text x="280" y="214" textAnchor="middle" className={styles.label}>
          parallel
        </text>
      </g>

      {/* Stage 3 - Deduplicate findings (two paths merge into one) */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <path d="M432 120 L450 138" className={styles.mergePathMuted} fill="none" />
        <path d="M432 160 L450 142" className={styles.mergePathMuted} fill="none" />
        <path d="M450 140 L472 140" className={styles.mergePathBright} fill="none" />
        <circle cx="450" cy="140" r="4" className={styles.mergeDot} />
        <text x="450" y="200" textAnchor="middle" className={styles.label}>
          Deduplicate
        </text>
        <text x="450" y="214" textAnchor="middle" className={styles.label}>
          findings
        </text>
      </g>

      {/* Stage 4 - Prioritize by risk (low risk vs critical fork) */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <rect x="594" y="150" width="7" height="8" rx="1.5" className={styles.riskBarLow} />
        <rect x="606" y="144" width="7" height="14" rx="1.5" className={styles.riskBarMed} />
        <rect x="618" y="132" width="7" height="26" rx="1.5" fill="url(#stoGrad)" className={styles.riskBarHigh} />
        <text x="610" y="200" textAnchor="middle" className={styles.label}>
          Prioritize by
        </text>
        <text x="610" y="214" textAnchor="middle" className={styles.label}>
          risk
        </text>

        {/* fork explanation: low risk fades, critical glows */}
        <path
          d="M598 110 C 566 92, 546 82, 526 72"
          className={styles.forkPathMuted}
          fill="none"
        />
        <path
          d="M622 110 C 654 92, 674 82, 694 72"
          className={styles.forkPathBright}
          fill="none"
        />
        <g className={styles.lowRiskTag}>
          <rect x="466" y="46" width="120" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="526" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Low risk
          </text>
        </g>
        <g className={styles.criticalTag}>
          <rect x="634" y="46" width="120" height="26" rx="13" fill="url(#stoGrad)" />
          <text x="694" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            Critical
          </text>
        </g>
      </g>

      {/* Stage 5 - Enforce policy gate */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <path
          d="M770 118 L758 123 L758 138 C758 148 764 155 770 158 C776 155 782 148 782 138 L782 123 Z"
          className={styles.shieldOutline}
        />
        <path d="M762 138 L768 144 L780 128" className={styles.checkMark} />
        <text x="770" y="200" textAnchor="middle" className={styles.label}>
          Enforce policy
        </text>
        <text x="770" y="214" textAnchor="middle" className={styles.label}>
          gate
        </text>
      </g>
    </svg>
  );
}
