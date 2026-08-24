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
    description: "Q3 2026, Aug 2026 - Oct 2026",
    feature: [
      // CD — Deployment
      {
        tag: [{ value: "Deployment" }],
        title: "Native AI Agent Deployment",
        description: "Deploy AI agents natively to Google Agent Runtime and AWS Agent Core, with Evals available as a built-in pipeline step. Includes automatic Gateway provisioning for AWS Agent Core deployments and Agent Identity support for both Google and AWS agent platforms.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Pod Status and Logs in Pipeline Execution",
        description: "Users can see every Kubernetes pod created, updated, or deleted by a deployment, with its status and logs, in the pipeline execution view — during the rollout and after it completes.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Salesforce Org Maps",
        description: "Users can visualize relationships between Salesforce orgs, compare configuration diffs between connected orgs, select specific diffs to publish to a branch, and deploy the branch to target orgs for streamlined multi-org management.",
      },
      // Continuous Verification
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Change Advisor in Harness",
        description: "AI-powered risk assessment for changes that automatically generates risk scores, enables low-risk changes to proceed automatically, and flags high-risk changes for additional scrutiny to reduce downtime and increase release velocity.",
      },
      // GitOps
      {
        tag: [{ value: "GitOps" }],
        title: "Visualization of GitOps Promotion Flows",
        description: "Users can view deployment status of GitOps applications across multiple environments, directly within Harness CD and GitOps, through Release Orchestration, providing enhanced visibility into promotion workflows and deployment steps.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "GitOps Promotion Steps",
        description: "Users can implement GitOps promotion workflows using pre-built promotion steps, reducing configuration effort and standardizing progressive delivery patterns across environments.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Migration of GitOps Applications Between Agents",
        description: "Users can rebalance and migrate GitOps applications from one agent to another, enabling better load distribution and agent maintenance without disrupting deployments.",
      },
      // Pipeline
      {
        tag: [{ value: "Pipeline" }],
        title: "Conditional and Dependent Inputs in Runtime Forms",
        description: "Users can configure runtime input forms where fields are dynamically disabled or hidden based on variable selection, creating intelligent forms that adapt to user choices and reduce input errors.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Nested Template Composition",
        description: "Users can insert stage templates within pipeline templates that themselves support step insertion, enabling modular pipeline architectures with Pipeline Template → Stage Template → Insert Steps composition.",
      },
      // OPA
      {
        tag: [{ value: "OPA" }],
        title: "OPA Version Upgrade to Support Rego v1",
        description: "Users can leverage OPA Rego v1 language features and improvements, including enhanced performance, improved syntax, and better policy authoring capabilities.",
      },
      // Release Orchestration
      {
        tag: [{ value: "Release Orchestration" }],
        title: "Orchestration Queue Rollout",
        description: "Users can manage release execution queues with prioritization, throttling, and coordination across multiple concurrent releases for better resource management.",
      },
      {
        tag: [{ value: "Release Orchestration" }],
        title: "Fine-Grained Role-Based Permissions",
        description: "Users can configure granular role-based access controls for Release Orchestration entities, enabling precise permission management at entity level for improved security and governance.",
      },
      {
        tag: [{ value: "Release Orchestration" }],
        title: "OPA Policy Support for Release Orchestration",
        description: "Users can enforce OPA policies on Release Orchestration workflows, changesets, and processes, ensuring governance and compliance throughout the release lifecycle.",
      },
      {
        tag: [{ value: "Release Orchestration" }],
        title: "Dependency Management in Changesets",
        description: "Users can define and manage dependencies between changesets, ensuring correct execution order and preventing conflicts in release workflows.",
      },
      {
        tag: [{ value: "Release Orchestration" }],
        title: "Artifact Tracking and Changesets",
        description: "Users can automatically track container images produced by build pipelines and compute changesets between versions — including commit diffs and linked Jira or ServiceNow tickets — giving full traceability into what changed across each release.",
        link: "/docs/release-orchestration/artifacts/artifact-tracker-getting-started/",
      },
    ],
  },
  "Next": {
    description: "Q4 2026, Nov 2026 - Jan 2027",
    feature: [
      {
        tag: [{ value: "GitOps" }],
        title: "Hosted GitOps",
        description: "Users can leverage fully hosted GitOps agents managed by Harness, eliminating the need for self-managed agent infrastructure.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Kubernetes Cluster Observability Dashboard",
        description: "Users can visualize and monitor Kubernetes cluster resources with a Lens-like observability tool, providing real-time insights into cluster health, resource utilization, and deployment status.",
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
    description: "Q1 2027 and beyond",
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
        tag: [{ value: "Release Orchestration" }],
        title: "Multi-Cloud Orchestration Enhancements",
        description: "Enhanced capabilities for orchestrating deployments across multiple cloud providers with unified policies and governance.",
      },
    ],
  },
  "Released": {
    description: "Q2 2026 and earlier",
    feature: [
      // Q2 2026 Released Features
      {
        tag: [{ value: "Deployment" }],
        title: "Native Progressive Rollout Strategy with Percentage-Based Deployment Control",
        description: "Users can deploy new application versions incrementally using percentage-based phasing (e.g., 10% → 25% → 50% → 100%) with manual or automated verification gates between phases, progressively replacing existing pods without doubling infrastructure resources.",
        link: "/docs/continuous-delivery/manage-deployments/deployment-concepts",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Cloud Delegate Based Salesforce Deployments",
        description: "Users can deploy Salesforce releases using cloud delegates, eliminating the need for self-hosted delegate infrastructure while maintaining full deployment capabilities.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Preconfigured Package.xmls for Salesforce Deployments",
        description: "Users can use out-of-the-box package.xml templates for common Salesforce deployment scenarios, eliminating the need to manually configure package files for each deployment type.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Native Agent Deployment Support",
        description: "Users can deploy AI agents natively within Harness CD pipelines, enabling intelligent automation and decision-making throughout the deployment lifecycle.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Git Experience Support for Monitored Services",
        description: "Users can manage Monitored Services through Git, enabling Git-based change management, version control, and approval workflows for CV configurations.",
        link: "/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "AI Verify V2",
        description: "AI Verify reaches full feature parity with traditional verification, bringing AI-powered deployment verification to all supported health sources and deployment types.",
        link: "/docs/continuous-delivery/verify/configure-cv/configure-verify-step-with-ai/ai-verify",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "GitOps Integration with Argo Projects",
        description: "Full CRUD and import support for ArgoCD App Projects in Harness, including UI for managing project settings such as repository access, cluster access, sync windows, and orphaned resources.",
        link: "/docs/continuous-delivery/gitops/gitops-entities/projects/manage-projects",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Allow Harness Secrets in GitOps Applications",
        description: "Users can securely reference and use Harness secrets within GitOps application manifests and configurations, integrating with Harness secret management.",
        link: "/docs/continuous-delivery/gitops/security/secret-injection-harness-plugin",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "AI Supported Remediation",
        description: "Users can leverage AI-powered recommendations to remediate GitOps deployment issues and failures with intelligent suggestions.",
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
        title: "Rego Editor Validation and Testing",
        description: "Users can validate and test Rego policies directly within the Policy testing screen with syntax highlighting, indentation error detection, and inline validation without external tools.",
      },
      {
        tag: [{ value: "Release Orchestration" }],
        title: "Queue Activity Support",
        description: "Users can consolidate execution of pipelines, finalize outputs, and execute processes based on approved queued outputs for better control over release workflows.",
      },

    ]
  }
};
