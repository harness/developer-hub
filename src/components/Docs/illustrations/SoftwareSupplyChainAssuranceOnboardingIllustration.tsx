import React from "react";
import styles from "./softwareSupplyChainAssuranceOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Supply Chain Security (SSCA) module landing
 * page.
 *
 * Mirrors the module's core workflow, rather than an abstract scene:
 *   1. Generate SBOM         - a software bill of materials is generated
 *   2. Verify provenance     - artifact provenance is attested and verified
 *   3. Scan for vulnerabilities - the artifact is scanned for known CVEs
 *   4. Enforce compliance    - a policy gate blocks non-compliant builds and
 *      lets compliant ones through
 *   5. Attest & ship artifact - the compliant artifact is signed and shipped
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the FME, AI DLC
 * Insights, IaCM, Harness AI, Platform, Code Repository, Artifact Registry,
 * and Database DevOps illustrations. The one piece of JS is a shared
 * IntersectionObserver hook (./shared/usePauseWhenOffscreen) that pauses all
 * animation while the illustration is scrolled out of view. Shared timing
 * (single $cycle/beat/fire clock) and color-free keyframe shapes live in
 * ./shared/_motion.scss.
 */
export default function SoftwareSupplyChainAssuranceOnboardingIllustration() {
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
      aria-label="Animated diagram of the Supply Chain Security onboarding flow: generate a software bill of materials, verify artifact provenance, scan for vulnerabilities, enforce a compliance gate that blocks or approves the build, then attest and ship the compliant artifact."
    >
      <defs>
        <linearGradient id="sscaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF7F77" />
          <stop offset="100%" stopColor="#E62D14" />
        </linearGradient>
      </defs>

      {/* backbone connector - gapped at each node so the line reads as a
          connector between stages, not an overlay running through them */}
      <line x1="148" y1="140" x2="242" y2="140" className={styles.connectorLine} />
      <line x1="318" y1="140" x2="412" y2="140" className={styles.connectorLine} />
      <line x1="488" y1="140" x2="572" y2="140" className={styles.connectorLine} />
      <line x1="648" y1="140" x2="732" y2="140" className={styles.connectorLine} />

      {/* traveling pulse: neutral until it clears the compliance gate */}
      <circle cx="110" cy="140" r="6" className={styles.travelDot} />

      {/* Stage 1 - Generate SBOM */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <rect x="96" y="114" width="28" height="40" rx="3" className={styles.docOutline} />
        <line x1="102" y1="124" x2="118" y2="124" className={`${styles.listLine} ${styles.sbomLine} ${styles.sbom1}`} />
        <line x1="102" y1="132" x2="120" y2="132" className={`${styles.listLine} ${styles.sbomLine} ${styles.sbom2}`} />
        <line x1="102" y1="140" x2="114" y2="140" className={`${styles.listLineBright} ${styles.sbomLine} ${styles.sbom3}`} />
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Generate SBOM
        </text>
      </g>

      {/* Stage 2 - Verify provenance */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <path
          d="M280 118 L268 123 L268 138 C268 148 274 155 280 158 C286 155 292 148 292 138 L292 123 Z"
          className={styles.shieldOutline}
        />
        <path d="M272 138 L278 144 L290 128" className={styles.checkMark} />
        <text x="280" y="200" textAnchor="middle" className={styles.label}>
          Verify
        </text>
        <text x="280" y="214" textAnchor="middle" className={styles.label}>
          provenance
        </text>
      </g>

      {/* Stage 3 - Scan for vulnerabilities */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <g className={styles.magnifyPulse}>
          <circle cx="444" cy="128" r="11" className={styles.iconStroke} />
          <line x1="452" y1="136" x2="461" y2="145" className={styles.iconStroke} />
          <path d="M444 122 L450 132 L438 132 Z" className={styles.vulnOutline} />
          <circle cx="444" cy="129.5" r="1.2" className={styles.vulnDot} />
        </g>
        <text x="450" y="200" textAnchor="middle" className={styles.label}>
          Scan for
        </text>
        <text x="450" y="214" textAnchor="middle" className={styles.label}>
          vulnerabilities
        </text>
      </g>

      {/* Stage 4 - Enforce compliance (blocked vs compliant fork) */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <line x1="594" y1="160" x2="594" y2="118" className={styles.postLine} />
        <line x1="628" y1="120" x2="628" y2="128" className={styles.postLine} />
        <g className={styles.gateGroup}>
          <line x1="594" y1="124" x2="628" y2="124" className={styles.gateArm} />
        </g>
        <text x="610" y="200" textAnchor="middle" className={styles.label}>
          Enforce
        </text>
        <text x="610" y="214" textAnchor="middle" className={styles.label}>
          compliance
        </text>

        {/* fork explanation: blocked build fades, compliant build glows */}
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
        <g className={styles.blockedTag}>
          <rect x="466" y="46" width="120" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="526" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Blocked
          </text>
        </g>
        <g className={styles.compliantTag}>
          <rect x="634" y="46" width="120" height="26" rx="13" fill="url(#sscaGrad)" />
          <text x="694" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            Compliant
          </text>
        </g>
      </g>

      {/* Stage 5 - Attest & ship artifact */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <rect x="754" y="150" width="32" height="16" rx="2" className={styles.squareOutline} />
        <g className={styles.stampGroup}>
          <circle cx="770" cy="124" r="13" className={styles.sealOutline} />
          <path d="M764.5 124 L768.5 128.5 L776 116.5" className={styles.checkMark} />
        </g>
        <text x="770" y="200" textAnchor="middle" className={styles.label}>
          Attest &amp; ship
        </text>
        <text x="770" y="214" textAnchor="middle" className={styles.label}>
          artifact
        </text>
      </g>
    </svg>
  );
}
