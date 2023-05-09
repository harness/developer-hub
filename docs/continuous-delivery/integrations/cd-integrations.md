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

## Deployment environments

- Kubernetes clusters on any platform.
- Azure:
  - AKS, Azure Virtual Machines.
- AWS:
  - EKS, ECS, EC2, Lambda.
- Google:
  - AKS, Functions, Google Compute Engine (GCE).
- Physical data center.

## Infrastructure provisioners

- [Terraform](http://localhost:3000/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness)
- [Terragrunt](http://localhost:3000/docs/continuous-delivery/cd-infrastructure/terragrunt/terragrunt-howtos)
- Azure ARM and Blueprint
- [AWS CloudFormation](http://localhost:3000/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/cloud-formation-how-tos)
- Shell script (custom)

## CD pipeline controls

- [Strategies](http://localhost:3000/docs/continuous-delivery/manage-deployments/deployment-concepts): basic, rolling, canary, blue green, custom.
- [Barriers](http://localhost:3000/docs/continuous-delivery/manage-deployments/synchronize-deployments-using-barriers)
- [Resource Constraints](http://localhost:3000/docs/continuous-delivery/manage-deployments/deployment-resource-constraints)
- [Queue steps](http://localhost:3000/docs/continuous-delivery/manage-deployments/control-resource-usage-with-queue-steps)
- [Deployment freeze](http://localhost:3000/docs/continuous-delivery/manage-deployments/deployment-freeze)
- [Failure strategies](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
- [Conditional executions](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
- [Looping strategies](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
- [Triggers](/docs/category/triggers)
- [Input set and overlays](/docs/platform/pipelines/input-sets/)

## Manifests and file sources

- [Harness File Store](/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store/)
- [Git on any platform](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-connector-settings-reference)
- [Github](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference)
- [GitLab](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-lab-connector-settings-reference)
- [Bitbucket](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/bitbucket-connector-settings-reference)
- [AWS CodeCommit](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/aws-connector-settings-reference)
- [Azure Repos](/docs/platform/connectors/code-repositories/connect-to-a-azure-repo/)

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
