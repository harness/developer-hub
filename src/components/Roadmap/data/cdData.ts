import routesChunkNames from "@generated/routesChunkNames";
import { Horizon } from "./roadmapData";
export const CdData: Horizon = {
  "Now": {
    description: "Q1 2025, Feb 2025 - Apr 2025",
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
        tag: [{value: "Deployment"}],
        title: "Blue Green with traffic shifting in ECS & ASG deployments",
        description: "Users can implement Blue-Green deployments with traffic shifting for ECS and ASG, enabling seamless rollouts with minimal downtime.",
      },
      {
        tag: [{value: "Deployment"}],
        title: "Automatic Image Discovery for Serverless plugins",
        description: "Users can automatically discover and use container images for Serverless plugins, simplifying deployment and version management.",
      },
      {
        tag: [{value: "Deployment"}],
        title: "Helm deployments with CRD support",
        description: "Users can deploy Helm charts with Custom Resource Definitions (CRDs).",
      },
      {
        tag: [{value: "Deployment"}],
        title: "Kubectl diff step",
        description: "Users can leverage the Kubectl diff step to preview changes before applying them.",
      },
      {
        tag: [{value: "Deployment"}],
        title: "Helm Namespace overrides",
        description: "Users can override the default namespace in Helm deployments.",
      },
      {
        tag: [{value: "Deployment"}],
        title: "AWS Service Health Polling Mechanism",
        description: "Users can monitor AWS service instance health using a polling mechanism.",
      },
      {
        tag: [{value: "Core"}],
        title: "Native Event Listener in Pipeline configuration",
        description: "Users can configure a native event listener step to control pipeline execution, allowing it to proceed or fail based on real-time events.",
      },
      {
        tag: [{value: "Core"}],
        title: "Native Slack Step support in Pipeline configuration(CD & Custom Stage)",
        description: "Users can integrate a native Slack step within pipeline configurations for CD and Custom Stages, enabling real-time notifications and collaboration.",
      },
      {
        tag: [{value: "Core"}],
        title: "Custom max concurrency for multi service deployments",
        description: "Users can define custom max concurrency limits for multi-service deployments, ensuring controlled rollout and optimized resource utilization.",
      },


      {
        tag: [{value: "Pipeline"}],
        title: "Customised Notifications",
        description: "Users can customize the body of notifications sent by Harness for all pipeline events.",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Bulk Reconciliation of Pipelines with Templates",
        description: "Users can reconcile multiple pipelines with updated templates in bulk.",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Integration with DataDog",
        description: "Users can integrate Harness pipelines with DataDog for real-time monitoring, logging, and performance insights.",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Dynamic Pipeline execution",
        description: "Users can generate pipelines dynamically and execute them in Harness.",
      },

      
      {
        tag: [{value: "Usability"}],
        title: "Dark Theme",
        description: "Users can use a Dark Theme option in Harness Platform for customizable interface experience.",
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
        tag: [{value: "CV"}],
        title: "Health Source as part of Service",
        description: "Users can configure Health Sources as part of the Service setup.",
      },
      {
        tag: [{value: "CV"}],
        title: "Canary Verification for Dynatrace HealthSource ",
        description: "Users can use Canary Verification with Dynatrace HealthSource.",
      },
      {
        tag: [{value: "CV"}],
        title: "Support for Dynatrace Grail as Healthsource",
        description: "Users can configure Dynatrace Grail as a health source in Harness.",
      },
      {
        tag: [{value: "CV"}],
        title: "Value Realisation for CV",
        description: "",
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
        title: "Integration with Harness Code",
        description: "Users can automate the creation and configuration of Git repositories and ArgoCD resources using YAML specifications for a streamlined GitOps workflow.",
      },
      {
        tag: [{value: "Miscellaneous"}],
        title: "Project movement across Organisations",
        description: "Users can move projects from one organization to another.",
      },
      {
        tag: [{value: "Miscellaneous"}],
        title: "OIDC Authentication - Hashicorp deployment types",
        description: "Users can enable OIDC authentication for HashiCorp deployment types.",
      },

      {
        tag: [{value: "Migrator"}],
        title: "Jenkins -> Harness ",
        description: "Users can migrate from Jenkins to Harness.",
      }
      
    ],
  },
  "Next": {
    description: "Q2 2025, May 2025 - July 2025",
    feature: [
      {
        tag: [{value: "K8s/Helm Deployment"}],
        title: "Drift Detection in K8s",
        description: "Users can detect and remediate configuration drift in Kubernetes deployments.",
      },
      {
        tag: [{value: "K8s/Helm Deployment"}],
        title: "Helm CRD Support",
        description: "Users can deploy and manage Custom Resource Definitions (CRDs) with Helm.",
      },
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
        title: "Fine Grained Concurrency Management.",
        description: "",
      },


      {
        tag: [{value: "Usability"}],
        title: "Dark Theme",
        description: "Users can use a Dark Theme option in Harness Platform for customizable interface experience.",
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
      }
    ],
  },
  "Later": {
    description: "Q3 2025+, August 2025 & Beyond",
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
        title: "Azure Functions",
        description: "Users can deploy Azure Functions.",
      },
      {
        tag: [{value: "Deployment"}],
        title: "Google Cloud Run Support",
        description: "Users can deploy to Google Cloud Run.",
      },
      {
        tag: [{value: "OPA"}],
        title: "Service, Environment, Overrides w/ OPA",
        description: "Users can configure Service, Environment, and Overrides with OPA policies.",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Flexible Templates Phase II",
        description: "Users can reference dynamically inserted stages/steps in pipeline templates",
      },
      {
        tag: [{value: "OPA"}],
        title: "Service, Environment, Overrides w/ OPA",
        description: "Users can create and enforce OPA policies for CD entities such as Services, Environments, Overrides, and Infrastructure definitionsn",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Improved Application Filtering",
        description: "Users can filter applications using live search functionality, and wildcard search is also supported for application labels. ",
      }
    ]
  }
};
