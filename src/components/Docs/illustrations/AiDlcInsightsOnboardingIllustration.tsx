import React from "react";
import styles from "./aiDlcInsightsOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the AI DLC Insights module landing page.
 *
 * Mirrors the practical setup path a team follows, rather than an abstract
 * scene:
 *   1. Deploy agent      - deploy the AI DLC Agent to capture activity
 *   2. Connect sources    - aggregate issue trackers, source control, CI/CD
 *   3. Set up teams       - organize org trees / teams for reporting
 *   4. Track delivery     - watch work move through the lifecycle, and tell
 *                           AI-generated work apart from human-written work
 *   5. View insights      - AI engineering, efficiency, productivity,
 *                           business alignment, and security dashboards
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library). The one piece of JS is a shared IntersectionObserver
 * hook (./shared/usePauseWhenOffscreen) that pauses all animation while the
 * illustration is scrolled out of view. Shared timing (single $cycle/beat/
 * fire clock) and color-free keyframe shapes live in ./shared/_motion.scss.
 */
export default function AiDlcInsightsOnboardingIllustration() {
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
      aria-label="Animated diagram of the AI DLC Insights onboarding flow: deploy the agent, connect your sources, set up teams, track delivery while telling AI-generated work apart from human-written work, then view insights dashboards."
    >
      <defs>
        <linearGradient id="dlcGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7CFF3D" />
          <stop offset="100%" stopColor="#2E9E20" />
        </linearGradient>
      </defs>

      {/* backbone connector - gapped at each node so the line reads as a
          connector between stages, not an overlay running through them */}
      <line x1="148" y1="140" x2="242" y2="140" className={styles.connectorLine} />
      <line x1="318" y1="140" x2="412" y2="140" className={styles.connectorLine} />
      <line x1="488" y1="140" x2="572" y2="140" className={styles.connectorLine} />
      <line x1="648" y1="140" x2="732" y2="140" className={styles.connectorLine} />

      {/* traveling pulse: neutral until it is flagged AI-generated at stage 4 */}
      <circle cx="110" cy="140" r="6" className={styles.travelDot} />

      {/* Stage 1 - Deploy agent */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        {/* solid color, not the gradient: a purely vertical line has a
            zero-width bounding box, which makes an objectBoundingBox
            gradient render invisible in some SVG engines */}
        <line x1="110" y1="114" x2="110" y2="134" className={styles.shaftLine} />
        <path d="M100 128 L110 140 L120 128" className={styles.iconStroke} />
        <path d="M94 148 L94 158 L126 158 L126 148" className={styles.iconStroke} />
        <circle cx="110" cy="118" r="3" className={styles.dropDot} />
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Deploy Harness AI DLC Agent
        </text>
      </g>

      {/* Stage 2 - Connect sources */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <line x1="258" y1="118" x2="280" y2="140" className={styles.spokeLine} />
        <line x1="302" y1="118" x2="280" y2="140" className={styles.spokeLine} />
        <line x1="280" y1="162" x2="280" y2="140" className={styles.spokeLine} />
        <circle cx="280" cy="140" r="4.5" fill="url(#dlcGrad)" />
        <circle cx="258" cy="118" r="3.5" className={`${styles.sourceDot} ${styles.source1}`} />
        <circle cx="302" cy="118" r="3.5" className={`${styles.sourceDot} ${styles.source2}`} />
        <circle cx="280" cy="162" r="3.5" className={`${styles.sourceDot} ${styles.source3}`} />
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Connect sources
        </text>
      </g>

      {/* Stage 3 - Set up teams */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <line x1="450" y1="124" x2="436" y2="152" className={styles.orgLine} />
        <line x1="450" y1="124" x2="464" y2="152" className={styles.orgLine} />
        <circle cx="450" cy="120" r="4.5" className={`${styles.teamDot} ${styles.team1}`} fill="url(#dlcGrad)" />
        <circle cx="436" cy="156" r="4.5" className={`${styles.teamDot} ${styles.team2}`} fill="url(#dlcGrad)" />
        <circle cx="464" cy="156" r="4.5" className={`${styles.teamDot} ${styles.team3}`} fill="url(#dlcGrad)" />
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Set up teams
        </text>
      </g>

      {/* Stage 4 - Track delivery (and tell AI-generated work apart) */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <rect x="590" y="134" width="9" height="9" rx="2" className={styles.squareOutline} />
        <rect x="605" y="134" width="9" height="9" rx="2" className={styles.squareOutline} />
        <rect x="620" y="134" width="9" height="9" rx="2" className={styles.squareOutline} />
        <circle cx="596" cy="138.5" r="5" fill="url(#dlcGrad)" className={styles.workItem} />
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Track delivery
        </text>

        {/* fork explanation: human-written work fades, AI-generated work glows */}
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
        <g className={styles.humanTag}>
          <rect x="466" y="46" width="120" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="526" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Human-written
          </text>
        </g>
        <g className={styles.aiTag}>
          <rect x="634" y="46" width="120" height="26" rx="13" fill="url(#dlcGrad)" />
          <text x="694" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            AI-generated
          </text>
        </g>
      </g>

      {/* Stage 5 - View insights */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <rect
          x="750"
          y="150"
          width="7"
          height="10"
          fill="url(#dlcGrad)"
          className={`${styles.bar} ${styles.bar1}`}
        />
        <rect
          x="761"
          y="142"
          width="7"
          height="18"
          fill="url(#dlcGrad)"
          className={`${styles.bar} ${styles.bar2}`}
        />
        <rect
          x="772"
          y="146"
          width="7"
          height="14"
          fill="url(#dlcGrad)"
          className={`${styles.bar} ${styles.bar3}`}
        />
        <rect
          x="783"
          y="134"
          width="7"
          height="26"
          fill="url(#dlcGrad)"
          className={`${styles.bar} ${styles.bar4}`}
        />
        <text x="770" y="204" textAnchor="middle" className={styles.label}>
          View insights
        </text>
      </g>
    </svg>
  );
}
