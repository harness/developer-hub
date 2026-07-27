import React from "react";
import styles from "./artifactRegistryOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Artifact Registry module landing page.
 *
 * Mirrors the practical lifecycle of an artifact moving through the
 * registry, rather than an abstract scene:
 *   1. Push build artifacts       - CI pushes build output into the registry
 *   2. Centralize & organize      - different artifact types converge into
 *                                   one secure, organized hub
 *   3. Scan & enforce policy      - vulnerability scanning and compliance
 *                                   gates, either flagged or compliant
 *   4. Promote across environments - artifacts are promoted dev -> stage ->
 *                                   prod
 *   5. Pull & deploy anywhere     - the artifact is retrieved and deployed
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library). The one piece of JS is a shared IntersectionObserver
 * hook (./shared/usePauseWhenOffscreen) that pauses all animation while the
 * illustration is scrolled out of view. Shared timing (single $cycle/beat/
 * fire clock) and color-free keyframe shapes live in ./shared/_motion.scss.
 */
export default function ArtifactRegistryOnboardingIllustration() {
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
      aria-label="Animated diagram of the Artifact Registry onboarding flow: push build artifacts into the registry, centralize and organize them by artifact type, scan and enforce policy that flags vulnerabilities or marks builds compliant, promote artifacts across environments, then pull and deploy them anywhere."
    >
      <defs>
        <linearGradient id="arGrad" x1="0" y1="0" x2="1" y2="1">
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

      {/* traveling pulse: neutral until it clears the scan/policy checkpoint */}
      <circle cx="110" cy="140" r="6" className={styles.travelDot} />

      {/* Stage 1 - Push build artifacts */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <rect x="94" y="116" width="32" height="14" rx="2" className={styles.squareOutline} />
        {/* solid color, not the gradient: a purely vertical line has a
            zero-width bounding box, which makes an objectBoundingBox
            gradient render invisible in some SVG engines */}
        <line x1="110" y1="158" x2="110" y2="132" className={styles.shaftLine} />
        <path d="M100 140 L110 128 L120 140" className={styles.iconStroke} />
        <circle cx="110" cy="158" r="3" className={styles.riseDot} />
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Push build artifacts
        </text>
      </g>

      {/* Stage 2 - Centralize & organize */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <line x1="258" y1="118" x2="280" y2="140" className={styles.spokeLine} />
        <line x1="302" y1="118" x2="280" y2="140" className={styles.spokeLine} />
        <line x1="280" y1="162" x2="280" y2="140" className={styles.spokeLine} />
        <circle cx="280" cy="140" r="4.5" fill="url(#arGrad)" />
        {/* three differently-shaped nodes: container image, package, binary */}
        <rect x="250" y="110" width="8" height="8" rx="1" className={styles.squareOutline} />
        <circle cx="302" cy="118" r="4" className={styles.squareOutline} />
        <path d="M280 156 L286 162 L280 168 L274 162 Z" className={styles.squareOutline} />
        <circle cx="254" cy="114" r="3.5" className={`${styles.convergeDot} ${styles.converge1}`} />
        <circle cx="302" cy="118" r="3.5" className={`${styles.convergeDot} ${styles.converge2}`} />
        <circle cx="280" cy="162" r="3.5" className={`${styles.convergeDot} ${styles.converge3}`} />
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Centralize &amp; organize
        </text>
      </g>

      {/* Stage 3 - Scan & enforce policy (flagged vs compliant fork) */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <path
          d="M450 118 L438 123 L438 138 C438 148 444 155 450 158 C456 155 462 148 462 138 L462 123 Z"
          className={styles.shieldOutline}
        />
        <g className={styles.magnifyPulse}>
          <circle cx="463" cy="150" r="6" className={styles.iconStroke} />
          <line x1="467.5" y1="154.5" x2="472" y2="159" className={styles.iconStroke} />
        </g>
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Scan &amp; enforce policy
        </text>

        {/* fork explanation: flagged vulnerability fades, compliant build glows */}
        <path d="M438 110 C 410 92, 380 82, 350 72" className={styles.forkPathMuted} fill="none" />
        <path d="M462 110 C 490 92, 520 82, 550 72" className={styles.forkPathBright} fill="none" />
        <g className={styles.vulnTag}>
          <rect x="275" y="46" width="150" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="350" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Vulnerability found
          </text>
        </g>
        <g className={styles.compliantTag}>
          <rect x="475" y="46" width="150" height="26" rx="13" fill="url(#arGrad)" />
          <text x="550" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            Compliant
          </text>
        </g>
      </g>

      {/* Stage 4 - Promote across environments */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <rect x="590" y="134" width="9" height="9" rx="2" className={styles.squareOutline} />
        <rect x="605" y="134" width="9" height="9" rx="2" className={styles.squareOutline} />
        <rect x="620" y="134" width="9" height="9" rx="2" className={styles.squareOutline} />
        <path d="M599 135 L603 138.5 L599 142" className={styles.chevronArrow} />
        <path d="M614 135 L618 138.5 L614 142" className={styles.chevronArrow} />
        <circle cx="596" cy="138.5" r="5" fill="url(#arGrad)" className={styles.workItem} />
        <text x="610" y="200" textAnchor="middle" className={styles.label}>
          Promote across
        </text>
        <text x="610" y="214" textAnchor="middle" className={styles.label}>
          environments
        </text>
      </g>

      {/* Stage 5 - Pull & deploy anywhere */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <rect x="754" y="116" width="32" height="14" rx="2" className={styles.squareOutline} />
        <line x1="770" y1="132" x2="770" y2="158" className={styles.shaftLine} />
        <path d="M760 148 L770 160 L780 148" className={styles.iconStroke} />
        <circle cx="770" cy="132" r="3" className={styles.dropDot} />
        <text x="770" y="200" textAnchor="middle" className={styles.label}>
          Pull &amp; deploy
        </text>
        <text x="770" y="214" textAnchor="middle" className={styles.label}>
          anywhere
        </text>
      </g>
    </svg>
  );
}
