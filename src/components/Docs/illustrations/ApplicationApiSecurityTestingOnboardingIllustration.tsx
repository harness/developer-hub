import React from "react";
import styles from "./applicationApiSecurityTestingOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Application & API Security Testing module
 * landing page.
 *
 * Mirrors the module's real workflow, rather than an abstract scene:
 *   1. Monitor API traffic     - continuous monitoring of API traffic
 *   2. Scan for risks          - proactive scanning for vulnerabilities
 *   3. Detect broken auth      - identify broken authentication issues
 *   4. Test for exposure       - fork: exposure found vs secured
 *   5. Resolve & harden        - remediate and harden the application
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the IaCM, Database
 * DevOps, and Artifact Registry illustrations.
 */
export default function ApplicationApiSecurityTestingOnboardingIllustration() {
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
      aria-label="Animated diagram of the Application and API Security Testing onboarding flow: monitor API traffic, scan for risks, detect broken authentication, test for exposure with a fork showing exposure found versus secured, then resolve and harden the application."
    >
      <defs>
        <linearGradient id="astGrad" x1="0" y1="0" x2="1" y2="1">
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

      {/* Stage 1 - Monitor API traffic */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFadeEarly}`} />
        {/* "Monitor API traffic" reads as always-on background work rather than a
            discrete step, so this ring pulses continuously from the start
            instead of waiting for the dot to arrive */}
        <circle cx="110" cy="140" r="38" className={styles.pulseRingEarly} />
        {/* network / traffic glyph: nodes with connecting lines */}
        <line x1="94" y1="150" x2="110" y2="128" className={styles.trafficLine} />
        <line x1="110" y1="128" x2="126" y2="150" className={styles.trafficLine} />
        <line x1="94" y1="150" x2="126" y2="150" className={styles.trafficLineActive} />
        <circle cx="94" cy="150" r="4" className={`${styles.trafficPulse} ${styles.traffic1}`} fill="url(#astGrad)" />
        <circle cx="110" cy="128" r="4" className={`${styles.trafficPulse} ${styles.traffic2}`} fill="url(#astGrad)" />
        <circle cx="126" cy="150" r="4" className={`${styles.trafficPulse} ${styles.traffic3}`} fill="url(#astGrad)" />
        <text x="110" y="200" textAnchor="middle" className={styles.label}>
          Monitor API
        </text>
        <text x="110" y="214" textAnchor="middle" className={styles.label}>
          traffic
        </text>
      </g>

      {/* Stage 2 - Scan for risks */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        {/* shield behind magnifying glass */}
        <path
          d="M280 118 L268 123 L268 138 C268 148 274 155 280 158 C286 155 292 148 292 138 L292 123 Z"
          className={styles.shieldOutline}
        />
        <g className={styles.magnifyPulse}>
          <circle cx="280" cy="134" r="8" className={styles.iconStroke} />
          <line x1="286" y1="140" x2="292" y2="146" className={styles.iconStroke} />
        </g>
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Scan for risks
        </text>
      </g>

      {/* Stage 3 - Detect broken auth */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        {/* broken lock glyph */}
        <path d="M440 130 v-6 a10 10 0 0 1 20 0 v6" className={styles.lockBody} fill="none" />
        <rect x="437" y="130" width="26" height="20" rx="3" className={styles.lockBody} />
        <path d="M448 138 L452 142 L446 148" className={`${styles.lockCrack} ${styles.crackFlash}`} />
        <text x="450" y="200" textAnchor="middle" className={styles.label}>
          Detect broken
        </text>
        <text x="450" y="214" textAnchor="middle" className={styles.label}>
          auth
        </text>
      </g>

      {/* Stage 4 - Test for exposure (fork: exposure found vs secured) */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        {/* test tube / probe glyph */}
        <path
          d="M603 116 h14 v6 l-4 4 v18 a7 7 0 0 1 -6 0 v-18 l-4 -4 z"
          className={styles.testTubeOutline}
        />
        <circle cx="608" cy="138" r="1.6" className={`${styles.bubbleRise} ${styles.bubble1}`} fill="url(#astGrad)" />
        <circle cx="612" cy="141" r="1.4" className={`${styles.bubbleRise} ${styles.bubble2}`} fill="url(#astGrad)" />
        <circle cx="610" cy="144" r="1.8" className={`${styles.bubbleRise} ${styles.bubble3}`} fill="url(#astGrad)" />
        <path d="M604 138 a6 6 0 0 0 12 0 z" className={styles.testTubeLiquid} />
        <text x="610" y="200" textAnchor="middle" className={styles.label}>
          Test for
        </text>
        <text x="610" y="214" textAnchor="middle" className={styles.label}>
          exposure
        </text>

        {/* fork explanation: exposure found fades, secured glows */}
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
        <g className={styles.foundTag}>
          <rect x="446" y="46" width="132" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="512" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Exposure found
          </text>
        </g>
        <g className={styles.securedTag}>
          <rect x="694" y="46" width="100" height="26" rx="13" fill="url(#astGrad)" />
          <text x="744" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            Secured
          </text>
        </g>
      </g>

      {/* Stage 5 - Resolve & harden */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        {/* wrench glyph */}
        <path
          d="M760 122 a7 7 0 1 0 8 8 l14 14 a3 3 0 0 0 4 -4 l-14 -14 a7 7 0 0 0 -12 -4 z"
          className={styles.wrenchOutline}
        />
        <path d="M762 148 L768 154 L780 142" className={styles.checkMark} />
        <text x="770" y="200" textAnchor="middle" className={styles.label}>
          Resolve &amp;
        </text>
        <text x="770" y="214" textAnchor="middle" className={styles.label}>
          harden
        </text>
      </g>
    </svg>
  );
}
