import React, { type ReactNode, useState, useEffect } from "react";
import Navbar from "@theme-original/Navbar";
import type NavbarType from "@theme/Navbar";
import type { WrapperProps } from "@docusaurus/types";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

type Props = WrapperProps<typeof NavbarType>;

const docDropdownItems = [
  // Unlisted
  { to: "/docs/platform", label: "Platform", icon: "/img/icon_platform.svg" },
  {
    to: "/docs/code-repository",
    label: "Code Repository",
    icon: "/img/icon_code.svg",
  },
  // DevOps & Automation
  { type: "header", label: "DevOps & Automation" },
  {
    to: "/docs/continuous-delivery",
    label: "Continuous Delivery & GitOps",
    icon: "/img/icon_cd.svg",
  },
  {
    to: "/docs/continuous-integration",
    label: "Continuous Integration",
    icon: "/img/icon_ci.svg",
  },
  {
    to: "/docs/internal-developer-portal",
    label: "Internal Developer Portal",
    icon: "/img/icon_idp.svg",
  },
  {
    to: "/docs/infrastructure-as-code-management",
    label: "Infrastructure as Code Management",
    icon: "/img/icon_iacm.svg",
  },
  {
    to: "/docs/database-devops",
    label: "Database DevOps",
    icon: "/img/icon_dbdevops.svg",
  },
  {
    to: "/docs/artifact-registry",
    label: "Artifact Registry",
    icon: "/img/icon-ar.svg",
  },
  {
    to: "/docs/cloud-development-environments",
    label: "Cloud Development Environments",
    icon: "/img/icon-cde.svg",
  },
  // Testing & Resilience
  { type: "header", label: "Testing & Resilience" },
  {
    to: "/docs/feature-management-experimentation",
    label: "Feature Management & Experimentation",
    icon: "/img/icon_fme.svg",
  },
  {
    to: "/docs/feature-flags",
    label: "Feature Flags",
    icon: "/img/icon_ff.svg",
  },
  {
    to: "/docs/chaos-engineering",
    label: "Chaos Engineering",
    icon: "/img/icon_ce.svg",
  },
  {
    to: "/docs/ai-test-automation",
    label: "AI Test Automation",
    icon: "/img/logo-ata.svg",
  },
  { to: "/docs/ai-sre", label: "AI SRE", icon: "/img/icon-ir.svg" },
  {
    to: "/docs/service-reliability-management",
    label: "Service Reliability Management",
    icon: "/img/icon_srm.svg",
  },
  // Security & Compliance
  { type: "header", label: "Security & Compliance" },
  {
    to: "/docs/appsec-discovery",
    label: "API & Application Discovery",
    icon: "/img/icon-api-security-posture.svg",
  },
  {
    to: "/docs/appsec-runtime-protection",
    label: "Application & API Runtime Protection",
    icon: "/img/icon-api-runtime-protection.svg",
  },
  {
    to: "/docs/appsec-security-testing",
    label: "Application & API Security Testing",
    icon: "/img/icon-api-security-testing.svg",
  },
  {
    to: "/docs/security-testing-orchestration",
    label: "Security Testing Orchestration",
    icon: "/img/icon_sto.svg",
  },
  {
    to: "/docs/software-supply-chain-assurance",
    label: "Supply Chain Security",
    icon: "/img/icon_ssca.svg",
  },
  {
    to: "/docs/sast-and-sca",
    label: "SAST and SCA",
    icon: "/img/icon-qwietai.svg",
  },
  // Cost & Optimization
  { type: "header", label: "Cost & Optimization" },
  {
    to: "/docs/cloud-cost-management",
    label: "Cloud Cost Management",
    icon: "/img/icon_ccm.svg",
  },
  {
    to: "/docs/software-engineering-insights",
    label: "Software Engineering Insights",
    icon: "/img/icon_sei.svg",
  },
  // Resources & Support
  { type: "header", label: "Resources & Support" },
  {
    to: "/university",
    label: "Harness University",
    icon: "/img/university-icon.svg",
  },
  {
    to: "/docs/harness-solutions-factory",
    label: "Harness Solutions Factory",
    icon: "/img/icon-hsf.svg",
  },
  {
    to: "/docs/self-managed-enterprise-edition",
    label: "Self-Managed Enterprise Edition",
  },
  { to: "/docs/open-source", label: "Open Source" },
  { to: "/docs/faqs", label: "FAQs" },
  { to: "/docs/troubleshooting", label: "Troubleshooting" },
  { to: "/docs/harness-cloud-operations", label: "Harness Cloud Operations" },
];

const secondaryNavItems = [
  { to: "/", label: "Home" },
  { to: "/docs", label: "Documentation", isDropdown: true },
  { to: "https://apidocs.harness.io/", label: "API Reference", external: true },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/release-notes", label: "Release Notes" },
  { to: "/university", label: "University" },
];

export default function NavbarWrapper(props: Props): ReactNode {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const handleScroll = () => {
      // Fade to white over 400px of scroll (matching main-wrapper)
      const progress = Math.min(window.scrollY / 400, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // Blend colors toward white based on scroll
  const blendToWhite = (r: number, g: number, b: number) => {
    return `rgb(${Math.round(r + (255 - r) * scrollProgress)}, ${Math.round(
      g + (255 - g) * scrollProgress
    )}, ${Math.round(b + (255 - b) * scrollProgress)})`;
  };

  // Light mode: gradient that fades to white on scroll, dark mode uses theme background
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
                    isActive(item.to) ? styles.active : ""
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
                          to={dropItem.to}
                          className={styles.dropdownItem}
                        >
                          {dropItem.icon && (
                            <img
                              src={dropItem.icon}
                              alt=""
                              className={styles.dropdownIcon}
                            />
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
