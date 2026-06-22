---
title: Harness Flex Pricing
description: Learn about Harness Subscription Units (HSUs) and flexible unit-based pricing across all Harness modules.
sidebar_label: Flex Pricing
sidebar_position: 1
keywords:
  - flex pricing
  - HSU
  - Harness Subscription Units
  - pricing
  - billing
  - units
tags:
  - Platform
  - Pricing
---

import HsuCalculator from '@site/src/components/HsuCalculator';

:::note Important Note
Flex Pricing is currently in limited availability and is being rolled out gradually. Contact your Harness account executive or [support team](mailto:support@harness.io) to learn about eligibility and access.
:::

## Overview

Harness Flex Pricing is a unit-based pricing model that allows you to use any Harness module without purchasing separate licenses for each one.

Instead of buying modules individually, you purchase a pool of [Harness Subscription Units (HSUs)](#what-are-harness-subscription-units-hsus) and spend them across modules such as Continuous Integration (CI), Continuous Delivery (CD), Platform, Infrastructure as Code Management (IaCM), Internal Developer Portal (IDP), AI SRE, and Security Testing Orchestration (STO) based on your needs.

---

## What are Harness Subscription Units (HSUs)?

A **Harness Subscription Unit (HSU)** is a standardized unit for measuring usage across all Harness modules. The number of HSUs consumed varies by module, feature, and type of activity — for example, a CD service deployment, a CI build, a security scan, or a feature flag request each consume a different number of HSUs.

### How it works

1. **Purchase HSUs** — Buy a pool of units based on your expected usage.
2. **Use HSUs across modules** — HSUs are consumed as you use different Harness modules.
3. **Monitor usage** — Track your HSU consumption and remaining balance in real time.
4. **Scale as needed** — Add more HSUs as your usage increases.

This model removes the need to predict which modules you will use or how much capacity you will need. You can adjust usage across modules as your requirements change.

## Why Flex Pricing

- **Simplified purchasing:** Purchase a single pool of HSUs instead of separate licenses, which makes buying faster and budgeting easier.
- **Flexibility to experiment:** Use your existing HSUs to try new modules and shift usage as your needs change, without additional purchases.
- **Aligned with usage:** Pay based on actual consumption with clear visibility and real-time tracking of HSU usage.

## HSU pricing tiers

Harness offers tiered HSU pricing based on your organization's needs:

| Tier | Price per HSU  | Best for |
|------|---------------|----------|
| **Free** | \$0.00  | Trying out Harness modules before committing usage |
| **Essentials** | \$0.75 | Small to medium businesses |
| **Enterprise** | \$1.25 | Large organizations with committed usage |

:::note Free HSUs on the Free/Essentials plan
Every Free and Essentials account receives **1,000 free HSUs per month** at no cost. These free units reset each calendar month and let you explore modules or handle light workloads before you need to purchase additional capacity.
:::

## HSU Calculator

Different modules consume HSUs at different rates depending on your pricing tier. Toggle between **Enterprise** and **Essentials** to see the applicable metrics and rates for each module. Enter your expected usage to estimate monthly HSU consumption.

<HsuCalculator />

## Flex Pricing billing

All modules are billed on **calendar month** boundaries (January 1–31, February 1–28, and so on), regardless of when your contract starts. If your contract begins mid-month, Harness prorates the first month.

### How usage is calculated

Harness uses two methods to calculate your monthly usage, depending on the type of metric:

* **Discrete metrics:** Count individual events, such as pipeline executions, API calls, or scan runs. Usage is calculated by adding up all events during the billing period. These metrics always use **SUM** aggregation.

* **Cumulative metrics:** Measure usage over time, such as active users, database instances, or API endpoints. These metrics can support lookback windows, free usage allowances, tiered pricing, and different aggregation methods depending on how usage is tracked. 

### Real-time usage visibility

You can view your HSU consumption at any time from the **Subscriptions** page in the Harness platform. The dashboard shows:

- Your total purchased HSUs and remaining balance
- Usage breakdown by module
- Daily and monthly consumption trends

## Overage handling

Harness Flex Pricing  so your work is not interrupted even if you exceed your purchased HSU pool.

### How overage works

- **No service interruption:** Your work continues even if you exceed your HSU pool.
- **Overage billing:** Extra usage is billed at your plan's per-HSU rate, invoiced monthly in arrears.
- **Automatic tracking:** Overage is included in your monthly invoice.
- **Usage alerts:** You receive email notifications at 80%, 90%, and 100% of your HSU limit (see [Usage alerts](#usage-alerts) below).

### Overage pricing example

If your monthly consumption exceeds the HSUs included in your contract, the additional usage is billed at a higher per-HSU overage rate. This overage charge appears on your next monthly invoice.

**Example:** Your team purchased 50,000 HSUs but consumed 55,000 HSUs in a given month.

| | Enterprise | Essentials |
|---|---|---|
| **Purchased HSUs** | 50,000 | 50,000 |
| **Actual usage** | 55,000 | 55,000 |
| **Overage** | 55,000 − 50,000 = **5,000 HSUs** | 55,000 − 50,000 = **5,000 HSUs** |
| **Overage rate** | \$1.25 / HSU | \$0.75 / HSU |
| **Additional charge** | 5,000 × \$1.25 = **\$6,250** | 5,000 × \$0.75 = **\$3,750** |

:::tip Avoid overage charges — top up your HSU pool proactively
Overage HSUs are charged at a higher rate than the HSUs included in your contract. If you expect your usage to exceed your purchased HSU allocation, contact your Harness account team before you reach that limit. 

Increasing your committed HSUs in advance is typically more cost-effective than paying overage charges and helps ensure uninterrupted access to Harness.
:::

### Usage alerts

Harness automatically notifies **Account Administrators** when HSU consumption reaches key usage thresholds.

Notifications are sent once per threshold during each billing cycle. You can monitor your current consumption and review notification history on the Subscriptions page.

| Usage Threshold | Notification                                                                    |
| --------------- | ------------------------------------------------------------------------------- |
| **80%**         | Review your usage and plan for additional capacity if needed.                   |
| **90%**         | You're nearing your purchased HSU limit.                                        |
| **100%**        | You've reached your purchased HSU limit. Additional usage is billed as overage. |

---

## Frequently asked questions

### What can I use HSUs for?

You can use HSUs across all Harness modules, including CI, CD, STO, IDP, FME, and more. You spend them based on your actual usage without assigning them to specific modules in advance.

### What happens if I exceed my HSU limit?

Your usage is not blocked. If you go beyond your purchased HSUs, the additional usage is billed at your contracted overage rate. You also receive alerts as you approach your limit.

### Do unused HSUs expire each month?

No. HSUs are typically part of an annual commitment. Unused units carry forward within your contract period. For exact terms, refer to your contract.

### How can I track HSU usage?

You can track usage from the **Subscriptions** page, which shows how HSUs are consumed across modules, along with details about project, organization, resources, and activity.

### Can I add more HSUs later?

Yes. You can purchase additional HSUs at any time. You can add them to your current contract or start a new commitment.

### How do I choose the right plan?

We recommend the following:

- **Free** — Best for initial exploration and evaluation.
- **Essentials** — Best for core usage across modules.
- **Enterprise** — Best for advanced features, governance, and security needs.

### Who should I contact for pricing or usage guidance?

Reach out to your Harness account team for help with usage analysis, planning your HSU pool, or making changes to your contract.

## Transition to Flex Pricing

If you're currently on a [Developer 360 or DevOps essential subscription plan](/docs/platform/subscriptions-licenses/subscriptions#developer-360-subscriptions) and would like to move to Flex Pricing, contact your Harness account team or [Harness Support](mailto:support@harness.io). They can help you understand how your current usage maps to Harness Service Units (HSUs) and guide you through the transition process.

