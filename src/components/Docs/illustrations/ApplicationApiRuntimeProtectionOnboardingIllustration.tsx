import React from "react";
import styles from "./applicationApiRuntimeProtectionOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Application & API Runtime Protection module
 * landing page.
 *
 * Mirrors the module's real runtime-defense workflow with a 5-stage visual:
 *   1. Monitor traffic live     - continuous eye/radar-style traffic watch
 *   2. Detect threat actors     - flag a suspicious actor for inspection
 *   3. Classify traffic         - fork into bot-detected (blocked) vs
 *      allowed (legitimate) traffic
 *   4. Enforce policy           - apply fine-grained policy via a shield +
 *      policy gear
 *   5. Stay resilient in production - the app keeps running, verified

 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the IaCM, Database
 * DevOps, Resilience Testing, and AI Test Automation illustrations.
 */
export default function ApplicationApiRuntimeProtectionOnboardingIllustration() {
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
      aria-label="Animated diagram of the Application and API Runtime Protection onboarding flow: monitor traffic live, detect threat actors, classify traffic into bot-detected versus allowed, enforce fine-grained policy, then stay resilient in production."
    >
      <defs>
        <linearGradient id="arpGrad" x1="0" y1="0" x2="1" y2="1">
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

      {/* Stage 1 - Monitor traffic live */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFadeEarly}`} />
        {/* "Monitor traffic live" reads as always-on background work rather than a
            discrete step, so this ring pulses continuously from the start
            instead of waiting for the dot to arrive */}
        <circle cx="110" cy="140" r="38" className={styles.pulseRingEarly} />
        <path
          d="M90 140 C 96 128, 124 128, 130 140 C 124 152, 96 152, 90 140 Z"
          className={styles.iconStroke}
          fill="none"
        />
        <circle cx="110" cy="140" r="6" className={styles.eyePupil} />
        <line x1="90" y1="140" x2="130" y2="140" className={styles.scanLine} />
        <text x="110" y="200" textAnchor="middle" className={styles.label}>
          Monitor traffic
        </text>
        <text x="110" y="214" textAnchor="middle" className={styles.label}>
          live
        </text>
      </g>

      {/* Stage 2 - Detect threat actors */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <circle cx="280" cy="118" r="8" className={styles.iconStroke} fill="none" />
        <path
          d="M264 152 C 264 136, 270 126, 280 126 C 290 126, 296 136, 296 152"
          className={styles.iconStroke}
          fill="none"
        />
        <g className={styles.targetPulse}>
          <circle cx="298" cy="124" r="9" className={styles.targetRing} />
          <circle cx="298" cy="124" r="3" className={styles.targetDot} />
        </g>
        <text x="280" y="200" textAnchor="middle" className={styles.label}>
          Detect threat
        </text>
        <text x="280" y="214" textAnchor="middle" className={styles.label}>
          actors
        </text>
      </g>

      {/* Stage 3 - Classify traffic (bot detected vs allowed fork) */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <path
          d="M432 118 L468 118 L454 140 L446 140 Z"
          className={styles.iconStroke}
          fill="none"
        />
        <line x1="450" y1="140" x2="450" y2="152" className={styles.shaftLine} />
        <circle cx="450" cy="124" r="3" className={styles.trafficDot} />
        <text x="450" y="200" textAnchor="middle" className={styles.label}>
          Classify
        </text>
        <text x="450" y="214" textAnchor="middle" className={styles.label}>
          traffic
        </text>

        {/* fork explanation: bot traffic fades, allowed traffic glows */}
        <path
          d="M438 110 C 406 92, 386 82, 366 72"
          className={styles.forkPathMuted}
          fill="none"
        />
        <path
          d="M462 110 C 494 92, 514 82, 534 72"
          className={styles.forkPathBright}
          fill="none"
        />
        <g className={styles.botDetectedTag}>
          <rect x="296" y="46" width="140" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="366" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Bot detected
          </text>
        </g>
        <g className={styles.allowedTag}>
          <rect x="484" y="46" width="100" height="26" rx="13" fill="url(#arpGrad)" />
          <text x="534" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            Allowed
          </text>
        </g>
      </g>

      {/* Stage 4 - Enforce policy */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <path
          d="M610 118 L598 123 L598 138 C598 148 604 155 610 158 C616 155 622 148 622 138 L622 123 Z"
          className={styles.shieldOutline}
        />
        <g className={styles.lockGlow}>
          <circle cx="610" cy="135" r="3.5" className={styles.lockHole} />
          <rect x="608" y="138" width="4" height="6" rx="1" className={styles.lockHole} />
        </g>
        <g className={styles.gearSpin}>
          <circle cx="628" cy="122" r="7" className={styles.iconStroke} fill="none" />
          <rect x="626.5" y="111" width="3" height="5" className={styles.gearTooth} />
          <rect x="626.5" y="133" width="3" height="5" className={styles.gearTooth} />
          <rect x="615" y="120.5" width="5" height="3" className={styles.gearTooth} />
          <rect x="632" y="120.5" width="5" height="3" className={styles.gearTooth} />
        </g>
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Enforce policy
        </text>
      </g>

      {/* Stage 5 - Stay resilient in production */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="20" className={styles.circleOutline} />
        <path d="M760 140 L768 148 L782 128" className={styles.checkMark} />
        <text x="770" y="200" textAnchor="middle" className={styles.label}>
          Stay resilient
        </text>
        <text x="770" y="214" textAnchor="middle" className={styles.label}>
          in production
        </text>
      </g>
    </svg>
  );
}
