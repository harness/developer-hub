---
title: Setting up Cluster Orchestrator for AWS EKS clusters 
description: This topic describes how to set up Cluster Orchestrator 
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

To enable Cluster Orchestrator for AWS EKS clusters associated with your account, follow these two simple steps:

### Step 1:: Enable feature flag

Currently, this early access feature is behind a feature flag . Contact [Harness Support](mailto:support@harness.io) to enable the feature. After it is enabled, you can see it directly in the navigation bar.

### Step 2: Navigate to Cluster Orchestrator in the Cloud Costs Module

Click on Cluster Orchestrator from the navigation bar. Once you click on it, you will be taken to the home page, where you can see all the clusters associated with your account. 

For each cluster, you can see the following information:
- Name of the cluster
- Region of the cluster
- Number of nodes associated with the cluster
- CPU
- Memory
- Potential spend of the cluster
- Savings realized
- Whether the Cluster Orchestrator is enabled for the particular cluster

On this page, you can also see the total cost of the clusters and the spot savings.
<DocImage path={require('./static/overview.png')} width="100%" height="100%" title="Click to view full size image" />

### Step 3: Enable the Cluster Orchestrator for a Selected Cluster

For a given cluster, click on the enable option, which will take you to the enablement screen. To enable the Cluster Orchestrator for the particular cluster, there are two steps to complete:

#### Step A: Cluster Permissions

You will be asked to run a shell script in your terminal and verify the connection. Upon successfully establishing the connection, click on the next step to configure.
<DocImage path={require('./static/stepA.png')} width="90%" height="90%" title="Click to view full size image" />


#### Step B: Configuration

Cluster Orchestrator allows you to choose a **Base On-Demand Capacity**, which can be further split into percentages to determine how much should be used by Spot and On-Demand instances. You can also choose the distribution strategy between **Least-Interrupted** or **Cost-optimized**. Once all the details are filled in, you can see the potential savings and click on the **"Complete Enablement"** button to enable Cluster Orchestrator for the cluster.

<DocImage path={require('./static/stepB.png')} width="110%" height="110%" title="Click to view full size image" />

After the setup is complete, Cluster Orchestrator supports three screens to show information about your cluster:

#### Overview Page for Cluster Orchestrator Enabled Clusters

The overview page shows all the information about:
- Cluster Spend
- Cluster Details
- Nodes Breakdown
- Nodes
- Pods
- CPU Breakdown
- Memory Breakdown

<DocImage path={require('./static/overview2.png')} width="90%" height="90%" title="Click to view full size image" />

#### Overview of Workloads in the Cluster

This page contains all the information about the workloads associated with the cluster including their:
- Namespace
- Replicas
- Distribution of Replicas
- Total Cost of each workload.

<DocImage path={require('./static/workloads.png')} width="90%" height="90%" title="Click to view full size image" />

#### Overview of Nodes in the Cluster

This page contains all the information about the nodes associated with the cluster, including:
- the Number of Workloads
- Instance Types
- Fulfillment
- CPU
- Memory
- Age
- Status

Additionally, you can see the total cluster spend and the spot savings.
<DocImage path={require('./static/nodes.png')} width="90%" height="90%" title="Click to view full size image" />


