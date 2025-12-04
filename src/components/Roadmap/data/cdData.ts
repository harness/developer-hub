import routesChunkNames from "@generated/routesChunkNames";
import { Horizon } from "./roadmapData";
export const CdData: Horizon = {
  "Now": {
    description: "Q4 2025, Nov 2025 - Jan 2026",
    feature: [
      {
        tag: [{ value: "Deployment" }],
        title: "Salesforce Deployments",
        description: "Users can deploy Salesforce releases using Harness with enhanced capabilities.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "GCP MIG Deployment Support",
        description: "Users can deploy Google VM using Harness.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Native Artifact Registry Support for All CD Steps",
        description: "Native integration of Harness Artifact Registry across all deployment types (Kubernetes, Helm, ECS, Azure WebApps, SSH/WinRM, Serverless, etc.), eliminating the need for external connectors and providing seamless authentication using Harness platform RBAC.",
      },

      {
        tag: [{ value: "Pipeline" }],
        title: "DAG Support",
        description: "Users can define steps and their dependencies as a Directed Acyclic Graph (DAG), enabling flexible, non-linear, and parallel pipeline execution.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Large-scale Pipelines",
        description: "Users can create and manage large-scale pipelines with improved performance and scalability.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Improved Error Logging",
        description: "Users can access enhanced error logging for better troubleshooting and debugging of pipeline issues.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Dynamic Tags for Execution",
        description: "Users can dynamically assign tags during pipeline execution for better organization and tracking.",
      },

      {
        tag: [{ value: "GitOps" }],
        title: "Rollouts Support",
        description: "Users can leverage advanced rollout strategies for GitOps deployments.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Improved Imports of Applications",
        description: "Users can import GitOps applications with improved efficiency and accuracy.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "OPA Support",
        description: "Users can enforce Open Policy Agent policies in GitOps workflows.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Project Variables Support",
        description: "Users can define and use project-level variables in GitOps applications.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "AI Supported Remediation",
        description: "Users can leverage AI-powered recommendations to remediate GitOps deployment issues.",
      },

      {
        tag: [{ value: "Continuous Verification" }],
        title: "AI Verify for Internal Harness Deployments",
        description: "LLM-powered verification for Harness deployments with agent framework integration and production-quality AI Verify code.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Notification Events for Verification Step Sub-tasks",
        description: "Enhanced notification events that capture details of verification tasks, data collection tasks, and their durations for better monitoring and observability.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "OIDC Cross Project GCP Support",
        description: "Cross-project access support for GCP tools when setting up continuous verification with OIDC authentication.",
      },

      {
        tag: [{ value: "OPA" }],
        title: "OPA Execution on Customer Infra",
        description: "Users can execute OPA policies on their own infrastructure for enhanced security and control.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Project Movement Across Orgs",
        description: "Users can move projects across organizations with OPA policies intact.",
      },

      {
        tag: [{ value: "Usability" }],
        title: "Pipeline Studio Redesign/Usability",
        description: "Users can experience an improved Pipeline Studio with enhanced usability and modern design.",
      },
    ],
  },
  "Next": {
    description: "Q1 2026, Feb 2026 - Apr 2026",
    feature: [
      {
        tag: [{ value: "Continuous Verification" }],
        title: "AI Powered Verification",
        description: "Users can leverage AI-powered verification to assess deployment health and detect anomalies.",
      },
      {
        tag: [{ value: "AI" }],
        title: "AI DevOps Assistant",
        description: "Users can interact with an AI assistant to streamline DevOps workflows and troubleshooting.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "OPA for Continuous Verification",
        description: "Users can enforce Open Policy Agent policies for continuous verification workflows.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Drift and Unmanaged Service detection for non-GitOps Kubernetes deployments",
        description: "Users can detect drift and unmanaged services in non-GitOps Kubernetes deployments for better governance.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Additional Deployment Types for GitOps",
        description: "Users can deploy additional resource types through GitOps workflows.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Centralized Notifications for GitOps",
        description: "Users can receive centralized notifications for all GitOps events and status updates.",
      },
    ],
  },
  "Later": {
    description: "Q2 2026, May 2026 - Jul 2026",
    feature: [
      {
        tag: [{ value: "GitOps" }],
        title: "Hosted GitOps",
        description: "Users can leverage fully hosted GitOps agents managed by Harness.",
      },
      {
        tag: [{ value: "CV" }],
        title: "GitX Integration",
        description: "Users can integrate GitX with Continuous Verification (CV).",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Support for runtime contexts",
        description: "Users can create and enforce OPA policies that adapt to runtime contexts.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Improve OPA Onboarding Wizard",
        description: "Users can leverage OPA onboarding wizard to simplify policy creation, configuration, and enforcement.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Support for Delete events",
        description: "Users can enforce OPA policies for delete events.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Template verification",
        description: "Users can validate and enforce OPA policies for templates.",
      },
      {
        tag: [{ value: "Migrator" }],
        title: "Jenkins -> Harness",
        description: "Users can migrate from Jenkins to Harness.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "AI Agent Based Continuous Verification",
        description: "Users can utilize AI agents for intelligent continuous verification of deployments.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Support for AWS Cloudwatch logs",
        description: "Users can configure AWS CloudWatch logs as a health source for continuous verification.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "OIDC Support",
        description: "Users can enable OIDC authentication for continuous verification health sources.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Prometheus Default Health Source for Continuous Verification",
        description: "Users can deploy with continuous verification using prometheus as a built-in default health source.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Continuous Verification Support for Traffic Shifting Offerings",
        description: "Users can use verify step with Harness Deployment workflows that use traffic shifting.",
      },
    ],
  },
  "Released": {
    description: "What has been released",
    feature: [
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
        title: "Harness Secrets Support in Applications",
        description: "Users can securely manage and utilize Harness Secrets within GitOps applications.",
        link: "https://developer.harness.io/docs/continuous-delivery/gitops/application/manage-gitops-applications/#harness-secret-expressions-in-application-manifests",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "GitOps ApplicationSets as First-Class Entities",
        description: "Create and manage multiple GitOps applications from a single template with UI wizard support. Includes full CRUD operations and all Argo CD generator types. Requires feature flag GITOPS_APPLICATIONSET_FIRST_CLASS_SUPPORT.",
        link: "https://developer.harness.io/docs/continuous-delivery/gitops/applicationsets/harness-git-ops-application-set-tutorial",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Sync Status Events",
        description: "Enables notifications for key GitOps events like SyncSucceeded, SyncFailed, HealthDegraded, and OutOfSync to help teams stay informed.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Improved DR support",
        description: "Automates Argo CD Sync Window management during DR switchover between Primary and Secondary Agents, eliminating manual steps and simplifying failover.",
        link: "https://developer.harness.io/docs/continuous-delivery/gitops/gitops-ref/gitops-disaster-recovery/",
      },
    ]
  }
};
