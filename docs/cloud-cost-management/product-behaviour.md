---
title: Product Behavior on License Expiry
description: This document outlines the expected behavior of each Cloud Cost Management (CCM) feature when a license expires and restrictiomns around pricing.
sidebar_position: 7
helpdocs_is_private: false
helpdocs_is_published: true
---

At Harness, we strive to provide full transparency into how our Cloud Cost Management (CCM) module behaves when a license expires. This document outlines the expected behavior of each CCM feature to help you plan and operate with confidence.

## Harness CCM Pricing Plan Comparison


|   | Free | Enterprise |
|---------|--------|--------|
| **Cloud Spend** | $250,000 | Buy as much as needed |
| **Clusters** | 2 | Unlimited|
| **AutoStopping Rules** | 10 |  Unlimited |
| **Cost Perspectives** | 20 |  Unlimited |
| **Data Retention** | 30 days | 5 Years|

## Harness Cloud Cost Management (CCM) Product Behavior on License Expiry

## Data Collection Behavior

CCM stops publishing cost data once the license expires.

| Feature | Behavior on License Expiry |
|--------|-----------------------------|
| **ECS** | Metric collection stops. |
| **AWS, GCP, Azure** | Data syncing stops. |
| **Historical Data** | All previously collected data (K8s, cloud data) is retained and remains accessible. |

## What Happens When You Re-enable the License?

- **Backfill Support:** We automatically re-run jobs from the point of license expiry and publish missing data (up to the last 15 days).
- **Cloud Data:** AWS, GCP, and Azure cost data for the **current month** is re-published.

## Recommendations

| Feature | Behavior on License Expiry |
|--------|-----------------------------|
| **Existing Recommendations** | No longer displayed. |
| **New Recommendations** | Not computed after license expiry. |

## Reports, Budgets & Anomaly Alerts

| Type | Behavior on License Expiry |
|------|-----------------------------|
| **Budget Alerts** | Stopped. |
| **Anomaly Alerts** | Stopped. |
| **Scheduled Reports** | Stopped. |

## AutoStopping

| Feature | Behavior on License Expiry |
|--------|-----------------------------|
| **Savings Computation** | Affected due to lack of CCM data. |

:::info
**Visual Indicators:** Users will see **license expired** banners on UI to inform them of the status.
:::

When your Harness Cloud Cost Management (CCM) license transitions from an **Enterprise** or **Team** tier to the **Free Forever plan**, certain usage limits and feature restrictions are enforced to align with the free tier’s capabilities.

### If Your Cloud Spend Exceeds $250K/month

For organizations with a monthly cloud spend **greater than $250,000**, the **Free Forever plan is not supported**. To continue using CCM, please contact your Harness representative to upgrade your plan.

### If Your Cloud Spend is Under $250K/month

For organizations spending **less than $250,000/month**, CCM remains accessible on the Free Forever plan, but with certain limitations and adjustments:

#### Kubernetes (K8s) Cost Visibility

- **Cluster Limit:** The Free Forever plan supports cost visibility for up to **2 Kubernetes clusters**.
- If more than 2 clusters were set up during your Enterprise/Team plan:
  - CCM will be **automatically disabled** on all clusters.
  - You will be able to **re-enable CCM manually** on up to 2 clusters of your choice.

#### Dashboards

- All CCM-specific dashboards created during the Enterprise/Team plan will be **disabled** to comply with Free plan limits.

#### Historical Data Access

  - Users on the Free Forever plan can access **only the past 30 days** of data.
  - Attempts to view data beyond this range will be restricted.

## Want Full Access Again?

To regain access to advanced features, dashboards, and visibility across multiple clusters, you can upgrade your plan at any time.

[Contact Sales](https://www.harness.io/company/contact-sales?utm_source=harness_io&utm_medium=cta&utm_campaign=platform&utm_content=pricing&utm_term=essentials) 

