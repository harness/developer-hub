import React from "react";
import styles from "./harnessAiOnboardingIllustration.module.scss";
import { usePauseWhenOffscreen } from "./shared/usePauseWhenOffscreen";

/**
 * Animated illustration for the Harness AI module landing page.
 *
 * Replaces the "What you can do with Harness AI" bullet list with a
 * 3-stage visual of the same capabilities:
 *   1. Natural-language pipelines - describe intent in plain English, the
 *      DevOps Agent generates/updates pipeline YAML (from the UI or an IDE)
 *   2. AI-powered troubleshooting  - the AI Assistant diagnoses a failed
 *      build/deployment and surfaces a fix, without leaving the platform
 *   3. Connect your tools via MCP  - the Harness MCP Server gives external
 *      AI tools (VS Code, Cursor, Claude Desktop, Gemini CLI) full access
 *      to the Harness environment
 *
 * Motion is done entirely with CSS keyframes on plain SVG shapes (no JS/
 * animation library), matching the pattern used for the FME, AI DLC
 * Insights, and IaCM illustrations. This is a 3-node layout (not the
 * standard 5-node/660px one), so it configures its own $nodes/travel path
 * in ./harnessAiOnboardingIllustration.module.scss rather than reusing the
 * shared standard travel keyframe. The one piece of JS is a shared
 * IntersectionObserver hook (./shared/usePauseWhenOffscreen) that pauses
 * all animation while the illustration is scrolled out of view.
 */
export default function HarnessAiOnboardingIllustration() {
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
      aria-label="Animated diagram of Harness AI: describe intent in plain English to generate a pipeline, diagnose a failed build and get a fix, and connect external AI tools such as VS Code, Cursor, Claude Desktop, and Gemini CLI through the Harness MCP Server."
    >
      <defs>
        <linearGradient id="aiGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5E2CE0" />
          <stop offset="100%" stopColor="#A652F9" />
        </linearGradient>
      </defs>

      {/* backbone connector - gapped at each node so the line reads as a
          connector between stages, not an overlay running through them */}
      <line x1="178" y1="140" x2="412" y2="140" className={styles.connectorLine} />
      <line x1="488" y1="140" x2="722" y2="140" className={styles.connectorLine} />

      {/* traveling pulse */}
      <circle cx="140" cy="140" r="6" className={styles.travelDot} />

      {/* Stage 1 - Natural-language pipelines */}
      <g>
        <circle cx="140" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse1}`} />
        <circle cx="140" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse1}`} />
        <path
          d="M122 120 h36 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-22 l-8 8 v-8 h-6 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6 Z"
          className={styles.bubbleOutline}
        />
        <circle cx="132" cy="139" r="2.2" className={`${styles.typingDot} ${styles.typing1}`} />
        <circle cx="140" cy="139" r="2.2" className={`${styles.typingDot} ${styles.typing2}`} />
        <circle cx="148" cy="139" r="2.2" className={`${styles.typingDot} ${styles.typing3}`} />
        <rect x="118" y="160" width="8" height="6" rx="1.5" fill="url(#aiGrad)" className={`${styles.pipelineNode} ${styles.pipe1}`} />
        <rect x="136" y="160" width="8" height="6" rx="1.5" fill="url(#aiGrad)" className={`${styles.pipelineNode} ${styles.pipe2}`} />
        <rect x="154" y="160" width="8" height="6" rx="1.5" fill="url(#aiGrad)" className={`${styles.pipelineNode} ${styles.pipe3}`} />
        <text x="140" y="204" textAnchor="middle" className={styles.label}>
          Describe it in plain English
        </text>
        <text x="140" y="220" textAnchor="middle" className={styles.subLabel}>
          DevOps Agent generates the pipeline
        </text>
      </g>

      {/* Stage 2 - AI troubleshooting (diagnosis fades into a fix) */}
      <g>
        <circle cx="450" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse2}`} />
        <circle cx="450" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse2}`} />
        <g className={styles.alertGroup}>
          <path d="M450 118 L465 148 L435 148 Z" className={styles.alertOutline} />
          <line x1="450" y1="128" x2="450" y2="139" className={styles.alertStem} />
          <circle cx="450" cy="144" r="1.6" className={styles.alertDot} />
        </g>
        <g className={styles.fixGroup}>
          <circle cx="450" cy="136" r="14" className={styles.fixRing} />
          <path d="M443 136 L448 141 L458 128" className={styles.fixCheck} />
        </g>
        <text x="450" y="204" textAnchor="middle" className={styles.label}>
          Diagnose failures &amp; get a fix
        </text>
        <text x="450" y="220" textAnchor="middle" className={styles.subLabel}>
          AI Assistant finds the root cause
        </text>
      </g>

      {/* Stage 3 - Connect your tools via MCP */}
      <g>
        <circle cx="760" cy="140" r="38" className={`${styles.nodeBg} ${styles.nodeBgFade} ${styles.pulse3}`} />
        <circle cx="760" cy="140" r="38" className={`${styles.pulseRing} ${styles.pulse3}`} />
        <line x1="760" y1="140" x2="760" y2="118" className={styles.mcpSpoke} />
        <line x1="760" y1="140" x2="760" y2="162" className={styles.mcpSpoke} />
        <line x1="760" y1="140" x2="738" y2="140" className={styles.mcpSpoke} />
        <line x1="760" y1="140" x2="782" y2="140" className={styles.mcpSpoke} />
        <rect x="754" y="134" width="12" height="12" rx="3" fill="url(#aiGrad)" />
        <circle cx="760" cy="118" r="4" className={`${styles.toolDot} ${styles.tool1}`} />
        <circle cx="760" cy="162" r="4" className={`${styles.toolDot} ${styles.tool2}`} />
        <circle cx="738" cy="140" r="4" className={`${styles.toolDot} ${styles.tool3}`} />
        <circle cx="782" cy="140" r="4" className={`${styles.toolDot} ${styles.tool4}`} />
        <text x="760" y="204" textAnchor="middle" className={styles.label}>
          Connect via the MCP Server
        </text>
        <text x="760" y="220" textAnchor="middle" className={styles.subLabel}>
          VS Code, Cursor, Claude, Gemini CLI
        </text>
      </g>
    </svg>
  );
}
