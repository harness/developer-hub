import routesChunkNames from "@generated/routesChunkNames";
import { Horizon } from "./roadmapData";
export const CdData: Horizon = {
  "Now": {
    description: "Q3 2025, Aug 2025 - Oct 2025",
    feature: [
    
      {
        tag: [{value: "Deployment"}],
        title: "Salesforce Deployment Support",
        description: "Users can deploy Salesforce releases using Harness.",
      },
      {
        tag: [{value: "Deployment"}],
        title: "Google Compute Engine and Google VM Deployment Support",
        description: "Users can deploy Google Compute Engine and Google VM using Harness.",
      },
      {
        tag: [{value: "Deployment"}],
        title: "Drift and Unmanaged Service detection for non-GitOps deployments",
        description: "Users can detect drift and unmanaged services in non-GitOps deployments.",
      },
      {
        tag: [{value: "Deployment"}],
        title: "Containerised Step Group Support with VM Pools",
        description: "Users can deploy Containerised Step Groups using VM Pools.",
      },


      {
        tag: [{value: "Pipeline"}],
        title: "Manual Stage Execution",
        description: "Users can manually trigger specific pipeline stages and run them out of sequence, enabling flexible, service-specific deployment",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "DAG Support",
        description: "Users can define steps and their dependencies as a Directed Acyclic Graph (DAG), enabling flexible, non-linear, and parallel pipeline execution."
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Support for Drone Pipelines",
        description: "Users can trigger and monitor existing Drone pipelines from within Harness, with full visibility and support for native Drone YAML"
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Expanding Parallel Stage Limits",
        description: "Users can expand the limit of parallel stages in pipelines to support complex deployment workflows."
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Stage Output Variables",
        description: "Users can define and use output variables in pipeline stages to pass data between stages and enable dynamic pipeline execution."
      },


      {
        tag: [{value: "GitOps"}],
        title: "Harness Secrets Support in Applications",
        description: "Users can securely manage and utilize Harness Secrets within GitOps applications.",
      },

      {
        tag: [{value: "GitOps"}],
        title: "Argo Rollout Support",
        description: "Users can leverage Harness native Argo Rollout steps for deployments.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Sync Status Events",
        description: "Enables notifications for key GitOps events like SyncSucceeded, SyncFailed, HealthDegraded, and OutOfSync to help teams stay informed.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Improved DR support",
        description: "Automates Argo CD Sync Window management during DR switchover between Primary and Secondary Agents, eliminating manual steps and simplifying failover.",
      },


      {
        tag: [{value: "Continuous Verification"}],
        title: "AI Powered Verification",
        description: "Uses LLM-powered log analysis to assess deployment health before and after rollout, supporting both live and file-based logs in cloud-native environments.",
      },
      {
        tag: [{value: "Continuous Verification"}],
        title: "Open Source Health Sources",
        description: "Users can configure open source health sources for continuous verification.",
      },


      {
        tag: [{value: "OPA"}],
        title: "Repo Import and Package Support",
        description: "Enables OPA users to define and reuse custom Rego packages across policies for improved modularity, granularity, and easier testing.",
      },
      {
        tag: [{value: "OPA"}],
        title: "OPA Licensing Improvements",
        description: "Users can manage OPA licensing for their Harness accounts.",
      },
      
      
    ],
  },
  "Next": {
    description: "Q4 2025, Nov 2025 - Jan 2026",
    feature: [
      
      {
        tag: [{value: "Deployment"}],
        title: "Mainframe Deployment Support",
        description: "Users can deploy mainframe applications using Mainframe Deployment Support.",
      },
      {
        tag: [{value: "Deployment"}],
        title: "Release Orchestration",
        description: "Users can schedule customer releases with configurable cadences, organizing them into phases that run pipelines and custom steps as part of a structured rollout.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Native Slack Approval",
        description: "Users can approve deployments using Slack.",
      },
      {
        tag: [{value: "Deployment"}],
        title: "Serverless V4 Support",
        description: "Users can deploy serverless applications using Serverless V4.",
      },

      {
        tag: [{value: "Deployment"}],
        title: "Kubernetes 2.0",
        description: "Users can deploy Kubernetes applications using Kubernetes 2.0.",
      },

      {
        tag: [{value: "Connectors"}],
        title: "OIDC Authentication - Hashicorp deployment types",
        description: "Users can enable OIDC authentication for HashiCorp deployment types.",
      },

      {
        tag: [{value: "Pipeline"}],
        title: "Project Movement Across Orgs",
        description: "Users can move projects across organizations.",
      },

      {
        tag: [{value: "GitOps"}],
        title: "Centralised Notification for GitOps",
        description: "Users can receive notifications for GitOps events.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Fine-grained RBAC using Argo Projects",
        description: "Users can enable fine-grained RBAC for GitOps.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "AI Assistance for GitOps",
        description: "Users can enable AI assistance for GitOps.",
      },

     
    ],
  },
  "Later": {
    description: "Q1 2026, Feb 2026 - Apr 2026",
    feature: [
      {
        tag: [{value: "CV"}],
        title: "AI powered Verification",
        description: "Users can leverage AI-powered verification in deployments.",
      },
      {
        tag: [{value: "CV"}],
        title: "GitX Integration",
        description: "Users can integrate GitX with Continuous Verification (CV).",
      },
      {
        tag: [{value: "CV"}],
        title: "New Healthsource - CloudWatch",
        description: "Users can configure Amazon CloudWatch as a health source.",
      },
            {
        tag: [{value: "OPA"}],
        title: "Support for runtime contexts",
        description: "Users can create and enforce OPA policies that adapt to runtime contexts.",
      },      
      {
        tag: [{value: "OPA"}],
        title: "Improve OPA Onboarding Wizard",
        description: "Users can leverage OPA onboarding wizard to simplify policy creation, configuration, and enforcement.",
      },
      {
        tag: [{value: "OPA"}],
        title: "OPA for Continuous Verification",
        description: "Users can enforce OPA policies for Continuous Verification.",
      },
      {
        tag: [{value: "OPA"}],
        title: "Support for Delete events",
        description: "Users can enforce OPA policies for delete events.",
      },
      {
        tag: [{value: "OPA"}],
        title: "Template verification",
        description: "Users can validate and enforce OPA policies for templates.",
      },
      {
        tag: [{value: "Migrator"}],
        title: "Jenkins -> Harness ",
        description: "Users can migrate from Jenkins to Harness.",
      },
      {
        tag: [{value: "Continuous Verification"}],
        title: "Prometheus Default Health Source for Continuous Verification",
        description: "Users can deploy with continuous verification using prometheus as a built-in default health source.",
      },

      {
        tag: [{value: "Continuous Verification"}],
        title: "Continuous Verification Support for Traffic Shifting Offerings",
        description: "Users can use verify step with Harness Deployment workflows that use traffic shifting.",
      },
  
    ],
  },
  "Released": {
    description: "What has been released",
    feature: [
      {
        tag: [{value: "Connectors"}],
        title: "Support for AWS OIDC",
        description: "Users can utilize OIDC authentication for AWS connectors.",
      },
      {
        tag: [{value: "K8s/Helm Deployment"}],
        title: "Declarative Rollback – Secrets and ConfigMap Versioning",
        description: "Improves declarative rollback by restoring support for secrets and configmaps versioning. Ensures workloads are redeployed when these resources change, preventing drift and runtime issues.",
        link : "https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback/",
      },
      {
        tag: [{value: "AWS Deployment"}],
        title: "Parallel rollback support in ASG deployment",
        description: "Improves declarative rollback by restoring support for secrets and configmaps versioning. Ensures workloads are redeployed when these resources change, preventing drift and runtime issues.",
        link : "https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-tutorial/#multi-asg-deployments-and-parallel-rollback-single-serviceenvironmentinfrastructure",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Fast Fail pipeline support",
        description: "Stops pipeline execution immediately when a step or stage fails in a parallel group, enabling faster rollback and resource efficiency.",
        link : "https://developer.harness.io/docs/platform/pipelines/failure-handling/fast-fail/",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Canary Support for Native Lambda Deployments",
        description: "Enables Canary deployment strategy for AWS Lambda Native deployments, allowing incremental traffic shifting and verification of new functions before full rollout.",
        link : "https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments/#lambda-canary-deployment-strategy",
      },
      {
        tag: [{value: "Deployment"}],
        title: "Support for ServiceNow releases Vancouver, Yokohama, Washington DC and Xanadu",
        description: "Users can deploy ServiceNow releases using Harness.",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Fine Grained Concurrency Management.",
        description: "Allows users to reserve execution slots for critical projects by splitting pipeline concurrency into High and Low priority partitions at the account level.",
        link : "https://developer.harness.io/docs/platform/pipelines/pipeline-settings/#project-level-pipeline-execution-concurrency",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Trigger-Specific Failure Notifications",
        description: "Adds support for notifications when triggers fail to execute, enabling teams to promptly address issues like missing input sets or template changes before pipeline execution.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Native Application Sets Support",
        description: "Users can create GitOps Application Sets directly through the UI and Terraform.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Audit Trail for GitOps events",
        description: "Users can generate audit trail entries for GitOps entities.",
        link : "https://developer.harness.io/docs/continuous-delivery/gitops/security/audit-trail/",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Filters for AppSync History in Service Dashboard",
        description: "Adds filters to AppSync history in the Service Dashboard, including date range, application name, and sync status—enabling easier tracking and analysis of GitOps synchronization events.",
      },
    ]
  }
};
