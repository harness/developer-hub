import React from "react";
import styles from "./aiCodeReviewOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the AI Code Review module landing page.
 *
 * Mirrors the real review sequence rather than an abstract scene:
 *   1. Open a pull request  - a change is proposed
 *   2. Trigger fires        - the aicr pipeline starts on create/update/reopen
 *   3. Agent reviews        - the agent reads the diff plus Harness context
 *   4. Checks reported      - one status check per criterion, pass or fail
 *   5. Risk posted          - a single PR comment carrying the risk level
 *
 * Node 4 is the gate, matching the shared travel keyframe's assumption, so
 * the travel dot uses the shared two-tone travel-dot mixin verbatim.
 *
 * Motion is CSS keyframes on plain SVG shapes (no JS or animation library),
 * matching the Code Repository, IaCM, FME, Harness AI and Platform
 * illustrations.
 */
export default function AiCodeReviewOnboardingIllustration() {
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
      aria-label="Animated diagram of the AI Code Review flow: open a pull request, the trigger fires, the agent reviews the change against your criteria and Harness delivery context, one status check is reported per criterion, and a risk level is posted back to the pull request."
    >
      <defs>
        <linearGradient id="aicrGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B490FF" />
          <stop offset="100%" stopColor="#7A5AF8" />
        </linearGradient>
      </defs>

      {/* backbone connector, gapped at each node so the line reads as a
          connector between stages rather than an overlay through them */}
      <line x1="148" y1="140" x2="242" y2="140" className={styles.connectorLine} />
      <line x1="318" y1="140" x2="412" y2="140" className={styles.connectorLine} />
      <line x1="488" y1="140" x2="572" y2="140" className={styles.connectorLine} />
      <line x1="648" y1="140" x2="732" y2="140" className={styles.connectorLine} />

      {/* traveling pulse: neutral until the checks resolve at node 4 */}
      <circle cx="110" cy="140" r="6" className={styles.travelDot} />

      {/* Stage 1 - Open a pull request */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <circle cx="96" cy="152" r="4" className={styles.prNode} />
        <path d="M96 152 C 105 152, 105 128, 118 128" className={styles.prArrow} fill="none" />
        <path d="M113 124 L118 128 L113 132" className={styles.prArrowHead} fill="none" />
        <circle cx="122" cy="126" r="5.5" className={styles.prBadge} />
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Open a pull request
        </text>
      </g>

      {/* Stage 2 - Trigger fires */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <path d="M283 122 L270 141 L279 141 L277 158 L290 139 L281 139 Z" className={styles.boltIcon} />
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Trigger fires
        </text>
      </g>

      {/* Stage 3 - Agent reviews, pulling Harness context in */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <path d="M440 132 L433 140 L440 148" className={styles.bracket} fill="none" />
        <path d="M460 132 L467 140 L460 148" className={styles.bracket} fill="none" />
        {/* the sparkle is the agent: it is what separates this from a linter */}
        <path
          d="M450 126 L452.2 133.4 L459.6 135.6 L452.2 137.8 L450 145.2 L447.8 137.8 L440.4 135.6 L447.8 133.4 Z"
          className={styles.sparkle}
        />
        {/* Harness delivery context feeding the agent */}
        <g className={styles.contextGroup}>
          <path d="M450 102 L450 118" className={styles.contextFeed} fill="none" />
          <rect x="386" y="80" width="128" height="24" rx="12" className={styles.contextPill} />
          <text x="450" y="96" textAnchor="middle" className={styles.contextLabel}>
            Harness context
          </text>
        </g>
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Agent reviews
        </text>
      </g>

      {/* Stage 4 - Checks reported. This is the gate: one check per criterion,
          each resolving to a pass or a finding. */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <path d="M598 132 L604 138 L616 126" className={styles.checkTick} fill="none" />
        <line x1="598" y1="148" x2="622" y2="148" className={styles.checkRow} />
        <line x1="598" y1="156" x2="614" y2="156" className={styles.checkRow} />
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Checks reported
        </text>

        {/* fork: a finding fades back, a clean run glows */}
        <path d="M598 110 C 566 92, 546 82, 526 72" className={styles.forkPathMuted} fill="none" />
        <path d="M622 110 C 654 92, 674 82, 694 72" className={styles.forkPathBright} fill="none" />
        <g className={styles.findingTag}>
          <rect x="466" y="46" width="120" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="526" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Finding raised
          </text>
        </g>
        <g className={styles.passedTag}>
          <rect x="634" y="46" width="120" height="26" rx="13" fill="url(#aicrGrad)" />
          <text x="694" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            All checks passed
          </text>
        </g>
      </g>

      {/* Stage 5 - Risk posted back to the pull request */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <path
          d="M754 126 h32 a5 5 0 0 1 5 5 v12 a5 5 0 0 1 -5 5 h-18 l-7 7 v-7 h-7 a5 5 0 0 1 -5 -5 v-12 a5 5 0 0 1 5 -5 Z"
          className={styles.commentBubble}
        />
        <rect x="757" y="132" width="10" height="4" rx="2" fill="url(#aicrGrad)" className={`${styles.riskBar} ${styles.risk1}`} />
        <rect x="770" y="132" width="10" height="4" rx="2" fill="url(#aicrGrad)" className={`${styles.riskBar} ${styles.risk2}`} />
        <rect x="757" y="140" width="16" height="4" rx="2" fill="url(#aicrGrad)" className={`${styles.riskBar} ${styles.risk3}`} />
        <text x="770" y="204" textAnchor="middle" className={styles.label}>
          Risk posted
        </text>
      </g>
    </svg>
  );
}
