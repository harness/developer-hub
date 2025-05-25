---
title: AI Reliability Engineer Overview
description: Introduction to the AI Reliability Engineer feature in Harness Chaos Engineering
sidebar_position: 1
---

# AI Reliability Engineer

The AI Reliability Engineer feature enhances your chaos engineering capabilities by leveraging artificial intelligence to automate and optimize reliability testing and analysis.

## Key Features

- **AI Recommendations**: Get intelligent recommendations for experiments and probes based on analysis of your clusters
- **Automated Issue Detection**: Identify potential issues like network latency, memory hogs, and insufficient replicas
- **Suggested Fixes**: Receive specific remediation suggestions like increasing timeout duration or adjusting application replicas
- **One-Click Remediation**: Fix identified issues directly from the UI with a single click
- **AI Pipeline Generation**: Create chaos pipelines with AI assistance, including Kubernetes rollout deployments and pod-focused tests
- **Continuous Learning**: AI continuously improves recommendations based on your environment and experiment results

## Getting Started

### 1. Enable the Feature Flag

- Reach out to your Harness sales representative to enable the AI Reliability Engineer feature flag for your account

### 2. Set Up Your First AI Reliability Analysis

Once the feature flag is enabled:

1. Navigate to your Harness Chaos Engineering module
2. Go to **Environments** in the left navigation menu, choose the environment you want to enable AI Reliability Engineer for
3. You can either:
   - Select an existing infrastructure and click the **More Options** menu (⋮) then select **Edit**
   - Or click **+ New Infrastructure** to create a new one
4. In the infrastructure edit panel, locate the **Enable AI** toggle at the top
5. Turn on the toggle to enable Harness AI Agent to perform tasks on this infrastructure

   ![Enable AI in Infrastructure](./static/ai-enable-toggle.png)

7. Click **Save** to apply your changes 
8. That's it! Now, the AI Reliability Engineer will automatically analyze your experiment results

:::tip
You can identify AI-enabled infrastructures by the "AI Enabled" badge next to their name in the infrastructure list.
:::

