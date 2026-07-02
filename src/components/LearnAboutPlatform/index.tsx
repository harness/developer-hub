import React from "react";
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

// ─── Data ────────────────────────────────────────────────────────────────────

const RESOURCES: TileItem[] = [
  {
    title: "Pipelines",
    description: "Build automation workflows using stages, steps, and triggers",
    href: "/3k-docs/category/pipelines",
    iconLight: "img/home/pipeline.svg",
    iconDark: "img/home/pipeline.svg",
  },
  {
    title: "AI Agents",
    description: "Build and deploy AI agents to automate engineering workflows",
    href: "/3k-docs/category/harness-ai",
    iconLight: "img/home/agent.svg",
    iconDark: "img/home/agent.svg",
  },
  {
    title: "Services",
    description: "Define and manage the services that make up your applications",
    href: "3k-docs/platform/service-discovery",
    iconLight: "img/home/service.svg",
    iconDark: "img/home/service.svg",
  },
  {
    title: "Environments",
    description: "Manage deployment targets and configuration overrides",
    href: "/3k-docs/continuous-delivery/x-platform-cd-features/environments/environment-overview",
    iconLight: "img/home/environment.svg",
    iconDark: "img/home/environment.svg",
  },
  {
    title: "Repositories",
    description: "Host, review, and collaborate on code with Git and pipelines",
    href: "/3k-docs/code-repository",
    iconLight: "img/home/repository.svg",
    iconDark: "img/home/repository.svg",
  },
  {
    title: "Delegates",
    description: "Run tasks securely in your own infrastructure",
    href: "/3k-docs/category/delegate",
    iconLight: "img/home/delegate.svg",
    iconDark: "img/home/delegate.svg",
  },
  {
    title: "Connectors",
    description: "Connect to cloud providers, source control, registries, and more",
    href: "/3k-docs/category/connectors",
    iconLight: "img/home/connector.svg",
    iconDark: "img/home/connector-dark.svg",
  },
  {
    title: "Secrets",
    description: "Securely store and reference API keys, passwords, and tokens",
    href: "/3k-docs/category/secrets",
    iconLight: "img/home/secret.svg",
    iconDark: "img/home/secret.svg",
  },
  {
    title: "Access Control",
    description: "Control access using roles, resource groups, and user groups",
    href: "/3k-docs/category/platform-access-control",
    iconLight: "img/home/access.svg",
    iconDark: "img/home/access.svg",
  },
  {
    title: "Authentication",
    description: "Configure SSO, SAML, OAuth, and LDAP for secure user access",
    href: "/3k-docs/category/authentication",
    iconLight: "img/home/authentication.svg",
    iconDark: "img/home/authentication.svg",
  },
  {
    title: "Organizations & Projects",
    description: "Organize your account into teams and projects",
    href: "/3k-docs/category/organizations--projects",
    iconLight: "img/home/organization.svg",
    iconDark: "img/home/organization.svg",
  },
  {
    title: "Triggers",
    description: "Kick off pipelines from Git events, schedules, or webhooks",
    href: "/3k-docs/category/triggers",
    iconLight: "img/home/trigger.svg",
    iconDark: "img/home/trigger.svg",
  },
  {
    title: "Approvals",
    description: "Gate pipelines with approvals, Jira tickets, or custom conditions",
    href: "/3k-docs/category/approvals",
    iconLight: "img/home/approve.svg",
    iconDark: "img/home/approve-dark.svg",
  },
  {
    title: "Git Experience",
    description: "Store and sync pipelines and entities in your Git repos",
    href: "/3k-docs/category/git-experience",
    iconLight: "img/home/git.svg",
    iconDark: "img/home/git.svg",
  },
  {
    title: "Audit Trail",
    description: "Track every config change and action across your account",
    href: "/3k-docs/platform/governance/audit-trail",
    iconLight: "img/home/log.svg",
    iconDark: "img/home/log.svg",
  },
  {
    title: "Service Discovery",
    description: "Discover and map services running across your environments",
    href: "/3k-docs/platform/service-discovery/",
    iconLight: "img/home/service-discover.svg",
    iconDark: "img/home/service-discover.svg",
  },
  {
    title: "Automation",
    description: "Automate config and management with the CLI, API, and Terraform",
    href: "/3k-docs/category/automation",
    iconLight: "img/home/automation.svg",
    iconDark: "img/home/automation.svg",
  },
  {
    title: "REST API",
    description: "Integrate and extend Harness with REST API clients",
    href: "/3k-docs/platform/automation/api/api-quickstart",
    iconLight: "img/home/api.svg",
    iconDark: "img/home/api.svg",
  },
  {
    title: "Dashboards",
    description: "Build and share dashboards to visualize metrics across your org",
    href: "/3k-docs/category/harness-dashboards",
    iconLight: "img/home/templates.svg",
    iconDark: "img/home/templates.svg",
  },
  {
    title: "Templates",
    description: "Create reusable pipeline, step, and stage templates",
    href: "/3k-docs/category/templates",
    iconLight: "img/home/templates.svg",
    iconDark: "img/home/templates.svg",
  },
  {
    title: "Policies",
    description: "Enforce governance rules across pipelines using OPA policies",
    href: "/3k-docs/category/policy-as-code",
    iconLight: "img/home/shield.svg",
    iconDark: "img/home/shield.svg",
  },
  {
    title: "Variables",
    description: "Manage account-level variables shared across pipelines",
    href: "/3k-docs/category/variables--expressions",
    iconLight: "img/home/variable.svg",
    iconDark: "img/home/variable.svg",
  },
  {
    title: "Webhooks",
    description: "Trigger pipelines and notify systems using webhook events",
    href: "/3k-docs/platform/git-experience/gitexp-bidir-sync-setup",
    iconLight: "img/home/webhook.svg",
    iconDark: "img/home/webhook.svg",
  },
  {
    title: "Notifications",
    description: "Send alerts to Slack, PagerDuty, and email on pipeline events",
    href: "/3k-docs/category/notifications--banners",
    iconLight: "img/home/notification.svg",
    iconDark: "img/home/notification.svg",
  },
  {
    title: "General Settings",
    description: "Configure account-wide defaults, preferences, and behavior",
    href: "/3k-docs/platform/settings/default-settings",
    iconLight: "img/home/settings.svg",
    iconDark: "img/home/settings-dark.svg",
  },
];

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

      <ul className={styles.resourceGrid}>
        {RESOURCES.map((resource) => (
          <li key={resource.title}>
            <a href={resource.href}>
              <TileIcon item={resource} baseUrl={baseUrl} colorMode={colorMode} />
              <h4>{resource.title}</h4>
              <p>{resource.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}