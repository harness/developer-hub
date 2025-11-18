---
title: Targeting an Account or Organization
sidebar_label: Targeting an Account or Organization
description: "Learn how to effectively target feature flags by accounts or organizations (such as schools, hospitals, departments, or any group with a unique key) instead of individual users."
sidebar_position: 23
redirect_from:
  - /docs/feature-management-experimentation/feature-management/best-practices/best-practices-when-targeting-an-account-or-organization/
---

## Overview

Traffic types that target using a key for accounts or organizations (or schools, hospitals, or other entities)—as opposed to individual users—are often used for managing entitlements or B2B applications. You can also target based on departments, plants, locations, or any level of granularity for which you have an associated key. In this document, we’ll use "account" as a proxy term for all of the above.

When you want consistency of experience for all users within a single account, use the account traffic type. By providing a single ID (the account ID) you ensure consistent treatment across all users without needing complex user-level data.

## Measuring Impact in Experiments

If you plan to measure the impact of a feature rollout by accounts using experimentation, avoid metrics that `SUM` or `COUNT` activity across users. For example:

* Account A with 1,000 users and
* Account B with 2 users

A `COUNT` or `SUM` metric will disproportionately favor Account A, skewing results.

Instead, use metrics that calculate `AVERAGE` or `PERCENTAGE`, which normalize data across accounts for fairer comparison.

## Rolling Out by User vs. Account

If your organization is comfortable with some variability in experience consistency within accounts, you can roll out features using the user traffic type. This enables user-level experimentation and metrics such as `SUM`, `COUNT`, `AVERAGE`, and `PERCENTAGE`.

Alternatively, you can roll out by user but use the company as a custom attribute to deliver consistent experiences within each organization. This approach allows user-level analysis while maintaining organizational consistency. However, be aware that companies with vastly different user counts can affect distribution control and metric interpretation.

## Tradeoffs and Strategy

These targeting strategies have tradeoffs that teams should weigh carefully. You can:

* Roll out some features by account to ensure experience consistency, and
* Roll out others by user for detailed experimentation.

Split enables you to manage and combine these approaches to best fit your business needs.