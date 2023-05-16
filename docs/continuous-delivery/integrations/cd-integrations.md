---
title: Supported CD features and integrations
description: Select the tools and platforms for deploying your apps. 
sidebar_position: 1
---

This topic lists the supported CD features and integrations you can use in Harness for deploying and verifying your apps.

For a comprehensive list that includes all Harness modules, go to [Supported platforms and technologies](/docs/getting-started/supported-platforms-and-technologies).

## Deployment types

- [Kubernetes](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview)
- [Helm charts](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart) (v2 and v3)
- [Native Helm](/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm/native-helm-quickstart)
- [Kustomize](/docs/continuous-delivery/deploy-srv-diff-platforms/kustomize/kustomize-quickstart)
- [Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)
- [AWS ASG](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-tutorial)
- [AWS ECS](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
- [AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/lambda/aws-lambda-deployments)
- [Google Cloud Functions](/docs/continuous-delivery/deploy-srv-diff-platforms/google/google-functions)
- [Serverless.com Framework](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless-framework/serverless-lambda-cd-quickstart) (AWS Lambda)
- [Tanzu Application Services](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart)
- Traditional
  - [SSH](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng)
  - [WinRM](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial)
- Spotinst
- Build ([Jenkins](/docs/continuous-delivery/x-platform-cd-features/advanced/builds/run-jenkins-jobs-in-cd-pipelines/), Bamboo)
- [Custom deployments using Deployment Templates](/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployments/custom-deployment-tutorial)
- [GitOps](/docs/continuous-delivery/gitops/harness-git-ops-basics)
- Local ([Harness Community Edition](/docs/continuous-delivery/deploy-srv-diff-platforms/community-ed/harness-community-edition-overview))



## Deployment types and environments

<details>
<summary>Kubernetes</summary>

- **Supported connectors for deployment:**
  - Kubernetes connector
    + Username and password
    + Client key and secret
    + OIDC authentication
    + Kubernetes service account
    + Assume role binding on delegate configuration
  - Google Cloud connector (GKE authentication)
    + Service Account
    + Google Cloud Role on Delegate
    + Workload Identity
  - Azure Cloud Connector (AKS Authentication)
    + Subscription Id
    + Principal and Service Account
    + GovCloud Support
  - AWS Cloud Connector (EKS Authentication)
    + IRSA
    + Access Key and Secret Key
    + IAM Role
    + GovCloud Support  
- **Supported platforms for deployment:**
  - Self Hosted Kubernetes
  - Google Kubernetes Engine
  - Azure Kubernetes Engine
  - AWS Elastic Kubernetes Service
  - Red Hat OpenShift
- **Versions and tooling support:**
  - Kubectl Client Versions:
    - 1.16
    - 1.27
    - We support what each of the Cloud Providers support. We recommend users to keep their binary versions up to date.
    - By default Harness ships with kubectl client - 1.24
  - Tooling:
    - OpenShift - oc client binary
    - Kustomize - kustomize binary
    - Helm - Helm 3.12 and 2.8 binary.
    - Helm 3.8 can be supported via feature flag.
- **Limitations:**
  - Helm:
    - Helm Hooks are not supported for this swimlane. Harness manages and orchestrates the manifests and their release.
    - Kustomize:
      - Kustomize Patches are only supported in YAML, not JSON
      - Kustomize Containerized Plugins are not supported
    - Harness managed resources:
      - Deployment
      - Secrets
      - ConfigMap
      - StatefulSet
      - HorizontalPodAutoScalar is coming soon.
      - PodDisruptionBudget is coming soon.
- **Supported integrations:**
  - Traffic Shifting for Advanced Deployment Strategies:
    - Istio
    - Nginx Ingress Controller
  - All manifest type sources for fetching Kubernetes resources:
    - Github
    - Gitlab
    - Bitbucket
    - Custom Remote Source Repository
    - Harness Local File Store
  - For Helm Chart Type Manifests we also support:
    - Generic Git Provider
    - Google Cloud Storage
    - Amazon S3 Storage
    - Helm OCI Repository (ACR, ECR, GAR, Artifactory)
    - Helm HTTP Server Repository (Nexus, Artifactory)
  - Artifact repository supported to deploy with manifest:
    - DockerHub
    - Amazon Elastic Container Registry
    - Google Container Registry
    - Azure Container Registry
    - Custom Artifact Source
    - Google Artifact Registry
    - Github Package Registry
    - Nexus 3
    - Artifactory

</details>

<details>
<summary>Native Helm</summary>

- **Supported connectors for deployment:**
  - Kubernetes Connector
    - Username + Password
    - Client Key and Secret
    - OIDC Authentication
    - Kubernetes Service Account
    - Assume Rolebinding on Delegate Configuration
  - Google Cloud Connector (GKE Authentication)
    - Service Account
    - Google Cloud Role on Delegate
    - Workload Identity
  - Azure Cloud Connector (AKS Authentication)
    - Subscription ID
    - Principal and Service Account
    - GovCloud Support
  - AWS Cloud Connector (EKS Authentication)
    - IRSA
    - Access Key and Secret Key
    - IAM Role
    - GovCloud Support 
- **Supported platforms for deployment:**
  - Self Hosted Kubernetes
  - Google Kubernetes Engine
  - Azure Kubernetes Engine
  - AWS Elastic Kubernetes Service
  - Red Hat OpenShift
- **Versions and tooling support:**
  - Helm Client Versions: 2.8 - 3.8
  - We support what each of the Cloud Providers support, we recommend users to keep their binary versions up to date
  - By default Harness ships with helm client 2.8 and 3.12.
  - Tooling:
    - OpenShift - oc client binary
    - Kustomize - kustomize binary
    - Helm - Helm 3.12 & 2.8 binary. Helm 3.8 can be supported via feature flag.
- **Limitations:**
  - Helm 2 is deprecated so there is limited support for Helm 2.
  - Helm 3 is now the default for Harness Helm Chart Deployments.
  - Helm Plugins are not supported
  - Only Basic Deployment Strategy supported (No Canary or Blue-Green Support Out of the box)
- **Supported integrations:**
  - Manifest Sources for fetching Helm Chart:
    - Github
    - Gitlab
    - Bitbucket
    - Generic Git Provider
    - Custom Remote Source Repository
    - Google Cloud Storage
    - Amazon S3 Storage
    - Helm OCI Repository (ACR, ECR, GAR, Artifactory)
    - Helm HTTP Server Repository (Nexus, Artifactory)
    - Harness Local File Store
  - Artifact Repository for Container Images to deploy with Chart:
    - DockerHub
    - Amazon Elastic Container Registry
    - Google Container Registry
    - Azure Container Registry
    - Custom Artifact Source
    - Google Artifact Registry
    - Github Package Registry
    - Nexus 3
    - Artifactory

</details>

<details>
<summary>Amazon ECS</summary>

- **Supported connectors for deployment:**
- AWS Cloud Connector
  - IRSA
  - Access Key and Secret Key
  - IAM Role
  - GovCloud Support
- **Supported platforms for deployment:**
  - AWS Cloud, any region
  - AWS - Launch Types:
    - Amazon ECS - EC2 - Generally Provisioned Instances
    - Amazon ECS - EC2 - Spot Backed Instances
    - Amazon ECS - Fargate
- **Versions and tooling support:**
  - AWS SDK 
- **Supported integrations:**
  - ECS Service Discovery - Supported via Service Definition
  - ECS Circuit Breaker - Supported via Service Definition
  - Artifact Repository:
    - DockerHub
    - Amazon Elastic Container Registry
    - Azure Container Registry
    - Custom Artifact Source
    - Github Package Registry
    - Nexus 3
    - Artifactory

</details>



<details>
<summary>Amazon AMI/ASG</summary>

- **Supported connectors for deployment:**
  - AWS cloud connector
    - IRSA
    - Access Key and Secret Key
    - IAM Role
    - GovCloud Support
- **Supported platforms for deployment:**
  - AWS cloud, any region
- **Versions and tooling support:**
  - AWS SDK

</details>


<details>
<summary>AWS Lambda</summary>

- **Supported connectors for deployment:**
  - AWS Cloud Connector
    - IRSA
    - Access Key and Secret Key
    - IAM Role
    - GovCloud Support
- **Supported platforms for deployment:**
  - AWS cloud, any region
- **Versions and tooling support:**
  - AWS SDK
- **Supported integrations:**
  - Artifact Repository Supported to Deploy with Function Definition:
    - Amazon Elastic Container Registry
    - Amazon S3

</details>

<details>
<summary>Traditional: WinRM</summary>

- **Supported connectors for deployment:**
  - AWS Cloud Connector
    - IRSA
    - Access Key and Secret Key
    - IAM Role
    - GovCloud Support
  - Azure Cloud Connector (AKS Authentication)
    - Subscription Id
    - Principal and Service Account
    - GovCloud Support
- **Supported platforms for deployment:**
  - AWS Cloud
  - Azure Cloud
  - Physical Datacenter

</details>


<details>
<summary>Traditional: SSH</summary>

- **Supported connectors for deployment:**
  - AWS Cloud Connector
    - IRSA
    - Access Key and Secret Key
    - IAM Role
    - GovCloud Support
  - Azure Cloud Connector (AKS Authentication)
    - Subscription Id
    - Principal and Service Account
    - GovCloud Support
- **Supported platforms for deployment:**
  - AWS Cloud
  - Azure Cloud
  - Physical Datacenter
- **Limitations:**
  - Google Compute Engine (Virtual Machine Targets)
    - Limited Support, Harness can connect to Google VMs via an SSH Key, not via Google Cloud Authentication
  - Linux SSH Setups
    - Ubuntu Version 22 is not supported. It is coming soon.
    - RHEL9 (Red Hat Enterprise Linux 9) is not supported. It is coming soon.

</details>


<details>
<summary>Tanzu Application Service (formerly Pivotal Cloud Foundry)</summary>

- **Supported connectors for deployment:**
  - Tanzu Connector
    - Endpoint URL, Username and Password
- **Supported platforms for deployment:**
  - On Premise Cloud Foundry Installations
  - VMware Tanzu Platform
- **Versions and tooling support:**
  - Binary Versions:
    - CF CLI v6
    - CF CLI v7
    - CF CLI v8

</details>


<details>
<summary>Google Functions</summary>

- **Supported connectors for deployment:**
  - Google Cloud Connector
  - Service Account
- **Supported platforms for deployment:**
  - Google Cloud, any region
- **Versions and tooling support:**
  - Google SDK. Supported versions:
    - Google Functions Gen 1
    - Google Functions Gen 2
- **Supported integrations:**
  - Artifact Repository:
    - Google Cloud Storage
    - Google Source Repository (Gen 1 Only)

</details>


<details>
<summary>Spot Instances</summary>

- **Supported connectors for deployment:**
  - Spot Connector
    - AccountID + API Token
- **Supported platforms for deployment:**
  - AWS cloud, any region
- **Limitations:**
  - Deployment Behavior:
    - Incremental Traffic Shifting for SpotInst Deployment is not supported
    - VM-based Deployments are supported via Elastigroup configuration

</details>


<details>
<summary>Serverless.com Framework</summary>

- **Supported connectors for deployment:**
  - AWS Cloud Connector
    - IRSA
    - Access Key and Secret Key
    - IAM Role
- **Supported platforms for deployment:**
  - AWS cloud, any region
- **Versions and tooling support:**
  - Supported Binary Versions:
    - serverless.com 1.x
    - serverless.com 2.x
    - serverless.com 3.x
- **Limitations:**
  - Deployment Behavior:
    - Harness only supports AWS Lambda Functions to be deployed via Serverless.com Framework
    - Harness builds and deploys Lambda Functions, users cannot split up the tasks to build functions and deploy functions separately natively via the swimlane
  - Not supported application types:
    - Google Functions
    - Azure Functions
  - Serverless.com 1.x (limited support). Not all capabilities supported.
  - Basic deployment supported. No out-of-the-box canary and blue green deployment supported.
- **Supported integrations:**
  - Serverless.com plugins:
    - Harness supports all the Serverless.com plugins. Please make sure they are compatible with the version of Serverless.com you are using.
  - Artifact Repository:
    - DockerHub
    - Amazon Elastic Container Registry
    - Artifactory
    - Amazon S3

</details>


<details>
<summary>Azure WebApps</summary>

- **Supported connectors for deployment:**
  - Azure Cloud Connector (AKS Authentication)
    - Subscription Id
    - Principal and Service Account
    - GovCloud Support
- **Supported platforms for deployment:**
  - Azure cloud, any Region
- **Versions and tooling support:**
  - Azure SDK

</details>



## Infrastructure provisioners

- [Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness)
- [Terragrunt](/docs/continuous-delivery/cd-infrastructure/terragrunt/terragrunt-howtos)
- Azure ARM and Blueprint
- [AWS CloudFormation](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/cloud-formation-how-tos)
- Shell script (custom)

## CD pipeline controls

- [Strategies](/docs/continuous-delivery/manage-deployments/deployment-concepts): basic, rolling, canary, blue green, custom.
- [Barriers](/docs/continuous-delivery/manage-deployments/synchronize-deployments-using-barriers)
- [Resource Constraints](/docs/continuous-delivery/manage-deployments/deployment-resource-constraints)
- [Queue steps](/docs/continuous-delivery/manage-deployments/control-resource-usage-with-queue-steps)
- [Deployment freeze](/docs/continuous-delivery/manage-deployments/deployment-freeze)
- [Failure strategies](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings//)
- [Conditional executions](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
- [Looping strategies](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
- [Triggers](https://developer.harness.io/docs/category/triggers)
- [Input set and overlays](https://developer.harness.io/docs/platform/pipelines/input-sets/)

## Manifests and file sources

- [Harness File Store](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store/)
- [Git on any platform](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-connector-settings-reference)
- [Github](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference)
- [GitLab](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-lab-connector-settings-reference)
- [Bitbucket](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/bitbucket-connector-settings-reference)
- [AWS CodeCommit](https://developer.harness.io/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/aws-connector-settings-reference)
- [Azure Repos](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-a-azure-repo/)

## Artifact sources

All artifact sources are covered in [CD artifact sources](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources).

- Docker registry on any platform
- Google Container Registry (GCR)
- Google Cloud Storage (GCS)
- Google Artifact Registry
- Amazon Elastic Container Registry (ECR)
- Azure Container Registry (ACR)
- Nexus
- Artifactory
- Jenkins
- Bamboo
- Github packages
- HTTP Helm
- OCI Helm
- Custom artifact source

## Cloud platforms

- [Kubernetes](/docs/platform/Connectors/Cloud-providers/add-a-kubernetes-cluster-connector) (platform-agnostic)
- [AWS](/docs/platform/Connectors/Cloud-providers/add-aws-connector)
- [Azure](/docs/platform/Connectors/Cloud-providers/add-a-microsoft-azure-connector)
- [GCP](/docs/platform/Connectors/Cloud-providers/connect-to-google-cloud-platform-gcp)
- Physical Data Center
- Tanzu
- Spot

## Ticketing and approval systems

- Jira ([ticketing](/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-jira-issues-in-cd-stages), [approvals](/docs/platform/Approvals/adding-jira-approval-stages))
- ServiceNow ([ticketing](/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-service-now-tickets-in-cd-stages), [approvals](/docs/platform/Approvals/service-now-approvals))
- [Harness manual approvals](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages)

## Continuous Verification sources for metrics/logs

- [AppDynamics](/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-app-dynamics)
- [CloudWatch](/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-cloudwatch)
- [Custom Health Source](/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-custom-health-metrics)
- [Datadog](/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-datadog)
- [Dynatrace](/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-dynatrace)
- [Elasticsearch](/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-elastic-search)
- [Google Cloud Operations](/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-google-cloud-operations)
- [New Relic](/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-new-relic)
- [Prometheus](/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-prometheus)
- [Splunk](/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-splunk)
- [Sumo Logic](/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-sumologic)
