import routesChunkNames from "@generated/routesChunkNames";
import { Horizon } from "./roadmapData";
export const CdData: Horizon = {
  "Now": {
    description: "Q2 2025, Feb 2025 - Apr 2025",
    feature: [
      {
        tag: [{value: "OIDC"}],
        title: "Support for AWS",
        description: "Users can utilize OIDC authentication for AWS connectors.",
      },
      {
        tag: [{value: "OIDC"}],
        title: "Support for Azure",
        description: "Users can utilize OIDC authentication for Azure connectors.",
      },
      {
        tag: [{value: "K8s/Helm Deployment"}],
        title: "Drift Detection in K8s",
        description: "Users can detect and remediate configuration drift in Kubernetes deployments.",
      },
      {
        tag: [{value: "K8s/Helm Deployment"}],
        title: "Declarative Rollback – Secrets and ConfigMap Versioning",
        description: "Improves declarative rollback by restoring support for secrets and configmaps versioning. Ensures workloads are redeployed when these resources change, preventing drift and runtime issues.",
      },
      {
        tag: [{ value: "TAS/ECS Deployment" }],
        title: "Per-Connector Perpetual Tasks for TAS and ECS",
        description: "Migrates TAS and ECS swimlanes to use a single perpetual task per connector instead of one per service infrastructure, improving scalability and reducing resource consumption.",
      },
      {
        tag: [{ value: "Connectors" }],
        title: "AWS Connector Support via SMP in Air-Gapped Environments",
        description: "Enables AWS Connector communication through Self-Managed Platform (SMP) in air-gapped environments, improving connectivity and support for restricted networks.",
      },
      {
        tag: [{ value: "Core" }],
        title: "Dynamic Expression Support for Environment Group Looping",
        description: "Enables pipelines to dynamically loop over a list of Environment Group names at runtime, supporting sequential or parallel deployments without predefined stages.",
      },
      {
        tag: [{ value: "K8s/Helm Deployment" }],
        title: "Namespace Segmentation for Shared K8s Clusters",
        description: "Improves support for namespace-level isolation in shared Kubernetes clusters without relying on static service account tokens, enabling secure and scalable multi-team access management.",
      },
      {
        tag: [{ value: "Traditional Deployment" }],
        title: "Artifact Download Support in WinRM Copy Command",
        description: "Enables artifact download as part of the 'Copy' command in WinRM deployments. Facilitates secure transfers via delegate when target hosts cannot access external artifact repositories.",
      },


      {
        tag: [{value: "Pipeline"}],
        title: "Fine Grained Concurrency Management.",
        description: "",
      },

      {
        tag: [{ value: "Pipeline" }],
        title: "Self-Healing System Expansion",
        description: "Enhances orchestration engine resilience by supporting idempotent event processing, reprocessing failed executions, and graph generation recovery—reducing the impact of crashes, bugs, and network issues.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Trigger-Specific Failure Notifications",
        description: "Adds support for notifications when triggers fail to execute, enabling teams to promptly address issues like missing input sets or template changes before pipeline execution.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Manual Stage Execution Control",
        description: "Introduces support for manually triggering each pipeline stage, providing GitLab-style control over multi-service deployments. Enhances flexibility by decoupling stage execution from automatic progression.",
      },
      {
        tag: [{ value: "Git Experience" }],
        title: "Audit Trail for Nested Git-Backed Entities",
        description: "Adds visibility into commit ID and branch information for nested entities like Service, Infrastructure, and Environment used in remote pipeline executions—enabling complete audit trails for Git-backed deployments.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "ClickHouse as Log Service Database",
        description: "Migrates log storage from Redis to ClickHouse to improve scalability, performance, and cost-efficiency. Enhances log retention, streaming reliability, and simplifies log API complexity for high-throughput workloads.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Sunset Debezium Service and Adopt Kafka Connect",
        description: "Replaces custom embedded Debezium CDC logic with Kafka Connect and standard Debezium connectors, enabling centralized, scalable, and fault-tolerant change data capture across services.",
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
      },
      {
        tag: [{value: "GitOps"}],
        title: "Harness Secrets support in Applications",
        description: "Users can securely manage and utilize Harness Secrets within GitOps applications.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Filters for AppSync History in Service Dashboard",
        description: "Adds filters to AppSync history in the Service Dashboard, including date range, application name, and sync status—enabling easier tracking and analysis of GitOps synchronization events.",
      },
      {
        tag: [{value: "Continuous Verification"}],
        title: "Canary Verification for Dynatrace Health source ",
        description: "Users can use Canary Verification with Dynatrace HealthSource.",
      },
      {
        tag: [{value: "Continuous Verification"}],
        title: "Support for Dynatrace Grail as Health source",
        description: "Users can configure Dynatrace Grail as a health source in Harness.",
      },
      {
        tag: [{value: "Continuous Verification"}],
        title: "Support for AWS Cloudwatch Logs as a Health source",
        description: "Users can configure AWS Cloudwatch logs as a health source in Harness.",
      },
      {
        tag: [{value: "Miscellaneous"}],
        title: "Integration with Harness Code",
        description: "Users can automate the creation and configuration of Git repositories and ArgoCD resources using YAML specifications for a streamlined GitOps workflow.",
      },
      
    ],
  },
  "Next": {
    description: "Q3 2025, May 2025 - July 2025",
    feature: [
      {
        tag: [{value: "K8s/Helm Deployment"}],
        title: "Improved Error diagnostics for K8S deployments",
        description: "Users can leverage enhanced error diagnostics for Kubernetes deployments.",
      },
      {
        tag: [{value: "Traditional Deployment"}],
        title: "Matrix support for SSH Deployments",
        description: "Users can leverage matrix deployment strategy for SSH deployments.",
      },
      {
        tag: [{value: "Service/Environments"}],
        title: "Service Groups support for multiple deployments",
        description: "Users can define and manage service groups to streamline multiple deployments.",
      },
      {
        tag: [{value: "Service/Environments"}],
        title: "Template support for Manifest definitions",
        description: "Users can leverage templates for manifest definitions, enabling reusable and consistent configurations across deployments.",
      },
      {
        tag: [{value: "Approvals"}],
        title: "Native events for Approvals",
        description: "Users can leverage native events to trigger and manage approval workflows.",
      },
      {
        tag: [{value: "Approvals"}],
        title: "Native Slack Approval",
        description: "Users can approve or reject pipeline executions directly from Slack.",
      },
      {
        tag: [{value: "Approvals"}],
        title: "Custom data type support in JIRA Create/Update",
        description: "Users can define and use custom data types when creating or updating JIRA issues.",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Manually managed Pipeline Stages",
        description: "Users can manually control the execution of specific pipeline stages.",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Trigger Notifications.",
        description: "",
      },


      {
        tag: [{value: "Pipeline"}],
        title: "Integration with DataDog",
        description: "Users can integrate Harness pipelines with DataDog for real-time monitoring, logging, and performance insights.",
      },

      {
        tag: [{value: "OPA"}],
        title: "Repo Import and Package Support",
        description: "",
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
        tag: [{value: "Miscellaneous"}],
        title: "OIDC Authentication - Hashicorp deployment types",
        description: "Users can enable OIDC authentication for HashiCorp deployment types.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Argo Rollout Support",
        description: "Users can leverage Argo Rollouts for deployments.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Notifications Support",
        description: "Users can enable notifications for GitOps events.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Harness Expressions in Applications",
        description: "Users can leverage Harness expressions within GitOps applications, enabling dynamic configurations and enhanced automation.",
      },

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
      }
    ],
  },
  "Later": {
    description: "Q4 2025+, August 2025 & Beyond",
    feature: [
      {
        tag: [{value: "Continuous Verification"}],
        title: "Prometheus Default Health Source for Continuous Verification",
        description: "Users can deploy with continuous verification using prometheus as a built-in default health source.",
      },
      {
        tag: [],
        title: "Step and Feature Usage Metrics and Reports",
        description: "Users can get data about the steps and features they are leveraging within Harness and figure out how to maximize their usage of the product.",
      },
      {
        tag: [{value: "Serverless"}],
        title: "Serverless Dashboards",
        description: "Harness can help users visualize their serverless application endpoints and their failures, success, and metrics.",
      },
      {
        tag: [{ value: "Harness AI" }],
        title: "Harness AI driven Deployments",
        description: "Using Harness AI, Harness will help generate and deploy pipelines.",
      },
      {
        tag: [{value: "Continuous Verification"}],
        title: "Continuous Verification Support for Traffic Shifting Offerings",
        description: "Users can use verify step with Harness Deployment workflows that use traffic shifting.",
      },
      {
        tag: [{value: "Continuous Verification"}, {value: "Serverless"}],
        title: "Continuous Verification Support for Serverless Lambda",
        description: "Users can use verify step for Serverless deployments with the ability to validate the Cloudwatch alarms.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "External Secret Operator in GitOps",
        description: "Harness will support GitOps Deployments to pull secrets from an external secret manager.",
      },
    ],
  },
  "Released": {
    description: "What has been released",
    feature: [
      {
        tag: [{value: "Deployment"}],
        title: "Blue Green with traffic shifting in ECS deployments",
        description: "Users can implement Blue-Green deployments with traffic shifting for ECS and ASG, enabling seamless rollouts with minimal downtime.",
        link: "https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/traffic-shifting"
      },
      {
        tag: [{value: "Deployment"}],
        title: "Automatic Image Discovery for Serverless plugins",
        description: "Users can automatically discover and use container images for Serverless plugins, simplifying deployment and version management.",
        link: "https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/k8s-diff-step/"
      },
      {
        tag: [{value: "Deployment"}],
        title: "Helm deployments with CRD support",
        description: "Users can deploy Helm charts with Custom Resource Definitions (CRDs).",
        link: "https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart#deploy-helm-charts-with-crds"
      },
      {
        tag: [{value: "Deployment"}],
        title: "Kubectl diff step",
        description: "Users can leverage the Kubectl diff step to preview changes before applying them.",
        link: "https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/k8s-diff-step/"
      },
      {
        tag: [{value: "Deployment"}],
        title: "Helm Namespace overrides",
        description: "Users can override the default namespace in Helm deployments.",
        link: ""
      },
      {
        tag: [{value: "Deployment"}],
        title: "AWS Service Health Polling Mechanism",
        description: "Users can monitor AWS service instance health using a polling mechanism.",
        link: "https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg-tutorial/#steady-state-step"
      },
      {
        tag: [{value: "Core"}],
        title: "Native Event Listener in Pipeline configuration",
        description: "Users can configure a native event listener step to control pipeline execution, allowing it to proceed or fail based on real-time events.",
        link: "https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/event-listener-step/"
      },

      {
        tag: [{value: "Core"}],
        title: "Native Slack Step support in Pipeline configuration(CD & Custom Stage)",
        description: "Users can integrate a native Slack step within pipeline configurations for CD and Custom Stages, enabling real-time notifications and collaboration.",
        link: "https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/slack-notify-step/"
      },
      {
        tag: [{value: "Core"}],
        title: "Custom max concurrency for multi service deployments",
        description: "Users can define custom max concurrency limits for multi-service deployments, ensuring controlled rollout and optimized resource utilization.",
        link: "https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/#custom-max-concurrency"
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Customised Notifications",
        description: "Users can customize the body of notifications sent by Harness for all pipeline events.",
        link: "https://developer.harness.io/docs/platform/templates/customized-notification-template/"
      },

      {
        tag: [{value: "Pipeline"}],
        title: "Bulk Reconciliation of Pipelines with Templates",
        description: "Users can reconcile multiple pipelines with updated templates in bulk.",
        link : "https://developer.harness.io/docs/platform/templates/reconcile-pipeline-templates/"
      },

      {
        tag: [{value: "Pipeline"}],
        title: "Dynamic Pipeline execution",
        description: "Users can generate pipelines dynamically and execute them in Harness.",
        link : "https://developer.harness.io/docs/platform/pipelines/dynamic-execution-pipeline/"
      },
      {
        tag: [{value: "Usability"}],
        title: "Dark Theme",
        description: "Users can use a Dark Theme option in Harness Platform for customizable interface experience.",
      },
    ]
  }
};
