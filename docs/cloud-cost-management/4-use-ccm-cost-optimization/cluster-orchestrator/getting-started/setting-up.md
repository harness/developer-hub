---
title: Setting Up 
description: This topic helps you set up Cluster Orchestrator
sidebar_position: 2
---

# Getting Started

This guide walks you through connecting your Kubernetes cluster to Harness Cloud Cost Management (CCM) and enabling the Cluster Orchestrator.

## Step 1: Log in and Navigate to Cluster Orchestrator

1. Log in to [Harness CCM](https://app.harness.io).
2. Navigate to **Cluster Orchestrator** in the left sidebar.
3. Click **Add New Cluster**.

## Step 2: Create a Kubernetes Connector

Click **+ New Cluster/Cloud Account** and select **Kubernetes** as the cloud provider.  
You can choose between two methods:

- **Quick Create** *(Recommended for first-time users)*
- **Advanced** *(Recommended if you need more control over delegate and cluster setup)*

### Option 2.a: Quick Create

1. **Overview:**  
   - Enter a name for the Kubernetes Connector. This name will represent the cluster within CCM.  
   - Ensure you have **administrative access on the AWS EKS cluster**.

2. **Download and Apply YAML:**  
   - Follow the on-screen steps to download and apply the YAML manifest.  
   - This YAML will:  
     - Deploy a Harness Delegate  
     - Assign the **Cluster Admin** role to the Delegate

3. **Create and Test Connection:**  
   - Once the connection is successfully tested, your cluster is ready fo enabling Cluster Orchestrator.

:::note  
> For **Amazon EKS clusters**, ensure that the **Metrics Server** is installed in the same Kubernetes cluster where the Harness Delegate is deployed.  
:::


### Option 2.b: Advanced Setup

1. **Overview:** Select an existing Kubernetes connector or [create a new one](https://developer.harness.io/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector). 

2. **Feature Selection:** Choose the features you want to enable for this cluster.

3. **Provide Permissions:** Download the YAML provided in the UI and apply it to the cluster as per instructions to grant access to pods and services.

4. **Verify Connection:** Once the connection is successful, your cluster will be ready for enabling Cluster Orchestrator.


## Step 3: Enable Cluster Orchestrator

On the Cluster Orchestrator home page, all connected **EKS clusters** will appear.

1. Click **Enable** to turn on the Cluster Orchestrator for the desired cluster.
2. Choose your preferred method to enable Cluster Orchestrator on the cluster:
   - [Enable using Helm](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/setting-up-co#helm-based-installation)  
   - [Enable using `kubectl` from the CCM UI](/docs/cloud-cost-management/use-ccm-cost-optimization/cluster-orchestrator/setting-up-co#installation-via-kubectl)

