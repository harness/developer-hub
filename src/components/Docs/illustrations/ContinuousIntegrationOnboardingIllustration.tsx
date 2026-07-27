import React from "react";
import styles from "./continuousIntegrationOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Continuous Integration (CI) module landing
 * page.
 *
 * Depicts the real onboarding flow a developer follows to get a build
 * pipeline running in Harness CI:
 *   1. Push a commit              - a commit triggers the pipeline
 *   2. Run tests in parallel      - tests fan out across parallel lanes
 *   3. Cache dependencies         - dependencies/builds are cached for speed
 *   4. Build & scan container image - the image is built and scanned
 *   5. Publish build artifact     - the resulting artifact is published
 *
 * All motion is done with CSS keyframes on plain SVG shapes (no JS/animation
 * library), matching the pattern used for the FME, AI DLC Insights, Harness
 * AI, Platform, Code Repository, and IaCM illustrations.
 */
export default function ContinuousIntegrationOnboardingIllustration() {
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
      aria-label="Animated diagram of the Continuous Integration onboarding flow: push a commit to trigger the pipeline, run tests in parallel, cache dependencies for faster builds, build and scan the container image, then publish the build artifact."
    >
      <defs>
        <linearGradient id="ciGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#73DFE7" />
          <stop offset="100%" stopColor="#0095F7" />
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

      {/* Stage 1 - Push a commit */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <rect x="94" y="152" width="32" height="10" rx="2" className={styles.squareOutline} />
        <line x1="110" y1="118" x2="110" y2="148" className={styles.shaftLine} />
        <path d="M100 128 L110 116 L120 128" className={styles.iconStroke} />
        <circle cx="110" cy="150" r="3" className={styles.commitDot} />
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Push a commit
        </text>
      </g>

      {/* Stage 2 - Run tests in parallel */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <line x1="262" y1="124" x2="298" y2="124" className={`${styles.laneLine} ${styles.lane1}`} />
        <line x1="262" y1="140" x2="298" y2="140" className={`${styles.laneLine} ${styles.lane2}`} />
        <line x1="262" y1="156" x2="298" y2="156" className={`${styles.laneLine} ${styles.lane3}`} />
        <path d="M291 118 L296 123 L305 111" className={styles.checkMark} />
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Run tests in parallel
        </text>
      </g>

      {/* Stage 3 - Cache dependencies */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <ellipse cx="444" cy="122" rx="14" ry="5.5" className={styles.iconStroke} />
        <line x1="430" y1="122" x2="430" y2="150" className={styles.shaftLine} />
        <line x1="458" y1="122" x2="458" y2="150" className={styles.shaftLine} />
        <path d="M430 150 A14 5.5 0 0 0 458 150" className={styles.iconStroke} />
        <path d="M430 136 A14 5.5 0 0 0 458 136" className={styles.cacheMidLine} />
        <g className={styles.boltFlicker}>
          <path d="M470 122 L462 138 L468 138 L462 156 L478 134 L470 134 Z" fill="url(#ciGrad)" />
        </g>
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Cache dependencies
        </text>
      </g>

      {/* Stage 4 - Build & scan container image */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <rect x="592" y="122" width="34" height="30" rx="4" className={styles.iconStroke} />
        <line x1="598" y1="132" x2="620" y2="132" className={styles.codeLine} />
        <line x1="598" y1="141" x2="620" y2="141" className={styles.codeLine} />
        <line x1="598" y1="150" x2="614" y2="150" className={styles.diffLine} />
        <g className={styles.magnifyPulse}>
          <circle cx="628" cy="120" r="9" className={styles.iconStroke} />
          <line x1="634" y1="126" x2="642" y2="134" className={styles.iconStroke} />
        </g>
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Build &amp; scan
        </text>
      </g>

      {/* Stage 5 - Publish build artifact */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <line x1="770" y1="116" x2="770" y2="144" className={styles.shaftLine} />
        <path d="M760 128 L770 114 L780 128" className={styles.iconStroke} />
        <rect x="754" y="146" width="32" height="22" rx="2" className={styles.iconStroke} />
        <line x1="754" y1="157" x2="786" y2="157" className={styles.codeLine} />
        <circle cx="770" cy="148" r="3" className={styles.publishDot} />
        <text x="770" y="204" textAnchor="middle" className={styles.label}>
          Publish build artifact
        </text>
      </g>
    </svg>
  );
}
