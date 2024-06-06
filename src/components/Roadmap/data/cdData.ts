import { Horizon } from "./roadmapData";
export const CdData: Horizon = {
  "Now": {
    description: "Q1 2024, Feb-Apr 2024",
    feature: [
      {
        tag: [{ value: "AWS" }],
        title: "Lambda Deployments with Canary and traffic shifting",
        description: "Users can now perform Lambda Deployments with Canary",
      },
      {
        tag: [{ value: "Pipelines" }],
        title: "Support for configuring Service and Environment at the pipeline level",
        description: "Enable users to seamlessly define for Services and Environment at the pipeline level and refer these at individual stages",
      },
      {
        tag: [],
        title: "Overrides V2 YAML Editor ",
        description: "Define overrides using YAML Editor",
      },
      {
        tag: [],
        title: "Selective Infrastructure configuration in Environment propagation",
        description: "Infrastructures can be selectively configured during environment propagation",
      },
      {
        tag: [],
        title: "RBAC for Overrides",
        description: "Granular permissions for Overrides",
      },
      {
        tag: [{ value: "Kubernetes" }],
        title: "Application Preview for Kubernetes Service",
        description: "After Harness deploys a service, users can preview the new version of the Application",
      },
      {
        tag: [{ value: "Kubernetes" }],
        title: "Kubernetes Canary Deployment 2.0. Contained Experimentation.",
        description: "User’s can now have 2 separate copies of the deployed canary. Harness will deploy a canary and compare it to a separate copy of the current service.",
      },
      {
        tag: [{ value: "Spinnaker" }, { value: "Migration" }],
        title: "Migrator tool for Spinnaker",
        description: "User’s can migrate their Spinnaker Pipelines to Harness",
      },
      {
        tag: [{value: "Continuous Verification"}],
        title: "Continuous Verification using Manifest",
        description: "Users can now initiate a CV step using a manifest. This allows service owners to define the key metrics to be validated in CV during service definition.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "GitOps Advanced RBAC",
        description: "Extending GitOps RBAC to handle more granular permissions.",
      },
    ],
  },
  "Next": {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [],
        title: "Native Helm Deployment - Blue Green and Canary Support",
        description: "User’s can now take their Helm Chart and Harness will orchestrate and manage the deployment via Helm. We leverage kustomize to perform the specific actions to support the Blue Green and Canary behavior along with Helm.",
      },
      {
        tag: [{ value: "Azure" }],
        title: "Azure Functions Support",
        description: "Users can deploy Azure Functions via Harness. Harness will support Basic and Blue Green Deployment Strategy.",
      },
      {
        tag: [],
        title: "Helm Deployment with CRDs",
        description: "Users can deploy Helm Charts that have CRDs.",
      },
      {
        tag: [],
        title: "Step and Feature Usage Metrics and Reports",
        description: "User’s can get data about the steps and features they are leveraging within Harness and figure out how to maximize their usage of the product.",
      },
      {
        tag: [],
        title: "Prometheus Default Health Source for Continuous Verification",
        description: "Users can deploy Helm Charts that have CRDs.",
      },
      {
        tag: [],
        title: "Prometheus Default Health Source for Continuous Verification",
        description: "Users can deploy Helm Charts that have CRDs.",
      },
      {
        tag: [{value: "AWS"}, {value: "Serverless"}],
        title: "Multiple Runtimes Support for Serverless.com",
        description: "Users will be able to use multiple new supported runtimes with serverless.com functions.",
      },
      {
        tag: [],
        title: "Harness Code Support as a Manifest Source",
        description: "Users can use Harness Code as a manifest source for all Harness CD swimlanes.",
      },
      {
        tag: [{value: "GitOps"}],
        title: "Support Multiple Repository Sources",
        description: "Users can reference files in separate sources for their GitOps deployments.",
      },
      {
        tag: [{value: "Continuous Verification"}],
        title: "Add Google Big Query as a New Health Source",
        description: "Users will be able to select Google Big Query as their health source for Continuous Verification.",
      },
      {
        tag: [{value: "Continuous Verification"}],
        title: "Health Source as a Part of a Service Entity",
        description: "Users can definte the CV analysis requirements in the service manifest.",
      },
      {
        tag: [{value: "OPA"}],
        title: "Governance 2.0: Simplified Configuration Experience",
        description: "Users can use a policy-as-code approach to define their operational policies.",
      }
    ],
  },
  "Later": {
    description: "Q3 2024+, Aug 2024 & beyond",
    feature: [
      {
        tag: [],
        title: "Serverless Dashboards",
        description: "Harness can help users visualize their serverless application endpoints and their failures, success, and metrics.",
      },
      {
        tag: [{ value: "AIDA" }],
        title: "AIDA driven Deployments",
        description: "Using Harness AIDA, Harness will help generate and deploy pipelines.",
      },
      {
        tag: [],
        title: "Continuous Verification Support for Traffic Shifting Offerings",
        description: "Users can use verify step with Harness Deployment workflows that use traffic shifting.",
      },
      {
        tag: [],
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
        tag: [],
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
    ]
  }
};
