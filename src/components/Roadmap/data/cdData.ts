import routesChunkNames from "@generated/routesChunkNames";
import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const cdModuleTheme: ModuleTheme = {
  moduleKey: "cd",
  moduleTitle: "Continuous Delivery & GitOps",
  palette: {
    light: { bg: "#F6FFF2", text: "#30841F" },
    dark: { bg: "#1E3320", text: "#8ED982" },
  },
};

export const CdData: Horizon = {
  "Now": {
    description: "Q2 2026, May 2026 - Jul 2026",
    feature: [
      {
        tag: [{ value: "Deployment" }],
        title: "Native Progressive Rollout Strategy with Percentage-Based Deployment Control",
        description: "Users can deploy new application versions incrementally using percentage-based phasing (e.g., 10% → 25% → 50% → 100%) with manual or automated verification gates between phases, progressively replacing existing pods without doubling infrastructure resources.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Cloud Delegate Based Salesforce Deployments",
        description: "Users can deploy Salesforce releases using cloud delegates, eliminating the need for self-hosted delegate infrastructure while maintaining full deployment capabilities.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Salesforce AI Agent",
        description: "Users can leverage an AI agent integrated with the MCP Server to automatically generate deployment drafts by selecting relevant commits or permission set sections based on natural language prompts.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Preconfigured Package.xmls for Salesforce Deployments",
        description: "Users can use out-of-the-box package.xml templates for common Salesforce deployment scenarios, eliminating the need to manually configure package files for each deployment type.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Kubernetes Cluster Observability Dashboard",
        description: "Users can visualize and monitor Kubernetes cluster resources with a Lens-like observability tool, providing real-time insights into cluster health, resource utilization, and deployment status.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Service Configuration Drift Detection and Reconciliation",
        description: "Users can detect and reconcile configuration drift between deployed services and their desired state, maintaining deployment consistency and preventing configuration mismatches across environments.",
      },

      {
        tag: [{ value: "GitOps" }],
        title: "GitOps Integration with Argo Projects",
        description: "Full CRUD and import support for ArgoCD App Projects in Harness, including UI for managing project settings such as repository access, cluster access, sync windows, and orphaned resources.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Allow Harness Secrets in GitOps Applications",
        description: "Users can securely reference and use Harness secrets within GitOps application manifests and configurations, integrating with Harness secret management.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "AI Supported Remediation",
        description: "Users can leverage AI-powered recommendations to remediate GitOps deployment issues and failures with intelligent suggestions.",
      },

      {
        tag: [{ value: "CV" }],
        title: "Git Experience Support for Monitored Services",
        description: "Users can manage Monitored Services through Git, enabling Git-based change management, version control, and approval workflows for CV configurations.",
      },
      {
        tag: [{ value: "CV" }],
        title: "AI Verify Feature Parity",
        description: "AI Verify reaches full feature parity with traditional verification, bringing AI-powered deployment verification to all supported health sources and deployment types.",
      },
      {
        tag: [{ value: "CV" }],
        title: "Change Advisor in Harness: MVP",
        description: "AI-powered risk assessment for changes that automatically generates risk scores, enables low-risk changes to proceed automatically, and flags high-risk changes for additional scrutiny to reduce downtime and increase release velocity.",
      },

      {
        tag: [{ value: "Pipeline" }],
        title: "Pipeline Recovery Time (MTTR) Analytics",
        description: "Users can track and analyze mean time to recovery (MTTR) metrics for pipeline failures, enabling data-driven improvements to deployment reliability.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Next-Generation Workflow Engine",
        description: "Complete implementation, deployment, and validation of the next-generation pipeline execution engine with improved performance, scalability, and advanced orchestration capabilities for complex deployment workflows.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Breakpoint Support in Pipelines",
        description: "Users can set breakpoints in pipeline execution to pause, inspect state, and debug complex deployment workflows interactively.",
      },

      {
        tag: [{ value: "OPA" }],
        title: "OPA Data on Dashboard",
        description: "Users can view comprehensive OPA policy analytics on a dedicated dashboard, including policy violations and warnings over time, user triggers, policy names and severity, associated pipelines, and filtering capabilities.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "OPA GitX Consistency for Git-Backed Entities",
        description: "Users can ensure OPA policies are enforced on Git-backed entities even when changes are made directly to Git branches, preventing policy bypass scenarios.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "OPA UI/UX Revamp and Design 3.0 Support",
        description: "Users can experience a completely redesigned OPA UI with modern Design 3.0 patterns, improved usability, and streamlined policy management workflows.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Rego Editor Validation and Testing",
        description: "Users can validate and test Rego policies directly within the Policy testing screen with syntax highlighting, indentation error detection, and inline validation without external tools.",
      },

      {
        tag: [{ value: "Release Orchestration" }],
        title: "Queue Activity Support",
        description: "Users can consolidate execution of pipelines, finalize outputs, and execute processes based on approved queued outputs for better control over release workflows.",
      },
      {
        tag: [{ value: "Release Orchestration" }],
        title: "Looping of Targets in Process Execution",
        description: "Users can iterate over collections of entities during process execution, enabling dynamic deployment workflows across multiple targets.",
      },
      {
        tag: [{ value: "Release Orchestration" }],
        title: "Individual Process Execution",
        description: "Users can execute individual processes independently, providing flexibility to run specific release steps without triggering the entire release workflow.",
      },
      {
        tag: [{ value: "Release Orchestration" }],
        title: "Scheduling of Individual Phases in Release Process",
        description: "Users can schedule individual phases within release processes, enabling time-based orchestration and phased rollouts across different environments.",
      },
      {
        tag: [{ value: "Release Orchestration" }],
        title: "ValueStream in Release",
        description: "Users can track and visualize a complete value stream within a release, including collection of code commits, artifacts, and associated Jira tickets for full traceability.",
      },
    ],
  },
  "Next": {
    description: "Q3 2026, Aug 2026 - Oct 2026",
    feature: [
      {
        tag: [{ value: "GitOps" }],
        title: "Hosted GitOps",
        description: "Users can leverage fully hosted GitOps agents managed by Harness, eliminating the need for self-managed agent infrastructure.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "AI Powered Imports of Applications",
        description: "Use the power of AI to create and assign related resources to GitOps Applications as they are imported.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "GitX Integration",
        description: "Users can integrate GitX with Continuous Verification (CV) for Git-based verification configuration management.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "AI Agent Based Continuous Verification",
        description: "Users can utilize AI agents for intelligent continuous verification of deployments with adaptive learning.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Support for AWS CloudWatch Logs",
        description: "Users can configure AWS CloudWatch logs as a health source for continuous verification and log-based anomaly detection.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "OIDC Support",
        description: "Users can enable OIDC authentication for continuous verification health sources, improving security and access management.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Prometheus Default Health Source for Continuous Verification",
        description: "Users can deploy with continuous verification using Prometheus as a built-in default health source without additional configuration.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Continuous Verification Support for Traffic Shifting Offerings",
        description: "Users can use verify step with Harness deployment workflows that use traffic shifting strategies like canary and blue-green.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Template Verification",
        description: "Users can validate and enforce OPA policies for templates, ensuring governance at the template level.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Support for Runtime Contexts",
        description: "Users can create and enforce OPA policies that adapt to runtime contexts and dynamic conditions.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Improve OPA Onboarding Wizard",
        description: "Users can leverage OPA onboarding wizard to simplify policy creation, configuration, and enforcement.",
      },
    ],
  },
  "Later": {
    description: "Q4 2026 and beyond",
    feature: [
      {
        tag: [{ value: "Deployment" }],
        title: "Advanced Deployment Strategies",
        description: "Extended support for sophisticated deployment patterns including progressive delivery, shadow deployments, and multi-region orchestration.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "GitOps Advanced Automation",
        description: "Further automation capabilities for GitOps workflows including intelligent drift detection, auto-remediation, and predictive scaling.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Advanced AI-Driven Verification",
        description: "Next-generation AI capabilities for continuous verification including predictive anomaly detection and automated root cause analysis.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Multi-Cloud Orchestration Enhancements",
        description: "Enhanced capabilities for orchestrating deployments across multiple cloud providers with unified policies and governance.",
      },
    ],
  },
  "Released": {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Deployment" }],
        title: "Azure Container Apps (ACA) Support",
        description: "Users can deploy to Azure Container Apps (ACA) using Harness, with support for Blue-Green deployment strategy and ACR as the artifact repository.",
        link: "https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-container-apps/overview",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Native Artifact Registry Support for All CD Steps",
        description: "Native integration of Harness Artifact Registry across all deployment types (Kubernetes, Helm, ECS, Azure WebApps, SSH/WinRM, Serverless, etc.), eliminating the need for external connectors and providing seamless authentication using Harness platform RBAC.",
        link: "https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#harness-artifact-registry",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Azure Steady State",
        description: "Health check status polling for Azure Web Apps. Monitors instance health during deployment for reliable steady state verification.",
        link: "https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial/#health-check-polling-for-steady-state-verification",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Containerised Step Group Support with VM Pools",
        description: "Users can deploy Containerised Step Groups using VM Pools.",
        link: "https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/",
      },

      {
        tag: [{ value: "GitOps" }],
        title: "Integration with Argo Projects",
        description: "Full CRUD and import support for ArgoCD App Projects in Harness, including UI for managing project settings such as repository access, cluster access, sync windows, and orphaned resources.",
        link: "https://developer.harness.io/docs/continuous-delivery/gitops/applicationsets/appset-basics",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Rollback Support for GitOps Applications",
        description: "Users can trigger rollbacks to a previous version of a deployed GitOps application directly from the Harness UI, and as a dedicated GitOps Rollback step in pipelines.",
        link: "https://developer.harness.io/docs/continuous-delivery/gitops/pr-pipelines/pr-pipelines-basics/#failure-strategy-and-rollback",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "AI-Powered GitOps Management",
        description: "Users can leverage AI to query and manage GitOps applications, AppSets, and clusters, including sync status checks, triggering operations, and generating pipeline snippets.",
        link: "https://developer.harness.io/docs/continuous-delivery/gitops/gitops-basics/harness-git-ops-basics",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Centralized Notifications for GitOps",
        description: "Users can receive centralized notifications for GitOps application events such as sync start, completion, success, failure, and AppSet create, sync, and error events.",
        link: "https://developer.harness.io/docs/continuous-delivery/gitops/gitops-basics/harness-git-ops-basics",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "OPA Support",
        description: "Users can enforce Open Policy Agent policies in GitOps workflows.",
        link: "https://developer.harness.io/docs/continuous-delivery/gitops/application/opa-policy-support/#policy-input-schema",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Project Variables Support",
        description: "Users can define and use project-level variables in GitOps applications.",
        link: "https://developer.harness.io/docs/continuous-delivery/gitops/application/manage-gitops-applications/#use-expressions",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "AI Verify with Configuration Agent",
        description: "AI-powered verification with automated health source setup. The configuration agent communicates with MCP servers to populate queries and create Monitored Service templates, reducing configuration toil and increasing CV adoption.",
        link: "https://developer.harness.io/docs/continuous-delivery/verify/configure-cv/configure-verify-step-with-ai/overview",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Notification Events for Verification Step Sub-tasks",
        description: "Enhanced notification events that capture details of verification tasks, data collection tasks, and their durations for better monitoring and observability.",
        link: "https://developer.harness.io/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step",
      },

      {
        tag: [{ value: "Pipeline" }],
        title: "Pipeline Execution from Git Tags",
        description: "Users can trigger pipeline executions using Git tags through Git Experience, with support in both the UI and API.",
        link: "https://developer.harness.io/docs/platform/triggers/trigger-pipeline-on-tag-event/",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Dry-Run Validation for Pipeline Changes",
        description: "Users can validate pipeline YAML changes made in GitHub or VS Code using a Language Service add-on, enabling earlier detection of errors without running the pipeline.",
        link: "https://developer.harness.io/docs/platform/git-experience/validate-pipeline-changes-with-dry-run/",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "DAG Support",
        description: "Users can define steps and their dependencies as a Directed Acyclic Graph (DAG), enabling flexible, non-linear, and parallel pipeline execution.",
        link: "https://developer.harness.io/docs/platform/pipelines/define-a-failure-strategy-for-pipelines",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Large-scale Pipelines",
        description: "Users can create and manage large-scale pipelines with improved performance and scalability.",
        link: "https://developer.harness.io/docs/platform/pipelines/pipeline-chaining",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Improved Error Logging",
        description: "Users can access enhanced error logging for better troubleshooting and debugging of pipeline issues.",
        link: "https://developer.harness.io/docs/platform/pipelines/executions-and-logs/viewing-logs",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Dynamic Tags for Execution",
        description: "Users can dynamically assign tags during pipeline execution for better organization and tracking.",
        link: "https://developer.harness.io/docs/platform/pipelines/add-a-stage/#option-tags",
      },

      {
        tag: [{ value: "OPA" }],
        title: "Support for Delete Events",
        description: "Users can enforce OPA policies for delete events.",
        link: "https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview",
      },
      {
        tag: [{ value: "OPA" }],
        title: "OPA Execution on Customer Infra",
        description: "Users can execute OPA policies on their own infrastructure for enhanced security and control.",
        link: "https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Project Movement Across Orgs",
        description: "Users can move projects across organizations with OPA policies intact.",
        link: "https://developer.harness.io/docs/platform/organizations-and-projects/projects",
      },

    ]
  }
};
