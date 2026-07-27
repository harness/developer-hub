import React from "react";
import styles from "./qwietAiOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the SAST and SCA (QwietAI) module landing page.
 *
 * Depicts the core SAST and SCA onboarding flow as a five-stage journey:
 *   1. Scan source code       - static analysis begins on the codebase
 *   2. Build code graph       - a Code Property Graph (CPG) is constructed
 *   3. Detect vulnerabilities - control flow, data flow, and dependencies
 *                               are analyzed together to surface risk
 *   4. Flag risky dependencies - risky open-source dependencies are called out
 *   5. Fix issues early       - actionable findings are resolved early
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the IaCM, Continuous
 * Integration, and Release Orchestration illustrations. This module has no
 * natural fork point, so the flow is kept linear. The one piece of JS is a
 * shared IntersectionObserver hook (./shared/usePauseWhenOffscreen) that
 * pauses all animation while the illustration is scrolled out of view.
 * Shared timing (single $cycle/beat/fire clock) and color-free keyframe
 * shapes live in ./shared/_motion.scss.
 */
export default function QwietAiOnboardingIllustration() {
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
      aria-label="Animated diagram of the SAST and SCA onboarding flow: scan source code, build a code property graph, detect vulnerabilities, flag risky open-source dependencies, then fix issues early."
    >
      <defs>
        <linearGradient id="qwietGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6C8CFF" />
          <stop offset="100%" stopColor="#0E37F6" />
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

      {/* Stage 1 - Scan source code */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <path d="M102 122 L90 140 L102 158" className={styles.iconStroke} />
        <path d="M118 122 L130 140 L118 158" className={styles.iconStroke} />
        <line x1="113" y1="122" x2="107" y2="158" className={styles.shaftLine} />
        <text x="110" y="200" textAnchor="middle" className={styles.label}>
          Scan source
        </text>
        <text x="110" y="214" textAnchor="middle" className={styles.label}>
          code
        </text>
      </g>

      {/* Stage 2 - Build code graph */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <line x1="280" y1="140" x2="262" y2="122" className={styles.graphLine} />
        <line x1="280" y1="140" x2="298" y2="122" className={styles.graphLine} />
        <line x1="280" y1="140" x2="262" y2="158" className={styles.graphLine} />
        <line x1="280" y1="140" x2="298" y2="158" className={styles.graphLine} />
        <circle cx="280" cy="140" r="7" className={styles.graphNode} />
        <circle cx="262" cy="122" r="5" className={styles.graphNode} />
        <circle cx="298" cy="122" r="5" className={styles.graphNode} />
        <circle cx="262" cy="158" r="5" className={styles.graphNode} />
        <circle cx="298" cy="158" r="5" className={styles.graphNode} />
        <text x="280" y="200" textAnchor="middle" className={styles.label}>
          Build code
        </text>
        <text x="280" y="214" textAnchor="middle" className={styles.label}>
          graph
        </text>
      </g>

      {/* Stage 3 - Detect vulnerabilities */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <ellipse cx="450" cy="144" rx="13" ry="17" className={styles.iconStroke} />
        <line x1="450" y1="126" x2="450" y2="116" className={styles.shaftLine} />
        <line x1="443" y1="120" x2="437" y2="112" className={`${styles.shaftLine} ${styles.bugAntenna1}`} />
        <line x1="457" y1="120" x2="463" y2="112" className={`${styles.shaftLine} ${styles.bugAntenna2}`} />
        <line x1="431" y1="132" x2="421" y2="126" className={styles.codeLine} />
        <line x1="431" y1="144" x2="419" y2="144" className={styles.codeLine} />
        <line x1="431" y1="156" x2="421" y2="162" className={styles.codeLine} />
        <line x1="469" y1="132" x2="479" y2="126" className={styles.codeLine} />
        <line x1="469" y1="144" x2="481" y2="144" className={styles.codeLine} />
        <line x1="469" y1="156" x2="479" y2="162" className={styles.codeLine} />
        <text x="450" y="200" textAnchor="middle" className={styles.label}>
          Detect
        </text>
        <text x="450" y="214" textAnchor="middle" className={styles.label}>
          vulnerabilities
        </text>
      </g>

      {/* Stage 4 - Flag risky dependencies */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <rect x="598" y="140" width="24" height="20" rx="2" className={styles.iconStroke} />
        <line x1="598" y1="150" x2="622" y2="150" className={styles.codeLine} />
        <line x1="610" y1="140" x2="610" y2="160" className={styles.codeLine} />
        <line x1="610" y1="112" x2="610" y2="142" className={styles.shaftLine} />
        <path d="M610 112 L630 119 L610 126 Z" fill="url(#qwietGrad)" className={styles.riskFlag} />
        <text x="610" y="200" textAnchor="middle" className={styles.label}>
          Flag risky
        </text>
        <text x="610" y="214" textAnchor="middle" className={styles.label}>
          dependencies
        </text>
      </g>

      {/* Stage 5 - Fix issues early */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <circle cx="754" cy="124" r="8" className={`${styles.iconStroke} ${styles.fixGlow}`} />
        <rect x="758" y="128" width="7" height="24" rx="3" transform="rotate(45 761 140)" className={styles.iconStroke} />
        <path d="M768 146 L774 152 L787 136" className={styles.checkMark} />
        <text x="770" y="200" textAnchor="middle" className={styles.label}>
          Fix issues
        </text>
        <text x="770" y="214" textAnchor="middle" className={styles.label}>
          early
        </text>
      </g>
    </svg>
  );
}
