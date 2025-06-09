---
title: Integration with Commitment Orchestrator by Harness CCM
description: Optimize cluster scaling decisions by considering Reserved Instance and Savings Plan commitments
sidebar_position: 1
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

# Commitment Orchestrator Integration

## Requirements

- Active Commitment Orchestrator subscription
- Properly configured AWS account connections in Harness
- Appropriate permissions to access commitment data

## Overview

The integration between Cluster Orchestrator and Commitment Orchestrator enables intelligent, cost-aware decisions when scaling your Kubernetes clusters. By considering your existing AWS Reserved Instances (RIs) and Savings Plans (SPs), Cluster Orchestrator can make more financially optimal decisions about instance selection and management.

Without this integration, you might be paying for both unused commitment capacity AND new instances provisioned by Cluster Orchestrator - essentially paying twice for the same computing resources.

## Why This Integration Matters

Without commitment awareness, Cluster Orchestrator might make decisions that appear cost-effective in isolation but actually lead to wasted commitment spend. For example:

- **Replacing a node covered by an RI**: If Cluster Orchestrator replaces an on-demand node that's already covered by a Reserved Instance with a spot instance, the RI commitment continues to be charged but is no longer being utilized effectively.

- **Ignoring available RIs when scaling**: When scaling up, Cluster Orchestrator might choose instance types based solely on workload requirements, missing opportunities to utilize instance types with available RI coverage.

## How It Works

When enabled, the integration provides Cluster Orchestrator with commitment context for three critical scenarios:

### 1. Cluster Scaling Decisions

Before making any selection, the system checks with Commitment Orchestrator for underutilized RIs and SPs. If matching underutilized commitments exist, it prioritizes those instance types. The system will automatically select an on-demand instance covered by your commitment rather than a spot instance if it provides better overall cost efficiency. If no matching commitments are found, it falls back to standard selection logic.

### 2. Spot Interruption Handling

When AWS interrupts a spot instance in your cluster:

- Immediately checks for underutilized commitments that match the requirements
- If matching commitments are found, provisions an on-demand instance covered by your commitment
- This provides both stability (on-demand) and cost efficiency (commitment coverage)

### 3. Reverse Fallback Retry Decisions

When considering moving workloads back from on-demand to spot instances:

- The system first checks if the current on-demand node is covered by an RI or SP
- For covered nodes, it calculates whether moving to spot would result in true savings
- Nodes specifically provisioned to use commitments are protected from reverse fallback
- This ensures you don't lose the benefit of your commitments while still optimizing where appropriate

## Configuration

To enable this integration:

1. Navigate to the Cluster Orchestrator setup screen
2. In the **Cluster Preferences** section, find the **Integration with Commitment** checkbox and select it
3. Use the dropdown menu to select the relevant AWS master account that contains your commitment information
4. Complete the rest of your Cluster Orchestrator configuration

<!-- <DocImage path={require('./static/commitment-integration-config.png')} width="80%" height="80%" title="Commitment Integration Configuration" /> -->

> **Note:** You must have an active Commitment Orchestrator subscription and properly configured AWS account connections to use this feature.

## Benefits

- **Prevent wasted commitment spend**: Avoid scenarios where spot instances replace nodes already covered by commitments that can't be applied elsewhere
- **Maximize RI utilization**: Ensure that your reserved instances are being fully utilized across your infrastructure
- **True cost optimization**: Make scaling decisions based on your complete financial picture, not just spot vs. on-demand pricing
- **Simplified management**: No need to manually track which nodes should or shouldn't be replaced based on commitment coverage

