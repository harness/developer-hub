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

- [Harness Kubernetes connector](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector)
- Kubernetes version compatibility: Supports v1.16 through v1.31. Note that Kubernetes v1.32 is not currently supported.

:::note
Important: Kubernetes v1.32 is not currently supported. Please ensure your cluster is running a compatible Kubernetes version.
:::

## Quick Start

1. Log in to [Harness](https://app.harness.io) and go to **Cloud Costs** → **Cluster Orchestrator**
2. If you don't have a Kubernetes connector, click on "Add New Cluster" else follow step 5.
3. Click on "New Cluster/Cloud Account", then select "Kubernetes". You can create a Kubernetes Connector through two methods:
   - [Quick Create](/docs/cloud-cost-management/get-started/onboarding-guide/use-quick-create-k8s)
   - [Advanced](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes)
4. After this, your created connector will show up on the home page of Cluster Orchestrator.
5. Choose an enablement method and follow the steps listed on the respective pages:
   - **Onboard with a single command via kubectl**: [Details](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/setting-up-co#installation-via-kubectl)
   - **Terraform and Helm installation for advanced installation options**: [Details](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/setting-up-co#helm-based-installation)
