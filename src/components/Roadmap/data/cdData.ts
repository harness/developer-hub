import routesChunkNames from "@generated/routesChunkNames";
import { Horizon } from "./roadmapData";
export const CdData: Horizon = {
  "Now": {
    description: "Q3 2024, Aug - Oct 2024",
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
        tag: [],
        title: "Move Projects Across Orgs",
        description: "Users can move projects from one organization to another.",
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
        tag: [{value: "Azure Functions"}],
        title: "Azure Functions",
        description: "Users can deploy Azure Functions.",
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
        tag: [{value: "Swimlanes"}],
        title: "Google Cloud Run Support",
        description: "Users can deploy to Google Cloud Run.",
      },
      {
        tag: [],
        title: "Post Production Rollback Support for Account and Organization Level Services",
        description: "Users can rollback pipelines that have account or organization scoped services.",
      },
    ],
  },
  "Next": {
    description: "Q4 2024, Nov 2024 - Jan 2025",
    feature: [
      {
        tag: [{value: "Continuous Verification"}],
        title: "Continuous Verification using Manifest",
        description: "Users can now initiate a CV step using a manifest. This allows service owners to define the key metrics to be validated in CV during service definition.",
      }, 
      {
        tag: [{value: "Continuous Verification"}],
        title: "Prometheus Default Health Source for Continuous Verification",
        description: "Users can deploy with continuous verification using prometheus as a built-in default health source.",
      },
      {
        tag: [{value: "Release Management"}],
        title: "Release Management",
        description: "Users can create and orchestrate a release process using a collection of requirements and existing pipelines.",
      }
    ],
  },
  "Later": {
    description: "Q1 2025+, Feb 2025 & Beyond",
    feature: [
      {
        tag: [],
        title: "Step and Feature Usage Metrics and Reports",
        description: "User’s can get data about the steps and features they are leveraging within Harness and figure out how to maximize their usage of the product.",
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
        tag: [{value: "Infra Provisioners"}],
        title: "HTTPS Support for Bitbucket Server when Using Terraform & Terragrunt",
        description: "User’s can connect to the Bitbucket server when using Terraform & Terragrunt module source configuration via HTTPS. ",
      },
      {
        tag: [{value: "AWS"}, {value: "Serverless"}],
        title: "Multiple Runtimes Support for Serverless.com",
        description: "Users will be able to use multiple new supported runtimes with serverless.com functions.",
      },
      {
        tag: [{value: "Continuous Verification"}],
        title: "Add Google Big Query as a New Health Source",
        description: "Users will be able to select Google Big Query as their health source for Continuous Verification.",
      },
      {
        tag: [{ value: "Spinnaker" }, { value: "Migration" }],
        title: "Migrator Tool for Spinnaker",
        description: "User’s can migrate their Spinnaker Pipelines to Harness.",
      },
      {
        tag: [{value: "Kubernetes"}],
        title: "Native Support for Kubectl Rollout Restart",
        description: "User’s can restart their kubectl rollouts natively within the Harness UI.",
      },
      {
        tag: [{value: "Kubernetes"}],
        title: "Kubernetes Traffic Shifting Support",
        description: "User’s can now integrate with Istio or any Service Mesh Interface and Harness can route traffic to specific endpoints for the deployed service.",
      },
      {
        tag: [{ value: "AWS" }],
        title: "AWS OIDC Support for Deployments",
        description: "All AWS Deployment Types now can leverage OIDC to authenticate and Harness can perform deployments via ODIC",
      },
      {
        tag: [{ value: "GCP" }],
        title: "GCP OIDC Support for Deployments",
        description: "All GCP Deployment Types now can leverage OIDC to authenticate and Harness can perform deployments via ODIC",
      },
      {
        tag: [],
        title: "Overrides V2 YAML Editor ",
        description: "Define overrides using YAML Editor",
      },
      {
        tag: [{value: "Infra Provisioners"}],
        title: "Selective Infrastructure configuration in Environment propagation",
        description: "Infrastructures can be selectively configured during environment propagation",
      },
    ]
  }
};
