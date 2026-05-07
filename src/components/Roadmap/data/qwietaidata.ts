import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const qwietaiModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "qwietai", moduleTitle: "SAST and SCA" };

export const QwietaiData: Horizon = {
  Now: {
    description: "Q2 2026, May 2026 - July 2026",
    feature: [  
      {
        tag: [{ value: "Platform" }, { value: "Performance" }],
        title: "Single-Tenant Database Support",
        description: "Add single-tenancy database architecture to improve performance isolation and scalability."
      },
      {
        tag: [{ value: "Integration" }, { value: "IDE"}, { value: "AI"}],
        title: "MCP Integration for IDEs",
        description: "Integrate with Harness MCP to support SAST/SCA scanning and actions directly from IDEs.",
      },
      {
        tag: [{ value: "SAST" }, { value: "AI"}],
        title: "AI-Enhanced SAST",
        description: "Extend SAST coverage and reduce false positives through AI-enhanced vulnerability detection.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "Platform" }],
        title: "Enhanced Scan Logging",
        description: "Improve scan logging to provide clearer status and actionable feedback."
      },
      {
        tag: [{ value: "Governance" }, { value: "Risk Management" }],
        title: "Application Severity Adjustment",
        description: "Allow super admins to adjust application risk severity based on key contextual factors."
      },
      {
        tag: [{ value: "Reporting" }, { value: "Visibility" }],
        title: "AppSec Metrics Dashboard",
        description: "Deliver dashboards to track findings, remediation progress, and security trends."
      },
      {
        tag: [{ value: "SCA" }, { value: "Visibility" }],
        title: "Improved Transitive Dependency Visibility",
        description: "Enhance visibility into transitive dependencies and associated vulnerabilities."
      },
      {
        tag: [{ value: "Remediation" }, { value: "SCA" }],
        title: "Autofix for OSS Vulnerabilities",
        description: "Extend Autofix capabilities to address open-source vulnerabilities."
      },
      {
        tag: [{ value: "Standards" }, { value: "Compliance" }],
        title: "OWASP 2025 Support",
        description: "Extend detection coverage for vulnerabilities aligned with OWASP 2025."
      },
      {
        tag: [{ value: "SAST" }, { value: "Language Support" }],
        title: "T-SQL Language Support",
        description: "Add native SAST scanning support for T-SQL."
      },
      {
        tag: [{ value: "SAST" }, { value: "Language Support" }],
        title: "Perl Language Support",
        description: "Add native SAST scanning support for Perl."
      },
      {
        tag: [{ value: "SCA" }, { value: "Language Support" }],
        title: "Support for TOML config files",
        description: "Scan TOML configuration files in SCA."
      },
      {
        tag: [{ value: "SCA" }, { value: "Language Support" }],
        title: "Export SBOM via CLI",
        description: "Export SBOM via CLI for SCA."
      },
      {
        tag: [{ value: "SCA" }, { value: "Language Support" }],
        title: "CPE identifiers support",
        description: "Expand SCA vulnerability detection to include CPE identifiers."
      },
      {
        tag: [{ value: "Visibility" }, { value: "SAST" }, { value: "SCA" }],
        title: "Scan Summary Enhancements",
        description: "Refine scan summaries to show only actionable findings."
      },
    ],
  },
  Next: {
    description: "Q3 2026, Aug 2026 - Oct 2026",
    feature: [
      {
        tag: [{ value: "SAST" }, { value: "Language Support" }],
        title: "Rust Language Support",
        description: "Add native SAST scanning support for Rust."
      },
      {
        tag: [{ value: "Platform" }, { value: "IDE" }],
        title: "Windows + ARM Support",
        description: "Enable support for Windows on ARM environments."
      },
      {
        tag: [{ value: "IDE" }, { value: "SAST" }, { value: "SCA" }],
        title: "Visual Studio Extension Support",
        description: "Provide Visual Studio extensions to run Harness SAST and SCA scans directly within the IDE."
      },
      {
        tag: [{ value: "Platform" }, { value: "Deployment" }],
        title: "SMP + FIPS Support",
        description: "Enable Harness SAST and SCA support for air-gapped deployments on the Self-Managed Platform."
      },
      {
        tag: [{ value: "AI" }, { value: "Automation"}],
        title: "Advanced AI Capabilities",
        description: "Enhance AI-driven agentic workflows across IDEs, governance, remediation, and onboarding.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "Reporting"}],
        title: "Detailed Reporting",
        description: "Deliver richer, more granular reporting for insights across scans and projects.",
      },
      {
        tag: [{ value: "Integration" }, { value: "GitHub" }],
        title: "GitHub App Based Auto Repository Onboarding",
        description: "Automatically onboard selected GitHub repositories and newly added repositories via a single App installation."
    },  
    ],
  },
  Later: {
    description: "Q4 2026+, November 2026 & beyond",
    feature: [
      {
        tag: [{ value: "SAST" }, { value: "Visibility" }],
        title: "Data Flow Code Snippets",
        description: "Display code snippets within data flow views to improve analysis clarity."
      },
      {
        tag: [{ value: "AI" }, { value: "Integration"}, {value: "Developer Experience"}],
        title: "Vercel Integration",
        description: "Serve as the native security integration for Vercel to ship secure code by default.",
      },
      {
        tag: [{ value: "AI" }, { value: "Integration"}, {value: "Developer Experience"}],
        title: "Replit Integration",
        description: "Serve as the native security integration for Replit to ship secure code by default.",
      },
      {
        tag: [{ value: "AI" }, { value: "Integration"}, {value: "Developer Experience"}],
        title: "Lovable Integration",
        description: "Serve as the native security integration for Lovable to ship secure code by default.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Ticketing"}],
        title: "ServiceNow Integration",
        description: "Provide native integration for ticketing and workflow automation.",
      },
    ],
  },

  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Integration" }, { value: "IDE"}, { value: "AI"}],
        title: "Secure Vibe Coding",
        description: "Use predefined hooks in AI-native IDEs and CLIs (Cursor, Windsurf, Gemini) to scan code as it's generated, securing code at the source.",
        link: "https://docs.shiftleft.io/sast/secure-ai-coding-ai-assisted-development"
      },
      {
        tag: [{ value: "AI" }, { value: "Integration" }, { value: "IDE" }],
        title: "Claude Plugin Support",
        description: "Extend support for Claude plugins to enable security workflows through Skills and the Harness SAST and SCA MCP.",
        link: "https://docs.shiftleft.io/sast/integrations/claude"
      },
      {
        tag: [{ value: "SCA" }, { value: "OSS" }, { value: "Risk" }],
        title: "OSS Risk Detection",
        description: "Identify OSS risks such as end-of-life, unmaintained, malicious, abandoned, hijackable, and typosquatted packages.",
        link: "https://docs.shiftleft.io/sast/analyzing-applications/oss-risks"
      },
       {
        tag: [{ value: "SAST" }, { value: "Language Support"}],
        title: "Groovy Language Support",
        description: "Add native SAST scanning support for Groovy.",
        link: "https://docs.shiftleft.io/sast/analyzing-applications/groovy"
      },
      {
        tag: [{ value: "Governance" }, { value: "CLI"}],
        title: "CLI-Based Finding Exemption",
        description: "Enable suppression of findings via CLI when predefined comments are present.",
        link: "https://docs.shiftleft.io/cli/reference/finding-status"
      },
      {
        tag: [{ value: "Visibility" }, { value: "UX" }],
        title: "Application Scan Listing",
        description: "Provide a unified view of scans across all sources at the application level."
      },
      {
        tag: [{ value: "Platform" }, { value: "Governance"}],
        title: "Organization Configuration API Enhancements",
        description: "Provide granular update support for organization configuration APIs.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Jira" }],
        title: "Jira Forge Support",
        description: "Add compatibility with the Jira Forge framework."
      },
      {
        tag: [{ value: "Integration" }, { value: "Platform" }],
        title: "Integration with STO",
        description: "Native integration with STO, enabling Qwiet\'s SAST/SCA/Secrets engines to run as first-class Harness Security Scanners.",
        link: "https://developer.harness.io/docs/category/harness-security-scanners"
      },
      {
        tag: [{ value: "Notifications" }, { value: "Platform" }],
        title: "Improved Webhook Notifications",
        description: "Failed webhook deliveries now retry with exponential backoff and queue on persistent failure.",
        link: "https://docs.shiftleft.io/sast/integrations/webhooks?_highlight=webhook#delivery-failure-and-notifications"
      }, 
      {
        tag: [{ value: "SAST" }, { value: "Language Support"}],
        title: "Realtime SCA & Secrets in IDE",
        description: "Automatically detect hardcoded secrets and OSS vulnerabilities on code save directly within IDEs.",
        link: "https://docs.shiftleft.io/sast/integrations/cursor#real-time-sca-and-secrets-detection"
      },
      {
        tag: [{ value: "SAST" }, { value: "Language Support"}],
        title: "Swift Language Support",
        description: "Introduce native SAST scanning support for Swift.",
        link: "https://docs.shiftleft.io/sast/analyzing-applications/swift"
      },
      {
        tag: [{ value: "Integration" }, { value: "IDE"}],
        title: "Cursor & Windsurf IDE Support",
        description: "Enable SAST/SCA scanning within AI-native IDEs like Cursor and Windsurf.",
        link: "https://docs.shiftleft.io/sast/integrations/windsurf"
      },
      {
        tag: [{ value: "IDE" }, { value: "Performance"}, { value: "Multi-Language"}],
        title: "IDE Plugin Enhancements",
        description: "Improve plugin performance and expand multi-language scanning support.",
      },
      {
        tag: [{ value: "Remediation" }, { value: "Automation"}],
        title: "Automated PR Fixes for HCR",
        description: "Enable automated fix-based pull requests within the Harness Code Repository.",
        link: "https://docs.shiftleft.io/sast/autofix?_highlight=aut#harness-code-repos"
      },
      {
        tag: [{ value: "AI" }, { value: "Remediation"}, { value: "GitHub"}],
        title: "GitHub AI Autofix Enhancements",
        description: "Enhance GitHub Autofix with PR tracking, user actions, interactive comments, and bot responses.",
        link: "https://docs.shiftleft.io/sast/integrations/github-app-for-auto-fix"
      },
      {
        tag: [{ value: "Integration" }, {value: "Cloud Security"}, { value: "Visibility" }],
        title: "Wiz Integration",
        description: "Enrich the Wiz Security Graph and findings with application security context.",
        link:"https://docs.shiftleft.io/sast/integrations/wiz" 
      },
      {
        tag: [{ value: "Remediation" }, {value: "Automation"}, { value: "SCM" }],
        title: "AutoFix Pull Requests for Bitbucket",
        description: "Create automated fix-based pull requests in Bitbucket with parity to existing SCM integrations.",
        link:"https://docs.shiftleft.io/sast/autofix?_highlight=aut#bitbucket-repositories" 
      },
      {
        tag: [{ value: "Reporting" }, {value: "Data Export"}, { value: "Platform" }],
        title: "Nightly Data Export",
        description: "Export findings and related data nightly with rolling retention for 30 days.",
        link:"https://docs.shiftleft.io/sast/ui-v2/organizations?_highlight=orga#daily-export" 
      },
      {
        tag: [{ value: "Governance" }, {value: "Policy"}, { value: "CLI" }],
        title: "Build Rules v2 Enhancements",
        description: "Extend build rules with negative rules and additional filters to refine enforcement based on exploitability, AI assistance, and fix availability.",
       
      },
      {
        tag: [{ value: "Governance" }, {value: "Policy"}, { value: "CLI" }],
        title: "Webhook Notifications",
        description: "Send authenticated webhook notifications for scan completion and failure events.",
        link:"https://docs.shiftleft.io/sast/integrations/webhooks?_highlight=webhook#delivery-failure-and-notifications" 
      },
      {
        tag: [{ value: "SAST" }, {value: "Language Support"}],
        title: "Support for Go 1.25",
        description: "Add analysis support for applications written in Go 1.25.",
        link:"https://docs.shiftleft.io/sast/analyzing-applications/golang" 
      },
      {
        tag: [{ value: "Reporting" }],
        title: "SARIF Export via API",
        description: "Generate SARIF exports for application findings via API.",
        link:"https://docs.shiftleft.io/api/#tag/sarif/operation/DownloadSarifReport" 
      },
      {
        tag: [{ value: "Integration" }, {value: "Ticketing"}],
        title: "Azure Boards Integration",
        description: "Create and track security findings directly in Azure Boards.",
        link:"https://docs.shiftleft.io/sast/integrations/azureboards" 
      },
    ],
  },
};
