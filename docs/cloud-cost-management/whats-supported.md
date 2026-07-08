---
title: What's supported in Harness CACM
description: Supported platforms and feature support matrix for Harness CACM.
sidebar_label: What's supported
sidebar_position: 1
---



import Ccm from '/docs/cloud-cost-management/shared/ccm-supported-platforms.md';

<Ccm />

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

---

## CACM Feature Flags

Some Harness CACM features are released behind feature flags to get feedback from specific customers before releasing the features to the general audience.

The following table describes each of the feature flags relevant to Harness CACM.

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
        <td>Enables RBAC on CACM data scope</td>
    </tr>
    <tr>
        <td>CCM_GOVERNANCE_EVALUATION_COST_PER_RESOURCE</td>
        <td>Enables cost per resource for a governance evaluation</td>
    </tr>
    <tr>
        <td>CCM_ANOMALIES_V2</td>
        <td>Enables the new version of CACM anomalies</td>
    </tr>
    <tr>
        <td>CCM_COST_CATEGORY_STAMPED_DATA</td>
        <td>Enables the use of stored cost categories in Perspectives</td>
    </tr>
    <tr>
        <td>PL_ENABLE_USER_IMPERSONATION</td>
        <td>Enables user impersonation for platform. By user impersonation, you can simulate the platform as another user.</td>
    </tr>
    <tr>
        <td>CCM_ANOMALIES_CONDITIONAL_DRILL_DOWN</td>
        <td>Shows perspective link when drill down is missing for anomalies</td>
    </tr>
    <tr>
        <td>CCM_DISABLE_STATISTICAL_ANOMALIES</td>
        <td>Disables statistical model anomalies and shows only prophet-based anomalies</td>
    </tr>
    <tr>
        <td>CCM_ANOMALIES_PROPHET_V2</td>
        <td>Enables Prophet V2 model for anomaly detection</td>
    </tr>
    <tr>
        <td>CCM_ANOMALY_LOOKBACK_RECOMPUTATION</td>
        <td>Revises existing anomalies with latest cost data</td>
    </tr>
    <tr>
        <td>CCM_ANOMALY_EXTENDED_RERUN_DAYS</td>
        <td>Reruns anomaly detection on past 15 days instead of 4 days</td>
    </tr>
    <tr>
        <td>CCM_ANOMALY_REQUIRE_BOTH_THRESHOLDS</td>
        <td>Requires both cost and percentage thresholds for anomaly filtering</td>
    </tr>
    <tr>
        <td>CCM_ANOMALY_WHITELISTING</td>
        <td>Enables ignore list rule in anomalies</td>
    </tr>
    <tr>
        <td>CCM_ANOMALY_EXCLUDE_RECURRING_FEES</td>
        <td>Excludes recurring fees, commitments, taxes, credits, and adjustments from anomaly detection</td>
    </tr>
    <tr>
        <td>CCM_ANOMALY_CC_OTHER_FILTER_BYPASS</td>
        <td>Bypasses additional non-cost-category filters for cost category anomalies in perspectives</td>
    </tr>
    <tr>
        <td>CCM_ANOMALY_EXCLUDE_MARKETPLACE</td>
        <td>Excludes marketplace charges from anomaly detection</td>
    </tr>
    <tr>
        <td>CCM_RECOMMENDATION_AWS_PASSTHROUGH_V2</td>
        <td>Uses AWS Cost Optimization Hub instead of AWS Cost Explorer for recommendations</td>
    </tr>
    <tr>
        <td>CCM_RECOMMENDATION_AWS_PASSTHROUGH_V2_READ</td>
        <td>Enables API filtering for AWS passthrough recommendations V2</td>
    </tr>
    <tr>
        <td>CCM_RECOMMENDATION_COST_TYPES</td>
        <td>Enables cost type support for recommendations</td>
    </tr>
    <tr>
        <td>CCM_NODE_POOL_RECOMMENDATIONS_V2</td>
        <td>Enables node pool recommendations V2</td>
    </tr>
    <tr>
        <td>CCM_FILTER_AUTOSCALED_NODEPOOLS</td>
        <td>Filters out autoscaled node pools from recommendations</td>
    </tr>
    <tr>
        <td>CCM_WORKLOAD_RECOMMENDATIONS_V2</td>
        <td>Enables workload recommendations V2</td>
    </tr>
    <tr>
        <td>CCM_INVENTORY_V2</td>
        <td>Enables cloud asset inventory for AWS resources in Asset Governance</td>
    </tr>
    <tr>
        <td>CCM_GCP_INVENTORY_V2</td>
        <td>Enables cloud asset inventory for GCP resources in Asset Governance</td>
    </tr>
    <tr>
        <td>CCM_AZURE_INVENTORY_V2</td>
        <td>Enables cloud asset inventory for Azure resources in Asset Governance</td>
    </tr>
</table>