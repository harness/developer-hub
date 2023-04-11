---
title: Tutorials and quickstart guides
description: New to Harness? The following quickstarts and tutorials will take you from novice to advanced.
# sidebar_position: 2
helpdocs_topic_id: u8lgzsi7b3
helpdocs_category_id: kx4hs8bn38
helpdocs_is_private: false
helpdocs_is_published: true
---

**New to Harness?** The following tutorials and quickstart guides will take you from novice to advanced.


### Continuous Integration

* [CI pipeline tutorial](../continuous-integration/ci-quickstarts/ci-pipeline-quickstart.md) helps you to create a CI Pipeline that builds and tests code and then pushes an artifact to a registry and performs integration tests. |

### Continuous Deployment

Select the tutorial for the platform you want to use to deploy.

* [Kubernetes deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart.md) shows you how to create a CD Pipeline that deploys a publicly available Docker image and manifest to your target cluster.
* [Helm Chart deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart.md) shows you how to create a CD Pipeline that uses a Helm chart to deploy a publicly available Docker image to your target cluster.
* [Kustomize deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/kustomize/kustomize-quickstart.md) shows you how to create a CD Pipeline that uses a kustomization to deploy multiple variants of a simple public Hello World server.
* [Azure ACR to AKS deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-cd-quickstart.md) shows you how to create a CD Pipeline that deploys your ACR image to your target AKS cluster.
* [Azure Web Apps Tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial.md) deploy a Docker image or non-containerized artifact for your Azure Web App. You can deploy to source and target deployment slots, and perform traffic shifting.
* [Serverless Lambda deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless-framework/serverless-lambda-cd-quickstart.md) shows you how to deploy a Serverless Lambda application to AWS Lambda using Harness.
* [ECS deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial.md) shows you how to deploy a publicly available Docker image to your Amazon Elastic Container Service (ECS) cluster using a Rolling Deployment strategy.
* [Custom deployments using Deployment Templates tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployments/custom-deployment-tutorial.md) shows you how to use Deployment Templates for non-native deployments (integrations other than those Harness supports out of the box). Deployment Templates use shell scripts to connect to target platforms, obtain target host information, and execute deployment steps.


### GitOps 

* [Harness CD GitOps Quickstart](/docs/continuous-delivery/gitops/harness-cd-git-ops-quickstart.md) shows you how to use Harness native GitOps to deploy services by syncing the Kubernetes manifests in your source repos with your target clusters.


### Feature Flags 

The following quickstart guides are available for Feature Flags:

* [Getting started with Feature Flags](../feature-flags/ff-onboarding/ff-getting-started/getting-started-with-feature-flags.md) provides a high-level summary of Feature Flag (FF), with video and Quick Guide walkthroughs.
* [Java quickstart](../feature-flags/ff-onboarding/ff-getting-started/java-quickstart.md) helps you to create a feature flag and use the feature flag SDK in your Java application.

### Cloud Cost Management (CCM)

* [Kubernetes Autostopping Quickstart](../cloud-cost-management/2-use-cloud-cost-management/0-quick-start-guides/kubernetes-autostopping-quick-start-guide.md) shows you how to create and test an AutoStopping rule for your Kubernetes cluster.
* [AutoStopping proxy as a downstream of ALB configuration tutorial](/docs/cloud-cost-management/2-use-cloud-cost-management/0-quick-start-guides/autostopping-proxy-alb-usecase.md) shows you how to configure an AutoStopping proxy as a downstream system of an Application Load Balancer in AWS.

### Harness CD Community Edition 

* [Harness Community Edition deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/community-ed/harness-community-edition-quickstart.md) shows you how to set up Harness CD Community Edition locally and create a CD Pipeline that deploys a public NGINX image to a local cluster. 

### Harness YAML 

* [Harness YAML Quickstart](../platform/8_Pipelines/harness-yaml-quickstart.md) shows you how to build Pipelines using the Harness YAML builder. 

### Service Reliability Management

The following quickstart guides are available for Service Reliability Management: 

* [Change Impact Analysis Quickstart](../service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-quickstart.md) describes how you can correlate change events and understand their impact on a Monitored Service. 

* [SLO Management Quickstart](../service-reliability-management/howtos-service-reliability-management/slo-management-quickstart.md) walks you through the steps to create and manage an SLO. 

### Security Testing Orchestration 

The following quickstart guides are available for Security Testing Orchestration:

* [STO Tutorial 1: Stand-Alone Pipelines](../security-testing-orchestration/onboard-sto/tutorial-1-standalone-workflows.md) shows you how to set up a Pipeline with a scanner, run scans, analyze the results, and learn the key features of STO.

* [Tutorial 2: Integrated STO Pipelines](../security-testing-orchestration/onboard-sto/sto-tutorial-2-integrated-sto-ci-cd-workflows.md) shows you how to integrate STO functionality into CI and CD Pipelines.