import React from "react";
import styles from "./aiSreOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the AI SRE module landing page.
 *
 * Mirrors the module's real onboarding flow:
 *   1. Monitor service health   - continuous heartbeat/ECG signal on services
 *   2. Correlate change events  - CI/CD, feature flags, deployments funnel in
 *   3. Detect anomalies         - fork into false positive vs real incident
 *   4. Diagnose root cause      - drill into the signal graph
 *   5. Resolve faster           - incident is resolved with confidence
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library). The one piece of JS is a shared IntersectionObserver
 * hook (./shared/usePauseWhenOffscreen) that pauses all animation while the
 * illustration is scrolled out of view. Shared timing (single $cycle/beat/
 * fire clock) and color-free keyframe shapes live in ./shared/_motion.scss.
 */
export default function AiSreOnboardingIllustration() {
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
      aria-label="Animated diagram of the AI SRE onboarding flow: monitor service health, correlate change events, detect anomalies by forking into false positives and real incidents, diagnose root cause, then resolve faster with confidence."
    >
      <defs>
        <linearGradient id="aisreGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF99C9" />
          <stop offset="50%" stopColor="#926EF7" />
          <stop offset="100%" stopColor="#6EEEF7" />
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

      {/* Stage 1 - Monitor service health */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFadeEarly}`} />
        {/* "Monitor service health" reads as always-on background work rather than a
            discrete step, so this ring pulses continuously from the start
            instead of waiting for the dot to arrive */}
        <circle cx="110" cy="140" r="38" className={styles.pulseRingEarly} />
        <path
          d="M88 140 L98 140 L104 126 L112 154 L118 134 L123 140 L132 140"
          fill="none"
          className={`${styles.iconStroke} ${styles.heartbeat}`}
        />
        <text x="110" y="200" textAnchor="middle" className={styles.label}>
          Monitor service
        </text>
        <text x="110" y="214" textAnchor="middle" className={styles.label}>
          health
        </text>
      </g>

      {/* Stage 2 - Correlate change events */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <circle cx="256" cy="118" r="4" className={`${styles.converge} ${styles.converge1}`} />
        <circle cx="304" cy="118" r="4" className={`${styles.converge} ${styles.converge2}`} />
        <circle cx="280" cy="160" r="4" className={`${styles.converge} ${styles.converge3}`} />
        <line x1="256" y1="118" x2="280" y2="140" className={styles.forkPathMuted} />
        <line x1="304" y1="118" x2="280" y2="140" className={styles.forkPathMuted} />
        <line x1="280" y1="160" x2="280" y2="140" className={styles.forkPathMuted} />
        <circle cx="280" cy="140" r="5" className={styles.signalDot} />
        <text x="280" y="200" textAnchor="middle" className={styles.label}>
          Correlate change
        </text>
        <text x="280" y="214" textAnchor="middle" className={styles.label}>
          events
        </text>
      </g>

      {/* Stage 3 - Detect anomalies (fork: false positive vs real incident) */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <path d="M432 152 L442 128 L448 140 L456 118" fill="none" className={styles.diffLine} />
        <g className={styles.alertPulse}>
          <path d="M450 116 L457 130 L443 130 Z" className={styles.alertTriangle} />
          <line x1="450" y1="120" x2="450" y2="125" className={styles.alertStem} />
          <circle cx="450" cy="128" r="1.2" className={styles.alertDotFill} />
        </g>
        <text x="450" y="200" textAnchor="middle" className={styles.label}>
          Detect
        </text>
        <text x="450" y="214" textAnchor="middle" className={styles.label}>
          anomalies
        </text>

        {/* fork explanation: false positive fades, real incident glows */}
        <path
          d="M438 158 C 406 182, 386 196, 366 214"
          className={styles.forkPathMuted}
          fill="none"
        />
        <path
          d="M462 158 C 494 182, 514 196, 534 214"
          className={styles.forkPathBright}
          fill="none"
        />
        <g className={styles.blockedTag}>
          <rect x="296" y="216" width="140" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="366" y="233" textAnchor="middle" className={styles.tagLabelMuted}>
            False positive
          </text>
        </g>
        <g className={styles.approvedTag}>
          <rect x="464" y="216" width="140" height="26" rx="13" fill="url(#aisreGrad)" />
          <text x="534" y="233" textAnchor="middle" className={styles.tagLabelBright}>
            Real incident
          </text>
        </g>
      </g>

      {/* Stage 4 - Diagnose root cause */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <circle cx="600" cy="146" r="3" className={styles.graphNode} />
        <circle cx="612" cy="152" r="3" className={styles.graphNode} />
        <circle cx="608" cy="136" r="3" className={styles.graphNode} />
        <line x1="600" y1="146" x2="608" y2="136" className={styles.codeLine} />
        <line x1="608" y1="136" x2="612" y2="152" className={styles.codeLine} />
        <line x1="600" y1="146" x2="612" y2="152" className={styles.codeLine} />
        <g className={styles.magnifyPulse}>
          <circle cx="622" cy="124" r="10" className={styles.iconStroke} />
          <line x1="629" y1="131" x2="638" y2="140" className={styles.iconStroke} />
        </g>
        <text x="610" y="200" textAnchor="middle" className={styles.label}>
          Diagnose root
        </text>
        <text x="610" y="214" textAnchor="middle" className={styles.label}>
          cause
        </text>
      </g>

      {/* Stage 5 - Resolve faster */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <circle cx="770" cy="128" r="13" className={styles.clockFace} />
        <line x1="770" y1="128" x2="770" y2="120" className={styles.shaftLine} />
        <line x1="770" y1="128" x2="776" y2="132" className={styles.clockHand} />
        <path d="M752 146 L764 158 L788 132" className={styles.checkMark} />
        <text x="770" y="200" textAnchor="middle" className={styles.label}>
          Resolve faster
        </text>
        <text x="770" y="214" textAnchor="middle" className={styles.label}>
          with confidence
        </text>
      </g>
    </svg>
  );
}
