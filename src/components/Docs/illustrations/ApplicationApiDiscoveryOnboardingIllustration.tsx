import React from "react";
import styles from "./applicationApiDiscoveryOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Application & API Discovery module landing
 * page.
 *
 * Mirrors the module's real workflow with a 5-stage visual:
 *   1. Discover APIs         - traffic and code analysis scan for APIs
 *   2. Map the inventory     - discovered APIs are catalogued
 *   3. Classify by sensitivity - APIs are tagged by data sensitivity
 *   4. Track changes         - the inventory is watched over time
 *   5. Surface risks         - conformant vs violation-found fork
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the FME, AI DLC
 * Insights, IaCM, Database DevOps, and Resilience Testing illustrations.
 */
export default function ApplicationApiDiscoveryOnboardingIllustration() {
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
      aria-label="Animated diagram of the Application and API Discovery onboarding flow: discover APIs through traffic and code analysis, map the inventory, classify APIs by sensitivity, track changes over time, then surface risks as either a violation found or conformant."
    >
      <defs>
        <linearGradient id="aspGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6CB5FF" />
          <stop offset="100%" stopColor="#4D4AFF" />
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

      {/* Stage 1 - Discover APIs (radar / scan glyph) */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFadeEarly}`} />
        {/* "Discover APIs" reads as always-on background work rather than a
            discrete step, so this ring pulses continuously from the start
            instead of waiting for the dot to arrive */}
        <circle cx="110" cy="140" r="38" className={styles.pulseRingEarly} />
        <circle cx="110" cy="128" r="9" className={styles.radarRingStatic} />
        <circle cx="110" cy="128" r="14" className={styles.radarRingStatic} />
        <circle cx="110" cy="128" r="9" className={styles.radarPing} />
        <g className={styles.radarSweepGroup}>
          <line x1="110" y1="128" x2="110" y2="115" className={styles.radarSweepLine} />
        </g>
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Discover APIs
        </text>
      </g>

      {/* Stage 2 - Map the inventory (grid / list glyph) */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <rect x="266" y="114" width="12" height="12" rx="2" className={styles.gridCell} />
        <rect x="282" y="114" width="12" height="12" rx="2" className={styles.gridCell} />
        <rect x="266" y="130" width="12" height="12" rx="2" className={styles.gridCell} />
        <rect
          x="282"
          y="130"
          width="12"
          height="12"
          rx="2"
          className={`${styles.gridCell} ${styles.gridHighlight}`}
        />
        <text x="280" y="200" textAnchor="middle" className={styles.label}>
          Map the
        </text>
        <text x="280" y="214" textAnchor="middle" className={styles.label}>
          inventory
        </text>
      </g>

      {/* Stage 3 - Classify by sensitivity (tag glyph) */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <path
          d="M436 116 L452 116 L464 128 L452 140 L436 140 Z"
          className={styles.tagOutline}
        />
        <circle cx="444" cy="128" r="2" className={styles.tagHole} />
        <circle cx="450" cy="152" r="4" className={styles.sensitivityDot} />
        <text x="450" y="200" textAnchor="middle" className={styles.label}>
          Classify by
        </text>
        <text x="450" y="214" textAnchor="middle" className={styles.label}>
          sensitivity
        </text>
      </g>

      {/* Stage 4 - Track changes (clock / diff glyph) */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <circle cx="610" cy="128" r="11" className={styles.clockFace} />
        <g className={styles.clockHandGroup}>
          <line x1="610" y1="128" x2="610" y2="119" className={styles.clockHand} />
        </g>
        <line x1="610" y1="128" x2="617" y2="128" className={styles.clockHand} />
        <circle cx="622" cy="117" r="2.5" className={styles.changeMarker} />
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Track changes
        </text>
      </g>

      {/* Stage 5 - Surface risks (flag / warning glyph, conformant vs violation fork) */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <line x1="770" y1="116" x2="770" y2="152" className={styles.flagPole} />
        <circle cx="770" cy="116" r="2.5" className={styles.flagKnob} />
        <path
          d="M770 118 L788 123 L770 130 Z"
          fill="url(#aspGrad)"
          className={`${styles.flagFlap} ${styles.flagWave}`}
        />
        <text x="770" y="200" textAnchor="middle" className={styles.label}>
          Surface
        </text>
        <text x="770" y="214" textAnchor="middle" className={styles.label}>
          risks
        </text>

        {/* fork explanation: violation found fades, conformant glows */}
        <path
          d="M758 110 C 700 92, 640 82, 610 72"
          className={styles.forkPathMuted}
          fill="none"
        />
        <path
          d="M782 110 C 784 92, 782 82, 780 72"
          className={styles.forkPathBright}
          fill="none"
        />
        <g className={styles.violationTag}>
          <rect x="545" y="46" width="130" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="610" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Violation found
          </text>
        </g>
        <g className={styles.conformantTag}>
          <rect x="715" y="46" width="130" height="26" rx="13" fill="url(#aspGrad)" />
          <text x="780" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            Conformant
          </text>
        </g>
      </g>
    </svg>
  );
}
