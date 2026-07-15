import React, { useEffect, useMemo, useRef, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import { useColorMode } from "@docusaurus/theme-common";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TileItem {
  title: string;
  description: string;
  href: string;
  iconLight?: string;
  iconDark?: string;
}

interface ResourceGroup {
  label: string;
  items: TileItem[];
}

// ─── Data ────────────────────────────────────────────────────────────────────
// Grouped into rows that roughly follow a build → connect → secure → operate
// journey, rather than one flat wall of tiles.

const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    label: "Build & deploy",
    items: [
      {
        title: "Pipelines",
        description: "Build automation workflows using stages, steps, and triggers",
        href: "/docs/category/pipelines",
        iconLight: "img/home/pipeline.svg",
        iconDark: "img/home/pipeline.svg",
      },
      {
        title: "Services",
        description: "Define and manage the services that make up your applications",
        href: "/docs/platform/service-discovery",
        iconLight: "img/home/service.svg",
        iconDark: "img/home/service.svg",
      },
      {
        title: "Environments",
        description: "Manage deployment targets and configuration overrides",
        href: "/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview",
        iconLight: "img/home/environment.svg",
        iconDark: "img/home/environment.svg",
      },
      {
        title: "Delegates",
        description: "Run tasks securely in your own infrastructure",
        href: "/docs/category/delegate",
        iconLight: "img/home/delegate.svg",
        iconDark: "img/home/delegate.svg",
      },
      {
        title: "Templates",
        description: "Create reusable pipeline, step, and stage templates",
        href: "/docs/category/templates",
        iconLight: "img/home/templates.svg",
        iconDark: "img/home/templates.svg",
      },
      {
        title: "Triggers",
        description: "Kick off pipelines from Git events, schedules, or webhooks",
        href: "/docs/category/triggers",
        iconLight: "img/home/trigger.svg",
        iconDark: "img/home/trigger.svg",
      },
    ],
  },
  {
    label: "Connect your stack",
    items: [
      {
        title: "Connectors",
        description: "Connect to cloud providers, source control, registries, and more",
        href: "/docs/category/connectors",
        iconLight: "img/home/connector.svg",
        iconDark: "img/home/connector-dark.svg",
      },
      {
        title: "Repositories",
        description: "Host, review, and collaborate on code with Git and pipelines",
        href: "/docs/code-repository",
        iconLight: "img/home/repository.svg",
        iconDark: "img/home/repository.svg",
      },
      {
        title: "Git Experience",
        description: "Store and sync pipelines and entities in your Git repos",
        href: "/docs/category/git-experience",
        iconLight: "img/home/git.svg",
        iconDark: "img/home/git.svg",
      },
      {
        title: "Webhooks",
        description: "Trigger pipelines and notify systems using webhook events",
        href: "/docs/platform/git-experience/gitexp-bidir-sync-setup",
        iconLight: "img/home/webhook.svg",
        iconDark: "img/home/webhook.svg",
      },
      {
        title: "REST API",
        description: "Integrate and extend Harness with REST API clients",
        href: "/docs/platform/automation/api/api-quickstart",
        iconLight: "img/home/api.svg",
        iconDark: "img/home/api.svg",
      },
      {
        title: "Automation",
        description: "Automate config and management with the CLI, API, and Terraform",
        href: "/docs/category/automation",
        iconLight: "img/home/automation.svg",
        iconDark: "img/home/automation.svg",
      },
    ],
  },
  {
    label: "Secure & govern",
    items: [
      {
        title: "Secrets",
        description: "Securely store and reference API keys, passwords, and tokens",
        href: "/docs/category/secrets",
        iconLight: "img/home/secret.svg",
        iconDark: "img/home/secret.svg",
      },
      {
        title: "Access Control",
        description: "Control access using roles, resource groups, and user groups",
        href: "/docs/category/platform-access-control",
        iconLight: "img/home/access.svg",
        iconDark: "img/home/access.svg",
      },
      {
        title: "Authentication",
        description: "Configure SSO, SAML, OAuth, and LDAP for secure user access",
        href: "/docs/category/authentication",
        iconLight: "img/home/authentication.svg",
        iconDark: "img/home/authentication.svg",
      },
      {
        title: "Policies",
        description: "Enforce governance rules across pipelines using OPA policies",
        href: "/docs/category/policy-as-code",
        iconLight: "img/home/shield.svg",
        iconDark: "img/home/shield.svg",
      },
      {
        title: "Audit Trail",
        description: "Track every config change and action across your account",
        href: "/docs/platform/governance/audit-trail",
        iconLight: "img/home/log.svg",
        iconDark: "img/home/log.svg",
      },
      {
        title: "Organizations & Projects",
        description: "Organize your account into teams and projects",
        href: "/docs/category/organizations--projects",
        iconLight: "img/home/organization.svg",
        iconDark: "img/home/organization.svg",
      },
    ],
  },
  {
    label: "Observe & operate",
    items: [
      {
        title: "AI Agents",
        description: "Build and deploy AI agents to automate engineering workflows",
        href: "/docs/platform/harness-ai/harness-agents",
        iconLight: "img/home/agent.svg",
        iconDark: "img/home/agent.svg",
      },
      {
        title: "Service Discovery",
        description: "Discover and map services running across your environments",
        href: "/docs/platform/service-discovery/",
        iconLight: "img/home/service-discover.svg",
        iconDark: "img/home/service-discover.svg",
      },
      {
        title: "Dashboards",
        description: "Build and share dashboards to visualize metrics across your org",
        href: "/docs/category/harness-dashboards",
        iconLight: "img/home/templates.svg",
        iconDark: "img/home/templates.svg",
      },
      {
        title: "Notifications",
        description: "Send alerts to Slack, PagerDuty, and email on pipeline events",
        href: "/docs/category/notifications-alerts--banners",
        iconLight: "img/home/notification.svg",
        iconDark: "img/home/notification.svg",
      },
      {
        title: "Variables",
        description: "Manage account-level variables shared across pipelines",
        href: "/docs/category/variables--expressions",
        iconLight: "img/home/variable.svg",
        iconDark: "img/home/variable.svg",
      },
      {
        title: "Approvals",
        description: "Gate pipelines with approvals, Jira tickets, or custom conditions",
        href: "/docs/category/approvals",
        iconLight: "img/home/approve.svg",
        iconDark: "img/home/approve-dark.svg",
      },
      {
        title: "General Settings",
        description: "Configure account-wide defaults, preferences, and behavior",
        href: "/docs/platform/settings/default-settings",
        iconLight: "img/home/settings.svg",
        iconDark: "img/home/settings-dark.svg",
      },
    ],
  },
];

