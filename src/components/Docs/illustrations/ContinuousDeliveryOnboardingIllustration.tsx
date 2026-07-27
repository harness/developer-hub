import React from "react";
import styles from "./continuousDeliveryOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Continuous Delivery (CD) & GitOps module
 * landing page.
 *
 * Mirrors the real Harness CD & GitOps workflow, rather than an abstract
 * scene:
 *   1. Define your pipeline      - author a pipeline with a branching flow
 *   2. Deploy across environments - roll the change out to dev, stage, prod
 *   3. Verify deployment health   - health checks confirm the rollout is safe
 *   4. Progressive delivery       - canary vs full rollout decision point
 *   5. GitOps continuous sync     - drift is continuously reconciled with Git
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the FME, AI DLC
 * Insights, and IaCM illustrations.
 */
export default function ContinuousDeliveryOnboardingIllustration() {
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
      aria-label="Animated diagram of the Continuous Delivery and GitOps onboarding flow: define your pipeline, deploy across environments, verify deployment health, choose a progressive delivery strategy between a canary and a full rollout, then keep infrastructure continuously synced with GitOps."
    >
      <defs>
        <linearGradient id="cdGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#62F91F" />
          <stop offset="100%" stopColor="#45BD35" />
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

      {/* Stage 1 - Define your pipeline */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <rect x="102" y="112" width="16" height="10" rx="2" className={styles.squareOutline} />
        {/* solid color, not the gradient: a purely vertical line has a
            zero-width bounding box, which makes an objectBoundingBox
            gradient render invisible in some SVG engines */}
        <line x1="110" y1="122" x2="110" y2="132" className={styles.shaftLine} />
        <path d="M110 132 L98 146 M110 132 L122 146" className={styles.iconStroke} />
        <circle cx="98" cy="149" r="3" className={`${styles.branchDot} ${styles.branchDot1}`} />
        <circle cx="122" cy="149" r="3" className={`${styles.branchDot} ${styles.branchDot2}`} />
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Define your pipeline
        </text>
      </g>

      {/* Stage 2 - Deploy across environments */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <rect x="256" y="128" width="10" height="10" rx="2" className={styles.squareOutline} />
        <rect x="275" y="128" width="10" height="10" rx="2" className={styles.squareOutline} />
        <rect x="294" y="128" width="10" height="10" rx="2" fill="url(#cdGrad)" className={styles.envActive} />
        {/* solid color, not the gradient: purely horizontal lines have a
            zero-height bounding box, which makes an objectBoundingBox
            gradient render invisible in some SVG engines */}
        <line x1="266" y1="133" x2="275" y2="133" className={styles.envLine} />
        <line x1="285" y1="133" x2="294" y2="133" className={styles.envLine} />
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Deploy across environments
        </text>
      </g>

      {/* Stage 3 - Verify deployment health */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <path
          d="M450 118 L438 123 L438 138 C438 148 444 155 450 158 C456 155 462 148 462 138 L462 123 Z"
          className={styles.shieldOutline}
        />
        <path d="M442 138 L448 144 L460 128" className={styles.checkMark} />
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Verify deployment health
        </text>
      </g>

      {/* Stage 4 - Progressive delivery (canary vs full rollout fork) */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <line x1="610" y1="118" x2="610" y2="130" className={styles.shaftLine} />
        <path d="M610 130 L598 146 M610 130 L622 146" className={styles.iconStroke} />
        <circle cx="598" cy="149" r="3" className={styles.forkDotMuted} />
        <circle cx="622" cy="149" r="3" className={styles.forkDotBright} />
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Progressive delivery
        </text>

        {/* fork explanation: canary fades, full rollout glows */}
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
        <g className={styles.canaryTag}>
          <rect x="466" y="46" width="120" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="526" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Canary
          </text>
        </g>
        <g className={styles.rolloutTag}>
          <rect x="634" y="46" width="120" height="26" rx="13" fill="url(#cdGrad)" />
          <text x="694" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            Full rollout
          </text>
        </g>
      </g>

      {/* Stage 5 - GitOps continuous sync */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <g className={styles.syncSpin}>
          <path d="M756 134 A16 16 0 1 1 772 124" className={styles.iconStroke} fill="none" />
          <path d="M768 118 L772 124 L778 119" className={styles.iconStroke} fill="none" />
          <path d="M784 146 A16 16 0 1 1 768 156" className={styles.iconStroke} fill="none" />
          <path d="M772 162 L768 156 L762 161" className={styles.iconStroke} fill="none" />
        </g>
        <text x="770" y="204" textAnchor="middle" className={styles.label}>
          GitOps continuous sync
        </text>
      </g>
    </svg>
  );
}
