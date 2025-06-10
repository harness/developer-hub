---
title: Getting Started
description: Learn how to enable and configure Cluster Orchestrator for your EKS clusters
sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---
# Getting Started

:::note
This feature is behind a feature flag. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

Cluster Orchestrator is designed for quick implementation with minimal configuration. You can be up and running in just three simple steps:

1. **Connect** your AWS EKS cluster
2. **Configure** your optimization preferences
3. **Activate** the orchestration

## Prerequisites

- [AWS EKS cluster with Metrics Server installed](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
- [Harness Kubernetes connector](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector)

## Quick Start

1. Log in to [Harness](https://app.harness.io) and go to **Cloud Costs** → **Cluster Orchestrator**
2. Click on "Add New Cluster" 
3. Click on "New Cluster/Cloud Account", then select "Kubernetes". You can create a Kubernetes Connector through two methods:
   - [Quick Create](/docs/cloud-cost-management/get-started/onboarding-guide/use-quick-create-k8s)
   - [Advanced](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes)
4. After this, your created connector will show up on the home page of Cluster Orchestrator.
5. Choose an enablement method and follow the steps listed on the respective pages:
   - **kubectl**: [Details](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/setting-up-co#installation-via-kubectl)
   - **Helm**: [Details](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/setting-up-co#helm-based-installation)
