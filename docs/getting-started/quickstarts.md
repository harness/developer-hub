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

## Continuous Integration

If you're new to Harness Continuous Integration (CI), you can learn about the [CI pipeline concepts](../continuous-integration/ci-quickstarts/ci-pipeline-basics.md), [Harness CI concepts](../continuous-integration/ci-quickstarts/ci-concepts.md), and try some of the [CI tutorials](/tutorials/build-code), such as [Get started for free with the fastest CI on the planet](/tutorials/build-code/fastest-ci).

If you're also new to the Harness Platform, you can learn about [Harness' key concepts](./learn-harness-key-concepts.md) and [Harness YAML](#harness-yaml).

## Continuous Deployment

Select the tutorial for the platform you want to use to deploy.

* [Kubernetes deployment tutorial](../continuous-delivery/onboard-cd/cd-quickstarts/kubernetes-cd-quickstart.md) shows you how to create a CD Pipeline that deploys a publicly available Docker image and manifest to your target cluster.
* [Helm Chart deployment tutorial](../continuous-delivery/onboard-cd/cd-quickstarts/helm-cd-quickstart.md) shows you how to create a CD Pipeline that uses a Helm chart to deploy a publicly available Docker image to your target cluster.
* [Kustomize deployment tutorial](../continuous-delivery/onboard-cd/cd-quickstarts/kustomize-quickstart.md) shows you how to create a CD Pipeline that uses a kustomization to deploy multiple variants of a simple public Hello World server.
* [Azure ACR to AKS deployment tutorial](../continuous-delivery/onboard-cd/cd-quickstarts/azure-cd-quickstart.md) shows you how to create a CD Pipeline that deploys your ACR image to your target AKS cluster.
* [Azure Web Apps Tutorial](../continuous-delivery/onboard-cd/cd-quickstarts/azure-web-apps-tutorial.md) deploy a Docker image or non-containerized artifact for your Azure Web App. You can deploy to source and target deployment slots, and perform traffic shifting.
* [Serverless Lambda deployment tutorial](../continuous-delivery/onboard-cd/cd-quickstarts/serverless-lambda-cd-quickstart.md) shows you how to deploy a Serverless Lambda application to AWS Lambda using Harness.
* [ECS deployment tutorial](../continuous-delivery/onboard-cd/cd-quickstarts/ecs-deployment-tutorial.md) shows you how to deploy a publicly available Docker image to your Amazon Elastic Container Service (ECS) cluster using a Rolling Deployment strategy.
* [Custom deployments using Deployment Templates tutorial](../continuous-delivery/onboard-cd/cd-quickstarts/custom-deployment-tutorial.md) shows you how to use Deployment Templates for non-native deployments (integrations other than those Harness supports out of the box). Deployment Templates use shell scripts to connect to target platforms, obtain target host information, and execute deployment steps.


## GitOps

* [Harness CD GitOps Quickstart](../continuous-delivery/cd-gitops/harness-cd-git-ops-quickstart.md) shows you how to use Harness native GitOps to deploy services by syncing the Kubernetes manifests in your source repos with your target clusters.


## Feature Flags

The following quickstart guides are available for Feature Flags:

* [Getting started with Feature Flags](/docs/feature-flags/ff-onboarding/getting-started-with-feature-flags) provides a high-level summary of Feature Flag (FF), with video and Quick Guide walkthroughs.
* [Java quickstart](/docs/feature-flags/ff-onboarding/java-quickstart.md) helps you to create a feature flag and use the feature flag SDK in your Java application.

## Cloud Cost Management (CCM)

* [Kubernetes Autostopping Quickstart](../cloud-cost-management/2-use-cloud-cost-management/0-quick-start-guides/kubernetes-autostopping-quick-start-guide.md) shows you how to create and test an AutoStopping rule for your Kubernetes cluster.
* [AutoStopping proxy as a downstream of ALB configuration tutorial](/docs/cloud-cost-management/2-use-cloud-cost-management/0-quick-start-guides/autostopping-proxy-alb-usecase.md) shows you how to configure an AutoStopping proxy as a downstream system of an Application Load Balancer in AWS.

## Harness CD Community Edition

* [Harness Community Edition deployment tutorial](../continuous-delivery/onboard-cd/cd-quickstarts/harness-community-edition-quickstart.md) shows you how to set up Harness CD Community Edition locally and create a CD Pipeline that deploys a public NGINX image to a local cluster.

## Harness YAML

* [Harness YAML Quickstart](../platform/8_Pipelines/harness-yaml-quickstart.md) shows you how to build Pipelines using the Harness YAML builder.

## Service Reliability Management

The following quickstart guides are available for Service Reliability Management:

* [Change Impact Analysis Quickstart](../service-reliability-management/howtos-service-reliability-management/change-impact-analysis/change-impact-analysis-quickstart.md) describes how you can correlate change events and understand their impact on a Monitored Service.

* [SLO Management Quickstart](../service-reliability-management/howtos-service-reliability-management/slo-management-quickstart.md) walks you through the steps to create and manage an SLO.

## Security Testing Orchestration

The following quickstart guides are available for Security Testing Orchestration:

* [STO Tutorial 1: Stand-Alone Pipelines](../security-testing-orchestration/onboard-sto/tutorial-1-standalone-workflows.md) shows you how to set up a Pipeline with a scanner, run scans, analyze the results, and learn the key features of STO.

* [Tutorial 2: Integrated STO Pipelines](../security-testing-orchestration/onboard-sto/sto-tutorial-2-integrated-sto-ci-cd-workflows.md) shows you how to integrate STO functionality into CI and CD Pipelines.