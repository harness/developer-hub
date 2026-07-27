import React from "react";
import styles from "./platformOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Harness Platform module landing page.
 *
 * Mirrors the module's real value ("the shared foundation for all Harness
 * modules"), rather than an abstract scene:
 *   1. Manage access        - RBAC and SSO authenticate/authorize a request
 *   2. Secure secrets        - secrets and delegates protect execution
 *   3. Enforce governance    - Policy as Code reviews and stamps the change
 *   4. Orchestrate pipelines - one control plane runs pipelines across
 *                              every Harness module
 *   5. Audit everything      - full visibility and audit trails
 *
 * The traveling pulse starts neutral (an unauthenticated request) and turns
 * brand-blue once it clears the access-control checkpoint (node 1, "Manage
 * access"), to visualize "authenticated and authorized."
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the FME, AI DLC
 * Insights, IaCM, and Harness AI illustrations. The one piece of JS is a
 * shared IntersectionObserver hook (./shared/usePauseWhenOffscreen) that
 * pauses all animation while the illustration is scrolled out of view.
 * Shared timing (single $cycle/beat/fire clock) and color-free keyframe
 * shapes live in ./shared/_motion.scss.
 */
export default function PlatformOnboardingIllustration() {
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
      aria-label="Animated diagram of the Harness Platform foundation: manage access with RBAC and SSO, secure secrets and delegates, enforce governance with Policy as Code, orchestrate pipelines across every Harness module from one control plane, and audit everything."
    >
      <defs>
        <linearGradient id="platformGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5CE1FF" />
          <stop offset="100%" stopColor="#00ABE4" />
        </linearGradient>
      </defs>

      {/* backbone connector - gapped at each node so the line reads as a
          connector between stages, not an overlay running through them */}
      <line x1="148" y1="140" x2="242" y2="140" className={styles.connectorLine} />
      <line x1="318" y1="140" x2="412" y2="140" className={styles.connectorLine} />
      <line x1="488" y1="140" x2="572" y2="140" className={styles.connectorLine} />
      <line x1="648" y1="140" x2="732" y2="140" className={styles.connectorLine} />

      {/* traveling pulse: neutral until it clears the access-control checkpoint */}
      <circle cx="110" cy="140" r="6" className={styles.travelDot} />

      {/* Stage 1 - Manage access (RBAC + SSO) */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <rect x="100" y="138" width="20" height="16" rx="3" fill="url(#platformGrad)" className={styles.lockBody} />
        <path d="M103 138 v-6 a7 7 0 0 1 14 0 v6" className={styles.lockShackle} />
        <circle cx="110" cy="145" r="1.8" className={styles.keyhole} />
        {/* solid color, not the gradient: a purely vertical line has a
            zero-width bounding box, which makes an objectBoundingBox
            gradient render invisible in some SVG engines */}
        <line x1="110" y1="147" x2="110" y2="150" className={styles.keyholeStem} />
        <circle cx="127" cy="122" r="3.5" className={styles.ssoDot} />
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Manage access
        </text>
        <text x="110" y="220" textAnchor="middle" className={styles.subLabel}>
          RBAC &amp; SSO
        </text>
      </g>

      {/* Stage 2 - Secure secrets & delegates */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <g className={styles.keyTurn}>
          <circle cx="268" cy="132" r="6" className={styles.keyHead} />
          <line x1="273" y1="137" x2="286" y2="150" className={styles.keyShaft} />
          <line x1="281" y1="145" x2="285" y2="149" className={styles.keyShaft} />
          <line x1="286" y1="150" x2="290" y2="146" className={styles.keyShaft} />
        </g>
        <rect x="288" y="152" width="11" height="9" rx="1.5" fill="url(#platformGrad)" className={styles.delegateBox} />
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Secure secrets &amp; delegates
        </text>
        <text x="280" y="220" textAnchor="middle" className={styles.subLabel}>
          Vault-backed secrets
        </text>
      </g>

      {/* Stage 3 - Enforce governance (Policy as Code) */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <rect x="434" y="116" width="24" height="30" rx="3" className={styles.docOutline} />
        <line x1="439" y1="125" x2="453" y2="125" className={styles.docLine} />
        <line x1="439" y1="132" x2="453" y2="132" className={styles.docLine} />
        <line x1="439" y1="139" x2="447" y2="139" className={styles.docLine} />
        <g className={styles.stampDown}>
          <circle cx="458" cy="146" r="9" className={styles.stampCircle} />
          <path d="M454 146 L457 150 L463 141" className={styles.stampCheck} />
        </g>
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Enforce governance
        </text>
        <text x="450" y="220" textAnchor="middle" className={styles.subLabel}>
          Policy as Code
        </text>
      </g>

      {/* Stage 4 - Orchestrate pipelines across every module */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <rect x="592" y="136" width="8" height="8" rx="1.5" fill="url(#platformGrad)" className={styles.pipeSquare} />
        <rect x="606" y="136" width="8" height="8" rx="1.5" fill="url(#platformGrad)" className={styles.pipeSquare} />
        <rect x="620" y="136" width="8" height="8" rx="1.5" fill="url(#platformGrad)" className={styles.pipeSquare} />
        <line x1="600" y1="140" x2="606" y2="140" className={styles.pipeLine} />
        <line x1="614" y1="140" x2="620" y2="140" className={styles.pipeLine} />
        <circle cx="596" cy="140" r="2.5" className={styles.pipeDot} />
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Orchestrate pipelines
        </text>
        <text x="610" y="220" textAnchor="middle" className={styles.subLabel}>
          Every module, one control plane
        </text>
      </g>

      {/* Stage 5 - Audit everything */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <path
          d="M750 140 C 758 128, 782 128, 790 140 C 782 152, 758 152, 750 140 Z"
          className={styles.eyeOutline}
        />
        <circle cx="770" cy="140" r="5" fill="url(#platformGrad)" className={styles.eyePupil} />
        <text x="770" y="204" textAnchor="middle" className={styles.label}>
          Audit everything
        </text>
        <text x="770" y="220" textAnchor="middle" className={styles.subLabel}>
          Full visibility &amp; trails
        </text>
      </g>
    </svg>
  );
}
