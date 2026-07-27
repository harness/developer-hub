import React from "react";
import styles from "./codeRepositoryOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Code Repository module landing page.
 *
 * Mirrors the workflow shown in the legacy static illustration
 * (static/img/Code_Repo_Landing_Page.png), rather than an abstract scene:
 *   1. Create a repository - spin up a new repo
 *   2. Push code             - commit and branch history builds up
 *   3. Open a pull request   - propose a change for review
 *   4. Review & merge        - changes requested vs. approved and merged
 *   5. Trigger pipeline       - the merge kicks off CI/CD
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the FME, AI DLC
 * Insights, IaCM, Harness AI, and Platform illustrations.
 */
export default function CodeRepositoryOnboardingIllustration() {
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
      aria-label="Animated diagram of the Code Repository onboarding flow: create a repository, push code, open a pull request, review and merge changes, then trigger a pipeline."
    >
      <defs>
        <linearGradient id="codeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#73DFE7" />
          <stop offset="100%" stopColor="#0095F7" />
        </linearGradient>
      </defs>

      {/* backbone connector - gapped at each node so the line reads as a
          connector between stages, not an overlay running through them */}
      <line x1="148" y1="140" x2="242" y2="140" className={styles.connectorLine} />
      <line x1="318" y1="140" x2="412" y2="140" className={styles.connectorLine} />
      <line x1="488" y1="140" x2="572" y2="140" className={styles.connectorLine} />
      <line x1="648" y1="140" x2="732" y2="140" className={styles.connectorLine} />

      {/* traveling pulse: neutral until the change is approved and merged */}
      <circle cx="110" cy="140" r="6" className={styles.travelDot} />

      {/* Stage 1 - Create a repository */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <path
          d="M96 130 h10 l4 5 h14 a2 2 0 0 1 2 2 v13 a2 2 0 0 1 -2 2 h-28 a2 2 0 0 1 -2 -2 v-18 a2 2 0 0 1 2 -2 Z"
          className={styles.folderOutline}
        />
        <g className={styles.createPulse}>
          {/* solid color, not the gradient: purely vertical/horizontal lines
              have a zero-width or zero-height bounding box, which makes an
              objectBoundingBox gradient render invisible in some SVG engines */}
          <line x1="110" y1="140" x2="110" y2="150" className={styles.plusStroke} />
          <line x1="105" y1="145" x2="115" y2="145" className={styles.plusStroke} />
        </g>
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Create a repository
        </text>
      </g>

      {/* Stage 2 - Push code */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <line x1="280" y1="120" x2="280" y2="158" className={styles.commitLine} />
        <line x1="280" y1="138" x2="296" y2="128" className={styles.branchLine} />
        <circle cx="280" cy="124" r="4" fill="url(#codeGrad)" className={`${styles.commitDot} ${styles.commit1}`} />
        <circle cx="280" cy="138" r="4" fill="url(#codeGrad)" className={styles.commitDotStatic} />
        <circle cx="280" cy="152" r="4" fill="url(#codeGrad)" className={styles.commitDotStatic} />
        <circle cx="296" cy="128" r="3.5" fill="url(#codeGrad)" className={`${styles.commitDot} ${styles.commit2}`} />
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Push code
        </text>
      </g>

      {/* Stage 3 - Open a pull request */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <circle cx="436" cy="152" r="4" className={styles.prNode} />
        <path d="M436 152 C 445 152, 445 128, 458 128" className={styles.prArrow} fill="none" />
        <path d="M453 124 L458 128 L453 132" className={styles.prArrowHead} fill="none" />
        <circle cx="436" cy="152" r="4" className={styles.prNode} />
        <circle cx="462" cy="126" r="5.5" className={styles.prBadge} />
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Open a pull request
        </text>
      </g>

      {/* Stage 4 - Review & merge (changes requested vs. approved fork) */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <path
          d="M594 122 h28 a5 5 0 0 1 5 5 v10 a5 5 0 0 1 -5 5 h-16 l-6 6 v-6 h-6 a5 5 0 0 1 -5 -5 v-10 a5 5 0 0 1 5 -5 Z"
          className={styles.reviewBubble}
        />
        <circle cx="604" cy="133" r="1.8" className={styles.reviewDot} />
        <circle cx="610" cy="133" r="1.8" className={styles.reviewDot} />
        <circle cx="616" cy="133" r="1.8" className={styles.reviewDot} />
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Review &amp; merge
        </text>

        {/* fork explanation: changes requested fades, approved merge glows */}
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
        <g className={styles.requestedTag}>
          <rect x="466" y="46" width="120" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="526" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Changes requested
          </text>
        </g>
        <g className={styles.mergedTag}>
          <rect x="634" y="46" width="120" height="26" rx="13" fill="url(#codeGrad)" />
          <text x="694" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            Approved &amp; merged
          </text>
        </g>
      </g>

      {/* Stage 5 - Trigger pipeline */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <path d="M762 120 L780 130 L762 140 Z" className={styles.playIcon} />
        <rect x="753" y="148" width="8" height="8" rx="1.5" fill="url(#codeGrad)" className={`${styles.pipeSquare} ${styles.pipe1}`} />
        <rect x="766" y="148" width="8" height="8" rx="1.5" fill="url(#codeGrad)" className={`${styles.pipeSquare} ${styles.pipe2}`} />
        <rect x="779" y="148" width="8" height="8" rx="1.5" fill="url(#codeGrad)" className={`${styles.pipeSquare} ${styles.pipe3}`} />
        <text x="770" y="204" textAnchor="middle" className={styles.label}>
          Trigger pipeline
        </text>
      </g>
    </svg>
  );
}
