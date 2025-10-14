---
title: What's supported in Harness CCM
description: Supported platforms and feature support matrix for Harness CCM.
sidebar_label: What's supported
sidebar_position: 1
---



import Ccm from '/docs/cloud-cost-management/shared/ccm-supported-platforms.md';

<Ccm />

---

## Supported Environments
Harness CCM supports the following platforms and orchestration systems:

### Cloud Platforms
- AWS
- GCP
- Azure

### Container Orchestration
- Kubernetes: EKS (AWS), GKE (GCP), AKS (Azure)
- ECS Clusters

### Deployment Model
- Harness SaaS

---

### Supported Kubernetes Management Platform
The following section lists the support for Kubernetes management platform for CCM:

| **Technology**               | **Supported Platform** | **Pricing**      |
| ---------------------------- | ---------------------- | ---------------- |
| OpenShift 3.11               | GCP                    | GCP              |
| OpenShift 4.3                | AWSOn-Prem             | AWSCustom-rate\* |
| Rancher                      | AWS                    | Custom-rate\*\*  |
| Kops (Kubernetes Operations) | AWS                    | AWS              |

- Cost data is supported for On-Prem OpenShift 4.3. This uses a custom rate.
- Cost data is supported for K8s workloads on AWS managed by Rancher, but the cost falls back to the custom rate.

---

## CCM Feature Flags

Some Harness CCM features are released behind feature flags to get feedback from specific customers before releasing the features to the general audience.

The following table describes each of the feature flags relevant to Harness CCM.

:::note

To enable a feature flag in your Harness account, contact [Harness Support](mailto:support@harness.io).

:::

<table width="900" cellspacing="0" cellpadding="0">
    <tr>
        <td width="300" word-wrap="break-word"><b>Flag</b></td>
        <td width="600"><b>Description</b></td>
    </tr>
    <tr>
        <td>CCM_CLUSTER_ORCH</td>
        <td>Enables cluster orchestrator functionality</td>
    </tr>
    <tr>
        <td>CCM_COMMORCH</td>
        <td>Enables the commitment orchestrator in the UI side nav</td>
    </tr>
    <tr>
        <td>CCM_CURRENCY_PREFERENCES</td>
        <td>Enables viewing costs in preferred currency</td>
    </tr>
    <tr>
        <td>CCM_BUDGET_CASCADES</td>
        <td>Enables nested budgets for Financial Management</td>
    </tr>
    <tr>
        <td>CCM_COST_CATEGORIES_DASHBOARD</td>
        <td>Enables the use of cost categories in the dashboard</td>
    </tr>
    <tr>
        <td>CCM_COMMORCH_RDS</td>
        <td>Enables RDS support in commitment orchestration</td>
    </tr>
    <tr>
        <td>CCM_ENABLE_DATA_SCOPE</td>
        <td>Enables RBAC on CCM data scope</td>
    </tr>
    <tr>
        <td>CCM_GOVERNANCE_EVALUATION_COST_PER_RESOURCE</td>
        <td>Enables cost per resource for a governance evaluation</td>
    </tr>
    <tr>
        <td>CCM_ANOMALIES_V2</td>
        <td>Enables the new version of CCM anomalies</td>
    </tr>
    <tr>
        <td>CCM_COST_CATEGORY_STAMPED_DATA</td>
        <td>Enables the use of stored cost categories in Perspectives</td>
    </tr>
</table>