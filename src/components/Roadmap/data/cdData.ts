import { Horizon } from "./roadmapData";
export const CdData: Horizon = {
  "Now": {
    description: "Q2 2024, May-July 2024",
    feature: [
      {
        tag: [{value: "CD & GitOps"}],
        title: "Native Helm Deployment - Blue Green and Canary Support",
        description: "User’s can now take their Helm Chart and Harness will orchestrate and manage the deployment via Helm. We leverage kustomize to perform the specific actions to support the Blue Green and Canary behavior along with Helm.",
      },
      {
        tag: [{value: "CD & GitOps"}],
        title: "Kubernetes Traffic Shifting Support",
        description: "User’s can now integrate with Istio or any Service Mesh Interface and Harness can route traffic to specific endpoints for the deployed service.",
      },
      {
        tag: [{value: "CD & GitOps"}, {value: "AWS"}],
        title: "AWS OIDC Support for Deployments",
        description: "All AWS Deployment Types now can leverage OIDC to authenticate and Harness can perform deployments via ODIC",
      },
      {
        tag: [{value: "CD & GitOps"}, {value: "GCP"}],
        title: "GCP OIDC Support for Deployments",
        description: "All GCP Deployment Types now can leverage OIDC to authenticate and Harness can perform deployments via ODIC",
      },
      {
        tag: [{value: "CD & GitOps"}, {value: "AWS"}],
        title: "Lambda Deployments with Canary and traffic shifting",
        description: "Users can now perform Lambda Deployments with Canary",
      },
      {
        tag: [{value: "CD & GitOps"}, {value: "Pipelines"}],
        title: "Support for configuring Service and Environment at the pipeline level",
        description: "Enable users to seamlessly define for Services and Environment at the pipeline level and refer these at individual stages",
      },
      {
        tag: [{value: "CD & GitOps"}],
        title: "Overrides V2 YAML Editor ",
        description: "Define overrides using YAML Editor",
      },
      {
        tag: [{value: "CD & GitOps"}],
        title: "Selective Infrastructure configuration in Environment propagation",
        description: "Infrastructures can be selectively configured during environment propagation",
      },
      {
        tag: [{value: "CD & GitOps"}],
        title: "RBAC for Overrides",
        description: "Granular permissions for Overrides",
      },
      {
        tag: [{value: "CD & GitOps"}, {value: "Kubernetes"}],
        title: "Application Preview for Kubernetes Service",
        description: "After Harness deploys a service, users can preview the new version of the Application",
      },
      {
        tag: [{value: "CD & GitOps"}, {value: "Kubernetes"}],
        title: "Kubernetes Canary Deployment 2.0. Contained Experimentation.",
        description: "User’s can now have 2 separate copies of the deployed canary. Harness will deploy a canary and compare it to a separate copy of the current service.",
      },
      {
        tag: [{value: "CD & GitOps"}, {value: "Spinnaker"}, {value: "Migration"}],
        title: "Migrator tool for Spinnaker",
        description: "User’s can migrate their Spinnaker Pipelines to Harness",
      },
      {
        tag: [{value: "CD & GitOps"}],
        title: "Continuous Verification using Manifest",
        description: "Users can now initiate a CV step using a manifest. This allows service owners to define the key metrics to be validated in CV during service definition.",
      },
      {
        tag: [{value: "CD & GitOps"}],
        title: "GitOps Advanced RBAC",
        description: "Extending GitOps RBAC to handle more granular permissions.",
      },
    ],
  },
  "Next": {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [{value: "CD & GitOps"}, {value: "Azure"}],
        title: "Azure Functions Support",
        description: "Users can deploy Azure Functions via Harness. Harness will support Basic and Blue Green Deployment Strategy.",
      },
      {
        tag: [{value: "CD & GitOps"}],
        title: "Helm Deployment with CRDs",
        description: "Users can deploy Helm Charts that have CRDs.",
      },
      {
        tag: [{value: "CD & GitOps"}],
        title: "Step and Feature Usage Metrics and Reports",
        description: "User’s can get data about the steps and features they are leveraging within Harness and figure out how to maximize their usage of the product.",
      },
      {
        tag: [{value: "CD & GitOps"}],
        title: "Prometheus Default Health Source for Continuous Verification",
        description: "Users can deploy Helm Charts that have CRDs.",
      },
    ],
  },
  "Later": {
    description: "Q4 2024+, Oct+ 2024",
    feature: [
      {
        tag: [{value: "CD & GitOps"}],
        title: "Serverless Dashboards",
        description: "Harness can help users visualize their serverless application endpoints and their failures, success, and metrics.",
      },
      {
        tag: [{value: "CD & GitOps"}, {value: "AIDA"}],
        title: "AIDA driven Deployments",
        description: "Using Harness AIDA, Harness will help generate and deploy pipelines.",
      },
      {
        tag: [{value: "CD & GitOps"}],
        title: "Continuous Verification Support for Traffic Shifting Offerings",
        description: "Users can use verify step with Harness Deployment workflows that use traffic shifting.",
      },
      {
        tag: [{value: "CD & GitOps"}],
        title: "Continuous Verification Support for Serverless Lambda",
        description: "Users can use verify step for Serverless deployments with the ability to validate the Cloudwatch alarms.",
      },
      {
        tag: [{value: "CD & GitOps"}],
        title: "External Secret Operator in GitOps",
        description: "Harness will support GitOps Deployments to pull secrets from an external secret manager.",
      },
    ],
  },
};
