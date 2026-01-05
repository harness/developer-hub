import { Horizon } from "./roadmapData";


export const QwietaiData: Horizon = {
  Now: {
    description: "Q4 2025, Nov 2025 - Jan 2026",
    feature: [  
      {
        tag: [{ value: "Integration" }, { value: "Platform" }],
        title: "Integration with STO",
        description: "Native integration with STO, enabling Qwiet\'s SAST/SCA/Secrets engines to run as first-class Harness Security Scanners."
      },
      {
        tag: [{ value: "Notifications" }, { value: "Platform" }],
        title: "Improved Webhook Notifications",
        description: "Failed webhook deliveries now retry with exponential backoff and queue on persistent failure."
      }, 
      {
        tag: [{ value: "Platform" }, { value: "Performance" }],
        title: "Single-Tenant Database Support",
        description: "Add single-tenancy database architecture to improve performance isolation and scalability."
      },
      {
        tag: [{ value: "SAST" }, { value: "Language Support"}],
        title: "Swift Language Support",
        description: "Introduce native SAST scanning support for Swift.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "CPG"}, { value: "SAST"}],
        title: "Code Snippets in Data Flow",
        description: "Display full code snippets in data-flow views to enhance CPG analysis and issue clarity.",
      },
      {
        tag: [{ value: "Integration" }, { value: "IDE"}],
        title: "Cursor & Windsurf IDE Support",
        description: "Enable SAST/SCA scanning within AI-native IDEs like Cursor and Windsurf.",
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
      },
      {
        tag: [{ value: "Integration" }, { value: "IDE"}, { value: "AI"}],
        title: "MCP Integration for IDEs",
        description: "Integrate Harness MCP to support SAST/SCA scanning and actions directly from IDEs.",
      },
      {
        tag: [{ value: "AI" }, { value: "Remediation"}, { value: "GitHub"}],
        title: "GitHub AI Autofix Enhancements",
        description: "Enhance GitHub Autofix with PR tracking, user actions, interactive comments, and bot responses."
      },
    ],
  },
  Next: {
    description: "Q1 2026, Feb 2026 - April 2026",
    feature: [
      {
        tag: [{ value: "AI" }, { value: "SAST" }],
        title: "AI Initiatives",
        description: "Integrate security for AI-generated code directly in IDEs and expand SAST coverage to detect more vulnerability types.",
      },
      {
        tag: [{ value: "Governance" }, { value: "CLI"}],
        title: "CLI-Based Finding Exemption",
        description: "Enable suppression of findings via CLI when predefined comments are present.",
      },
      {
        tag: [{ value: "Platform" }, { value: "Governance"}],
        title: "Organization Configuration API Enhancements",
        description: "Provide granular update support for organization configuration APIs.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "Multi-Language" }],
        title: "Improved Error Handling",
        description: "Enhanced error messages with error codes for faster triage"
      },
      {
        tag: [{ value: "Visibility" }, { value: "SAST" }, { value: "SCA" }],
        title: "Scan Summary Enhancements",
        description: "Refine scan summaries to show only actionable findings."
      },
      {
        tag: [{ value: "Integration" }, { value: "GitHub" }],
        title: "GitHub App Based Auto Repository Onboarding",
        description: "Automatically onboard all or selected GitHub repositories via a single App installation."
      }
    ],
  },
  Later: {
    description: "Q2 2026, May 2026 & Beyond",
    feature: [
      {
        tag: [{ value: "AI" }, { value: "Automation"}],
        title: "Advanced AI Capabilities",
        description: "Enhance AI-driven workflows across IDEs, governance, remediation, and onboarding.",
      },
      {
        tag: [{ value: "Code Quality" }, { value: "SAST" }],
        title: "Code Quality Coverage Improvements",
        description: "Increase detection and coverage of code quality issues.",
      },
      {
        tag: [{ value: "Integration" }, { value: "Ticketing"}],
        title: "ServiceNow Integration",
        description: "Provide native integration for ticketing and workflow automation.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "Reporting"}],
        title: "Detailed Reporting",
        description: "Deliver richer, more granular reporting for insights across scans and projects.",
      },
      {
        tag: [{ value: "SAST" }, { value: "Language Support"}],
        title: "Groovy & PowerShell Support",
        description: "Add native SAST scanning support for Groovy and PowerShell.",
      }
    ],
  },

  Released: {
    description: "What has been released",
    feature: [
    ],
  },
};
