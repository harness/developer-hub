import React from "react";
import styles from "./aiTestAutomationOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the AI Test Automation module landing page.
 *
 * Mirrors the module's core value props with a 5-stage visual:
 *   1. Capture the user flow      - record a UI interaction (click/tap)
 *   2. AI generates test cases    - Generative AI turns the recording into
 *      high-quality test cases in minutes (10x faster test creation)
 *   3. Self-heal on UI changes    - a broken locator is diagnosed and
 *      automatically fixed, without manual maintenance (70% less
 *      maintenance)
 *   4. Run across browsers in parallel - the generated tests execute
 *      concurrently across browsers/devices
 *   5. Ship faster with confidence - faster, more reliable release cycles
 *      (5x faster release cycles)
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library). The one piece of JS is a shared IntersectionObserver
 * hook (./shared/usePauseWhenOffscreen) that pauses all animation while the
 * illustration is scrolled out of view. Shared timing (single $cycle/beat/
 * fire clock) and color-free keyframe shapes live in ./shared/_motion.scss.
 */
export default function AiTestAutomationOnboardingIllustration() {
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
      aria-label="Animated diagram of the AI Test Automation onboarding flow: capture the user flow with a recorded interaction, let AI generate test cases automatically, self-heal tests when the UI changes, run tests across browsers in parallel, and ship releases faster with confidence."
    >
      <defs>
        <linearGradient id="ataGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EF63FF" />
          <stop offset="100%" stopColor="#B703CC" />
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

      {/* Stage 1 - Capture the user flow */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <rect x="92" y="150" width="36" height="14" rx="2" className={styles.squareOutline} />
        <g className={styles.magnifyPulse}>
          <path
            d="M92 118 L92 142 L97 138 L101 147 L105 145 L101 136 L108 136 Z"
            className={styles.iconStroke}
          />
        </g>
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Capture user flow
        </text>
      </g>

      {/* Stage 2 - AI generates test cases */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFadeEarly}`} />
        {/* AI is generating tests in the background, independent of the
            progress dot - so this ring pulses continuously from the start
            rather than waiting for the dot to arrive */}
        <circle cx="280" cy="140" r="38" className={styles.pulseRingEarly} />
        <path
          d="M262 120 h36 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-22 l-8 8 v-8 h-6 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6 Z"
          className={styles.bubbleOutline}
        />
        <circle cx="272" cy="139" r="2.2" className={`${styles.typingDot} ${styles.typing1}`} />
        <circle cx="280" cy="139" r="2.2" className={`${styles.typingDot} ${styles.typing2}`} />
        <circle cx="288" cy="139" r="2.2" className={`${styles.typingDot} ${styles.typing3}`} />
        <text x="280" y="200" textAnchor="middle" className={styles.label}>
          AI generates
        </text>
        <text x="280" y="214" textAnchor="middle" className={styles.label}>
          test cases
        </text>
      </g>

      {/* Stage 3 - Self-heal on UI changes (broken locator fades into a fix) */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <g className={styles.alertGroup}>
          <path d="M450 118 L465 148 L435 148 Z" className={styles.alertOutline} />
          <line x1="450" y1="128" x2="450" y2="139" className={styles.alertStem} />
          <circle cx="450" cy="144" r="1.6" className={styles.alertDot} />
        </g>
        <g className={styles.fixGroup}>
          <circle cx="450" cy="136" r="14" className={styles.fixRing} />
          <path d="M443 136 L448 141 L458 128" className={styles.fixCheck} />
        </g>
        <text x="450" y="200" textAnchor="middle" className={styles.label}>
          Self-heal on
        </text>
        <text x="450" y="214" textAnchor="middle" className={styles.label}>
          UI changes
        </text>
      </g>

      {/* Stage 4 - Run across browsers in parallel */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <line x1="594" y1="144" x2="601" y2="144" className={styles.shaftLine} />
        <line x1="606" y1="138" x2="613" y2="138" className={styles.shaftLine} />
        <line x1="618" y1="142" x2="625" y2="142" className={styles.shaftLine} />
        <rect x="594" y="148" width="7" height="10" rx="1.5" fill="url(#ataGrad)" className={`${styles.laneBar} ${styles.lane1}`} />
        <rect x="606" y="142" width="7" height="16" rx="1.5" fill="url(#ataGrad)" className={`${styles.laneBar} ${styles.lane2}`} />
        <rect x="618" y="146" width="7" height="12" rx="1.5" fill="url(#ataGrad)" className={`${styles.laneBar} ${styles.lane3}`} />
        <text x="610" y="200" textAnchor="middle" className={styles.label}>
          Run across browsers
        </text>
        <text x="610" y="214" textAnchor="middle" className={styles.label}>
          in parallel
        </text>
      </g>

      {/* Stage 5 - Ship faster with confidence */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <g className={`${styles.chevron} ${styles.chevronA}`}>
          <path d="M758 128 L770 140 L758 152" className={styles.iconStroke} />
        </g>
        <g className={`${styles.chevron} ${styles.chevronB}`}>
          <path d="M770 128 L782 140 L770 152" className={styles.iconStroke} />
        </g>
        <text x="770" y="200" textAnchor="middle" className={styles.label}>
          Ship faster with
        </text>
        <text x="770" y="214" textAnchor="middle" className={styles.label}>
          confidence
        </text>
      </g>
    </svg>
  );
}
