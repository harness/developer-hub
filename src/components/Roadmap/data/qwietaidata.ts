import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const qwietaiModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "qwietai", moduleTitle: "SAST and SCA" };

export const QwietaiData: Horizon = {
  Now: {
    description: "Q3 2026, Aug 2026 - Oct 2026",
    feature: [ 
      {
        tag: [{ value: "AI" }, { value: "Automation" }],
        title: "Security AI Agents",
        description: "Enable AI-powered agents to detect, triage, and remediate security issues through automated or on-demand workflows.",
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
        tag: [{ value: "SAST" }, { value: "Language Support" }],
        title: "T-SQL Language Support (Beta)",
        description: "Add native SAST scanning support for T-SQL."
      },
      {
        tag: [{ value: "Integrations" }, { value: "SAST" }],
        title: "Bitbucket Data Center Support",
        description: "Enable Autofix workflows for repositories hosted on Bitbucket Data Center."
      },
      {
        tag: [{ value: "SCA" }, { value: "AI" }],
        title: "Slopsquatting Detection",
        description: "Detect potentially malicious or hallucinated package dependencies introduced by AI-generated code."
      },
      {
        tag: [{ value: "Platform" }, { value: "Visibility" }],
        title: "CI Source Visibility",
        description: "Show the CI source associated with scans for better visibility and traceability."
      },
      {
        tag: [{ value: "AI Risk" }, { value: "Remediation" }],
        title: "AI Risk Autofix",
        description: "Provide automated remediation recommendations and fixes for detected AI Risks."
      },
      {
        tag: [{ value: "AI Risk" }, { value: "Compliance" }],
        title: "AI Risk OWASP Mapping",
        description: "Map detected AI risks to relevant OWASP Agent Skills categories."
      },
      {
        tag: [{ value: "Integrations" }, { value: "Ticketing" }],
        title: "Multiple Azure Boards Support",
        description: "Support creating and managing security tickets across multiple Azure Boards projects."
      },
      {
        tag: [{ value: "Platform" }, { value: "IDE" }],
        title: "Windows + ARM Support",
        description: "Enable support for Windows on ARM environments."
      },
      {
        tag: [{ value: "SCA" }, { value: "Artifact Security" }],
        title: "Package Scanning Support",
        description: "Extend SCA scanning to non-OCI packages and artifacts across supported package ecosystems."
      },
      {
        tag: [{ value: "Governance" }, { value: "Policy" }],
        title: "Policy Management Through UI",
        description: "Allow users to configure and manage application security policies directly through the UI."
      },
      {
        tag: [{ value: "SCA" }, { value: "SBOM" }],
        title: "SBOM Support for Spinnaker",
        description: "Enable reliable SBOM generation for Spinnaker applications and dependencies."
      },
      {
        tag: [{ value: "Platform" }, { value: "Developer Experience" }],
        title: "Check-Analysis Validation Enhancements",
        description: "Improve check-analysis validation behavior for more flexible CI/CD security workflows."
      },
      {
        tag: [{ value: "SAST" }, { value: "IaC" }],
        title: "Azure Bicep Support",
        description: "Add security scanning support for infrastructure defined using Azure Bicep."
      },
      {
        tag: [{ value: "SCA" }, { value: "Container Security" }],
        title: "Deep Container Analysis",
        description: "Differentiate base image and application-layer vulnerabilities to improve container risk prioritization."
      },
      {
        tag: [{ value: "Secure AI Coding" }, { value: "IDE" }],
        title: "Secure AI Coding for VS Code",
        description: "Bring Secure AI Coding capabilities directly into VS Code to detect and remediate security issues as developers write code."
      },
      {
        tag: [{ value: "SCA" }, { value: "Language Support" }],
        title: "CPE identifiers support",
        description: "Expand SCA vulnerability detection to include CPE identifiers."
      }
    ],
  },
  Next: {
    description: "Q4 2026, Nov 2026 - Jan 2027",
    feature: [
      {
        tag: [{ value: "AI SAST" }, { value: "Detection" }],
        title: "AI-Enhanced SAST V2",
        description: "Advance AI-powered SAST with deeper contextual reasoning, improved detection accuracy, validation, and risk prioritization."
      },
      {
        tag: [{ value: "SAST" }, { value: "Language Support" }],
        title: "Rust Language Support (GA)",
        description: "Add native SAST scanning support for Rust."
      },
      {
        tag: [{ value: "SAST" }, { value: "Language Support" }],
        title: "Objective-C Support (Beta)",
        description: "Add SAST scanning and vulnerability detection support for Objective-C applications."
      },
      {
        tag: [{ value: "SCA" }, { value: "Dependency Management" }],
        title: "SCA Package Upgrade Validation",
        description: "Validate package upgrades to identify security issues and potential risks before adoption."
      },
      {
        tag: [{ value: "SCA" }, { value: "Remediation" }],
        title: "OSS Risk Autofix",
        description: "Provide automated fixes and upgrade recommendations for open-source dependency risks."
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
    description: "Q1 2027+, February 2027 & beyond",
    feature: [
      {
        tag: [{ value: "AI" }, { value: "Integration"}, {value: "Developer Experience"}],
        title: "Emergent AI Integration",
        description: "Serve as the native security integration for Emergent AI to ship secure code by default.",
      },
      {
        tag: [{ value: "AI" }, { value: "Integration"}, {value: "Developer Experience"}],
        title: "Replit Integration",
        description: "Serve as the native security integration for Replit to ship secure code by default.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Ticketing"}],
        title: "ServiceNow Integration",
        description: "Provide native integration for ticketing and workflow automation.",
      },
      {
        tag: [{ value: "SAST" }, { value: "Language Support" }],
        title: "Perl Language Support (Beta)",
        description: "Add native SAST scanning support for Perl."
      },
      {
        tag: [{ value: "SCA" }, { value: "Binary Analysis" }],
        title: "Expanded Binary Analysis",
        description: "Extend binary scanning support across additional binary formats and package types."
      },
      {
        tag: [{ value: "SCA" }, { value: "Framework Support" }],
        title: "Extended Framework Support",
        description: "Extend SCA framework support to include additional frameworks and libraries.",
      },
    ],
  },

  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "SCA" }, { value: "Reachability" }],
        title: "Deep Code Reachability",
        description: "Provide function-level reachability evidence to identify exploitable vulnerable dependencies.",
        link: "https://docs.shiftleft.io/sast/ui-v2/application-details/findings?_highlight=reacha#understanding-reachability-tab"
      },
      {
        tag: [{ value: "AI" }, { value: "Governance" }],
        title: "Skills & MCP Security Scanner (AI Risk)",
        description: "Detect malicious patterns and security risks in AI agent Skills and MCP configurations.",
        link: "https://docs.shiftleft.io/sast/analyzing-applications/ai-risks"
      },
      {
        tag: [{ value: "SCA" }, { value: "Language Support" }],
        title: "Export SBOM via CLI",
        description: "Export SBOM via CLI for SCA.",
        link: "https://docs.shiftleft.io/cli/reference/sbom"
      },
      {
        tag: [{ value: "SCA" }, { value: "Language Support" }],
        title: "Support for TOML config files",
        description: "Scan TOML configuration files in SCA."
      },
      {
        tag: [{ value: "Standards" }, { value: "Compliance" }],
        title: "OWASP 2025 Support",
        description: "Extend detection coverage for vulnerabilities aligned with OWASP 2025.",
        link: "https://docs.shiftleft.io/sast/ui-v2/application-details/compliance"
      },
      {
        tag: [{ value: "Remediation" }, { value: "SCA" }],
        title: "Autofix for OSS Vulnerabilities",
        description: "Extend Autofix capabilities to address open-source vulnerabilities."
      },
      {
        tag: [{ value: "Governance" }, { value: "Risk Management" }],
        title: "Contextual Severity and Severity Override",
        description: "Allow super admins to adjust application risk severity based on key contextual factors.",
        link: "https://docs.shiftleft.io/sast/ui-v2/application-details/settings#application-context"
      },
      {
        tag: [{ value: "Visibility" }, { value: "Platform" }],
        title: "Enhanced Scan Logging",
        description: "Improve scan logging to provide clearer status and actionable feedback."
      },
      {
        tag: [{ value: "SAST" }, { value: "AI"}],
        title: "AI-Enhanced SAST",
        description: "Extend SAST coverage and reduce false positives through AI-enhanced vulnerability detection.",
        link: "https://docs.shiftleft.io/sast/analyzing-applications/ai-sast"
      },
      {
        tag: [{ value: "AI" }, { value: "IDE" }],
        title: "Security Skills",
        description: "Provide guided security operations through reusable AI-powered Skills.",
        link: "https://docs.shiftleft.io/sast/integrations/mcp?_highlight=skills#agent-skills"
      },
      {
        tag: [{ value: "Integration" }, { value: "IDE"}, { value: "AI"}],
        title: "MCP Integration for IDEs",
        description: "Integrate with Harness MCP to support SAST/SCA scanning and actions directly from IDEs.",
        link: "https://docs.shiftleft.io/sast/integrations/mcp"
      },
      {
        tag: [{ value: "Visibility" }, { value: "SAST" }, { value: "SCA" }],
        title: "Scan Summary Enhancements",
        description: "Refine scan summaries to show only actionable findings."
      },
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
