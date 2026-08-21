---
title: What's supported in Harness CACM
description: Supported platforms and feature support matrix for Harness CACM.
sidebar_label: What's supported
sidebar_position: 1
---



import Ccm from '/docs/cloud-cost-management/shared/ccm-supported-platforms.md';

<Ccm />

---

## Supported AI Providers and Capabilities

The following table displays which Cloud & AI Cost Management capabilities are available for each AI provider. Core capabilities (GenAI costs, AI traces, Cost Explorer, Dashboards, Cost Categories, and Budgets) are supported across every provider. **AWS Bedrock** has the widest coverage, supporting every capability.

<table>
  <colgroup>
    <col style={{ minWidth: '260px' }} />
  </colgroup>
  <thead>
    <tr>
      <th>Capability</th>
      <th align="center">AWS Bedrock</th>
      <th align="center">Google Vertex</th>
      <th align="center">Azure Foundry</th>
      <th align="center">Anthropic Enterprise</th>
      <th align="center">Anthropic Developer Platform</th>
      <th align="center">OpenAI</th>
      <th align="center">Cursor</th>
      <th align="center">Devin</th>
      <th align="center">GitHub Copilot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GenAI costs (provider, model, sub-account ID, token type, token count)</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
    </tr>
    <tr>
      <td>Costs by principal</td>
      <td align="center">✅</td>
      <td align="center">❌</td>
      <td align="center">❌</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
    </tr>
    <tr>
      <td>AI traces (agent, service, custom dimensions)</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
    </tr>
    <tr>
      <td>Cost Explorer / Views</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
    </tr>
    <tr>
      <td>Dashboards</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
    </tr>
    <tr>
      <td>Cost Categories</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
    </tr>
    <tr>
      <td>Budgets</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
    </tr>
    <tr>
      <td>User-level AI budgets and enforcement</td>
      <td align="center">✅</td>
      <td align="center">❌</td>
      <td align="center">❌</td>
      <td align="center">✅</td>
      <td align="center">❌</td>
      <td align="center">❌</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
    </tr>
    <tr>
      <td>Anomaly detection</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">❌</td>
      <td align="center">✅</td>
      <td align="center">✅</td>
      <td align="center">❌</td>
      <td align="center">❌</td>
      <td align="center">❌</td>
    </tr>
  </tbody>
</table>

:::note
For **Anthropic Developer Platform** and **OpenAI**, costs by principal are attributed by API key.
:::

---

## Supported Environments
Harness CACM supports the following platforms and orchestration systems:

### Cloud Platforms
- AWS
- GCP
- Azure

### Container Orchestration
- Kubernetes: EKS (AWS), GKE (GCP), AKS (Azure)
- ECS Clusters

### Deployment Model
- Harness SaaS

:::tip
Go to [Data Sources and Refresh Rates](/docs/cloud-cost-management/provider-integrations/data-ingestion-reference) to review what CACM ingests from each provider, the source, and how often it refreshes.
:::

---

### Supported Kubernetes Management Platform
The following section lists the support for Kubernetes management platform for CACM:

| **Technology**               | **Supported Platform** | **Pricing**      |
| ---------------------------- | ---------------------- | ---------------- |
| OpenShift 3.11               | GCP                    | GCP              |
| OpenShift 4.3                | AWSOn-Prem             | AWSCustom-rate\* |
| Rancher                      | AWS                    | Custom-rate\*\*  |
| Kops (Kubernetes Operations) | AWS                    | AWS              |

- Cost data is supported for On-Prem OpenShift 4.3. This uses a custom rate.
- Cost data is supported for K8s workloads on AWS managed by Rancher, but the cost falls back to the custom rate.

