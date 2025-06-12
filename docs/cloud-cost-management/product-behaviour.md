---
title: "Harness CCM: Subscription Plans"
description: "A comprehensive guide to Harness Cloud Cost Management (CCM) licensing plans, feature limitations, and what happens when your license expires."
sidebar_position: 7
helpdocs_is_private: false
helpdocs_is_published: true
---

# Harness CCM: Subscription Plans


Harness offers two primary licensing tiers for Cloud Cost Management: **Free Forever** and **Enterprise**. 

### Plan Comparison

:::note
- **If Your Cloud Spend Exceeds $250K/month**, you must upgrade to an Enterprise plan. The Free Forever plan is limited to organizations with less than $250K/month in cloud spend.
- **If Your Cloud Spend is Under $250K/month**: CCM remains accessible on the Free Forever plan, but with certain limitations and adjustments. 

:::

| Feature | Free Forever | Enterprise |
|---------|-------------|------------|
| **Cloud Spend Limit** | Up to $250,000/month | Unlimited (pay as you grow) |
| **Kubernetes Clusters** | 2 | Unlimited |
| **AutoStopping Rules** | 10 | Unlimited |
| **Data Retention** | 30 days | 5 years |
| **Currency Preferences** | Not supported | Supported |

#### Definitions

- **Cloud Spend**: The total monthly cloud expenditure across all connected cloud accounts (AWS, Azure, GCP).
- **Kubernetes Clusters**: Number of Kubernetes clusters you can connect for cost visibility and optimization.
- **AutoStopping Rules**: Intelligent rules that automatically stop idle cloud resources to reduce costs.
- **Data Retention**: How long historical cost data is stored and accessible in the system.
- **Currency Preferences**: Ability to view and report costs in currencies other than USD.

## Upgrading from Free to Enterprise

When you upgrade from Free Forever to Enterprise plan, the following changes occur:

| Capability | After upgrade to Enterprise License | Business Advantage |
|---------|---------------------|--------|
| **Kubernetes Clusters** | Unlimited clusters allowed | Achieve complete visibility across your entire K8s infrastructure, enabling organization-wide cost allocation and optimization |
| **AutoStopping Rules** | Unlimited creation of rules | Maximize cloud cost savings by automatically stopping idle resources across all environments and projects |
| **Data Retention** | Extended to 5 years. Users will gain all the historical access of their free tier as well. | Make data-driven decisions with long-term trend analysis and gain deeper insights into seasonal patterns and multi-year cost trends |
| **Currency Preferences** | Fully supported | Gain the ability to view and report costs in currencies other than USD |
| **All reporting, optimization and governance features** | Fully unlocked | Reduce cloud spend through advanced optimization recommendations, custom dashboards, and predictive analytics |

## Enterprise License Expiry

When your Enterprise license expires, the following changes occur:

| Feature | Behavior After License Expiry | Impact |
|---------|------------------------------|--------|
| **Data Collection** | Stops for all sources | No new cost data is collected from any cloud provider or Kubernetes cluster |
| **Historical Data** | Remains accessible | Previously collected data can still be viewed but no new data is added |
| **Recommendations** | No longer generated | Existing recommendations remain visible but no new ones are created |
| **Alerts & Notifications** | Stopped | No budget alerts, anomaly alerts, or scheduled reports are sent |
| **AutoStopping** | AutoStopping rules continue to run but Savings calculations is affected due to lack of new data | No new Savings calculation data displayed |

Users will see **license expired** banners in the UI to inform them of the expired status.

## Need Help?

If you have questions about your license status or need assistance with upgrading or renewal:

- **Contact Sales**: [Harness Sales Team](https://www.harness.io/company/contact-sales?utm_source=harness_io&utm_medium=cta&utm_campaign=platform&utm_content=pricing&utm_term=essentials)
- **Support Portal**: [Harness Support](https://support.harness.io)
