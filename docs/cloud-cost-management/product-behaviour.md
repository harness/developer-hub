---
title: Product Behavior on License Expiry
description: This document outlines the expected behavior of each Cloud Cost Management (CCM) feature when a license expires and restrictiomns around pricing.
sidebar_position: 7
helpdocs_is_private: false
helpdocs_is_published: true
---

# Cloud Cost Management (CCM) Product Behavior on License Expiry

At Harness, we strive to provide full transparency into how our Cloud Cost Management (CCM) module behaves when a license expires. This document outlines the expected behavior of each CCM feature to help you plan and operate with confidence.

## Data Collection Behavior

CCM stops publishing cost data once the license expires

| Feature | Behavior on License Expiry |
|--------|-----------------------------|
| **Kubernetes (K8s)** | Data continues to be collected via Perpetual Tasks running on the Delegate. |
| **ECS** | Metric collection stops. |
| **AWS, GCP, Azure** | Data syncing stops. |
| **Historical Data** | All previously collected data (K8s, cloud data) is retained and remains accessible. |

## Cloud Inventory

- **Behavior:** Collection of cloud inventory data continues uninterrupted.
- **Note:** There is **no enforcement** on cloud inventory collection during license expiry.

## What Happens When You Re-enable the License?

- **Backfill Support:** We automatically re-run jobs from the point of license expiry and publish missing data (up to the last 15 days).
- **K8s Data:** Jobs are re-run and backfilled.
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
| **Dashboard Alerts & Reports** | Currently **not gated** by license checks. These may continue unless otherwise updated in the future. |

## AutoStopping

| Feature | Behavior on License Expiry |
|--------|-----------------------------|
| **Warmup/Cooldown Logic** | No disruption. |
| **Savings Computation** | Affected due to lack of CCM data. |

:::tip
**Visual Indicators:** Users will see **license expired** banners on UI to inform them of the status.
:::