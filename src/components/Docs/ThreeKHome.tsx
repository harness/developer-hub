import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import styles from "./styles.module.scss";

export default function ThreeKHome() {
  const {
    siteConfig: { baseUrl = "/" } = {},
  } = useDocusaurusContext();

  const prompts = [
    "How do I deploy with Harness CD?",
    "How do feature flags work?",
    "How do I update a delegate?",
    "How do I configure GitHub Actions?",
    "How do I troubleshoot Harness pipelines?",
  ];

  const [question, setQuestion] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPrompt = prompts[promptIndex];

    const speed = deleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!deleting) {
        // typing forward
        setPlaceholder(currentPrompt.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === currentPrompt.length) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        // deleting
        setPlaceholder(currentPrompt.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex === 0) {
          setDeleting(false);
          setPromptIndex((prev) => (prev + 1) % prompts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, promptIndex]);

  const openKapa = () => {
    const kapaButton = document.querySelector(
      ".navbar__search_kapa"
    ) as HTMLElement | null;

    kapaButton?.click();
    (document.activeElement as HTMLElement)?.blur?.();
  };

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroHeading}>
            <img src={`${baseUrl}img/icon_harness.svg`} alt="Harness" className={styles.heroHeadingIcon} />
            <h1>What do you want to do today?</h1>
          </div>

          <p>
            Ask Harness AI, browse structured documentation, or jump directly
            into product modules.
          </p>

          {/* AI INPUT */}
          <div className={styles.aiLauncher}>
            <div className={styles.aiSearchShell}>
              <svg
                className={styles.aiSearchIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>

              <input
                className={styles.aiInput}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onFocus={() => setQuestion("")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    openKapa();
                  }
                }}
                placeholder={placeholder}
              />

              <button className={styles.aiShortcut} onClick={openKapa}>
                ⌘K
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <hr className={styles.sectionDivider} />

      {/* ONBOARDING STEPS */}
      <section className={styles.onboardingBox}>
        <div className={styles.step}>
          <div className={`${styles.stepNumber} ${styles.stepNumber1}`}>1</div>
          <div className={styles.stepContent}>
            <h3>Start with Harness AI</h3>
            <p>
              Ask questions, generate setup steps, and troubleshoot issues instantly
              using your documentation context.
            </p>
            <Link className={styles.stepLink} href="/">
              Ask Harness Docs AI →
            </Link>
          </div>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.step}>
          <div className={`${styles.stepNumber} ${styles.stepNumber2}`}>2</div>
          <div className={styles.stepContent}>
            <h3>Understand the Harness Platform</h3>
            <p>
              Explore core platform concepts including authentication, access management,
              services, and integrations.
            </p>
            <Link className={styles.stepLink} href="/3k-docs/platform/get-started">
              Getting Started with Harness →
            </Link>
          </div>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.step}>
          <div className={`${styles.stepNumber} ${styles.stepNumber3}`}>3</div>
          <div className={styles.stepContent}>
            <h3>Start Deploying with Harness CD</h3>
            <p>
              Build pipelines, deploy services, and manage releases using Harness Continuous Delivery.
            </p>
            <Link
              className={styles.stepLink}
              href="/3k-docs/continuous-delivery/getting-started"
            >
              Getting Started with Harness CD →
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK STARTS */}
      <section className={styles.quickStarts}>
        <h2>Popular starting points</h2>

        <div className={styles.quickGrid}>
          <Link href="/3k-docs/continuous-integration/get-started/onboarding-guide">
            Set up a CI pipeline
          </Link>

          <Link href="/3k-docs/feature-management-experimentation/feature-management/setup/create-a-feature-flag/">
            Create your first feature flag
          </Link>

          <Link href="/3k-docs/continuous-delivery">
            Deploy with GitOps
          </Link>

          <Link href="/3k-docs/appsec-security-testing">
            Run security scans in CI
          </Link>
        </div>
      </section>

      {/* EXPLORE */}
      <section className={styles.learnSections}>
        <h2>Explore Harness 3.0</h2>

        <p className={styles.learnIntro}>
          Harness 3.0 is a redesigned, AI-first developer platform focused on reducing operational complexity and accelerating software delivery.
        </p>

        <details className={styles.detailsBlock}>
          <summary>Overview</summary>

          <div className={styles.overviewGrid}>
            <Link href="/3k-docs/platform" className={styles.overviewTile}>
              <div className={styles.overviewTileHeader}>
                <span className={styles.overviewTileIcon}>🚀</span>
                <h3>What's New in 3.0</h3>
              </div>
              <p>Simplified YAML, unified execution, and AI workflows.</p>
            </Link>
            <Link href="/3k-docs/continuous-delivery" className={styles.overviewTile}>
              <div className={styles.overviewTileHeader}>
                <span className={styles.overviewTileIcon}>📋</span>
                <h3>Pipeline Specification</h3>
              </div>
              <p>New YAML v1 model for stages, services, and environments.</p>
            </Link>
            <Link href="/3k-docs/platform/connectors" className={styles.overviewTile}>
              <div className={styles.overviewTileHeader}>
                <span className={styles.overviewTileIcon}>🔌</span>
                <h3>Connectors</h3>
              </div>
              <p>Integrations for Git, cloud, artifacts, and observability.</p>
            </Link>
            <Link href="/3k-docs/platform/secrets" className={styles.overviewTile}>
              <div className={styles.overviewTileHeader}>
                <span className={styles.overviewTileIcon}>🔐</span>
                <h3>Secrets Management</h3>
              </div>
              <p>Secure credential storage and retrieval systems.</p>
            </Link>
            <Link href="/3k-docs/platform/navigation" className={styles.overviewTile}>
              <div className={styles.overviewTileHeader}>
                <span className={styles.overviewTileIcon}>🧭</span>
                <h3>Platform &amp; Navigation</h3>
              </div>
              <p>Enhanced platform experience and navigation.</p>
            </Link>
            <Link href="/3k-docs/category/dashboard-v30-closed-beta" className={styles.overviewTile}>
              <div className={styles.overviewTileHeader}>
                <span className={styles.overviewTileIcon}>📊</span>
                <h3>Dashboards 3.0</h3>
              </div>
              <p>AI-powered dashboards built on unified data models.</p>
            </Link>

          </div>
        </details>

        <details className={styles.detailsBlock}>
          <summary>The Goal: 30 Seconds to Developer Love</summary>

          <div className={styles.detailsContent}>
            {/* ── Simplified YAML ── */}
            <div className={styles.detailsItem}>
              <h3>Simplified YAML</h3>
              <p>
                Harness 3.0 introduces a new YAML specification (v1) that achieves an{" "}
                <strong>89% reduction in YAML boilerplate</strong>. The v1 format is
                compatible with GitHub Actions and Drone, making it familiar and easy to
                adopt.
              </p>
              <div className={styles.codeCompare}>
                <div>
                  <div className={styles.codeFilename}>ng-pipeline.yaml</div>
                  <pre>{`# Harness NG (v0 YAML)
pipeline:
  name: Deploy
  identifier: deploy
  projectIdentifier: proj1
  orgIdentifier: default
  stages:
    - stage:
        name: Deploy to Dev
        identifier: deploy_dev
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: my_service
          environment:
            environmentRef: dev
            infrastructureDefinitions:
              - identifier: k8s_dev`}</pre>
                </div>
                <div>
                  <div className={styles.codeFilename}>v1-pipeline.yaml</div>
                  <pre>{`# Harness 3.0 (v1 YAML)
pipeline:
  stages:
    - name: Deploy to Dev
      service: my_service
      environment:
        name: dev
        deploy-to: k8s_dev
      steps:
        - run: kubectl apply -f k8s/`}</pre>
                </div>
              </div>
              <div className={styles.calloutInfo}>
                <strong>Backward Compatibility</strong>: Existing NG pipelines continue to
                work without modification. Both v0 and v1 YAML are supported so teams can
                migrate at their own pace.
              </div>
            </div>
            {/* ── Templates ── */}
            <div className={styles.detailsItem}>
              <h3>Templates</h3>
              <p>
                Templates in Harness 3.0 are fundamentally redesigned to be composable,
                stage-agnostic, and marketplace-ready.
              </p>
              <ul className={styles.bulletList}>
                <li>
                  Defined inputs and outputs: Every template declares
                  typed inputs and outputs, making them self-documenting and composable.
                </li>
                <li>
                  Agnostic of stage types: Templates are not tied to any
                  specific stage type, making them reusable across CI, CD, and custom
                  workflows.
                </li>
                <li>
                  Container-based tasks: Templates wrap Harness
                  container-based tasks that can be used as steps in any pipeline.
                </li>
                <li>
                  Anything can be a template: Services, environments,
                  infrastructure definitions, steps, stages, and pipelines all support
                  template creation.
                </li>
                <li>
                  Template Marketplace: Discover and share templates
                  across your organization through a built-in marketplace.
                </li>
              </ul>
            </div>
            {/* ── Unified Stages & Steps ── */}
            <div className={styles.detailsItem}>
              <h3>Unified Stages &amp; Steps</h3>
              <p>
                Harness 3.0 eliminates stage-type coupling and unifies all steps into a
                container-based execution model, simplifying the platform and improving
                extensibility.
              </p>
              <h4>All Steps Are Containers</h4>
              <ul className={styles.bulletList}>
                <li>Fetched at runtime, no pre-installation required.</li>
                <li>No dependency on the delegate for tooling.</li>
                <li>Run as Docker containers on a Kubernetes cluster or on a VM.</li>
              </ul>
              <h4>No More Stage Types</h4>
              <ul className={styles.bulletList}>
                <li>
                  Product-specific objects (services, environments, deployment configs) are
                  decoupled from stages.
                </li>
                <li>
                  Improved platform extensibility: add custom steps without modifying the
                  core platform.
                </li>
                <li>
                  Fully customizable steps that can be shared across teams and
                  organizations.
                </li>
              </ul>
            </div>
            {/* ── Delegate 2.0 ── */}
            <div className={styles.detailsItem}>
              <h3>Delegate 2.0</h3>
              <p>
                The Harness Delegate has been completely rebuilt for speed, size, and
                simplicity. Delegate 2.0 removes tooling dependencies and supports local
                pipeline execution.
              </p>
              <table className={styles.delegateTable}>
                <thead>
                  <tr>
                    <th>Improvements</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Faster Startup Time</td>
                    <td>Significantly reduced cold-start and registration time.</td>
                  </tr>
                  <tr>
                    <td>Local Pipeline Execution</td>
                    <td>Run and test pipelines locally before pushing to production.</td>
                  </tr>
                  <tr>
                    <td>VM &amp; K8s Support</td>
                    <td>Self-hosted or Harness-hosted, on VMs or Kubernetes clusters.</td>
                  </tr>
                  <tr>
                    <td>Lightweight Size</td>
                    <td>Reduced CPU and memory footprint.</td>
                  </tr>
                  <tr>
                    <td>No Tooling Dependencies</td>
                    <td>
                      No kubectl, helm, tanzu, or terraform binaries coupled with the
                      runner.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* ── Improved UX ── */}
            <div className={styles.detailsItem}>
              <h3>AI-First UX</h3>
              <p>
                Harness 3.0 provides an AI-first, developer-first user experience. The
                entire platform has been redesigned to surface intelligent assistance at
                every step — from pipeline creation to debugging failed deployments.
              </p>
              <a
                href="https://drive.google.com/file/d/1jYgh5TFIBcKfwwUthMNZ7q707zASoTjN/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.demoLink}
              >
                <span className={styles.demoIcon}>▶</span>
                <span>
                  <strong>Watch the Harness 3.0 Demo</strong>
                  <br />
                  <small>See the new AI-first developer experience in action</small>
                </span>
              </a>
            </div>
          </div>
        </details>
      </section>
    </div>
  );
}