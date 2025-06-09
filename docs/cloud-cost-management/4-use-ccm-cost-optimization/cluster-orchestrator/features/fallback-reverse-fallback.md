---
title: Fallback
description: Learn how to configure fallback policies in Harness Cluster Orchestrator to maintain workload availability while maximizing cost savings
sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

Fallback policies in Cluster Orchestrator define how your workloads respond when AWS Spot Instances are interrupted. These policies ensure continuous application availability while maximizing cost savings through intelligent instance management.

## How Fallback Works

When AWS issues a Spot Instance interruption notice (typically with a two-minute warning), Cluster Orchestrator implements a fallback strategy:

1. **Interruption Detection**: The system detects the AWS interruption signal
2. **Replacement Search**: It immediately searches for alternative Spot Instances
3. **On-Demand Fallback**: If suitable Spot capacity isn't available, it automatically provisions On-Demand instances
4. **Workload Migration**: Application workloads are gracefully migrated to the new instances

This process happens automatically, ensuring your applications remain available even when Spot Instances are reclaimed by AWS.

The diagram illustrates how Cluster Orchestrator handles Spot Instance interruptions, from detection to workload migration, ensuring continuous application availability.

<DocImage path={require('./static/working-spot.png')} width="90%" height="90%" title="Click to view full size image" />

## Reverse Fallback

Cluster Orchestrator doesn't stop at fallback, it continues to optimize costs through reverse fallback:

- When Spot nodes are interrupted, they are automatically replaced with On-Demand nodes to maintain application stability
- Once Spot capacity becomes available again, the system performs a reverse fallback, replacing the On-Demand node with a Spot node
- Users can select the retry interval (in hours) to define how often the system checks for Spot capacity and performs the reverse fallback

## Configuring Fallback Settings

To configure fallback and reverse fallback settings for your cluster:

1. Navigate to the **Cloud Cost Management** module in your Harness account
2. Select **Cluster Orchestrator** from the left navigation menu
3. Click on your cluster name in the list of available clusters
4. If Cluster Orchestrator is not yet enabled, click **Enable** to begin the setup process
5. In the setup wizard, navigate to the **Spot Preferences** tab
6. Scroll to the **Reverse Fallback Retry** section
7. Set the **Retry Interval** to determine how frequently Cluster Orchestrator checks for available Spot capacity after falling back to On-Demand instances. You can configure this interval based on your cost optimization goals and workload characteristics.