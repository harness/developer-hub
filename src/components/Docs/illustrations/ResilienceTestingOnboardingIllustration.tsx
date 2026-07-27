import React from "react";
import styles from "./resilienceTestingOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Resilience Testing (Chaos Engineering)
 * module landing page.
 *
 * Mirrors the module's three real pillars with a 5-stage visual:
 *   1. Design a chaos experiment  - author an experiment before running it
 *   2. Inject a fault             - the fault strikes a running node
 *   3. Observe blast radius       - ripples out to see what is impacted
 *   4. Load test at scale         - ramp traffic to validate under load
 *   5. Verify disaster recovery   - failure detected vs recovered fork
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the FME, AI DLC
 * Insights, IaCM, Harness AI, Platform, and Code Repository illustrations.
 * The one piece of JS is a shared IntersectionObserver hook
 * (./shared/usePauseWhenOffscreen) that pauses all animation while the
 * illustration is scrolled out of view. Shared timing (single $cycle/beat/
 * fire clock) and color-free keyframe shapes live in ./shared/_motion.scss.
 */
export default function ResilienceTestingOnboardingIllustration() {
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
      aria-label="Animated diagram of the Resilience Testing onboarding flow: design a chaos experiment, inject a fault into a running node, observe the blast radius as it ripples outward, load test the system at scale, then verify disaster recovery as a failure is detected and the system recovers."
    >
      <defs>
        <linearGradient id="ceGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF61A2" />
          <stop offset="100%" stopColor="#D8005A" />
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

      {/* Stage 1 - Design a chaos experiment */}
      <g>
        <circle cx="110" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="110" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <path
          d="M100 118 L100 133 L89 152 C86 157 89 162 95 162 L125 162 C131 162 134 157 131 152 L120 133 L120 118"
          className={styles.iconStroke}
          fill="none"
        />
        {/* solid color, not the gradient: a purely horizontal line has a
            zero-height bounding box, which makes an objectBoundingBox
            gradient render invisible in some SVG engines */}
        <line x1="100" y1="118" x2="120" y2="118" className={styles.rimLine} />
        <circle cx="108" cy="152" r="2" className={`${styles.bubble} ${styles.bubble1}`} />
        <circle cx="116" cy="147" r="1.6" className={`${styles.bubble} ${styles.bubble2}`} />
        <text x="110" y="204" textAnchor="middle" className={styles.label}>
          Design a chaos experiment
        </text>
      </g>

      {/* Stage 2 - Inject a fault */}
      <g>
        <circle cx="280" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="280" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <path
          d="M280 114 L268 130 L284 130 L280 152"
          className={styles.iconStroke}
          fill="none"
        />
        <circle cx="280" cy="152" r="10" className={styles.targetRing} />
        <circle cx="280" cy="152" r="3" className={styles.impactFlash} />
        <text x="280" y="204" textAnchor="middle" className={styles.label}>
          Inject a fault
        </text>
      </g>

      {/* Stage 3 - Observe blast radius */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <circle cx="450" cy="140" r="3" className={styles.radarCenter} />
        <circle cx="450" cy="140" r="12" className={`${styles.radarRing} ${styles.radar1}`} />
        <circle cx="450" cy="140" r="20" className={`${styles.radarRing} ${styles.radar2}`} />
        <circle cx="450" cy="140" r="28" className={`${styles.radarRing} ${styles.radar3}`} />
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Observe blast radius
        </text>
      </g>

      {/* Stage 4 - Load test at scale */}
      <g>
        <circle cx="610" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse4}`} />
        <circle cx="610" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse4}`} />
        <rect x="594" y="152" width="7" height="10" fill="url(#ceGrad)" className={`${styles.loadBar} ${styles.loadBar1}`} />
        <rect x="606" y="142" width="7" height="20" fill="url(#ceGrad)" className={`${styles.loadBar} ${styles.loadBar2}`} />
        <rect x="618" y="134" width="7" height="28" fill="url(#ceGrad)" className={`${styles.loadBar} ${styles.loadBar3}`} />
        <text x="610" y="204" textAnchor="middle" className={styles.label}>
          Load test at scale
        </text>
      </g>

      {/* Stage 5 - Verify disaster recovery (failure detected vs recovered fork) */}
      <g>
        <circle cx="770" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse5}`} />
        <circle cx="770" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse5}`} />
        <path
          d="M770 118 L758 123 L758 138 C758 148 764 155 770 158 C776 155 782 148 782 138 L782 123 Z"
          className={styles.shieldOutline}
        />
        <path d="M762 138 L768 144 L780 128" className={styles.checkMark} />
        <text x="770" y="204" textAnchor="middle" className={styles.label}>
          Verify disaster recovery
        </text>

        {/* fork explanation: detected failure fades, recovered system glows */}
        <path
          d="M758 110 C 700 92, 640 82, 610 72"
          className={styles.forkPathMuted}
          fill="none"
        />
        <path
          d="M782 110 C 784 92, 782 82, 780 72"
          className={styles.forkPathBright}
          fill="none"
        />
        <g className={styles.failureTag}>
          <rect x="545" y="46" width="130" height="26" rx="13" className={styles.tagBgMuted} />
          <text x="610" y="63" textAnchor="middle" className={styles.tagLabelMuted}>
            Failure detected
          </text>
        </g>
        <g className={styles.recoveredTag}>
          <rect x="715" y="46" width="130" height="26" rx="13" fill="url(#ceGrad)" />
          <text x="780" y="63" textAnchor="middle" className={styles.tagLabelBright}>
            Recovered
          </text>
        </g>
      </g>
    </svg>
  );
}
