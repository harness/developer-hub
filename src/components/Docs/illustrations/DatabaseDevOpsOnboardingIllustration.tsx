import React from "react";
import styles from "./databaseDevOpsOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Database DevOps module landing page.
 *
 * Mirrors the module's real workflow, rather than an abstract scene:
 *   1. Version schema in Git   - schema changes are committed into Git
 *   2. Preview migration plan  - see the expected schema diff (plan)
 *   3. Policy approval gate    - governance review, blocked vs approved
 *   4. Apply migration         - the approved migration is applied
 *   5. Detect schema drift     - drift is scanned for across environments
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the FME, AI DLC
 * Insights, and IaCM illustrations.
 */
export default function DatabaseDevOpsOnboardingIllustration() {
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
      aria-label="Animated diagram of the Database DevOps onboarding flow: version schema changes in Git, preview the migration plan, pass a policy approval gate that blocks or approves the change, apply the approved migration to the database, then detect schema drift across environments."
    >
      <defs>
        <linearGradient id="dbGrad" x1="0" y1="0" x2="1" y2="1">
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

      {/* traveling pulse: neutral until it clears the approval gate */}
      <circle cx="110" cy="140" r="6" className={styles.travelDot} />

      {/* Stage 1 - Version schema in Git */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        {/* small database cylinder instead of a plain file square */}
        <ellipse cx="110" cy="153" rx="16" ry="5" className={styles.cylinderOutline} />
        <path d="M94 153 v8 a16 5 0 0 0 32 0 v-8" className={styles.cylinderBody} />
        {/* solid color, not the gradient: a purely vertical line has a
            zero-width bounding box, which makes an objectBoundingBox
            gradient render invisible in some SVG engines */}
        <line x1="110" y1="118" x2="110" y2="146" className={styles.shaftLine} />
        <path d="M100 128 L110 116 L120 128" className={styles.iconStroke} />
        <circle cx="110" cy="148" r="3" className={styles.commitDot} />
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Version schema in Git
        </text>
      </g>

      {/* Stage 2 - Preview migration plan */}
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
          Preview migration plan
        </text>
      </g>

      {/* Stage 3 - Policy approval gate (blocked vs approved fork) */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <path
          d="M450 118 L438 123 L438 138 C438 148 444 155 450 158 C456 155 462 148 462 138 L462 123 Z"
          className={styles.shieldOutline}
        />
        <path d="M442 138 L448 144 L460 128" className={styles.checkMark} />
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Policy approval gate
        </text>

        {/* fork explanation: blocked change fades, approved change glows */}
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
        <g className={styles.blockedTag}>
          <rect x="306" y="46" width="120" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="366" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Blocked
          </text>
        </g>
        <g className={styles.approvedTag}>
          <rect x="474" y="46" width="120" height="26" rx="13" fill="url(#dbGrad)" />
          <text x="534" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            Approved
          </text>
        </g>
      </g>

      {/* Stage 4 - Apply migration */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <ellipse cx="610" cy="153" rx="16" ry="5" className={styles.cylinderOutline} />
        <path d="M594 153 v8 a16 5 0 0 0 32 0 v-8" className={styles.cylinderBody} />
        <g className={styles.gearSpin}>
          <circle cx="628" cy="124" r="7" className={styles.iconStroke} />
          <rect x="626.5" y="113" width="3" height="5" className={styles.gearTooth} />
          <rect x="626.5" y="135" width="3" height="5" className={styles.gearTooth} />
          <rect x="617" y="122.5" width="5" height="3" className={styles.gearTooth} />
          <rect x="634" y="122.5" width="5" height="3" className={styles.gearTooth} />
        </g>
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Apply migration
        </text>
      </g>

      {/* Stage 5 - Detect schema drift */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFadeEarly}`} />
        {/* "Detect schema drift" reads as always-on background work rather than a
            discrete step, so this ring pulses continuously from the start
            instead of waiting for the dot to arrive */}
        <circle cx="770" cy="140" r="38" className={styles.pulseRingEarly} />
        <ellipse cx="770" cy="153" rx="16" ry="5" className={styles.cylinderOutline} />
        <path d="M754 153 v8 a16 5 0 0 0 32 0 v-8" className={styles.cylinderBody} />
        <circle cx="770" cy="128" r="9" className={styles.radarRingStatic} />
        <circle cx="770" cy="128" r="14" className={styles.radarRingStatic} />
        <circle cx="770" cy="128" r="9" className={styles.radarPing} />
        <g className={styles.radarSweepGroup}>
          <line x1="770" y1="128" x2="770" y2="115" className={styles.radarSweepLine} />
        </g>
        <text x="770" y="204" textAnchor="middle" className={styles.label}>
          Detect schema drift
        </text>
      </g>
    </svg>
  );
}
