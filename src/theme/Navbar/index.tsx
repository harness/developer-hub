import React, { type ReactNode, useState, useEffect } from "react";
import Navbar from "@theme-original/Navbar";
import type NavbarType from "@theme/Navbar";
import type { WrapperProps } from "@docusaurus/types";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): ReactNode {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [releaseNoteDropdownOpen, setreleaseNoteDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { colorMode } = useColorMode();

  const is3kDocs = location.pathname.startsWith("/3k-docs");
  const isLegacyDocs = location.pathname.startsWith("/docs");

  // Persist the last-visited docs version so links stay correct on non-docs pages
  const [docsVersionPref, setDocsVersionPref] = useState<"3k-docs" | "docs">(
    () => {
      if (typeof window !== "undefined") {
        return (localStorage.getItem("harnessDocsVersion") as "3k-docs" | "docs") ?? "docs";
      }
      return "docs";
    }
  );

  useEffect(() => {
    if (is3kDocs) {
      setDocsVersionPref("3k-docs");
      localStorage.setItem("harnessDocsVersion", "3k-docs");
    } else if (isLegacyDocs) {
      setDocsVersionPref("docs");
      localStorage.setItem("harnessDocsVersion", "docs");
    }
  }, [is3kDocs, isLegacyDocs]);

  // On docs pages use the actual path; everywhere else fall back to the stored preference
  const docsBase = is3kDocs ? "/3k-docs" : isLegacyDocs ? "/docs" : `/${docsVersionPref}`;

  // True when we're showing (or linking to) the legacy /docs tree
  const isLegacyMode = docsBase === "/docs";

  // Resolve a dropdown item's href: use legacyTo when in legacy mode, otherwise to
  const resolveLink = (to: string, legacyTo?: string) =>
    isLegacyMode && legacyTo ? legacyTo : to;

  const isActive = (path: string) => {
    const current = location.pathname;

    if (path === "/") return current === "/";

    // exact match wins first
    if (current === path) return true;

    // prevent parent route from stealing active state
    // if a more specific nav item exists under it
    const isChildRoute = current.startsWith(path + "/");

    // special case: don't highlight /release-notes when on feature registry
    if (path === "/release-notes") {
      return current === "/release-notes";
    }

    return isChildRoute;
  };

  /* Documentation stays active (underlined/bold) when viewing API Reference or either docs root */
  const isDocumentationActive =
    location.pathname.startsWith("/docs") ||
    location.pathname.startsWith("/3k-docs") ||
    location.pathname.startsWith("/api-reference");

  useEffect(() => {
    const handleScroll = () => {
      // Fade navbar gradient to white over 400px of scroll (matches page gradient fade)
      const progress = Math.min(window.scrollY / 400, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Blend colors toward white based on scroll
  const blendToWhite = (r: number, g: number, b: number) => {
    return `rgb(${Math.round(r + (255 - r) * scrollProgress)}, ${Math.round(
      g + (255 - g) * scrollProgress
    )}, ${Math.round(b + (255 - b) * scrollProgress)})`;
  };

  const gradientStyle =
    colorMode === "light"
      ? {
          background: `linear-gradient(180deg, ${blendToWhite(
            205,
            236,
            252
          )} 0%, ${blendToWhite(230, 245, 254)} 100%)`,
        }
      : {};

  const docDropdownItems = [
    { to: `${docsBase}/ai`, legacyTo: "/docs/category/harness-ai", label: "Harness AI", icon: "/img/home/ai.svg" },
    { to: `${docsBase}/platform`, label: "Harness Platform", icon: "/img/home/platform.svg" },
    { to: `${docsBase}/code-repository`, label: "Code Repository", icon: "/img/home/code.svg" },

    { type: "header", label: "DevOps" },
    { to: `${docsBase}/continuous-delivery`, label: "Continuous Deployment", icon: "/img/home/deployment.svg" },
    { to: `${docsBase}/continuous-integration`, label: "Continuous Integration", icon: "/img/home/build.svg" },
    { to: `${docsBase}/feature-management-experimentation`, label: "Feature Releases", icon: "/img/home/feature.svg" },
    { to: `${docsBase}/infrastructure-as-code-management`, label: "Infrastructure Automation", icon: "/img/home/infrastructure.svg" },
    { to: `${docsBase}/database-devops`, label: "Database DevOps", icon: "/img/home/database.svg" },
    { to: `${docsBase}/artifact-registry`, label: "Artifact Registry", icon: "/img/home/artifact.svg" },
    { to: `${docsBase}/release-orchestration`, label: "Release Orchestration", icon: "/img/home/release.svg" },

    { type: "header", label: "Testing" },
    { to: `${docsBase}/ai-test-automation`, label: "AI Test Automation", icon: "/img/home/ui-test.svg" },
    { to: `${docsBase}/resilience-testing`, label: "Resilience Testing", icon: "/img/home/resilience-test.svg" },

    // Application Security Testing
    { type: "header", label: "Application Security Testing", className: "dropdown-subheader" },
    { to: `${docsBase}/appsec-security-testing`, label: "Overview", icon: "/img/home/security-test.svg" },
    { to: `${docsBase}/sast-and-sca`, label: "SAST & SCA", icon: "/img/home/qwiet.svg" },
    { to: `${docsBase}/software-supply-chain-assurance`, label: "Supply Chain Security", icon: "/img/home/supply-chain.svg" },
    { to: `${docsBase}/security-testing-orchestration`, label: "Security Testing Orchestration", icon: "/img/home/security-test.svg" },
    
    // Web App & API Protection
    { type: "header", label: "Web Application & API Protection", className: "dropdown-subheader" },
    { to: `${docsBase}/appsec-runtime-protection`, label: "Overview", icon: "/img/home/runtime.svg" },
    { to: `${docsBase}/appsec-discovery`, label: "API Discovery", icon: "/img/home/security-test.svg" },
    
    // AI Security
    { type: "header", label: "AI Security", className: "dropdown-subheader" },
    { to: `${docsBase}/ai-security`, label: "AI Security", icon: "/img/home/security-test.svg" },

    { type: "header", label: "Operations" },
    { to: `${docsBase}/cloud-cost-management`, label: "AI Cost Management", icon: "/img/home/cloud-cost.svg" },
    { to: `${docsBase}/software-engineering-insights`, label: "AI DLC Insights", icon: "/img/home/engineering-insights-classic.svg" },
    { to: `${docsBase}/ai-sre`, label: "AI SRE", icon: "/img/home/incident.svg" },
    { to: `${docsBase}/internal-developer-portal`, label: "Internal Developer Portal", icon: "/img/home/portal.svg" },

    { type: "header", label: "Resources & Support" },
    { to: `/university`, label: "Harness University", icon: "/img/home/university.svg" },
    { to: `${docsBase}/harness-solutions-factory`, label: "Harness Solutions Factory", icon: "/img/home/harness.svg" },
    { to: `/glossary`, label: "Harness Glossary", icon: "/img/icon_release_notes.svg" },
    { to: `${docsBase}/self-managed-enterprise-edition`, label: "Self-Managed Enterprise Edition" },
    { to: `${docsBase}/open-source`, label: "Open Source" },
    { to: `${docsBase}/faqs`, label: "FAQs" },
    { to: `${docsBase}/troubleshooting`, label: "Troubleshooting" },
    { to: `${docsBase}/harness-cloud-operations`, label: "Harness Cloud Operations" },
  ];

  const secondaryNavItems = [
    { to: "/", label: "Home" },
    { to: `${docsBase}`, label: "Documentation", isDropdown: true },
    { to: "https://apidocs.harness.io/", label: "API Reference", external: true },
    { to: `/roadmap`, label: "Roadmap" },
    { to: `/release-notes`, label: "Release Notes" },
    { to: `/university`, label: "University" },
    { to: `/glossary`, label: "Glossary" },
  ];

  return (
    <div className={styles.navbarContainer} style={gradientStyle}>
      <Navbar {...props} />

      <nav className={styles.secondaryNav}>
        <div className={styles.secondaryNavInner}>
          {secondaryNavItems.map((item) =>
            item.isDropdown ? (
              <div
                key={item.to}
                className={styles.dropdownContainer}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  to={item.to}
                  className={`${styles.secondaryNavItem} ${
                    isDocumentationActive ? styles.active : ""
                  }`}
                >
                  {item.label}
                  <span className={styles.dropdownArrow}>▾</span>
                </Link>

                {dropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {docDropdownItems.map((dropItem, idx) =>
                      dropItem.type === "header" ? (
                        <div key={idx} className={styles.dropdownHeader}>
                          {dropItem.label}
                        </div>
                      ) : (
                        <Link
                          key={dropItem.to}
                          to={resolveLink(dropItem.to, dropItem.legacyTo)}
                          className={styles.dropdownItem}
                        >
                          {dropItem.icon && (
                            <img src={dropItem.icon} alt="" className={styles.dropdownIcon} />
                          )}
                          {dropItem.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={`${styles.secondaryNavItem} ${
                  isActive(item.to) ? styles.active : ""
                }`}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </nav>
    </div>
  );
}