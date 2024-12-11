import routesChunkNames from "@generated/routesChunkNames";
import { Horizon } from "./roadmapData";
export const CdData: Horizon = {
  "Now": {
    description: "Q4 2024, Nov 2024 - Jan 2025",
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
        tag: [{value: "Pipeline"}],
        title: "Flexible Templates Phase II",
        description: "Users can reference dynamically inserted stages/steps in pipeline templates",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Customised Notifications",
        description: "Users can customize the body of notifications sent by Harness for all pipeline events.",
      },
      {
        tag: [{value: "Usability"}],
        title: "Dark Theme",
        description: "Users can use a Dark Theme option in Harness Platform for customizable interface experience.",
      },
      {
        tag: [{value: "Usability"}],
        title: "List View + Filter Enhancements",
        description: "Users can leverage enhanced List View and filter options in Harness Platform",
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
        title: "Improved Application Filtering",
        description: "Users can filter applications using live search functionality, and wildcard search is also supported for application labels. ",
      },
      {
        tag: [{value: "CV"}],
        title: "Canary Verification for Dynatrace HealthSource ",
        description: "Users can use Canary Verification with Dynatrace HealthSource.",
      },
      {
        tag: [{value: "CV"}],
        title: "Health Source as part of Service",
        description: "Users can configure Health Sources as part of the Service setup.",
      },
      {
        tag: [{value: "CV"}],
        title: "APM Grouped DataDog Metrics",
        description: "Users can view APM Grouped DataDog metrics in Harness.",
      },
      {
        tag: [{value: "CV"}],
        title: "Dashboard Import for DataDog HealthSource",
        description: "Users can import dashboards for DataDog HealthSource in Harness.",
      },
      {
        tag: [{value: "OPA"}],
        title: "Improved Testing of OPA Policies against Pipeline",
        description: "Users can test OPA policies more effectively against pipelines.",
      },
      {
        tag: [{value: "OPA"}],
        title: "Service, Environment, Overrides w/ OPA",
        description: "Users can configure Service, Environment, and Overrides with OPA policies.",
      },
      {
        tag: [{value: "Miscellaneous"}],
        title: "Triggers: Integration with Harness Artifact Registry",
        description: "Users can integrate triggers with the Harness Artifact Registry.",
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
        tag: [{value: "Migrator"}],
        title: "Jenkins -> Harness ",
        description: "Users can migrate from Jenkins to Harness",
      },
      {
        tag: [{value: "Release Management"}],
        title: "Release Management",
        description: "Users can create and orchestrate a release process using a collection of requirements and existing pipelines.",
      },
      {
        tag: [{value: "Continuous Verification"}],
        title: "Continuous Verification using Manifest",
        description: "Users can initiate a CV step using a manifest. This allows service owners to define the key metrics to be validated in CV during service definition.",
      }, 
      {
        tag: [{value: "Continuous Verification"}],
        title: "Support for DQL in Dynatrace Health Source",
        description: "Support for DQL (Dynatrace Query Language) in the Dynatrace Health Source to enhance data querying and analysis capabilities.",
      }
    ],
  },
  "Next": {
    description: "Q1 2025, Feb 2025 - Apr 2025",
    feature: [
      {
        tag: [],
        title: "SFDC deployments ",
        description: "Users can deploy to Salesforce (SFDC) directly through Harness",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Improved Dashboards and reporting for Gitops",
        description: "Deployments made using GitOps will be reflected in the Service Dashboards",
      },
      {
        tag: [],
        title: " MLOps",
        description: "Users can streamline ML model lifecycle management with Harness Managed Workflows.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Drift and Unmanaged Service detection for non-GitOps deployments",
        description: "Users can leverage Harness ArgoCD Application Templates (HaaT) for drift detection and multi-agent ArgoCD management in non-GitOps service deployments.",
      },
      {
        tag: [{value: "Deployment"}],
        title: "Agent less - Serverless deployments ",
        description: "Users can perform agentless, serverless deployments in Harness. ",
      },
      {
        tag: [{value: "GitOps"}],
        title: " GitOps Expansion - Support for ML Workloads",
        description: "Users can streamline ML model lifecycle management with Harness Managed Workflows",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Pipeline Analytics",
        description: "Users can benefit from categorized pipeline errors, providing clearer insights into failure causes",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Bulk Reconciliation of Pipelines with Templates",
        description: "Users can update templates and bulk update all pipelines referencing the template to reflect any changes made",
      },
      {
        tag: [],
        title: "Governance 2.0 (Revamped Experience) ",
        description: "",
      }
    ],
  },
  "Later": {
    description: "Q2 2025+, May 2025 & Beyond",
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
        tag: [{ value: "AIDA" }],
        title: "AIDA driven Deployments",
        description: "Using Harness AIDA, Harness will help generate and deploy pipelines.",
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
        tag: [{value: "Core"}],
        title: "Add Failure Strategy Support for Service and Environment Steps",
        description: "Users can retry or re-execute the Service Step or Environment Step, allowing failed pipeline executions to retry service and environment steps.",
      },
      {
        tag: [],
        title: "Enhance the Specify Infrastructure Field",
        description: "The infrastructure list is listed in alphabetical order. The field will be searchable.",
      },
      {
        tag: [],
        title: "Support Self-Hosted Bitbucket OAuth Tokens for Git Experience",
        description: "Users that make a change in Harness will appear as themselves in Bitbucket as opposed to as a service account.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Support Multiple Repository Sources",
        description: "Users can reference files in separate sources for their GitOps deployments.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Granular RBAC for Syncs.",
        description: "Users can set granular permissions for GitOps syncs.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Allow Selection of Application Names Using Regex ",
        description: "Users can use regex to select Gitops applications.",
      },
      {
        tag: [{value: "Helm"}],
        title: "Native Helm Deployment - Blue Green and Canary Support",
        description: "User’s can now take their Helm Chart and Harness will orchestrate and manage the deployment via Helm. We leverage kustomize to perform the specific actions to support the Blue Green and Canary behavior along with Helm.",
      },
      {
        tag: [{value: "Continuous Verification"}],
        title: "Health Source as a Part of a Service Entity",
        description: "Users can definte the CV analysis requirements in the service manifest.",
      },
      {
        tag: [{value: "Harness Code"}],
        title: "Harness Code Support as a Manifest Source",
        description: "Users can use Harness Code as a manifest source for all Harness CD swimlanes.",
      },
      {
        tag: [],
        title: "Allow Use of Approvals API with a Service Account",
        description: "Users can use the approvals API with a service account.",
      },
      {
        tag: [],
        title: "Post Production Rollback Support for Account and Organization Level Services",
        description: "Users can rollback pipelines that have account or organization scoped services.",
      },
    ]
  }
};
