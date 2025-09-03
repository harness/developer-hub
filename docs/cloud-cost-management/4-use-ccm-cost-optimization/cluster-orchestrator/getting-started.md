---
title: Get Started
description: Learn how to enable and configure Cluster Orchestrator for your EKS clusters
sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---
# Getting Started

<div style={{
   backgroundColor: '#fff3cd',
   border: '1px solid #ffeaa7',
   borderRadius: '8px',
   padding: '16px',
   margin: '20px 0'
 }}>
   <p style={{margin: 0}}>
     <img src="/img/icon_ff.svg" alt="Feature Flag" width="18" style={{marginRight: '0.4rem', verticalAlign: 'middle'}}/> <strong>Behind a Feature Flag</strong>
     
     Cluster Orchestrator is currently behind a [Feature Flag](/docs/cloud-cost-management/whats-supported#ccm-feature-flags). Contact [Harness Support](mailto:support@harness.io) to have the flag enabled for your account.
   </p>
 </div>

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
   - **Onboard with a single command via kubectl**: [Details](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/enablement-methods/kubectl)
   - **Terraform and Helm installation for advanced installation options**: [Details](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/enablement-methods/setting-up-co-helm)
