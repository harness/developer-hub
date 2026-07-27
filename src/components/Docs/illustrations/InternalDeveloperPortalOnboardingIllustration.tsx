import React from "react";
import styles from "./internalDeveloperPortalOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Internal Developer Portal (IDP) module
 * landing page.
 *
 * Depicts the core IDP onboarding flow as a five-stage journey:
 *   1. Catalog software components - the software catalog is populated
 *   2. Scaffold new services       - developers self-serve new services
 *                                     from templates
 *   3. Track service health        - live status and health signals for
 *                                     owned services
 *   4. Discover docs & APIs        - technical documentation, APIs, and
 *                                     services are discoverable
 *   5. Collaborate across teams    - teams stay linked and informed
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the IaCM, SAST and SCA
 * (QwietAI), and other module illustrations. This module has no natural
 * fork point, so the flow is kept linear. The one piece of JS is a shared
 * IntersectionObserver hook (./shared/usePauseWhenOffscreen) that pauses
 * all animation while the illustration is scrolled out of view. Shared
 * timing (single $cycle/beat/fire clock) and color-free keyframe shapes
 * live in ./shared/_motion.scss.
 */
export default function InternalDeveloperPortalOnboardingIllustration() {
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
      aria-label="Animated diagram of the Internal Developer Portal onboarding flow: catalog software components, scaffold new services, track service health, discover docs and APIs, then collaborate across teams."
    >
      <defs>
        <linearGradient id="idpGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00E9DB" />
          <stop offset="100%" stopColor="#249789" />
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

      {/* Stage 1 - Catalog software components */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <rect x="92" y="122" width="16" height="16" rx="2" className={`${styles.iconStroke} ${styles.catalogBlock} ${styles.catalogBlock1}`} />
        <rect x="112" y="122" width="16" height="16" rx="2" className={`${styles.iconStroke} ${styles.catalogBlock} ${styles.catalogBlock2}`} />
        <rect x="92" y="142" width="16" height="16" rx="2" className={`${styles.iconStroke} ${styles.catalogBlock} ${styles.catalogBlock3}`} />
        <rect x="112" y="142" width="16" height="16" rx="2" className={`${styles.iconStroke} ${styles.catalogBlock} ${styles.catalogBlock4}`} />
        <text x="110" y="200" textAnchor="middle" className={styles.label}>
          Catalog software
        </text>
        <text x="110" y="214" textAnchor="middle" className={styles.label}>
          components
        </text>
      </g>

      {/* Stage 2 - Scaffold new services */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <rect x="266" y="114" width="24" height="34" rx="3" className={styles.iconStroke} />
        <line x1="272" y1="124" x2="284" y2="124" className={styles.codeLine} />
        <line x1="272" y1="132" x2="284" y2="132" className={styles.codeLine} />
        <line x1="272" y1="140" x2="280" y2="140" className={styles.codeLine} />
        <line x1="298" y1="112" x2="298" y2="124" className={`${styles.shaftLine} ${styles.sparklePulse}`} />
        <line x1="292" y1="118" x2="304" y2="118" className={`${styles.shaftLine} ${styles.sparklePulse}`} />
        <text x="280" y="200" textAnchor="middle" className={styles.label}>
          Scaffold new
        </text>
        <text x="280" y="214" textAnchor="middle" className={styles.label}>
          services
        </text>
      </g>

      {/* Stage 3 - Track service health */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFadeEarly}`} />
        {/* "Track service health" reads as always-on background work rather than a
            discrete step, so this ring pulses continuously from the start
            instead of waiting for the dot to arrive */}
        <circle cx="450" cy="140" r="38" className={styles.pulseRingEarly} />
        <path
          d="M412 140 L424 140 L432 120 L442 160 L450 140 L468 140"
          className={`${styles.iconStroke} ${styles.heartbeatLine}`}
        />
        <circle cx="468" cy="140" r="5" className={styles.statusDot} />
        <text x="450" y="200" textAnchor="middle" className={styles.label}>
          Track service
        </text>
        <text x="450" y="214" textAnchor="middle" className={styles.label}>
          health
        </text>
      </g>

      {/* Stage 4 - Discover docs & APIs */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <rect x="594" y="122" width="18" height="24" rx="2" className={styles.squareOutline} />
        <line x1="598" y1="130" x2="608" y2="130" className={styles.codeLine} />
        <line x1="598" y1="137" x2="608" y2="137" className={styles.codeLine} />
        <line x1="598" y1="144" x2="604" y2="144" className={styles.codeLine} />
        <circle cx="622" cy="130" r="10" className={`${styles.iconStroke} ${styles.magnifyPulse}`} />
        <line x1="629" y1="137" x2="637" y2="145" className={`${styles.shaftLine} ${styles.magnifyPulse}`} />
        <text x="610" y="200" textAnchor="middle" className={styles.label}>
          Discover docs
        </text>
        <text x="610" y="214" textAnchor="middle" className={styles.label}>
          &amp; APIs
        </text>
      </g>

      {/* Stage 5 - Collaborate across teams */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <line x1="755" y1="128" x2="785" y2="128" className={styles.graphLine} />
        <line x1="755" y1="128" x2="770" y2="155" className={styles.graphLine} />
        <line x1="785" y1="128" x2="770" y2="155" className={styles.graphLine} />
        <circle cx="755" cy="128" r="7" className={`${styles.graphNode} ${styles.teamNode} ${styles.teamNode1}`} />
        <circle cx="785" cy="128" r="7" className={`${styles.graphNode} ${styles.teamNode} ${styles.teamNode2}`} />
        <circle cx="770" cy="155" r="7" className={`${styles.graphNode} ${styles.teamNode} ${styles.teamNode3}`} />
        <text x="770" y="200" textAnchor="middle" className={styles.label}>
          Collaborate
        </text>
        <text x="770" y="214" textAnchor="middle" className={styles.label}>
          across teams
        </text>
      </g>
    </svg>
  );
}
