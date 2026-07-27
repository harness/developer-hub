import React from "react";
import styles from "./aiSecurityOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the AI Security module landing page.
 *
 * Mirrors the module's real workflow, rather than an abstract scene:
 *   1. Discover AI assets      - find AI APIs and MCP assets across
 *      environments
 *   2. Map AI connections      - understand how those AI assets connect to
 *      applications
 *   3. Monitor AI threats      - watch for threats targeting AI endpoints
 *   4. Test for injection      - fork: prompt injection found vs hardened
 *   5. Manage AI risk          - apply the same security workflows used for
 *      APIs to AI risk
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library). The one piece of JS is a shared IntersectionObserver
 * hook (./shared/usePauseWhenOffscreen) that pauses all animation while the
 * illustration is scrolled out of view. Shared timing (single $cycle/beat/
 * fire clock) and color-free keyframe shapes live in ./shared/_motion.scss.
 */
export default function AiSecurityOnboardingIllustration() {
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
      aria-label="Animated diagram of the AI Security onboarding flow: discover AI assets, map AI connections to applications, monitor AI threats, test for injection with a fork showing prompt injection versus hardened, then manage AI risk."
    >
      <defs>
        <linearGradient id="aiSecGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5992FF" />
          <stop offset="100%" stopColor="#004FE6" />
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

      {/* Stage 1 - Discover AI assets */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFadeEarly}`} />
        {/* "Discover AI assets" reads as always-on background work rather than a
            discrete step, so this ring pulses continuously from the start
            instead of waiting for the dot to arrive */}
        <circle cx="110" cy="140" r="38" className={styles.pulseRingEarly} />
        {/* chip glyph with a sparkle at its center, representing an AI asset */}
        <rect x="94" y="122" width="32" height="32" rx="4" className={styles.iconStroke} />
        <line x1="88" y1="128" x2="94" y2="128" className={styles.nodeLine} />
        <line x1="88" y1="138" x2="94" y2="138" className={styles.nodeLine} />
        <line x1="88" y1="148" x2="94" y2="148" className={styles.nodeLine} />
        <line x1="126" y1="128" x2="132" y2="128" className={styles.nodeLine} />
        <line x1="126" y1="138" x2="132" y2="138" className={styles.nodeLine} />
        <line x1="126" y1="148" x2="132" y2="148" className={styles.nodeLine} />
        <g className={styles.sparklePulse}>
          <path
            d="M110 128 L113 135 L120 138 L113 141 L110 148 L107 141 L100 138 L107 135 Z"
            className={styles.iconFill}
          />
        </g>
        <text x="110" y="200" textAnchor="middle" className={styles.label}>
          Discover AI
        </text>
        <text x="110" y="214" textAnchor="middle" className={styles.label}>
          assets
        </text>
      </g>

      {/* Stage 2 - Map AI connections */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        {/* connected-nodes glyph: how AI APIs/MCP assets link to applications */}
        <line x1="264" y1="150" x2="280" y2="128" className={styles.nodeLine} />
        <line x1="280" y1="128" x2="296" y2="150" className={styles.nodeLine} />
        <line x1="264" y1="150" x2="296" y2="150" className={styles.nodeLine} />
        <circle cx="264" cy="150" r="4" className={`${styles.nodeDot} ${styles.nodePulse1}`} />
        <circle cx="280" cy="128" r="4" className={`${styles.nodeDot} ${styles.nodePulse2}`} />
        <circle cx="296" cy="150" r="4" className={`${styles.nodeDot} ${styles.nodePulse3}`} />
        <text x="280" y="200" textAnchor="middle" className={styles.label}>
          Map AI
        </text>
        <text x="280" y="214" textAnchor="middle" className={styles.label}>
          connections
        </text>
      </g>

      {/* Stage 3 - Monitor AI threats */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        {/* eye/radar glyph: continuous monitoring of AI endpoints */}
        <path
          d="M450 128 C 440 128, 432 136, 428 140 C 432 144, 440 152, 450 152 C 460 152, 468 144, 472 140 C 468 136, 460 128, 450 128 Z"
          className={styles.eyeOutline}
        />
        <circle cx="450" cy="140" r="6" className={styles.pupilDot} />
        <circle cx="450" cy="140" r="6" className={styles.radarPing} />
        <text x="450" y="200" textAnchor="middle" className={styles.label}>
          Monitor AI
        </text>
        <text x="450" y="214" textAnchor="middle" className={styles.label}>
          threats
        </text>
      </g>

      {/* Stage 4 - Test for injection (fork: prompt injection found vs hardened) */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        {/* test-tube / probe glyph */}
        <path
          d="M603 116 h14 v6 l-4 4 v18 a7 7 0 0 1 -6 0 v-18 l-4 -4 z"
          className={styles.tubeOutline}
        />
        <path d="M604 138 a6 6 0 0 0 12 0 z" className={styles.tubeLiquid} />
        <circle cx="610" cy="136" r="1.8" className={styles.bubblePulse} fill="url(#aiSecGrad)" />
        <text x="610" y="200" textAnchor="middle" className={styles.label}>
          Test for
        </text>
        <text x="610" y="214" textAnchor="middle" className={styles.label}>
          injection
        </text>

        {/* fork explanation: prompt injection found fades, hardened glows */}
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
        <g className={styles.mutedTag}>
          <rect x="439" y="46" width="146" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="512" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Prompt injection
          </text>
        </g>
        <g className={styles.brightTag}>
          <rect x="694" y="46" width="100" height="26" rx="13" fill="url(#aiSecGrad)" />
          <text x="744" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            Hardened
          </text>
        </g>
      </g>

      {/* Stage 5 - Manage AI risk */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        {/* shield with checkmark, managing AI risk with the same workflows as APIs */}
        <path
          d="M770 118 L758 123 L758 138 C758 148 764 155 770 158 C776 155 782 148 782 138 L782 123 Z"
          className={styles.shieldOutline}
        />
        <path d="M762 138 L768 144 L780 128" className={styles.checkMark} />
        <text x="770" y="204" textAnchor="middle" className={styles.label}>
          Manage AI risk
        </text>
      </g>
    </svg>
  );
}
