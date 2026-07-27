import React from "react";
import styles from "./iacmOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Infrastructure as Code Management (IaCM)
 * module landing page.
 *
 * Mirrors the workflow shown in the legacy static illustration
 * (static/img/iacm_landing.png), rather than an abstract scene:
 *   1. Push to Git             - infrastructure config is pushed into Git
 *   2. Preview changes         - see what is expected to change (plan)
 *   3. Analyze cost impact     - estimate cost impact of the change
 *   4. Apply governance rules  - policy review, blocked vs approved
 *   5. Provision infrastructure - the approved change is provisioned
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library). The one piece of JS is a shared IntersectionObserver
 * hook (./shared/usePauseWhenOffscreen) that pauses all animation while the
 * illustration is scrolled out of view, so an offscreen hero does not keep
 * painting. Shared timing (single $cycle/beat/fire clock) and color-free
 * keyframe shapes live in ./shared/_motion.scss.
 */

export default function IacmOnboardingIllustration() {
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
      aria-label="Animated diagram of the Infrastructure as Code Management onboarding flow: push infrastructure config to Git, preview the expected changes, analyze cost impact, apply governance rules that either block or approve the change, then provision the approved infrastructure."
    >
      <defs>
        <linearGradient id="iacmGrad" x1="0" y1="0" x2="1" y2="1">
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

      {/* traveling pulse: neutral until it clears the governance checkpoint.
          It fades out (opacity, on the shared clock) as it reaches each
          node and fades back in as it leaves, so the node takes visual
          precedence at the beat and the dot appears to hand off to it. */}
      <circle cx="110" cy="140" r="6" className={styles.travelDot} />

      {/* Stage 1 - Push to Git */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <rect x="94" y="152" width="32" height="10" rx="2" className={styles.squareOutline} />
        {/* solid color, not the gradient: a purely vertical line has a
            zero-width bounding box, which makes an objectBoundingBox
            gradient render invisible in some SVG engines */}
        <line x1="110" y1="118" x2="110" y2="148" className={styles.shaftLine} />
        <path d="M100 128 L110 116 L120 128" className={styles.iconStroke} />
        <circle cx="110" cy="150" r="3" className={styles.commitDot} />
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Push to Git
        </text>
      </g>

      {/* Stage 2 - Preview changes */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <line x1="264" y1="128" x2="282" y2="128" className={styles.codeLine} />
        <line x1="264" y1="138" x2="296" y2="138" className={styles.codeLine} />
        <line x1="264" y1="148" x2="290" y2="148" className={styles.diffLine} />
        <g className={styles.magnifyPulse}>
          <circle cx="298" cy="124" r="9" className={styles.iconStroke} />
          <line x1="304" y1="130" x2="312" y2="138" className={styles.iconStroke} />
        </g>
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Preview changes
        </text>
      </g>

      {/* Stage 3 - Analyze cost impact */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <text x="450" y="128" textAnchor="middle" className={styles.dollarSign}>
          $
        </text>
        <rect x="434" y="148" width="7" height="10" fill="url(#iacmGrad)" className={`${styles.costBar} ${styles.costBar1}`} />
        <rect x="446" y="142" width="7" height="16" fill="url(#iacmGrad)" className={`${styles.costBar} ${styles.costBar2}`} />
        <rect x="458" y="146" width="7" height="12" fill="url(#iacmGrad)" className={`${styles.costBar} ${styles.costBar3}`} />
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Analyze cost impact
        </text>
      </g>

      {/* Stage 4 - Apply governance rules (blocked vs approved fork) */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <path
          d="M610 118 L598 123 L598 138 C598 148 604 155 610 158 C616 155 622 148 622 138 L622 123 Z"
          className={styles.shieldOutline}
        />
        <path d="M602 138 L608 144 L620 128" className={styles.checkMark} />
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Apply governance rules
        </text>

        {/* governance decision, placed ABOVE the node row so the fork lines
            never cross the node labels below. It resolves on node 4's beat:
            the approved branch draws itself in and confirms with a check,
            while the rejected branch flashes once and settles dim. */}
        <path
          d="M600 110 C 578 92, 554 82, 532 72"
          className={styles.forkPathMuted}
          fill="none"
        />
        <path
          d="M620 110 C 642 92, 666 82, 688 72"
          className={styles.forkPathBright}
          fill="none"
        />
        <g className={styles.blockedTag}>
          <rect x="466" y="46" width="120" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="526" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Blocked
          </text>
        </g>
        <g className={styles.approvedTag}>
          <rect x="634" y="46" width="120" height="26" rx="13" fill="url(#iacmGrad)" />
          <path d="M647 59 L651 63 L659 53" className={styles.approvedCheck} />
          <text x="700" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            Approved
          </text>
        </g>
      </g>

      {/* Stage 5 - Provision infrastructure */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <path
          d="M770 116 L783 123.5 L783 138.5 L770 146 L757 138.5 L757 123.5 Z"
          className={styles.hexOutline}
        />
        <rect x="763" y="150" width="6" height="9" fill="url(#iacmGrad)" className={`${styles.buildBlock} ${styles.build1}`} />
        <rect x="771" y="150" width="6" height="9" fill="url(#iacmGrad)" className={`${styles.buildBlock} ${styles.build2}`} />
        <rect x="767" y="158" width="6" height="9" fill="url(#iacmGrad)" className={`${styles.buildBlock} ${styles.build3}`} />
        <text x="770" y="204" textAnchor="middle" className={styles.label}>
          Provision infrastructure
        </text>
      </g>
    </svg>
  );
}
