import React from "react";
import styles from "./fmeOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Feature Management & Experimentation (FME)
 * module landing page.
 *
 * Rather than a static "scene", this depicts the actual onboarding flow a
 * developer follows to ship their first flag:
 *   1. Connect SDK      - install and initialize the SDK in your app
 *   2. Create flag      - define a flag key + default value in the console
 *   3. Target rules     - route users into segments / rollout percentages
 *   4. Ship code        - the flag forks execution into an old vs. new path
 *   5. Monitor          - watch the flag's impact in real time
 *
 * All motion is done with CSS keyframes on plain SVG shapes (no JS/animation
 * library) so it stays cheap to render and easy to tweak.
 */
export default function FmeOnboardingIllustration() {
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
      aria-label="Animated diagram of the Feature Management and Experimentation onboarding flow: connect your SDK, create a feature flag, configure targeting rules, ship the code path, then monitor results."
    >
      <defs>
        <linearGradient id="fmeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B336FF" />
          <stop offset="100%" stopColor="#58159B" />
        </linearGradient>
      </defs>

      {/* backbone connector - gapped at each node so the line reads as a
          connector between stages, not an overlay running through them */}
      <line x1="148" y1="140" x2="242" y2="140" className={styles.connectorLine} />
      <line x1="318" y1="140" x2="412" y2="140" className={styles.connectorLine} />
      <line x1="488" y1="140" x2="572" y2="140" className={styles.connectorLine} />
      <line x1="648" y1="140" x2="732" y2="140" className={styles.connectorLine} />

      {/* traveling request/user pulse */}
      <circle cx="110" cy="140" r="6" className={styles.travelDot} />

      {/* Stage 1 - Connect SDK */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <path d="M100 128 L88 140 L100 152" className={styles.iconStroke} />
        <path d="M120 128 L132 140 L120 152" className={styles.iconStroke} />
        <line x1="116" y1="122" x2="104" y2="158" className={styles.iconStroke} />
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Connect SDK
        </text>
      </g>

      {/* Stage 2 - Create flag */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <line x1="266" y1="160" x2="266" y2="116" className={styles.flagPole} />
        <path
          d="M266 121 L293 129.5 L266 138 Z"
          fill="url(#fmeGrad)"
          className={styles.flagCloth}
        />
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Create flag
        </text>
      </g>

      {/* Stage 3 - Configure targeting rules */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <path
          d="M432 120 L468 120 L456 137 L456 156 L444 156 L444 137 Z"
          className={styles.iconStroke}
          fill="none"
        />
        <circle cx="450" cy="110" r="3.5" className={`${styles.funnelDot} ${styles.dot1}`} />
        <circle cx="442" cy="108" r="3" className={`${styles.funnelDot} ${styles.dot2}`} />
        <circle cx="458" cy="108" r="3" className={`${styles.funnelDot} ${styles.dot3}`} />
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Target rules
        </text>
      </g>

      {/* Stage 4 - Ship code (forks into old vs. new path) */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <rect
          x="592"
          y="132"
          width="36"
          height="16"
          rx="8"
          className={styles.iconStroke}
          fill="none"
        />
        <circle cx="602" cy="140" r="6" fill="url(#fmeGrad)" className={styles.toggleKnob} />
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Ship code
        </text>

        {/* fork explanation: one branch fades (old path), one glows (delivered) */}
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
        <g className={styles.oldTag}>
          <rect x="472" y="46" width="108" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="526" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Old code path
          </text>
        </g>
        <g className={styles.newTag}>
          <rect x="640" y="46" width="108" height="26" rx="13" fill="url(#fmeGrad)" />
          <text x="694" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            New feature
          </text>
        </g>
      </g>

      {/* Stage 5 - Test and monitor */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <rect
          x="752"
          y="150"
          width="8"
          height="10"
          fill="url(#fmeGrad)"
          className={`${styles.bar} ${styles.bar1}`}
        />
        <rect
          x="766"
          y="142"
          width="8"
          height="18"
          fill="url(#fmeGrad)"
          className={`${styles.bar} ${styles.bar2}`}
        />
        <rect
          x="780"
          y="134"
          width="8"
          height="26"
          fill="url(#fmeGrad)"
          className={`${styles.bar} ${styles.bar3}`}
        />
        <text x="770" y="204" textAnchor="middle" className={styles.label}>
          Monitor
        </text>
      </g>
    </svg>
  );
}