// Number of tiles visible in the cropped viewport at once. Must match the
// `.carouselViewport` max-width tile count in styles.module.scss.
const VISIBLE_TILES = 4;

// ─── Shared tile renderer ─────────────────────────────────────────────────────

function TileIcon({
  item,
  baseUrl,
  colorMode,
}: {
  item: TileItem;
  baseUrl: string;
  colorMode: string;
}): JSX.Element | null {
  if (!item.iconLight && !item.iconDark) return null;
  return (
    <img
      src={
        colorMode === "light"
          ? `${baseUrl}${item.iconLight}`
          : `${baseUrl}${item.iconDark}`
      }
      alt=""
      aria-hidden="true"
    />
  );
}

// ─── Per-group rotating carousel ─────────────────────────────────────────────

function ResourceCarouselGroup({
  group,
  baseUrl,
  colorMode,
}: {
  group: ResourceGroup;
  baseUrl: string;
  colorMode: string;
}): JSX.Element {
  const items = group.items;
  const total = items.length;
  const loop = total > VISIBLE_TILES;

  // Buffer the reel with duplicate tiles on each end so sliding one tile at a
  // time can wrap seamlessly, instead of cutting to a fresh, unevenly-sized page.
  const bufferSize = Math.min(VISIBLE_TILES, total);
  const extended = useMemo(() => {
    if (!loop) return items;
    return [
      ...items.slice(total - bufferSize),
      ...items,
      ...items.slice(0, bufferSize),
    ];
  }, [items, loop, total, bufferSize]);
  const offset = loop ? bufferSize : 0;

  // Page-based stops: each stop advances by a full page of VISIBLE_TILES, so
  // every click reveals a new set of tiles instead of a near-duplicate view.
  // The final stop anchors flush against the last tile (total - VISIBLE_TILES)
  // rather than overlapping arbitrarily into tiles already seen.
  const numSteps = loop ? Math.ceil(total / VISIBLE_TILES) : 1;
  const stopOffsets = useMemo(
    () =>
      Array.from({ length: numSteps }, (_, i) =>
        Math.min(i * VISIBLE_TILES, Math.max(total - VISIBLE_TILES, 0))
      ),
    [numSteps, total]
  );
  const realFrames = useMemo(() => stopOffsets.map((i) => offset + i), [stopOffsets, offset]);
  const nextWrapFrame = offset + total + stopOffsets[0];
  const prevWrapFrame = offset - (total - stopOffsets[numSteps - 1]);

  const [frame, setFrame] = useState(realFrames[0]);
  const [skipTransition, setSkipTransition] = useState(false);
  const trackRef = useRef<HTMLUListElement | null>(null);

  const posInCycle = (((frame - offset) % total) + total) % total;
  const activeStopIndex = Math.max(0, stopOffsets.indexOf(posInCycle));

  const goNext = () => {
    setFrame(activeStopIndex === numSteps - 1 ? nextWrapFrame : realFrames[activeStopIndex + 1]);
  };
  const goPrev = () => {
    setFrame(activeStopIndex === 0 ? prevWrapFrame : realFrames[activeStopIndex - 1]);
  };
  const goTo = (index: number) => setFrame(realFrames[index]);

  // Once a step slides onto a duplicate buffer tile, snap back to the
  // matching real tile with no transition so the loop feels seamless.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !loop) return;

    const handleTransitionEnd = () => {
      if (frame === nextWrapFrame) {
        setSkipTransition(true);
        setFrame(realFrames[0]);
      } else if (frame === prevWrapFrame) {
        setSkipTransition(true);
        setFrame(realFrames[numSteps - 1]);
      }
    };

    track.addEventListener("transitionend", handleTransitionEnd);
    return () => track.removeEventListener("transitionend", handleTransitionEnd);
  }, [frame, loop, nextWrapFrame, prevWrapFrame, realFrames, numSteps]);

  useEffect(() => {
    if (!skipTransition) return;
    const raf = requestAnimationFrame(() => setSkipTransition(false));
    return () => cancelAnimationFrame(raf);
  }, [skipTransition]);

  return (
    <div className={styles.resourceGroup}>
      <h4 className={styles.resourceGroupLabel}>{group.label}</h4>

      <div className={styles.carouselViewport}>
        <ul
          className={styles.carouselTrack}
          ref={trackRef}
          style={{
            transform: `translateX(-${(frame * 100) / extended.length}%)`,
            transition: skipTransition ? "none" : undefined,
          }}
        >
          {extended.map((resource, index) => (
            <li key={`${resource.title}-${index}`}>
              <a href={resource.href}>
                <TileIcon item={resource} baseUrl={baseUrl} colorMode={colorMode} />
                <h4>{resource.title}</h4>
                <p>{resource.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {loop && (
        <div className={styles.carouselControls}>
          <button
            type="button"
            className={styles.carouselArrow}
            aria-label={`Show previous ${group.label} tile`}
            onClick={goPrev}
          >
            ‹
          </button>

          <div className={styles.carouselDots} role="tablist" aria-label={`${group.label} tiles`}>
            {stopOffsets.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === activeStopIndex}
                aria-label={`Show ${group.label} tiles, step ${index + 1}`}
                className={`${styles.carouselDot} ${
                  index === activeStopIndex ? styles.carouselDotActive : ""
                }`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.carouselArrow}
            aria-label={`Show next ${group.label} tile`}
            onClick={goNext}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function LearnAboutPlatform(): JSX.Element {
  const { colorMode } = useColorMode();
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();

  return (
    <section className={styles.learnAboutPlatform}>
      {/* ── Resources ────────────────────────────────────────────────────── */}
      <div className={styles.sectionHeader}>
        <img
          src={`img/home/harness.svg`}
          alt=""
          aria-hidden="true"
          className={styles.sectionHeaderIcon}
        />
        <h3>Resources</h3>
      </div>

      {RESOURCE_GROUPS.map((group) => (
        <ResourceCarouselGroup
          group={group}
          baseUrl={baseUrl}
          colorMode={colorMode}
          key={group.label}
        />
      ))}
    </section>
  );
}
