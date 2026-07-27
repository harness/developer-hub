import React from "react";
import styles from "./cloudCostManagementOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Cloud & AI Cost Management (CCM) module
 * landing page.
 *
 * Depicts the real onboarding flow a FinOps or engineering team follows to
 * get value out of Harness CCM:
 *   1. Ingest spend data       - cloud spend data flows into Harness
 *   2. Visualize costs         - cost data renders as dashboards/charts
 *   3. Detect anomalies        - unexpected spend spikes are flagged
 *   4. Recommend savings       - Harness surfaces optimization ideas
 *   5. Track savings over time - realized savings are tracked continuously
 *
 * All motion is done with CSS keyframes on plain SVG shapes (no JS/animation
 * library), matching the pattern used for the FME, AI DLC Insights, Harness
 * AI, Platform, Code Repository, IaCM, and Continuous Integration
 * illustrations. This module has no natural fork point, so the flow is
 * linear.
 */
export default function CloudCostManagementOnboardingIllustration() {
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
      aria-label="Animated diagram of the Cloud and AI Cost Management onboarding flow: ingest spend data, visualize costs, detect anomalies, recommend savings, then track savings over time."
    >
      <defs>
        <linearGradient id="ccmGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00CFDE" />
          <stop offset="100%" stopColor="#05A660" />
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

      {/* Stage 1 - Ingest spend data */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <path
          transform="translate(91,102) scale(1.583)"
          d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
          className={styles.iconStroke}
        />
        <line x1="110" y1="133" x2="110" y2="156" className={styles.shaftLine} />
        <path d="M101 147 L110 158 L119 147" className={styles.iconStroke} />
        <circle cx="110" cy="136" r="3" className={styles.ingestDot} />
        <text x="110" y="200" textAnchor="middle" className={styles.label}>
          Ingest spend
        </text>
        <text x="110" y="214" textAnchor="middle" className={styles.label}>
          data
        </text>
      </g>

      {/* Stage 2 - Visualize costs */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <line x1="260" y1="156" x2="300" y2="156" className={styles.codeLine} />
        <rect x="262" y="126" width="10" height="30" rx="2" fill="url(#ccmGrad)" className={`${styles.costBar} ${styles.costBar1}`} />
        <rect x="275" y="116" width="10" height="40" rx="2" fill="url(#ccmGrad)" className={`${styles.costBar} ${styles.costBar2}`} />
        <rect x="288" y="122" width="10" height="34" rx="2" fill="url(#ccmGrad)" className={`${styles.costBar} ${styles.costBar3}`} />
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Visualize costs
        </text>
      </g>

      {/* Stage 3 - Detect anomalies */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFadeEarly}`} />
        {/* "Detect anomalies" reads as always-on background work rather than a
            discrete step, so this ring pulses continuously from the start
            instead of waiting for the dot to arrive */}
        <circle cx="450" cy="140" r="38" className={styles.pulseRingEarly} />
        <path d="M424 150 L436 130 L446 145 L458 114" fill="none" className={styles.diffLine} />
        <g className={styles.magnifyPulse}>
          <circle cx="462" cy="118" r="10" className={styles.iconStroke} />
          <line x1="469" y1="125" x2="478" y2="134" className={styles.iconStroke} />
        </g>
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Detect anomalies
        </text>
      </g>

      {/* Stage 4 - Recommend savings */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <g className={styles.bulbGlow}>
          <circle cx="610" cy="122" r="13" className={styles.iconStroke} />
        </g>
        <line x1="604" y1="134" x2="604" y2="140" className={styles.shaftLine} />
        <line x1="616" y1="134" x2="616" y2="140" className={styles.shaftLine} />
        <line x1="604" y1="144" x2="616" y2="144" className={styles.codeLine} />
        <line x1="595" y1="108" x2="591" y2="103" stroke="#05A660" strokeWidth="2" strokeLinecap="round" className={`${styles.bulbRay} ${styles.ray1}`} />
        <line x1="610" y1="103" x2="610" y2="97" stroke="#05A660" strokeWidth="2" strokeLinecap="round" className={`${styles.bulbRay} ${styles.ray2}`} />
        <line x1="625" y1="108" x2="629" y2="103" stroke="#05A660" strokeWidth="2" strokeLinecap="round" className={`${styles.bulbRay} ${styles.ray3}`} />
        <text x="610" y="200" textAnchor="middle" className={styles.label}>
          Recommend
        </text>
        <text x="610" y="214" textAnchor="middle" className={styles.label}>
          savings
        </text>
      </g>

      {/* Stage 5 - Track savings over time */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <path d="M748 118 L758 130 L768 122 L784 144" fill="none" className={styles.diffLine} />
        <path d="M776 138 L784 144 L792 128" className={styles.checkMark} />
        <text x="770" y="200" textAnchor="middle" className={styles.label}>
          Track savings
        </text>
        <text x="770" y="214" textAnchor="middle" className={styles.label}>
          over time
        </text>
      </g>
    </svg>
  );
}
